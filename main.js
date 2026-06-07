(function () {
  "use strict";

  var data = window.__VELTRIX__ || {};
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  var $ = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.from((scope || document).querySelectorAll(sel)); };
  var escHTML = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  function safe(fn, name) { try { fn(); } catch (e) { console.warn("[" + name + "]", e); } }

  /* ---- Nav scroll behaviour ---- */
  function initNav() {
    var nav = $(".nav");
    if (!nav) return;
    var onScroll = function () {
      nav.classList.toggle("scrolled", window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    /* mobile burger */
    var burger = $(".nav-burger");
    var mobile = $(".nav-mobile");
    if (burger && mobile) {
      burger.addEventListener("click", function () {
        var open = mobile.classList.toggle("open");
        burger.classList.toggle("open", open);
        document.body.style.overflow = open ? "hidden" : "";
      });
      $$(".nav-mobile a").forEach(function (a) {
        a.addEventListener("click", function () {
          mobile.classList.remove("open");
          burger.classList.remove("open");
          document.body.style.overflow = "";
        });
      });
    }

    /* active page highlight */
    var page = location.pathname.split("/").pop() || "index.html";
    $$(".nav-links a, .nav-mobile a").forEach(function (a) {
      if (a.getAttribute("href") === page) a.classList.add("active");
    });
  }

  /* ---- Reveal on scroll ---- */
  function initReveals() {
    var items = $$(".reveal");
    if (!items.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.04, rootMargin: "0px 0px -2% 0px" });
    items.forEach(function (el) { io.observe(el); });
    /* safety net */
    setTimeout(function () {
      $$(".reveal:not(.is-visible)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("is-visible");
        }
      });
    }, 6000);
  }

  /* ---- Count-up for stats ---- */
  function initCountUp() {
    var items = $$("[data-count]");
    if (!items.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        var el = e.target;
        var target = parseFloat(el.dataset.count);
        var isFloat = target !== Math.floor(target);
        var duration = 1600;
        var start = performance.now();
        function tick(now) {
          var p = Math.min((now - start) / duration, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          var val = target * eased;
          el.textContent = isFloat ? val.toFixed(2) : Math.round(val).toLocaleString();
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---- FAQ accordion ---- */
  function initFaq() {
    var items = $$(".faq-item");
    if (!items.length) return;
    /* open first by default */
    if (items[0]) {
      items[0].classList.add("open");
      var firstBody = items[0].querySelector(".faq-body");
      if (firstBody) firstBody.style.maxHeight = firstBody.scrollHeight + "px";
    }
    items.forEach(function (item) {
      var btn = item.querySelector(".faq-btn");
      var body = item.querySelector(".faq-body");
      if (!btn || !body) return;
      btn.addEventListener("click", function () {
        var wasOpen = item.classList.contains("open");
        items.forEach(function (i) {
          i.classList.remove("open");
          var b = i.querySelector(".faq-body");
          if (b) b.style.maxHeight = "0";
        });
        if (!wasOpen) {
          item.classList.add("open");
          body.style.maxHeight = body.scrollHeight + "px";
        }
      });
    });
  }

  /* ---- CTA form ---- */
  function initCtaForm() {
    var form = $(".cta-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector("button[type='submit']");
      var success = $(".form-success");
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
      setTimeout(function () {
        form.style.display = "none";
        if (success) success.classList.add("show");
      }, 900);
    });
  }

  /* ---- Contact form ---- */
  function initContactForm() {
    var form = $("#contact-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector("button[type='submit']");
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
      setTimeout(function () {
        form.innerHTML = '<div style="text-align:center;padding:3rem 1rem"><div style="font-size:2.5rem;margin-bottom:1rem">✓</div><p style="font-weight:700;font-size:1.1rem">Message sent!</p><p style="color:var(--ink-mute);margin-top:.5rem;font-size:.9rem">Our team will get back to you within one business day.</p></div>';
      }, 900);
    });
  }

  /* ---- Smooth scroll for anchor links ---- */
  function initSmoothScroll() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + scrollY - 80,
        behavior: reduced ? "auto" : "smooth"
      });
    });
  }

  /* ---- GSAP scroll animations ---- */
  function initGsap() {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    /* hero image parallax */
    var heroImg = $(".hero-img-wrap img");
    if (heroImg) {
      gsap.to(heroImg, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
      });
    }

    /* service cards stagger */
    var serviceCards = $$(".service-card");
    if (serviceCards.length) {
      gsap.from(serviceCards, {
        y: 40, opacity: 0, stagger: 0.1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".services-grid", start: "top 80%" }
      });
    }

    /* stat items */
    var statItems = $$(".stat-item");
    if (statItems.length) {
      gsap.from(statItems, {
        y: 20, opacity: 0, stagger: 0.08, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ".stats-band", start: "top 85%" }
      });
    }
  }

  /* ---- Mount services (home page) ---- */
  function mountServices() {
    var grid = $("[data-services]");
    if (!grid || grid.children.length > 0 || !data.services) return;
    grid.innerHTML = data.services.map(function (s) {
      return '<article class="service-card reveal">' +
        '<img src="' + escHTML(s.photo) + '" alt="' + escHTML(s.title) + '" class="service-card-img" loading="lazy" decoding="async">' +
        '<div class="service-card-body">' +
        '<div class="service-card-icon">' + escHTML(s.icon) + '</div>' +
        '<h3 class="service-card-title">' + escHTML(s.title) + '</h3>' +
        '<p class="service-card-blurb">' + escHTML(s.blurb) + '</p>' +
        '</div></article>';
    }).join("");
  }

  /* ---- Mount stats ---- */
  function mountStats() {
    var band = $("[data-stats]");
    if (!band || band.children.length > 0 || !data.stats) return;
    band.innerHTML = data.stats.map(function (s) {
      return '<div class="stat-item">' +
        '<div class="stat-value"><span data-count="' + s.value + '">' + s.value + '</span>' + escHTML(s.suffix) + '</div>' +
        '<div class="stat-label">' + escHTML(s.label) + '</div>' +
        '</div>';
    }).join("");
  }

  /* ---- Mount testimonials ---- */
  function mountTestimonials() {
    var wrap = $("[data-testimonials]");
    if (!wrap || wrap.children.length > 0 || !data.testimonials) return;
    wrap.innerHTML = data.testimonials.map(function (t) {
      return '<div class="testimonial-card reveal">' +
        '<p class="testimonial-quote">&ldquo;' + escHTML(t.quote) + '&rdquo;</p>' +
        '<div class="testimonial-author">' +
        '<div class="testimonial-avatar">' + escHTML(t.avatar) + '</div>' +
        '<div><div class="testimonial-name">' + escHTML(t.name) + '</div>' +
        '<div class="testimonial-title">' + escHTML(t.title) + '</div></div>' +
        '</div></div>';
    }).join("");
  }

  /* ---- Mount pricing ---- */
  function mountPricing() {
    var grid = $("[data-pricing]");
    if (!grid || grid.children.length > 0 || !data.pricing) return;
    grid.innerHTML = data.pricing.map(function (p) {
      var priceHTML = p.price
        ? '$' + p.price.toLocaleString() + '<span>' + escHTML(p.period) + '</span>'
        : 'Custom<span>' + escHTML(p.period) + '</span>';
      var tagHTML = p.tag ? '<div class="pricing-tag">' + escHTML(p.tag) + '</div>' : '';
      var featuresHTML = p.features.map(function (f) { return '<li>' + escHTML(f) + '</li>'; }).join("");
      var ctaLabel = p.price ? 'Get started' : 'Talk to sales';
      return '<div class="pricing-card reveal' + (p.tag ? ' featured' : '') + '">' +
        tagHTML +
        '<div class="pricing-tier">' + escHTML(p.tier) + '</div>' +
        '<div class="pricing-price">' + priceHTML + '</div>' +
        '<ul class="pricing-features">' + featuresHTML + '</ul>' +
        '<a href="contact.html" class="pricing-cta">' + ctaLabel + '</a>' +
        '</div>';
    }).join("");
  }

  /* ---- Mount FAQ ---- */
  function mountFaq() {
    var list = $("[data-faq]");
    if (!list || list.children.length > 0 || !data.faqs) return;
    list.innerHTML = data.faqs.map(function (f) {
      return '<div class="faq-item">' +
        '<button class="faq-btn">' + escHTML(f.q) +
        '<span class="faq-arrow">▾</span>' +
        '</button>' +
        '<div class="faq-body"><p>' + escHTML(f.a) + '</p></div>' +
        '</div>';
    }).join("");
  }

  /* ---- Mount blog posts ---- */
  function mountBlog() {
    var grid = $("[data-blog]");
    if (!grid || grid.children.length > 0 || !data.blogPosts) return;
    grid.innerHTML = data.blogPosts.map(function (b) {
      return '<article class="blog-card reveal">' +
        '<img src="' + escHTML(b.photo) + '" alt="' + escHTML(b.title) + '" class="blog-card-img" loading="lazy" decoding="async">' +
        '<div class="blog-card-body">' +
        '<div class="blog-card-meta">' +
        '<span class="blog-cat">' + escHTML(b.category) + '</span>' +
        '<span class="blog-date">' + escHTML(b.date) + ' · ' + escHTML(b.readTime) + '</span>' +
        '</div>' +
        '<h3 class="blog-card-title">' + escHTML(b.title) + '</h3>' +
        '<p class="blog-card-excerpt">' + escHTML(b.excerpt) + '</p>' +
        '<span class="read-more">Read article →</span>' +
        '</div></article>';
    }).join("");
  }

  /* ---- Mount case studies ---- */
  function mountCases() {
    var grid = $("[data-cases]");
    if (!grid || grid.children.length > 0 || !data.caseStudies) return;
    grid.innerHTML = data.caseStudies.map(function (c) {
      return '<article class="case-card reveal">' +
        '<img src="' + escHTML(c.photo) + '" alt="' + escHTML(c.client) + '" class="case-card-img" loading="lazy" decoding="async">' +
        '<div class="case-card-body">' +
        '<p class="kicker">' + escHTML(c.industry) + '</p>' +
        '<h3 class="case-card-title">' + escHTML(c.client) + '</h3>' +
        '<span class="case-card-result">' + escHTML(c.result) + '</span>' +
        '</div></article>';
    }).join("");
  }

  /* ---- Mount jobs ---- */
  function mountJobs() {
    var list = $("[data-jobs]");
    if (!list || list.children.length > 0 || !data.jobs) return;
    list.innerHTML = data.jobs.map(function (j) {
      return '<div class="job-row reveal">' +
        '<div class="job-title">' + escHTML(j.title) + '</div>' +
        '<div class="job-meta">' +
        '<span class="job-tag">' + escHTML(j.dept) + '</span>' +
        '<span class="job-loc">📍 ' + escHTML(j.location) + '</span>' +
        '</div>' +
        '<a href="contact.html" class="job-apply">Apply now →</a>' +
        '</div>';
    }).join("");
  }

  /* ---- Boot ---- */
  function boot() {
    safe(mountServices, "mountServices");
    safe(mountStats, "mountStats");
    safe(mountTestimonials, "mountTestimonials");
    safe(mountPricing, "mountPricing");
    safe(mountFaq, "mountFaq");
    safe(mountBlog, "mountBlog");
    safe(mountCases, "mountCases");
    safe(mountJobs, "mountJobs");

    safe(initNav, "initNav");
    safe(initSmoothScroll, "initSmoothScroll");
    safe(initReveals, "initReveals");
    safe(initCountUp, "initCountUp");
    safe(initFaq, "initFaq");
    safe(initCtaForm, "initCtaForm");
    safe(initContactForm, "initContactForm");

    if (window.gsap && window.ScrollTrigger) {
      safe(initGsap, "initGsap");
    }

    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
