/* ============================================================
   QUIZ — Quel est votre niveau d'organisation ?
   ============================================================ */

const questions = [
  {
    q: "Comment gérez-vous vos tâches au quotidien ?",
    answers: [
      { text: "Je garde tout dans ma tête (et j'oublie souvent)", score: 1 },
      { text: "J'ai des Post-its et des notes un peu partout", score: 2 },
      { text: "J'utilise une appli, mais ma liste est interminable", score: 3 },
      { text: "J'ai un système clair que je consulte chaque jour", score: 4 }
    ]
  },
  {
    q: "Que se passe-t-il avec les tâches que vous ne faites pas ?",
    answers: [
      { text: "Elles s'accumulent et me stressent", score: 1 },
      { text: "Je les reporte indéfiniment, elles traînent des semaines", score: 2 },
      { text: "Je les supprime de temps en temps quand ça déborde", score: 3 },
      { text: "Je les évalue régulièrement et je décide consciemment de les garder ou non", score: 4 }
    ]
  },
  {
    q: "À quelle fréquence faites-vous le point sur vos priorités ?",
    answers: [
      { text: "Jamais, je réagis au jour le jour", score: 1 },
      { text: "Quand je me sens débordé(e), en mode urgence", score: 2 },
      { text: "De temps en temps, sans régularité", score: 3 },
      { text: "Chaque semaine ou chaque mois, c'est un rituel", score: 4 }
    ]
  },
  {
    q: "Combien d'outils utilisez-vous pour vous organiser ?",
    answers: [
      { text: "Aucun, je fais au feeling", score: 1 },
      { text: "Trop : entre le carnet, les applis et les Post-its, c'est le chaos", score: 2 },
      { text: "2-3 outils, mais ils ne sont pas bien connectés", score: 3 },
      { text: "Un système principal que je maîtrise bien", score: 4 }
    ]
  },
  {
    q: "Comment décrivez-vous votre charge mentale ?",
    answers: [
      { text: "J'ai constamment l'impression d'oublier quelque chose", score: 1 },
      { text: "Mon cerveau tourne en boucle sur mes tâches en retard", score: 2 },
      { text: "Ça va, mais certaines périodes sont vraiment pesantes", score: 3 },
      { text: "Je suis serein(e), tout est capturé dans mon système", score: 4 }
    ]
  },
  {
    q: "En début de mois, que faites-vous ?",
    answers: [
      { text: "Rien de spécial, un mois en chasse un autre", score: 1 },
      { text: "Je me dis « ce mois-ci je m'organise » (sans suite)", score: 2 },
      { text: "Je jette un œil à mes objectifs, mais sans processus précis", score: 3 },
      { text: "Je fais un vrai restart : bilan, tri et nouvelles priorités", score: 4 }
    ]
  },
  {
    q: "En fin de journée, quel est votre sentiment dominant ?",
    answers: [
      { text: "« J'ai couru toute la journée sans rien accomplir »", score: 1 },
      { text: "« J'ai fait plein de trucs, mais pas les plus importants »", score: 2 },
      { text: "« Pas mal, mais j'aurais pu mieux m'organiser »", score: 3 },
      { text: "« J'ai avancé sur l'essentiel, je suis satisfait(e) »", score: 4 }
    ]
  }
];

const profiles = [
  {
    min: 7, max: 11,
    badge: "Le Submergé",
    color: "#e74c3c",
    title: "Vous êtes en mode survie",
    desc: "Votre organisation repose sur votre mémoire et l'urgence du moment. Les tâches s'accumulent, la charge mentale est élevée, et vous avez l'impression de courir sans avancer. La bonne nouvelle ? C'est exactement le point de départ décrit dans Restart Mensuel. Une méthode simple peut tout changer."
  },
  {
    min: 12, max: 17,
    badge: "L'Organisé Fragile",
    color: "#f39c12",
    title: "Vous avez des bases, mais le système craque",
    desc: "Vous avez essayé des outils et des méthodes, mais rien ne tient dans la durée. Les bonnes habitudes s'effritent, les listes s'allongent, et vous retombez dans vos anciens réflexes. Il vous manque un cadre structurant — un rituel mensuel qui remet les compteurs à zéro."
  },
  {
    min: 18, max: 23,
    badge: "Le Méthodique",
    color: "#2d6fa3",
    title: "Vous êtes sur la bonne voie",
    desc: "Vous avez déjà de bonnes pratiques d'organisation. Mais il reste des zones de flou : des tâches qui traînent, des périodes où tout dérape. Le Restart Mensuel peut vous aider à passer du « plutôt bien organisé » au « vraiment serein » grâce à un système de revue intentionnelle."
  },
  {
    min: 24, max: 28,
    badge: "Le Maître du Restart",
    color: "#27ae60",
    title: "Vous avez le contrôle",
    desc: "Bravo ! Vous faites partie des rares personnes qui ont un vrai système d'organisation. Le livre Restart Mensuel pourrait vous inspirer de nouvelles idées pour aller encore plus loin, ou vous offrir un cadre à partager avec votre entourage professionnel."
  }
];

// ---- State ----
let current = 0;
let scores = [];

// ---- DOM ----
const startBtn     = document.getElementById('quiz-start');
const heroEl       = document.querySelector('.quiz-hero');
const sectionEl    = document.getElementById('quiz-section');
const resultsEl    = document.getElementById('quiz-results');
const cardEl       = document.getElementById('quiz-card');
const barEl        = document.getElementById('quiz-bar');
const currentLabel = document.getElementById('quiz-current');
const retakeBtn    = document.getElementById('quiz-retake');

if (startBtn) {
  startBtn.addEventListener('click', () => {
    heroEl.style.display = 'none';
    sectionEl.style.display = 'block';
    renderQuestion();
    window.scrollTo({ top: sectionEl.offsetTop - 80, behavior: 'smooth' });
  });
}

function renderQuestion() {
  const q = questions[current];
  currentLabel.textContent = current + 1;
  barEl.style.width = ((current / questions.length) * 100) + '%';

  cardEl.innerHTML = `
    <h2 class="quiz-card__question">${q.q}</h2>
    <div class="quiz-card__answers">
      ${q.answers.map((a, i) => `
        <button class="quiz-answer" data-score="${a.score}" data-index="${i}">
          <span class="quiz-answer__letter">${String.fromCharCode(65 + i)}</span>
          <span class="quiz-answer__text">${a.text}</span>
        </button>
      `).join('')}
    </div>
  `;

  cardEl.querySelectorAll('.quiz-answer').forEach(btn => {
    btn.addEventListener('click', () => selectAnswer(btn));
  });
}

function selectAnswer(btn) {
  // Visual feedback
  cardEl.querySelectorAll('.quiz-answer').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');

  scores[current] = parseInt(btn.dataset.score);

  setTimeout(() => {
    current++;
    if (current < questions.length) {
      renderQuestion();
    } else {
      showResults();
    }
  }, 400);
}

function showResults() {
  sectionEl.style.display = 'none';
  resultsEl.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const total = scores.reduce((a, b) => a + b, 0);
  const profile = profiles.find(p => total >= p.min && total <= p.max) || profiles[0];

  // Fill hidden inputs
  document.getElementById('input-profil').value = profile.badge;
  document.getElementById('input-score').value = total;

  // Animate score
  const scoreNum = document.getElementById('score-num');
  const scoreCircle = document.getElementById('score-circle');
  const circumference = 2 * Math.PI * 54; // 339.292
  const targetOffset = circumference - (total / 28) * circumference;

  let counter = 0;
  const counterInterval = setInterval(() => {
    counter++;
    scoreNum.textContent = counter;
    if (counter >= total) clearInterval(counterInterval);
  }, 50);

  setTimeout(() => {
    scoreCircle.style.transition = 'stroke-dashoffset 1.2s ease';
    scoreCircle.style.strokeDashoffset = targetOffset;
  }, 100);

  // Fill profile
  const badge = document.getElementById('result-badge');
  badge.textContent = profile.badge;
  badge.style.background = profile.color;

  document.getElementById('result-title').textContent = profile.title;
  document.getElementById('result-desc').textContent = profile.desc;
}

// ---- Email form ----
const emailForm = document.getElementById('quiz-email-form');
if (emailForm) {
  emailForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = emailForm.querySelector('button');
    btn.textContent = 'Envoi en cours…';
    btn.disabled = true;

    try {
      const data = new FormData(emailForm);
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString()
      });
      document.getElementById('email-gate').innerHTML = `
        <div class="quiz-email-success">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <p><strong>C'est envoyé !</strong> Vérifiez votre boîte mail pour recevoir vos conseils personnalisés.</p>
        </div>
      `;
    } catch (err) {
      btn.textContent = 'Erreur — réessayez';
      btn.disabled = false;
    }
  });
}

// ---- Retake ----
if (retakeBtn) {
  retakeBtn.addEventListener('click', () => {
    current = 0;
    scores = [];
    resultsEl.style.display = 'none';
    heroEl.style.display = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
