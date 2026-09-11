(function () {
  "use strict";

  /* =========================================================
     Header: scroll state, mobile drawer
     ========================================================= */
  var header = document.getElementById("siteHeader");
  if (header) {
    function onScrollHeader() {
      header.classList.toggle("scrolled", window.scrollY > 40);
    }
    onScrollHeader();
    window.addEventListener("scroll", onScrollHeader, { passive: true });
  }

  var menuToggle = document.getElementById("menuToggle");
  var mobileDrawerWrap = document.getElementById("mobileDrawerWrap");
  var mobileOverlay = document.getElementById("mobileOverlay");
  var mobileClose = document.getElementById("mobileClose");

  if (menuToggle && mobileDrawerWrap && mobileOverlay && mobileClose) {
    function openMenu() {
      mobileDrawerWrap.classList.add("open");
      menuToggle.classList.add("open");
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Close menu");
    }
    function closeMenu() {
      mobileDrawerWrap.classList.remove("open");
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
    }
    menuToggle.addEventListener("click", function () {
      if (mobileDrawerWrap.classList.contains("open")) closeMenu();
      else openMenu();
    });
    mobileOverlay.addEventListener("click", closeMenu);
    mobileClose.addEventListener("click", closeMenu);
    document.querySelectorAll(".mobile-link").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }

  /* =========================================================
     Floating actions: scroll-to-top visibility
     ========================================================= */
  var scrollTopBtn = document.getElementById("scrollTopBtn");
  if (scrollTopBtn) {
    function onScrollFab() {
      scrollTopBtn.classList.toggle("show", window.scrollY > 400);
    }
    onScrollFab();
    window.addEventListener("scroll", onScrollFab, { passive: true });
    scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* =========================================================
     Scroll reveal for all .reveal / .reveal-zoom / .reveal-left / .reveal-right
     ========================================================= */
  document.querySelectorAll(".reveal, .reveal-zoom, .reveal-left, .reveal-right").forEach(function (el) {
    var variant = el.getAttribute("data-variant");
    if (variant === "left") { el.classList.remove("reveal"); el.classList.add("reveal-left"); }
    if (variant === "right") { el.classList.remove("reveal"); el.classList.add("reveal-right"); }
    if (variant === "zoom") { el.classList.remove("reveal"); el.classList.add("reveal-zoom"); }
  });

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-zoom, .reveal-left, .reveal-right").forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal, .reveal-zoom, .reveal-left, .reveal-right").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* =========================================================
     Footer year
     ========================================================= */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
