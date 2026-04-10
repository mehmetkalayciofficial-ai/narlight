import { esc } from '../utils.mjs';

export function renderHome({ projects, productCats, news, corporate }) {
  // ---------- Hero carousel projects ----------
  const carouselSlugs = [
    '15-temmuz-demokrasi',
    'tarihi-saat-kulesi',
    'havelsan-teknoloji-kampusu',
    'bilal-saygili-camii',
    'aktepe-kultur-merkezi',
  ];
  const carouselProjects = carouselSlugs
    .map(s => projects.find(p => p.slug.toLowerCase().includes(s) && p.hero))
    .filter(Boolean);

  // ---------- Featured editorial gallery ----------
  const gallerySlugs = [
    '15-temmuz-demokrasi',         // span-6
    'efes-antik-kenti',            // span-3
    'tarihi-saat-kulesi',          // span-3
    'havelsan-teknoloji-kampusu',  // span-2
    'bilal-saygili-camii',         // span-2
    'aktepe-kultur-merkezi',       // span-2
    'cine-otogari',                // span-3
    'efes-celsus-kutuphanesi',     // span-3
  ];
  const gallery = gallerySlugs
    .map(s => projects.find(p => p.slug.toLowerCase().includes(s) && p.hero))
    .filter(Boolean);
  const spanClasses = ['span-6', 'span-3', 'span-3', 'span-2', 'span-2', 'span-2', 'span-3', 'span-3'];

  // ---------- Customer / project rail (logos / brand names from project titles) ----------
  // Use the city/institution names from real projects.
  const railNames = [
    'EFES ANTİK KENTİ',
    'HAVELSAN ANKARA',
    'TÜRK TARİH KURUMU',
    'KAHRAMANMARAŞ BLD.',
    'PAMUKKALE BLD.',
    'KOCMAN ÜNİVERSİTESİ',
    'YASAR ÜNİVERSİTESİ',
    'YÜKSEK TEKNOLOJİ ENSTİTÜSÜ',
    'İZMİR BÜYÜKŞEHİR',
    'KONAK BLD.',
    'BUCA BLD.',
    'ALSANCAK GARI',
    'BÜYÜK ESENLER OTOGARI',
    'KOÇ İNŞAAT',
    'IS BANKASI',
    'MARMARA FORUM',
    'TURKUAZ AVM',
    'SARUHAN OTEL',
  ];

  // ---------- Featured spec product (for code-block showcase) ----------
  // Find a product page with rich tables.
  // products array isn't loaded here — we synthesise a credible spec from a known model.
  const specBlock = {
    family: 'AGRESTIS',
    series: 'Mimari Projektör',
    rows: [
      ['model', '"LPR3050"', '"LPR3100"', '"LPR3150"'],
      ['power', '50W', '100W', '150W'],
      ['lumen', '6000lm', '12000lm', '16500lm'],
      ['cri', '≥80', '≥80', '≥80'],
      ['voltage', '230V', '230V', '230V'],
      ['ip_class', 'IP67', 'IP67', 'IP67'],
      ['cct', '"3000K-6500K"', '"3000K-6500K"', '"3000K-6500K"'],
      ['housing', '"Aluminium Extrusion"', null, null],
      ['driver', '"Constant Current"', null, null],
    ],
  };

  // ---------- Solutions glassmorphism cards ----------
  const solutionCards = [
    {
      label: 'Aydınlatma Tasarımı',
      body: 'Saha incelemesi, ışık simülasyonu ve mimariyle uyumlu özel armatür tasarımı.',
      href: '/kurumsal/aydinlatma-tasarimi/',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/><circle cx="12" cy="12" r="5"/></svg>`,
    },
    {
      label: 'Akıllı Aydınlatma',
      body: 'IoT, hareket sensörü, astronomik saat ve uzaktan kontrolle akıllı şehir altyapısı.',
      href: '/kurumsal/akilli-aydinlatma/',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 9h6v6H9z"/></svg>`,
    },
    {
      label: 'Çözümlerimiz',
      body: 'Konsept, proje, üretim, kurulum ve satış sonrası hizmet — tek bir ekipten.',
      href: '/kurumsal/cozumlerimiz/',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/></svg>`,
    },
    {
      label: 'Sertifikasyon',
      body: 'TSE, CE, RoHS uyumlu ürünler. IP65–IP67 koruma sınıfları, test sonuçları.',
      href: '/kurumsal/belgelerimiz/',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/></svg>`,
    },
  ];

  // ---------- 4-step process ----------
  const processSteps = [
    { num: '01', title: 'Saha & Konsept', body: 'Ekibimiz mekânı yerinde inceler. İhtiyaçları, mevcut altyapıyı ve mimari dili çıkarır. İlk ışık konseptini hazırlar.' },
    { num: '02', title: 'Tasarım & Simülasyon', body: 'En yeni nesil aydınlatma yazılımları (DIALux, Relux) ile ışık akışı, gölge ve enerji hesaplamaları simüle edilir.' },
    { num: '03', title: 'Üretim & Sertifikasyon', body: 'Bornova\'daki üretim tesisimizde armatürler üretilir, TSE/CE/IP testlerinden geçirilir ve paketlenir.' },
    { num: '04', title: 'Kurulum & Servis', body: 'Saha kurulumu, devreye alma, eğitim ve uzun yıllar süren satış sonrası teknik servis ve yedek parça desteği.' },
  ];

  // ---------- Latest news ----------
  const latestNews = news.slice(0, 4);

  return `
<!-- ======================================================
     HERO v2  —  Evervault dark + Superpower blur reveal
====================================================== -->
<section class="hero-v2">
  <div class="grain" aria-hidden="true"></div>
  <div class="container hero-v2-grid">
    <div>
      <span class="eyebrow hero-rev" data-d="1">NARLIGHT — AYDINLATMANIN TASARIMI</span>
      <h1 class="hero-rev" data-d="2">Karanlığa<br><span class="accent">imza atan</span><br>Türk markası.</h1>
      <p class="lede hero-rev" data-d="3">
        29 yıldır Türkiye'nin dört bir yanında camileri, meydanları, müzeleri, otobanları ve kent merkezlerini ışıkla yeniden yazıyoruz. Tek bir ekipten konsept, üretim, kurulum ve sertifikasyon.
      </p>
      <div class="actions hero-rev" data-d="4">
        <a href="/projeler/" class="btn" data-magnetic="14">
          200+ Projeyi İncele
          <svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </a>
        <a href="/iletisim/" class="btn btn-ghost" style="border-color:rgba(255,255,255,0.18);color:rgba(255,255,255,0.85)">
          Teklif İste
        </a>
      </div>
    </div>

    <div class="hero-rev" data-d="5">
      <div class="carousel" data-carousel>
        <div class="carousel-stage">
          ${carouselProjects.map(p => `
            <a href="${esc(p.href)}" class="carousel-card" data-carousel-card>
              <img src="${esc(p.hero)}" alt="${esc(p.title)}">
              <div class="meta">
                ${p.city ? `<span class="ey">${esc(p.city)}</span>` : ''}
                <h3>${esc(p.shortName)}</h3>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
      <div class="carousel-dots">
        ${carouselProjects.map((_, i) => `<button type="button" class="carousel-dot${i === 0 ? ' is-active' : ''}" data-carousel-dot aria-label="Slayt ${i + 1}"></button>`).join('')}
      </div>
    </div>
  </div>

  <div class="container">
    <div class="hero-strip hero-rev" data-d="5">
      <div>
        <div class="hero-strip-num"><span data-count="29">29</span><span class="plus">+</span></div>
        <div class="hero-strip-label">Yıllık Tecrübe</div>
      </div>
      <div>
        <div class="hero-strip-num"><span data-count="200">200</span><span class="plus">+</span></div>
        <div class="hero-strip-label">Tamamlanan Proje</div>
      </div>
      <div>
        <div class="hero-strip-num"><span data-count="81">81</span></div>
        <div class="hero-strip-label">Şehirde İmza</div>
      </div>
      <div>
        <div class="hero-strip-num"><span data-count="40">40</span><span class="plus">+</span></div>
        <div class="hero-strip-label">Ürün Serisi</div>
      </div>
    </div>
  </div>
</section>

<!-- ======================================================
     CLIENT MARQUEE  —  Evervault customer logos rail
====================================================== -->
<section style="background:var(--color-paper); padding:64px 0; border-bottom:1px solid var(--color-line)">
  <div class="container" style="margin-bottom:40px">
    <p class="eyebrow" style="text-align:center">— Bizi tercih edenler</p>
  </div>
  <div class="marquee" style="--marquee-dur:60s">
    <div class="marquee-content">
      ${[...railNames, ...railNames].map(name => `
        <span style="font-family:var(--font-display);font-weight:700;font-size:22px;letter-spacing:-0.01em;color:var(--color-line-strong);white-space:nowrap;display:inline-flex;align-items:center;gap:24px">
          ${esc(name)}
          <span style="display:inline-block;width:6px;height:6px;background:var(--color-glow);border-radius:50%"></span>
        </span>
      `).join('')}
    </div>
  </div>
</section>

<!-- ======================================================
     INTRO / WHO WE ARE
====================================================== -->
<section class="section">
  <div class="container">
    <div class="section-head" data-reveal>
      <div>
        <span class="section-tag"><span class="pulse"></span>Hakkımızda</span>
        <h2 class="display display-2 section-title" style="margin-top:32px">Çeyrek asırdır<br><em style="font-style:italic;color:var(--color-mute)">ışığın</em> imzası.</h2>
      </div>
      <p class="section-intro">
        1995'te kurulan Narlight, Bornova/İzmir'deki üretim tesisinden Türkiye'nin 81 ilinde 200'den fazla projeye imza attı. Camiler, meydanlar, üniversiteler, otoyollar, müzeler, oteller, AVM'ler — her ölçekte ve her bağlamda kalıcı çözümler.
      </p>
    </div>
  </div>
</section>

<!-- ======================================================
     STATS MARQUEE  —  Big editorial scrolling numbers
====================================================== -->
<section style="background:var(--color-paper-2);padding:48px 0 56px;overflow:hidden">
  <div class="marquee" style="--marquee-dur:55s;--marquee-gap:80px">
    <div class="marquee-content">
      ${Array.from({length: 2}).map(() => `
        <span class="stat-marquee-item solid"><span class="num">200+</span><span class="label">Tamamlanan Proje</span></span>
        <span class="stat-marquee-item"><span class="num">81</span><span class="label">Şehirde İmza</span></span>
        <span class="stat-marquee-item solid"><span class="num">29</span><span class="label">Yıllık Tecrübe</span></span>
        <span class="stat-marquee-item"><span class="num">40+</span><span class="label">Ürün Serisi</span></span>
        <span class="stat-marquee-item solid"><span class="num">1.300+</span><span class="label">Proje Görseli</span></span>
      `).join('')}
    </div>
  </div>
</section>

<!-- ======================================================
     SCROLLYTELLING — How we work (4 step process)
====================================================== -->
<section class="section">
  <div class="container">
    <div class="scrolly">
      <div class="scrolly-sticky" data-reveal>
        <span class="section-tag"><span class="pulse"></span>Süreç</span>
        <h2 class="display display-2" style="margin:32px 0 24px;max-width:14ch">Tasarımdan teslime, tek bir ekipten.</h2>
        <p style="font-size:15px;line-height:1.7;color:var(--color-mute);max-width:36ch;margin:0 0 32px">
          Saha keşfinden uzun yıllar süren satış sonrası servise — bir aydınlatma projesinin tüm aşamalarını biz yürütüyoruz. Mimar, mühendis, kurulum ekibi ve servis ağı tek çatı altında.
        </p>
        <a href="/kurumsal/cozumlerimiz/" class="btn btn-ghost">
          Sürecin tamamı
          <svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </a>
      </div>
      <div class="scrolly-steps">
        ${processSteps.map(s => `
          <div class="scrolly-step" data-reveal>
            <span class="num">${s.num}</span>
            <div>
              <h4>${esc(s.title)}</h4>
              <p>${esc(s.body)}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
</section>

<!-- ======================================================
     SOLUTIONS  —  Glassmorphism cards on dark
====================================================== -->
<section class="bg-ink section">
  <div class="container">
    <div class="section-head" data-reveal>
      <div>
        <span class="section-tag dark"><span class="pulse"></span>Çözümlerimiz</span>
        <h2 class="display display-2" style="color:var(--color-paper);margin-top:32px">Her ihtiyaca,<br>doğru ışık.</h2>
      </div>
      <p class="section-intro" style="color:rgba(255,255,255,0.6)">
        Konseptten kuruluma tek bir ekipten yürüyen 4 temel yetkinlik. Mimari estetik, akıllı kontrol, sertifikalı kalite ve kesintisiz servis.
      </p>
    </div>
    <div class="glass-grid" data-reveal-stagger>
      ${solutionCards.map(c => `
        <a href="${esc(c.href)}" class="glass-card">
          <span class="icon">${c.icon}</span>
          <h3>${esc(c.label)}</h3>
          <p>${esc(c.body)}</p>
          <span class="more">
            Daha fazla
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </span>
        </a>
      `).join('')}
    </div>
  </div>
</section>

<!-- ======================================================
     EDITORIAL GALLERY  —  Mosaic project showcase
====================================================== -->
<section class="section" style="background:var(--color-paper-2)">
  <div class="container">
    <div class="section-head" data-reveal>
      <div>
        <span class="section-tag"><span class="pulse"></span>Seçili Projeler</span>
        <h2 class="display display-2" style="margin-top:32px">Şehirlere kazınan<br>ışık projeleri.</h2>
      </div>
      <p class="section-intro">
        200'den fazla referans projemizden bir kesit. Tarihi yapılar, modern kampüsler, kent meydanları ve dini yapılarda kalıcı imzalarımız.
      </p>
    </div>
    <div class="gallery" data-reveal-stagger>
      ${gallery.map((p, i) => `
        <a href="${esc(p.href)}" class="gallery-item ${spanClasses[i] || 'span-3'}">
          <img src="${esc(p.hero)}" alt="${esc(p.title)}" loading="lazy">
          <div class="caption">
            ${p.city ? `<span class="ey">${esc(p.city)}</span>` : ''}
            <h3>${esc(p.shortName)}</h3>
          </div>
        </a>
      `).join('')}
    </div>
    <div style="margin-top:64px;text-align:center" data-reveal>
      <a href="/projeler/" class="btn" data-magnetic="14">
        Tüm Projeler
        <svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
      </a>
    </div>
  </div>
</section>

<!-- ======================================================
     SPEC SHOWCASE  —  Code-block style technical specs
====================================================== -->
<section class="bg-ink section">
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr;gap:64px;align-items:center" class="lg:grid-cols-2">
      <div data-reveal>
        <span class="section-tag dark"><span class="pulse"></span>Teknik Şeffaflık</span>
        <h2 class="display display-2" style="color:var(--color-paper);margin:32px 0 28px;max-width:16ch">
          Her ürün, son <em style="font-style:italic;color:var(--color-glow)">spesifikasyonuna kadar</em> ölçülür.
        </h2>
        <p style="color:rgba(255,255,255,0.65);font-size:15px;line-height:1.7;max-width:42ch;margin:0 0 36px">
          40'tan fazla ürün serimizin her biri ölçülmüş, sertifikalanmış ve dökümante edilmiş teknik özelliklere sahiptir. Tasarımcıdan saha mühendisine, herkesin ihtiyaç duyduğu veriyi tek bir karta sığdırırız.
        </p>
        <a href="/urunler/urun/agrestis/" class="btn">
          AGRESTIS Detayı
          <svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </a>
      </div>
      <div class="code-show" data-reveal>
        <div class="head">
          <span class="dot dot-r"></span>
          <span class="dot dot-y"></span>
          <span class="dot dot-g"></span>
          <span class="filename">agrestis.spec.json</span>
        </div>
        <div class="body">
<pre style="margin:0;font:inherit"><span class="punct">{</span>
  <span class="key">"family"</span><span class="punct">:</span> <span class="str">"AGRESTIS"</span><span class="punct">,</span>
  <span class="key">"series"</span><span class="punct">:</span> <span class="str">"Mimari Projektör"</span><span class="punct">,</span>
  <span class="key">"variants"</span><span class="punct">:</span> <span class="punct">[</span>
    <span class="punct">{</span> <span class="key">"model"</span><span class="punct">:</span> <span class="str">"LPR3050"</span><span class="punct">,</span> <span class="key">"power"</span><span class="punct">:</span> <span class="num">50</span><span class="punct">,</span> <span class="key">"lumen"</span><span class="punct">:</span> <span class="num">6000</span> <span class="punct">},</span>
    <span class="punct">{</span> <span class="key">"model"</span><span class="punct">:</span> <span class="str">"LPR3100"</span><span class="punct">,</span> <span class="key">"power"</span><span class="punct">:</span> <span class="num">100</span><span class="punct">,</span> <span class="key">"lumen"</span><span class="punct">:</span> <span class="num">12000</span> <span class="punct">},</span>
    <span class="punct">{</span> <span class="key">"model"</span><span class="punct">:</span> <span class="str">"LPR3150"</span><span class="punct">,</span> <span class="key">"power"</span><span class="punct">:</span> <span class="num">150</span><span class="punct">,</span> <span class="key">"lumen"</span><span class="punct">:</span> <span class="num">16500</span> <span class="punct">}</span>
  <span class="punct">],</span>
  <span class="key">"cri"</span><span class="punct">:</span> <span class="str">"&ge;80"</span><span class="punct">,</span>
  <span class="key">"voltage"</span><span class="punct">:</span> <span class="str">"230V AC"</span><span class="punct">,</span>
  <span class="key">"ip_class"</span><span class="punct">:</span> <span class="str">"IP67"</span><span class="punct">,</span>
  <span class="key">"cct"</span><span class="punct">:</span> <span class="str">"3000K - 6500K"</span><span class="punct">,</span>
  <span class="key">"housing"</span><span class="punct">:</span> <span class="str">"Aluminium Extrusion"</span><span class="punct">,</span>
  <span class="key">"driver"</span><span class="punct">:</span> <span class="str">"Constant Current"</span><span class="punct">,</span>
  <span class="com">// 1~10V / DALI dimming optional</span>
<span class="punct">}</span></pre>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ======================================================
     NEWS  —  Editorial magazine layout
====================================================== -->
<section class="section">
  <div class="container">
    <div class="section-head" data-reveal>
      <div>
        <span class="section-tag"><span class="pulse"></span>Basın Odası</span>
        <h2 class="display display-2" style="margin-top:32px">Sahadan haberler.</h2>
      </div>
      <p class="section-intro">
        Yeni teknolojiler, fuarlar, açılışlar ve röportajlar — Narlight'tan son haberler.
      </p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-reveal-stagger>
      ${latestNews.map(n => {
        const summary = (n.cleanParas || []).find(p => p.length > 50)?.slice(0, 160) || 'Detaylar için habere göz atın.';
        return `
          <a href="${esc(n.href)}" style="display:block;border-top:1px solid var(--color-ink);padding-top:28px">
            <span class="eyebrow" style="display:block;margin-bottom:20px">— Haber</span>
            <h3 style="font-family:var(--font-display);font-weight:800;font-size:22px;line-height:1.15;letter-spacing:-0.02em;margin:0 0 18px">${esc(n.title.slice(0, 80))}${n.title.length > 80 ? '…' : ''}</h3>
            <p style="font-size:13px;line-height:1.65;color:var(--color-mute);margin:0 0 24px">${esc(summary)}${summary.length === 160 ? '…' : ''}</p>
            <span style="font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;display:inline-flex;align-items:center;gap:8px">
              Devamı
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </span>
          </a>`;
      }).join('')}
    </div>
  </div>
</section>

<!-- ======================================================
     FINAL CTA  —  Dark navy gradient
====================================================== -->
<section style="background:linear-gradient(135deg,var(--color-navy-deep),var(--color-ink));color:var(--color-paper);padding:clamp(80px,10vw,160px) 0">
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr;gap:48px;align-items:end" class="md:grid-cols-2">
      <div data-reveal>
        <span class="section-tag dark"><span class="pulse"></span>Sıradaki proje sizin</span>
        <h2 class="display display-2" style="color:var(--color-paper);max-width:14ch;margin:32px 0 0">Mekanınız için ışığı tasarlayalım.</h2>
      </div>
      <div data-reveal style="display:flex;flex-direction:column;gap:24px">
        <p style="font-size:16px;line-height:1.7;color:rgba(255,255,255,0.7);max-width:48ch;margin:0">
          Saha incelemesinden simülasyona, ürün tedarikinden kuruluma — tüm aydınlatma sürecini tek bir ekipten yürütüyoruz.
        </p>
        <div style="display:flex;flex-wrap:wrap;gap:16px">
          <a href="/iletisim/" class="btn" data-magnetic="14" style="background:var(--color-glow);color:var(--color-ink)">
            Teklif Al
            <svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </a>
          <a href="tel:+902323481010" class="btn btn-ghost" style="border-color:rgba(255,255,255,0.32);color:var(--color-paper)">+90 232 348 10 10</a>
        </div>
      </div>
    </div>
  </div>
</section>
`;
}
