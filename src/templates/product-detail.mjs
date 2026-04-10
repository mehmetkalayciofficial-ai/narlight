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

  return `
<section style="background:var(--color-ink);color:var(--color-paper);padding:160px 0 96px;position:relative;overflow:hidden">
  <div style="position:absolute;inset:0;background:radial-gradient(60% 50% at 80% 0%, rgba(255,179,71,0.08), transparent 60%), radial-gradient(80% 60% at 0% 100%, rgba(26,37,90,0.5), transparent 60%);pointer-events:none"></div>
  <div class="container" style="position:relative">
    <a href="/urunler/" style="display:inline-flex;align-items:center;gap:8px;font-family:var(--font-body);font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.72);margin-bottom:32px">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      Tüm Ürünler
    </a>
    <div style="display:grid;grid-template-columns:1fr;gap:48px;align-items:center" class="lg:grid-cols-2">
      <div class="hero-rev" data-d="1">
        <span class="section-tag dark"><span class="pulse"></span>Ürün Detayı</span>
        <h1 class="display display-1" style="color:var(--color-paper);max-width:14ch;margin:32px 0 0;font-size:clamp(40px,6vw,88px)">${esc(page.modelName || page.title)}</h1>
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
        <h2 class="display display-2" style="color:var(--color-paper);margin-top:32px">Spec çıktısı.</h2>
      </div>
      <p class="section-intro" style="color:rgba(255,255,255,0.65)">Tüm modeller, güç ve lümen değerleri. Sertifikalar ve kontrol seçenekleri.</p>
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
