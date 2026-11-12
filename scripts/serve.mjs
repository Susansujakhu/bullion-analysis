// Local preview of the dashboard on this project's assigned hub port.
// Zero dependencies - the dashboard is a single static file plus one JSON.

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib/store.mjs';

const PORT = Number(process.env.PORT || 4010);
const SITE = path.join(ROOT, 'site');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
};

http.createServer((req, res) => {
  const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const file = path.join(SITE, rel);

  // Never serve outside site/, whatever the request says.
  if (!file.startsWith(SITE)) {
    res.writeHead(403).end('Forbidden');
    return;
  }
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
    return;
  }
  res.writeHead(200, {
    'Content-Type': TYPES[path.extname(file)] ?? 'application/octet-stream',
    'Cache-Control': 'no-store',
  });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => {
  console.log(`Bullion dashboard  ->  http://localhost:${PORT}`);
  if (!fs.existsSync(path.join(SITE, 'analysis.json'))) {
    console.log('No site/analysis.json yet - run `npm run analyse` or the page will show an error.');
  }
});
