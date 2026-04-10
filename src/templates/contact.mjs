import { esc } from '../utils.mjs';

export function renderContact() {
  return `
<section style="background:var(--color-ink);color:var(--color-paper);padding:168px 0 96px;position:relative;overflow:hidden">
  <div style="position:absolute;inset:0;background:radial-gradient(60% 50% at 80% 0%, rgba(255,179,71,0.1), transparent 60%), radial-gradient(80% 60% at 0% 100%, rgba(26,37,90,0.5), transparent 60%);pointer-events:none"></div>
  <div class="container" style="position:relative">
    <span class="section-tag dark"><span class="pulse"></span>İletişim</span>
    <h1 class="display display-1 hero-rev" data-d="1" style="color:var(--color-paper);max-width:14ch;margin:32px 0 0">Hadi <em style="font-style:italic;color:var(--color-glow)">konuşalım</em>.</h1>
    <p class="hero-rev" data-d="2" style="font-family:var(--font-body);font-size:clamp(15px,1.1vw,20px);line-height:1.7;color:rgba(255,255,255,0.7);max-width:54ch;margin:36px 0 0">
      Bir aydınlatma projesi mi düşünüyorsunuz? Saha incelemesinden teklife kadar tüm süreçte yanınızdayız. Aşağıdaki formu doldurun ya da doğrudan bize ulaşın — 24 saat içinde dönüş yaparız.
    </p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr;gap:80px" class="lg:grid-cols-[1fr_1.4fr]">
      <!-- Left: contact info -->
      <div data-reveal>
        <div style="margin-bottom:48px">
          <p class="eyebrow" style="margin-bottom:16px">— Adres</p>
          <p style="font-family:var(--font-display);font-weight:700;font-size:22px;line-height:1.3;letter-spacing:-0.01em;margin:0;max-width:24ch">
            Doğanlar Mah. 1406 Sk. No:11 İç Kapı No:13<br>Bornova / İZMİR
          </p>
        </div>
        <div style="margin-bottom:48px">
          <p class="eyebrow" style="margin-bottom:16px">— Telefon</p>
          <a href="tel:+902323481010" style="font-family:var(--font-display);font-weight:700;font-size:24px;letter-spacing:-0.01em;color:var(--color-ink);transition:color 240ms var(--ease-out)" onmouseover="this.style.color='var(--color-navy)'" onmouseout="this.style.color='var(--color-ink)'">+90 232 348 10 10</a>
        </div>
        <div style="margin-bottom:48px">
          <p class="eyebrow" style="margin-bottom:16px">— E-posta</p>
          <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:12px">
            <li><a href="mailto:info@narlight.com.tr" style="font-family:var(--font-body);font-size:16px;font-weight:500">info@narlight.com.tr <span style="font-size:11px;color:var(--color-mute);font-weight:400">— genel</span></a></li>
            <li><a href="mailto:satis@narlight.com.tr" style="font-family:var(--font-body);font-size:16px;font-weight:500">satis@narlight.com.tr <span style="font-size:11px;color:var(--color-mute);font-weight:400">— satış</span></a></li>
            <li><a href="mailto:ik@narlight.com.tr" style="font-family:var(--font-body);font-size:16px;font-weight:500">ik@narlight.com.tr <span style="font-size:11px;color:var(--color-mute);font-weight:400">— insan kaynakları</span></a></li>
          </ul>
        </div>
        <div>
          <p class="eyebrow" style="margin-bottom:16px">— Sosyal Medya</p>
          <div style="display:flex;gap:14px">
            <a href="https://www.instagram.com/narlighttr/" target="_blank" rel="noopener" style="display:inline-flex;width:44px;height:44px;border-radius:50%;border:1px solid var(--color-line);align-items:center;justify-content:center;transition:background-color 240ms var(--ease-out),border-color 240ms var(--ease-out)" onmouseover="this.style.background='var(--color-ink)';this.style.color='var(--color-paper)';this.style.borderColor='var(--color-ink)'" onmouseout="this.style.background='';this.style.color='';this.style.borderColor='var(--color-line)'">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><circle cx="17.5" cy="6.5" r=".5"/></svg>
            </a>
            <a href="https://www.facebook.com/narlighttr/" target="_blank" rel="noopener" style="display:inline-flex;width:44px;height:44px;border-radius:50%;border:1px solid var(--color-line);align-items:center;justify-content:center;transition:background-color 240ms var(--ease-out),border-color 240ms var(--ease-out)" onmouseover="this.style.background='var(--color-ink)';this.style.color='var(--color-paper)';this.style.borderColor='var(--color-ink)'" onmouseout="this.style.background='';this.style.color='';this.style.borderColor='var(--color-line)'">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://twitter.com/narlighttr" target="_blank" rel="noopener" style="display:inline-flex;width:44px;height:44px;border-radius:50%;border:1px solid var(--color-line);align-items:center;justify-content:center;transition:background-color 240ms var(--ease-out),border-color 240ms var(--ease-out)" onmouseover="this.style.background='var(--color-ink)';this.style.color='var(--color-paper)';this.style.borderColor='var(--color-ink)'" onmouseout="this.style.background='';this.style.color='';this.style.borderColor='var(--color-line)'">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2H21l-6.547 7.49L22 22h-6.43l-5.04-6.59L4.8 22H2l7.014-8.02L2 2h6.6l4.554 6.02L18.244 2z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Right: form -->
      <form data-reveal data-contact-form style="background:var(--color-paper-3);border-radius:24px;padding:48px;display:flex;flex-direction:column;gap:24px">
        <div class="form-row">
          <label for="cf-name">Ad Soyad</label>
          <input id="cf-name" type="text" name="name" autocomplete="name" required spellcheck="false" placeholder="Adınız ve soyadınız…">
        </div>
        <div class="form-row">
          <label for="cf-email">E-posta</label>
          <input id="cf-email" type="email" name="email" autocomplete="email" inputmode="email" spellcheck="false" required placeholder="ornek@firma.com">
        </div>
        <div class="form-row">
          <label for="cf-phone">Telefon</label>
          <input id="cf-phone" type="tel" name="phone" autocomplete="tel" inputmode="tel" placeholder="+90 5__ ___ __ __">
        </div>
        <div class="form-row">
          <label for="cf-konu">Konu</label>
          <select id="cf-konu" name="konu" required>
            <option value="">Seçiniz</option>
            <option>Yeni proje teklifi</option>
            <option>Ürün bilgisi</option>
            <option>Saha incelemesi</option>
            <option>Servis ve bakım</option>
            <option>Bayilik</option>
            <option>Diğer</option>
          </select>
        </div>
        <div class="form-row">
          <label for="cf-message">Mesajınız</label>
          <textarea id="cf-message" rows="5" name="message" required placeholder="Projeniz hakkında biraz bilgi verin…"></textarea>
        </div>
        <div data-success class="form-success" role="status" aria-live="polite" aria-atomic="true">
          Mesajınız alındı. 24 saat içinde size dönüş yapacağız.
        </div>
        <button type="submit" class="btn" style="align-self:flex-start;margin-top:8px">
          Gönder
          <svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </button>
      </form>
    </div>
  </div>
</section>

<!-- Map placeholder -->
<section style="background:var(--color-paper-2);padding:96px 0">
  <div class="container">
    <div style="border-radius:24px;overflow:hidden;height:480px;background:var(--color-paper-3);display:flex;align-items:center;justify-content:center;position:relative">
      <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=27.196%2C38.461%2C27.236%2C38.481&amp;layer=mapnik&amp;marker=38.471%2C27.216" style="width:100%;height:100%;border:0" title="Narlight ofis konumu"></iframe>
    </div>
  </div>
</section>
`;
}
