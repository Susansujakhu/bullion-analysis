// Data sources. Every fetcher returns a value plus its own `asOf`, because the
// three legs publish on different clocks: spot is continuous, NRB forex is
// daily-ish, and FENEGOSIDA stops entirely over festivals.

const UA = 'Mozilla/5.0 (compatible; bullion-analysis/1.0)';

async function getJson(url, { timeoutMs = 25000, headers = {} } = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { 'User-Agent': UA, Accept: 'application/json', ...headers },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} from ${url}`);
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}

async function withRetry(label, fn, attempts = 3) {
  let last;
  for (let i = 1; i <= attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      last = err;
      if (i < attempts) await new Promise((r) => setTimeout(r, 1500 * i));
    }
  }
  throw new Error(`${label} failed after ${attempts} attempts: ${last?.message}`);
}

function slugify(label) {
  return String(label).trim().replace(/[^\p{L}\p{N}]+/gu, '_').replace(/^_+|_+$/g, '').toLowerCase();
}

/* ---------------------------------------------------------------- spot --- */
// Primary: gold-api.com (keyless, live spot). Fallback: Yahoo COMEX futures,
// which carry a small contango over spot - recorded in `src` so the analysis
// can say which one a number came from.

async function spotFromGoldApi() {
  const [xau, xag] = await Promise.all([
    getJson('https://api.gold-api.com/price/XAU'),
    getJson('https://api.gold-api.com/price/XAG'),
  ]);
  if (!(xau?.price > 0) || !(xag?.price > 0)) throw new Error('gold-api returned no usable price');
  return {
    xauUsdOz: Number(xau.price),
    xagUsdOz: Number(xag.price),
    asOf: xau.updatedAt ?? null,
    src: 'gold-api.com (spot)',
    isFutures: false,
  };
}

async function yahooLast(symbol) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=5d&interval=1d`;
  const j = await getJson(url);
  const meta = j?.chart?.result?.[0]?.meta;
  const px = meta?.regularMarketPrice;
  if (!(px > 0)) throw new Error(`Yahoo gave no price for ${symbol}`);
  return {
    price: Number(px),
    asOf: meta.regularMarketTime ? new Date(meta.regularMarketTime * 1000).toISOString() : null,
  };
}

async function spotFromYahoo() {
  const [gc, si] = await Promise.all([yahooLast('GC=F'), yahooLast('SI=F')]);
  return {
    xauUsdOz: gc.price,
    xagUsdOz: si.price,
    asOf: gc.asOf,
    src: 'Yahoo COMEX futures (GC=F/SI=F) - fallback, trades slightly above spot',
    isFutures: true,
  };
}

export async function fetchSpot() {
  try {
    return await withRetry('gold-api', spotFromGoldApi);
  } catch (primaryErr) {
    const r = await withRetry('yahoo-futures', spotFromYahoo);
    r.degraded = `primary source failed: ${primaryErr.message}`;
    return r;
  }
}

/* ------------------------------------------------------------------ fx --- */
// Nepal Rastra Bank, the official rate. Ask for a window and take the newest
// day in it: NRB does not publish on every calendar day.

export async function fetchForex(onDate = new Date()) {
  return withRetry('nrb-forex', async () => {
    const to = ymd(onDate);
    const from = ymd(new Date(onDate.getTime() - 10 * 864e5));
    const j = await getJson(
      `https://www.nrb.org.np/api/forex/v1/rates?page=1&per_page=10&from=${from}&to=${to}`
    );
    const days = j?.data?.payload ?? [];
    if (!days.length) throw new Error('NRB returned no days');
    const latest = days.reduce((a, b) => (a.date > b.date ? a : b));
    const pick = (iso) => latest.rates.find((r) => r.currency?.iso3 === iso);
    const usd = pick('USD');
    const inr = pick('INR');
    if (!usd) throw new Error('NRB day has no USD row');
    return {
      // `sell` is what an importer pays to buy dollars, so it is the correct
      // leg for a landed-cost calculation. `buy` kept for reference.
      usdNprSell: Number(usd.sell),
      usdNprBuy: Number(usd.buy),
      // NRB quotes INR per 100 units.
      inrNpr: inr ? Number(inr.sell) / (inr.currency?.unit || 100) : null,
      asOf: latest.date,
      src: 'Nepal Rastra Bank (official)',
    };
  });
}

/* --------------------------------------------------------------- nepal --- */

function normaliseRates(rows, rateTypeMap) {
  const rates = {};
  const unmapped = [];
  for (const row of rows) {
    const label = row.rateType;
    const key = rateTypeMap[label] ?? slugify(label);
    if (!rateTypeMap[label]) unmapped.push(label);
    // The API field is named `...PerGram` but the value is per the unit named
    // in rateType (10g or 1 tola). Do not divide it.
    const v = row.todayBaseRatePerGram ?? row.baseRatePerGram;
    if (v != null) rates[key] = Number(v);
  }
  return { rates, unmapped };
}

export async function fetchNepal(rateTypeMap = {}) {
  return withRetry('fenegosida', async () => {
    const rows = await getJson('https://api.fenegosida.org/api/website/v1/Dashboard/today');
    if (!Array.isArray(rows) || !rows.length) throw new Error('FENEGOSIDA returned no rows');
    const { rates, unmapped } = normaliseRates(rows, rateTypeMap);
    const previous = {};
    for (const row of rows) {
      const key = rateTypeMap[row.rateType] ?? slugify(row.rateType);
      if (row.yestardayBaseRatePerGram != null) previous[key] = Number(row.yestardayBaseRatePerGram);
    }
    return {
      rates,
      previous,
      previousAsOf: String(rows[0].yestardayDate ?? '').slice(0, 10) || null,
      asOf: String(rows[0].todayDate ?? '').slice(0, 10) || null,
      unmapped: [...new Set(unmapped)],
      src: 'FENEGOSIDA (fenegosida.org)',
    };
  });
}

// Historical Nepali rates for one date. Returns null when FENEGOSIDA published
// nothing that day - a normal state during Tihar, Dashain and weekends, not an
// error worth retrying.
export async function fetchNepalOn(dateStr, rateTypeMap = {}) {
  const rows = await getJson(
    `https://api.fenegosida.org/api/website/v1/Dashboard/datewisehistory?date=${dateStr}`
  ).catch(() => null);
  if (!Array.isArray(rows) || !rows.length) return null;
  const { rates } = normaliseRates(rows, rateTypeMap);
  return {
    rates,
    asOf: String(rows[0].todayDate ?? dateStr).slice(0, 10),
    src: 'FENEGOSIDA history',
  };
}

// Daily closes for a Yahoo symbol, for backfilling the international leg.
export async function fetchYahooSeries(symbol, range = '1y') {
  const j = await getJson(
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=${range}&interval=1d`
  );
  const r = j?.chart?.result?.[0];
  const ts = r?.timestamp ?? [];
  const close = r?.indicators?.quote?.[0]?.close ?? [];
  const out = [];
  for (let i = 0; i < ts.length; i++) {
    if (close[i] == null) continue;
    out.push({
      date: new Date(ts[i] * 1000).toISOString().slice(0, 10),
      close: Number(close[i]),
    });
  }
  return out;
}

/* --------------------------------------------------------------- dates --- */

export function ymd(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

// Kathmandu is UTC+5:45. A job firing at 04:00 UTC is already "today" locally
// in a way plain UTC gets wrong near midnight, so stamp records in Nepali time
// or the history picks up a phantom off-by-one.
export function kathmanduDate(d = new Date()) {
  return new Date(d.getTime() + (5 * 60 + 45) * 60000).toISOString().slice(0, 10);
}
