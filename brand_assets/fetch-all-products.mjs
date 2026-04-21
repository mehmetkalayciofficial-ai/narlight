// Comprehensive scraper: walk narlight.com.tr's entire product tree,
// pull every category and every product detail page, and build a
// complete products.json + categories.json dataset.
//
// Output:
//   brand_assets/content/products-v2/     (one JSON per product)
//   brand_assets/content/categories-v2.json (category tree)
//   brand_assets/files/datasheets/        (all PDFs)
//   brand_assets/images/Products/         (all product photos)

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = 'https://www.narlight.com.tr';

const PRODUCT_OUT = path.join(__dirname, 'content', 'products-v2');
const CATEGORIES_OUT = path.join(__dirname, 'content', 'categories-v2.json');
const PDF_DIR = path.join(__dirname, 'files', 'datasheets');

fs.mkdirSync(PRODUCT_OUT, { recursive: true });
fs.mkdirSync(PDF_DIR, { recursive: true });

// Fetch with simple caching to disk so re-runs don't re-download.
const CACHE = path.join(__dirname, 'raw-html', 'cache-v2');
fs.mkdirSync(CACHE, { recursive: true });

function fetchText(url) {
  return new Promise((resolve, reject) => {
    const cacheKey = url.replace(/[^a-z0-9]/gi, '_').slice(0, 150) + '.html';
    const cachePath = path.join(CACHE, cacheKey);
    if (fs.existsSync(cachePath)) {
      resolve(fs.readFileSync(cachePath, 'utf8'));
      return;
    }
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 Narlight-Rebuild' } }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} at ${url}`));
        return;
      }
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        fs.writeFileSync(cachePath, data);
        resolve(data);
      });
    }).on('error', reject);
  });
}

function fetchBin(url) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode !== 200) { reject(new Error(`HTTP ${res.statusCode}`)); return; }
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

// Categories shown in the mega menu of narlight.com.tr (exactly the
// 3-column layout from the user's screenshot). Keys are slugs used in
// our own sitemap; `narlightUrl` is where to scrape products from.
const CATEGORIES = [
  // İç Aydınlatma
  { group: 'ic', label: 'Dekoratif Şarjlı Masa Lambası',    slug: 'dekoratif-sarjli-masa-lambasi',    url: '/TR/dekoratif-sarjli-masa-lambasi-18119' },
  { group: 'ic', label: 'Yatak Başı Aplikler',              slug: 'yatak-basi-aplikler',              url: '/TR/yatak-basi-aplikler-18118' },
  { group: 'ic', label: 'Dekoratif Merdiven Spotları',      slug: 'dekoratif-merdiven-spotlari',      url: '/TR/dekoratif-merdiven-spotlari-18117' },
  { group: 'ic', label: 'Sarkıt Armatürler',                slug: 'sarkit-armaturler',                url: '/TR/sarkit-armaturler-18116' },
  { group: 'ic', label: 'Magnet Ray Armatürler',            slug: 'magnet-ray-armaturler',            url: '/TR/magnet-ray-armaturler-18114' },
  { group: 'ic', label: 'Covid-19 Sterilizatörleri',        slug: 'covid-19-sterilizatorleri',        url: '/TR/covid-19-sterilizatorleri-18104' },
  { group: 'ic', label: 'Sıvaaltı LED Panel Armatürleri',   slug: 'sivaalti-led-panel-armaturleri',   url: '/TR/sivaalti-led-panel-armaturleri-1877' },
  { group: 'ic', label: 'Sıvaüstü LED Panel Armatürleri',   slug: 'sivaustu-led-panel-armaturleri',   url: '/TR/sivaustu-led-panel-armaturleri-1879' },
  { group: 'ic', label: 'LED Downlight ve Spot Armatürler', slug: 'led-downlight-ve-spot-armaturler', url: '/TR/led-downlight-ve-spot-armaturler-1880' },
  { group: 'ic', label: 'Lineer ve LEDBar Armatürler',      slug: 'lineer-ve-ledbar-armaturler',      url: '/TR/lineer-ve-ledbar-armaturler-1881' },
  { group: 'ic', label: 'Acil Çıkış Levhaları',             slug: 'acil-cikis-levhalari',             url: '/TR/acil-cikis-levhalari-18108' },
  { group: 'ic', label: 'LED Ampuller',                     slug: 'led-ampuller',                     url: '/TR/led-ampuller-18109' },
  // Dış Aydınlatma
  { group: 'dis', label: 'Tavan Armatürleri',                          slug: 'tavan-armaturleri',                          url: '/TR/tavan-armaturleri-189' },
  { group: 'dis', label: 'Duvar Armatürleri',                          slug: 'duvar-armaturleri',                          url: '/TR/duvar-armaturleri-1813' },
  { group: 'dis', label: 'Yere Gömme Armatürleri',                     slug: 'yere-gomme-armaturleri',                     url: '/TR/yere-gomme-armaturleri-1814' },
  { group: 'dis', label: 'Projektörler',                               slug: 'projektorler',                               url: '/TR/projektorler-1818' },
  { group: 'dis', label: 'Wallwasher ve LEDBar Armatürler',            slug: 'wallwasher-ve-ledbar-armaturler',            url: '/TR/wallwasher-ve-ledbar-armaturler-185' },
  { group: 'dis', label: 'Havuz Armatürleri',                          slug: 'havuz-armaturleri',                          url: '/TR/havuz-armaturleri-1854' },
  { group: 'dis', label: 'LED Sokak Aydınlatma Armatürleri',           slug: 'led-sokak-aydinlatma-armaturleri',           url: '/TR/led-sokak-aydinlatma-armaturleri-1831' },
  { group: 'dis', label: 'Park - Bahçe Armatürleri',                   slug: 'park-bahce-armaturleri',                     url: '/TR/park-bahce-armaturleri-186' },
  { group: 'dis', label: 'Endüstriyel Aydınlatma',                     slug: 'endustriyel-aydinlatma',                     url: '/TR/endustriyel-aydinlatma-1828' },
  { group: 'dis', label: 'Aydınlatma Elemanları ve Yedek Parçaları',   slug: 'aydinlatma-elemanlari-ve-yedek-parcalari',   url: '/TR/aydinlatma-elemanlari-ve-yedek-parcalari-1882' },
  // Yeni Ürünler
  { group: 'yeni', label: 'Yeni Ürünler', slug: 'yeni-urunler', url: '/TR/yeni-urunler-18102' },
];

// Extract product links from a category page. narlight category pages
// list products like <a href="/TR/agrestis-50w-100w-150w-16412">...</a>.
function extractProductLinks(html) {
  const links = new Set();
  const re = /href="(\/TR\/([a-z0-9-]+)-(\d+))"/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const url = m[1];
    const slug = m[2];
    // Skip obvious non-product routes (projects, news, corporate).
    if (/urunler|aydinlatma|armatur|projektör|lamba|aplik|spot|ampull|sarkit|magnet|levhalar/.test(slug)
        && !/hakkimizda|iletisim|akilli|cozum|tasarim|belgeler|bulten|sss|basin/.test(slug)) {
      links.add(url);
    }
  }
  return Array.from(links);
}

// Even better: for each category page, find anchors that wrap
// <div class="product-item"> or similar. Use a more permissive grab.
function extractAllProductAnchors(html, categorySlug) {
  const set = new Set();
  // narlight wraps each product card in <a href="/TR/..."> with an <img>
  // inside. Match the pattern "a href" + "img src" nearby.
  const re = /<a[^>]+href="(\/TR\/[^"]+)"[^>]*>[\s\S]{0,200}?<img[^>]+src="([^"]+)"/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const href = m[1];
    const img = m[2];
    if (!href.match(/-\d+$/)) continue; // must end with id
    if (href === `/TR/${categorySlug}`) continue; // self-link
    if (/hakkimizda|iletisim|cozum|tasarim|belgeler|bulten|sss|basin|projeler|haberler/.test(href)) continue;
    if (/logo|search|icon|sertifika|renk|left-right|product-left|product-right/i.test(img)) continue;
    set.add(href);
  }
  return Array.from(set);
}

// Parse a product detail page.
function parseProductPage(html, url) {
  const titleMatch = html.match(/<meta property='og:title' content='([^']+)'/);
  const title = titleMatch ? titleMatch[1].replace(/&#39;|&apos;/g, "'") : '';

  // Images — main product photo is usually in the gallery carousel.
  const imgs = [];
  const imgRe = /<img[^>]+src="([^"]+)"[^>]*(?:alt="([^"]*)")?/g;
  let im;
  while ((im = imgRe.exec(html)) !== null) {
    let src = im[1];
    const alt = im[2] || '';
    if (src.startsWith('/')) src = BASE + src;
    if (/logo|search|product-left|product-right|sertifika\d|yeni_renk_kodu|icon-|renk_kodu/i.test(src)) continue;
    if (!/Urunler|content\/images/i.test(src)) continue;
    imgs.push({ src, alt });
  }

  // Spec table
  const tables = [];
  const tableRe = /<table[^>]*>([\s\S]*?)<\/table>/g;
  let tm;
  while ((tm = tableRe.exec(html)) !== null) {
    const rows = [];
    const rowRe = /<tr[^>]*>([\s\S]*?)<\/tr>/g;
    let rm;
    while ((rm = rowRe.exec(tm[1])) !== null) {
      const cells = [];
      const cellRe = /<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g;
      let cm;
      while ((cm = cellRe.exec(rm[1])) !== null) {
        cells.push(cm[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
      }
      if (cells.length) rows.push(cells);
    }
    if (rows.length > 1) tables.push(rows);
  }

  // Description paragraphs
  const paragraphs = [];
  const pRe = /<p[^>]*>([\s\S]*?)<\/p>/g;
  let pm;
  while ((pm = pRe.exec(html)) !== null) {
    const txt = pm[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (txt.length > 30 && txt.length < 300 && !/Lütfen web|cookie|çerez|telif|copyright/i.test(txt)) {
      paragraphs.push(txt);
    }
  }

  // Downloads (datasheet PDFs) — same structure as existing scrape
  const downloads = [];
  const dlBlock = html.match(/<div class="products-download"[\s\S]*?<a class="pzip"/);
  if (dlBlock) {
    const block = dlBlock[0];
    const varRe = /<button[^>]*data-target="#(collap\d+)"[^>]*>([\s\S]*?)<i/g;
    let vm;
    while ((vm = varRe.exec(block)) !== null) {
      const collapId = vm[1];
      const varLabel = vm[2].replace(/<[^>]+>/g, '').trim();
      const innerRe = new RegExp(`<div id="${collapId}"[^>]*>([\\s\\S]*?)</div>\\s*</div>`);
      const innerM = block.match(innerRe);
      const files = [];
      if (innerM) {
        const linkRe = /<a href="([^"]+)"[^>]*>([^<]+)<\/a>/g;
        let lm;
        while ((lm = linkRe.exec(innerM[1])) !== null) {
          if (!lm[1] || lm[1] === '#') continue;
          files.push({ label: lm[2].trim(), url: lm[1] });
        }
      }
      if (files.length) downloads.push({ variant: varLabel, files });
    }
  }

  return { title, url, images: imgs, tables, paragraphs, downloads };
}

async function downloadFile(url, destDir, remap = (s) => s) {
  const fileName = decodeURIComponent(path.basename(url.split('?')[0]));
  const remapped = remap(fileName);
  const dest = path.join(destDir, remapped);
  if (fs.existsSync(dest)) return { ok: true, dest, localPath: `/brand_assets/files/datasheets/${encodeURIComponent(remapped)}`, cached: true };
  try {
    const buf = await fetchBin(url.startsWith('http') ? url : BASE + url);
    fs.writeFileSync(dest, buf);
    return { ok: true, dest, localPath: `/brand_assets/files/datasheets/${encodeURIComponent(remapped)}` };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

// --- MAIN ---
console.log(`Scraping ${CATEGORIES.length} categories...\n`);

const productByUrl = new Map(); // dedupe products across categories
const categoryToProducts = {};  // slug → [productUrl, ...]

for (const cat of CATEGORIES) {
  process.stdout.write(`  [${cat.slug}] fetching... `);
  try {
    const html = await fetchText(BASE + cat.url);
    const links = extractAllProductAnchors(html, cat.slug);
    categoryToProducts[cat.slug] = links;
    process.stdout.write(`${links.length} products\n`);
    for (const l of links) {
      if (!productByUrl.has(l)) productByUrl.set(l, { url: l, categories: [cat.slug] });
      else if (!productByUrl.get(l).categories.includes(cat.slug)) productByUrl.get(l).categories.push(cat.slug);
    }
  } catch (e) {
    process.stdout.write(`ERROR: ${e.message}\n`);
  }
}

console.log(`\nUnique products found: ${productByUrl.size}`);
console.log('Fetching product detail pages...\n');

let done = 0;
const total = productByUrl.size;
for (const [url, meta] of productByUrl) {
  done++;
  try {
    const html = await fetchText(BASE + url);
    const parsed = parseProductPage(html, url);
    const slug = url.replace(/^\/TR\//, '').replace(/-\d+$/, '');
    parsed.slug = slug;
    parsed.categories = meta.categories;

    // Download datasheets
    for (const v of parsed.downloads) {
      for (const f of v.files) {
        const r = await downloadFile(f.url, PDF_DIR);
        if (r.ok) f.localPath = r.localPath;
      }
    }

    const filename = slug + '.json';
    fs.writeFileSync(path.join(PRODUCT_OUT, filename), JSON.stringify(parsed, null, 2));
    if (done % 20 === 0 || done === total) console.log(`  [${done}/${total}] ${slug}  (${parsed.downloads.length} variants, ${parsed.images.length} imgs)`);
  } catch (e) {
    console.warn(`  [${done}/${total}] ${url} — FAIL: ${e.message}`);
  }
}

// Save category tree
const tree = CATEGORIES.map(c => ({
  ...c,
  products: categoryToProducts[c.slug] || [],
}));
fs.writeFileSync(CATEGORIES_OUT, JSON.stringify(tree, null, 2));

console.log(`\nDone.`);
console.log(`  ${productByUrl.size} products written to ${PRODUCT_OUT}`);
console.log(`  Category tree at ${CATEGORIES_OUT}`);
