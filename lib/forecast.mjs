// A one-week projection of the Nepali rate.
//
// The honest starting point: at a five-session horizon the world gold price is
// close to a random walk. Anyone quoting a single number for it is inventing
// precision. So the world leg gets NO drift - its central case is "where it is
// now" - and the output is a band with a stated probability.
//
// What this project *can* forecast is the part generic gold models cannot see:
// the Nepali markup. It mean-reverts (AR(1) phi ~= 0.85, half-life ~4 sessions)
// and it moves against spot (corr ~= -0.5, because local retail prices are
// sticky). Both are measured from this repo's own history, both are re-measured
// on every run, and together they make the Nepali price materially less
// volatile than world gold - which is why the band is narrower than simply
// scaling gold's volatility would suggest.

/** Median of a numeric array. */
function median(xs) {
  const v = xs.filter(Number.isFinite).sort((a, b) => a - b);
  if (!v.length) return null;
  const m = Math.floor(v.length / 2);
  return v.length % 2 ? v[m] : (v[m - 1] + v[m]) / 2;
}

const mean = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null);

/**
 * Markup deviation from its own trailing median. Working in deviations rather
 * than levels is what lets both duty regimes contribute to one estimate: a
 * Finance Act step moves the level, not the tendency to revert toward it.
 */
export function markupDeviations(series, trail = 60) {
  const out = [];
  for (let i = trail; i < series.length; i++) {
    const med = median(series.slice(i - trail, i).map((x) => x.premiumPct));
    if (med == null) continue;
    out.push({ i, d: series[i].d, markup: series[i].premiumPct, median: med, dev: series[i].premiumPct - med });
  }
  return out;
}

/** AR(1) fit on the deviation: dev_next = phi * dev. Returns phi, half-life, residual sd. */
export function fitAR1(devs) {
  if (devs.length < 30) return null;
  let sxy = 0, sxx = 0;
  for (let k = 0; k < devs.length - 1; k++) {
    sxy += devs[k].dev * devs[k + 1].dev;
    sxx += devs[k].dev ** 2;
  }
  if (!sxx) return null;
  const phi = sxy / sxx;

  const resid = [];
  for (let k = 0; k < devs.length - 1; k++) resid.push(devs[k + 1].dev - phi * devs[k].dev);
  const mr = mean(resid);
  const sd = Math.sqrt(resid.reduce((a, b) => a + (b - mr) ** 2, 0) / (resid.length - 1));

  // R^2 against the naive "it stays where it is" baseline.
  const actual = devs.slice(1).map((x) => x.dev);
  const ma = mean(actual);
  const ssTot = actual.reduce((a, b) => a + (b - ma) ** 2, 0);
  const ssRes = resid.reduce((a, b) => a + b * b, 0);

  return {
    phi,
    halfLifeObs: phi > 0 && phi < 1 ? Math.log(0.5) / Math.log(phi) : null,
    residSd: sd,
    r2: ssTot ? 1 - ssRes / ssTot : null,
    n: devs.length,
  };
}

/** Correlation between daily log spot moves and daily markup changes. */
export function spotMarkupCorrelation(series) {
  const a = [], b = [];
  for (let i = 1; i < series.length; i++) {
    const p = series[i - 1], c = series[i];
    if (!(p.spotUsdOz > 0) || !(c.spotUsdOz > 0)) continue;
    a.push(Math.log(c.spotUsdOz / p.spotUsdOz));
    b.push(c.premiumPct - p.premiumPct);
  }
  if (a.length < 30) return null;
  const ma = mean(a), mb = mean(b);
  let num = 0, da = 0, db = 0;
  for (let i = 0; i < a.length; i++) {
    num += (a[i] - ma) * (b[i] - mb);
    da += (a[i] - ma) ** 2;
    db += (b[i] - mb) ** 2;
  }
  return {
    corr: num / Math.sqrt(da * db),
    // Slope in markup-percentage-points per 1% spot move - the stickiness
    // coefficient, and the thing that actually dampens the Nepali price.
    betaPpPerPctSpot: (num / da) / 100,
    n: a.length,
  };
}

/**
 * Build the projection.
 *
 * Returns a central path and bands. `horizon` is in trading sessions, which is
 * what the volatility is measured in - five sessions is the useful reading of
 * "one week", since FENEGOSIDA does not print on Saturdays either.
 */
export function project({
  spotUsdOz, usdNpr, markupPct, markupMedian,
  spotDailyVol, ar1, corr, horizon = 5, constants,
}) {
  const c = constants;
  const parityNow = (spotUsdOz / c.gramsPerTroyOunce) * usdNpr * c.gramsPerTola;
  const priceNow = parityNow * (1 + markupPct / 100);

  // --- world leg: random walk, no drift, variance grows with time ---
  const spotSd5 = spotDailyVol * Math.sqrt(horizon);

  // --- markup leg: decay toward its trailing median ---
  const dev = markupPct - markupMedian;
  const decay = ar1 ? Math.pow(ar1.phi, horizon) : 1;
  const markupExpected = markupMedian + dev * decay;
  const markupMove = markupExpected - markupPct;          // in percentage points
  // Uncertainty of an AR(1) h steps out: residual variance accumulates as
  // sum of phi^(2k) for k = 0..h-1.
  let varAcc = 0;
  if (ar1) for (let k = 0; k < horizon; k++) varAcc += Math.pow(ar1.phi, 2 * k);
  const markupSd = ar1 ? ar1.residSd * Math.sqrt(varAcc) : 0;

  // --- combine in log space so the parts add ---
  // d log(price) = d log(spot) + d log(1 + markup/100)
  // Convert the markup's percentage-point uncertainty into log terms at the
  // current level.
  const toLog = 1 / (1 + markupPct / 100) / 100;
  const markupLogMove = markupMove * toLog;
  const markupLogSd = markupSd * toLog;

  // Covariance: markup moves AGAINST spot, so this term is negative and
  // genuinely narrows the band. Ignoring it would overstate the risk.
  const cov = corr ? corr.corr * spotSd5 * markupLogSd : 0;
  const totalVar = spotSd5 ** 2 + markupLogSd ** 2 + 2 * cov;
  const totalSd = Math.sqrt(Math.max(totalVar, 0));

  const centralLog = Math.log(priceNow) + markupLogMove;
  const at = (z) => Math.exp(centralLog + z * totalSd);

  return {
    horizon,
    now: { parityNprPerTola: parityNow, nprPerTola: priceNow, markupPct, markupMedian },
    central: { nprPerTola: at(0), changePct: (at(0) / priceNow - 1) * 100 },
    bands: {
      p68: { lo: at(-1), hi: at(1) },
      p95: { lo: at(-1.96), hi: at(1.96) },
    },
    drivers: {
      markupExpectedPct: markupExpected,
      markupMovePp: markupMove,
      markupDecayFactor: decay,
      spotSd5Pct: spotSd5 * 100,
      markupSdPp: markupSd,
      combinedSdPct: totalSd * 100,
      // What the band would have been without the stickiness term, so the
      // effect is visible rather than buried in the arithmetic.
      combinedSdIgnoringCorrPct: Math.sqrt(spotSd5 ** 2 + markupLogSd ** 2) * 100,
      // Measured against the same model minus the covariance term - the right
      // counterfactual. Comparing against bare spot volatility instead would
      // credit stickiness for the markup's own variance too.
      dampeningPct: (() => {
        const indep = Math.sqrt(spotSd5 ** 2 + markupLogSd ** 2);
        return indep > 0 ? (1 - totalSd / indep) * 100 : null;
      })(),
      vsSpotAlonePct: spotSd5 > 0 ? (1 - totalSd / spotSd5) * 100 : null,
    },
    // Scenario table: what the Nepali rate does IF world gold does X, with the
    // markup following its measured reversion. This is the "if everything goes
    // to plan" view, and it is conditional - not a prediction of X.
    scenarios: [-5, -2, 0, 2, 5].map((spotPct) => {
      const s2 = spotUsdOz * (1 + spotPct / 100);
      const par2 = (s2 / c.gramsPerTroyOunce) * usdNpr * c.gramsPerTola;
      // Stickiness: a spot move partly absorbed by the markup.
      const stick = corr ? corr.betaPpPerPctSpot * spotPct : 0;
      const mk2 = markupExpected + stick;
      const p2 = par2 * (1 + mk2 / 100);
      return {
        spotPct,
        spotUsdOz: s2,
        markupPct: mk2,
        nprPerTola: p2,
        changePct: (p2 / priceNow - 1) * 100,
      };
    }),
  };
}

/**
 * Walk the method through history and count how often reality landed inside
 * the stated bands. A 68% band that only contains 40% of outcomes is a broken
 * band, and the report should say so rather than quietly present it.
 */
export function backtest(series, { horizon = 5, trail = 60, constants }) {
  const devs = markupDeviations(series, trail);
  if (devs.length < 60) return null;

  let n = 0, in68 = 0, in95 = 0;
  const errs = [];

  // Refit on data available at the time, so the test does not peek ahead.
  for (let k = 40; k < devs.length - horizon; k++) {
    const cutIdx = devs[k].i;
    const past = series.slice(0, cutIdx + 1);
    const pastDevs = devs.slice(0, k + 1);
    const ar1 = fitAR1(pastDevs);
    const corr = spotMarkupCorrelation(past);
    const vol = dailyVolOf(past.map((x) => x.spotUsdOz), 30);
    if (!ar1 || !vol) continue;

    const here = series[cutIdx];
    const there = series[cutIdx + horizon];
    if (!there) continue;

    const p = project({
      spotUsdOz: here.spotUsdOz, usdNpr: here.usdNpr,
      markupPct: here.premiumPct, markupMedian: devs[k].median,
      spotDailyVol: vol, ar1, corr, horizon, constants,
    });

    const actual = there.actualNprPerTola;
    n++;
    if (actual >= p.bands.p68.lo && actual <= p.bands.p68.hi) in68++;
    if (actual >= p.bands.p95.lo && actual <= p.bands.p95.hi) in95++;
    errs.push((actual / p.central.nprPerTola - 1) * 100);
  }

  if (!n) return null;
  const abs = errs.map(Math.abs).sort((a, b) => a - b);
  return {
    n,
    coverage68: (in68 / n) * 100,
    coverage95: (in95 / n) * 100,
    medianAbsErrorPct: abs[Math.floor(abs.length / 2)],
    meanErrorPct: mean(errs),
    worstErrorPct: abs[abs.length - 1],
  };
}

export function dailyVolOf(xs, n = 30) {
  const r = [];
  for (let i = Math.max(1, xs.length - n); i < xs.length; i++) {
    if (xs[i] > 0 && xs[i - 1] > 0) r.push(Math.log(xs[i] / xs[i - 1]));
  }
  if (r.length < 5) return null;
  const m = mean(r);
  return Math.sqrt(r.reduce((a, b) => a + (b - m) ** 2, 0) / (r.length - 1));
}

export { median };
