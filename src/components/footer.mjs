import fs from 'fs';

const LOGO_SVG = fs.readFileSync('brand_assets/logo.svg', 'utf8');

const cols = [
  {
    title: 'Kurumsal',
    items: [
      { href: '/kurumsal/', label: 'Hakkımızda' },
      { href: '/kurumsal/cozumlerimiz/', label: 'Çözümlerimiz' },
      { href: '/kurumsal/aydinlatma-tasarimi/', label: 'Aydınlatma Tasarımı' },
      { href: '/kurumsal/akilli-aydinlatma/', label: 'Akıllı Aydınlatma' },
      { href: '/kurumsal/belgelerimiz/', label: 'Belgelerimiz' },
      { href: '/kurumsal/sss/', label: 'Sıkça Sorulan' },
    ],
  },
  {
    title: 'Keşfet',
    items: [
      { href: '/urunler/', label: 'Ürünler' },
      { href: '/projeler/', label: 'Projeler' },
      { href: '/basin-odasi/', label: 'Basın Odası' },
    ],
  },
  {
    title: 'İletişim',
    items: [
      { href: '/iletisim/', label: '+90 232 348 10 10' },
      { href: 'mailto:info@narlight.com.tr', label: 'info@narlight.com.tr' },
      { href: 'mailto:satis@narlight.com.tr', label: 'satis@narlight.com.tr' },
      { href: '/iletisim/', label: 'Bornova / İZMİR' },
    ],
  },
];

export function renderFooter() {
  return `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <a href="/" class="footer-brand-logo" aria-label="Narlight">${LOGO_SVG}</a>
        <p class="footer-tagline">Çeyrek asırdır ışığın tasarımı ve üretiminde uzmanlaşan Türkiye merkezli aydınlatma firması. Cami, meydan, otel, tarihi yapı ve kent ölçeğinde yüzlerce projenin imzası.</p>
        <div class="footer-social" style="margin-top:32px">
          <a href="https://www.instagram.com/narlighttr/" target="_blank" rel="noopener" aria-label="Instagram">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><circle cx="17.5" cy="6.5" r=".5"/></svg>
          </a>
          <a href="https://www.facebook.com/narlighttr/" target="_blank" rel="noopener" aria-label="Facebook">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://twitter.com/narlighttr" target="_blank" rel="noopener" aria-label="X / Twitter">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2H21l-6.547 7.49L22 22h-6.43l-5.04-6.59L4.8 22H2l7.014-8.02L2 2h6.6l4.554 6.02L18.244 2zm-2.255 18h1.7L7.94 4H6.137l9.852 16z"/></svg>
          </a>
        </div>
      </div>
      ${cols.map(c => `
        <div>
          <p class="footer-h">${c.title}</p>
          <ul class="footer-list">
            ${c.items.map(i => `<li><a href="${i.href}">${i.label}</a></li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </div>
    <div class="footer-bottom">
      <span>© ${new Date().getFullYear()} Narlight Aydınlatma. Tüm hakları saklıdır.</span>
      <span>Doğanlar Mah. 1406 Sk. No:11 Bornova / İZMİR</span>
    </div>
  </div>
</footer>`;
}
