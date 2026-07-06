(function () {
  var COOKIE_NAME = 'kc_exit_seen';
  var COOKIE_DAYS = 7;
  var MOBILE_DELAY_MS = 40000;
  var CALENDAR_URL = 'https://api.leadconnectorhq.com/widget/bookings/khun-camp-demo-call-7043';

  var modalHTML = `
<div class="exit-overlay" id="exitOverlay" role="dialog" aria-modal="true" aria-label="Free Missed-Call Audit offer">
  <div class="exit-modal">
    <button class="exit-close" id="exitClose" aria-label="Close">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>

    <div class="exit-body">
      <span class="exit-eyebrow">Before You Go</span>

      <div class="exit-stat">
        <span class="exit-stat-num">62%</span>
        <span class="exit-stat-label">of callers never leave a voicemail. They just book elsewhere.</span>
      </div>

      <h2 class="exit-headline">Do you know how many bookings<br><span>you lost this week?</span></h2>
      <p class="exit-sub">Most med spas lose 8–15 bookings a month to missed calls and slow follow-up. They never see it in any report. The free audit shows you your exact number.</p>

      <a href="${CALENDAR_URL}" class="exit-cta" id="exitCta">Get My Free Missed-Call Audit</a>
      <button class="exit-dismiss" id="exitDismiss">No thanks, I already know my numbers</button>
    </div>

    <div class="exit-trust">
      <div class="exit-trust-item">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        Free 15-min call
      </div>
      <div class="exit-trust-divider"></div>
      <div class="exit-trust-item">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        No commitment
      </div>
      <div class="exit-trust-divider"></div>
      <div class="exit-trust-item">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        We show your numbers first
      </div>
    </div>
  </div>
</div>`;

  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  function setCookie(name, value, days) {
    var expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + value + '; expires=' + expires + '; path=/; SameSite=Lax';
  }

  function isMobile() {
    return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  }

  function init() {
    if (getCookie(COOKIE_NAME)) return;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    var overlay = document.getElementById('exitOverlay');
    var closeBtn = document.getElementById('exitClose');
    var dismissBtn = document.getElementById('exitDismiss');
    var ctaBtn = document.getElementById('exitCta');

    function openPopup() {
      if (overlay.classList.contains('is-open')) return;
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      setCookie(COOKIE_NAME, '1', COOKIE_DAYS);
    }

    function closePopup() {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closePopup);
    dismissBtn.addEventListener('click', closePopup);

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closePopup();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closePopup();
    });

    ctaBtn.addEventListener('click', function () {
      setCookie(COOKIE_NAME, '1', COOKIE_DAYS);
    });

    var triggered = false;

    function trigger() {
      if (triggered) return;
      triggered = true;
      openPopup();
    }

    // Trigger 1: mouse leaves toward top (desktop exit intent)
    if (!isMobile()) {
      document.addEventListener('mouseleave', function (e) {
        if (e.clientY <= 0 || e.relatedTarget === null) trigger();
      });
      document.addEventListener('mouseout', function (e) {
        if (!e.relatedTarget && e.clientY <= 2) trigger();
      });
    }

    // Trigger 2: scroll past 70% of page
    window.addEventListener('scroll', function onScroll() {
      var scrolled = window.scrollY + window.innerHeight;
      var total = document.documentElement.scrollHeight;
      if (scrolled / total >= 0.70) {
        window.removeEventListener('scroll', onScroll);
        trigger();
      }
    }, { passive: true });

    // Trigger 3: mobile — 40s inactivity
    if (isMobile()) {
      setTimeout(trigger, MOBILE_DELAY_MS);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
