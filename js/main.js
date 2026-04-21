/* KHUN CAMP — INTERACTION ENGINE v1.0 */

/* ============================================================
   1. GSAP PLUGIN REGISTRATION
============================================================ */
gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   2. LENIS SMOOTH SCROLL
============================================================ */
function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true
  });

  // Use GSAP ticker so Lenis and ScrollTrigger run on the same frame loop
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

/* ============================================================
   3. UTILITY: IS TOUCH DEVICE
============================================================ */
function isTouchDevice() {
  return window.matchMedia('(max-width: 768px)').matches ||
         ('ontouchstart' in window);
}

/* ============================================================
   4. PRELOADER
============================================================ */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const counter = document.getElementById('percentage-counter');
  const logo = preloader ? preloader.querySelector('.loader-logo img') : null;

  if (!preloader || !counter) return;

  gsap.set(preloader, { clipPath: 'inset(0% 0% 0% 0%)' });

  gsap.to(logo, {
    opacity: 0.5,
    duration: 0.8,
    yoyo: true,
    repeat: -1,
    ease: 'power1.inOut'
  });

  const obj = { val: 0 };
  gsap.to(obj, {
    val: 100,
    duration: 2.2,
    ease: 'power2.inOut',
    onUpdate() {
      const formatted = String(Math.floor(obj.val)).padStart(3, '0');
      counter.textContent = formatted;
    },
    onComplete() {
      gsap.to(preloader, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.9,
        delay: 0.2,
        ease: 'power4.inOut',
        onComplete() {
          preloader.style.display = 'none';
          gsap.fromTo('#hero .reveal-up',
            { opacity: 0, y: 40, clipPath: 'inset(100% 0% 0% 0%)' },
            { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 1, stagger: 0.15, ease: 'power4.out' }
          );
        }
      });
    }
  });
}

/* ============================================================
   5. NAV SCROLL BEHAVIOUR
============================================================ */
function initNav() {
  const header = document.getElementById('site-header');
  if (!header) return;

  ScrollTrigger.create({
    start: 'top -80px',
    onUpdate(self) {
      if (self.progress > 0) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });
}

/* ============================================================
   6. CUSTOM CROSSHAIR CURSOR
============================================================ */
function initCursor() {
  if (isTouchDevice()) return;

  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;
  document.body.classList.add('cursor-active');

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.set(dot, { x: mouseX, y: mouseY });
  });

  gsap.ticker.add(() => {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    gsap.set(ring, { x: ringX, y: ringY });
  });

  const hoverables = document.querySelectorAll('a, button, .btn-primary, .system-card, .bento-item');
  hoverables.forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
}

/* ============================================================
   7. SPOTLIGHT HERO EFFECT
============================================================ */
function initSpotlight() {
  const hero = document.getElementById('hero');
  const bg = hero ? hero.querySelector('.spotlight-bg') : null;
  if (!hero || !bg) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    bg.style.background = `radial-gradient(
      circle 350px at ${x}% ${y}%,
      rgba(212, 175, 55, 0.1) 0%,
      rgba(212, 175, 55, 0.03) 40%,
      transparent 70%
    )`;
  });

  hero.addEventListener('mouseleave', () => {
    bg.style.background = 'radial-gradient(circle 300px at 50% 50%, rgba(212, 175, 55, 0.04) 0%, transparent 70%)';
  });
}

/* ============================================================
   8. THREE.JS GOLDEN GRID
============================================================ */
function initThreeBackground() {
  const container = document.getElementById('threejs-container');
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    container.offsetWidth / container.offsetHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const count = 1500;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    size: 0.025,
    color: 0xD4AF37,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);
  camera.position.z = 3;

  let mouseX = 0;
  let mouseY = 0;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.5;
    mouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 0.5;
  });

  const animate = () => {
    requestAnimationFrame(animate);
    particles.rotation.y += 0.001;
    particles.rotation.x += 0.0005;
    particles.rotation.y += (mouseX - particles.rotation.y) * 0.02;
    renderer.render(scene, camera);
  };
  animate();

  window.addEventListener('resize', () => {
    const w = container.offsetWidth;
    const h = container.offsetHeight;
    if (!w || !h) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}

/* ============================================================
   9. SCROLL TRIGGER REVEALS
============================================================ */
function initRevealAnimations() {
  const elements = document.querySelectorAll('.reveal-up');

  elements.forEach((el) => {
    if (el.closest('#hero')) return;

    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 40,
        clipPath: 'inset(100% 0% 0% 0%)'
      },
      {
        opacity: 1,
        y: 0,
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
}

/* ============================================================
   10. SOLUTION DIAGRAM SVG ANIMATION
============================================================ */
function initSolutionDiagram() {
  const lines = document.querySelectorAll('.node-line');
  const satellites = document.querySelectorAll('.node-satellite');
  const center = document.querySelector('.node-center');

  if (!lines.length) return;

  gsap.set(lines, { strokeDashoffset: 300, opacity: 0 });
  gsap.set(satellites, { scale: 0, transformOrigin: 'center', opacity: 0 });
  gsap.set(center, { scale: 0, transformOrigin: 'center', opacity: 0 });

  ScrollTrigger.create({
    trigger: '#solution-diagram',
    start: 'top 75%',
    once: true,
    onEnter() {
      gsap.to(center, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' });
      gsap.to(lines, {
        strokeDashoffset: 0,
        opacity: 0.3,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.3
      });
      gsap.to(satellites, {
        scale: 1,
        opacity: 0.9,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(2)',
        delay: 0.8
      });
    }
  });
}

/* ============================================================
   11. TIMELINE GOLD GLOW ANIMATION
============================================================ */
function initTimelineAnimation() {
  const steps = document.querySelectorAll('.timeline-step');
  if (!steps.length) return;

  steps.forEach((step, i) => {
    const stepNumber = step.querySelector('.step-number');
    const stepConnector = step.querySelector('.step-connector');

    ScrollTrigger.create({
      trigger: step,
      start: 'top 70%',
      once: true,
      onEnter() {
        if (stepNumber) {
          gsap.fromTo(
            stepNumber,
            { opacity: 0.2, textShadow: '0 0 0px transparent' },
            {
              opacity: 1,
              textShadow: '0 0 20px rgba(212, 175, 55, 0.6)',
              duration: 0.8,
              delay: i * 0.15,
              ease: 'power3.out'
            }
          );
        }
        if (stepConnector) {
          gsap.fromTo(
            stepConnector,
            { scaleY: 0, transformOrigin: 'top' },
            { scaleY: 1, duration: 0.6, delay: i * 0.15 + 0.3, ease: 'power2.out' }
          );
        }
      }
    });
  });
}

/* ============================================================
   12. MAGNETIC CTA BUTTONS
============================================================ */
function initMagneticButtons() {
  if (isTouchDevice()) return;

  const buttons = document.querySelectorAll('.magnetic-item');

  buttons.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * 0.35;
      const deltaY = (e.clientY - centerY) * 0.35;

      gsap.to(btn, {
        x: deltaX,
        y: deltaY,
        duration: 0.4,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  });
}

/* ============================================================
   13. BENTO GOLDEN BORDER-DRAW HOVER
============================================================ */
function initBentoHover() {
  const items = document.querySelectorAll('.bento-item');

  items.forEach((item) => {
    if (item.classList.contains('bento-highlight')) return;
    item.addEventListener('mouseenter', () => {
      gsap.to(item, {
        borderColor: '#D4AF37',
        backgroundColor: 'rgba(212, 175, 55, 0.04)',
        duration: 0.35,
        ease: 'power2.out'
      });
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        borderColor: 'rgba(255, 255, 255, 0.05)',
        backgroundColor: 'var(--bg-charcoal)',
        duration: 0.35,
        ease: 'power2.out'
      });
    });
  });
}

/* ============================================================
   14. BREATHING CTA PULSE
============================================================ */
function initBreathingCTA() {
  const cta = document.getElementById('breathing-cta');
  if (!cta) return;

  gsap.to(cta, {
    boxShadow: '0 0 40px rgba(212, 175, 55, 0.6), 0 0 80px rgba(212, 175, 55, 0.2)',
    duration: 1.8,
    yoyo: true,
    repeat: -1,
    ease: 'power1.inOut'
  });
}

/* ============================================================
   15. INIT — DOMContentLoaded
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initPreloader();
  initNav();
  initCursor();
  initSpotlight();
  initThreeBackground();
  initRevealAnimations();
  initSolutionDiagram();
  initTimelineAnimation();
  initMagneticButtons();
  initBentoHover();
  initBreathingCTA();
});

// FAQ Accordion + Category Filter
(function () {
  const catBtns = document.querySelectorAll('.faq-cat-btn');
  const items   = document.querySelectorAll('.faq-item');

  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      items.forEach(item => {
        const match = cat === 'all' || item.dataset.cat === cat;
        item.classList.toggle('hidden', !match);
        if (!match) item.classList.remove('open');
      });
    });
  });

  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
})();

// Sub-nav scroll spy
(function () {
  const sections = [
    'hero', 'problem', 'solution', 'how-it-works',
    'deliverables', 'proof', 'testimonials', 'faq', 'final-cta'
  ];
  const links = document.querySelectorAll('.sub-nav-link');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      links.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    });
  }, { threshold: 0.35 });

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();

// Hamburger — mobile only
(function () {
  const btn  = document.getElementById('ham-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', isOpen);
    menu.setAttribute('aria-hidden', !isOpen);
  });

  // Close on link tap
  document.querySelectorAll('.mob-menu-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', false);
    });
  });

  // Scroll spy — highlights active in both navs
  const sections = [
    'hero','problem','solution','how-it-works',
    'deliverables','proof','testimonials','faq','final-cta'
  ];

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      document.querySelectorAll('.sub-nav-link').forEach(l =>
        l.classList.toggle('active', l.getAttribute('href') === '#' + id)
      );
      document.querySelectorAll('.mob-menu-link').forEach(l =>
        l.classList.toggle('active', l.getAttribute('href') === '#' + id)
      );
    });
  }, { threshold: 0.35 });

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();

/* ============================================================
   PODCAST STRIP — Drag-to-scroll + Lightbox
============================================================ */
(function () {

  /* ── Drag-to-scroll on the strip ── */
  const strip = document.querySelector('.podcast-strip');
  if (strip) {
    let isDragging = false, startX, scrollStart;

    strip.addEventListener('mousedown', e => {
      isDragging = true;
      startX = e.pageX - strip.offsetLeft;
      scrollStart = strip.scrollLeft;
      strip.classList.add('is-dragging');
    });
    document.addEventListener('mouseup', () => {
      isDragging = false;
      strip.classList.remove('is-dragging');
    });
    strip.addEventListener('mousemove', e => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - strip.offsetLeft;
      strip.scrollLeft = scrollStart - (x - startX);
    });
  }

  /* ── Lightbox ── */
  const lightbox   = document.getElementById('podcast-lightbox');
  const backdrop   = lightbox.querySelector('.lightbox-backdrop');
  const closeBtn   = lightbox.querySelector('.lightbox-close');
  const titleEl    = lightbox.querySelector('.lightbox-title');
  const gridEl     = lightbox.querySelector('.lightbox-grid');
  const fullview   = lightbox.querySelector('.lightbox-fullview');
  const fullImg    = lightbox.querySelector('.lightbox-fullimg');
  const backBtn    = lightbox.querySelector('.lightbox-back');

  function openLightbox(name, images) {
    titleEl.textContent = name;
    gridEl.innerHTML = '';
    fullview.style.display = 'none';
    gridEl.style.display = 'grid';

    images.forEach(src => {
      const wrap = document.createElement('div');
      wrap.className = 'lightbox-thumb';
      const img = document.createElement('img');
      img.src = src;
      img.alt = name;
      wrap.appendChild(img);
      wrap.addEventListener('click', () => showFull(src));
      gridEl.appendChild(wrap);
    });

    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function showFull(src) {
    fullImg.src = src;
    gridEl.style.display = 'none';
    fullview.style.display = 'block';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.podcast-card').forEach(card => {
    card.addEventListener('click', () => {
      const name   = card.dataset.podcast;
      const images = JSON.parse(card.dataset.images || '[]');
      openLightbox(name, images);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  backdrop.addEventListener('click', closeLightbox);
  backBtn.addEventListener('click', () => {
    fullview.style.display = 'none';
    gridEl.style.display = 'grid';
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });

})();