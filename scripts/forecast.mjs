// One-week projection of the Nepali rate, for gold and silver.
//
//   node scripts/forecast.mjs
//
// Writes data/forecast.json, site/forecast.json and reports/forecast-latest.md.
//
// The two metals share a method but not its parameters, and the differences
// are large enough to matter: silver's markup reverts in under two sessions
// where gold's takes five, silver is roughly three times as volatile, and
// silver's markup is stickier still (-0.66 against gold's -0.52). Everything
// below is fitted per metal on every run.
//
// Technicals are computed on a continuous Yahoo series rather than on
// history.ndjson, because that file splices backfilled COMEX futures onto live
// spot. The step between those sources is small but it is exactly the kind of
// artefact a moving average turns into a signal that is not there.

import { fetchYahooSeries } from '../lib/sources.mjs';
import { loadConfig, readHistory, writeJson, writeText, ROOT } from '../lib/store.mjs';
import { METALS, buildSeries, median } from '../lib/metal.mjs';
import { rsi, realizedVol, swingLevels, trendState, olsSlope } from '../lib/technical.mjs';
import {
  markupDeviations, fitAR1, spotMarkupCorrelation, project, backtest, dailyVolOf,
} from '../lib/forecast.mjs';
import path from 'node:path';

const cfg = loadConfig();
const C = cfg.constants;
const HORIZON = 5;      // trading sessions
const TRAIL = 60;       // observations in the trailing median

const rows = readHistory();

console.error('Fetching continuous price series for technicals…');
const [goldY, silverY] = await Promise.all([
  fetchYahooSeries('GC=F', '2y').catch(() => []),
  fetchYahooSeries('SI=F', '2y').catch(() => []),
]);

const YAHOO = { gold: goldY, silver: silverY };
const SYMBOL = { gold: 'Gold (COMEX GC=F)', silver: 'Silver (COMEX SI=F)' };

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
    slope20PctPerDay: (olsSlope(closes.slice(-20)) / t.last) * 100,
    support: levels.support,
    resistance: levels.resistance,
  };
}

/** Everything for one metal: fit, project, back-test, describe the chart. */
function forecastMetal(key) {
  const spec = METALS[key];
  const series = buildSeries(rows, spec, C);
  if (series.length < TRAIL + 40) {
    console.error(`! ${key}: only ${series.length} same-day observations, need ${TRAIL + 40}. Skipping.`);
    return null;
  }

  const latest = series[series.length - 1];
  const devs = markupDeviations(series, TRAIL);
  const ar1 = fitAR1(devs);
  const corr = spotMarkupCorrelation(series);
  const trailMedian = devs[devs.length - 1]?.median ?? median(series.slice(-TRAIL).map((x) => x.premiumPct));

  // Prefer the clean continuous series for volatility; our own record has
  // weekend gaps between consecutive observations, which inflates a per-step
  // standard deviation.
  const y = YAHOO[key];
  const spotVol = (y.length >= 40 ? dailyVolOf(y.map((x) => x.close), 30) : null)
    ?? dailyVolOf(series.map((x) => x.spotUsdOz), 30);

  if (!ar1 || !spotVol) {
    console.error(`! ${key}: could not fit reversion or volatility. Skipping.`);
    return null;
  }

  // Back-test first: it returns the empirical band multipliers, which the live
  // projection then uses. A Gaussian band is only right when the residuals are
  // normal, and for silver they are emphatically not.
  const bt = backtest(series, { horizon: HORIZON, trail: TRAIL, constants: C });

  const proj = project({
    spotUsdOz: latest.spotUsdOz, usdNpr: latest.usdNpr,
    markupPct: latest.premiumPct, markupMedian: trailMedian,
    spotDailyVol: spotVol, ar1, corr, horizon: HORIZON, constants: C,
    quantiles: bt?.quantiles ?? null,
  });

  // Seasonality on deviations, with the post-duty-change window dropped. On
  // raw markup the 1 June step dominates and the table reads as a summer
  // season; even on deviations it leaks until the trailing median absorbs it.
  const breakIdx = findLevelBreak(series, 4);
  const contaminated = breakIdx == null
    ? new Set()
    : new Set(devs.filter((x) => x.i >= breakIdx && x.i < breakIdx + TRAIL).map((x) => x.d));
  const byMonth = {};
  for (const x of devs) {
    if (contaminated.has(x.d)) continue;
    (byMonth[Number(x.d.slice(5, 7))] ??= []).push(x.dev);
  }

  return {
    metal: key,
    label: spec.label,
    basis: {
      date: latest.d,
      spotUsdOz: latest.spotUsdOz,
      usdNpr: latest.usdNpr,
      nprPerTola: latest.actualNprPerTola,
      markupPct: round(latest.premiumPct, 2),
      markupTrailingMedianPct: round(trailMedian, 2),
      observations: series.length,
    },
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
      ar1Phi: round(ar1.phi, 4),
      ar1HalfLifeSessions: round(ar1.halfLifeObs, 1),
      ar1R2: round(ar1.r2, 3),
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
      spotUsdOz: round(s.spotUsdOz, key === 'gold' ? 1 : 2),
      markupPct: round(s.markupPct, 2),
      nprPerTola: Math.round(s.nprPerTola),
      changePct: round(s.changePct, 2),
    })),
    technicals: technicalsFor(y, SYMBOL[key]),
    bandsCalibrated: proj.calibrated,
    backtest: bt
      ? {
          n: bt.n,
          coverage68Pct: round(bt.coverage68, 1),
          coverage95Pct: round(bt.coverage95, 1),
          gaussianCoverage68Pct: round(bt.gaussianCoverage68, 1),
          gaussianCoverage95Pct: round(bt.gaussianCoverage95, 1),
          medianAbsErrorPct: round(bt.medianAbsErrorPct, 2),
          meanErrorPct: round(bt.meanErrorPct, 2),
          worstErrorPct: round(bt.worstErrorPct, 2),
        }
      : null,
    seasonality: Object.entries(byMonth)
      .map(([m, xs]) => ({
        month: Number(m),
        name: new Date(2000, Number(m) - 1, 1).toLocaleString('en-US', { month: 'short' }),
        medianDevPp: round(median(xs), 2),
        n: xs.length,
      }))
      .sort((a, b) => a.month - b.month),
    seasonalityExcluded: contaminated.size,
    seasonalityBreakDate: breakIdx == null ? null : series[breakIdx].d,
    // Points for the dashboard cone.
    recent: series.slice(-45).map((s) => ({ d: s.d, actual: s.actualNprPerTola })),
  };
}

console.error('Fitting and back-testing per metal…');
const gold = forecastMetal('gold');
const silver = forecastMetal('silver');

if (!gold && !silver) {
  console.error('Neither metal could be projected.');
  process.exit(1);
}

const out = {
  generatedAt: new Date().toISOString(),
  horizonSessions: HORIZON,
  metals: { gold, silver },
  // Legacy gold-shaped fields so anything reading the previous format keeps
  // working; `metals.gold` is the same data.
  ...(gold ? {
    basis: gold.basis,
    projection: gold.projection,
    drivers: gold.drivers,
    scenarios: gold.scenarios,
    technicals: { gold: gold.technicals, silver: silver?.technicals ?? null },
    backtest: gold.backtest,
    seasonality: gold.seasonality,
    seasonalityExcluded: gold.seasonalityExcluded,
    seasonalityBreakDate: gold.seasonalityBreakDate,
  } : {}),
};

writeJson(path.join(ROOT, 'data', 'forecast.json'), out);
writeJson(path.join(ROOT, 'site', 'forecast.json'), out);
const md = render(out);
writeText(path.join(ROOT, 'reports', 'forecast-latest.md'), md);
writeText(path.join(ROOT, 'reports', `forecast-${(gold ?? silver).basis.date}.md`), md);
console.log(md);

/* ------------------------------------------------------------ render ---- */

function render(f) {
  const L = [];
  const npr = (n) => (n == null ? 'n/a' : 'NPR ' + Number(n).toLocaleString('en-IN'));
  const pct = (n, d = 2) => (n == null ? 'n/a' : `${n > 0 ? '+' : ''}${Number(n).toFixed(d)}%`);
  const basis = (f.metals.gold ?? f.metals.silver).basis;

  L.push(`# One-week outlook - from ${basis.date}`);
  L.push('');
  L.push('> At five sessions, world metal prices are close to a random walk. This projection therefore gives them **no drift** — the central case is where they are now. What is actually forecast is the Nepali markup, which mean-reverts measurably. Read the band, not the mid-point.');
  L.push('');

  // Side-by-side summary first: the two metals behave differently and that is
  // the most useful thing on the page.
  if (f.metals.gold && f.metals.silver) {
    L.push('## Gold and silver at a glance');
    L.push('');
    L.push('| | Gold | Silver |');
    L.push('|---|---:|---:|');
    L.push(`| Now | ${npr(f.metals.gold.basis.nprPerTola)} | ${npr(f.metals.silver.basis.nprPerTola)} |`);
    L.push(`| **Central, 5 sessions** | **${npr(f.metals.gold.projection.centralNprPerTola)}** | **${npr(f.metals.silver.projection.centralNprPerTola)}** |`);
    L.push(`| Change | ${pct(f.metals.gold.projection.centralChangePct)} | ${pct(f.metals.silver.projection.centralChangePct)} |`);
    L.push(`| 68% band | ${npr(f.metals.gold.projection.band68.lo)} – ${npr(f.metals.gold.projection.band68.hi)} | ${npr(f.metals.silver.projection.band68.lo)} – ${npr(f.metals.silver.projection.band68.hi)} |`);
    L.push(`| Markup now | ${pct(f.metals.gold.drivers.markupNowPct, 1)} | ${pct(f.metals.silver.drivers.markupNowPct, 1)} |`);
    L.push(`| Reversion half-life | ${f.metals.gold.drivers.ar1HalfLifeSessions} sessions | ${f.metals.silver.drivers.ar1HalfLifeSessions} sessions |`);
    L.push(`| Stickiness (corr) | ${f.metals.gold.drivers.spotMarkupCorr} | ${f.metals.silver.drivers.spotMarkupCorr} |`);
    L.push(`| World daily vol | ${f.metals.gold.drivers.spotDailyVolPct}% | ${f.metals.silver.drivers.spotDailyVolPct}% |`);
    L.push(`| Combined 5-session sd | ±${f.metals.gold.drivers.combinedSdPct}% | ±${f.metals.silver.drivers.combinedSdPct}% |`);
    L.push('');
    L.push(`Silver's markup reverts roughly ${(f.metals.gold.drivers.ar1HalfLifeSessions / f.metals.silver.drivers.ar1HalfLifeSessions).toFixed(1)}× faster than gold's, and silver is the more volatile metal by a wide margin. The two are not one asset with different price tags.`);
    L.push('');
  }

  for (const m of [f.metals.gold, f.metals.silver]) {
    if (!m) continue;
    L.push(`## ${m.label}`);
    L.push('');
    L.push('| | NPR / tola | vs now |');
    L.push('|---|---:|---:|');
    L.push(`| Now (${m.basis.date}) | ${npr(m.basis.nprPerTola)} | — |`);
    L.push(`| **Central, ${f.horizonSessions} sessions out** | **${npr(m.projection.centralNprPerTola)}** | ${pct(m.projection.centralChangePct)} |`);
    L.push(`| 68% band | ${npr(m.projection.band68.lo)} — ${npr(m.projection.band68.hi)} | |`);
    L.push(`| 95% band | ${npr(m.projection.band95.lo)} — ${npr(m.projection.band95.hi)} | |`);
    L.push('');
    L.push(`The markup is ${pct(m.drivers.markupNowPct)} against a trailing median of ${pct(m.basis.markupTrailingMedianPct)}; history says about ${((1 - m.drivers.decayFactor) * 100).toFixed(0)}% of that gap decays within ${f.horizonSessions} sessions (AR(1) φ=${m.drivers.ar1Phi}, half-life ${m.drivers.ar1HalfLifeSessions} sessions, R²=${m.drivers.ar1R2}). That decay is why the central case is not simply today's price.`);
    L.push('');
    L.push('| Band composition | |');
    L.push('|---|---|');
    L.push(`| World price, 5-session sd | ±${m.drivers.spot5SessionSdPct}% |`);
    L.push(`| Markup reversion | ${m.drivers.markupMovePp > 0 ? '+' : ''}${m.drivers.markupMovePp}pp |`);
    L.push(`| Spot/markup correlation | ${m.drivers.spotMarkupCorr} |`);
    L.push(`| **Combined sd** | **±${m.drivers.combinedSdPct}%** |`);
    L.push(`| Same, legs assumed independent | ±${m.drivers.combinedSdIgnoringStickinessPct}% |`);
    L.push('');
    L.push(`Local prices are sticky: the markup absorbs about ${Math.abs(m.drivers.stickinessPpPerPctSpot).toFixed(2)}pp of every 1% world move in the opposite direction, narrowing the band by ${m.drivers.stickinessDampeningPct}% and leaving the Nepali rate ${m.drivers.vsSpotAloneDampeningPct}% less volatile than the world price itself.`);
    L.push('');

    if (m.backtest) {
      const b = m.backtest;
      const ok = b.coverage68Pct != null
        && Math.abs(b.coverage68Pct - 68) <= 10 && Math.abs(b.coverage95Pct - 95) <= 7;
      L.push(`**Back-test** (${b.n} tests, refit at each step on data available then): the 68% band held **${b.coverage68Pct}%**, the 95% band **${b.coverage95Pct}%**. Median absolute error ${b.medianAbsErrorPct}%, worst ${b.worstErrorPct}%. ${ok ? 'Both bands are close to honest.' : '**Miscalibrated — weight this projection accordingly.**'}`);
      L.push('');
      if (m.bandsCalibrated) {
        L.push(`The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered ${b.gaussianCoverage68Pct}% and ${b.gaussianCoverage95Pct}%. Coverage above is scored out-of-sample, using only errors seen before each test.`);
        L.push('');
      }
      // Overlapping windows are the reason these numbers must not be read to
      // the nearest point: consecutive tests share four of their five
      // sessions, so the independent sample is a fifth of the headline count.
      const nEff = Math.round(b.n / f.horizonSessions);
      L.push(`<sub>Consecutive tests overlap by ${f.horizonSessions - 1} of ${f.horizonSessions} sessions, so ${b.n} tests carry roughly ${nEff} independent observations — about ±${(Math.sqrt(0.68 * 0.32 / Math.max(nEff, 1)) * 100).toFixed(0)}pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>`);
      L.push('');
    }

    L.push(`| If world ${m.label.toLowerCase()} does | Spot | Markup then | Nepali rate | vs now |`);
    L.push('|---|---:|---:|---:|---:|');
    for (const s of m.scenarios) {
      L.push(`| ${s.spotPct > 0 ? '+' : ''}${s.spotPct}% | $${s.spotUsdOz} | ${pct(s.markupPct, 1)} | **${npr(s.nprPerTola)}** | ${pct(s.changePct, 1)} |`);
    }
    L.push('');

    const t = m.technicals;
    if (t) {
      L.push('<details><summary>Technical state</summary>');
      L.push('');
      L.push('| | |');
      L.push('|---|---|');
      L.push(`| Last (${t.asOf}) | $${fmt(t.last)} |`);
      L.push(`| Trend | ${t.trend}${t.recentCross ? ` · **${t.recentCross}**` : ''} |`);
      L.push(`| 20 / 50 / 200-day average | $${fmt(t.sma20)} / $${fmt(t.sma50)} / $${fmt(t.sma200)} |`);
      L.push(`| Distance from 50 / 200-day | ${pct(t.pctFromSma50, 1)} / ${pct(t.pctFromSma200, 1)} |`);
      L.push(`| RSI(14) | ${t.rsi14?.toFixed(0)} ${rsiNote(t.rsi14)} |`);
      L.push(`| Realised vol, 30d / 90d | ${(t.dailyVol30 * 100).toFixed(2)}% / ${(t.dailyVol90 * 100).toFixed(2)}% |`);
      L.push(`| Resistance above | ${t.resistance.length ? t.resistance.map((v) => '$' + fmt(v)).join(', ') : '**none** — at or above every swing high in the lookback'} |`);
      L.push(`| Support below | ${t.support.length ? t.support.map((v) => '$' + fmt(v)).join(', ') : '**none** — at or below every swing low in the lookback'} |`);
      L.push('');
      L.push('These describe the chart. At a one-week horizon the volatility estimate carries far more information than any level here, which is why the projection uses the former and merely reports the latter.');
      L.push('</details>');
      L.push('');
    }

    if (m.seasonality.length >= 6) {
      L.push('<details><summary>Monthly pattern in the markup (weak evidence)</summary>');
      L.push('');
      L.push('Deviation from each observation\'s own trailing median, in percentage points.');
      L.push('');
      L.push('| Month | vs its own normal | Observations |');
      L.push('|---|---:|---:|');
      for (const s of m.seasonality) L.push(`| ${s.name} | ${s.medianDevPp == null ? 'n/a' : (s.medianDevPp > 0 ? '+' : '') + s.medianDevPp.toFixed(2) + 'pp'} | ${s.n} |`);
      L.push('');
      L.push(`${m.seasonalityExcluded ? `${m.seasonalityExcluded} observations after the ${m.seasonalityBreakDate} duty step were excluded — until the trailing median absorbs a regime change, every deviation in that window is a tax change wearing a season's clothes. ` : ''}One year of history is one observation of each month and the windows overlap. A hint at most.`);
      L.push('</details>');
      L.push('');
    }
  }

  L.push('## Fundamentals that are structural, not guessed');
  L.push('');
  L.push('- **The rupee leg is an Indian story.** NPR is pegged to INR at 1.60, so USD/NPR moves only when USD/INR moves. Nepali bullion cannot decouple from Indian bullion while that peg holds, and the peg is policy, not a market rate.');
  L.push('- **Duty and VAT are fixed until the next Finance Act.** Nepal\'s budget lands in late Jestha (late May). This repo caught the last one in both metals independently: gold\'s markup stepped +9.4pp and silver\'s +11.4pp around 2026-06-01. Until the next budget, markup moves are market behaviour rather than tax changes — which is what makes the reversion model valid at all.');
  L.push('- **Physical-only market.** Nepal has no gold ETF and no sovereign gold bond, so every rupee of demand runs through imported physical metal and a dealer spread. That spread is why the markup exists and why it is sticky.');
  L.push('- **Silver is the more volatile metal, locally as well as internationally.** Its markup swings wider, reverts faster, and its dealer spread is proportionally larger. Treating it as "cheap gold" is a mistake the numbers above contradict.');
  L.push('');

  L.push('---');
  L.push('');
  L.push(`Generated ${f.generatedAt} · horizon ${f.horizonSessions} sessions`);
  L.push('');
  L.push('**Information only. Not investment advice.** This is a statistical description of published prices, not a recommendation to buy or sell anything. Dealer buy/sell spreads alone exceed most of the moves projected here, and bullion in Nepal is a hold-for-years asset rather than a weekly trade.');
  return L.join('\n') + '\n';
}

/* ----------------------------------------------------------- helpers ---- */

function findLevelBreak(s, minPp) {
  const N = 10;
  if (s.length < N * 3) return null;
  const avg = (a) => a.reduce((x, y) => x + y, 0) / a.length;
  let best = null;
  for (let i = N; i < s.length - N; i++) {
    const step = avg(s.slice(i, i + N).map((x) => x.premiumPct)) - avg(s.slice(i - N, i).map((x) => x.premiumPct));
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
  return n == null ? 'n/a' : Number(n).toLocaleString('en-US', { maximumFractionDigits: n < 100 ? 2 : 0 });
}
function round(n, dp) {
  return Number.isFinite(n) ? Number(Number(n).toFixed(dp)) : null;
}
