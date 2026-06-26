(function () {
  var CALENDAR_URL = 'https://calendar.app.google/1PVSKsN8UGwQiG3g7';

  var modalHTML = [
    '<div class="booking-modal-overlay" id="bookingModalOverlay" role="dialog" aria-modal="true" aria-label="Book a call">',
    '  <div class="booking-modal">',
    '    <div class="booking-modal-header">',
    '      <img src="/images/KhunCamp-Logo-nav.webp" alt="Khun Camp" class="booking-modal-logo">',
    '      <button class="booking-modal-close" id="bookingModalClose" aria-label="Close">&times;</button>',
    '    </div>',
    '    <div class="booking-modal-body">',
    '      <p>Book your <strong>free Missed-Call Audit</strong>. In 15 minutes we\'ll show you exactly how many bookings you\'re losing to missed calls and slow follow-up, and what a system fix would look like for your business. No obligation.</p>',
    '    </div>',
    '    <div class="booking-modal-calendar">',
    '      <iframe id="bookingCalendarFrame" src="" title="Book a call with Khun Camp" loading="lazy" allowfullscreen></iframe>',
    '    </div>',
    '  </div>',
    '</div>'
  ].join('');

  function init() {
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    var overlay = document.getElementById('bookingModalOverlay');
    var closeBtn = document.getElementById('bookingModalClose');
    var frame = document.getElementById('bookingCalendarFrame');

    function openModal() {
      if (!frame.src) frame.src = CALENDAR_URL;
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
      var link = e.target.closest('a[href*="calendar.app.google"]');
      if (link) {
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
