import { esc } from '../utils.mjs';

// Simplified category page — matches the new /urunler/ aesthetic:
// same minimal card grid, no duplicated category-list, just the
// filtered products for this category. The unified /urunler/ page
// is the primary index; categories are secondary views for users
// arriving from the nav mega-menu.
export function renderProductCategory({ page, allProducts }) {
  // Derive the list of products that belong to this category. We match
  // by looking at each product's image URL: narlight organized product
  // shots under /Urunler/<CATEGORY_FOLDER>/<MODEL>.png so the folder
  // name maps reliably to the category. Falls back to a 12-product
  // sample if no matches are found.
  const slug = page.slug || '';
  const title = (page.title || '').toLowerCase();

  // Normalise helper for matching category-folder names to slugs.
  const norm = (s) => (s || '')
    .toLowerCase()
    .replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u')
    .replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '');
  const slugKey = norm(slug) || norm(title);

  const matched = allProducts.filter(p => {
    const imgs = p.images || [];
    const firstProductImg = imgs.find(i => /\/Urunler\/[^/]+\//.test(i.src || ''));
    if (!firstProductImg) return false;
    const m = firstProductImg.src.match(/\/Urunler\/([^/]+)\//);
    if (!m) return false;
    const folder = norm(m[1]);
    // Match either direction — folder name contains slug OR slug contains
    // folder name. Loose match handles plurals and suffix variations.
    return folder.includes(slugKey) || slugKey.includes(folder);
  });

  const linked = matched.length ? matched : allProducts.slice(0, 12);

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
