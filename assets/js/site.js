(() => {
  const cfg = window.BUSINESS || {};
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  function setText(selector, value) {
    $$(selector).forEach(el => { if (value) el.textContent = value; });
  }
  setText("[data-business-name]", cfg.name);
  setText("[data-business-tagline]", cfg.tagline);
  setText("[data-business-description]", cfg.description);
  setText("[data-business-category]", cfg.category);
  setText("[data-business-address]", cfg.address);
  setText("[data-business-hours]", cfg.hours);
  setText("[data-business-phone]", cfg.phoneDisplay);
  setText("[data-business-email]", cfg.email);

  $$("[data-business-logo]").forEach(img => {
    if (cfg.logo) { img.src = cfg.logo; img.alt = `${cfg.name || "Business"} logo`; }
  });
  $$("[data-business-hero]").forEach(img => {
    if (cfg.heroImage) { img.src = cfg.heroImage; img.alt = `${cfg.name || "Business"} featured image`; }
  });
  $$("[data-maps-link]").forEach(a => {
    if (cfg.mapsUrl) { a.href = cfg.mapsUrl; a.target = "_blank"; a.rel = "noopener noreferrer"; }
  });
  $$("[data-phone-link]").forEach(a => {
    if (cfg.phoneE164) { a.href = `tel:+${cfg.phoneE164}`; }
    else { a.hidden = true; }
  });
  $$("[data-whatsapp-link]").forEach(a => {
    if (cfg.whatsappE164) {
      a.href = `https://wa.me/${cfg.whatsappE164}`;
      a.target = "_blank"; a.rel = "noopener noreferrer";
    } else { a.hidden = true; }
  });
  $$("[data-email-link]").forEach(a => {
    if (cfg.email) a.href = `mailto:${cfg.email}`;
    else a.hidden = true;
  });

  const navToggle = $("[data-nav-toggle]");
  const nav = $("[data-nav]");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const open = navToggle.getAttribute("aria-expanded") !== "true";
      navToggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    });
    $$("a", nav).forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }));
  }

  const year = $("[data-year]");
  if (year) year.textContent = new Date().getFullYear();

  const servicesTarget = $("[data-services]");
  if (servicesTarget && Array.isArray(cfg.services)) {
    servicesTarget.innerHTML = cfg.services.map((s, i) => `
      <article class="service-card reveal">
        <div class="service-card__number">${String(i + 1).padStart(2, "0")}</div>
        <h3>${escapeHtml(s.title || "Service")}</h3>
        <p>${escapeHtml(s.description || "")}</p>
        <a class="text-link" href="contact.html">Ask about this <span aria-hidden="true">↗</span></a>
      </article>`).join("");
  }

  const galleryTarget = $("[data-gallery]");
  if (galleryTarget && Array.isArray(cfg.gallery)) {
    galleryTarget.innerHTML = cfg.gallery.map((g, i) => `
      <button class="gallery-tile" type="button" data-gallery-open="${i}" aria-label="View photo ${i + 1}">
        <img src="${escapeAttr(g.src)}" alt="${escapeAttr(g.alt || "Business photo")}" loading="lazy">
        <span aria-hidden="true">↗</span>
      </button>`).join("");
    galleryTarget.addEventListener("click", e => {
      const btn = e.target.closest("[data-gallery-open]");
      if (!btn) return;
      const item = cfg.gallery[Number(btn.dataset.galleryOpen)];
      const dialog = $("[data-lightbox]");
      if (!dialog || !item) return;
      const img = $("img", dialog);
      img.src = item.src; img.alt = item.alt || "Business photo";
      if (typeof dialog.showModal === "function") dialog.showModal();
    });
  }
  const closeLightbox = $("[data-lightbox-close]");
  if (closeLightbox) closeLightbox.addEventListener("click", () => $("[data-lightbox]").close());

  const form = $("[data-contact-form]");
  if (form) form.addEventListener("submit", e => {
    e.preventDefault();
    const status = $("[data-form-status]");
    const name = $("[name='name']", form).value.trim();
    const email = $("[name='email']", form).value.trim();
    const message = $("[name='message']", form).value.trim();
    if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = "Please enter your name, a valid email address, and your message.";
      status.className = "form-status form-status--error";
      return;
    }
    status.textContent = "Your details are valid, but message delivery is not configured yet. Please use the verified phone/email contact once added, or connect a secure form provider before publishing.";
    status.className = "form-status form-status--notice";
  });

  const revealEls = $$(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  } else revealEls.forEach(el => el.classList.add("is-visible"));

  function escapeHtml(v) {
    return String(v).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
  }
  function escapeAttr(v) { return escapeHtml(v); }
})();
