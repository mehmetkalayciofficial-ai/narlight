import { esc, cleanParagraphs, localImage } from '../utils.mjs';

export function renderCorporate({ page, allCorporate }) {
  const paras = cleanParagraphs(page.paragraphs || []);
  const lead = paras[0] || '';
  const rest = paras.slice(1);
  const images = (page.images || []).filter(i => !/(narlight-search|product-left|product-right|sertifika|icon|logo)/i.test(i.src));

  // Sibling pages for the in-page nav. The actual URL routes don't all
  // follow /kurumsal/<slug>/ — Hakkımızda lives at /kurumsal/, İletişim
  // lives at /iletisim/. Use an explicit map so links never 404.
  const siblingRoutes = {
    'hakkimizda':           '/kurumsal/',
    'vizyonumuz':           '/kurumsal/vizyonumuz/',
    'cozumlerimiz':         '/kurumsal/cozumlerimiz/',
    'aydinlatma-tasarimi':  '/kurumsal/aydinlatma-tasarimi/',
    'akilli-aydinlatma':    '/kurumsal/akilli-aydinlatma/',
    'iletisim-bilgileri':   '/iletisim/',
    // 'belgelerimiz' intentionally omitted — page was removed, nav
    // entry would 404
  };
  const siblings = allCorporate
    .filter(c => !/(form|download|katalog|basin)/i.test(c.slug))
    .map(c => {
      const trimmed = c.slug.replace(/^tr__/, '').replace(/-\d+$/, '');
      return { href: siblingRoutes[trimmed], label: c.title, active: c.slug === page.slug };
    })
    .filter(s => !!s.href);

  return `
<!-- HERO -->
<section style="background:var(--color-ink);color:var(--color-paper);padding:168px 0 96px;position:relative;overflow:hidden">
  <div style="position:absolute;inset:0;background:radial-gradient(60% 50% at 80% 0%, rgba(255,179,71,0.08), transparent 60%), radial-gradient(80% 60% at 0% 100%, rgba(26,37,90,0.5), transparent 60%);pointer-events:none"></div>
  <div class="container" style="position:relative">
    <span class="section-tag dark"><span class="pulse"></span>Kurumsal</span>
    <h1 class="display display-1 hero-rev corporate-h1" data-d="1" style="color:var(--color-paper);margin:32px 0 0">${esc(page.title)}</h1>
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
      <!-- Body content — magazine-style: paragraphs interleaved with
           feature images so it doesn't read like a wall of text. -->
      <article data-reveal class="corp-article">
        ${(() => {
          // Take up to 6 usable images and interleave one after every
          // 2nd paragraph. The first big image becomes a full-width
          // hero plate at the top of the body.
          const usable = images.slice(0, 6);
          const heroImg = usable.shift();
          const interImgs = usable;
          const out = [];
          if (heroImg) out.push(`<figure class="corp-figure corp-figure-wide"><img src="${esc(localImage(heroImg.src))}" alt="${esc(heroImg.alt || page.title)}" loading="lazy"></figure>`);
          rest.forEach((p, i) => {
            out.push(`<p>${esc(p)}</p>`);
            // After every 2nd paragraph, drop in an image (if we have any)
            if ((i + 1) % 2 === 0 && interImgs.length) {
              const img = interImgs.shift();
              out.push(`<figure class="corp-figure"><img src="${esc(localImage(img.src))}" alt="${esc(img.alt || page.title)}" loading="lazy"></figure>`);
            }
          });
          // Any leftover images appear in a final 2-col grid
          if (interImgs.length) {
            out.push(`<div class="corp-grid">${interImgs.map(i => `<figure class="corp-figure"><img src="${esc(localImage(i.src))}" alt="${esc(i.alt || page.title)}" loading="lazy"></figure>`).join('')}</div>`);
          }
          return out.join('');
        })()}
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
