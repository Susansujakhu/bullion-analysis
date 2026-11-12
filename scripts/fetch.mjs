// Daily collector. Cheap, no AI, no API keys. Runs every morning so the price
// history never develops a hole - gaps in a time series cannot be backfilled
// from a source that only serves "today".
//
// Exit codes: 0 wrote a record (possibly a partial one), 1 could not write
// anything at all. A missing Nepali rate is NOT a failure; FENEGOSIDA stops
// publishing over Dashain and Tihar and the record is still worth keeping.

import { fetchSpot, fetchForex, fetchNepal, kathmanduDate } from '../lib/sources.mjs';
import { loadConfig, upsert, writeJson, LATEST } from '../lib/store.mjs';

const cfg = loadConfig();
const d = kathmanduDate();

const problems = [];
const settle = async (label, p) => {
  try {
    return await p;
  } catch (err) {
    problems.push(`${label}: ${err.message}`);
    console.error(`! ${label} failed - ${err.message}`);
    return null;
  }
};

const [spot, fx, nepal] = await Promise.all([
  settle('spot', fetchSpot()),
  settle('forex', fetchForex()),
  settle('nepal', fetchNepal(cfg.rateTypeMap)),
]);

if (!spot && !fx && !nepal) {
  console.error('All three sources failed. Writing nothing.');
  process.exit(1);
}

const record = { d, fetchedAt: new Date().toISOString() };

if (spot) {
  record.spot = {
    xauUsdOz: round(spot.xauUsdOz, 2),
    xagUsdOz: round(spot.xagUsdOz, 3),
    asOf: spot.asOf,
    src: spot.src,
    ...(spot.isFutures ? { isFutures: true } : {}),
    ...(spot.degraded ? { degraded: spot.degraded } : {}),
  };
}

if (fx) {
  record.fx = {
    usdNpr: round(fx.usdNprSell, 4),
    usdNprBuy: round(fx.usdNprBuy, 4),
    inrNpr: fx.inrNpr ? round(fx.inrNpr, 4) : null,
    asOf: fx.asOf,
    src: fx.src,
  };
}

if (nepal && Object.keys(nepal.rates).length) {
  const staleDays = nepal.asOf ? Math.round((Date.parse(d) - Date.parse(nepal.asOf)) / 864e5) : null;
  record.nepal = {
    rates: nepal.rates,
    asOf: nepal.asOf,
    staleDays,
    src: nepal.src,
    ...(nepal.unmapped?.length ? { unmappedLabels: nepal.unmapped } : {}),
  };
  if (staleDays >= cfg.signal.staleNepalDataDays) {
    console.warn(`! FENEGOSIDA last published ${nepal.asOf} (${staleDays} days ago) - likely a festival close`);
  }
  if (nepal.unmapped?.length) {
    // Worth shouting about: a new rate type means the federation started
    // publishing something the config does not name yet.
    console.warn(`! unmapped FENEGOSIDA labels: ${nepal.unmapped.join(', ')}`);
  }
}

if (problems.length) record.problems = problems;

const rows = upsert(record);
writeJson(LATEST, { generatedAt: new Date().toISOString(), record });

console.log(`Wrote ${d}  (history now ${rows.length} day${rows.length === 1 ? '' : 's'})`);
if (record.spot) console.log(`  spot   XAU $${record.spot.xauUsdOz}/oz   XAG $${record.spot.xagUsdOz}/oz`);
if (record.fx) console.log(`  fx     USD/NPR ${record.fx.usdNpr}  (NRB ${record.fx.asOf})`);
if (record.nepal) {
  const bench = record.nepal.rates[cfg.benchmarkKey];
  console.log(`  nepal  ${cfg.benchmarkKey} ${bench != null ? `NPR ${bench}` : 'n/a'}  (published ${record.nepal.asOf})`);
} else {
  console.log('  nepal  no rate published');
}

function round(n, dp) {
  return Number.isFinite(n) ? Number(n.toFixed(dp)) : null;
}
