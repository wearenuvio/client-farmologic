/* ==========================================================================
   Farmologic — farmologic.com
   All behaviour here is progressive enhancement. Every word of copy exists in
   the server-rendered HTML; nothing below is required to read or use the site.
   ========================================================================== */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- header */

  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        toggle.focus();
      }
    });
  }

  /* --------------------------------------------------------------- reveals */

  var revealables = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('is-in'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.06 });

    /* Stagger siblings inside any [data-stagger] container. */
    document.querySelectorAll('[data-stagger]').forEach(function (group) {
      var step = parseInt(group.getAttribute('data-stagger'), 10) || 90;
      group.querySelectorAll(':scope > .reveal').forEach(function (el, i) {
        el.style.setProperty('--reveal-delay', (i * step) + 'ms');
      });
    });

    Array.prototype.forEach.call(revealables, function (el) { revealObserver.observe(el); });
  }

  /* -------------------------------------------------------- grow timeline */

  var timeline = document.querySelector('[data-timeline]');
  if (timeline && !reduceMotion) {
    var progress = timeline.querySelector('.timeline__progress');
    var items = timeline.querySelectorAll('.timeline__item');
    var ticking = false;

    var paintTimeline = function () {
      ticking = false;
      var rect = timeline.getBoundingClientRect();
      var anchor = window.innerHeight * 0.55;
      var travelled = Math.min(Math.max(anchor - rect.top, 0), rect.height);

      if (progress) progress.style.height = travelled + 'px';

      items.forEach(function (item) {
        var top = item.offsetTop;
        item.classList.toggle('is-active', travelled >= top + 8);
      });
    };

    var requestPaint = function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(paintTimeline);
    };

    paintTimeline();
    window.addEventListener('scroll', requestPaint, { passive: true });
    window.addEventListener('resize', requestPaint);
  } else if (timeline) {
    timeline.querySelectorAll('.timeline__item').forEach(function (i) { i.classList.add('is-active'); });
  }

  /* ------------------------------------------------- ambient spore drift */
  /* A slow drift of pale motes over the dark hero — the "living lab" layer.
     Purely decorative; skipped entirely under reduced motion.               */

  var canvas = document.querySelector('.hero__canvas');
  if (canvas && !reduceMotion && canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var motes = [];
    var raf = null;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    var sizeCanvas = function () {
      var r = canvas.getBoundingClientRect();
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var count = Math.min(64, Math.round(r.width / 22));
      motes = [];
      for (var i = 0; i < count; i++) {
        motes.push({
          x: Math.random() * r.width,
          y: Math.random() * r.height,
          r: Math.random() * 1.5 + 0.4,
          vy: -(Math.random() * 0.16 + 0.04),
          vx: (Math.random() - 0.5) * 0.09,
          a: Math.random() * 0.35 + 0.06
        });
      }
    };

    var draw = function () {
      var r = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, r.width, r.height);
      for (var i = 0; i < motes.length; i++) {
        var m = motes[i];
        m.y += m.vy;
        m.x += m.vx;
        if (m.y < -4) { m.y = r.height + 4; m.x = Math.random() * r.width; }
        if (m.x < -4) m.x = r.width + 4;
        if (m.x > r.width + 4) m.x = -4;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(200,162,74,' + m.a + ')';
        ctx.fill();
      }
      raf = window.requestAnimationFrame(draw);
    };

    var start = function () { if (!raf) draw(); };
    var stop = function () { if (raf) { window.cancelAnimationFrame(raf); raf = null; } };

    sizeCanvas();
    window.addEventListener('resize', sizeCanvas);
    document.addEventListener('visibilitychange', function () {
      document.hidden ? stop() : start();
    });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries[0].isIntersecting ? start() : stop();
      }).observe(canvas);
    } else {
      start();
    }
  }

  /* ----------------------------------------------------------------- forms */

  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  /* Free-mailbox domains are allowed, but flagged as lower-intent in the
     enquiry payload so the trade desk can triage. */
  document.querySelectorAll('form[data-enquiry]').forEach(function (form) {
    var status = form.querySelector('[data-form-status]');
    var submit = form.querySelector('[type="submit"]');

    var setInvalid = function (field, on) {
      var wrap = field.closest('.fm-field');
      if (wrap) wrap.setAttribute('data-invalid', on ? 'true' : 'false');
      field.setAttribute('aria-invalid', on ? 'true' : 'false');
    };

    var validate = function (field) {
      var value = (field.value || '').trim();
      var ok = true;

      if (field.hasAttribute('required') && !value) ok = false;
      if (ok && field.type === 'email' && value && !EMAIL.test(value)) ok = false;
      if (ok && field.type === 'checkbox' && field.hasAttribute('required')) ok = field.checked;

      setInvalid(field, !ok);
      return ok;
    };

    form.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('blur', function () {
        if (field.getAttribute('aria-invalid') === 'true' || field.value) validate(field);
      });
      field.addEventListener('input', function () {
        if (field.getAttribute('aria-invalid') === 'true') validate(field);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      /* Honeypot — bots fill hidden fields, humans never see them. */
      var trap = form.querySelector('[name="company_website_hp"]');
      if (trap && trap.value) return;

      var fields = form.querySelectorAll('input[required], select[required], textarea[required]');
      var firstBad = null;

      Array.prototype.forEach.call(fields, function (field) {
        if (!validate(field) && !firstBad) firstBad = field;
      });

      if (firstBad) {
        firstBad.focus();
        if (status) {
          status.textContent = 'Please complete the highlighted fields so we can route your enquiry.';
          status.classList.add('is-visible');
        }
        return;
      }

      var endpoint = form.getAttribute('data-endpoint');
      var data = new FormData(form);

      var done = function (message) {
        if (status) {
          status.innerHTML = message;
          status.classList.add('is-visible');
          status.focus();
        }
        if (submit) { submit.setAttribute('aria-disabled', 'true'); submit.textContent = 'Enquiry sent'; }
      };

      var fail = function () {
        if (status) {
          status.innerHTML = 'That did not send. Email us directly at ' +
            '<a href="mailto:trade@farmologic.com">trade@farmologic.com</a> and we will pick it up the same day.';
          status.classList.add('is-visible');
        }
        if (submit) submit.removeAttribute('aria-disabled');
      };

      if (submit) { submit.setAttribute('aria-disabled', 'true'); submit.textContent = 'Sending…'; }

      /* No endpoint wired yet → hand off to the mail client so no lead is
         ever silently dropped. Set data-endpoint on the form once the trade
         desk inbox / CRM webhook is live. */
      if (!endpoint || endpoint === 'mailto') {
        var lines = [];
        data.forEach(function (value, key) {
          if (key === 'company_website_hp' || !String(value).trim()) return;
          lines.push(key.replace(/_/g, ' ').toUpperCase() + ': ' + value);
        });
        window.location.href = 'mailto:trade@farmologic.com' +
          '?subject=' + encodeURIComponent('Bulk enquiry — ' + (data.get('company') || 'Farmologic')) +
          '&body=' + encodeURIComponent(lines.join('\n'));
        done('Your email client is opening with the enquiry pre-filled. Send it and we will reply within one working day.');
        return;
      }

      fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error('bad status');
          done('Thank you. Your enquiry is with the trade desk — we reply within one working day.');
          form.reset();
        })
        .catch(fail);
    });
  });

  /* Prefill the enquiry interest field when arriving from a product card. */
  var params = new URLSearchParams(window.location.search);
  var interest = params.get('interest');
  if (interest) {
    document.querySelectorAll('select[name="interest"]').forEach(function (select) {
      Array.prototype.forEach.call(select.options, function (option) {
        if (option.value.toLowerCase() === interest.toLowerCase()) select.value = option.value;
      });
    });
  }

  /* ------------------------------------------------------------ footer year */

  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
