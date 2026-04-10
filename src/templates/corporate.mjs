import { esc, cleanParagraphs, localImage } from '../utils.mjs';

export function renderCorporate({ page, allCorporate }) {
  const paras = cleanParagraphs(page.paragraphs || []);
  const lead = paras[0] || '';
  const rest = paras.slice(1);
  const images = (page.images || []).filter(i => !/(narlight-search|product-left|product-right|sertifika|icon|logo)/i.test(i.src));

  // Sibling pages for the in-page nav
  const siblings = allCorporate
    .filter(c => !/(form|download|katalog|basin)/i.test(c.slug))
    .map(c => {
      const trimmed = c.slug.replace(/^tr__/, '').replace(/-\d+$/, '');
      return { href: `/kurumsal/${trimmed}/`, label: c.title, active: c.slug === page.slug };
    });

  return `
<!-- HERO -->
<section style="background:var(--color-ink);color:var(--color-paper);padding:168px 0 96px;position:relative;overflow:hidden">
  <div style="position:absolute;inset:0;background:radial-gradient(60% 50% at 80% 0%, rgba(255,179,71,0.08), transparent 60%), radial-gradient(80% 60% at 0% 100%, rgba(26,37,90,0.5), transparent 60%);pointer-events:none"></div>
  <div class="container" style="position:relative">
    <span class="section-tag dark"><span class="pulse"></span>Kurumsal</span>
    <h1 class="display display-1 hero-rev" data-d="1" style="color:var(--color-paper);max-width:18ch;margin:32px 0 0">${esc(page.title)}</h1>
    ${lead ? `<p class="hero-rev" data-d="2" style="font-family:var(--font-body);font-weight:400;font-size:clamp(15px,1.1vw,20px);line-height:1.7;color:rgba(255,255,255,0.7);max-width:54ch;margin:36px 0 0">${esc(lead)}</p>` : ''}
  </div>
</section>

<!-- BODY -->
<section class="section">
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr;gap:64px" class="lg:grid-cols-[260px_1fr]">
      <!-- Side nav -->
      <aside data-reveal>
        <p class="eyebrow" style="margin-bottom:24px">Kurumsal sayfalar</p>
        <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:6px">
          ${siblings.map(s => `
            <li>
              <a href="${esc(s.href)}" style="display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:10px;font-size:13px;font-weight:${s.active ? '600' : '500'};color:${s.active ? 'var(--color-ink)' : 'var(--color-mute)'};background:${s.active ? 'var(--color-paper-3)' : 'transparent'};transition:background-color 240ms var(--ease-out),color 240ms var(--ease-out)">
                <span style="width:4px;height:4px;border-radius:50%;background:${s.active ? 'var(--color-glow)' : 'var(--color-line-strong)'}"></span>
                ${esc(s.label)}
              </a>
            </li>
          `).join('')}
        </ul>
      </aside>
      <!-- Body content -->
      <article data-reveal>
        ${rest.map(p => `<p style="font-family:var(--font-body);font-size:16px;line-height:1.75;color:var(--color-ink-soft);margin:0 0 28px;max-width:64ch">${esc(p)}</p>`).join('')}
        ${images.length > 0 ? `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4" style="margin-top:64px">
            ${images.slice(0, 6).map(i => `
              <div style="border-radius:12px;overflow:hidden;background:var(--color-paper-3);aspect-ratio:4/3">
                <img src="${esc(localImage(i.src))}" alt="${esc(i.alt || page.title)}" loading="lazy" style="width:100%;height:100%;object-fit:cover">
              </div>
            `).join('')}
          </div>
        ` : ''}
      </article>
    </div>
  </div>
</section>

<!-- CTA -->
<section style="background:var(--color-paper-2);padding:96px 0">
  <div class="container" style="text-align:center">
    <p class="eyebrow" style="margin-bottom:24px">Projeniz için</p>
    <h2 class="display display-3" style="margin:0 0 32px;max-width:18ch;margin-left:auto;margin-right:auto">Bir aydınlatma projesi mi düşünüyorsunuz?</h2>
    <a href="/iletisim/" class="btn">
      Bizimle görüşün
      <svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
    </a>
  </div>
</section>
`;
}
