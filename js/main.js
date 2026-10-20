/* ============================================================
   STEEVEN CADEL — main.js
   ============================================================ */

// ---- Nav scroll effect ----
// Les pages à fond clair (nav--solid) gardent la barre opaque, sinon le menu blanc est invisible.
// La classe peut être ajoutée en cours de route (quiz) : on la relit à chaque appel.
const nav = document.getElementById('nav');
const onScroll = () => {
  nav.classList.toggle('scrolled', nav.classList.contains('nav--solid') || window.scrollY > 60);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---- Mobile burger ----
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');
const setMenu = (open) => {
  navLinks.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
};
burger.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => setMenu(false));
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) {
    setMenu(false);
    burger.focus();
  }
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
    btn.textContent = 'Envoi en cours…';
    btn.disabled = true;

    try {
      const data = new FormData(form);
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString()
      });
      // fetch ne lève pas d'erreur sur un 4xx/5xx : sans ce test, un échec redirigerait vers « Merci »
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      if (window.plausible) plausible('Formulaire Contact');
      window.location.href = '/merci.html';
    } catch (err) {
      btn.textContent = 'Erreur — réessayez';
      btn.disabled = false;
      btn.style.background = '#c0392b';
    }
  });
}

// ---- Tracking Plausible : clics vers Calendly ----
document.querySelectorAll('a[href*="calendly.com"]').forEach(a => {
  a.addEventListener('click', () => {
    if (window.plausible) plausible('Clic Calendly', { props: { page: window.location.pathname } });
  });
});
