// One-time history builder, so the premium percentile means something on day
// one instead of after a year of waiting.
//
//   node scripts/backfill.mjs [days]      default 365
//
// Three sources, three shapes:
//   spot  - Yahoo gives a whole daily series in one request
//   fx    - NRB serves 100 days per page, so page through
//   nepal - FENEGOSIDA only answers one date at a time. The federation's
//           `ratehistory` bulk endpoint returns HTTP 500 for every parameter
//           value tried, so day-by-day is not a choice. Throttled, and days
//           with no publication (weekends, Dashain, Tihar) come back empty and
//           are simply left out.

import { fetchNepalOn, fetchYahooSeries, ymd } from '../lib/sources.mjs';
import { loadConfig, readHistory, writeAll } from '../lib/store.mjs';

const cfg = loadConfig();
const days = Number(process.argv[2] ?? 365);
const today = new Date();
const dates = [];
for (let i = days; i >= 0; i--) dates.push(ymd(new Date(today.getTime() - i * 864e5)));

console.log(`Backfilling ${dates[0]} -> ${dates[dates.length - 1]} (${dates.length} days)`);

/* ---------------------------------------------------------------- spot --- */
const range = days > 365 ? '5y' : days > 180 ? '2y' : '1y';
console.log(`\n[1/3] international spot (Yahoo, ${range})`);
const [gold, silver] = await Promise.all([
  fetchYahooSeries('GC=F', range).catch((e) => (console.error('  ! gold series: ' + e.message), [])),
  fetchYahooSeries('SI=F', range).catch((e) => (console.error('  ! silver series: ' + e.message), [])),
]);
const spotBy = new Map();
for (const g of gold) spotBy.set(g.date, { xauUsdOz: r2(g.close) });
for (const s of silver) {
  const e = spotBy.get(s.date) ?? {};
  e.xagUsdOz = r3(s.close);
  spotBy.set(s.date, e);
}
console.log(`  ${spotBy.size} days of spot`);

/* ------------------------------------------------------------------ fx --- */
console.log('\n[2/3] NRB forex');
const fxBy = new Map();
for (let start = 0; start < dates.length; start += 100) {
  const from = dates[start];
  const to = dates[Math.min(start + 99, dates.length - 1)];
  try {
    const res = await fetch(
      `https://www.nrb.org.np/api/forex/v1/rates?page=1&per_page=100&from=${from}&to=${to}`,
      { headers: { 'User-Agent': 'bullion-analysis/1.0', Accept: 'application/json' } }
    );
    const j = await res.json();
    for (const day of j?.data?.payload ?? []) {
      const usd = day.rates.find((r) => r.currency?.iso3 === 'USD');
      const inr = day.rates.find((r) => r.currency?.iso3 === 'INR');
      if (!usd) continue;
      fxBy.set(day.date, {
        usdNpr: r4(usd.sell),
        usdNprBuy: r4(usd.buy),
        inrNpr: inr ? r4(Number(inr.sell) / (inr.currency?.unit || 100)) : null,
      });
    }
    process.stdout.write(`  ${from}..${to}  (${fxBy.size} days)\r`);
  } catch (e) {
    console.error(`\n  ! NRB ${from}..${to}: ${e.message}`);
  }
}
console.log(`\n  ${fxBy.size} days of forex`);

/* --------------------------------------------------------------- nepal --- */
console.log('\n[3/3] FENEGOSIDA, one day at a time (slow by necessity)');
const nepalBy = new Map();
const CONCURRENCY = 4;
let done = 0;
let published = 0;

for (let i = 0; i < dates.length; i += CONCURRENCY) {
  const batch = dates.slice(i, i + CONCURRENCY);
  const results = await Promise.all(
    batch.map((d) => fetchNepalOn(d, cfg.rateTypeMap).catch(() => null))
  );
  results.forEach((r, k) => {
    done++;
    if (r && Object.keys(r.rates).length) {
      nepalBy.set(batch[k], { rates: r.rates, asOf: r.asOf, src: r.src });
      published++;
    }
  });
  process.stdout.write(`  ${done}/${dates.length} checked, ${published} with a published rate\r`);
  await new Promise((r) => setTimeout(r, 250)); // be a good citizen
}
console.log(`\n  ${published} days had a published Nepali rate (${dates.length - published} closed/no data)`);

/* --------------------------------------------------------------- merge --- */
// Never clobber a record written by the live fetcher - that one saw the real
// "today" values, which is strictly better data than a backfill.

const existing = new Map(readHistory().map((r) => [r.d, r]));
let added = 0;
let enriched = 0;

for (const d of dates) {
  const spot = spotBy.get(d);
  const fx = fxBy.get(d);
  const nepal = nepalBy.get(d);
  if (!spot && !fx && !nepal) continue;

  const prior = existing.get(d);
  if (prior) {
    let touched = false;
    if (!prior.spot && spot) { prior.spot = { ...spot, src: 'Yahoo COMEX futures (backfill)', isFutures: true }; touched = true; }
    if (!prior.fx && fx) { prior.fx = { ...fx, asOf: d, src: 'Nepal Rastra Bank (backfill)' }; touched = true; }
    if (!prior.nepal && nepal) { prior.nepal = { ...nepal, staleDays: 0 }; touched = true; }
    if (touched) enriched++;
    continue;
  }

  const rec = { d, fetchedAt: new Date().toISOString(), backfilled: true };
  if (spot) rec.spot = { ...spot, asOf: d, src: 'Yahoo COMEX futures (backfill)', isFutures: true };
  if (fx) rec.fx = { ...fx, asOf: d, src: 'Nepal Rastra Bank (backfill)' };
  if (nepal) rec.nepal = { ...nepal, staleDays: 0 };
  existing.set(d, rec);
  added++;
}

const rows = [...existing.values()].sort((a, b) => a.d.localeCompare(b.d));
writeAll(rows);

const usable = rows.filter((r) => r.spot && r.fx && r.nepal?.rates?.[cfg.benchmarkKey]).length;
console.log(`\nAdded ${added} records, enriched ${enriched}. History is now ${rows.length} days.`);
console.log(`${usable} of those have all three legs and can produce a premium.`);
console.log('\nNext: npm run analyse');

function r2(n) { return Number(Number(n).toFixed(2)); }
function r3(n) { return Number(Number(n).toFixed(3)); }
function r4(n) { return Number(Number(n).toFixed(4)); }
