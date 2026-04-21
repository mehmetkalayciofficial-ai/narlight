import { esc } from '../utils.mjs';

// Category page — v2 data flow. `page.products` is already the
// hydrated list of this category's products (set by build.mjs from
// categories-v2.json), so we just render them with our minimal grid.
export function renderProductCategory({ page, allProducts }) {
  const linked = Array.isArray(page.products) && page.products.length
    ? page.products
    : allProducts.slice(0, 12);

  return `
<section class="products-hero products-hero-category">
  <div class="products-hero-fx" aria-hidden="true"></div>
  <div class="container products-hero-inner">
    <a href="/urunler/" class="products-back-link">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      Tüm Ürünler
    </a>
    <span class="section-tag dark"><span class="pulse"></span>Kategori</span>
    <h1 class="display display-1 hero-rev" data-d="1" style="color:var(--color-paper);max-width:20ch;margin:24px 0 0">
      ${esc(page.title)}
    </h1>
    <p class="hero-rev" data-d="2" style="font-family:var(--font-body);font-size:clamp(15px,1.05vw,18px);line-height:1.7;color:rgba(255,255,255,0.7);max-width:54ch;margin:28px 0 0">
      ${linked.length} model bu kategoride. Tümünü görüntülemek için detay sayfasını açın, teknik dokümanlara ve paylaşım seçeneklerine oradan ulaşın.
    </p>
  </div>
</section>

<section class="products-index section">
  <div class="container">
    <div class="products-grid" data-product-grid>
      ${linked.map(p => {
        const pTitle = p.modelName || p.title;
        return `
        <a href="${esc(p.href)}" class="product-card">
          <div class="product-card-image">
            ${p.hero ? `<img src="${esc(p.hero)}" alt="${esc(pTitle)}" loading="lazy">` : `
              <div class="product-card-placeholder" aria-hidden="true">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 3v18M3 12h18"/></svg>
              </div>`}
          </div>
          <div class="product-card-body">
            <h3 class="product-card-title">${esc(pTitle)}</h3>
            <span class="product-card-more">
              Detay
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </span>
          </div>
        </a>`;
      }).join('')}
    </div>
  </div>
</section>
`;
}
