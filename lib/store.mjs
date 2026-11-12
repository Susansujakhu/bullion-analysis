// History lives in one append-only NDJSON file, one record per Kathmandu day.
//
// NDJSON rather than JSON because this file is committed back to the repo by a
// scheduled job every morning: a one-line-per-day format makes each commit a
// one-line diff, and a corrupt line costs one day rather than the whole file.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const HISTORY = path.join(ROOT, 'data', 'history.ndjson');
export const LATEST = path.join(ROOT, 'data', 'latest.json');

export function loadConfig() {
  return JSON.parse(fs.readFileSync(path.join(ROOT, 'config', 'parameters.json'), 'utf8'));
}

export function readHistory() {
  if (!fs.existsSync(HISTORY)) return [];
  const out = [];
  const lines = fs.readFileSync(HISTORY, 'utf8').split('\n');
  lines.forEach((line, i) => {
    const s = line.trim();
    if (!s) return;
    try {
      out.push(JSON.parse(s));
    } catch {
      // One bad line must not take the dataset down with it.
      console.warn(`! skipping unparseable history line ${i + 1}`);
    }
  });
  return out.sort((a, b) => String(a.d).localeCompare(String(b.d)));
}

/** Insert or replace the record for a day, then rewrite the file in date order. */
export function upsert(record) {
  const rows = readHistory().filter((r) => r.d !== record.d);
  rows.push(record);
  rows.sort((a, b) => String(a.d).localeCompare(String(b.d)));
  writeAll(rows);
  return rows;
}

export function writeAll(rows) {
  fs.mkdirSync(path.dirname(HISTORY), { recursive: true });
  const body = rows.map((r) => JSON.stringify(r)).join('\n') + '\n';
  fs.writeFileSync(HISTORY, body, 'utf8');
}

export function writeJson(file, obj) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(obj, null, 2) + '\n', 'utf8');
}

export function writeText(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text, 'utf8');
}

export function daysBetween(a, b) {
  return Math.round((Date.parse(b) - Date.parse(a)) / 864e5);
}

/** The newest record at or before `onOrBefore` that has a Nepali rate attached. */
export function lastWithNepal(rows, onOrBefore) {
  for (let i = rows.length - 1; i >= 0; i--) {
    const r = rows[i];
    if (onOrBefore && r.d > onOrBefore) continue;
    if (r.nepal?.rates && Object.keys(r.nepal.rates).length) return r;
  }
  return null;
}

/** The record closest to `targetDays` ago, for "versus a month back" comparisons. */
export function recordAgo(rows, targetDays, fromDate) {
  if (!rows.length) return null;
  const target = Date.parse(fromDate) - targetDays * 864e5;
  let best = null;
  let bestGap = Infinity;
  for (const r of rows) {
    if (!r.nepal?.rates) continue;
    const gap = Math.abs(Date.parse(r.d) - target);
    if (gap < bestGap) {
      bestGap = gap;
      best = r;
    }
  }
  // Refuse a match that is wildly off, rather than silently comparing against
  // the wrong period.
  if (best && bestGap > Math.max(10, targetDays * 0.4) * 864e5) return null;
  return best;
}
