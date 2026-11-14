// Technical indicators, computed on a clean continuous series.
//
// These are read as *state description*, not as signals: "price is below its
// 50-day average and RSI is 38" is a fact about the chart. Whether that
// predicts anything is a separate and much weaker claim, and the forecast
// module treats it accordingly.

export function sma(xs, n) {
  if (xs.length < n) return null;
  let s = 0;
  for (let i = xs.length - n; i < xs.length; i++) s += xs[i];
  return s / n;
}

export function smaSeries(xs, n) {
  const out = new Array(xs.length).fill(null);
  if (xs.length < n) return out;
  let s = 0;
  for (let i = 0; i < xs.length; i++) {
    s += xs[i];
    if (i >= n) s -= xs[i - n];
    if (i >= n - 1) out[i] = s / n;
  }
  return out;
}

/** Wilder's RSI - the standard smoothing, not a plain mean of gains. */
export function rsi(xs, n = 14) {
  if (xs.length < n + 1) return null;
  let gain = 0, loss = 0;
  for (let i = 1; i <= n; i++) {
    const d = xs[i] - xs[i - 1];
    if (d > 0) gain += d; else loss -= d;
  }
  gain /= n; loss /= n;
  for (let i = n + 1; i < xs.length; i++) {
    const d = xs[i] - xs[i - 1];
    gain = (gain * (n - 1) + Math.max(d, 0)) / n;
    loss = (loss * (n - 1) + Math.max(-d, 0)) / n;
  }
  if (loss === 0) return 100;
  return 100 - 100 / (1 + gain / loss);
}

/**
 * Realized volatility of daily log returns, annualised=false by default.
 * Returned as a daily standard deviation in log space, which is what the
 * forecast cone needs.
 */
export function realizedVol(xs, n = 30) {
  const r = [];
  for (let i = Math.max(1, xs.length - n); i < xs.length; i++) {
    if (xs[i] > 0 && xs[i - 1] > 0) r.push(Math.log(xs[i] / xs[i - 1]));
  }
  if (r.length < 5) return null;
  const m = r.reduce((a, b) => a + b, 0) / r.length;
  return Math.sqrt(r.reduce((a, b) => a + (b - m) ** 2, 0) / (r.length - 1));
}

/**
 * Swing highs and lows over a lookback, used as support and resistance.
 * A level counts only if it is the extreme of its own neighbourhood, which
 * keeps every minor wiggle from becoming a "level".
 */
export function swingLevels(xs, { lookback = 120, pivot = 5, keep = 3 } = {}) {
  const s = xs.slice(-lookback);
  const highs = [], lows = [];
  for (let i = pivot; i < s.length - pivot; i++) {
    const w = s.slice(i - pivot, i + pivot + 1);
    if (s[i] === Math.max(...w)) highs.push(s[i]);
    if (s[i] === Math.min(...w)) lows.push(s[i]);
  }
  const last = xs[xs.length - 1];
  return {
    resistance: [...new Set(highs)].filter((v) => v > last).sort((a, b) => a - b).slice(0, keep),
    support: [...new Set(lows)].filter((v) => v < last).sort((a, b) => b - a).slice(0, keep),
  };
}

/** Plain-language description of where price sits against its averages. */
export function trendState(xs) {
  const last = xs[xs.length - 1];
  const s20 = sma(xs, 20), s50 = sma(xs, 50), s200 = sma(xs, 200);
  const above = (m) => (m == null ? null : last > m);

  let label = 'mixed';
  if (s20 && s50 && s200) {
    if (last > s20 && s20 > s50 && s50 > s200) label = 'uptrend';
    else if (last < s20 && s20 < s50 && s50 < s200) label = 'downtrend';
    else if (last > s200) label = 'above its long-term average, short-term choppy';
    else label = 'below its long-term average, short-term choppy';
  }

  // Cross detection on the last 10 sessions only - an old cross is history,
  // not news.
  const a = smaSeries(xs, 50), b = smaSeries(xs, 200);
  let cross = null;
  for (let i = Math.max(1, xs.length - 10); i < xs.length; i++) {
    if (a[i] == null || b[i] == null || a[i - 1] == null || b[i - 1] == null) continue;
    if (a[i - 1] <= b[i - 1] && a[i] > b[i]) cross = 'golden cross (50 crossed above 200)';
    if (a[i - 1] >= b[i - 1] && a[i] < b[i]) cross = 'death cross (50 crossed below 200)';
  }

  return {
    label,
    last,
    sma20: s20, sma50: s50, sma200: s200,
    aboveSma20: above(s20), aboveSma50: above(s50), aboveSma200: above(s200),
    pctFromSma50: s50 ? (last / s50 - 1) * 100 : null,
    pctFromSma200: s200 ? (last / s200 - 1) * 100 : null,
    recentCross: cross,
  };
}

/** Ordinary least squares slope of y on an integer index, per step. */
export function olsSlope(ys) {
  const n = ys.length;
  if (n < 3) return null;
  const mx = (n - 1) / 2;
  const my = ys.reduce((a, b) => a + b, 0) / n;
  let num = 0, den = 0;
  for (let i = 0; i < n; i++) { num += (i - mx) * (ys[i] - my); den += (i - mx) ** 2; }
  return num / den;
}
