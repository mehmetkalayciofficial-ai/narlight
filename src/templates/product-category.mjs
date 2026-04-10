import { esc, localImage } from '../utils.mjs';

export function renderProductCategory({ page, allProducts, allCategories }) {
  // Naive guess: products that share a slug stem with the category, OR
  // simply the first 8 products as samples.
  const linked = allProducts.slice(0, 12);

  return `
<section style="background:var(--color-ink);color:var(--color-paper);padding:160px 0 80px;position:relative;overflow:hidden">
  <div style="position:absolute;inset:0;background:radial-gradient(60% 50% at 80% 0%, rgba(255,179,71,0.08), transparent 60%), radial-gradient(80% 60% at 0% 100%, rgba(26,37,90,0.5), transparent 60%);pointer-events:none"></div>
  <div class="container" style="position:relative">
    <a href="/urunler/" style="display:inline-flex;align-items:center;gap:8px;font-family:var(--font-body);font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.72);margin-bottom:24px">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      Tüm Kategoriler
    </a>
    <span class="section-tag dark"><span class="pulse"></span>Ürün Kategorisi</span>
    <h1 class="display display-1 hero-rev" data-d="1" style="color:var(--color-paper);max-width:18ch;margin:32px 0 0">${esc(page.title)}</h1>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head" data-reveal>
      <div>
        <span class="section-tag"><span class="pulse"></span>Bu kategoride</span>
        <h2 class="display display-3" style="margin-top:24px">Modeller ve seriler.</h2>
      </div>
      <p class="section-intro">Bu kategori altındaki tüm ürünleri inceleyin. Her modelin teknik özellikleri, sertifikaları ve uygulama örnekleri detay sayfasında.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-reveal-stagger>
      ${linked.map(p => `
        <a href="${esc(p.href)}" class="card-link" style="background:var(--color-paper-3);border:1px solid var(--color-line)">
          <div class="card-image" style="aspect-ratio:1/1;background:#fff">
            ${p.hero ? `<img src="${esc(p.hero)}" alt="${esc(p.title)}" loading="lazy" style="object-fit:contain;padding:24px">` : ''}
          </div>
          <div style="padding:24px 28px 28px;background:var(--color-paper)">
            <div class="eyebrow" style="margin-bottom:10px">— Model</div>
            <h3 style="font-family:var(--font-display);font-weight:800;font-size:18px;letter-spacing:-0.02em;line-height:1.15;margin:0">${esc(p.modelName || p.title)}</h3>
          </div>
        </a>
      `).join('')}
    </div>
  </div>
</section>

<!-- Other categories -->
<section style="background:var(--color-paper-2);padding:96px 0">
  <div class="container">
    <h2 class="display display-3" style="margin:0 0 48px">Diğer kategoriler</h2>
    <div class="marquee" style="--marquee-dur:50s">
      <div class="marquee-content">
        ${[...allCategories, ...allCategories].slice(0, 24).map(c => `
          <a href="${esc(c.href)}" style="font-family:var(--font-display);font-weight:700;font-size:24px;letter-spacing:-0.01em;color:var(--color-line-strong);white-space:nowrap;display:inline-flex;align-items:center;gap:18px;transition:color 240ms var(--ease-out)" onmouseover="this.style.color='var(--color-ink)'" onmouseout="this.style.color='var(--color-line-strong)'">
            ${esc(c.title)}
            <span style="display:inline-block;width:6px;height:6px;background:var(--color-glow);border-radius:50%"></span>
          </a>
        `).join('')}
      </div>
    </div>
  </div>
</section>
`;
}
