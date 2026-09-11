(function () {
  "use strict";

  var services = [
    { icon: "heart", title: "Wedding Events", text: "Grand weddings staged with timeless elegance." },
    { icon: "flower", title: "Mehndi Functions", text: "Vibrant, colourful setups full of celebration." },
    { icon: "crown", title: "Barat", text: "Royal entrances and majestic stage arrangements." },
    { icon: "utensils", title: "Walima", text: "Refined receptions with impeccable service." },
    { icon: "cake", title: "Birthday Parties", text: "Playful, elegant themes for every age." },
    { icon: "briefcase", title: "Corporate Events", text: "Conferences, galas and award nights." },
    { icon: "gem", title: "Engagement Ceremonies", text: "Intimate, beautifully styled celebrations." },
    { icon: "users", title: "Family Gatherings", text: "Warm spaces for reunions and dinners." },
    { icon: "palm", title: "Outdoor Events", text: "Open-air marquees under the stars." },
    { icon: "sparkles", title: "Luxury Stage Décor", text: "Signature floral and backdrop artistry." },
    { icon: "chef", title: "Catering Arrangements", text: "Multi-cuisine menus prepared to perfection." },
    { icon: "lightbulb", title: "Lighting & Sound", text: "Professional AV, uplighting and effects." },
  ];

  var servicesGrid = document.getElementById("servicesGrid");
  if (!servicesGrid) return;

  var html = "";
  services.forEach(function (item, i) {
    html +=
      '<div class="service-card reveal-zoom" style="--reveal-delay:' + ((i % 3) * 100) + 'ms">' +
      '<div class="top-edge"></div>' +
      '<span class="service-icon">' + iconSvg(ICONS[item.icon]) + "</span>" +
      "<h3>" + item.title + "</h3>" +
      "<p>" + item.text + "</p>" +
      "</div>";
  });
  servicesGrid.innerHTML = html;

  /* wire reveal for cards created after shared.js's initial DOM scan */
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
    document.querySelectorAll("#servicesGrid .reveal-zoom").forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll("#servicesGrid .reveal-zoom").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
