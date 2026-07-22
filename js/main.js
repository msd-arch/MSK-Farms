/* =====================================================================
   MSK Farms — main.js
   Feature-detected: each block runs only if its markup exists,
   so this single file powers every page.
   Features:
   1) Responsive nav   2) Image slider   3) FAQ accordion
   4) Form validation  5) Scroll-to-top  6) Dark mode
   7) Animated counters 8) Typing animation (+ portfolio filter, reveals)
   ===================================================================== */
(function () {
  "use strict";
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- 6. DARK MODE (with saved preference) ---------- */
  const root = document.documentElement;
  try {
    const saved = localStorage.getItem("msk-theme");
    if (saved) root.setAttribute("data-theme", saved);
    else if (window.matchMedia("(prefers-color-scheme: dark)").matches)
      root.setAttribute("data-theme", "dark");
  } catch (e) {}

  const themeBtn = $(".theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("msk-theme", next); } catch (e) {}
    });
  }

  /* ---------- 1. RESPONSIVE NAV ---------- */
  const burger = $(".hamburger");
  const links  = $(".nav-links");
  const scrim  = $(".scrim");
  if (burger && links) {
    const toggle = (open) => {
      burger.classList.toggle("open", open);
      links.classList.toggle("open", open);
      if (scrim) scrim.classList.toggle("show", open);
      burger.setAttribute("aria-expanded", open);
      document.body.style.overflow = open ? "hidden" : "";
    };
    burger.addEventListener("click", () => toggle(!links.classList.contains("open")));
    if (scrim) scrim.addEventListener("click", () => toggle(false));
    $$(".nav-links a").forEach((a) => a.addEventListener("click", () => toggle(false)));
    window.addEventListener("keydown", (e) => { if (e.key === "Escape") toggle(false); });
  }

  /* sticky header shadow */
  const header = $(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- 8. TYPING ANIMATION ---------- */
  const rotator = $(".rotator .word");
  if (rotator) {
    const words = JSON.parse(rotator.dataset.words || "[]");
    let wi = 0, ci = 0, deleting = false;
    const tick = () => {
      const word = words[wi];
      ci += deleting ? -1 : 1;
      rotator.textContent = word.slice(0, ci);
      let delay = deleting ? 55 : 110;
      if (!deleting && ci === word.length) { delay = 1400; deleting = true; }
      else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; delay = 350; }
      setTimeout(tick, delay);
    };
    tick();
  }

  /* ---------- 2. IMAGE SLIDER ---------- */
  const slider = $(".slider");
  if (slider) {
    const track = $(".slides", slider);
    const slides = $$(".slide", slider);
    const dotsWrap = $(".slider-dots", slider);
    let idx = 0, timer;

    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.setAttribute("aria-label", "Go to slide " + (i + 1));
      b.addEventListener("click", () => go(i, true));
      dotsWrap.appendChild(b);
    });
    const dots = $$("button", dotsWrap);

    const go = (n, stop) => {
      idx = (n + slides.length) % slides.length;
      track.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("active", i === idx));
      if (stop) restart();
    };
    const next = () => go(idx + 1);
    const start = () => (timer = setInterval(next, 5000));
    const restart = () => { clearInterval(timer); start(); };

    $(".slider-btn.next", slider).addEventListener("click", () => go(idx + 1, true));
    $(".slider-btn.prev", slider).addEventListener("click", () => go(idx - 1, true));
    slider.addEventListener("mouseenter", () => clearInterval(timer));
    slider.addEventListener("mouseleave", start);
    go(0); start();
  }

  /* ---------- 3. FAQ ACCORDION ---------- */
  $$(".faq-item").forEach((item) => {
    const q = $(".faq-q", item);
    const a = $(".faq-a", item);
    q.addEventListener("click", () => {
      const open = item.classList.contains("open");
      $$(".faq-item").forEach((o) => {
        o.classList.remove("open");
        $(".faq-a", o).style.maxHeight = null;
        $(".faq-q", o).setAttribute("aria-expanded", "false");
      });
      if (!open) {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
        q.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- 7. ANIMATED COUNTERS ---------- */
  const nums = $$("[data-count]");
  if (nums.length) {
    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      const dec = (el.dataset.count.split(".")[1] || "").length;
      const dur = 1600; let t0;
      const step = (t) => {
        if (!t0) t0 = t;
        const p = Math.min((t - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(dec).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString(undefined, { minimumFractionDigits: dec });
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.5 });
    nums.forEach((n) => io.observe(n));
  }

  /* ---------- SCROLL REVEAL ---------- */
  const reveals = $$(".reveal");
  if (reveals.length) {
    const ro = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); ro.unobserve(e.target); } });
    }, { threshold: 0.12 });
    reveals.forEach((r) => ro.observe(r));
  }

  /* ---------- PORTFOLIO FILTER ---------- */
  const filterBtns = $$(".filter-btn");
  if (filterBtns.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const f = btn.dataset.filter;
        $$(".beast").forEach((c) => {
          c.classList.toggle("hide", !(f === "all" || c.dataset.cat === f));
        });
      });
    });
  }

  /* ---------- 5. SCROLL TO TOP ---------- */
  const toTop = $(".to-top");
  if (toTop) {
    window.addEventListener("scroll", () => {
      toTop.classList.toggle("show", window.scrollY > 500);
    }, { passive: true });
    toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ---------- 4. FORM VALIDATION ---------- */
  const form = $("#booking-form");
  if (form) {
    const rules = {
      name:    (v) => v.trim().length >= 3 || "Please enter your full name (3+ letters).",
      phone:   (v) => /^(\+92|0)?3\d{9}$/.test(v.replace(/[\s-]/g, "")) || "Enter a valid Pakistani mobile, e.g. 03001234567.",
      email:   (v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "That email doesn't look right.",
      service: (v) => v !== "" || "Please choose what you need.",
      message: (v) => v.trim().length >= 10 || "Tell us a little more (10+ characters).",
    };
    const validate = (field) => {
      const input = $("[name=" + field + "]", form);
      if (!input) return true;
      const wrap = input.closest(".field");
      const msgEl = $(".msg", wrap);
      const res = rules[field](input.value);
      const ok = res === true;
      wrap.classList.toggle("error", !ok);
      wrap.classList.toggle("ok", ok && input.value.trim() !== "");
      if (msgEl) msgEl.textContent = ok ? "" : res;
      return ok;
    };

    Object.keys(rules).forEach((f) => {
      const input = $("[name=" + f + "]", form);
      if (input) input.addEventListener("blur", () => validate(f));
      if (input) input.addEventListener("input", () => {
        if (input.closest(".field").classList.contains("error")) validate(f);
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const valid = Object.keys(rules).map(validate).every(Boolean);
      const success = $(".form-success", form);
      if (valid) {
        form.reset();
        $$(".field", form).forEach((f) => f.classList.remove("ok", "error"));
        if (success) {
          success.classList.add("show");
          setTimeout(() => success.classList.remove("show"), 6000);
        }
      } else {
        const firstErr = $(".field.error input, .field.error select, .field.error textarea", form);
        if (firstErr) firstErr.focus();
      }
    });
  }

  /* footer year */
  const yr = $("#year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
