/* AFA Motion Plus — independent enhancements; no existing handlers or classes are replaced. */
(() => {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  document.body.classList.add("afa-motion-ready");

  // Reveal additional visual bands that the original reveal list does not target.
  const extra = document.querySelectorAll(".trust-strip,.experience-band,.reviews-overview,.media-section,.contact-section");
  if (!motion.matches && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("afa-motion-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });
    extra.forEach(el => { el.classList.add("afa-motion-reveal"); revealObserver.observe(el); });
  } else {
    extra.forEach(el => el.classList.add("afa-motion-visible"));
  }

  // A soft pointer-following light in the hero; touch devices retain a static glow.
  const hero = document.querySelector(".hero,.inner-hero");
  if (hero && window.matchMedia("(hover:hover) and (pointer:fine)").matches && !motion.matches) {
    let frame = 0;
    hero.addEventListener("pointermove", event => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        hero.style.setProperty("--afa-spot-x", ((event.clientX - rect.left) / rect.width * 100).toFixed(1) + "%");
        hero.style.setProperty("--afa-spot-y", ((event.clientY - rect.top) / rect.height * 100).toFixed(1) + "%");
      });
    }, { passive: true });
  }

  // Brief tactile feedback on touch; does not interfere with existing touch-active classes.
  if (!motion.matches) {
    document.querySelectorAll(".button").forEach(button => {
      button.addEventListener("pointerdown", event => {
        if (event.pointerType !== "touch") return;
        button.classList.add("afa-tap-feedback");
        window.setTimeout(() => button.classList.remove("afa-tap-feedback"), 140);
      }, { passive: true });
    });
  }

  // If the visitor changes the OS motion preference while the page is open, reveal content safely.
  motion.addEventListener?.("change", event => {
    if (!event.matches) return;
    document.querySelectorAll(".afa-motion-reveal").forEach(el => el.classList.add("afa-motion-visible"));
  });
})();
