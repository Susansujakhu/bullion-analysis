// Per-metal analysis, so gold and silver get identical treatment rather than
// silver being a footnote on a gold report.
//
// Keeping this in one function matters because the two metals genuinely differ
// and the differences are the interesting part: silver's markup reverts in
// about 2 sessions where gold's takes 5, silver is roughly three times as
// volatile, and silver's markup has ranged from 6% to 63% where gold's stays
// in a far tighter band. A shared code path with per-metal parameters surfaces
// that; two hand-written reports would bury it.

import {
  parityNprPerTola, parityNprPer10g, buildUp, impliedPremiumPct,
  percentileOf, pctChange, mean, stdev, attributeMove, perGram,
} from './parity.mjs';

export const METALS = {
  gold: {
    key: 'gold',
    label: 'Gold',
    spotField: 'xauUsdOz',
    tolaKey: 'gold_chhapawal_tola',
    tenGKey: 'gold_chhapawal_10g',
    costKey: 'costBuildUp',
    // Gold's ladder is assembled from an independently-sourced duty, so it is
    // a genuine cross-check on the measured markup. Silver's is not.
    ladderIsCalibrated: false,
  },
  silver: {
    key: 'silver',
    label: 'Silver',
    spotField: 'xagUsdOz',
    tolaKey: 'silver_tola',
    tenGKey: 'silver_10g',
    costKey: 'silverCostBuildUp',
    ladderIsCalibrated: true,
  },
};

export function median(xs) {
  const v = xs.filter(Number.isFinite).sort((a, b) => a - b);
  if (!v.length) return null;
  const m = Math.floor(v.length / 2);
  return v.length % 2 ? v[m] : (v[m - 1] + v[m]) / 2;
}

/**
 * The same-day series for one metal. A record only qualifies when its Nepali
 * rate was published that very day - pairing a live world price with a rate
 * printed during a festival close measures elapsed market movement, not a
 * markup.
 */
export function buildSeries(rows, spec, C) {
  const out = [];
  for (const r of rows) {
    const spot = r.spot?.[spec.spotField];
    const rate = r.nepal?.rates?.[spec.tolaKey];
    if (!(spot > 0) || !r.fx?.usdNpr || !(rate > 0)) continue;
    if ((r.nepal.staleDays ?? 0) > 0) continue;
    const parity = parityNprPerTola(spot, r.fx.usdNpr, C);
    out.push({
      d: r.d,
      spotUsdOz: spot,
      usdNpr: r.fx.usdNpr,
      parityTola: parity,
      actualNprPerTola: rate,
      premiumPct: impliedPremiumPct(rate, parity),
      tenG: r.nepal.rates[spec.tenGKey] ?? null,
    });
  }
  return out;
}

/**
 * Largest sustained step in the markup level. Nepal changes duty by Finance
 * Act and the markup then holds at a new level, so ranking across such a break
 * would measure a tax change instead of today's market.
 */
export function detectRegimeShift(s, minPp, minSince = 20) {
  const N = 10;
  if (s.length < N * 3) return null;
  let best = null;
  for (let i = N; i < s.length - N; i++) {
    const before = mean(s.slice(i - N, i).map((x) => x.premiumPct));
    const after = mean(s.slice(i, i + N).map((x) => x.premiumPct));
    if (before == null || after == null) continue;
    const step = after - before;
    if (!best || Math.abs(step) > Math.abs(best.step)) {
      best = { step, index: i, date: s[i].d, before, after };
    }
  }
  if (!best || Math.abs(best.step) < minPp) return null;
  if (s.length - best.index < minSince) return null;
  return best;
}

/** Full analysis for one metal. */
export function analyseMetal({ spec, rows, today, cfg, C }) {
  const series = buildSeries(rows, spec, C);
  if (!series.length) return null;

  const measured = series[series.length - 1];
  const window = series.slice(-cfg.signal.historyWindowDays);
  const shift = detectRegimeShift(window, cfg.signal.regimeShiftPp ?? 4);
  const base = shift ? window.slice(shift.index) : window;

  const premiums = base.map((s) => s.premiumPct).filter(Number.isFinite);
  const pctile = percentileOf(measured.premiumPct, premiums);
  const med = median(premiums);

  const spotNow = today.spot?.[spec.spotField];
  const usdNpr = today.fx.usdNpr;
  const parityTola = spotNow > 0 ? parityNprPerTola(spotNow, usdNpr, C) : null;
  const parity10g = spotNow > 0 ? parityNprPer10g(spotNow, usdNpr, C) : null;
  const ladder = parityTola != null ? buildUp(parityTola, cfg[spec.costKey], C) : null;

  const staleDays = Math.round((Date.parse(today.d) - Date.parse(measured.d)) / 864e5);
  const indicated = parityTola != null ? parityTola * (1 + measured.premiumPct / 100) : null;
  const indicatedAtMedian = parityTola != null && med != null ? parityTola * (1 + med / 100) : null;
  const repriceGapPct = pctChange(indicated, measured.actualNprPerTola);

  // What moved, over each window, decomposed into world price / rupee / markup.
  const moves = [];
  for (const w of [
    { label: '1 day', days: 1 }, { label: '1 week', days: 7 }, { label: '1 month', days: 30 },
    { label: '3 months', days: 90 }, { label: '1 year', days: 365 },
  ]) {
    const past = nearestInSeries(series, Date.parse(measured.d) - w.days * 864e5, w.days);
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

  let verdict = 'neutral';
  if (premiums.length < 20) verdict = 'insufficient-history';
  else if (pctile >= cfg.signal.premiumPercentileHigh) verdict = 'local-expensive';
  else if (pctile <= cfg.signal.premiumPercentileLow) verdict = 'local-cheap';

  return {
    metal: spec.key,
    label: spec.label,
    spotUsdPerOz: spotNow ?? null,
    parity: {
      nprPerTola: round(parityTola, 0),
      nprPer10g: round(parity10g, 0),
      nprPerGram: parityTola != null ? round(parityTola / C.gramsPerTola, 0) : null,
    },
    buildUp: ladder
      ? {
          steps: ladder.steps.map((s) => ({ ...s, amount: round(s.amount, 0), add: s.add == null ? null : round(s.add, 0) })),
          expectedRetailNprPerTola: round(ladder.expectedRetail, 0),
          impliedMarkupPct: round((ladder.expectedRetail / parityTola - 1) * 100, 2),
          calibrated: spec.ladderIsCalibrated,
          assumptionsUnverified: ladder.assumptionsUnverified,
        }
      : null,
    indicated: {
      nprPerTola: round(indicated, 0),
      nprPer10g: indicated != null ? round((indicated / C.gramsPerTola) * 10, 0) : null,
      nprPerGram: indicated != null ? round(indicated / C.gramsPerTola, 0) : null,
      atMedianPremiumNprPerTola: round(indicatedAtMedian, 0),
      usingPremiumPct: round(measured.premiumPct, 2),
      lastPublishedNprPerTola: measured.actualNprPerTola,
      repriceGapPct: round(repriceGapPct, 2),
      repriceGapNpr: indicated != null ? round(indicated - measured.actualNprPerTola, 0) : null,
    },
    measured: {
      date: measured.d,
      staleDays,
      isLive: staleDays === 0,
      actualNprPerTola: measured.actualNprPerTola,
      actualNprPer10g: measured.tenG,
      actualNprPerGram: round(perGram(measured.actualNprPerTola, C), 0),
      parityNprPerTola: round(measured.parityTola, 0),
      premiumPct: round(measured.premiumPct, 2),
      premiumNpr: round(measured.actualNprPerTola - measured.parityTola, 0),
      percentile: round(pctile, 1),
      historyDays: premiums.length,
      meanPct: round(mean(premiums), 2),
      medianPct: round(med, 2),
      sdPct: round(stdev(premiums), 2),
      vsExpectedRetailPct: ladder ? round((measured.actualNprPerTola / ladder.expectedRetail - 1) * 100, 2) : null,
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
    series: window.map((s) => ({
      d: s.d,
      spot: round(s.spotUsdOz, 3),
      fx: round(s.usdNpr, 3),
      parity: round(s.parityTola, 0),
      actual: s.actualNprPerTola,
      premium: round(s.premiumPct, 2),
    })),
  };
}

/**
 * The gold:silver ratio, world and Nepal. The standard bullion yardstick, and
 * in Nepal it carries extra information: the two metals do not attract the
 * same markup, so the local ratio drifts away from the world one whenever
 * silver gets relatively dearer or cheaper to import than gold.
 */
export function goldSilverRatio(gold, silver, C) {
  if (!gold || !silver) return null;
  const worldNow = gold.spotUsdPerOz && silver.spotUsdPerOz ? gold.spotUsdPerOz / silver.spotUsdPerOz : null;
  const nepalNow = gold.measured.actualNprPerTola && silver.measured.actualNprPerTola
    ? gold.measured.actualNprPerTola / silver.measured.actualNprPerTola
    : null;

  // Paired history - only dates where both metals have a same-day print.
  const byDate = new Map(silver.series.map((s) => [s.d, s]));
  const hist = [];
  for (const g of gold.series) {
    const s = byDate.get(g.d);
    if (!s || !(s.actual > 0) || !(s.spot > 0)) continue;
    hist.push({ d: g.d, world: g.spot / s.spot, nepal: g.actual / s.actual });
  }
  const worldHist = hist.map((x) => x.world);
  const nepalHist = hist.map((x) => x.nepal);

  return {
    worldNow: round(worldNow, 2),
    nepalNow: round(nepalNow, 2),
    worldMedian: round(median(worldHist), 2),
    nepalMedian: round(median(nepalHist), 2),
    worldPercentile: round(percentileOf(worldNow, worldHist), 1),
    n: hist.length,
    // Positive means silver is relatively dearer in Nepal than internationally,
    // which shows up as a LOWER gold:silver ratio locally.
    localSilverRichnessPct: worldNow && nepalNow ? round((worldNow / nepalNow - 1) * 100, 2) : null,
    history: hist.map((x) => ({ d: x.d, world: round(x.world, 2), nepal: round(x.nepal, 2) })),
  };
}

function nearestInSeries(s, targetMs, targetDays) {
  let best = null, gap = Infinity;
  for (const x of s) {
    const g = Math.abs(Date.parse(x.d) - targetMs);
    if (g < gap) { gap = g; best = x; }
  }
  return best && gap <= Math.max(10, targetDays * 0.4) * 864e5 ? best : null;
}

function round(n, dp) {
  return Number.isFinite(n) ? Number(Number(n).toFixed(dp)) : null;
}
