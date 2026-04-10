// Take a screenshot of a localhost URL with puppeteer.
// Usage:
//   node screenshot.mjs http://localhost:3000              → desktop screenshot
//   node screenshot.mjs http://localhost:3000 mobile       → 375px label
//   node screenshot.mjs http://localhost:3000 hero         → arbitrary label
//   node screenshot.mjs http://localhost:3000/projeler tablet
//
// Saves to ./temporary screenshots/screenshot-N[-label].png
// N is auto-incremented and never overwrites.
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, 'temporary screenshots');
fs.mkdirSync(OUT_DIR, { recursive: true });

const url = process.argv[2];
const label = (process.argv[3] || '').trim();
const fullArg = process.argv[4]; // 'full' or 'viewport' (default: full)
const scrollY = parseInt(process.argv[5] || '0', 10); // optional initial scroll
const fullPage = fullArg === 'viewport' ? false : true;
if (!url) {
  console.error('Usage: node screenshot.mjs <url> [label]');
  process.exit(1);
}

const presets = {
  mobile:  { width: 375,  height: 812,  deviceScaleFactor: 2 },
  tablet:  { width: 768,  height: 1024, deviceScaleFactor: 2 },
  desktop: { width: 1280, height: 800,  deviceScaleFactor: 2 },
  wide:    { width: 1920, height: 1080, deviceScaleFactor: 2 },
};
// Pick a preset by exact label OR by label substring (e.g. "home-mobile-hero").
function pickViewport(lbl) {
  if (presets[lbl]) return presets[lbl];
  for (const k of Object.keys(presets)) {
    if (lbl.includes(k)) return presets[k];
  }
  return presets.desktop;
}
const viewport = pickViewport(label);

function nextIndex() {
  const used = fs.readdirSync(OUT_DIR)
    .map(f => f.match(/^screenshot-(\d+)/))
    .filter(Boolean)
    .map(m => parseInt(m[1], 10));
  return used.length ? Math.max(...used) + 1 : 1;
}

const idx = nextIndex();
const filename = label
  ? `screenshot-${idx}-${label}.png`
  : `screenshot-${idx}.png`;
const outPath = path.join(OUT_DIR, filename);

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
});
try {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

  // Scroll through the page in steps to (a) trigger IntersectionObserver
  // reveals and (b) force loading="lazy" images to start fetching.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    const total = document.documentElement.scrollHeight;
    for (let y = 0; y < total; y += step) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 200));
  });

  // Wait for every <img> to finish loading (or fail). Lazy images that were
  // triggered above need this extra beat before the screenshot.
  await page.evaluate(async () => {
    const imgs = Array.from(document.images);
    await Promise.all(
      imgs.map(img => img.complete && img.naturalWidth > 0
        ? Promise.resolve()
        : new Promise(r => {
            img.addEventListener('load', r, { once: true });
            img.addEventListener('error', r, { once: true });
            // Safety timeout
            setTimeout(r, 5000);
          })),
    );
  });

  if (!fullPage && scrollY > 0) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await new Promise(r => setTimeout(r, 400));
  }

  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: outPath, fullPage });
  console.log(`Saved → ${path.relative(__dirname, outPath)} (${viewport.width}x${viewport.height})`);
} finally {
  await browser.close();
}
