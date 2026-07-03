(function () {
  var CALENDAR_URL = 'https://api.leadconnectorhq.com/widget/bookings/khun-camp-demo-call-7043';

  var modalHTML = `
<div class="booking-modal-overlay" id="bookingModalOverlay" role="dialog" aria-modal="true" aria-label="Book your free Missed-Call Audit">
  <div class="booking-modal">
    <div class="booking-modal-header">
      <img src="/images/KhunCamp-Logo-nav.webp" alt="Khun Camp" class="booking-modal-logo">
      <div class="booking-modal-header-text">
        <p>Free Missed-Call Audit</p>
      </div>
      <button class="booking-modal-close" id="bookingModalClose" aria-label="Close modal">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
    <div class="booking-modal-value">
      <div class="booking-modal-value-item">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        Free 15-min call
      </div>
      <div class="booking-modal-value-divider"></div>
      <div class="booking-modal-value-item">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        No commitment
      </div>
      <div class="booking-modal-value-divider"></div>
      <div class="booking-modal-value-item">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        We show you your numbers first
      </div>
    </div>
    <div class="booking-modal-calendar">
      <iframe id="bookingCalendarFrame" src="" title="Book a free Missed-Call Audit with Khun Camp" loading="lazy" allow="payment"></iframe>
    </div>
  </div>
</div>`;

  function init() {
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    var overlay = document.getElementById('bookingModalOverlay');
    var closeBtn = document.getElementById('bookingModalClose');
    var frame   = document.getElementById('bookingCalendarFrame');
    var loaded  = false;

    function openModal() {
      if (!loaded) {
        frame.src = CALENDAR_URL;
        loaded = true;
      }
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeModal);

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });

    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href*="leadconnectorhq.com/widget/bookings"]');
      if (link && !link.closest('#bookingModalOverlay')) {
        e.preventDefault();
        openModal();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
