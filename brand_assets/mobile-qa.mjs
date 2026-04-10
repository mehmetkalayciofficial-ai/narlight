// Comprehensive mobile QA: matrix of 5 device viewports × all key pages.
// Captures baseline + interactive state screenshots and reports issues.
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const BASE = 'http://localhost:3000';
const OUT = 'temporary screenshots/qa';
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const devices = [
  { id: 'iphone-se',     w: 375, h: 667, dpr: 2, ua: 'iPhone SE',     userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' },
  { id: 'iphone-13',     w: 390, h: 844, dpr: 3, ua: 'iPhone 13',     userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1' },
  { id: 'iphone-15-pm',  w: 430, h: 932, dpr: 3, ua: 'iPhone 15 Pro Max', userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1' },
  { id: 'galaxy-s22',    w: 360, h: 800, dpr: 3, ua: 'Galaxy S22',    userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36' },
  { id: 'pixel-7',       w: 412, h: 915, dpr: 3, ua: 'Pixel 7',       userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36' },
];

const pages = [
  { url: '/',                              key: 'home' },
  { url: '/kurumsal/',                     key: 'kurumsal' },
  { url: '/kurumsal/sss/',                 key: 'sss' },
  { url: '/iletisim/',                     key: 'iletisim' },
  { url: '/projeler/',                     key: 'projeler-list' },
  { url: '/projeler/15-temmuz-demokrasi-sehitleri-meydani/', key: 'proje-detay' },
  { url: '/urunler/',                      key: 'urunler-list' },
  { url: '/urunler/aydinlatma-direkleri/', key: 'urun-kategori' },
  { url: '/urunler/urun/agrestis/',        key: 'urun-detay' },
  { url: '/basin-odasi/',                  key: 'basin-list' },
  { url: '/basin-odasi/iste-isimiz-roportaji/', key: 'haber-detay' },
  { url: '/404.html',                      key: '404' },
];

const issues = [];

async function takeBaseline(browser, device) {
  for (const pg of pages) {
    const page = await browser.newPage();
    await page.setUserAgent(device.userAgent);
    await page.setViewport({ width: device.w, height: device.h, deviceScaleFactor: device.dpr, isMobile: true, hasTouch: true });
    const errs = [];
    page.on('pageerror', (e) => errs.push('JSERR ' + e.message));
    page.on('console', (m) => { if (m.type() === 'error') errs.push('CONSOLE ' + m.text()); });
    page.on('response', (r) => { if (r.status() >= 400) errs.push('HTTP ' + r.status() + ' ' + r.url().slice(-60)); });
    try {
      await page.goto(BASE + pg.url, { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise(r => setTimeout(r, 1500));
      // Check overflow
      const probe = await page.evaluate(() => {
        const docW = document.documentElement.scrollWidth;
        const winW = window.innerWidth;
        // Find any element wider than viewport
        const overflowing = [];
        document.querySelectorAll('*').forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.right > winW + 1) {
            const tag = el.tagName.toLowerCase();
            const cls = (el.className || '').toString().split(' ')[0];
            if (overflowing.length < 5) overflowing.push(`${tag}.${cls} right=${Math.round(r.right)}`);
          }
        });
        // Touch target audit
        const tooSmall = [];
        document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.height > 0 && (r.width < 36 || r.height < 36)) {
            if (tooSmall.length < 5) tooSmall.push(`${el.tagName.toLowerCase()}.${(el.className||'').toString().split(' ')[0]} ${Math.round(r.width)}x${Math.round(r.height)}`);
          }
        });
        return { docW, winW, overflowX: docW > winW, overflowing, tooSmall };
      });
      if (probe.overflowX) issues.push(`[${device.id}] ${pg.key}: page overflowX (${probe.docW}px vs ${probe.winW}px); offenders: ${probe.overflowing.join(', ')}`);
      if (probe.tooSmall.length) issues.push(`[${device.id}] ${pg.key}: small touch targets: ${probe.tooSmall.join(', ')}`);
      errs.forEach((e) => issues.push(`[${device.id}] ${pg.key}: ${e}`));
      await page.screenshot({ path: `${OUT}/${device.id}_${pg.key}.png`, fullPage: false });
    } catch (e) {
      issues.push(`[${device.id}] ${pg.key}: NAVIGATION FAIL — ${e.message}`);
    }
    await page.close();
  }
}

async function takeInteractive(browser, device) {
  // Mobile drawer + mega expand
  const page = await browser.newPage();
  await page.setUserAgent(device.userAgent);
  await page.setViewport({ width: device.w, height: device.h, deviceScaleFactor: device.dpr, isMobile: true, hasTouch: true });
  await page.goto(BASE + '/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));
  // Open drawer
  try {
    await page.tap('.nav-burger');
    await new Promise(r => setTimeout(r, 700));
    await page.screenshot({ path: `${OUT}/${device.id}_INT_drawer-open.png`, fullPage: false });
    // Open first mega accordion
    const opened = await page.evaluate(() => {
      const s = document.querySelector('.m-mega summary');
      if (!s) return false;
      s.click();
      return true;
    });
    if (opened) {
      await new Promise(r => setTimeout(r, 700));
      await page.screenshot({ path: `${OUT}/${device.id}_INT_drawer-mega.png`, fullPage: false });
    }
    // Close drawer
    await page.evaluate(() => document.querySelector('[data-mobile-drawer-close]')?.click());
    await new Promise(r => setTimeout(r, 500));
  } catch (e) {
    issues.push(`[${device.id}] drawer interaction failed: ${e.message}`);
  }

  // Hero carousel drag (PointerEvent dispatch — pure mouse.drag is unreliable in headless)
  try {
    await new Promise(r => setTimeout(r, 600));
    const result = await page.evaluate(() => {
      const root = document.querySelector('.carousel');
      if (!root) return 'no-carousel';
      const before = Array.from(document.querySelectorAll('.carousel-card')).map(c => c.style.opacity);
      const r = root.getBoundingClientRect();
      function fire(type, x) {
        root.dispatchEvent(new PointerEvent(type, { bubbles: true, cancelable: true, pointerId: 1, pointerType: 'touch', clientX: x, clientY: r.top + r.height / 2, button: 0, buttons: type === 'pointerup' ? 0 : 1 }));
      }
      fire('pointerdown', r.left + r.width * 0.7);
      for (let i = 1; i <= 6; i++) fire('pointermove', r.left + r.width * 0.7 - i * 25);
      fire('pointerup', r.left + r.width * 0.7 - 150);
      return new Promise(rs => setTimeout(() => {
        const after = Array.from(document.querySelectorAll('.carousel-card')).map(c => c.style.opacity);
        rs({ before, after, rotated: JSON.stringify(before) !== JSON.stringify(after) });
      }, 700));
    });
    if (result === 'no-carousel') issues.push(`[${device.id}] no carousel found on home`);
    else if (!result.rotated) issues.push(`[${device.id}] carousel drag did not rotate`);
    await page.screenshot({ path: `${OUT}/${device.id}_INT_carousel-drag.png`, fullPage: false });
  } catch (e) {
    issues.push(`[${device.id}] carousel drag failed: ${e.message}`);
  }

  // FAQ accordion
  try {
    await page.goto(BASE + '/kurumsal/sss/', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 700));
    await page.evaluate(() => document.querySelector('.faq-item summary')?.click());
    await new Promise(r => setTimeout(r, 500));
    const open = await page.evaluate(() => document.querySelector('.faq-item')?.hasAttribute('open'));
    if (!open) issues.push(`[${device.id}] FAQ accordion didn't open`);
    await page.screenshot({ path: `${OUT}/${device.id}_INT_faq-open.png`, fullPage: false });
  } catch (e) {
    issues.push(`[${device.id}] FAQ test failed: ${e.message}`);
  }

  // Form validation (contact)
  try {
    await page.goto(BASE + '/iletisim/', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 700));
    const result = await page.evaluate(() => {
      const f = document.querySelector('[data-contact-form]');
      if (!f) return 'no-form';
      f.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      return new Promise(rs => setTimeout(() => {
        rs({ errCount: document.querySelectorAll('.field-error').length });
      }, 400));
    });
    if (result === 'no-form') issues.push(`[${device.id}] no contact form`);
    else if (result.errCount === 0) issues.push(`[${device.id}] form validation produced 0 errors on empty submit`);
    await page.screenshot({ path: `${OUT}/${device.id}_INT_form-error.png`, fullPage: false });
  } catch (e) {
    issues.push(`[${device.id}] form test failed: ${e.message}`);
  }

  // Lightbox
  try {
    await page.goto(BASE + '/projeler/15-temmuz-demokrasi-sehitleri-meydani/', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 800));
    const opened = await page.evaluate(() => {
      const t = document.querySelector('[data-lightbox-trigger]');
      if (!t) return false;
      t.click();
      return true;
    });
    await new Promise(r => setTimeout(r, 700));
    if (opened) {
      const isOpen = await page.evaluate(() => document.querySelector('[data-lightbox]')?.classList.contains('is-open'));
      if (!isOpen) issues.push(`[${device.id}] lightbox didn't open`);
      await page.screenshot({ path: `${OUT}/${device.id}_INT_lightbox.png`, fullPage: false });
    } else {
      issues.push(`[${device.id}] no lightbox trigger on project detail`);
    }
  } catch (e) {
    issues.push(`[${device.id}] lightbox test failed: ${e.message}`);
  }

  await page.close();
}

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
console.log('=== Mobile QA matrix ===');
for (const d of devices) {
  console.log(`\n--- ${d.ua} (${d.w}x${d.h}) ---`);
  await takeBaseline(browser, d);
  await takeInteractive(browser, d);
  console.log(`  baseline + interactive done`);
}
await browser.close();

console.log(`\n\n=== ${issues.length} issues ===`);
issues.forEach((i, n) => console.log(`${n + 1}. ${i}`));
fs.writeFileSync(`${OUT}/_issues.txt`, issues.join('\n'));
