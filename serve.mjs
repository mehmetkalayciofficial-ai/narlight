// Static file server for Narlight site preview.
// Serves project root at http://localhost:3000.
// "Pretty URL" support: /foo → /foo/index.html → /foo.html
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Generated site lives under dist/. Source assets (brand_assets, etc.) live at
// the project root and are exposed as-is so we don't have to copy them.
const DIST = path.join(__dirname, 'dist');
const PROJECT = __dirname;
const PORT = 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.htm':  'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.mjs':  'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif':  'image/gif',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
  '.ttf':  'font/ttf',
  '.eot':  'application/vnd.ms-fontobject',
  '.txt':  'text/plain; charset=utf-8',
  '.pdf':  'application/pdf',
  '.mp4':  'video/mp4',
};

function safeJoin(root, p) {
  const decoded = decodeURIComponent(p.split('?')[0]);
  const joined = path.normalize(path.join(root, decoded));
  if (!joined.startsWith(root)) return null;
  return joined;
}

function tryFiles(candidates) {
  for (const c of candidates) {
    try {
      const st = fs.statSync(c);
      if (st.isFile()) return c;
    } catch {}
  }
  return null;
}

// Paths that bypass dist/ and resolve straight from the project root.
// These are source/asset folders the generated pages link to.
const PROJECT_PASSTHRU = ['/brand_assets/', '/assets/', '/node_modules/'];

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';

  // Choose the right document root for this request.
  const passthru = PROJECT_PASSTHRU.some(p => urlPath.startsWith(p));
  const root = passthru ? PROJECT : DIST;
  const base = safeJoin(root, urlPath);
  if (!base) { res.writeHead(403); res.end('Forbidden'); return; }

  // Resolution order for HTML routes:
  // 1) exact file (style/img/etc.)
  // 2) /foo → /foo/index.html (pretty URL)
  // 3) /foo → /foo.html
  // 4) 404
  let file = tryFiles([
    base,
    path.join(base, 'index.html'),
    base + '.html',
  ]);
  if (!file) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<h1>404</h1><p>${urlPath}</p>`);
    return;
  }
  const ext = path.extname(file).toLowerCase();
  const mime = MIME[ext] || 'application/octet-stream';
  res.writeHead(200, {
    'Content-Type': mime,
    'Cache-Control': 'no-store',
  });
  fs.createReadStream(file).pipe(res);
});

server.listen(PORT, () => {
  console.log(`Narlight preview → http://localhost:${PORT}`);
});
