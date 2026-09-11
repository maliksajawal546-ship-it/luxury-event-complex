(function () {
  "use strict";

  var contactCards = [
    { icon: "phone", label: "Phone", value: "0300-9285702", href: "tel:+923009285702" },
    { icon: "user", label: "Owner", value: "M Farhan Ali" },
    { icon: "mapPin", label: "Address", value: "Multan Public School Road, Near DHA Office, Multan", href: "https://www.google.com/maps/search/?api=1&query=Multan+Public+School+Road+Near+DHA+Office+Multan" },
    { icon: "clock", label: "Working Hours", value: "Open daily · 10:00 AM – 12:00 AM" },
    { icon: "instagram", label: "Instagram", value: "@a.dot.luxury.event.complex", href: "https://www.instagram.com/a.dot.luxury.event.complex?igsh=MWJydzV4YTBwYzZkdg==" },
    { icon: "facebook", label: "Facebook", value: "A. Luxury Events Complex", href: "https://www.facebook.com/share/1BX9GoHtxs/" },
  ];

  var contactCardsEl = document.getElementById("contactCards");
  if (contactCardsEl) {
    contactCards.forEach(function (c, i) {
      var inner =
        '<span class="icon">' + iconSvg(ICONS[c.icon]) + "</span>" +
        '<span style="min-width:0;">' +
        '<span class="label">' + c.label + "</span>" +
        '<span class="value">' + c.value + "</span>" +
        "</span>";
      var wrap;
      if (c.href) {
        wrap = document.createElement("a");
        wrap.href = c.href;
        if (c.href.indexOf("http") === 0) {
          wrap.target = "_blank";
          wrap.rel = "noopener noreferrer";
        }
      } else {
        wrap = document.createElement("div");
      }
      wrap.className = "contact-card hover-lift reveal";
      wrap.style.setProperty("--reveal-delay", i * 70 + "ms");
      wrap.innerHTML = inner;
      contactCardsEl.appendChild(wrap);
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
      document.querySelectorAll("#contactCards .reveal").forEach(function (el) {
        revealObserver.observe(el);
      });
    } else {
      document.querySelectorAll("#contactCards .reveal").forEach(function (el) {
        el.classList.add("is-visible");
      });
    }
  }

  /* =========================================================
     Contact form validation
     ========================================================= */
  var form = document.getElementById("contactForm");
  if (!form) return;

  var submitBtn = document.getElementById("submitBtn");
  var submitLabel = document.getElementById("submitLabel");

  function showToast(message, type) {
    var toast = document.createElement("div");
    toast.textContent = message;
    toast.style.cssText =
      "position:fixed;left:50%;bottom:2rem;transform:translateX(-50%);z-index:100;" +
      "background:" + (type === "error" ? "#d93a3a" : "#2f5f4f") + ";color:#fff;" +
      "padding:0.85rem 1.5rem;border-radius:0.75rem;font-size:0.875rem;" +
      "box-shadow:0 18px 45px -18px rgba(0,0,0,0.4);max-width:90vw;text-align:center;" +
      "font-family:'Poppins',sans-serif;opacity:0;transition:opacity 0.4s;";
    document.body.appendChild(toast);
    requestAnimationFrame(function () { toast.style.opacity = "1"; });
    setTimeout(function () {
      toast.style.opacity = "0";
      setTimeout(function () { toast.remove(); }, 400);
    }, 3800);
  }

  function setFieldError(name, message) {
    var field = form.querySelector('[data-field="' + name + '"]');
    if (!field) return;
    var errorEl = field.querySelector(".form-error");
    if (message) {
      field.classList.add("error");
      errorEl.textContent = message;
      errorEl.hidden = false;
    } else {
      field.classList.remove("error");
      errorEl.textContent = "";
      errorEl.hidden = true;
    }
  }

  function validate(data) {
    var errors = {};
    if (!data.name || data.name.trim().length < 2) errors.name = "Please enter your full name";
    if (!data.phone || data.phone.trim().length < 7 || !/^[0-9+\-\s()]+$/.test(data.phone.trim())) {
      errors.phone = "Please enter a valid phone number";
    }
    if (data.email && data.email.trim() !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errors.email = "Please enter a valid email";
    }
    if (!data.eventType) errors.eventType = "Please select an event type";
    if (!data.eventDate) errors.eventDate = "Please choose a date";
    if (!data.guests || !/^\d{1,5}$/.test(data.guests.trim())) errors.guests = "Guests must be a number";
    if (data.message && data.message.length > 1000) errors.message = "Message is too long";
    return errors;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var formData = new FormData(form);
    var data = {};
    formData.forEach(function (value, key) { data[key] = value; });

    var errors = validate(data);
    ["name", "phone", "email", "eventType", "eventDate", "guests", "message"].forEach(function (key) {
      setFieldError(key, errors[key] || "");
    });

    if (Object.keys(errors).length > 0) {
      showToast("Please check the highlighted fields.", "error");
      return;
    }

    submitBtn.disabled = true;
    submitLabel.textContent = "Sending…";
    setTimeout(function () {
      submitBtn.disabled = false;
      submitLabel.textContent = "Book Your Event Today";
      form.reset();
      showToast("Thank you! Our team will contact you shortly to confirm your date.", "success");
    }, 700);
  });
})();
