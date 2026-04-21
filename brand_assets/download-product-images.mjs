// Download the main product photo for each v2 product into
// brand_assets/images/Urunler-v2/{slug}.png. These are the catalog
// tiles that show on /urunler/ and category pages.
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, 'images', 'Urunler-v2');
fs.mkdirSync(OUT, { recursive: true });

const PRODUCTS_DIR = path.join(__dirname, 'content', 'products-v2');
const files = fs.readdirSync(PRODUCTS_DIR).filter(f => f.endsWith('.json'));

function pickHero(product) {
  const imgs = product.images || [];
  // Prefer an image whose filename contains the product's model code
  // or matches the narlight "Urunler/<category>/<model>.png" pattern.
  const slugUpper = (product.slug || '').split('-')[0].toUpperCase();
  const modelMatch = imgs.find(i => i.src && slugUpper && i.src.toUpperCase().includes(slugUpper));
  if (modelMatch) return modelMatch.src;
  // Otherwise the first image that's under /Urunler/
  const first = imgs.find(i => /\/Urunler\//i.test(i.src || ''));
  return first ? first.src : (imgs[0]?.src || null);
}

function download(url, dest) {
  return new Promise((resolve) => {
    if (fs.existsSync(dest)) { resolve({ ok: true, cached: true }); return; }
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode !== 200) { resolve({ ok: false, status: res.statusCode }); return; }
      const out = fs.createWriteStream(dest);
      res.pipe(out);
      out.on('finish', () => { out.close(); resolve({ ok: true, size: fs.statSync(dest).size }); });
    }).on('error', (e) => resolve({ ok: false, error: e.message }));
  });
}

let ok = 0, failed = 0, cached = 0, missing = 0;
for (const f of files) {
  const p = JSON.parse(fs.readFileSync(path.join(PRODUCTS_DIR, f), 'utf8'));
  const heroUrl = pickHero(p);
  if (!heroUrl) { missing++; continue; }
  const ext = (heroUrl.match(/\.([a-z]{3,4})(\?|$)/i) || [,'png'])[1];
  const dest = path.join(OUT, `${p.slug}.${ext.toLowerCase()}`);
  const r = await download(heroUrl, dest);
  if (r.ok) {
    if (r.cached) cached++; else ok++;
    // Record local path back on the product JSON
    p.localHero = `/brand_assets/images/Urunler-v2/${p.slug}.${ext.toLowerCase()}`;
    fs.writeFileSync(path.join(PRODUCTS_DIR, f), JSON.stringify(p, null, 2));
  } else {
    failed++;
    console.warn(`  fail ${p.slug}: ${r.status || r.error}`);
  }
  if ((ok + cached) % 50 === 0) process.stdout.write(`  downloaded ${ok + cached}/${files.length}\r`);
}

console.log(`\nDone. ok=${ok} cached=${cached} failed=${failed} no-image=${missing}`);
