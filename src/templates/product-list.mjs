import { esc } from '../utils.mjs';

// Simplified "toplu" products index — every product in one searchable
// grid. No category landing cards, no mega menu duplication, no 3-tier
// navigation. One page, 40 models, one search input, one grid.
export function renderProductList({ products }) {
  const total = products.length;

  return `
<section class="products-hero">
  <div class="products-hero-fx" aria-hidden="true"></div>
  <div class="container products-hero-inner">
    <span class="section-tag dark"><span class="pulse"></span>Ürün Kataloğu</span>
    <h1 class="display display-1 hero-rev" data-d="1" style="color:var(--color-paper);margin:28px 0 0">
      Tüm ürünler.<br><span class="glow">Tek sayfada.</span>
    </h1>
    <p class="hero-rev" data-d="2" style="font-family:var(--font-body);font-size:clamp(15px,1.1vw,19px);line-height:1.65;color:rgba(255,255,255,0.72);max-width:56ch;margin:32px 0 0">
      ${total} model ve 200'den fazla varyantımızın tamamı. Projektör, park-bahçe, gömme, akıllı aydınlatma, aksesuar — her kategori aynı listede, aramanızı kolaylaştırır.
    </p>
    <div class="products-search hero-rev" data-d="3">
      <svg class="products-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
      </svg>
      <input
        type="search"
        id="product-search"
        data-product-search
        placeholder="Model adı veya kod ara — ör. AGRESTIS, LPR3050, CARICA"
        autocomplete="off"
        aria-label="Ürün ara"
      />
      <button type="button" class="products-search-clear" data-product-search-clear aria-label="Aramayı temizle">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="6" transform="rotate(90 12 12)"/>
        </svg>
      </button>
    </div>
    <div class="products-result-count hero-rev" data-d="4" data-product-count>
      <span data-product-count-visible>${total}</span> / ${total} ürün gösteriliyor
    </div>
  </div>
</section>

<section class="products-index section">
  <div class="container">
    <div class="products-grid" data-product-grid>
      ${products.map(p => {
        const title = p.modelName || p.title;
        const searchText = `${title} ${p.title || ''}`.toLowerCase();
        return `
        <a href="${esc(p.href)}" class="product-card" data-product-card data-search="${esc(searchText)}">
          <div class="product-card-image">
            ${p.hero ? `<img src="${esc(p.hero)}" alt="${esc(title)}" loading="lazy">` : `
              <div class="product-card-placeholder" aria-hidden="true">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 3v18M3 12h18"/></svg>
              </div>`}
          </div>
          <div class="product-card-body">
            <h3 class="product-card-title">${esc(title)}</h3>
            <span class="product-card-more">
              Detay
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </span>
          </div>
        </a>`;
      }).join('')}
    </div>
    <div class="products-empty" data-product-empty hidden>
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
      <h3>Eşleşen ürün bulunamadı</h3>
      <p>Farklı bir kelime ya da model kodu deneyin. Tüm kataloğu yeniden görmek için aramayı temizleyin.</p>
    </div>
  </div>
</section>

<section class="products-cta">
  <div class="container">
    <div class="products-cta-wrap" data-reveal>
      <div>
        <span class="section-tag dark"><span class="pulse"></span>Proje bazlı</span>
        <h2 class="display display-2" style="color:var(--color-paper);margin:24px 0 0;max-width:22ch">
          Aradığınız modeli bulamadınız mı?
        </h2>
      </div>
      <div>
        <p style="font-family:var(--font-body);font-size:16px;line-height:1.7;color:rgba(255,255,255,0.7);max-width:44ch;margin:0 0 28px">
          Sahadaki ekibimize ihtiyacınızı iletin — proje-özel tasarım, sertifika ve uygulama desteği tek ekipten.
        </p>
        <a href="/iletisim/" class="btn" data-magnetic="14" style="background:var(--color-glow);color:var(--color-ink)">
          Teklif iste
          <svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  </div>
</section>
`;
}
