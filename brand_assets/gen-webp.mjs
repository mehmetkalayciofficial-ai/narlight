// Generate WebP variants next to every .png / .jpg / .jpeg inside
// brand_assets/images/. Idempotent — skips files whose .webp already exists.
// Parallel with a small worker pool so 1300+ images finish in a sensible time.
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = 'brand_assets/images';
const MAX_WIDTH = 1600;
const QUALITY = 82;
const CONCURRENCY = 8;

function collect(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...collect(p));
    else if (/\.(png|jpe?g)$/i.test(entry.name)) out.push(p);
  }
  return out;
}

const files = collect(ROOT);
console.log(`Found ${files.length} source images`);

let done = 0, made = 0, skipped = 0, failed = 0;
const startMs = Date.now();

async function worker(id) {
  while (true) {
    const i = done++;
    if (i >= files.length) break;
    const src = files[i];
    const webp = src.replace(/\.(png|jpe?g)$/i, '.webp');
    if (fs.existsSync(webp)) { skipped++; continue; }
    try {
      await sharp(src)
        .rotate() // honour EXIF
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 4 })
        .toFile(webp);
      made++;
      if (made % 50 === 0) console.log(`  [${made + skipped}/${files.length}] latest: ${path.basename(webp)}`);
    } catch (e) {
      failed++;
      console.error('✗', src, e.message);
    }
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, (_, i) => worker(i)));
const sec = ((Date.now() - startMs) / 1000).toFixed(1);
console.log(`Done in ${sec}s — made ${made}, skipped ${skipped}, failed ${failed}`);
