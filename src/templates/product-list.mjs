import { esc } from '../utils.mjs';

export function renderProductList({ productCats }) {
  return `
<section style="background:var(--color-ink);color:var(--color-paper);padding:168px 0 96px;position:relative;overflow:hidden">
  <div style="position:absolute;inset:0;background:radial-gradient(60% 50% at 80% 0%, rgba(255,179,71,0.08), transparent 60%), radial-gradient(80% 60% at 0% 100%, rgba(26,37,90,0.5), transparent 60%);pointer-events:none"></div>
  <div class="container" style="position:relative">
    <span class="section-tag dark"><span class="pulse"></span>Ürünler</span>
    <h1 class="display display-1 hero-rev" data-d="1" style="color:var(--color-paper);max-width:18ch;margin:32px 0 0">Her ölçeğe<br>doğru armatür.</h1>
    <p class="hero-rev" data-d="2" style="font-family:var(--font-body);font-size:clamp(15px,1.1vw,20px);line-height:1.7;color:rgba(255,255,255,0.7);max-width:54ch;margin:36px 0 0">
      İç mekândan dış cephe aydınlatmaya, endüstriyel projektörden park bahçeye, akıllı kontrollerden aksesuara — 40'tan fazla ürün serisi ve 200'ü aşkın model.
    </p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" data-reveal-stagger>
      ${productCats.map(c => `
        <a href="${esc(c.href)}" style="display:block;border:1px solid var(--color-line);border-radius:18px;padding:32px 28px 36px;background:var(--color-paper);transition:transform 480ms var(--ease-out),border-color 480ms var(--ease-out),box-shadow 480ms var(--ease-out)" onmouseover="this.style.transform='translateY(-4px)';this.style.borderColor='var(--color-ink)';this.style.boxShadow='0 24px 60px -30px rgba(0,0,0,0.18)'" onmouseout="this.style.transform='';this.style.borderColor='var(--color-line)';this.style.boxShadow=''">
          <div style="font-family:var(--font-body);font-size:11px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:var(--color-glow);margin-bottom:24px">— Kategori</div>
          <h3 style="font-family:var(--font-display);font-weight:800;font-size:22px;letter-spacing:-0.02em;line-height:1.1;margin:0 0 24px;color:var(--color-ink)">${esc(c.title)}</h3>
          <span style="font-size:12px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;display:inline-flex;align-items:center;gap:8px;color:var(--color-mute)">
            İncele
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </span>
        </a>
      `).join('')}
    </div>
  </div>
</section>
`;
}
