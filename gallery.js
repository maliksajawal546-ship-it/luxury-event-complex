(function () {
  "use strict";

  var galleryImages = [
    { src: "assets/images/gallery-stage.jpg", alt: "Royal wedding stage decoration with white and gold florals", category: "Wedding", tall: true },
    { src: "assets/images/gallery-reception.jpg", alt: "Luxury reception dining setup with candlelight and gold cutlery", category: "Reception" },
    { src: "assets/images/gallery-corporate.jpg", alt: "Corporate gala hall with stage and elegant seating", category: "Corporate" },
    { src: "assets/images/gallery-birthday.jpg", alt: "Elegant birthday decoration with gold balloons and cake table", category: "Birthday", tall: true },
    { src: "assets/images/gallery-decor.jpg", alt: "White rose floral centerpiece on a banquet table", category: "Decoration", tall: true },
    { src: "assets/images/gallery-venue.jpg", alt: "Grand banquet hall interior with crystal chandeliers", category: "Venue" },
    { src: "assets/images/gallery-outdoor.jpg", alt: "Outdoor garden marquee at dusk with warm string lights", category: "Venue" },
    { src: "assets/images/gallery-mehndi.jpg", alt: "Mehndi function decoration with marigold flowers and lanterns", category: "Decoration", tall: true },
    { src: "assets/images/hero-marquee.jpg", alt: "Illuminated wedding marquee with chandeliers and floral aisle", category: "Wedding" },
  ];

  var galleryGrid = document.getElementById("galleryGrid");
  if (!galleryGrid) return;

  galleryImages.forEach(function (img, i) {
    var div = document.createElement("div");
    div.className = "gallery-item show reveal-zoom" + (img.tall ? " tall" : "");
    div.setAttribute("data-category", img.category);
    div.style.setProperty("--reveal-delay", (i % 3) * 80 + "ms");
    div.innerHTML =
      '<button type="button" class="gallery-btn" data-index="' + i + '" aria-label="Open image: ' + img.alt + '">' +
      '<img src="' + img.src + '" alt="' + img.alt + '" loading="lazy" />' +
      '<span class="gallery-caption">' +
      '<span class="cat">' + img.category + "</span>" +
      '<span class="expand-icon">' + iconSvg(ICONS.expand) + "</span>" +
      "</span>" +
      "</button>";
    galleryGrid.appendChild(div);
  });

  /* wire reveal for gallery items created after shared.js's initial scan */
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
    document.querySelectorAll("#galleryGrid .reveal-zoom").forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll("#galleryGrid .reveal-zoom").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* gallery filtering */
  var filterButtons = document.querySelectorAll(".filter-btn");
  var currentFilter = "All";
  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterButtons.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      currentFilter = btn.getAttribute("data-filter");
      applyFilter();
    });
  });
  function applyFilter() {
    document.querySelectorAll(".gallery-item").forEach(function (item) {
      var show = currentFilter === "All" || item.getAttribute("data-category") === currentFilter;
      item.classList.toggle("show", show);
    });
  }

  /* gallery lightbox */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxCaption = document.getElementById("lightboxCaption");
  var lightboxIndex = null;

  function visibleImages() {
    return galleryImages.filter(function (img) {
      return currentFilter === "All" || img.category === currentFilter;
    });
  }

  function openLightbox(idx) {
    lightboxIndex = idx;
    updateLightbox();
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.classList.remove("open");
    lightboxIndex = null;
    document.body.style.overflow = "";
  }
  function stepLightbox(dir) {
    var imgs = visibleImages();
    if (lightboxIndex === null) return;
    lightboxIndex = (lightboxIndex + dir + imgs.length) % imgs.length;
    updateLightbox();
  }
  function updateLightbox() {
    var imgs = visibleImages();
    var img = imgs[lightboxIndex];
    if (!img) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = img.alt;
  }

  galleryGrid.addEventListener("click", function (e) {
    var btn = e.target.closest(".gallery-btn");
    if (!btn) return;
    var imgs = visibleImages();
    var globalIdx = parseInt(btn.getAttribute("data-index"), 10);
    var img = galleryImages[globalIdx];
    var idxInVisible = imgs.indexOf(img);
    openLightbox(idxInVisible);
  });
  document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
  document.getElementById("lightboxPrev").addEventListener("click", function () { stepLightbox(-1); });
  document.getElementById("lightboxNext").addEventListener("click", function () { stepLightbox(1); });
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (lightboxIndex === null) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") stepLightbox(1);
    if (e.key === "ArrowLeft") stepLightbox(-1);
  });
})();
