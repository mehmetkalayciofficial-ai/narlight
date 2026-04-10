// Narlight static site generator.
// Reads brand_assets/content/* and renders into dist/.
import fs from 'fs';
import path from 'path';
import { renderLayout } from './src/templates/layout.mjs';
import { renderHome } from './src/templates/home.mjs';
import { renderCorporate } from './src/templates/corporate.mjs';
import { renderContact } from './src/templates/contact.mjs';
import { renderProjectList } from './src/templates/project-list.mjs';
import { renderProjectDetail } from './src/templates/project-detail.mjs';
import { renderProductList } from './src/templates/product-list.mjs';
import { renderProductCategory } from './src/templates/product-category.mjs';
import { renderProductDetail } from './src/templates/product-detail.mjs';
import { renderNewsList } from './src/templates/news-list.mjs';
import { renderNewsDetail } from './src/templates/news-detail.mjs';
import {
  loadCategory,
  cleanParagraphs,
  pickHeroImage,
  nameFromTitle,
  cityFromTitle,
  projectHref,
  productCategoryHref,
  productHref,
  newsHref,
  slugify,
  writePage,
} from './src/utils.mjs';

const t0 = Date.now();

// Wipe dist/ on each build.
const DIST = 'dist';
if (fs.existsSync(DIST)) {
  fs.rmSync(DIST, { recursive: true, force: true });
}
fs.mkdirSync(DIST, { recursive: true });

// ---------- Load all content ----------
const corporate = loadCategory('corporate');
const projects  = loadCategory('projects');
const productCats = loadCategory('product-categories');
const products  = loadCategory('products');
const news      = loadCategory('news');

// ---------- Hydrate ----------
const projectsHydrated = projects.map(p => ({
  ...p,
  href: projectHref(p),
  hero: pickHeroImage(p.images),
  shortName: nameFromTitle(p.title),
  city: cityFromTitle(p.title),
}));
const productCatsHydrated = productCats.map(p => ({
  ...p,
  href: productCategoryHref(p),
  hero: pickHeroImage(p.images),
}));
const productsHydrated = products.map(p => ({
  ...p,
  href: productHref(p),
  hero: pickHeroImage(p.images),
  modelName: nameFromTitle(p.title),
}));
const newsHydrated = news.map(p => ({
  ...p,
  href: newsHref(p),
  hero: pickHeroImage(p.images),
  cleanParas: cleanParagraphs(p.paragraphs),
}));

let pageCount = 0;
const log = (label) => { pageCount++; if (pageCount <= 6 || pageCount % 20 === 0) console.log('  ' + label); };

// ---------- Homepage ----------
writePage('index.html', renderLayout({
  title: '',
  description: 'Narlight – Türkiye merkezli profesyonel aydınlatma armatürü tasarımı, üretimi ve proje uygulaması.',
  body: renderHome({ projects: projectsHydrated, productCats: productCatsHydrated, news: newsHydrated, corporate }),
}));
log('/ (homepage)');

// ---------- Corporate pages ----------
const corporateMap = {
  'hakkimizda': '/kurumsal/',
  'vizyonumuz': '/kurumsal/vizyonumuz/',
  'cozumlerimiz': '/kurumsal/cozumlerimiz/',
  'aydinlatma-tasarimi': '/kurumsal/aydinlatma-tasarimi/',
  'akilli-aydinlatma': '/kurumsal/akilli-aydinlatma/',
  'belgelerimiz': '/kurumsal/belgelerimiz/',
};
for (const c of corporate) {
  const slug = c.slug.replace(/^tr__/, '').replace(/-\d+$/, '');
  if (!corporateMap[slug]) continue;
  const url = corporateMap[slug];
  const out = url === '/kurumsal/' ? 'kurumsal/index.html' : path.posix.join(url.replace(/^\/+|\/+$/g, ''), 'index.html');
  writePage(out, renderLayout({
    title: c.title,
    description: (c.paragraphs?.find(p => p.length > 50) || '').slice(0, 160),
    body: renderCorporate({ page: c, allCorporate: corporate }),
  }));
  log(url);
}

// ---------- Contact page ----------
writePage('iletisim/index.html', renderLayout({
  title: 'İletişim',
  description: 'Narlight ile iletişime geçin: Bornova/İZMİR, +90 232 348 10 10, info@narlight.com.tr',
  body: renderContact(),
  bodyClass: 'no-sticky',
}));
log('/iletisim/');

// ---------- Project list + details ----------
writePage('projeler/index.html', renderLayout({
  title: 'Projeler',
  description: 'Türkiye genelinde 200+ aydınlatma projesi: cami, meydan, müze, üniversite, otoyol ve kent merkezleri.',
  body: renderProjectList({ projects: projectsHydrated }),
}));
log('/projeler/');

for (const p of projectsHydrated) {
  if (!p.hero) continue;
  const slug = slugify(p.shortName || p.slug);
  writePage(`projeler/${slug}/index.html`, renderLayout({
    title: p.shortName || p.title,
    description: `Narlight'ın ${p.title} projesi. Aydınlatma tasarımı, ürünler ve uygulama görselleri.`,
    body: renderProjectDetail({ page: p, allProjects: projectsHydrated }),
  }));
  log(`/projeler/${slug}/`);
}

// ---------- Product list + categories + details ----------
writePage('urunler/index.html', renderLayout({
  title: 'Ürünler',
  description: 'Narlight\'ın 40\'tan fazla aydınlatma ürün serisi. İç ve dış mekan, endüstriyel, akıllı sistemler.',
  body: renderProductList({ productCats: productCatsHydrated }),
}));
log('/urunler/');

for (const c of productCatsHydrated) {
  const slug = slugify(c.title);
  writePage(`urunler/${slug}/index.html`, renderLayout({
    title: c.title,
    description: `Narlight ${c.title} kategorisindeki ürünler ve modeller.`,
    body: renderProductCategory({ page: c, allProducts: productsHydrated, allCategories: productCatsHydrated }),
  }));
  log(`/urunler/${slug}/`);
}

for (const p of productsHydrated) {
  const slug = slugify(p.modelName || p.slug);
  writePage(`urunler/urun/${slug}/index.html`, renderLayout({
    title: p.modelName || p.title,
    description: `${p.modelName || p.title} - Narlight ürün detayı, teknik özellikler ve sertifikalar.`,
    body: renderProductDetail({ page: p, allProducts: productsHydrated }),
  }));
  log(`/urunler/urun/${slug}/`);
}

// ---------- News list + details ----------
writePage('basin-odasi/index.html', renderLayout({
  title: 'Basın Odası',
  description: 'Narlight haberleri, basın bültenleri, fuar ve etkinlik açıklamaları.',
  body: renderNewsList({ news: newsHydrated }),
}));
log('/basin-odasi/');

// Deduplicate news by stem of slug (some duplicated under different IDs)
// and skip ones whose titles are clearly garbage (very long or just "NAR")
const seenNewsKeys = new Set();
const uniqueNews = newsHydrated.filter(n => {
  if (!n.title || n.title.length < 4 || n.title.length > 110) return false;
  const stem = n.slug.replace(/^tr__/, '').replace(/-\d+$/, '').slice(0, 40);
  if (seenNewsKeys.has(stem)) return false;
  seenNewsKeys.add(stem);
  return true;
});

for (const n of uniqueNews) {
  const slug = slugify(n.title);
  writePage(`basin-odasi/${slug}/index.html`, renderLayout({
    title: n.title.slice(0, 60),
    description: (n.cleanParas?.[0] || '').slice(0, 160),
    body: renderNewsDetail({ page: n, allNews: uniqueNews }),
  }));
  log(`/basin-odasi/${slug}/`);
}

// ---------- 404 ----------
writePage('404.html', renderLayout({
  title: 'Sayfa bulunamadı',
  body: `
    <section style="background:var(--color-ink);color:var(--color-paper);min-height:100svh;display:flex;align-items:center;justify-content:center;text-align:center;padding:160px 24px 96px">
      <div>
        <span class="section-tag dark"><span class="pulse"></span>Hata 404</span>
        <h1 class="display display-1" style="color:var(--color-paper);margin:32px auto 24px;max-width:14ch">Burada ışık yok.</h1>
        <p style="color:rgba(255,255,255,0.65);max-width:42ch;margin:0 auto 40px">Aradığınız sayfa kaybolmuş ya da hiç var olmamış. Anasayfaya dönüp tekrar deneyin.</p>
        <a href="/" class="btn">
          Anasayfa
          <svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </a>
      </div>
    </section>
  `,
}));

// ---------- Copy runtime assets into dist/ ----------
// Vercel (and any static host) serves from a single output directory, so we
// materialise everything the generated HTML references inside dist/.
// Images: only the optimised .webp variants (+ svg/gif) get copied; the
// heavy .png/.jpg originals stay in source for reference.
function copyDir(src, dest, filter) {
  if (!fs.existsSync(src)) return 0;
  fs.mkdirSync(dest, { recursive: true });
  let count = 0;
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) count += copyDir(s, d, filter);
    else if (!filter || filter(entry.name)) { fs.copyFileSync(s, d); count++; }
  }
  return count;
}

const assetsCopied = copyDir('assets', path.join(DIST, 'assets'));

// Loose brand files.
fs.mkdirSync(path.join(DIST, 'brand_assets'), { recursive: true });
for (const f of ['logo.svg', 'logo-original.png', 'favicon.ico']) {
  if (fs.existsSync(path.join('brand_assets', f))) {
    fs.copyFileSync(path.join('brand_assets', f), path.join(DIST, 'brand_assets', f));
  }
}

// Only ship optimised image formats — skip the ~156 MB of heavy PNG/JPG
// originals now that every image has a .webp companion.
const webpFilter = (name) => /\.(webp|svg|gif|ico)$/i.test(name);
const imagesCopied = copyDir(
  path.join('brand_assets', 'images'),
  path.join(DIST, 'brand_assets', 'images'),
  webpFilter,
);
console.log(`  copied ${assetsCopied} assets + ${imagesCopied} images (webp/svg only) into dist/`);

// ---------- robots.txt ----------
fs.writeFileSync(path.join(DIST, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: /sitemap.xml\n');

// ---------- sitemap.xml ----------
const allUrls = [];
function walkDist(dir, base = '') {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    const st = fs.statSync(full);
    if (st.isDirectory()) walkDist(full, base + '/' + f);
    else if (f === 'index.html') allUrls.push(base + '/');
  }
}
walkDist(DIST);
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url><loc>https://www.narlight.com.tr${u.replace(/^\/+/, '/')}</loc></url>`).join('\n')}
</urlset>`;
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemapXml);

// ---------- Done ----------
const ms = Date.now() - t0;
console.log(`✓ Built dist/ in ${ms}ms — ${pageCount} pages, sitemap: ${allUrls.length} urls`);
