import fs from 'fs';

const LOGO_SVG = fs.readFileSync('brand_assets/logo.svg', 'utf8');

const chev = `<svg class="chev" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>`;
const arrow = `<svg class="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>`;

// Mega-menu definitions. Each top-level link can either be a flat link (no menu)
// or expose a mega panel with a featured card + content columns.
const menus = {
  kurumsal: {
    label: 'Kurumsal',
    href: '/kurumsal/',
    feature: {
      eyebrow: 'Marka Hikayesi',
      title: 'Çeyrek asırdır ışığın imzası.',
      href: '/kurumsal/',
      bg: '/brand_assets/images/PROJELER/Izmir-Saat-Kulesi/izmir-kule-slide.webp',
    },
    sections: [
      {
        title: 'Şirket',
        items: [
          { href: '/kurumsal/', label: 'Hakkımızda', desc: 'Misyon, vizyon ve hikaye', thumb: '/brand_assets/images/PROJELER/HAVELSAN_Teknoloji_Kampusu_ANKARA_/HAVELSAN_Teknoloji_Kampusu_ANKARA_2.webp' },
          { href: '/kurumsal/cozumlerimiz/', label: 'Çözümlerimiz', desc: 'Saha incelemesinden teslime', thumb: '/brand_assets/images/PROJELER/Aktepe_Kultur_Merkezi/Aktepe_Kultur_Merkezi_1.webp' },
          { href: '/kurumsal/aydinlatma-tasarimi/', label: 'Aydınlatma Tasarımı', desc: 'Işık simülasyonu ve ar-ge', thumb: '/brand_assets/images/PROJELER/Efes_Antik_Kenti/Efes_Antik_Kenti_1.webp' },
        ],
      },
      {
        title: 'Daha fazla',
        type: 'simple',
        items: [
          { href: '/kurumsal/akilli-aydinlatma/', label: 'Akıllı Aydınlatma' },
          { href: '/kurumsal/belgelerimiz/', label: 'Belgelerimiz' },
          { href: '/kurumsal/sss/', label: 'Sıkça Sorulan' },
          { href: '/basin-odasi/', label: 'Basın Odası' },
          { href: '/iletisim/', label: 'İletişim Bilgileri' },
        ],
      },
      {
        title: 'Sertifikalar',
        type: 'simple',
        items: [
          { href: '/kurumsal/belgelerimiz/', label: 'TSE, CE, RoHS' },
          { href: '/kurumsal/belgelerimiz/', label: 'IP65 / IP67 raporları' },
          { href: '/kurumsal/belgelerimiz/', label: 'Test sonuçları' },
        ],
      },
    ],
  },
  urunler: {
    label: 'Ürünler',
    href: '/urunler/',
    feature: {
      eyebrow: 'Yeni Ürünler 2025',
      title: 'AGRESTIS projektör serisi.',
      href: '/urunler/urun/agrestis/',
      bg: '/brand_assets/images/Urunler/Projektorler/AGRESTIS_yeni_2.webp',
    },
    sections: [
      {
        title: 'Dış Aydınlatma',
        items: [
          { href: '/urunler/aydinlatma-direkleri/', label: 'Aydınlatma Direkleri', desc: '4–12m park, cadde ve meydan direkleri', thumb: '/brand_assets/images/PROJELER/Cine-Otogari1.webp' },
          { href: '/urunler/mimari-projektorler/', label: 'Mimari Projektörler', desc: 'AGRESTIS, GLAUCA, ELATA', thumb: '/brand_assets/images/Urunler/Projektorler/AGRESTIS_yeni_2.webp' },
          { href: '/urunler/park-bahce-armaturleri/', label: 'Park & Bahçe', desc: 'Bollard ve dekoratif seriler', thumb: '/brand_assets/images/PROJELER/Karap%C4%B1nar-SuPark%C4%B1/buyukresimm.webp' },
        ],
      },
      {
        title: 'İç & Endüstriyel',
        type: 'simple',
        items: [
          { href: '/urunler/sivaalti-led-panel-armaturleri/', label: 'Sıvaaltı LED Panel' },
          { href: '/urunler/lineer-ve-ledbar-armaturler/', label: 'Lineer & LED Bar' },
          { href: '/urunler/ray-spot-armatur-aksesuarlari/', label: 'Ray Spot' },
          { href: '/urunler/magnet-ray-armaturler/', label: 'Magnet Ray Sistemleri' },
          { href: '/urunler/havuz-armaturleri/', label: 'Havuz Armatürleri' },
          { href: '/urunler/', label: 'Tüm Kategoriler →' },
        ],
      },
      {
        title: 'Akıllı Sistemler',
        type: 'simple',
        items: [
          { href: '/urunler/astronomik-zaman-saati/', label: 'Astronomik Saat' },
          { href: '/urunler/hareket-sensorleri/', label: 'Hareket Sensörü' },
          { href: '/kurumsal/akilli-aydinlatma/', label: 'Smart Lighting' },
        ],
      },
    ],
  },
  projeler: {
    label: 'Projeler',
    href: '/projeler/',
    feature: {
      eyebrow: 'Öne Çıkan Proje',
      title: '15 Temmuz Demokrasi Şehitleri Meydanı',
      href: '/projeler/15-temmuz-demokrasi-sehitleri-meydani/',
      bg: '/brand_assets/images/PROJELER/15-Temmuz-Demokrasi/Galeri.webp',
    },
    sections: [
      {
        title: 'Kategoriler',
        items: [
          { href: '/projeler/?tip=cami', label: 'Cami & Kulliye', desc: '15+ tarihi ve modern cami projesi', thumb: '/brand_assets/images/PROJELER/Izmir-Ege-Uni-Camii/1.webp' },
          { href: '/projeler/?tip=meydan', label: 'Kent Meydanları', desc: 'Türkiye genelinde 30+ meydan', thumb: '/brand_assets/images/PROJELER/15-Temmuz-Demokrasi/Galeri.webp' },
          { href: '/projeler/?tip=tarihi', label: 'Tarihi Yapılar', desc: 'Efes, Saat Kulesi, Anıtkabir', thumb: '/brand_assets/images/PROJELER/Efes_Celsus_kutuphanesi/Efes_Celsus_kutuphanesi.webp' },
        ],
      },
      {
        title: 'Şehirler',
        type: 'simple',
        items: [
          { href: '/projeler/?sehir=izmir', label: 'İzmir' },
          { href: '/projeler/?sehir=istanbul', label: 'İstanbul' },
          { href: '/projeler/?sehir=ankara', label: 'Ankara' },
          { href: '/projeler/?sehir=kahramanmaras', label: 'Kahramanmaraş' },
          { href: '/projeler/?sehir=denizli', label: 'Denizli' },
          { href: '/projeler/', label: '81 şehir →' },
        ],
      },
      {
        title: 'Sayılar',
        type: 'simple',
        items: [
          { href: '/projeler/', label: '200+ Proje' },
          { href: '/projeler/', label: '29 Yıllık Tecrübe' },
          { href: '/projeler/', label: '1.300+ Görsel' },
        ],
      },
    ],
  },
};

const flatLinks = [
  { href: '/basin-odasi/', label: 'Basın Odası' },
  { href: '/iletisim/', label: 'İletişim' },
];

function renderMega(key, m) {
  return `
  <div class="mega" id="mega-${key}" data-mega="${key}" role="region" aria-label="${m.label} alt menüsü">
    <div class="mega-grid">
      <a class="mega-feature" href="${m.feature.href}" style="--bg: url('${m.feature.bg}')">
        <div>
          <span class="eyebrow">${m.feature.eyebrow}</span>
          <h4>${m.feature.title}</h4>
        </div>
      </a>
      ${m.sections.map(s => `
        <div class="mega-col ${s.type === 'simple' ? 'mega-col-simple' : ''}">
          <h5>${s.title}</h5>
          ${s.type === 'simple'
            ? `<div>${s.items.map(i => `<a href="${i.href}">${i.label}${i.tag ? `<span class="mega-tag">${i.tag}</span>` : ''}</a>`).join('')}</div>`
            : `<ul class="mega-list">${s.items.map(i => `
                <li><a href="${i.href}">
                  <span class="mega-thumb" style="background-image:url('${i.thumb}')"></span>
                  <span>
                    <span class="label">${i.label}</span>
                    ${i.desc ? `<span class="desc">${i.desc}</span>` : ''}
                  </span>
                </a></li>`).join('')}</ul>`}
        </div>
      `).join('')}
    </div>
  </div>`;
}

export function renderNav() {
  return `
<header class="nav" data-nav>
  <div class="nav-shell">
    <div class="nav-inner">
      <a href="/" class="nav-logo" aria-label="Narlight ana sayfa">${LOGO_SVG}</a>
      <nav class="nav-links" aria-label="Ana menü">
        ${Object.entries(menus).map(([k, m]) => `
          <button type="button" class="nav-link" data-mega-trigger="${k}" aria-haspopup="true" aria-expanded="false" aria-controls="mega-${k}">
            ${m.label}
            ${chev}
          </button>
        `).join('')}
        ${flatLinks.map(l => `<a href="${l.href}" class="nav-link">${l.label}</a>`).join('')}
      </nav>
      <div class="nav-right">
        <a href="/iletisim/" class="nav-login">Bayi Girişi</a>
        <a href="/iletisim/" class="nav-cta">Teklif Al ${arrow}</a>
        <button type="button" class="nav-burger" aria-label="Menüyü aç" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
    ${Object.entries(menus).map(([k, m]) => renderMega(k, m)).join('')}
  </div>

  <!-- Mobile drawer (shown on screens < 1024px) -->
  <div class="mobile-drawer" data-mobile-drawer>
    <button type="button" class="mobile-drawer-close" data-mobile-drawer-close aria-label="Menüyü kapat">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
    </button>
    <div style="max-width:560px;margin:0 auto">
      <p class="small">Menü</p>
      <ul>
        ${Object.entries(menus).map(([k, m]) => `
          <li><a href="${m.href}">${m.label}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg></a></li>
        `).join('')}
        ${flatLinks.map(l => `<li><a href="${l.href}">${l.label}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg></a></li>`).join('')}
      </ul>
      <div class="info">
        <strong>Bornova / İZMİR</strong>
        Doğanlar Mah. 1406 Sk. No:11<br>
        +90 232 348 10 10<br>
        info@narlight.com.tr
      </div>
    </div>
  </div>
</header>`;
}
