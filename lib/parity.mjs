// The heart of this project: what the international price says a tola of gold
// is worth in rupees, what it costs to land that tola in Nepal, and how far
// the published Nepali rate sits above the result.
//
// Two different kinds of number live here, and the distinction matters:
//
//   PARITY and IMPLIED PREMIUM are facts. They come from observed spot, the
//   official NRB rate and the published FENEGOSIDA rate. No assumption enters.
//
//   The BUILD-UP (duty, VAT, handling, margin) is an explanation. It uses
//   editable assumptions from config/parameters.json and is offered only to
//   say *where the premium probably goes*. Being wrong about the duty changes
//   the explanation and never the signal.

/** Raw international value of one tola, in NPR. No Nepali costs applied. */
export function parityNprPerTola(spotUsdPerOz, usdNpr, c) {
  const usdPerGram = spotUsdPerOz / c.gramsPerTroyOunce;
  return usdPerGram * usdNpr * c.gramsPerTola;
}

/** Raw international value of ten grams, in NPR. */
export function parityNprPer10g(spotUsdPerOz, usdNpr, c) {
  return (spotUsdPerOz / c.gramsPerTroyOunce) * usdNpr * 10;
}

/**
 * Walk the parity price up to an expected retail price, one named cost at a
 * time. Returns every intermediate step so the report can show the ladder
 * rather than just a total.
 */
export function buildUp(parityPerTola, cfg, c) {
  const dutyPerTola = (cfg.customsDutyNprPer10g.value / 10) * c.gramsPerTola;
  const handling = parityPerTola * cfg.importHandlingRate.value;

  const cif = parityPerTola + handling;
  const landed = cif + dutyPerTola;
  const vat = landed * cfg.vatRate.value;
  const taxPaid = landed + vat;
  const margin = taxPaid * cfg.dealerMarginRate.value;
  const expectedRetail = taxPaid + margin;

  return {
    steps: [
      { key: 'parity', label: 'International value of 1 tola', amount: parityPerTola, add: null },
      { key: 'handling', label: 'Freight, insurance, bank commission', amount: cif, add: handling },
      { key: 'duty', label: 'Customs duty', amount: landed, add: dutyPerTola },
      { key: 'vat', label: `VAT @ ${(cfg.vatRate.value * 100).toFixed(0)}%`, amount: taxPaid, add: vat },
      { key: 'margin', label: 'Dealer margin', amount: expectedRetail, add: margin },
    ],
    expectedRetail,
    // Every part of the build-up that rests on an unverified assumption.
    assumptionsUnverified: Object.entries(cfg)
      .filter(([k, v]) => k !== '_note' && v && typeof v === 'object' && v.verified === false)
      .map(([k, v]) => ({ key: k, value: v.value, source: v.source })),
  };
}

/** Observed gap between the published Nepali rate and raw international parity. */
export function impliedPremiumPct(actualNprPerTola, parityPerTola) {
  if (!(parityPerTola > 0)) return null;
  return (actualNprPerTola / parityPerTola - 1) * 100;
}

/**
 * How unusual is today's premium against its own history? This is the part
 * that is actually actionable, and it needs no assumption at all: a premium in
 * its 90th percentile is a poor moment to buy locally whatever the duty is.
 */
export function percentileOf(value, series) {
  const xs = series.filter((x) => Number.isFinite(x)).sort((a, b) => a - b);
  if (xs.length < 2) return null;
  let below = 0;
  for (const x of xs) if (x < value) below++;
  return (below / xs.length) * 100;
}

export function pctChange(now, then) {
  if (!(then > 0) || !Number.isFinite(now)) return null;
  return (now / then - 1) * 100;
}

export function mean(xs) {
  const v = xs.filter(Number.isFinite);
  return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null;
}

export function stdev(xs) {
  const v = xs.filter(Number.isFinite);
  if (v.length < 2) return null;
  const m = mean(v);
  return Math.sqrt(v.reduce((a, b) => a + (b - m) ** 2, 0) / (v.length - 1));
}

/**
 * Decompose a move in the Nepali price into the three things that can cause
 * it. Without this, a rupee price rise looks like a gold rally even when gold
 * fell and the rupee simply weakened.
 *
 * Working in logs makes the parts additive, so they sum to the whole instead
 * of leaving a cross-term behind.
 */
export function attributeMove(now, then) {
  if (!then || !now) return null;
  const safe = (a, b) => (a > 0 && b > 0 ? Math.log(a / b) : null);

  const lSpot = safe(now.spotUsdOz, then.spotUsdOz);
  const lFx = safe(now.usdNpr, then.usdNpr);
  const lActual = safe(now.actualNprPerTola, then.actualNprPerTola);
  if (lSpot == null || lFx == null || lActual == null) return null;

  // Whatever the first two do not explain is the local premium moving.
  const lPremium = lActual - lSpot - lFx;
  const toPct = (l) => (Math.exp(l) - 1) * 100;

  return {
    totalPct: toPct(lActual),
    fromSpotPct: toPct(lSpot),
    fromFxPct: toPct(lFx),
    fromPremiumPct: toPct(lPremium),
    // Shares of the absolute movement, for a one-line "mostly X" verdict.
    shares: shareOf([lSpot, lFx, lPremium]),
  };
}

function shareOf(parts) {
  const total = parts.reduce((a, b) => a + Math.abs(b), 0);
  if (!total) return { spot: 0, fx: 0, premium: 0 };
  const [s, f, p] = parts.map((x) => (Math.abs(x) / total) * 100);
  return { spot: s, fx: f, premium: p };
}

/** NPR per gram of pure gold implied by the published tola rate. */
export function perGram(nprPerTola, c) {
  return nprPerTola / c.gramsPerTola;
}
