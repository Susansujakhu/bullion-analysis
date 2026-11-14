// One-week projection of the Nepali gold rate.
//
//   node scripts/forecast.mjs
//
// Writes data/forecast.json, site/forecast.json and reports/forecast-latest.md.
//
// Technicals are computed on a continuous Yahoo series rather than on
// history.ndjson, because that file splices backfilled COMEX futures onto live
// spot. The step between those two sources is small but it is exactly the kind
// of artefact a moving average turns into a fake signal. The Nepal-specific
// work - markup reversion, stickiness - uses history.ndjson, where the splice
// does not matter because both legs of the ratio come from the same record.

import { fetchYahooSeries } from '../lib/sources.mjs';
import { loadConfig, readHistory, writeJson, writeText, ROOT } from '../lib/store.mjs';
import { rsi, realizedVol, swingLevels, trendState, sma, olsSlope } from '../lib/technical.mjs';
import {
  markupDeviations, fitAR1, spotMarkupCorrelation, project, backtest, dailyVolOf, median,
} from '../lib/forecast.mjs';
import path from 'node:path';

const cfg = loadConfig();
const C = cfg.constants;
const HORIZON = 5;      // trading sessions
const TRAIL = 60;       // observations in the trailing median

/* -------------------------------------------------- the clean series ----- */

const rows = readHistory();
const series = [];
for (const r of rows) {
  if (!r.spot || !r.fx || !r.nepal?.rates?.[cfg.benchmarkKey]) continue;
  if ((r.nepal.staleDays ?? 0) > 0) continue;
  const parity = (r.spot.xauUsdOz / C.gramsPerTroyOunce) * r.fx.usdNpr * C.gramsPerTola;
  series.push({
    d: r.d,
    spotUsdOz: r.spot.xauUsdOz,
    usdNpr: r.fx.usdNpr,
    actualNprPerTola: r.nepal.rates[cfg.benchmarkKey],
    premiumPct: (r.nepal.rates[cfg.benchmarkKey] / parity - 1) * 100,
  });
}

if (series.length < TRAIL + 40) {
  console.error(`Only ${series.length} same-day observations; need at least ${TRAIL + 40}. Run backfill.`);
  process.exit(1);
}

const latest = series[series.length - 1];

/* ------------------------------------------------------- technicals ----- */

console.error('Fetching continuous price series for technicals…');
const [goldSeries, silverSeries] = await Promise.all([
  fetchYahooSeries('GC=F', '2y').catch(() => []),
  fetchYahooSeries('SI=F', '2y').catch(() => []),
]);

function technicalsFor(ySeries, label) {
  if (ySeries.length < 60) return null;
  const closes = ySeries.map((x) => x.close);
  const t = trendState(closes);
  const levels = swingLevels(closes);
  return {
    label,
    asOf: ySeries[ySeries.length - 1].date,
    last: t.last,
    trend: t.label,
    sma20: t.sma20, sma50: t.sma50, sma200: t.sma200,
    pctFromSma50: t.pctFromSma50,
    pctFromSma200: t.pctFromSma200,
    recentCross: t.recentCross,
    rsi14: rsi(closes, 14),
    dailyVol30: realizedVol(closes, 30),
    dailyVol90: realizedVol(closes, 90),
    // Slope of the last 20 closes, expressed as % per session.
    slope20PctPerDay: (olsSlope(closes.slice(-20)) / t.last) * 100,
    support: levels.support,
    resistance: levels.resistance,
  };
}

const techGold = technicalsFor(goldSeries, 'Gold (COMEX GC=F)');
const techSilver = technicalsFor(silverSeries, 'Silver (COMEX SI=F)');

/* -------------------------------------------- Nepal-specific dynamics --- */

const devs = markupDeviations(series, TRAIL);
const ar1 = fitAR1(devs);
const corr = spotMarkupCorrelation(series);
const trailMedian = devs[devs.length - 1]?.median ?? median(series.slice(-TRAIL).map((x) => x.premiumPct));

// Prefer the volatility of the clean continuous series; fall back to our own.
const spotVol = (goldSeries.length >= 40
  ? dailyVolOf(goldSeries.map((x) => x.close), 30)
  : null) ?? dailyVolOf(series.map((x) => x.spotUsdOz), 30);

const proj = project({
  spotUsdOz: latest.spotUsdOz,
  usdNpr: latest.usdNpr,
  markupPct: latest.premiumPct,
  markupMedian: trailMedian,
  spotDailyVol: spotVol,
  ar1, corr, horizon: HORIZON, constants: C,
});

console.error('Back-testing the method on history…');
const bt = backtest(series, { horizon: HORIZON, trail: TRAIL, constants: C });

/* ------------------------------------------------------- seasonality ---- */
// Thin evidence by construction - one year of data is one observation of each
// month. Reported with its sample size so it reads as a hint, not a finding.

// Measured on the DEVIATION from each observation's own trailing median, not
// on the raw markup. On raw markup the June duty step dominates completely and
// the table reads as "gold is dearer in summer" when it is really "the duty
// went up on 1 June" - a regime effect wearing a seasonal costume.
// Even on deviations the duty step leaks: the trailing median takes TRAIL
// observations to absorb it, so every point in that window shows a large
// positive deviation that is a tax change, not a season. Drop that window
// outright and say how much was dropped.
const breakIdx = findLevelBreak(series, 4);
const contaminated = breakIdx == null
  ? new Set()
  : new Set(devs.filter((x) => x.i >= breakIdx && x.i < breakIdx + TRAIL).map((x) => x.d));

const byMonth = {};
for (const x of devs) {
  if (contaminated.has(x.d)) continue;
  const m = Number(x.d.slice(5, 7));
  (byMonth[m] ??= []).push(x.dev);
}
const seasonality = Object.entries(byMonth)
  .map(([m, xs]) => ({
    month: Number(m),
    name: new Date(2000, Number(m) - 1, 1).toLocaleString('en-US', { month: 'short' }),
    medianDevPp: median(xs),
    n: xs.length,
  }))
  .sort((a, b) => a.month - b.month);

/* ------------------------------------------------------------ output ---- */

const forecast = {
  generatedAt: new Date().toISOString(),
  basis: {
    date: latest.d,
    spotUsdOz: latest.spotUsdOz,
    usdNpr: latest.usdNpr,
    nprPerTola: latest.actualNprPerTola,
    markupPct: round(latest.premiumPct, 2),
    markupTrailingMedianPct: round(trailMedian, 2),
    observations: series.length,
  },
  horizonSessions: HORIZON,
  projection: {
    centralNprPerTola: Math.round(proj.central.nprPerTola),
    centralChangePct: round(proj.central.changePct, 2),
    band68: { lo: Math.round(proj.bands.p68.lo), hi: Math.round(proj.bands.p68.hi) },
    band95: { lo: Math.round(proj.bands.p95.lo), hi: Math.round(proj.bands.p95.hi) },
  },
  drivers: {
    markupNowPct: round(latest.premiumPct, 2),
    markupExpectedPct: round(proj.drivers.markupExpectedPct, 2),
    markupMovePp: round(proj.drivers.markupMovePp, 2),
    decayFactor: round(proj.drivers.markupDecayFactor, 3),
    ar1Phi: ar1 ? round(ar1.phi, 4) : null,
    ar1HalfLifeSessions: ar1 ? round(ar1.halfLifeObs, 1) : null,
    ar1R2: ar1 ? round(ar1.r2, 3) : null,
    spotDailyVolPct: round(spotVol * 100, 3),
    spot5SessionSdPct: round(proj.drivers.spotSd5Pct, 2),
    combinedSdPct: round(proj.drivers.combinedSdPct, 2),
    combinedSdIgnoringStickinessPct: round(proj.drivers.combinedSdIgnoringCorrPct, 2),
    stickinessDampeningPct: round(proj.drivers.dampeningPct, 1),
    vsSpotAloneDampeningPct: round(proj.drivers.vsSpotAlonePct, 1),
    spotMarkupCorr: corr ? round(corr.corr, 3) : null,
    stickinessPpPerPctSpot: corr ? round(corr.betaPpPerPctSpot, 3) : null,
  },
  scenarios: proj.scenarios.map((s) => ({
    spotPct: s.spotPct,
    spotUsdOz: round(s.spotUsdOz, 1),
    markupPct: round(s.markupPct, 2),
    nprPerTola: Math.round(s.nprPerTola),
    changePct: round(s.changePct, 2),
  })),
  technicals: { gold: techGold, silver: techSilver },
  backtest: bt
    ? {
        n: bt.n,
        coverage68Pct: round(bt.coverage68, 1),
        coverage95Pct: round(bt.coverage95, 1),
        medianAbsErrorPct: round(bt.medianAbsErrorPct, 2),
        meanErrorPct: round(bt.meanErrorPct, 2),
        worstErrorPct: round(bt.worstErrorPct, 2),
      }
    : null,
  seasonality,
  seasonalityExcluded: contaminated.size,
  seasonalityBreakDate: breakIdx == null ? null : series[breakIdx].d,
};

writeJson(path.join(ROOT, 'data', 'forecast.json'), forecast);
writeJson(path.join(ROOT, 'site', 'forecast.json'), forecast);
const md = render(forecast);
writeText(path.join(ROOT, 'reports', 'forecast-latest.md'), md);
writeText(path.join(ROOT, 'reports', `forecast-${latest.d}.md`), md);
console.log(md);

/* ------------------------------------------------------------ render ---- */

function render(f) {
  const L = [];
  const npr = (n) => (n == null ? 'n/a' : 'NPR ' + Number(n).toLocaleString('en-IN'));
  const pct = (n, d = 2) => (n == null ? 'n/a' : `${n > 0 ? '+' : ''}${Number(n).toFixed(d)}%`);
  const t = f.technicals.gold;

  L.push(`# One-week outlook - from ${f.basis.date}`);
  L.push('');
  L.push(`> At five sessions, world gold is close to a random walk. This projection therefore gives world gold **no drift** — its central case is where it is now. What is actually forecast here is the Nepali markup, which mean-reverts measurably. Read the band, not the mid-point.`);
  L.push('');

  L.push('## The projection');
  L.push('');
  L.push('| | NPR / tola | vs now |');
  L.push('|---|---:|---:|');
  L.push(`| Now (${f.basis.date}) | ${npr(f.basis.nprPerTola)} | — |`);
  L.push(`| **Central, 5 sessions out** | **${npr(f.projection.centralNprPerTola)}** | ${pct(f.projection.centralChangePct)} |`);
  L.push(`| 68% band | ${npr(f.projection.band68.lo)} — ${npr(f.projection.band68.hi)} | |`);
  L.push(`| 95% band | ${npr(f.projection.band95.lo)} — ${npr(f.projection.band95.hi)} | |`);
  L.push('');
  L.push(`The central case is not "gold will be flat". It is "gold is unforecastable at this horizon, **and** the markup is currently ${pct(f.drivers.markupNowPct)} against a trailing median of ${pct(f.basis.markupTrailingMedianPct)}, which history says decays by about ${((1 - f.drivers.decayFactor) * 100).toFixed(0)}% over five sessions." That decay is the entire reason the central case is not simply today's price.`);
  L.push('');

  L.push('## Why the band is this wide, and not wider');
  L.push('');
  L.push('| | |');
  L.push('|---|---|');
  L.push(`| World gold, 5-session sd | ±${f.drivers.spot5SessionSdPct}% |`);
  L.push(`| Markup reversion | ${f.drivers.markupMovePp > 0 ? '+' : ''}${f.drivers.markupMovePp}pp expected (${pct(f.drivers.markupNowPct)} → ${pct(f.drivers.markupExpectedPct)}) |`);
  L.push(`| Spot/markup correlation | ${f.drivers.spotMarkupCorr} |`);
  L.push(`| **Combined sd** | **±${f.drivers.combinedSdPct}%** |`);
  L.push(`| Same, ignoring stickiness | ±${f.drivers.combinedSdIgnoringStickinessPct}% |`);
  L.push('');
  L.push(`Nepali retail prices are sticky: when world gold moves, local dealers follow only partly, so the markup absorbs about ${Math.abs(f.drivers.stickinessPpPerPctSpot).toFixed(2)}pp of every 1% spot move in the opposite direction. That correlation of ${f.drivers.spotMarkupCorr} narrows the band by **${f.drivers.stickinessDampeningPct}%** against the same model with the two legs assumed independent (±${f.drivers.combinedSdIgnoringStickinessPct}% → ±${f.drivers.combinedSdPct}%), and leaves the Nepali rate ${f.drivers.vsSpotAloneDampeningPct}% less volatile than world gold itself. It is the single most useful thing in this model, and it is invisible to any generic gold forecast.`);
  L.push('');

  if (f.backtest) {
    const b = f.backtest;
    const ok68 = Math.abs(b.coverage68Pct - 68) <= 10;
    const ok95 = Math.abs(b.coverage95Pct - 95) <= 7;
    L.push('## Does this method actually work?');
    L.push('');
    L.push(`Walked through history, refitting at each step on only the data available at that time (${b.n} tests):`);
    L.push('');
    L.push('| | Claimed | Realised |');
    L.push('|---|---:|---:|');
    L.push(`| 68% band contained the outcome | 68% | **${b.coverage68Pct}%** |`);
    L.push(`| 95% band contained the outcome | 95% | **${b.coverage95Pct}%** |`);
    L.push('');
    L.push(`| Median absolute error | ${b.medianAbsErrorPct}% |`);
    L.push('|---|---:|');
    L.push(`| Mean error (bias) | ${pct(b.meanErrorPct)} |`);
    L.push(`| Worst error | ${b.worstErrorPct}% |`);
    L.push('');
    if (ok68 && ok95) {
      L.push('Both bands are close to honest. Treat them as roughly meaning what they say.');
    } else {
      L.push(`**The bands are miscalibrated.** ${!ok68 ? `The 68% band realised ${b.coverage68Pct}%. ` : ''}${!ok95 ? `The 95% band realised ${b.coverage95Pct}%. ` : ''}A band that is too narrow understates risk; too wide and it says nothing. Weight this projection accordingly — this line is here precisely so the number is not trusted more than it deserves.`);
    }
    L.push('');
    L.push(`Note the sample is small and the windows overlap, so these figures are themselves uncertain.`);
    L.push('');
  }

  L.push('## If world gold does X — the conditional table');
  L.push('');
  L.push('This is the "everything goes to plan" view: pick a view on world gold, and read off what the Nepali rate does once the markup follows its measured behaviour.');
  L.push('');
  L.push('| World gold | Spot | Markup then | Nepali rate | vs now |');
  L.push('|---|---:|---:|---:|---:|');
  for (const s of f.scenarios) {
    L.push(`| ${s.spotPct > 0 ? '+' : ''}${s.spotPct}% | $${s.spotUsdOz} | ${pct(s.markupPct, 1)} | **${npr(s.nprPerTola)}** | ${pct(s.changePct, 1)} |`);
  }
  L.push('');
  L.push('Notice the Nepali column moves less than the world column. That is the stickiness, not an arithmetic error.');
  L.push('');

  if (t) {
    L.push('## Technical state — world gold');
    L.push('');
    L.push('| | |');
    L.push('|---|---|');
    L.push(`| Last (${t.asOf}) | $${t.last.toLocaleString('en-US')} |`);
    L.push(`| Trend | ${t.trend} |`);
    L.push(`| 20 / 50 / 200-day average | $${fmt(t.sma20)} / $${fmt(t.sma50)} / $${fmt(t.sma200)} |`);
    L.push(`| Distance from 50 / 200-day | ${pct(t.pctFromSma50, 1)} / ${pct(t.pctFromSma200, 1)} |`);
    L.push(`| RSI(14) | ${t.rsi14?.toFixed(0)} ${rsiNote(t.rsi14)} |`);
    L.push(`| Realised vol, 30d / 90d daily | ${(t.dailyVol30 * 100).toFixed(2)}% / ${(t.dailyVol90 * 100).toFixed(2)}% |`);
    L.push(`| 20-session slope | ${pct(t.slope20PctPerDay, 2)} per session |`);
    if (t.recentCross) L.push(`| Recent signal | **${t.recentCross}** |`);
    L.push(`| Resistance above | ${t.resistance.length ? t.resistance.map((v) => '$' + fmt(v)).join(', ') : 'none within the lookback — at or near the highs'} |`);
    L.push(`| Support below | ${t.support.length ? t.support.map((v) => '$' + fmt(v)).join(', ') : '**none** — price is at or below every swing low in the lookback'} |`);
    L.push('');
    L.push('These describe the chart. They are not a forecast: at a one-week horizon the volatility estimate above carries far more information than any of these levels, which is why the projection uses the former and merely reports the latter.');
    L.push('');
  }

  L.push('## Fundamentals that are structural, not guessed');
  L.push('');
  L.push(`- **The rupee leg is an Indian story.** NPR is pegged to INR at 1.60, so USD/NPR moves only when USD/INR moves. Nepali gold cannot decouple from Indian gold while that peg holds, and the peg is policy, not a market rate.`);
  L.push(`- **Duty and VAT are fixed until the next Finance Act.** Nepal's budget lands in late Jestha (late May). This repo already caught one such step: the markup jumped +9.4pp around 2026-06-01. Until the next budget, markup moves are market behaviour, not tax changes — which is what makes the reversion model valid in the first place.`);
  L.push(`- **Physical-only market.** Nepal has no gold ETF and no sovereign gold bond, so every rupee of demand goes through imported physical metal and a dealer spread. That spread is why the markup exists and why it is sticky.`);
  L.push('');
  if (seasonality.length >= 6) {
    L.push('<details><summary>Monthly pattern in the markup (weak evidence — read the sample sizes)</summary>');
    L.push('');
    L.push('Measured as deviation from each observation\'s own trailing median, in percentage points. Measuring raw markup instead would simply rediscover the 1 June duty step and dress it up as a summer season.');
    L.push('');
    L.push('| Month | Markup vs its own normal | Observations |');
    L.push('|---|---:|---:|');
    for (const m of f.seasonality) L.push(`| ${m.name} | ${m.medianDevPp == null ? 'n/a' : (m.medianDevPp > 0 ? '+' : '') + m.medianDevPp.toFixed(2) + 'pp'} | ${m.n} |`);
    L.push('');
    L.push(`One year of history is one observation of each month, and these windows overlap. ${f.seasonalityExcluded ? `${f.seasonalityExcluded} observations following the ${f.seasonalityBreakDate} duty step were excluded, because the trailing median needs time to absorb a regime change and until it has, every deviation in that window is a tax change wearing a season's clothes. ` : ''}Treat what remains as a hint about wedding and festival demand at most — not a finding, and not something to act on.`);
    L.push('</details>');
    L.push('');
  }

  L.push('---');
  L.push('');
  L.push(`Generated ${f.generatedAt} · basis ${f.basis.date} · ${f.basis.observations} same-day observations · AR(1) φ=${f.drivers.ar1Phi}, half-life ${f.drivers.ar1HalfLifeSessions} sessions, R²=${f.drivers.ar1R2}`);
  L.push('');
  L.push('**Information only. Not investment advice.** This is a statistical description of published prices, not a recommendation to buy or sell anything. Dealer buy/sell spreads alone exceed most of the moves projected here, and gold in Nepal is a hold-for-years asset rather than a weekly trade.');
  return L.join('\n') + '\n';
}

/**
 * Index of the largest sustained step in the markup level, using the same
 * 10-observation mean comparison as the main analysis. Returns null when no
 * step clears minPp.
 */
function findLevelBreak(s, minPp) {
  const N = 10;
  if (s.length < N * 3) return null;
  const avg = (a) => a.reduce((x, y) => x + y, 0) / a.length;
  let best = null;
  for (let i = N; i < s.length - N; i++) {
    const before = avg(s.slice(i - N, i).map((x) => x.premiumPct));
    const after = avg(s.slice(i, i + N).map((x) => x.premiumPct));
    const step = after - before;
    if (!best || Math.abs(step) > Math.abs(best.step)) best = { step, i };
  }
  return best && Math.abs(best.step) >= minPp ? best.i : null;
}

function rsiNote(v) {
  if (v == null) return '';
  if (v >= 70) return '(stretched high)';
  if (v <= 30) return '(stretched low)';
  return '(neutral)';
}
function fmt(n) {
  return n == null ? 'n/a' : Number(n).toLocaleString('en-US', { maximumFractionDigits: 0 });
}
function round(n, dp) {
  return Number.isFinite(n) ? Number(Number(n).toFixed(dp)) : null;
}
