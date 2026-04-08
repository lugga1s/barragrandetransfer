// ── Mobile Nav ──────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
  document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    document.body.classList.remove('nav-open');
  });
});

// ── Header shadow on scroll ──────────────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// ── FAQ Accordion ────────────────────────────────────────────
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ── Smooth scroll for anchor links ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ── Active nav highlight via IntersectionObserver ───────────
const sections = document.querySelectorAll('section[id]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// ── Fleet Carousel ───────────────────────────────────────────
const fleetTrack = document.getElementById('fleet-track');
if (fleetTrack) {
  const prevBtn = document.querySelector('.fleet-btn-prev');
  const nextBtn = document.querySelector('.fleet-btn-next');
  let idx = 0;

  function visibleCount() {
    return window.innerWidth >= 900 ? 5 : window.innerWidth >= 600 ? 3 : 1;
  }
  function maxIdx() { return Math.max(0, fleetTrack.children.length - visibleCount()); }
  function update() {
    const slide = fleetTrack.children[0];
    const gap = parseFloat(getComputedStyle(fleetTrack).gap) || 16;
    fleetTrack.style.transform = `translateX(-${idx * (slide.offsetWidth + gap)}px)`;
    prevBtn.disabled = idx === 0;
    nextBtn.disabled = idx >= maxIdx();
  }
  prevBtn.addEventListener('click', () => { if (idx > 0) { idx--; update(); } });
  nextBtn.addEventListener('click', () => { if (idx < maxIdx()) { idx++; update(); } });
  window.addEventListener('resize', () => { idx = Math.min(idx, maxIdx()); update(); });
  update();
}

// ── Floating WhatsApp: hide near top ────────────────────────
const floatBtn = document.getElementById('float-whatsapp');
window.addEventListener('scroll', () => {
  floatBtn.style.opacity = window.scrollY > 300 ? '1' : '0';
  floatBtn.style.pointerEvents = window.scrollY > 300 ? 'auto' : 'none';
});
