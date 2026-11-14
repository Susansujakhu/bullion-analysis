// Email delivery.
//
//   node scripts/notify.mjs            send only if something is worth saying
//   node scripts/notify.mjs --weekly   always send (the Sunday digest)
//   node scripts/notify.mjs --dry-run  render to stdout, send nothing
//
// Credentials come from the environment and are never read from, or written
// to, any file in this repo. In GitHub Actions they are repository secrets.
//
// A daily mail that says "gold did nothing again" trains you to ignore the
// one that matters, so the default path stays silent unless a flag fires.

import fs from 'node:fs';
import path from 'node:path';
import { ROOT, loadConfig } from '../lib/store.mjs';

const weekly = process.argv.includes('--weekly');
const dryRun = process.argv.includes('--dry-run');
const cfg = loadConfig();

const analysisPath = path.join(ROOT, 'data', 'analysis.json');
if (!fs.existsSync(analysisPath)) {
  console.error('No data/analysis.json. Run `npm run analyse` first.');
  process.exit(1);
}
const a = JSON.parse(fs.readFileSync(analysisPath, 'utf8'));

// Optional: the outlook is produced by a separate, non-fatal step, so the mail
// has to work whether or not it exists.
const forecastPath = path.join(ROOT, 'data', 'forecast.json');
const fc = fs.existsSync(forecastPath) ? JSON.parse(fs.readFileSync(forecastPath, 'utf8')) : null;

/* ------------------------------------------------- is this worth sending -- */

const ALERTING = new Set(['premium-high', 'premium-low', 'big-daily-move', 'reprice-pending']);
const triggered = (a.flags ?? []).filter((f) => ALERTING.has(f));

if (!weekly && !triggered.length) {
  console.log(`Nothing worth mailing (flags: ${(a.flags ?? []).join(', ') || 'none'}). Staying quiet.`);
  process.exit(0);
}

/* -------------------------------------------------------------- compose --- */

const npr = (n) => (n == null ? '—' : 'NPR ' + Number(n).toLocaleString('en-IN'));
const pct = (n, d = 2) => (n == null ? '—' : `${n > 0 ? '+' : ''}${Number(n).toFixed(d)}%`);

const subject = weekly
  ? `Bullion weekly — gold ${npr(a.indicated.nprPerTola)} (${pct(a.measured.premiumPct, 1)}), silver ${npr(a.metals?.silver?.indicated?.nprPerTola)} (${pct(a.metals?.silver?.measured?.premiumPct, 1)})`
  : `Bullion alert — ${triggered.join(', ')} — ${npr(a.indicated.nprPerTola)}/tola`;

const text = [
  a.headline,
  '',
  `World gold      $${a.international.goldUsdPerOz}/oz`,
  `USD/NPR         ${a.fx.usdNpr}  (NRB ${a.fx.asOf})`,
  `World parity    ${npr(a.parity.nprPerTola)} / tola`,
  `Indicated now   ${npr(a.indicated.nprPerTola)} / tola`,
  `Last published  ${npr(a.indicated.lastPublishedNprPerTola)} on ${a.asOf.nepalMeasured}`,
  a.asOf.isLive ? null : `Pending reprice ${pct(a.indicated.repriceGapPct, 1)} (${npr(a.indicated.repriceGapNpr)})`,
  '',
  `Local markup    ${pct(a.measured.premiumPct)}  (${a.measured.percentile} pctile of ${a.measured.historyDays} days, median ${pct(a.measured.medianPct)})`,
  '',
  ...(a.metals?.silver ? [
    '-- silver --',
    `World silver    $${a.international.silverUsdPerOz}/oz`,
    `Indicated now   ${npr(a.metals.silver.indicated.nprPerTola)} / tola`,
    `Last published  ${npr(a.metals.silver.measured.actualNprPerTola)} on ${a.metals.silver.measured.date}`,
    `Local markup    ${pct(a.metals.silver.measured.premiumPct)}  (${a.metals.silver.measured.percentile} pctile, median ${pct(a.metals.silver.measured.medianPct)})`,
    a.ratio?.nepalNow ? `Gold:silver     ${a.ratio.nepalNow} in Nepal vs ${a.ratio.worldNow} world` : null,
    '',
  ] : []),
  ...(fc ? [
    `-- one week out (${fc.horizonSessions} sessions) --`,
    ...['gold', 'silver'].flatMap((k) => {
      const m = fc.metals?.[k];
      if (!m) return [];
      return [
        `${k === 'gold' ? 'Gold  ' : 'Silver'}  central ${npr(m.projection.centralNprPerTola)} (${pct(m.projection.centralChangePct, 1)})`,
        `        68% band ${npr(m.projection.band68.lo)} - ${npr(m.projection.band68.hi)}`,
        `        markup ${pct(m.drivers.markupNowPct, 1)} -> ${pct(m.drivers.markupExpectedPct, 1)}, half-life ${m.drivers.ar1HalfLifeSessions} sessions`,
        m.backtest?.coverage68Pct != null
          ? `        band honesty: 68% band held ${m.backtest.coverage68Pct}% over ${m.backtest.n} tests`
          : null,
      ];
    }),
    'World prices are given no drift - the band is the forecast, not the mid-point.',
    '',
  ] : []),
  'Flags: ' + ((a.flags ?? []).join(', ') || 'none'),
].filter((l) => l !== null).join('\n');

const html = renderHtml(a);

if (dryRun) {
  console.log(`Subject: ${subject}\n\n${text}`);
  process.exit(0);
}

/* ----------------------------------------------------------------- send --- */

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO, MAIL_FROM } = process.env;
const missing = Object.entries({ SMTP_HOST, SMTP_USER, SMTP_PASS, MAIL_TO })
  .filter(([, v]) => !v).map(([k]) => k);

if (missing.length) {
  console.error(`Cannot send: missing ${missing.join(', ')}.`);
  console.error('Set them as repository secrets (Settings > Secrets and variables > Actions), or export them locally.');
  process.exit(1);
}

const { default: nodemailer } = await import('nodemailer');
const port = Number(SMTP_PORT || 587);

const transport = nodemailer.createTransport({
  host: SMTP_HOST,
  port,
  secure: port === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

try {
  const info = await transport.sendMail({
    from: MAIL_FROM || SMTP_USER,
    to: MAIL_TO,
    subject,
    text,
    html,
  });
  console.log(`Sent "${subject}" to ${MAIL_TO} (${info.messageId})`);
} catch (err) {
  console.error(`Send failed: ${err.message}`);
  process.exit(1);
}

/* --------------------------------------------------------------- render --- */

function renderHtml(a) {
  const row = (k, v, strong) =>
    `<tr><td style="padding:7px 0;color:#6b635a;font-size:13px">${k}</td>
     <td style="padding:7px 0;text-align:right;font-variant-numeric:tabular-nums;${strong ? 'font-weight:700;font-size:17px;color:#b8862b' : 'font-size:14px'}">${v}</td></tr>`;

  return `<div style="font:15px/1.55 -apple-system,Segoe UI,Roboto,sans-serif;color:#1a1714;max-width:560px;margin:0 auto;padding:8px">
    <h2 style="font-size:17px;margin:0 0 4px">Bullion Analysis</h2>
    <p style="color:#6b635a;font-size:13px;margin:0 0 18px">
      World price ${a.asOf.record} · Nepali rate ${a.asOf.nepalMeasured}${a.asOf.isLive ? '' : ` (${a.asOf.staleDays}d ago, market closed)`}
    </p>
    <p style="background:#f0e3c8;border-left:3px solid #b8862b;padding:13px 15px;margin:0 0 20px;border-radius:0 6px 6px 0">
      ${escapeHtml(a.headline)}
    </p>
    <table style="width:100%;border-collapse:collapse">
      ${row('Indicated rate now', npr(a.indicated.nprPerTola) + ' / tola', true)}
      ${row('World gold', '$' + a.international.goldUsdPerOz + ' / oz')}
      ${row('USD / NPR', a.fx.usdNpr)}
      ${row('World parity', npr(a.parity.nprPerTola) + ' / tola')}
      ${row('Last published', npr(a.indicated.lastPublishedNprPerTola) + ' · ' + a.asOf.nepalMeasured)}
      ${a.asOf.isLive ? '' : row('Pending reprice', pct(a.indicated.repriceGapPct, 1) + ' (' + npr(a.indicated.repriceGapNpr) + ')')}
      ${row('Local markup', pct(a.measured.premiumPct) + ' · ' + a.measured.percentile + 'th pctile')}
      ${row('Markup median', pct(a.measured.medianPct) + ' over ' + a.measured.historyDays + ' days')}
    </table>
    ${a.moves?.length ? `
    <h3 style="font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:#6b635a;margin:24px 0 8px">What moved</h3>
    <table style="width:100%;border-collapse:collapse;font-size:13px">
      <tr style="color:#6b635a"><th align="left" style="font-weight:600;padding:5px 0">Window</th>
        <th align="right" style="font-weight:600">Gold</th><th align="right" style="font-weight:600">USD/NPR</th>
        <th align="right" style="font-weight:600">Nepal</th><th align="right" style="font-weight:600">Markup</th></tr>
      ${a.moves.map((m) => `<tr style="border-top:1px solid #e6e1d9">
        <td style="padding:6px 0">${m.label}</td>
        <td align="right">${pct(m.spotPct, 1)}</td><td align="right">${pct(m.fxPct, 1)}</td>
        <td align="right">${pct(m.nepalPct, 1)}</td>
        <td align="right">${m.premiumPointChange == null ? '—' : (m.premiumPointChange > 0 ? '+' : '') + m.premiumPointChange.toFixed(1) + 'pp'}</td>
      </tr>`).join('')}
    </table>` : ''}
    <p style="color:#6b635a;font-size:12px;margin-top:24px;border-top:1px solid #e6e1d9;padding-top:12px">
      Flags: ${(a.flags ?? []).join(', ') || 'none'}<br>
      Information only, not investment advice. Dealer buy/sell spreads are not reflected in these figures.
    </p>
  </div>`;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}
