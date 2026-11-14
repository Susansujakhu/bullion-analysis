// Turns the collected history into a read, for gold and silver equally.
//
// Two registers are kept strictly apart throughout:
//
//   MEASURED   - the last date on which a Nepali rate and a world price exist
//                for the SAME day. Only this pairing yields a real markup.
//   INDICATED  - today's world price and rupee carried through that measured
//                markup, to say what a tola should cost right now even if the
//                local market has not reprinted.
//
// Comparing today's spot against a rate FENEGOSIDA last published three days
// ago does not measure a markup; it measures how far the metal moved over
// those three days. During a festival close that error runs to tens of
// percent, which is why `staleDays === 0` gates the series.

import { loadConfig, readHistory, writeJson, writeText, ROOT } from '../lib/store.mjs';
import { METALS, analyseMetal, goldSilverRatio, median } from '../lib/metal.mjs';
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

const gold = analyseMetal({ spec: METALS.gold, rows, today, cfg, C });
const silver = analyseMetal({ spec: METALS.silver, rows, today, cfg, C });

if (!gold) {
  console.error('No date has both a world gold price and a same-day Nepali rate. Run backfill.');
  process.exit(1);
}

const ratio = goldSilverRatio(gold, silver, C);

/* ----------------------------------------------------------- headline --- */

const flags = [];
const headline = headlineFor(gold, silver);

for (const [m, a] of [['', gold], ['silver-', silver]]) {
  if (!a) continue;
  if (a.verdict === 'local-expensive') flags.push(`${m}premium-high`);
  if (a.verdict === 'local-cheap') flags.push(`${m}premium-low`);
  if (a.verdict === 'insufficient-history') flags.push(`${m}thin-history`);
  const day = a.moves.find((x) => x.label === '1 day');
  if (day && Math.abs(day.nepalPct ?? 0) >= cfg.signal.dailyMovePctAlert) flags.push(`${m}big-daily-move`);
  if (Math.abs(a.indicated.repriceGapPct ?? 0) >= cfg.signal.dailyMovePctAlert) flags.push(`${m}reprice-pending`);
}
if (!gold.measured.isLive) flags.push('nepal-market-closed');
if (gold.measured.staleDays >= cfg.signal.staleNepalDataDays) flags.push('nepal-data-stale');
if (today.spot.isFutures) flags.push('spot-degraded-to-futures');

/* ---------------------------------------------------------------- out --- */

const analysis = {
  generatedAt: new Date().toISOString(),
  asOf: {
    record: today.d,
    spot: today.spot.asOf,
    fx: today.fx.asOf,
    nepalMeasured: gold.measured.date,
    staleDays: gold.measured.staleDays,
    isLive: gold.measured.isLive,
  },
  international: {
    goldUsdPerOz: gold.spotUsdPerOz,
    silverUsdPerOz: silver?.spotUsdPerOz ?? today.spot.xagUsdOz ?? null,
    goldUsdPerGram: round(gold.spotUsdPerOz / C.gramsPerTroyOunce, 2),
    silverUsdPerGram: silver?.spotUsdPerOz ? round(silver.spotUsdPerOz / C.gramsPerTroyOunce, 3) : null,
    source: today.spot.src,
  },
  fx: {
    usdNpr: today.fx.usdNpr,
    usdNprBuy: today.fx.usdNprBuy ?? null,
    inrNpr: today.fx.inrNpr ?? null,
    source: today.fx.src,
    asOf: today.fx.asOf,
  },

  metals: { gold, silver },
  ratio,

  // Live ticker inputs. The rupee leg is deliberately NOT live: NRB publishes
  // once a day, so the daily value is the right one to hold until tomorrow.
  live: {
    endpoints: { xau: cfg.live.spotEndpointXAU, xag: cfg.live.spotEndpointXAG },
    pollSeconds: cfg.live.pollSeconds,
    staleAfterSeconds: cfg.live.staleAfterSeconds,
    usdNpr: today.fx.usdNpr,
    constants: { gramsPerTroyOunce: C.gramsPerTroyOunce, gramsPerTola: C.gramsPerTola },
    gold: liveBlock(gold, cfg.costBuildUp, false),
    silver: liveBlock(silver, cfg.silverCostBuildUp, true),
  },

  // Legacy top-level gold fields, kept so anything reading the old shape still
  // works. `metals.gold` is the same data and is what new code should use.
  parity: { ...gold.parity, silverNprPerTola: silver?.parity.nprPerTola ?? null },
  buildUp: gold.buildUp,
  silverBuildUp: silver?.buildUp ?? null,
  indicated: { ...gold.indicated, silverNprPerTola: silver?.indicated.nprPerTola ?? null },
  measured: { ...gold.measured, silverNprPerTola: silver?.measured.actualNprPerTola ?? null, silverPremiumPct: silver?.measured.premiumPct ?? null },
  moves: gold.moves,
  series: gold.series.map((s) => ({ ...s, silver: silver?.series.find((x) => x.d === s.d)?.actual ?? null })),

  verdict: gold.verdict,
  headline,
  flags,
};

writeJson(path.join(ROOT, 'data', 'analysis.json'), analysis);
// The dashboard is a static page fetching a sibling file, so it needs its own
// copy. Writing both keeps `site/` publishable to Pages exactly as it stands.
writeJson(path.join(ROOT, 'site', 'analysis.json'), analysis);
const md = renderReport(analysis);
writeText(path.join(ROOT, 'reports', `${today.d}.md`), md);
writeText(path.join(ROOT, 'reports', 'latest.md'), md);
console.log(md);

/* ------------------------------------------------------------ helpers --- */

function liveBlock(a, costCfg, calibrated) {
  if (!a) return null;
  return {
    measuredMarkupPct: a.measured.premiumPct,
    ladder: {
      customsDutyNprPer10g: costCfg.customsDutyNprPer10g.value,
      vatRate: costCfg.vatRate.value,
      importHandlingRate: costCfg.importHandlingRate.value,
      dealerMarginRate: costCfg.dealerMarginRate.value,
    },
    ladderIsCalibrated: calibrated,
    lastPublishedNprPerTola: a.measured.actualNprPerTola,
    lastPublishedDate: a.measured.date,
    baselineSpotUsdOz: a.spotUsdPerOz,
  };
}

function headlineFor(g, s) {
  const ord = (n) => {
    const t = ['th', 'st', 'nd', 'rd'], v = n % 100;
    return n + (t[(v - 20) % 10] || t[v] || t[0]);
  };
  const part = (a) => {
    if (!a) return null;
    if (a.verdict === 'insufficient-history') return `${a.label.toLowerCase()} at ${fmtPct(a.measured.premiumPct)} (too little history to rank)`;
    return `${a.label.toLowerCase()} ${fmtPct(a.measured.premiumPct)} (${ord(Math.round(a.measured.percentile))} pctile)`;
  };
  const bits = [part(g), part(s)].filter(Boolean);
  const dear = [g, s].filter((a) => a?.verdict === 'local-expensive').map((a) => a.label.toLowerCase());
  const cheap = [g, s].filter((a) => a?.verdict === 'local-cheap').map((a) => a.label.toLowerCase());

  let tail = 'Both near their own normal.';
  if (dear.length === 2) tail = 'Both dear by local standards.';
  else if (cheap.length === 2) tail = 'An unusually narrow gap in both.';
  else if (dear.length === 1) tail = `${cap(dear[0])} is dear by local standards.`;
  else if (cheap.length === 1) tail = `${cap(cheap[0])} is unusually close to the world price.`;

  return `Nepali markups on ${g.measured.date} — ${bits.join(', ')}. ${tail}`;
}

// Function declarations, not const arrows: headlineFor runs during module
// evaluation, before any const further down the file is initialised.
function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function fmtPct(n) { return n == null ? 'n/a' : `${n > 0 ? '+' : ''}${Number(n).toFixed(2)}%`; }
function round(n, dp) { return Number.isFinite(n) ? Number(Number(n).toFixed(dp)) : null; }

/* ------------------------------------------------------------- render --- */

function renderReport(a) {
  const L = [];
  const npr = (n) => (n == null ? 'n/a' : 'NPR ' + Number(n).toLocaleString('en-IN'));
  const pct = (n, d = 2) => (n == null ? 'n/a' : `${n > 0 ? '+' : ''}${Number(n).toFixed(d)}%`);

  L.push(`# Bullion read - ${a.asOf.record}`);
  L.push('');
  L.push(`**${a.headline}**`);
  L.push('');

  L.push('## 1. Where the world price is right now');
  L.push('');
  L.push('| | |');
  L.push('|---|---|');
  L.push(`| Gold | **$${a.international.goldUsdPerOz.toLocaleString('en-US')} / troy oz** |`);
  L.push(`| Silver | **$${a.international.silverUsdPerOz?.toLocaleString('en-US') ?? 'n/a'} / troy oz** |`);
  L.push(`| Gold:silver ratio | ${a.ratio?.worldNow ?? 'n/a'} |`);
  L.push(`| USD/NPR (NRB selling, ${a.fx.asOf}) | ${a.fx.usdNpr} |`);
  L.push(`| INR/NPR | ${a.fx.inrNpr ?? 'n/a'} |`);
  L.push('');
  L.push(`Sources: ${a.international.source}; ${a.fx.source}.`);
  if (a.flags.includes('spot-degraded-to-futures')) {
    L.push('');
    L.push('> The spot source failed on this run and COMEX futures were used instead. Futures trade a little above spot, so every rupee figure below is marginally overstated.');
  }
  L.push('');

  for (const m of [a.metals.gold, a.metals.silver]) {
    if (!m) continue;
    L.push(`## ${m.label}`);
    L.push('');

    if (!m.measured.isLive) {
      L.push(`FENEGOSIDA last published on **${m.measured.date}**, ${m.measured.staleDays} day${m.measured.staleDays === 1 ? '' : 's'} ago. The indicated figure carries today's world price and rupee through the measured markup of ${pct(m.indicated.usingPremiumPct)}.`);
      L.push('');
    }

    L.push('| | Per tola | Per 10 g |');
    L.push('|---|---:|---:|');
    L.push(`| **Indicated now** | **${npr(m.indicated.nprPerTola)}** | ${npr(m.indicated.nprPer10g)} |`);
    L.push(`| Last published (${m.measured.date}) | ${npr(m.measured.actualNprPerTola)} | ${npr(m.measured.actualNprPer10g)} |`);
    L.push(`| World parity, same day | ${npr(m.measured.parityNprPerTola)} | — |`);
    L.push(`| At the median markup instead | ${npr(m.indicated.atMedianPremiumNprPerTola)} | — |`);
    L.push('');
    if (!m.measured.isLive && m.indicated.repriceGapPct != null) {
      L.push(`**Expect the next print around ${pct(m.indicated.repriceGapPct, 1)}** against the last one (${npr(m.indicated.repriceGapNpr)} per tola), if the markup holds.`);
      L.push('');
    }

    L.push('| Markup | |');
    L.push('|---|---|');
    L.push(`| Over world parity | **${pct(m.measured.premiumPct)}** (${npr(m.measured.premiumNpr)}) |`);
    L.push(`| Percentile over ${m.measured.historyDays} same-day observations | **${m.measured.percentile}** |`);
    L.push(`| Mean / median / sd | ${pct(m.measured.meanPct)} / ${pct(m.measured.medianPct)} / ${m.measured.sdPct}pp |`);
    L.push('');

    if (m.measured.regimeShift) {
      const r = m.measured.regimeShift;
      L.push(`> **Regime break around ${r.date}**: the markup stepped ${r.stepPp > 0 ? 'up' : 'down'} from ${pct(r.beforePct)} to ${pct(r.afterPct)} (${r.stepPp > 0 ? '+' : ''}${r.stepPp}pp) and held. Everything above ranks only the ${r.rankedAgainstDaysSince} observations since it.`);
      L.push('');
    }

    if (m.buildUp) {
      L.push('<details><summary>Cost ladder — where that markup goes</summary>');
      L.push('');
      L.push('| Step | Adds | Running total / tola |');
      L.push('|---|---:|---:|');
      for (const s of m.buildUp.steps) L.push(`| ${s.label} | ${s.add == null ? '—' : npr(s.add)} | ${npr(s.amount)} |`);
      L.push('');
      L.push(`Ladder total ${pct(m.buildUp.impliedMarkupPct)} against a markup measured at ${pct(m.measured.premiumPct)}.`);
      if (m.buildUp.calibrated) {
        L.push('');
        L.push(`**This ladder is calibrated, not independent.** ${m.label}'s duty was back-solved from observed prices rather than read from the Finance Act, so it describes the markup instead of confirming it.`);
      }
      L.push('</details>');
      L.push('');
    }

    if (m.moves.length) {
      L.push('| Window | World price | USD/NPR | Nepali rate | Markup |');
      L.push('|---|---:|---:|---:|---:|');
      for (const mv of m.moves) {
        L.push(`| ${mv.label} | ${pct(mv.spotPct, 1)} | ${pct(mv.fxPct, 1)} | ${pct(mv.nepalPct, 1)} | ${mv.premiumPointChange == null ? 'n/a' : `${mv.premiumPointChange > 0 ? '+' : ''}${mv.premiumPointChange.toFixed(1)}pp`} |`);
      }
      L.push('');
      const best = m.moves.find((x) => x.label === '1 month') ?? m.moves[m.moves.length - 1];
      if (best?.attribution) {
        const at = best.attribution;
        const parts = [['the world price', at.shares.spot], ['the rupee', at.shares.fx], ['the local markup', at.shares.premium]]
          .sort((x, y) => y[1] - x[1]);
        L.push(`Over ${best.label} the Nepali ${m.label.toLowerCase()} rate moved ${pct(at.totalPct, 1)}: ${pct(at.fromSpotPct, 1)} from the world price, ${pct(at.fromFxPct, 1)} from the rupee, ${pct(at.fromPremiumPct, 1)} from the local markup. Mostly **${parts[0][0]}** (${parts[0][1].toFixed(0)}%).`);
        L.push('');
      }
    }
  }

  if (a.ratio?.nepalNow) {
    const r = a.ratio;
    L.push('## Gold against silver');
    L.push('');
    L.push('| | Now | Median | |');
    L.push('|---|---:|---:|---|');
    L.push(`| World ratio | **${r.worldNow}** | ${r.worldMedian} | ${r.worldPercentile}th percentile of ${r.n} days |`);
    L.push(`| Nepal ratio | **${r.nepalNow}** | ${r.nepalMedian} | published rates |`);
    L.push('');
    const rich = r.localSilverRichnessPct;
    if (rich != null) {
      L.push(rich > 0
        ? `Nepal's ratio sits **${Math.abs(rich).toFixed(1)}% below** the world ratio, which means silver carries the heavier local markup of the two — it is relatively dearer here than gold is. One tola of gold buys ${r.nepalNow} tola of silver in Kathmandu against ${r.worldNow} internationally.`
        : `Nepal's ratio sits **${Math.abs(rich).toFixed(1)}% above** the world ratio, meaning gold carries the heavier local markup of the two. One tola of gold buys ${r.nepalNow} tola of silver in Kathmandu against ${r.worldNow} internationally.`);
      L.push('');
    }
    L.push('The ratio is the standard bullion yardstick, and locally it carries extra information: the two metals do not attract the same markup, so the Nepali ratio drifts from the world one whenever one metal becomes relatively costlier to import than the other.');
    L.push('');
  }

  L.push('---');
  L.push('');
  L.push(`Generated ${a.generatedAt} · flags: ${a.flags.length ? a.flags.join(', ') : 'none'}`);
  L.push('');
  L.push('Information only, not investment advice. Dealer buy/sell spreads are not reflected in any figure here.');
  return L.join('\n') + '\n';
}
