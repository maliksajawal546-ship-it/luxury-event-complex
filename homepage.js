(function () {
  "use strict";

  var reasons = [
    { icon: "building", title: "Luxurious Venue", text: "Grand halls and marquees with premium finishes." },
    { icon: "flower", title: "Elegant Decorations", text: "Designer florals, drapes and stage settings." },
    { icon: "userCheck", title: "Professional Staff", text: "Trained hospitality team at your service." },
    { icon: "car", title: "Large Parking Area", text: "Ample secure parking for all your guests." },
    { icon: "mapPin", title: "Prime Location", text: "Near DHA Office on Multan Public School Road." },
    { icon: "dollar", title: "Affordable Luxury", text: "Five-star experience at honest pricing." },
    { icon: "calendarHeart", title: "Custom Event Planning", text: "Packages tailored to your vision." },
    { icon: "headphones", title: "Excellent Service", text: "Attentive support before, during and after." },
    { icon: "camera", title: "Photography Spots", text: "Picture-perfect corners throughout the complex." },
  ];

  var stats = [
    { end: 135, decimals: 0, suffix: "+", label: "Happy Clients" },
    { end: 4.6, decimals: 1, suffix: "★", label: "Google Rating" },
    { end: 100, decimals: 0, suffix: "+", label: "Successful Events" },
    { end: 100, decimals: 0, suffix: "%", label: "Customer Satisfaction" },
  ];

  var testimonials = [
    { quote: "Amazing decoration and outstanding management. Our wedding felt truly royal.", name: "Ayesha & Hamza", event: "Wedding" },
    { quote: "Highly recommended for wedding events. The team handled everything flawlessly.", name: "Usman Tariq", event: "Barat & Walima" },
    { quote: "Beautiful venue with excellent service. Our guests could not stop praising it.", name: "Sana Iqbal", event: "Reception" },
    { quote: "Professional staff, spotless halls and stunning lighting. Worth every rupee.", name: "Bilal Ahmed", event: "Corporate Gala" },
  ];

  /* =========================================================
     Why Choose Us cards
     ========================================================= */
  var reasonsGrid = document.getElementById("reasonsGrid");
  if (reasonsGrid) {
    var html = "";
    reasons.forEach(function (item, i) {
      html +=
        '<div class="reason-card reveal" style="--reveal-delay:' + ((i % 3) * 100) + 'ms">' +
        '<div class="puff"></div>' +
        '<span class="reason-icon">' + iconSvg(ICONS[item.icon]) + "</span>" +
        "<h3>" + item.title + "</h3>" +
        "<p>" + item.text + "</p>" +
        "</div>";
    });
    reasonsGrid.innerHTML = html;

    if ("IntersectionObserver" in window) {
      var reasonsObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              reasonsObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
      );
      document.querySelectorAll("#reasonsGrid .reveal").forEach(function (el) {
        reasonsObserver.observe(el);
      });
    } else {
      document.querySelectorAll("#reasonsGrid .reveal").forEach(function (el) {
        el.classList.add("is-visible");
      });
    }
  }

  /* =========================================================
     Stats
     ========================================================= */
  var statsGrid = document.getElementById("statsGrid");
  if (statsGrid) {
    stats.forEach(function (s) {
      var div = document.createElement("div");
      div.className = "stat-item";
      div.innerHTML =
        '<p class="value" data-end="' + s.end + '" data-decimals="' + s.decimals + '" data-suffix="' + s.suffix + '">0</p>' +
        '<p class="label">' + s.label + "</p>";
      statsGrid.appendChild(div);
    });

    function animateCount(el) {
      var end = parseFloat(el.getAttribute("data-end"));
      var decimals = parseInt(el.getAttribute("data-decimals"), 10);
      var suffix = el.getAttribute("data-suffix");
      var duration = 1800;
      var start = performance.now();
      function tick(now) {
        var p = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var value = end * eased;
        el.textContent = value.toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    if ("IntersectionObserver" in window) {
      var statObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              statObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      document.querySelectorAll(".stat-item .value").forEach(function (el) {
        statObserver.observe(el);
      });
    } else {
      document.querySelectorAll(".stat-item .value").forEach(animateCount);
    }
  }

  /* =========================================================
     Testimonials
     ========================================================= */
  var track = document.getElementById("testimonialTrack");
  var dotsWrap = document.getElementById("testimonialDots");
  if (track && dotsWrap) {
    var testimonialIndex = 0;
    var testimonialTimer = null;
    var testimonialPaused = false;

    var STAR_PATH = '<path d="M12 2l2.9 6.6L22 9.3l-5 4.8 1.3 7-6.3-3.6L5.7 21l1.3-7-5-4.8 7.1-0.7L12 2z"/>';
    function starRow() {
      var s = "";
      for (var i = 0; i < 5; i++) {
        s += '<svg class="icon-sm" viewBox="0 0 24 24" fill="var(--primary)" stroke="var(--primary)" stroke-width="1">' + STAR_PATH + "</svg>";
      }
      return '<div class="stars" aria-label="5 out of 5 stars">' + s + "</div>";
    }

    testimonials.forEach(function (t, i) {
      var el = document.createElement("blockquote");
      el.className = "testimonial" + (i === 0 ? " active" : "");
      el.setAttribute("aria-hidden", i === 0 ? "false" : "true");
      el.innerHTML =
        starRow() +
        '<p class="quote">\u201C' + t.quote + '\u201D</p>' +
        "<footer>" +
        '<p class="name">' + t.name + "</p>" +
        '<p class="event">' + t.event + "</p>" +
        "</footer>";
      track.appendChild(el);

      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "testimonial-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Go to review " + (i + 1));
      dot.addEventListener("click", function () { goToTestimonial(i); });
      dotsWrap.appendChild(dot);
    });

    var testimonialEls = track.querySelectorAll(".testimonial");
    var dotEls = dotsWrap.querySelectorAll(".testimonial-dot");

    function goToTestimonial(i) {
      testimonialEls[testimonialIndex].classList.remove("active");
      testimonialEls[testimonialIndex].setAttribute("aria-hidden", "true");
      dotEls[testimonialIndex].classList.remove("active");
      testimonialIndex = (i + testimonials.length) % testimonials.length;
      testimonialEls[testimonialIndex].classList.add("active");
      testimonialEls[testimonialIndex].setAttribute("aria-hidden", "false");
      dotEls[testimonialIndex].classList.add("active");
    }

    function startTestimonialAuto() {
      testimonialTimer = setInterval(function () {
        if (!testimonialPaused) goToTestimonial(testimonialIndex + 1);
      }, 6000);
    }
    startTestimonialAuto();

    var prevBtn = document.getElementById("testimonialPrev");
    var nextBtn = document.getElementById("testimonialNext");
    if (prevBtn) prevBtn.addEventListener("click", function () { goToTestimonial(testimonialIndex - 1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { goToTestimonial(testimonialIndex + 1); });

    var testimonialCard = document.getElementById("testimonialCard");
    if (testimonialCard) {
      testimonialCard.addEventListener("mouseenter", function () { testimonialPaused = true; });
      testimonialCard.addEventListener("mouseleave", function () { testimonialPaused = false; });
    }
  }

  /* =========================================================
     Header active-link tracking (home page sections)
     ========================================================= */
  var navLinkEls = document.querySelectorAll("#navLinks a");
  var sectionIds = ["home", "reviews"];
  var sections = sectionIds.map(function (id) { return document.getElementById(id); }).filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinkEls.forEach(function (a) {
              var isActive = a.getAttribute("href") === "#" + entry.target.id;
              a.classList.toggle("active", isActive);
              if (isActive) a.setAttribute("aria-current", "page");
              else a.removeAttribute("aria-current");
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* =========================================================
     Hero parallax
     ========================================================= */
  var heroImg = document.getElementById("heroImg");
  if (heroImg) {
    var rafId = 0;
    function onScrollHero() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(function () {
        var offset = window.scrollY * 0.28;
        heroImg.style.transform = "translate3d(0, " + offset + "px, 0) scale(1.02)";
      });
    }
    window.addEventListener("scroll", onScrollHero, { passive: true });
  }
})();
