// Extract all Datasheet/download links from raw-html product pages,
// download the PDFs locally, and emit a `downloads` field on each
// product JSON so the product-detail template can render them.
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW_HTML_DIR = path.join(__dirname, 'raw-html');
const PRODUCT_JSON_DIR = path.join(__dirname, 'content', 'products');
const FILES_DIR = path.join(__dirname, 'files', 'datasheets');
const BASE_URL = 'https://www.narlight.com.tr';

fs.mkdirSync(FILES_DIR, { recursive: true });

// Map from raw-html filename to product JSON filename
const productFiles = fs.readdirSync(PRODUCT_JSON_DIR).filter(f => f.endsWith('.json'));

// Extract Downloads block from raw HTML. Each product has a
// <div class="products-download"> containing one <button> per
// product variant (e.g. LPR3050, LPR3100, LPR3150) and inside
// each button's collapse panel a list of <a href="..."> download
// links labeled "Datasheet" / "Işık Dağılımı" etc.
function extractDownloads(html) {
  const blockMatch = html.match(/<div class="products-download"[\s\S]*?<a class="pzip"/);
  if (!blockMatch) return [];
  const block = blockMatch[0];
  const variants = [];
  // Each variant: <button ...>LABEL<i></i></button>...<div id="collapN" ...>INNER</div>
  const varRe = /<button[^>]*data-target="#(collap\d+)"[^>]*>([\s\S]*?)<i/g;
  let m;
  while ((m = varRe.exec(block)) !== null) {
    const collapId = m[1];
    const label = m[2].trim();
    // Find the matching <div id="collapN" ...>...</div>
    const innerRe = new RegExp(`<div id="${collapId}"[^>]*>([\\s\\S]*?)</div>\\s*</div>`);
    const innerMatch = block.match(innerRe);
    const inner = innerMatch ? innerMatch[1] : '';
    // Extract all <a href="...">TEXT</a>
    const linkRe = /<a href="([^"]+)"[^>]*>([^<]+)<\/a>/g;
    const links = [];
    let lm;
    while ((lm = linkRe.exec(inner)) !== null) {
      const href = lm[1];
      const text = lm[2].trim();
      if (!href || href === '#') continue;
      links.push({ label: text, url: href });
    }
    if (links.length) variants.push({ variant: label, files: links });
  }
  return variants;
}

// Download a PDF/file to brand_assets/files/datasheets/ preserving
// original filename. Skip if the file already exists.
function downloadFile(relativeUrl) {
  return new Promise((resolve) => {
    const url = relativeUrl.startsWith('http') ? relativeUrl : BASE_URL + relativeUrl;
    const filename = decodeURIComponent(path.basename(relativeUrl.split('?')[0]));
    const dest = path.join(FILES_DIR, filename);
    if (fs.existsSync(dest)) {
      resolve({ ok: true, localPath: `/brand_assets/files/datasheets/${encodeURIComponent(filename)}`, cached: true });
      return;
    }
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        fs.unlink(dest, () => {});
        resolve({ ok: false, status: res.statusCode, url });
        return;
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve({ ok: true, localPath: `/brand_assets/files/datasheets/${encodeURIComponent(filename)}`, size: fs.statSync(dest).size });
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      resolve({ ok: false, error: err.message, url });
    });
  });
}

let totalVariants = 0;
let totalFiles = 0;
let totalDownloaded = 0;
let totalCached = 0;
let totalFailed = 0;

for (const jsonFile of productFiles) {
  // JSON filename -> HTML filename: same basename, .html
  const baseName = jsonFile.replace(/\.json$/, '');
  const htmlPath = path.join(RAW_HTML_DIR, `${baseName}.html`);
  if (!fs.existsSync(htmlPath)) continue;

  const html = fs.readFileSync(htmlPath, 'utf8');
  const variants = extractDownloads(html);
  if (!variants.length) continue;

  totalVariants += variants.length;

  // Download every file and replace URL with local path
  for (const v of variants) {
    for (const f of v.files) {
      totalFiles++;
      const r = await downloadFile(f.url);
      if (r.ok) {
        f.localPath = r.localPath;
        if (r.cached) totalCached++;
        else totalDownloaded++;
      } else {
        totalFailed++;
        console.warn(`  ✗ ${f.url} → ${r.status || r.error}`);
      }
    }
  }

  // Update JSON with downloads field
  const jsonPath = path.join(PRODUCT_JSON_DIR, jsonFile);
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  data.downloads = variants;
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
  console.log(`  ✓ ${baseName}: ${variants.length} variants, ${variants.reduce((s, v) => s + v.files.length, 0)} files`);
}

console.log('\nSummary:');
console.log(`  Product variants:  ${totalVariants}`);
console.log(`  Total files:       ${totalFiles}`);
console.log(`  Downloaded fresh:  ${totalDownloaded}`);
console.log(`  Already cached:    ${totalCached}`);
console.log(`  Failed:            ${totalFailed}`);
