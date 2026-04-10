/* Narlight — site.js
   Vanilla helpers: nav state, mega-menu, scroll reveal, count-up,
   project carousel, lightbox modal, custom cursor, magnetic buttons,
   sticky CTA bar.
*/

(function () {
  'use strict';

  // ============================================================
  // Sticky / scrolled nav state
  // ============================================================
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 40) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ============================================================
  // Mega-menu open/close
  // ============================================================
  const triggers = document.querySelectorAll('[data-mega-trigger]');
  const megas = document.querySelectorAll('[data-mega]');
  let activeMega = null;
  let closeTimer = null;

  function openMega(key) {
    clearTimeout(closeTimer);
    if (activeMega === key) return;
    activeMega = key;
    triggers.forEach((t) => {
      t.setAttribute('aria-expanded', t.dataset.megaTrigger === key ? 'true' : 'false');
    });
    megas.forEach((m) => m.classList.toggle('is-open', m.dataset.mega === key));
  }
  function closeMegaSoon() {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      activeMega = null;
      triggers.forEach((t) => t.setAttribute('aria-expanded', 'false'));
      megas.forEach((m) => m.classList.remove('is-open'));
    }, 180);
  }
  function cancelClose() { clearTimeout(closeTimer); }

  triggers.forEach((t) => {
    const key = t.dataset.megaTrigger;
    t.addEventListener('mouseenter', () => openMega(key));
    t.addEventListener('focus', () => openMega(key));
    // Click on a trigger always opens (never closes the panel that just opened
    // via hover); to close, click outside the nav or press Escape.
    t.addEventListener('click', (e) => {
      e.preventDefault();
      openMega(key);
    });
  });
  // Close when clicking outside the nav.
  document.addEventListener('click', (e) => {
    if (!nav) return;
    if (!nav.contains(e.target)) closeMegaSoon();
  });
  megas.forEach((m) => {
    m.addEventListener('mouseenter', cancelClose);
    m.addEventListener('mouseleave', closeMegaSoon);
  });
  // Close when leaving the whole nav region.
  if (nav) {
    nav.addEventListener('mouseleave', closeMegaSoon);
  }
  // Close on Escape.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMegaSoon();
  });

  // ============================================================
  // Scroll reveal
  // ============================================================
  const reveals = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  // ============================================================
  // Count-up numbers
  // ============================================================
  const countUps = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && countUps.length) {
    const fmt = new Intl.NumberFormat('tr-TR');
    const cio = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target;
        const target = parseFloat(el.dataset.count || '0');
        const dur = parseInt(el.dataset.countDuration || '1800', 10);
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = fmt.format(Math.round(target * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        cio.unobserve(el);
      }
    }, { threshold: 0.4 });
    countUps.forEach((el) => cio.observe(el));
  }

  // ============================================================
  // Project carousel (Evervault-style 3D rotating card stack)
  // ============================================================
  const carousels = document.querySelectorAll('[data-carousel]');
  carousels.forEach((root) => {
    const cards = Array.from(root.querySelectorAll('[data-carousel-card]'));
    const dots = Array.from(root.querySelectorAll('[data-carousel-dot]'));
    let idx = 0;
    let auto = null;

    function layout() {
      const total = cards.length;
      cards.forEach((c, i) => {
        const offset = (i - idx + total) % total;
        const slot = offset > total / 2 ? offset - total : offset;
        const abs = Math.abs(slot);
        const visible = abs <= 2;
        const z = 50 - abs;
        const x = slot * 24;
        const y = abs * 14;
        const rot = slot * -3;
        const scale = 1 - abs * 0.06;
        const opacity = visible ? 1 - abs * 0.15 : 0;
        c.style.transform = `translate3d(${x}%, ${y}px, 0) rotate(${rot}deg) scale(${scale})`;
        c.style.opacity = opacity;
        c.style.zIndex = z;
        c.style.pointerEvents = slot === 0 ? 'auto' : 'none';
      });
      dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
    }
    function go(n) {
      idx = (n + cards.length) % cards.length;
      layout();
    }
    function next() { go(idx + 1); }

    function startAuto() { stopAuto(); auto = setInterval(next, 5500); }
    function stopAuto() { if (auto) clearInterval(auto); auto = null; }

    dots.forEach((d, i) => {
      d.addEventListener('click', () => { go(i); stopAuto(); startAuto(); });
    });
    root.addEventListener('mouseenter', stopAuto);
    root.addEventListener('mouseleave', startAuto);

    layout();
    startAuto();
  });

  // ============================================================
  // Lightbox modal
  // ============================================================
  const lightbox = document.querySelector('[data-lightbox]');
  if (lightbox) {
    const img = lightbox.querySelector('[data-lightbox-img]');
    const cap = lightbox.querySelector('[data-lightbox-cap]');
    const closeBtn = lightbox.querySelector('[data-lightbox-close]');
    const prevBtn = lightbox.querySelector('[data-lightbox-prev]');
    const nextBtn = lightbox.querySelector('[data-lightbox-next]');
    let group = [];
    let idx = 0;

    function open(items, startIndex = 0) {
      group = items;
      idx = startIndex;
      render();
      lightbox.classList.add('is-open');
      document.documentElement.classList.add('no-scroll');
    }
    function close() {
      lightbox.classList.remove('is-open');
      document.documentElement.classList.remove('no-scroll');
    }
    function render() {
      const item = group[idx];
      if (!item) return;
      img.src = item.src;
      img.alt = item.alt || '';
      if (cap) cap.textContent = item.caption || '';
    }
    function go(d) { idx = (idx + d + group.length) % group.length; render(); }

    closeBtn?.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    prevBtn?.addEventListener('click', () => go(-1));
    nextBtn?.addEventListener('click', () => go(1));
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    });

    // Wire up triggers (anchors / buttons that should open the lightbox).
    document.querySelectorAll('[data-lightbox-trigger]').forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const groupName = trigger.dataset.lightboxTrigger;
        const items = Array.from(document.querySelectorAll(`[data-lightbox-item="${groupName}"]`)).map((el) => ({
          src: el.dataset.src || el.getAttribute('href') || el.querySelector('img')?.src,
          alt: el.dataset.alt || '',
          caption: el.dataset.caption || '',
        }));
        const startIndex = parseInt(trigger.dataset.lightboxIndex || '0', 10);
        open(items, startIndex);
      });
    });
  }

  // ============================================================
  // Magnetic buttons
  // ============================================================
  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const strength = parseFloat(el.dataset.magnetic) || 18;
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate3d(${x / r.width * strength}px, ${y / r.height * strength}px, 0)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });

  // ============================================================
  // Mobile drawer
  // ============================================================
  const burger = document.querySelector('.nav-burger');
  const drawer = document.querySelector('[data-mobile-drawer]');
  const drawerClose = document.querySelector('[data-mobile-drawer-close]');
  if (burger && drawer) {
    const setDrawer = (open) => {
      drawer.classList.toggle('is-open', open);
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.documentElement.classList.toggle('no-scroll', open);
    };
    burger.addEventListener('click', () => setDrawer(!drawer.classList.contains('is-open')));
    drawerClose?.addEventListener('click', () => setDrawer(false));
    // Close on link click.
    drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setDrawer(false)));
    // Close on Escape.
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && drawer.classList.contains('is-open')) setDrawer(false); });
  }

  // ============================================================
  // Contact form: inline validation + fake submit (no backend)
  // ============================================================
  const contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    function setError(field, msg) {
      const wrap = field.parentElement;
      let err = wrap.querySelector('.field-error');
      if (msg) {
        if (!err) {
          err = document.createElement('div');
          err.className = 'field-error';
          wrap.appendChild(err);
        }
        err.textContent = msg;
        field.setAttribute('aria-invalid', 'true');
      } else if (err) {
        err.remove();
        field.removeAttribute('aria-invalid');
      }
    }
    function validate(field) {
      const v = (field.value || '').trim();
      if (field.required && !v) { setError(field, 'Bu alan zorunlu.'); return false; }
      if (field.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { setError(field, 'Geçerli bir e-posta girin.'); return false; }
      if (field.type === 'tel' && v && !/^[+\d\s()-]{7,}$/.test(v)) { setError(field, 'Geçerli bir telefon girin.'); return false; }
      setError(field, null);
      return true;
    }
    contactForm.querySelectorAll('input, textarea, select').forEach((field) => {
      field.addEventListener('blur', () => validate(field));
      field.addEventListener('input', () => { if (field.getAttribute('aria-invalid')) validate(field); });
    });
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = Array.from(contactForm.querySelectorAll('input, textarea, select'));
      let firstBad = null;
      fields.forEach((f) => { if (!validate(f) && !firstBad) firstBad = f; });
      if (firstBad) { firstBad.focus(); return; }
      const success = contactForm.querySelector('[data-success]');
      if (success) success.style.display = 'block';
      fields.forEach((f) => { if (f.type !== 'submit') f.value = ''; });
      contactForm.querySelectorAll('.field-error').forEach((e) => e.remove());
    });
  }

  // ============================================================
  // Sticky bottom CTA bar (appears after first scroll past hero)
  // ============================================================
  const stickyBar = document.querySelector('[data-sticky-cta]');
  if (stickyBar) {
    const trigger = document.querySelector('[data-sticky-trigger]') || document.querySelector('main');
    const showAfter = trigger.offsetTop + trigger.offsetHeight * 0.3;
    const stopAt = document.querySelector('footer')?.offsetTop || Infinity;
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight;
      const visible = window.scrollY > showAfter && y < stopAt - 60;
      stickyBar.classList.toggle('is-visible', visible);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();
