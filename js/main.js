/* ============================================================
   STEEVEN CADEL — main.js
   ============================================================ */

// ---- Nav scroll effect ----
const nav = document.getElementById('nav');
const onScroll = () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---- Mobile burger ----
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ---- Fade-in on scroll ----
const fadeEls = document.querySelectorAll(
  '.svc-card, .methode, .client-card, .timeline-item, .parcours__list li, .section-head, .approche__left, .approche__right, .contact__left, .contact__form, .book-banner__inner'
);
fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
fadeEls.forEach(el => observer.observe(el));

// ---- Pré-remplissage du sujet du formulaire contact via ?sujet=... ----
const sujetSelect = document.getElementById('sujet');
if (sujetSelect) {
  const params = new URLSearchParams(window.location.search);
  const sujetParam = params.get('sujet');
  if (sujetParam) {
    const match = [...sujetSelect.options].find(o => o.value === sujetParam);
    if (match) sujetSelect.value = sujetParam;
  }
}

// ---- Contact form — Netlify Forms ----
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const success = document.getElementById('form-success');
    btn.textContent = 'Envoi en cours…';
    btn.disabled = true;

    try {
      const data = new FormData(form);
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString()
      });
      btn.style.display = 'none';
      success.style.display = 'block';
      form.reset();
    } catch (err) {
      btn.textContent = 'Erreur — réessayez';
      btn.disabled = false;
      btn.style.background = '#c0392b';
    }
  });
}
