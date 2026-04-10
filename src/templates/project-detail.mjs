import { esc, localImage } from '../utils.mjs';

export function renderProjectDetail({ page, allProjects }) {
  // Filter to real project images (not UI sprites).
  const images = (page.images || [])
    .map(i => ({ src: localImage(i.src), alt: i.alt || page.title }))
    .filter(i => !/(narlight-search|product-left|product-right|sertifika|icon|logo)/i.test(i.src));
  const heroImg = images[0]?.src || '/brand_assets/favicon.ico';
  const gallery = images.slice(1);

  // Related projects (4 next)
  const idx = allProjects.findIndex(p => p.slug === page.slug);
  const related = [];
  for (let k = 1; related.length < 4 && k <= allProjects.length; k++) {
    const p = allProjects[(idx + k) % allProjects.length];
    if (p && p.hero && p.slug !== page.slug) related.push(p);
  }

  return `
<!-- Project hero -->
<section style="position:relative;min-height:100svh;color:var(--color-paper);overflow:hidden;isolation:isolate">
  <div style="position:absolute;inset:0;z-index:-2">
    <img src="${esc(heroImg)}" alt="${esc(page.title)}" fetchpriority="high" style="width:100%;height:100%;object-fit:cover;animation:hero-pan 16s ease-out forwards">
  </div>
  <div style="position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 35%, rgba(0,0,0,0.85) 100%)"></div>
  <div class="container" style="display:flex;flex-direction:column;justify-content:flex-end;min-height:100svh;padding-top:200px;padding-bottom:96px">
    <div class="hero-rev" data-d="1">
      <a href="/projeler/" style="display:inline-flex;align-items:center;gap:8px;font-family:var(--font-body);font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.72);margin-bottom:24px">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Tüm Projeler
      </a>
    </div>
    ${page.city ? `<div class="hero-rev" data-d="2" style="font-family:var(--font-body);font-size:13px;letter-spacing:0.16em;text-transform:uppercase;color:var(--color-glow);margin-bottom:16px">${esc(page.city)}</div>` : ''}
    <h1 class="hero-rev" data-d="3" style="font-family:var(--font-display);font-weight:900;font-size:clamp(40px,7vw,108px);line-height:0.95;letter-spacing:-0.04em;color:var(--color-paper);margin:0;max-width:18ch">${esc(page.shortName || page.title)}</h1>
  </div>
</section>

<!-- Meta strip -->
<section style="background:var(--color-paper);padding:48px 0;border-bottom:1px solid var(--color-line)">
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr;gap:32px" class="md:grid-cols-4">
      <div>
        <p class="eyebrow" style="margin-bottom:10px">Konum</p>
        <p style="font-family:var(--font-display);font-weight:700;font-size:18px;letter-spacing:-0.01em;margin:0">${esc(page.city || '—')}</p>
      </div>
      <div>
        <p class="eyebrow" style="margin-bottom:10px">Görsel sayısı</p>
        <p style="font-family:var(--font-display);font-weight:700;font-size:18px;letter-spacing:-0.01em;margin:0">${images.length} fotoğraf</p>
      </div>
      <div>
        <p class="eyebrow" style="margin-bottom:10px">Tip</p>
        <p style="font-family:var(--font-display);font-weight:700;font-size:18px;letter-spacing:-0.01em;margin:0">Aydınlatma Projesi</p>
      </div>
      <div>
        <p class="eyebrow" style="margin-bottom:10px">Marka</p>
        <p style="font-family:var(--font-display);font-weight:700;font-size:18px;letter-spacing:-0.01em;margin:0">NARLIGHT</p>
      </div>
    </div>
  </div>
</section>

${gallery.length > 0 ? `
<section class="section">
  <div class="container">
    <div class="section-head" data-reveal>
      <div>
        <span class="section-tag"><span class="pulse"></span>Galeri</span>
        <h2 class="display display-2" style="margin-top:32px">Projeden kareler.</h2>
      </div>
      <p class="section-intro">Sahada çekilen fotoğraflarla projenin uygulanmış halini inceleyin. Görselin üzerine tıklayarak büyük boyutta açabilirsiniz.</p>
    </div>
    <div class="gallery" data-reveal-stagger>
      ${gallery.slice(0, 12).map((img, i) => {
        const sp = ['span-3', 'span-3', 'span-2', 'span-2', 'span-2', 'span-3', 'span-3', 'span-2', 'span-2', 'span-2', 'span-3', 'span-3'];
        return `
          <a href="${esc(img.src)}" class="gallery-item ${sp[i] || 'span-3'}" data-lightbox-trigger="proj" data-lightbox-index="${i}" data-lightbox-item="proj" data-src="${esc(img.src)}" data-caption="${esc(page.shortName || page.title)}">
            <img src="${esc(img.src)}" alt="${esc(img.alt)}" loading="lazy">
          </a>`;
      }).join('')}
    </div>
  </div>
</section>` : ''}

<!-- Related projects -->
<section style="background:var(--color-paper-2);padding:96px 0">
  <div class="container">
    <div class="section-head" data-reveal>
      <div>
        <span class="section-tag"><span class="pulse"></span>Diğer Projeler</span>
        <h2 class="display display-3" style="margin-top:24px">Sıradaki imzalar.</h2>
      </div>
      <a href="/projeler/" class="btn btn-ghost" style="align-self:end">
        Tümünü gör
        <svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
      </a>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-reveal-stagger>
      ${related.map(p => `
        <a href="${esc(p.href)}" class="card-link">
          <div class="card-image project-tile">
            <img src="${esc(p.hero)}" alt="${esc(p.title)}" loading="lazy">
          </div>
          <div class="card-meta">
            ${p.city ? `<div class="card-eyebrow">${esc(p.city)}</div>` : ''}
            <h3 class="card-title">${esc(p.shortName)}</h3>
          </div>
        </a>
      `).join('')}
    </div>
  </div>
</section>
`;
}
