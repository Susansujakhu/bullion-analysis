// Turns the collected history into a read, in two distinct registers:
//
//   MEASURED   - the last date on which a Nepali rate and a world price exist
//                for the SAME day. Only this pairing yields a real premium.
//   INDICATED  - today's world price and rupee, carried through that measured
//                premium, to say what a tola should cost in Kathmandu right
//                now even if the local market has not reprinted yet.
//
// Keeping these apart is the whole correctness story. Comparing today's spot
// against a rate FENEGOSIDA last published three days ago does not measure a
// premium, it measures how far gold moved over those three days - and during
// a festival close that error runs to tens of percent.

import {
  parityNprPerTola, parityNprPer10g, buildUp, impliedPremiumPct,
  percentileOf, pctChange, mean, stdev, attributeMove, perGram,
} from '../lib/parity.mjs';
import { loadConfig, readHistory, writeJson, writeText, ROOT, recordAgo } from '../lib/store.mjs';
import path from 'node:path';

const cfg = loadConfig();
const C = cfg.constants;
const rows = readHistory();

if (!rows.length) {
  console.error('No history yet. Run `npm run backfill` then `npm run fetch` first.');
  process.exit(1);
}

const today = rows[rows.length - 1];
if (!today.spot || !today.fx) {
  console.error(`Latest record ${today.d} has no spot or fx - cannot compute anything.`);
  process.exit(1);
}

/* ------------------------------------------------- the clean series ------ */
// A record only enters the premium series when its Nepali rate was published
// on that same date. `staleDays > 0` means the rate was carried over from an
// earlier day and the pairing would be false.

const series = [];
for (const r of rows) {
  if (!r.spot || !r.fx || !r.nepal?.rates?.[cfg.benchmarkKey]) continue;
  if ((r.nepal.staleDays ?? 0) > 0) continue;
  const p = parityNprPerTola(r.spot.xauUsdOz, r.fx.usdNpr, C);
  const a = r.nepal.rates[cfg.benchmarkKey];
  series.push({
    d: r.d,
    spotUsdOz: r.spot.xauUsdOz,
    xagUsdOz: r.spot.xagUsdOz ?? null,
    usdNpr: r.fx.usdNpr,
    parityTola: p,
    actualNprPerTola: a,
    premiumPct: impliedPremiumPct(a, p),
    silverTola: r.nepal.rates[cfg.silverBenchmarkKey] ?? null,
  });
}

if (!series.length) {
  console.error('No date has both a world price and a same-day Nepali rate. Run backfill.');
  process.exit(1);
}

const measured = series[series.length - 1];
const window = series.slice(-cfg.signal.historyWindowDays);

// Nepal changes gold duty by Finance Act, and when it does the markup steps to
// a new level and stays there. Ranking today against a window that straddles
// such a step answers the wrong question - it says "high versus a tax regime
// that no longer exists". Find the break and rank only within the current one.
const shift = detectRegimeShift(window, cfg.signal.regimeShiftPp ?? 4);
const base = shift ? window.slice(shift.index) : window;

const premiums = base.map((s) => s.premiumPct).filter(Number.isFinite);
const premiumPctile = percentileOf(measured.premiumPct, premiums);
const premiumMean = mean(premiums);
const premiumSd = stdev(premiums);
const premiumMedian = median(premiums);

/* ------------------------------------------------ today, as indicated ---- */

const spotUsdOz = today.spot.xauUsdOz;
const xagUsdOz = today.spot.xagUsdOz ?? null;
const usdNpr = today.fx.usdNpr;
const parityTola = parityNprPerTola(spotUsdOz, usdNpr, C);
const parity10g = parityNprPer10g(spotUsdOz, usdNpr, C);
const ladder = buildUp(parityTola, cfg.costBuildUp, C);

const staleDays = daysApart(measured.d, today.d);
const isLive = staleDays === 0;

// Carry the measured markup onto today's parity. The last measured premium is
// the market's current markup; the median is its settled level. Showing both
// brackets the answer honestly rather than implying false precision.
const indicatedAtLast = parityTola * (1 + measured.premiumPct / 100);
const indicatedAtMedian = premiumMedian != null ? parityTola * (1 + premiumMedian / 100) : null;
const lastPublished = measured.actualNprPerTola;
const repriceGapPct = pctChange(indicatedAtLast, lastPublished);

// Silver, same treatment.
const silverParityTola = xagUsdOz ? parityNprPerTola(xagUsdOz, usdNpr, C) : null;
const silverPremiums = window
  .map((s) => (s.silverTola && s.xagUsdOz ? impliedPremiumPct(s.silverTola, parityNprPerTola(s.xagUsdOz, s.usdNpr, C)) : null))
  .filter(Number.isFinite);
const silverPremiumLast = measured.silverTola && measured.xagUsdOz
  ? impliedPremiumPct(measured.silverTola, parityNprPerTola(measured.xagUsdOz, measured.usdNpr, C))
  : null;
const silverIndicated = silverParityTola != null && silverPremiumLast != null
  ? silverParityTola * (1 + silverPremiumLast / 100)
  : null;

/* ---------------------------------------------------------- what moved --- */

const moves = [];
for (const w of [
  { label: '1 day', days: 1 }, { label: '1 week', days: 7 }, { label: '1 month', days: 30 },
  { label: '3 months', days: 90 }, { label: '1 year', days: 365 },
]) {
  const target = Date.parse(measured.d) - w.days * 864e5;
  const past = nearestInSeries(series, target, w.days);
  if (!past || past.d === measured.d) continue;
  moves.push({
    label: w.label,
    from: past.d,
    spotPct: pctChange(measured.spotUsdOz, past.spotUsdOz),
    fxPct: pctChange(measured.usdNpr, past.usdNpr),
    nepalPct: pctChange(measured.actualNprPerTola, past.actualNprPerTola),
    premiumPointChange: measured.premiumPct - past.premiumPct,
    attribution: attributeMove(measured, past),
  });
}

/* ---------------------------------------------------------- the verdict -- */

const flags = [];
let verdict = 'neutral';
let headline;

if (premiums.length < 20) {
  verdict = 'insufficient-history';
  headline = `Premium is ${fmtPct(measured.premiumPct)}, but ${premiums.length} usable days is too thin to call it high or low.`;
  flags.push('thin-history');
} else if (premiumPctile >= cfg.signal.premiumPercentileHigh) {
  verdict = 'local-expensive';
  headline = `Nepali gold carried a ${fmtPct(measured.premiumPct)} markup over the world price on ${measured.d} - its ${ord(Math.round(premiumPctile))} percentile. Dear by local standards.`;
  flags.push('premium-high');
} else if (premiumPctile <= cfg.signal.premiumPercentileLow) {
  verdict = 'local-cheap';
  headline = `Nepali gold carried a ${fmtPct(measured.premiumPct)} markup over the world price on ${measured.d} - its ${ord(Math.round(premiumPctile))} percentile. An unusually narrow gap.`;
  flags.push('premium-low');
} else {
  headline = `Nepali gold carried a ${fmtPct(measured.premiumPct)} markup over the world price on ${measured.d}, close to its own normal (${ord(Math.round(premiumPctile))} percentile).`;
}

const dayMove = moves.find((m) => m.label === '1 day');
if (dayMove && Math.abs(dayMove.nepalPct ?? 0) >= cfg.signal.dailyMovePctAlert) flags.push('big-daily-move');
if (!isLive) flags.push('nepal-market-closed');
if (staleDays >= cfg.signal.staleNepalDataDays) flags.push('nepal-data-stale');
if (Math.abs(repriceGapPct ?? 0) >= cfg.signal.dailyMovePctAlert) flags.push('reprice-pending');
if (today.spot.isFutures) flags.push('spot-degraded-to-futures');

/* ----------------------------------------------------------------- out --- */

const analysis = {
  generatedAt: new Date().toISOString(),
  asOf: { record: today.d, spot: today.spot.asOf, fx: today.fx.asOf, nepalMeasured: measured.d, staleDays, isLive },
  international: {
    goldUsdPerOz: spotUsdOz,
    silverUsdPerOz: xagUsdOz,
    goldUsdPerGram: round(spotUsdOz / C.gramsPerTroyOunce, 2),
    source: today.spot.src,
  },
  fx: { usdNpr, usdNprBuy: today.fx.usdNprBuy ?? null, inrNpr: today.fx.inrNpr ?? null, source: today.fx.src, asOf: today.fx.asOf },
  parity: {
    nprPerTola: round(parityTola, 0),
    nprPer10g: round(parity10g, 0),
    nprPerGram: round(parityTola / C.gramsPerTola, 0),
    silverNprPerTola: round(silverParityTola, 0),
  },
  buildUp: {
    steps: ladder.steps.map((s) => ({ ...s, amount: round(s.amount, 0), add: s.add == null ? null : round(s.add, 0) })),
    expectedRetailNprPerTola: round(ladder.expectedRetail, 0),
    expectedRetailNprPer10g: round((ladder.expectedRetail / C.gramsPerTola) * 10, 0),
    impliedMarkupPct: round((ladder.expectedRetail / parityTola - 1) * 100, 2),
    assumptionsUnverified: ladder.assumptionsUnverified,
  },
  indicated: {
    _note: 'Today\'s world price and rupee carried through the measured local markup. What a tola should cost now.',
    nprPerTola: round(indicatedAtLast, 0),
    nprPer10g: round((indicatedAtLast / C.gramsPerTola) * 10, 0),
    nprPerGram: round(indicatedAtLast / C.gramsPerTola, 0),
    atMedianPremiumNprPerTola: round(indicatedAtMedian, 0),
    usingPremiumPct: round(measured.premiumPct, 2),
    silverNprPerTola: round(silverIndicated, 0),
    lastPublishedNprPerTola: lastPublished,
    repriceGapPct: round(repriceGapPct, 2),
    repriceGapNpr: round(indicatedAtLast - lastPublished, 0),
  },
  measured: {
    date: measured.d,
    actualNprPerTola: lastPublished,
    actualNprPerGram: round(perGram(lastPublished, C), 0),
    silverNprPerTola: measured.silverTola,
    parityNprPerTola: round(measured.parityTola, 0),
    premiumPct: round(measured.premiumPct, 2),
    premiumNpr: round(lastPublished - measured.parityTola, 0),
    silverPremiumPct: round(silverPremiumLast, 2),
    percentile: round(premiumPctile, 1),
    historyDays: premiums.length,
    meanPct: round(premiumMean, 2),
    medianPct: round(premiumMedian, 2),
    sdPct: round(premiumSd, 2),
    vsExpectedRetailPct: round((lastPublished / ladder.expectedRetail - 1) * 100, 2),
    regimeShift: shift
      ? {
          date: shift.date,
          stepPp: round(shift.step, 1),
          beforePct: round(shift.before, 2),
          afterPct: round(shift.after, 2),
          rankedAgainstDaysSince: premiums.length,
        }
      : null,
  },
  moves,
  verdict,
  headline,
  flags,
  series: window.map((s) => ({
    d: s.d, spot: round(s.spotUsdOz, 2), fx: round(s.usdNpr, 3),
    parity: round(s.parityTola, 0), actual: s.actualNprPerTola,
    premium: round(s.premiumPct, 2), silver: s.silverTola,
  })),
};

writeJson(path.join(ROOT, 'data', 'analysis.json'), analysis);
// The dashboard is a static page fetching a sibling file, so it needs its own
// copy. Writing both keeps `site/` publishable to Pages exactly as it stands.
writeJson(path.join(ROOT, 'site', 'analysis.json'), analysis);
const md = renderReport(analysis);
writeText(path.join(ROOT, 'reports', `${today.d}.md`), md);
writeText(path.join(ROOT, 'reports', 'latest.md'), md);
console.log(md);

/* -------------------------------------------------------------- render --- */

function renderReport(a) {
  const L = [];
  const npr = (n) => (n == null ? 'n/a' : 'NPR ' + Number(n).toLocaleString('en-IN'));
  const pct = (n, dp = 2) => (n == null ? 'n/a' : `${n > 0 ? '+' : ''}${Number(n).toFixed(dp)}%`);

  L.push(`# Bullion read - ${a.asOf.record}`);
  L.push('');
  L.push(`**${a.headline}**`);
  L.push('');

  L.push('## 1. Where the world price is right now');
  L.push('');
  L.push('| | |');
  L.push('|---|---|');
  L.push(`| Gold | **$${a.international.goldUsdPerOz.toLocaleString('en-US')} / troy oz** |`);
  L.push(`| Silver | $${a.international.silverUsdPerOz?.toLocaleString('en-US') ?? 'n/a'} / troy oz |`);
  L.push(`| Gold per gram | $${a.international.goldUsdPerGram} |`);
  L.push(`| USD/NPR (NRB selling, ${a.fx.asOf}) | ${a.fx.usdNpr} |`);
  L.push(`| INR/NPR | ${a.fx.inrNpr ?? 'n/a'} |`);
  L.push('');
  L.push(`Sources: ${a.international.source}; ${a.fx.source}.`);
  if (a.flags.includes('spot-degraded-to-futures')) {
    L.push('');
    L.push('> The spot source failed on this run and COMEX futures were used instead. Futures trade a little above spot, so every rupee figure below is marginally overstated.');
  }
  L.push('');

  L.push('## 2. What that makes a tola worth, before Nepal touches it');
  L.push('');
  L.push(`\`${a.international.goldUsdPerOz} ÷ ${C.gramsPerTroyOunce} × ${a.fx.usdNpr} × ${C.gramsPerTola}\``);
  L.push('');
  L.push(`= **${npr(a.parity.nprPerTola)} per tola** · ${npr(a.parity.nprPer10g)} per 10 g · ${npr(a.parity.nprPerGram)} per gram`);
  L.push('');
  L.push(`Silver parity: ${npr(a.parity.silverNprPerTola)} per tola.`);
  L.push('');

  L.push('## 3. What a tola should cost in Kathmandu today');
  L.push('');
  if (a.asOf.isLive) {
    L.push(`The local market published today, so this is a check rather than a forecast.`);
  } else {
    L.push(`FENEGOSIDA last published on **${a.asOf.nepalMeasured}**, ${a.asOf.staleDays} day${a.asOf.staleDays === 1 ? '' : 's'} ago — the local market is closed or has not reprinted. The figure below is what today's world price and rupee imply once the measured local markup of ${pct(a.indicated.usingPremiumPct)} is applied.`);
  }
  L.push('');
  L.push('| | Per tola | Per 10 g |');
  L.push('|---|---:|---:|');
  L.push(`| **Indicated gold rate** | **${npr(a.indicated.nprPerTola)}** | ${npr(a.indicated.nprPer10g)} |`);
  L.push(`| At the 1-year median markup instead | ${npr(a.indicated.atMedianPremiumNprPerTola)} | — |`);
  L.push(`| Last actually published (${a.asOf.nepalMeasured}) | ${npr(a.indicated.lastPublishedNprPerTola)} | — |`);
  L.push(`| Indicated silver | ${npr(a.indicated.silverNprPerTola)} | — |`);
  L.push('');
  if (!a.asOf.isLive && a.indicated.repriceGapPct != null) {
    const dir = a.indicated.repriceGapPct >= 0 ? 'higher' : 'lower';
    L.push(`**Expect the next print around ${pct(a.indicated.repriceGapPct, 1)} ${dir}** than the last one (${npr(a.indicated.repriceGapNpr)} per tola), if the markup holds.`);
    L.push('');
  }

  L.push('### Where that markup goes');
  L.push('');
  L.push('| Step | Adds | Running total / tola |');
  L.push('|---|---:|---:|');
  for (const s of a.buildUp.steps) L.push(`| ${s.label} | ${s.add == null ? '—' : npr(s.add)} | ${npr(s.amount)} |`);
  L.push('');
  L.push(`This ladder totals ${pct(a.buildUp.impliedMarkupPct)} against a markup actually observed at ${pct(a.measured.premiumPct)}. The two are built differently on purpose: the ladder is an explanation assembled from tax assumptions, the observed figure is measured from published prices.`);
  L.push('');
  if (a.buildUp.assumptionsUnverified.length) {
    L.push('<details><summary>Unverified assumptions in that ladder</summary>');
    L.push('');
    for (const x of a.buildUp.assumptionsUnverified) L.push(`- \`${x.key}\` = ${x.value} — ${x.source}`);
    L.push('');
    L.push('Edit `config/parameters.json` to correct them. Nothing above section 3 depends on them.');
    L.push('</details>');
    L.push('');
  }

  L.push(`## 4. The measured gap, on ${a.measured.date}`);
  L.push('');
  L.push('| | |');
  L.push('|---|---|');
  L.push(`| Published rate | **${npr(a.measured.actualNprPerTola)} / tola** (${npr(a.measured.actualNprPerGram)}/g) |`);
  L.push(`| World parity that same day | ${npr(a.measured.parityNprPerTola)} |`);
  L.push(`| Markup over parity | **${pct(a.measured.premiumPct)}** (${npr(a.measured.premiumNpr)}) |`);
  L.push(`| Silver markup | ${pct(a.measured.silverPremiumPct)} |`);
  L.push(`| Percentile over ${a.measured.historyDays} same-day observations | **${a.measured.percentile}th** |`);
  L.push(`| Mean / median / sd markup | ${pct(a.measured.meanPct)} / ${pct(a.measured.medianPct)} / ${a.measured.sdPct}pp |`);
  L.push('');
  if (a.measured.regimeShift) {
    const r = a.measured.regimeShift;
    L.push(`> **Regime break detected around ${r.date}**: the markup stepped ${r.stepPp > 0 ? 'up' : 'down'} from ${pct(r.beforePct)} to ${pct(r.afterPct)} (${r.stepPp > 0 ? '+' : ''}${r.stepPp}pp) and stayed there — the signature of a Finance Act duty change rather than a market move. Everything ranked above compares only the ${r.rankedAgainstDaysSince} observations since that break, because ranking against the older regime would measure a tax change rather than today's market.`);
    L.push('');
  }
  L.push('Duty and VAT barely move. So within one regime, a widening markup is the local market doing it — importer scarcity, dealer pricing, or rates that fall more slowly than the world price does.');
  L.push('');

  if (a.moves.length) {
    L.push('## 5. What moved, and why');
    L.push('');
    L.push('| Window | World gold | USD/NPR | Nepali rate | Markup |');
    L.push('|---|---:|---:|---:|---:|');
    for (const m of a.moves) {
      L.push(`| ${m.label} | ${pct(m.spotPct, 1)} | ${pct(m.fxPct, 1)} | ${pct(m.nepalPct, 1)} | ${m.premiumPointChange == null ? 'n/a' : `${m.premiumPointChange > 0 ? '+' : ''}${m.premiumPointChange.toFixed(1)}pp`} |`);
    }
    L.push('');
    const best = a.moves.find((m) => m.label === '1 month') ?? a.moves[a.moves.length - 1];
    if (best?.attribution) {
      const at = best.attribution;
      const parts = [['the world gold price', at.shares.spot], ['the rupee', at.shares.fx], ['the local markup', at.shares.premium]]
        .sort((x, y) => y[1] - x[1]);
      L.push(`Over ${best.label} the Nepali rate moved ${pct(at.totalPct, 1)}: ${pct(at.fromSpotPct, 1)} of it from the world gold price, ${pct(at.fromFxPct, 1)} from the rupee, ${pct(at.fromPremiumPct, 1)} from the local markup. Mostly **${parts[0][0]}** (${parts[0][1].toFixed(0)}% of the movement).`);
      L.push('');
    }
  }

  L.push('---');
  L.push('');
  L.push(`Generated ${a.generatedAt} · ${a.measured.historyDays} same-day observations · flags: ${a.flags.length ? a.flags.join(', ') : 'none'}`);
  return L.join('\n') + '\n';
}

/* -------------------------------------------------------------- helpers -- */

/**
 * Find the largest sustained step in the markup: the point where the mean of
 * the next 10 same-day observations most exceeds the mean of the previous 10.
 * Reported only when the step clears `minPp`, which keeps ordinary volatility
 * from being dressed up as a policy change.
 */
function detectRegimeShift(s, minPp) {
  const N = 10;
  if (s.length < N * 3) return null;
  let best = null;
  for (let i = N; i < s.length - N; i++) {
    const before = mean(s.slice(i - N, i).map((x) => x.premiumPct));
    const after = mean(s.slice(i, i + N).map((x) => x.premiumPct));
    if (before == null || after == null) continue;
    const step = after - before;
    if (!best || Math.abs(step) > Math.abs(best.step)) best = { step, index: i, date: s[i].d, before, after };
  }
  if (!best || Math.abs(best.step) < minPp) return null;
  // Too recent to rank against: fewer than 20 observations since the break.
  if (s.length - best.index < 20) return null;
  return best;
}

function median(xs) {
  const v = xs.filter(Number.isFinite).sort((a, b) => a - b);
  if (!v.length) return null;
  const m = Math.floor(v.length / 2);
  return v.length % 2 ? v[m] : (v[m - 1] + v[m]) / 2;
}
function nearestInSeries(s, targetMs, targetDays) {
  let best = null, gap = Infinity;
  for (const x of s) {
    const g = Math.abs(Date.parse(x.d) - targetMs);
    if (g < gap) { gap = g; best = x; }
  }
  return best && gap <= Math.max(10, targetDays * 0.4) * 864e5 ? best : null;
}
function daysApart(a, b) { return Math.round((Date.parse(b) - Date.parse(a)) / 864e5); }
function round(n, dp) { return Number.isFinite(n) ? Number(Number(n).toFixed(dp)) : null; }
function fmtPct(n) { return n == null ? 'n/a' : `${n > 0 ? '+' : ''}${n.toFixed(2)}%`; }
function ord(n) {
  const s = ['th', 'st', 'nd', 'rd'], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
