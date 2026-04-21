# Khun Camp — YouTube Growth Engineering

Premium single-page website for Khun Camp, a done-for-you YouTube growth consultancy.

**Live:** [khuncamp.com](https://khuncamp.com)

---

## Overview

Khun Camp is positioned as an **Engineering Firm for Creators** — not a course or consultancy. The website communicates premium positioning through:

- **Dark "Underground Lab" aesthetic** — charcoal (#121212) + brushed gold (#D4AF37)
- **Advanced GSAP animations** — scroll reveals, magnetic CTAs, breathing glows
- **Three.js particle system** — 1500 interactive gold nodes in hero
- **Custom interactions** — crosshair cursor, spotlight effect, golden border draws

---

## Tech Stack

- **HTML5** — Semantic structure, SEO-optimized
- **CSS3** — Custom properties, responsive (mobile-first)
- **JavaScript (ES6+)** — Vanilla JS, no frameworks
- **GSAP 3.12.5** — Animation library + ScrollTrigger
- **Three.js r160** — 3D particle system
- **Lenis 1.0.42** — Smooth scrolling
- **Google Fonts** — Inter family (400, 700, 900)

**No build pipeline** — all CDN dependencies.

---

## Project Structure

```
Team Inbox/KhunCamp/
├── index.html              # Single-page HTML (13 sections)
├── css/
│   └── style.css           # Design system + all layouts
├── js/
│   └── main.js             # Animation engine (15 functions)
├── images/                 # Hero, founder, social proof assets
├── docs/
│   ├── specs/
│   │   └── 2026-03-28-khuncamp-website-design.md
│   └── plans/
│       └── 2026-03-28-khuncamp-website.md
├── robots.txt
├── sitemap.xml
└── .gitignore
```

---

## Features

### 🎬 Animations (GSAP + Three.js)

| Animation | Trigger | Effect |
|-----------|---------|--------|
| **Preloader** | Page load | Counter 000→100 + clip-path wipe exit |
| **Golden Grid** | Hero render | 1500 particles, mouse-reactive rotation |
| **Spotlight** | Mouse over hero | Radial glow follows cursor |
| **Scroll Reveals** | Section enters viewport | Clip-path "assembly" with stagger |
| **Solution Diagram** | Solution section visible | SVG lines draw + nodes pop in |
| **Timeline Steps** | Steps enter viewport | Gold text glow with connector animation |
| **Magnetic CTAs** | Mouse near button | Button pulls toward cursor, snaps back |
| **Bento Hover** | Hover on cards | Golden border transition + bg highlight |
| **Breathing CTA** | Pulse animation | Final CTA glows infinitely |
| **Nav Scroll** | Scroll past hero | Nav gains frosted glass background |

### 🎯 Sections (13 total)

1. **Preloader** — Entry animation with system initialisation theme
2. **Nav** — Sticky header with logo + CTA
3. **Hero** — "Still stuck under 50K?" with Three.js particle system
4. **Problem** — 3 glassmorphism pain-point cards
5. **Reframe** — "System vs Effort" pivot
6. **Solution** — SVG infrastructure diagram (Creator → 6 satellite nodes)
7. **How It Works** — 3-phase vertical timeline
8. **Deliverables** — Bento grid (non-uniform layout, 6 items)
9. **Founder Proof** — KhunShawn credibility block with photo
10. **Social Proof** — 4-item bento with video + photos
11. **Authority** — "Soon to be featured on" label
12. **Final CTA** — Breathing "Get Your $500 Audit" button
13. **Footer** — Copyright + link

### ♿ Accessibility

- WCAG 2.2 AA contrast maintained throughout
- Semantic HTML5 (proper heading hierarchy)
- Alt text on all images and icons
- Custom cursor has `cursor:auto` fallback on mobile/touch
- `viewport` meta tag for responsive design

### 📊 SEO

- Title tag with primary keywords
- Meta description (160 chars)
- Open Graph + Twitter Card tags
- Schema.org structured data:
  - Service type (main offering)
  - FAQPage (3 FAQs for featured snippets)
- Canonical tag
- robots.txt + sitemap.xml
- Semantic heading hierarchy (H1 → H2 → H3)
- Alt text on all images

---

## Deployment

### Static Hosting (Recommended)

Deploy to any static host:

- **Vercel** — `vercel deploy` (zero config)
- **Netlify** — Drag-drop or `netlify deploy`
- **GitHub Pages** — Push to `gh-pages` branch
- **Cloudflare Pages** — Connect GitHub repo

### Before Deploying

1. Update `<meta property="og:url">` and `<link rel="canonical">` if domain changes
2. Replace `#audit` placeholder links with actual booking URL
3. Replace `#apply` placeholder with application form URL
4. Test on mobile: tap hero, scroll through animations, check responsive layout

---

## Performance Notes

- **Three.js particle system** (1500 particles) may impact Core Web Vitals on low-end devices
- **GSAP ScrollTrigger** uses `requestAnimationFrame` — ensure smooth scroll on target devices
- **Video autoplay** in Social Proof section — test on mobile (may require user interaction)
- **Lenis smooth scroll** is lightweight but verify on slow connections

### Optimisation Tips

- Lazy-load the social proof video: add `loading="lazy"` to `<video>` tag
- Consider reducing particle count in `initThreeBackground()` for mobile (check `isTouchDevice()`)
- Minify CSS/JS before production

---

## Customisation

### Colors

Edit CSS variables in `css/style.css` (`:root` block):

```css
--bg-deep: #0a0a0a;         /* Deep black background */
--bg-charcoal: #121212;      /* Charcoal sections */
--gold-primary: #D4AF37;     /* Primary accent */
--gold-glow: rgba(...);      /* Glow effect */
--text-main: #e0e0e0;        /* Main text */
--text-dim: #a0a0a0;         /* Secondary text */
```

### Typography

Inter font is loaded from Google Fonts. To change:

1. Update `fonts.googleapis.com` link in `<head>`
2. Change `--font-main` CSS variable
3. Update font-weight usage in headings

### Animations

All animations are in `js/main.js`. Each function is self-contained:

- `initPreloader()` — Counter + clip-path
- `initThreeBackground()` — Particle system
- `initSpotlight()` — Hero flashlight
- `initRevealAnimations()` — ScrollTrigger reveals
- Etc.

Modify duration, easing, or triggers without breaking other functions.

---

## Maintenance

### Monthly

- [ ] Check 404 errors (analytics)
- [ ] Verify all CTA links work
- [ ] Test on latest browser versions

### Quarterly

- [ ] Review Core Web Vitals (PageSpeed Insights)
- [ ] Audit links (broken link checker)
- [ ] Update schema.org data if offers change

### Annually

- [ ] Update copyright year in footer
- [ ] Refresh social proof assets
- [ ] Review SEO keywords + meta descriptions

---

## License

© 2026 Khun Camp. All Rights Reserved.

---

## Built By

**Shayne** — Full-stack development
**Simon Team** — Brand strategy & design system

---

## Quick Links

- **Design Spec:** `docs/specs/2026-03-28-khuncamp-website-design.md`
- **Implementation Plan:** `docs/plans/2026-03-28-khuncamp-website.md`
- **Live Site:** https://khuncamp.com
- **Booking System:** (To be connected)
