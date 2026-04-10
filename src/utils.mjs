import fs from 'fs';
import path from 'path';

export const CONTENT_DIR = 'brand_assets/content';

// Convert Turkish text to URL-safe slug.
const trMap = { 'ç':'c','Ç':'c','ğ':'g','Ğ':'g','ı':'i','I':'i','İ':'i','ö':'o','Ö':'o','ş':'s','Ş':'s','ü':'u','Ü':'u' };
export function slugify(text) {
  return (text || '')
    .toString()
    .replace(/[çÇğĞıIİöÖşŞüÜ]/g, c => trMap[c] || c)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Strip noise paragraphs from extracted content.
const NOISE = [
  /lütfen web sitesine göre/i,
  /© tüm hakları/i,
  /e-bülten/i,
  /haberdar ol/i,
  /narlight['’]an en güncel/i,
  /narlight['’]den gelcek/i,
];
export function cleanParagraphs(paras = []) {
  return paras.filter(p => !NOISE.some(rx => rx.test(p)));
}

// Image src normalisation: turn remote narlight.com.tr URLs into local paths
// served by serve.mjs from the project root.
export function localImage(src) {
  if (!src) return '';
  // Already local? Return as-is.
  if (src.startsWith('/')) return src;
  // Match remote narlight.com.tr image URLs.
  const m = src.match(/narlight\.com\.tr\/Content\/images\/(.+)$/i);
  if (m) {
    // Path was URL-encoded; decode to match disk paths.
    const decoded = decodeURIComponent(m[1]);
    return '/brand_assets/images/' + decoded;
  }
  return src;
}

// Pick the most "hero-worthy" image from an image list — prefers large project
// galleries and skips icons/UI sprites.
export function pickHeroImage(images = []) {
  const prefer = images.find(i => /PROJELER/i.test(i.src) && /(\d+|hero|main|kapak|kucuk|big)/i.test(i.src));
  if (prefer) return localImage(prefer.src);
  const real = images.find(i =>
    !/icon|search|product-left|product-right|sertifika|logo|narlight-search/i.test(i.src),
  );
  return real ? localImage(real.src) : '';
}

// Strip "X / Y" or " - CITY" from titles for tighter listing display.
export function cityFromTitle(title = '') {
  const m = title.match(/[-/]\s*([^-/]+?)\s*$/);
  return m ? m[1].toUpperCase().replace(/[İI]ZMIR/i, 'İZMİR').trim() : '';
}
export function nameFromTitle(title = '') {
  return title.replace(/\s*[-/].*$/, '').trim();
}

// Read a JSON file under brand_assets/content.
export function loadJson(relPath) {
  return JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, relPath), 'utf8'));
}

// Read every JSON in a content subfolder.
export function loadCategory(sub) {
  const dir = path.join(CONTENT_DIR, sub);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));
}

// HTML escape.
export function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Build URL for a project / product / news given its source slug.
export function projectHref(p) {
  return `/projeler/${slugify(nameFromTitle(p.title) || p.slug)}/`;
}
export function productCategoryHref(p) {
  return `/urunler/${slugify(p.title || p.slug)}/`;
}
export function productHref(p) {
  return `/urunler/urun/${slugify(nameFromTitle(p.title) || p.slug)}/`;
}
export function newsHref(p) {
  return `/basin-odasi/${slugify(p.title || p.slug)}/`;
}
export function corporateHref(slug) {
  // Corporate JSON slugs look like "tr__hakkimizda-1012" → "/kurumsal/hakkimizda/"
  const trimmed = slug.replace(/^tr__/, '').replace(/-\d+$/, '');
  return `/kurumsal/${trimmed}/`;
}

// Write file ensuring parent dirs exist.
export function writePage(relPath, html) {
  const full = path.join('dist', relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html);
}
