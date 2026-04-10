import { esc } from '../utils.mjs';

export function renderProjectList({ projects }) {
  // Build city facets from titles.
  const cities = {};
  projects.forEach(p => {
    const c = (p.city || '').trim();
    if (!c) return;
    cities[c] = (cities[c] || 0) + 1;
  });
  const sortedCities = Object.entries(cities).sort((a, b) => b[1] - a[1]).slice(0, 10);

  // Span pattern for visual variety.
  const spans = ['span-6', 'span-3', 'span-3', 'span-2', 'span-2', 'span-2', 'span-3', 'span-3', 'span-2', 'span-2', 'span-2', 'span-3', 'span-3', 'span-6'];

  return `
<section style="background:var(--color-ink);color:var(--color-paper);padding:168px 0 96px;position:relative;overflow:hidden">
  <div style="position:absolute;inset:0;background:radial-gradient(60% 50% at 80% 0%, rgba(255,179,71,0.08), transparent 60%), radial-gradient(80% 60% at 0% 100%, rgba(26,37,90,0.5), transparent 60%);pointer-events:none"></div>
  <div class="container" style="position:relative">
    <span class="section-tag dark"><span class="pulse"></span>Projeler</span>
    <h1 class="display display-1 hero-rev" data-d="1" style="color:var(--color-paper);max-width:14ch;margin:32px 0 0">Türkiye'nin <em style="font-style:italic;color:var(--color-glow)">aydınlık</em> tarihi.</h1>
    <p class="hero-rev" data-d="2" style="font-family:var(--font-body);font-size:clamp(15px,1.1vw,20px);line-height:1.7;color:rgba(255,255,255,0.7);max-width:54ch;margin:36px 0 0">
      Camiler, meydanlar, müzeler, tarihi yapılar, üniversiteler, otoyollar ve kent merkezlerinde 200'den fazla referans projemize göz atın. Her biri ışıkla yeniden yazılmış bir hikaye.
    </p>
    <!-- City filter chips -->
    <div class="hero-rev" data-d="3" style="margin-top:48px;display:flex;flex-wrap:wrap;gap:8px">
      <button type="button" data-city-filter="all" class="city-chip is-active" style="padding:10px 18px;border-radius:999px;background:var(--color-glow);color:var(--color-ink);font-family:var(--font-body);font-weight:600;font-size:13px;letter-spacing:0.02em;border:1px solid transparent;cursor:pointer;transition:background-color 240ms var(--ease-out)">Tümü <span style="opacity:0.65;margin-left:6px">${projects.length}</span></button>
      ${sortedCities.map(([c, n]) => `
        <button type="button" data-city-filter="${esc(c)}" class="city-chip" style="padding:10px 18px;border-radius:999px;background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.82);font-family:var(--font-body);font-weight:500;font-size:13px;border:1px solid rgba(255,255,255,0.12);cursor:pointer;transition:background-color 240ms var(--ease-out),color 240ms var(--ease-out)">${esc(c)} <span style="opacity:0.5;margin-left:6px">${n}</span></button>
      `).join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="gallery" id="project-gallery" data-reveal-stagger>
      ${projects.map((p, i) => p.hero ? `
        <a href="${esc(p.href)}" class="gallery-item ${spans[i % spans.length]}" data-city="${esc(p.city || '')}">
          <img src="${esc(p.hero)}" alt="${esc(p.title)}" loading="lazy">
          <div class="caption">
            ${p.city ? `<span class="ey">${esc(p.city)}</span>` : ''}
            <h3>${esc(p.shortName)}</h3>
          </div>
        </a>
      ` : '').join('')}
    </div>
  </div>
</section>

<script>
  // Simple client-side city filter
  document.querySelectorAll('[data-city-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.cityFilter;
      document.querySelectorAll('[data-city-filter]').forEach(b => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        if (active) {
          b.style.background = 'var(--color-glow)';
          b.style.color = 'var(--color-ink)';
          b.style.borderColor = 'transparent';
        } else {
          b.style.background = 'rgba(255,255,255,0.06)';
          b.style.color = 'rgba(255,255,255,0.82)';
          b.style.borderColor = 'rgba(255,255,255,0.12)';
        }
      });
      document.querySelectorAll('#project-gallery .gallery-item').forEach(item => {
        const matches = target === 'all' || item.dataset.city === target;
        item.style.display = matches ? '' : 'none';
      });
    });
  });
</script>
`;
}
