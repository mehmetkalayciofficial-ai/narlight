import { esc } from '../utils.mjs';

const groups = [
  {
    title: 'Süreç & Başlangıç',
    items: [
      {
        q: 'Bir aydınlatma projesi nasıl başlar?',
        a: 'Tek bir telefon veya iletişim formu ile başlar. Önce ihtiyaçlarınızı dinleriz, sonra ekibimiz mekânı yerinde inceler. Saha incelemesi ücretsizdir; bu görüşmenin sonunda size bir ön konsept ve yaklaşık maliyet sunarız.',
      },
      {
        q: 'Saha incelemesi nasıl yapılır?',
        a: 'Mimar, elektrik mühendisi ve aydınlatma tasarımcısından oluşan bir ekip mekânı ziyaret eder. Mevcut altyapıyı, gün ışığını, kullanım amacını ve mimari dili çıkarır. Ardından DIALux veya Relux gibi simülasyon yazılımları ile ışık akışı, gölge ve enerji hesaplamaları yapılır.',
      },
      {
        q: 'Teklif almak için ne lazım?',
        a: 'Birkaç temel bilgi yeterli: proje adı/lokasyonu, alan büyüklüğü (m²), aydınlatılacak öğeler (bina, anıt, meydan, otopark vb.) ve varsa mevcut çizimler. İletişim formundan veya doğrudan +90 232 348 10 10 numaralı telefondan ulaşabilirsiniz.',
      },
      {
        q: 'Projemiz çok büyük / çok küçük mü?',
        a: 'Narlight 200+ projeyi tamamladı; bunlar arasında 4 metrekarelik bir kafe duvarından 50.000 metrekarelik kent meydanına kadar çok geniş bir yelpaze var. Her ölçekte çalışırız; tek farkı kullanılan ürün serisidir.',
      },
    ],
  },
  {
    title: 'Ürünler & Teknik',
    items: [
      {
        q: 'Hangi ürünleri üretiyorsunuz?',
        a: '40\'tan fazla seride 200\'ü aşkın model üretiyoruz: aydınlatma direkleri, mimari projektörler, park-bahçe armatürleri, sıvaaltı LED paneller, lineer & LED bar, ray spotlar, magnet ray sistemleri, havuz armatürleri, akıllı kontrol sistemleri ve daha fazlası. Tüm ürünler Bornova/İzmir\'deki kendi tesisimizde üretilir.',
      },
      {
        q: 'Sertifikalarınız nelerdir?',
        a: 'Tüm ürünlerimiz TSE, CE ve RoHS sertifikalıdır. Dış mekan ürünleri için IP65–IP67 koruma sınıfları, ışık ve elektriksel ölçümler için akredite test laboratuvar raporları mevcuttur.',
      },
      {
        q: '"CRI", "IP65", "CCT" ne demek?',
        a: '<strong>CRI</strong> (Color Rendering Index): renklerin doğal görünme oranı (0-100). Yüksek = renkler güneş ışığındaki gibi. <strong>IP65/IP67</strong>: armatürün toz ve suya karşı koruma sınıfı; dış mekan için ≥ IP65. <strong>CCT</strong> (Correlated Color Temperature, Renk Sıcaklığı): Kelvin cinsinden ışığın rengi. 3000K sıcak, 4000K nötr, 6500K soğuk beyaz.',
      },
      {
        q: 'Kataloğunuzu nereden alabilirim?',
        a: 'PDF kataloğumuzu iletişim formundan talep edebilirsiniz; 24 saat içinde e-posta ile iletiyoruz. Ayrıca ofis ziyaretinizde basılı katalog da hediye ediyoruz.',
      },
      {
        q: 'Özel tasarım armatür yapıyor musunuz?',
        a: 'Evet. Özellikle tarihi yapılar, müzeler ve özgün mimari için standart ürün serilerimizin dışında, projeye özel armatür tasarlıyor ve üretiyoruz. Bu hizmet için ayrı bir tasarım brief\'i ve fizibilite çalışması yapıyoruz.',
      },
    ],
  },
  {
    title: 'Kurulum & Servis',
    items: [
      {
        q: 'Kurulum yapıyor musunuz?',
        a: 'Evet. Kendi kurulum ekibimiz Türkiye genelinde sahaya gider. Devreye alma, eğitim ve test süreçleri tamamlanana kadar projedeyiz.',
      },
      {
        q: 'Garantiniz ne kadar?',
        a: 'Standart ürünlerimizde 5 yıl üretim garantisi sunuyoruz. Akıllı kontrol sistemleri ve özel projelerde garanti süresi anlaşmaya göre belirlenir.',
      },
      {
        q: 'Satış sonrası servis var mı?',
        a: 'Evet. Türkiye genelinde servis ağımız var. Yedek parça, periyodik bakım ve onarım hizmetlerini garanti süresinden sonra da sunuyoruz.',
      },
    ],
  },
  {
    title: 'İş Birliği',
    items: [
      {
        q: 'Bayi olmak istiyorum, nasıl başvurabilirim?',
        a: 'Bayilik başvurularınızı iletişim formundan veya <a href="mailto:satis@narlight.com.tr">satis@narlight.com.tr</a> adresine gönderebilirsiniz. Satış ekibimiz sizinle iletişime geçer.',
      },
      {
        q: 'Mimar veya proje yöneticisiyim, fiyat listesi alabilir miyim?',
        a: 'Evet. Profesyonel projeler için ayrıcalıklı fiyatlandırma ve teknik destek sağlıyoruz. <a href="mailto:satis@narlight.com.tr">satis@narlight.com.tr</a> üzerinden talep edebilirsiniz.',
      },
      {
        q: 'Yurt dışı projelere yapıyor musunuz?',
        a: 'Evet. ABD\'deki Istanbul Market, çeşitli Avrupa ülkelerinde tamamlanan projelerimiz var. İhracat ekibimizle iletişime geçin.',
      },
    ],
  },
];

export function renderFaq() {
  return `
<section style="background:var(--color-ink);color:var(--color-paper);padding:168px 0 96px;position:relative;overflow:hidden">
  <div style="position:absolute;inset:0;background:radial-gradient(60% 50% at 80% 0%, rgba(255,179,71,0.08), transparent 60%), radial-gradient(80% 60% at 0% 100%, rgba(26,37,90,0.5), transparent 60%);pointer-events:none"></div>
  <div class="container" style="position:relative;max-width:880px">
    <span class="section-tag dark"><span class="pulse"></span>Sıkça Sorulan Sorular</span>
    <h1 class="display display-1 hero-rev" data-d="1" style="color:var(--color-paper);max-width:14ch;margin:32px 0 0">Aklınızdaki <em style="font-style:italic;color:var(--color-glow)">soruları</em> burada toplandık.</h1>
    <p class="hero-rev" data-d="2" style="font-family:var(--font-body);font-size:var(--t-lead);line-height:1.7;color:rgba(255,255,255,0.7);max-width:54ch;margin:36px 0 0">
      Bir aydınlatma projesine başlamadan önce en sık sorulan soruların net cevaplarını bulun. Cevabını bulamadığınız bir konu varsa <a href="/iletisim/" style="color:var(--color-glow);text-decoration:underline">bize yazın</a>.
    </p>
  </div>
</section>

<section class="section">
  <div class="container" style="max-width:880px">
    ${groups.map((g, gi) => `
      <div data-reveal style="margin-bottom:80px">
        <p class="eyebrow" style="margin-bottom:16px">${String(gi+1).padStart(2,'0')} — ${esc(g.title)}</p>
        <h2 class="display display-3" style="margin:0 0 32px">${esc(g.title)}</h2>
        <div style="display:flex;flex-direction:column;gap:4px">
          ${g.items.map(it => `
            <details class="faq-item">
              <summary>
                <span>${esc(it.q)}</span>
                <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
              </summary>
              <div class="faq-answer">${it.a}</div>
            </details>
          `).join('')}
        </div>
      </div>
    `).join('')}
  </div>
</section>

<section style="background:var(--color-paper-2);padding:96px 0">
  <div class="container" style="text-align:center;max-width:680px">
    <p class="eyebrow" style="margin-bottom:24px">Aradığınızı bulamadınız mı?</p>
    <h2 class="display display-3" style="margin:0 0 32px">Doğrudan bize sorun.</h2>
    <a href="/iletisim/" class="btn">
      İletişim Formu
      <svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
    </a>
  </div>
</section>
`;
}
