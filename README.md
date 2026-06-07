================================================================================
  CUSTOM BUSINESS WEBSITE 1
================================================================================

OVERVIEW
--------
This is a fully custom, multi-page business website built with HTML, CSS, and
vanilla JavaScript. No frameworks, no build tools, no npm — just open the folder
and it works. Every page is responsive and tested on desktop, tablet, and mobile.


WHAT'S INCLUDED
---------------
10 complete HTML pages:

  index.html          Home page — hero section, statistics counter, services
                      grid, client testimonials, case study previews, blog
                      previews, FAQ accordion, and email capture form.

  services.html       Full services page — 6 service cards with images, plus
                      three in-depth feature sections with photos and detail text.

  pricing.html        Pricing page — 3 tiers displayed as glass cards, with a
                      "Most Popular" badge on the recommended plan. Includes a
                      full FAQ section below the pricing table.

  case-studies.html   Case studies page — 3 client result cards plus two
                      detailed case study sections with outcome statistics.

  blog.html           Blog/insights page — featured article hero plus additional
                      article cards. Includes a newsletter signup form.

  about.html          About page — company story, 4 core values with icons,
                      and a full-width team photo section.

  careers.html        Careers page — company culture section with photo, plus
                      a full list of open job roles with department tags and
                      location info.

  contact.html        Contact page — full contact form (name, email, company,
                      topic selector, message textarea) plus contact info panel
                      with email, phone, and location.

  privacy.html        Privacy Policy — full legal text covering data collection,
                      usage, sharing, retention, security, user rights, and
                      cookie policy.

  terms.html          Terms of Service — full legal text covering usage,
                      accounts, payments, IP, confidentiality, SLA, liability,
                      and termination.


DESIGN & FEATURES
-----------------
- Visual style: soft pastel glassmorphism — translucent cards, animated mesh
  gradient background, smooth reveal animations on scroll.

- Fonts: Plus Jakarta Sans (headings/body) + Cormorant (italic quotes) +
  JetBrains Mono (labels/tags). Loaded from Google Fonts.

- Animations: GSAP + ScrollTrigger for parallax and staggered card reveals.
  Count-up numbers for statistics. All animations are safe on Windows
  (do not break with prefers-reduced-motion settings).

- FAQ accordion: click to open/close answers. First item open by default.

- Contact & newsletter forms: include a success state (no backend needed —
  ready to connect to any form service such as Formspree, Netlify Forms,
  EmailJS, etc.).

- Navigation: transparent on top, solidifies on scroll. Mobile: full-screen
  hamburger menu with smooth open/close.

- SEO: every page has a unique <title>, meta description, and meta keywords.
  All images have descriptive alt text. Semantic HTML5 structure throughout.

- Accessibility: skip-to-content link, focus-visible styles, aria-labels on
  interactive elements, proper heading hierarchy on every page.

- Performance: images are lazy-loaded (except the hero). JavaScript libraries
  are loaded with `defer`. Cache-busting query strings on all assets.

- Deployment: .htaccess file included for correct cache headers on Apache /
  Hostinger. Works on any static host (Netlify, Vercel, GitHub Pages, cPanel).


FILE STRUCTURE
--------------
  veltrix1/
  ├── index.html
  ├── about.html
  ├── services.html
  ├── pricing.html
  ├── case-studies.html
  ├── blog.html
  ├── careers.html
  ├── contact.html
  ├── privacy.html
  ├── terms.html
  ├── styles.css          (all styles — single file, organized by section)
  ├── main.js             (all interactions — IIFE, no build step needed)
  ├── .htaccess           (cache & MIME type config for Apache hosts)
  ├── assets/
  │   └── img/            (10 stock photos — all licensed for commercial use)
  └── lib/
      ├── gsap.min.js
      ├── ScrollTrigger.min.js
      ├── lenis.min.js
      └── manifest.js     (brand data — edit this to update content globally)


HOW TO CUSTOMIZE
----------------
1. BRAND NAME & CONTENT
   Open lib/manifest.js — this file holds the brand name, tagline, services,
   testimonials, pricing, blog posts, job listings, and contact info.
   Edit the values there and most of the page content updates automatically.

2. CONTACT DETAILS
   In lib/manifest.js, fill in:
     email:   "your-email@yourdomain.com"
     phone:   "your phone number"
     address: "your address"
   Also update the same fields in contact.html (lines with "Your ... Here").

3. COLORS
   Open styles.css — the first section (Tokens) has all color variables:
     --accent    controls the main purple color throughout the site
     --accent-2  controls the orange accent
     --accent-3  controls the green accent (used for success states)
   Change these three values to match the client's brand colors.

4. LOGO
   The logo is currently text-based ("Veltrix" with a colored last letter).
   To use an image logo, replace the .nav-logo anchor in each HTML file with:
     <a href="index.html" class="nav-logo">
       <img src="assets/img/logo.svg" alt="Your Brand" style="height:32px">
     </a>

5. PHOTOS
   Replace the files in assets/img/ with the client's own photos.
   Keep the same filenames to avoid updating the HTML, or do a find-and-replace
   for the old filenames across all .html files.

6. FORMS
   The contact and newsletter forms currently show a success message on submit
   without sending data. To make them functional, connect to a form service:
   - Formspree: add action="https://formspree.io/f/YOUR_ID" to the <form> tag
   - Netlify Forms: add netlify attribute to the <form> tag
   - EmailJS: replace the setTimeout in main.js initCtaForm/initContactForm

7. ADDING / REMOVING PAGES
   Copy any existing .html file as a starting point. The nav links are in each
   file's <nav> block — update them across all pages if you add a new page.


HOW TO DEPLOY
-------------
Option A — Hostinger / cPanel (drag and drop):
  1. Log in to Hostinger hPanel.
  2. Go to Files > File Manager > public_html.
  3. Upload all files and folders from this package.
  4. The .htaccess file handles cache and MIME types automatically.

Option B — Netlify (free, 1 click):
  1. Go to netlify.com > Add new site > Deploy manually.
  2. Drag the entire veltrix1 folder into the deploy area.
  3. Done — live URL provided instantly.

Option C — GitHub Pages:
  1. Push this folder to a GitHub repository.
  2. Go to Settings > Pages > Source: main branch / root.
  3. GitHub provides a free .github.io URL.

Option D — Local preview:
  Open a terminal in this folder and run:
    python -m http.server 8080
  Then open http://localhost:8080 in your browser.
  (Do not open index.html directly with file:// — some features need HTTP.)


LIBRARIES USED
--------------
  GSAP 3          gsap.com           — scroll animations and transitions
  ScrollTrigger   gsap.com/plugins   — trigger animations on scroll position
  Lenis           lenis.dev          — smooth scroll (included, not active by default)
  Google Fonts    fonts.google.com   — Plus Jakarta Sans, Cormorant, JetBrains Mono

All libraries are included locally in the lib/ folder — the site works without
an internet connection (except for Google Fonts, which require a connection to
load unless you self-host them).


STOCK PHOTOS
------------
All images in assets/img/ are sourced from Openverse (openverse.org) under
Creative Commons licenses that permit commercial use. Replace them with the
client's own photos before launching to avoid any attribution requirements.


BROWSER SUPPORT
---------------
Tested and working on:
  Chrome 120+, Firefox 120+, Safari 17+, Edge 120+
  iOS Safari 16+, Chrome Android 120+

The glassmorphism effect (backdrop-filter) has a solid fallback for older
browsers that don't support it — cards show as semi-transparent white instead
of blurred glass.

================================================================================
  Delivered clean — no personal data, credentials, or private information.
  All placeholder fields marked "Your ... Here" for easy find-and-replace.
================================================================================
