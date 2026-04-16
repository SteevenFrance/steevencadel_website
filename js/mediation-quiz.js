/* ============================================================
   QUIZ — Ai-je besoin d'un médiateur ?
   Évalue la qualité relationnelle (7 questions, 7 à 28 points)
   ============================================================ */

const questions = [
  {
    q: "Quand vous devez échanger avec cette personne sur le sujet qui vous oppose, comment cela se passe-t-il ?",
    answers: [
      { text: "On ne se parle plus, ou uniquement par écrit / par intermédiaire", score: 1 },
      { text: "Les échanges sont tendus, on se coupe la parole ou le ton monte", score: 2 },
      { text: "On discute, mais on tourne en rond sans rien résoudre", score: 3 },
      { text: "On arrive encore à se parler calmement sur d'autres sujets", score: 4 }
    ]
  },
  {
    q: "Y a-t-il des choses importantes que vous n'osez plus dire à cette personne ?",
    answers: [
      { text: "Oui, beaucoup. Je garde l'essentiel pour moi", score: 1 },
      { text: "Oui, plusieurs sujets sensibles restent sous le tapis", score: 2 },
      { text: "Un ou deux non-dits, sans plus", score: 3 },
      { text: "Non, je peux aborder les sujets qui me tiennent à cœur", score: 4 }
    ]
  },
  {
    q: "Quel est aujourd'hui votre niveau de confiance envers cette personne ?",
    answers: [
      { text: "Nul. Je me méfie de tout ce qu'elle dit ou fait", score: 1 },
      { text: "Très faible. J'ai besoin de me protéger", score: 2 },
      { text: "Altéré mais pas rompu. Il reste une base à reconstruire", score: 3 },
      { text: "Globalement intact, malgré la difficulté actuelle", score: 4 }
    ]
  },
  {
    q: "Comment vous sentez-vous après une interaction avec cette personne ?",
    answers: [
      { text: "Épuisé(e), en colère ou en boule — ça m'atteint durablement", score: 1 },
      { text: "Tendu(e), agacé(e), avec de la rumination", score: 2 },
      { text: "Mitigé(e), ça dépend fortement des jours", score: 3 },
      { text: "Plutôt neutre ou OK, même quand le sujet fâche", score: 4 }
    ]
  },
  {
    q: "Cette difficulté affecte-t-elle votre travail, votre équipe ou votre santé ?",
    answers: [
      { text: "Fortement : sommeil, motivation, performance — mon entourage s'en aperçoit", score: 1 },
      { text: "Nettement : je perds de l'énergie et de l'efficacité au quotidien", score: 2 },
      { text: "Un peu : c'est pesant mais je tiens le cap", score: 3 },
      { text: "Pas vraiment : c'est inconfortable mais compartimenté", score: 4 }
    ]
  },
  {
    q: "Depuis combien de temps cette situation dure-t-elle ?",
    answers: [
      { text: "Plus de 6 mois, et ça s'est progressivement aggravé", score: 1 },
      { text: "Entre 3 et 6 mois, sans amélioration", score: 2 },
      { text: "Quelques semaines, c'est récent mais ça s'installe", score: 3 },
      { text: "Très récent — je veux éviter que ça s'enkyste", score: 4 }
    ]
  },
  {
    q: "Avez-vous déjà tenté de résoudre la situation (dialogue direct, RH, manager…) ?",
    answers: [
      { text: "Oui, plusieurs fois, et rien n'a fonctionné", score: 1 },
      { text: "Oui, une fois, et ça a empiré ou n'a rien changé", score: 2 },
      { text: "J'ai essayé d'en parler mais sans vraiment aller au bout", score: 3 },
      { text: "Pas encore, je cherche la meilleure façon de m'y prendre", score: 4 }
    ]
  }
];

const profiles = [
  {
    min: 7, max: 14,
    badge: "🔴 Rupture installée",
    color: "#c0392b",
    title: "La médiation professionnelle est clairement indiquée",
    desc: "Le dialogue est très abîmé : confiance rompue, non-dits majeurs, impact sur votre santé ou votre équipe. Les tentatives internes n'ont pas suffi. Attendre davantage risque d'aggraver la situation (RPS, arrêts, départs, contentieux).",
    reco: "Un médiateur professionnel vous apportera un cadre neutre et confidentiel pour sortir de la spirale. Un premier échange de 30 minutes permet de poser la situation sans engagement."
  },
  {
    min: 15, max: 21,
    badge: "🟠 Relation fragilisée",
    color: "#e67e22",
    title: "Un tiers facilitateur est vivement recommandé",
    desc: "La relation s'est dégradée : non-dits, tensions récurrentes, perte d'énergie. Les échanges directs ne suffisent plus à remettre les choses à plat. C'est le moment d'agir — avant que la situation ne bascule en rupture ouverte.",
    reco: "Une médiation préventive ou un accompagnement de dialogue structuré peut restaurer l'écoute et désamorcer avant que ça ne s'enkyste. Parlons-en."
  },
  {
    min: 22, max: 28,
    badge: "🟢 Dialogue encore vivant",
    color: "#27ae60",
    title: "Le dialogue direct reste à votre portée",
    desc: "La relation est encore suffisamment vivante pour que vous puissiez essayer une démarche directe. Il y a des irritants, mais la confiance et la parole sont encore là.",
    reco: "Préparez un échange en posant clairement vos besoins et vos limites. Si la situation s'enlise malgré tout, un tiers peut vous aider à la sécuriser — n'hésitez pas à en discuter."
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

  const scoreNum = document.getElementById('score-num');
  const scoreCircle = document.getElementById('score-circle');
  const circumference = 2 * Math.PI * 54;
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

  const badge = document.getElementById('result-badge');
  badge.textContent = profile.badge;
  badge.style.background = profile.color;

  document.getElementById('result-title').textContent = profile.title;
  document.getElementById('result-desc').textContent = profile.desc;
  document.getElementById('result-reco').textContent = profile.reco;
}

if (retakeBtn) {
  retakeBtn.addEventListener('click', () => {
    current = 0;
    scores = [];
    resultsEl.style.display = 'none';
    heroEl.style.display = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
