import { esc, localImage } from '../utils.mjs';

export function renderProductDetail({ page, allProducts }) {
  // Hero image: prefer first product image, fallback ok.
  const images = (page.images || [])
    .map(i => ({ src: localImage(i.src), alt: i.alt || page.title }))
    .filter(i => !/(narlight-search|product-left|product-right|sertifika|icon|logo)/i.test(i.src));
  const hero = images[0]?.src || '/brand_assets/favicon.ico';

  // Tables: page.tables is array of arrays. First row is often header.
  const specs = (page.tables || [])
    .filter(t => t.length && t[0].length > 1 && t[0].every(c => c && c.length < 60))
    .slice(0, 1)[0];
  const features = (page.paragraphs || [])
    .filter(p => p.length > 30 && p.length < 200 && !/Lütfen web/i.test(p))
    .slice(0, 6);

  // Related: 4 next products
  const idx = allProducts.findIndex(p => p.slug === page.slug);
  const related = [];
  for (let k = 1; related.length < 4 && k <= allProducts.length; k++) {
    const p = allProducts[(idx + k) % allProducts.length];
    if (p && p.hero && p.slug !== page.slug) related.push(p);
  }

  // Downloads: scraped from narlight.com.tr by fetch-datasheets.mjs.
  // Structure: [{ variant: "LPR3050", files: [{ label, url, localPath }] }]
  const downloads = Array.isArray(page.downloads) ? page.downloads : [];
  const hasDownloads = downloads.length > 0;

  return `
<section style="background:var(--color-ink);color:var(--color-paper);padding:160px 0 96px;position:relative;overflow:hidden">
  <div style="position:absolute;inset:0;background:radial-gradient(60% 50% at 80% 0%, rgba(255,179,71,0.08), transparent 60%), radial-gradient(80% 60% at 0% 100%, rgba(26,37,90,0.5), transparent 60%);pointer-events:none"></div>
  <div class="container" style="position:relative">
    <a href="/urunler/" style="display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 4px;margin:0 -4px 32px -4px;font-family:var(--font-body);font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.72)">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      Tüm Ürünler
    </a>
    <div style="display:grid;grid-template-columns:1fr;gap:48px;align-items:center" class="lg:grid-cols-2">
      <div class="hero-rev" data-d="1">
        <span class="section-tag dark"><span class="pulse"></span>Ürün Detayı</span>
        <h1 class="display display-1" style="color:var(--color-paper);max-width:18ch;margin:32px 0 0;font-size:clamp(40px,6vw,88px)">${esc(page.modelName || page.title)}</h1>
        <p style="font-family:var(--font-body);font-size:clamp(15px,1.05vw,18px);line-height:1.7;color:rgba(255,255,255,0.7);max-width:46ch;margin:32px 0 40px">
          Mimari aydınlatma için tasarlanmış yüksek verimli LED projektör. TSE/CE sertifikalı, IP67 koruma sınıfı, 1~10V/DALI dimming seçeneği.
        </p>
        <div style="display:flex;gap:14px">
          <a href="/iletisim/" class="btn">
            Teklif İste
            <svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </a>
          <a href="#specs" class="btn btn-ghost" style="border-color:rgba(255,255,255,0.2);color:rgba(255,255,255,0.9)">Teknik Veri</a>
        </div>
      </div>
      <div class="hero-rev" data-d="2" style="background:#fff;border-radius:24px;padding:48px;display:flex;align-items:center;justify-content:center;min-height:420px;border:1px solid rgba(255,255,255,0.1)">
        <img src="${esc(hero)}" alt="${esc(page.title)}" style="max-width:100%;max-height:340px;object-fit:contain">
      </div>
    </div>
  </div>
</section>

${specs ? `
<section class="section bg-ink" id="specs">
  <div class="container">
    <div class="section-head" data-reveal>
      <div>
        <span class="section-tag dark"><span class="pulse"></span>Teknik Veriler</span>
        <h2 class="display display-2" style="color:var(--color-paper);margin-top:32px;max-width:16ch">Her rakam,<br><span class="glow">bir taahhüt.</span></h2>
      </div>
      <p class="section-intro" style="color:rgba(255,255,255,0.65)">Güç, lümen, CRI, IP sınıfı, giriş gerilimi — her değer laboratuvarda ölçüldü, TSE/CE/RoHS ile sertifikalandı. Sahanın karşısına rakamla çıkıyoruz.</p>
    </div>
    <div class="code-show" data-reveal>
      <div class="head">
        <span class="dot dot-r"></span><span class="dot dot-y"></span><span class="dot dot-g"></span>
        <span class="filename">${esc((page.modelName || page.title).toLowerCase().replace(/\s+/g, '-'))}.spec</span>
      </div>
      <div class="body">
        <table style="width:100%;border-collapse:collapse;font:inherit">
          ${specs.map((row, i) => `
            <tr style="${i === 0 ? 'border-bottom:1px solid rgba(255,255,255,0.12)' : ''}">
              ${row.map(cell => `<td style="padding:14px 16px;color:${i === 0 ? 'var(--color-glow)' : 'rgba(255,255,255,0.78)'};font-size:13px;${i === 0 ? 'font-weight:600;letter-spacing:0.02em' : ''}">${esc(cell)}</td>`).join('')}
            </tr>
          `).join('')}
        </table>
      </div>
    </div>
  </div>
</section>` : ''}

${features.length > 0 ? `
<section class="section">
  <div class="container">
    <div class="section-head" data-reveal>
      <div>
        <span class="section-tag"><span class="pulse"></span>Özellikler</span>
        <h2 class="display display-2" style="margin-top:32px">Neden bu ürün?</h2>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" data-reveal-stagger>
      ${features.map((f, i) => `
        <div style="border:1px solid var(--color-line);border-radius:18px;padding:32px 28px;background:var(--color-paper)">
          <div style="font-family:var(--font-display);font-weight:800;font-size:22px;letter-spacing:-0.02em;color:var(--color-line-strong);margin-bottom:24px">0${i+1}</div>
          <p style="font-family:var(--font-body);font-size:13px;line-height:1.65;color:var(--color-ink-soft);margin:0">${esc(f)}</p>
        </div>
      `).join('')}
    </div>
  </div>
</section>` : ''}

${hasDownloads ? `
<!-- ======================================================
     DOWNLOADS  —  Per-variant datasheet PDFs + Download all ZIP
====================================================== -->
<section class="section" id="downloads" style="background:var(--color-paper-2)">
  <div class="container">
    <div class="section-head" data-reveal>
      <div>
        <span class="section-tag"><span class="pulse"></span>Belgeler</span>
        <h2 class="display display-2" style="margin-top:32px">Teknik dokümanlar.</h2>
      </div>
      <p class="section-intro">
        Bu ürüne ait tüm modellerin teknik veri sayfaları. Tasarımcı, mühendis ve saha ekipleri için detaylı boyut çizimleri, güç/lümen/CRI/IP değerleri ve sertifika kayıtları.
      </p>
    </div>
    <div class="downloads-grid" data-reveal-stagger>
      ${downloads.map((v, i) => `
        <details class="download-card"${i === 0 ? ' open' : ''}>
          <summary class="download-card-head">
            <div>
              <span class="download-card-variant">${esc(v.variant)}</span>
              <span class="download-card-count">${v.files.length} doküman</span>
            </div>
            <svg class="download-card-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
          </summary>
          <ul class="download-card-list">
            ${v.files.map(f => `
              <li>
                <a href="${esc(f.localPath || f.url)}" download target="_blank" rel="noopener">
                  <svg class="download-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 18 15 15"/></svg>
                  <span class="download-label">${esc(f.label)}</span>
                  <span class="download-meta">PDF</span>
                </a>
              </li>
            `).join('')}
          </ul>
        </details>
      `).join('')}
    </div>
  </div>
</section>` : ''}

<!-- ======================================================
     SHARE  —  Social share buttons for every product
====================================================== -->
<section class="section share-section">
  <div class="container">
    <div class="share-wrap" data-reveal>
      <div class="share-copy">
        <span class="section-tag"><span class="pulse"></span>Paylaş</span>
        <h2 class="display display-3" style="margin:20px 0 8px">Bu ürünü paylaş</h2>
        <p style="font-family:var(--font-body);font-size:14px;line-height:1.7;color:var(--color-mute);margin:0;max-width:40ch">
          Bir meslektaşınız ya da müşterinizle paylaşın — tek tıkla sosyal ağa, mesaja veya e-postaya.
        </p>
      </div>
      <div class="share-buttons" data-share data-share-title="${esc(page.modelName || page.title)}">
        <a class="share-btn share-fb" data-share-fb target="_blank" rel="noopener" aria-label="Facebook'ta paylaş" title="Facebook'ta paylaş">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12A10 10 0 1 0 10.37 21.87v-6.99H7.9V12h2.47V9.85c0-2.45 1.46-3.8 3.7-3.8 1.07 0 2.19.19 2.19.19v2.41h-1.23c-1.21 0-1.59.75-1.59 1.52V12h2.71l-.43 2.88h-2.28v6.99A10 10 0 0 0 22 12z"/></svg>
        </a>
        <a class="share-btn share-tw" data-share-tw target="_blank" rel="noopener" aria-label="X / Twitter'da paylaş" title="X / Twitter'da paylaş">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a class="share-btn share-li" data-share-li target="_blank" rel="noopener" aria-label="LinkedIn'de paylaş" title="LinkedIn'de paylaş">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>
        </a>
        <a class="share-btn share-wa" data-share-wa target="_blank" rel="noopener" aria-label="WhatsApp'ta paylaş" title="WhatsApp'ta paylaş">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.82 11.82 0 0 0 12.04.01C5.47.01.14 5.33.14 11.9c0 2.09.55 4.14 1.58 5.94L.05 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45h.01c6.58 0 11.9-5.33 11.9-11.9 0-3.17-1.24-6.15-3.43-8.42zm-8.47 18.34c-1.75 0-3.46-.47-4.96-1.36l-.36-.21-3.73.98 1-3.64-.23-.37a9.87 9.87 0 0 1-1.51-5.25c0-5.45 4.43-9.87 9.88-9.87 2.64 0 5.12 1.03 6.98 2.9a9.82 9.82 0 0 1 2.89 6.98c0 5.45-4.43 9.87-9.88 9.87zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.06 2.88 1.21 3.08.15.2 2.11 3.22 5.11 4.52.71.31 1.27.49 1.71.63.72.23 1.38.2 1.9.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35z"/></svg>
        </a>
        <a class="share-btn share-email" data-share-email aria-label="E-posta ile paylaş" title="E-posta ile paylaş">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </a>
        <button type="button" class="share-btn share-copy-btn" data-share-copy aria-label="Bağlantıyı kopyala" title="Bağlantıyı kopyala">
          <svg class="icon-copy" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          <svg class="icon-copied" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display:none"><polyline points="20 6 9 17 4 12"/></svg>
        </button>
      </div>
    </div>
  </div>
</section>

<!-- Related products -->
<section style="background:var(--color-paper-2);padding:96px 0">
  <div class="container">
    <div class="section-head" data-reveal>
      <div>
        <span class="section-tag"><span class="pulse"></span>Benzer Ürünler</span>
        <h2 class="display display-3" style="margin-top:24px">Sıradaki seçenekler.</h2>
      </div>
      <a href="/urunler/" class="btn btn-ghost" style="align-self:end">Tüm ürünler
        <svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
      </a>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-reveal-stagger>
      ${related.map(p => `
        <a href="${esc(p.href)}" class="card-link" style="background:var(--color-paper);border:1px solid var(--color-line)">
          <div class="card-image" style="aspect-ratio:1/1;background:#fff">
            ${p.hero ? `<img src="${esc(p.hero)}" alt="${esc(p.title)}" loading="lazy" style="object-fit:contain;padding:24px">` : ''}
          </div>
          <div style="padding:20px 24px 24px">
            <div class="eyebrow" style="margin-bottom:8px">— Model</div>
            <h3 style="font-family:var(--font-display);font-weight:800;font-size:16px;letter-spacing:-0.02em;line-height:1.2;margin:0">${esc(p.modelName || p.title)}</h3>
          </div>
        </a>
      `).join('')}
    </div>
  </div>
</section>
`;
}
