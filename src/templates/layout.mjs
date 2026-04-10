import { renderNav } from '../components/nav.mjs';
import { renderFooter } from '../components/footer.mjs';

export function renderLayout({
  title,
  description = 'Narlight – Türkiye merkezli profesyonel aydınlatma armatürü tasarımı ve üretimi.',
  body,
  navVariant = 'transparent',
  bodyClass = '',
}) {
  const fullTitle = title ? `${title} · Narlight` : 'Narlight – Aydınlatmanın Tasarımı';
  return `<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(fullTitle)}</title>
  <meta name="description" content="${escapeHtml(description)}">

  <link rel="icon" href="/brand_assets/favicon.ico">
  <link rel="preload" as="font" type="font/woff2" href="/assets/fonts/CabinetGrotesk-Variable.woff2" crossorigin>
  <link rel="preload" as="font" type="font/woff2" href="/assets/fonts/Satoshi-Variable.woff2" crossorigin>
  <link rel="stylesheet" href="/assets/css/site.css">

  <!-- Open Graph / Twitter -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(fullTitle)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:image" content="/brand_assets/images/PROJELER/15-Temmuz-Demokrasi/Galeri.png">
  <meta property="og:locale" content="tr_TR">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(fullTitle)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="theme-color" content="#0A0A0A">

</head>
<body class="${bodyClass}">
  <a href="#main" class="skip-link">İçeriğe geç</a>
  ${renderNav({ variant: navVariant })}
  <main id="main" data-sticky-trigger>${body}</main>
  ${renderFooter()}

  ${bodyClass.includes('no-sticky') ? '' : `
  <!-- Sticky CTA bar -->
  <div class="sticky-cta" data-sticky-cta role="complementary" aria-label="Hızlı iletişim">
    <span class="sticky-cta-text">Projeniz için teklif almak ister misiniz?</span>
    <a href="/iletisim/" class="btn">
      Teklif Al
      <svg class="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
    </a>
  </div>`}

  <!-- Lightbox modal -->
  <div class="lightbox" data-lightbox role="dialog" aria-modal="true" aria-label="Görsel önizleme">
    <button type="button" class="lightbox-close" data-lightbox-close aria-label="Kapat">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
    </button>
    <button type="button" class="lightbox-prev" data-lightbox-prev aria-label="Önceki">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
    </button>
    <button type="button" class="lightbox-next" data-lightbox-next aria-label="Sonraki">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
    </button>
    <img data-lightbox-img src="" alt="">
    <div class="lightbox-cap" data-lightbox-cap></div>
  </div>

  <script src="/assets/js/site.js" defer></script>
</body>
</html>`;
}

function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
