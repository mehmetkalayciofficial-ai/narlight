import { esc } from '../utils.mjs';

export function renderNewsList({ news }) {
  const featured = news[0];
  const rest = news.slice(1);

  return `
<section style="background:var(--color-ink);color:var(--color-paper);padding:168px 0 96px;position:relative;overflow:hidden">
  <div style="position:absolute;inset:0;background:radial-gradient(60% 50% at 80% 0%, rgba(255,179,71,0.08), transparent 60%), radial-gradient(80% 60% at 0% 100%, rgba(26,37,90,0.5), transparent 60%);pointer-events:none"></div>
  <div class="container" style="position:relative">
    <span class="section-tag dark"><span class="pulse"></span>Basın Odası</span>
    <h1 class="display display-1 hero-rev" data-d="1" style="color:var(--color-paper);max-width:14ch;margin:32px 0 0">Sahadan <em style="font-style:italic;color:var(--color-glow)">haberler</em>.</h1>
    <p class="hero-rev" data-d="2" style="font-family:var(--font-body);font-size:clamp(15px,1.1vw,20px);line-height:1.7;color:rgba(255,255,255,0.7);max-width:54ch;margin:36px 0 0">
      Yeni teknolojiler, fuarlar, projeler ve röportajlar — Narlight'ın güncel hikayelerini takip edin.
    </p>
  </div>
</section>

${featured ? `
<section class="section">
  <div class="container">
    <a href="${esc(featured.href)}" data-reveal style="display:grid;grid-template-columns:1fr;gap:48px;text-decoration:none;color:inherit;border-top:1px solid var(--color-ink);padding-top:48px" class="lg:grid-cols-[1.4fr_1fr]">
      <div>
        <span class="eyebrow" style="margin-bottom:24px;display:block">— Öne Çıkan</span>
        <h2 class="display display-2" style="margin:0;max-width:18ch">${esc(featured.title.slice(0, 80))}${featured.title.length > 80 ? '…' : ''}</h2>
      </div>
      <div>
        <p style="font-size:16px;line-height:1.7;color:var(--color-mute);margin:0 0 32px">${esc((featured.cleanParas?.[0] || '').slice(0, 280))}…</p>
        <span style="font-size:12px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;display:inline-flex;align-items:center;gap:8px">
          Habere git
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </span>
      </div>
    </a>
  </div>
</section>` : ''}

<section class="section" style="padding-top:0">
  <div class="container">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12" data-reveal-stagger>
      ${rest.map(n => {
        const summary = (n.cleanParas || []).find(p => p.length > 50)?.slice(0, 180) || '';
        return `
          <a href="${esc(n.href)}" style="display:block;border-top:1px solid var(--color-ink);padding-top:32px">
            <span class="eyebrow" style="display:block;margin-bottom:20px">— Haber</span>
            <h3 style="font-family:var(--font-display);font-weight:800;font-size:22px;line-height:1.15;letter-spacing:-0.02em;margin:0 0 18px">${esc(n.title.slice(0, 90))}${n.title.length > 90 ? '…' : ''}</h3>
            <p style="font-size:13px;line-height:1.65;color:var(--color-mute);margin:0 0 24px">${esc(summary)}${summary.length === 180 ? '…' : ''}</p>
            <span style="font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;display:inline-flex;align-items:center;gap:8px">
              Devamı
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </span>
          </a>`;
      }).join('')}
    </div>
  </div>
</section>
`;
}
