import { esc, localImage } from '../utils.mjs';

export function renderNewsDetail({ page, allNews }) {
  const paras = (page.cleanParas || []);
  const heroImg = page.hero;
  const related = allNews.filter(n => n.slug !== page.slug).slice(0, 3);

  return `
<section style="background:var(--color-ink);color:var(--color-paper);padding:168px 0 80px;position:relative;overflow:hidden">
  <div style="position:absolute;inset:0;background:radial-gradient(60% 50% at 80% 0%, rgba(255,179,71,0.08), transparent 60%), radial-gradient(80% 60% at 0% 100%, rgba(26,37,90,0.5), transparent 60%);pointer-events:none"></div>
  <div class="container" style="position:relative;max-width:880px">
    <a href="/basin-odasi/" style="display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 4px;margin:0 -4px 24px -4px;font-family:var(--font-body);font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.72)">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      Basın Odası
    </a>
    <span class="section-tag dark"><span class="pulse"></span>Haber</span>
    <h1 class="display display-2 hero-rev" data-d="1" style="color:var(--color-paper);margin:32px 0 0">${esc(page.title)}</h1>
  </div>
</section>

${heroImg ? `
<section style="margin-top:-1px">
  <div class="container-tight" style="max-width:1080px">
    <img src="${esc(heroImg)}" alt="${esc(page.title)}" style="width:100%;border-radius:18px;margin-top:-48px;box-shadow:0 60px 120px -40px rgba(0,0,0,0.4)">
  </div>
</section>` : ''}

<article class="section">
  <div class="container-tight" style="max-width:780px">
    ${paras.map(p => `<p style="font-family:var(--font-body);font-size:18px;line-height:1.78;color:var(--color-ink-soft);margin:0 0 28px">${esc(p)}</p>`).join('')}
  </div>
</article>

<section style="background:var(--color-paper-2);padding:96px 0">
  <div class="container">
    <div class="section-head" data-reveal>
      <div>
        <span class="section-tag"><span class="pulse"></span>Diğer Haberler</span>
        <h2 class="display display-3" style="margin-top:24px">Sıradaki hikayeler.</h2>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8" data-reveal-stagger>
      ${related.map(n => {
        const summary = (n.cleanParas || []).find(p => p.length > 50)?.slice(0, 160) || '';
        return `
          <a href="${esc(n.href)}" style="display:block;border-top:1px solid var(--color-ink);padding-top:28px">
            <span class="eyebrow" style="display:block;margin-bottom:18px">— Haber</span>
            <h3 style="font-family:var(--font-display);font-weight:800;font-size:20px;line-height:1.15;letter-spacing:-0.02em;margin:0 0 18px">${esc(n.title.slice(0, 80))}${n.title.length > 80 ? '…' : ''}</h3>
            <p style="font-size:13px;line-height:1.65;color:var(--color-mute);margin:0 0 18px">${esc(summary)}${summary.length === 160 ? '…' : ''}</p>
          </a>`;
      }).join('')}
    </div>
  </div>
</section>
`;
}
