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
  '.svc-card, .methode, .client-card, .timeline-item, .parcours__list li, .section-head, .approche__left, .approche__right, .contact__left, .contact__form'
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

// ---- Contact form — Web3Forms ----
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Envoi en cours…';
    btn.disabled = true;

    const data = new FormData(form);
    const object = Object.fromEntries(data);
    const json = JSON.stringify(object);

    try {
      console.log('[Web3Forms] Envoi en cours…', object);
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: json
      });
      const result = await res.json();
      console.log('[Web3Forms] Réponse :', result);

      if (result.success) {
        btn.textContent = 'Message envoyé ✓';
        btn.style.background = '#2D6FA3';
        btn.style.borderColor = '#2D6FA3';
        btn.style.color = '#fff';
        form.reset();
      } else {
        btn.textContent = 'Erreur — réessayez';
        btn.disabled = false;
        btn.style.background = '#c0392b';
        console.error('[Web3Forms] Échec :', result.message);
      }
    } catch (err) {
      btn.textContent = 'Erreur réseau — réessayez';
      btn.disabled = false;
      btn.style.background = '#c0392b';
      console.error('[Web3Forms] Erreur réseau :', err);
    }
  });
}
