"use strict";
gsap.to(".app__pattern", {
  backgroundPosition: "-4000px 4000px",
  duration: 100,
  ease: "none",
  repeat: -1,
});

gsap.to(".app__branding-live", {
  opacity: 0.5,
  duration: 0.5,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
});

// AUDIO
const music = new Audio("Assets/jingle.wav");
music.loop = true;
music.volume = 0;

const clickSound = new Audio("Assets/click.wav");
clickSound.volume = 0.5;

let musicEnabled = true;
let musicStarted = false;

function playClick() {
  clickSound.currentTime = 0;
  clickSound.play();
}

function fadeInMusic(targetVolume = 0.15, duration = 2000) {
  const step = targetVolume / (duration / 50);
  const fade = setInterval(() => {
    if (music.volume < targetVolume && musicEnabled) {
      music.volume = Math.min(music.volume + step, targetVolume);
    } else {
      clearInterval(fade);
    }
  }, 50);
}

document.addEventListener(
  "click",
  () => {
    if (!musicStarted && musicEnabled) {
      music
        .play()
        .then(() => {
          fadeInMusic();
          musicStarted = true;
        })
        .catch(() => {});
    }
  },
  { once: true }
);

// SON ON/OFF
const soundOnIcon = document.querySelector(".app__sound-icon--on");
const soundOffIcon = document.querySelector(".app__sound-icon--off");

soundOnIcon.style.display = "block";
soundOffIcon.style.display = "none";

soundOnIcon.addEventListener("click", () => {
  playClick();
  musicEnabled = false;
  music.pause();
  soundOnIcon.style.display = "none";
  soundOffIcon.style.display = "block";
});

soundOffIcon.addEventListener("click", () => {
  playClick();
  musicEnabled = true;
  if (musicStarted) music.play();
  soundOffIcon.style.display = "none";
  soundOnIcon.style.display = "block";
});

// POPUP CRÉDITS
const app = document.querySelector(".app");
const infoIcon = document.querySelector(".app__sound-icon--info");
const creditsPopup = document.querySelector(".popup--credits");
const closeCredits = document.querySelector(".popup__close");

infoIcon.addEventListener("click", () => {
  playClick();
  app.classList.add("app--blurred");
  creditsPopup.classList.remove("popup--hidden");
});

gsap.fromTo(
  ".popup--credits .popup__content--credit",
  { scale: 0.9, opacity: 0 },
  { scale: 1, opacity: 1, duration: 0.3, ease: "power1.out" }
);

closeCredits.addEventListener("click", () => {
  playClick();
  closePopupAnimated(creditsPopup, ".popup--credits .popup__content--credit");
});

// ANIMATION FERMETURE POPUPS
function closePopupAnimated(popup, contentSelector) {
  gsap.to(contentSelector, {
    scale: 0.8,
    opacity: 0,
    duration: 0.5,
    ease: "power1.inOut",
    onComplete: () => {
      popup.classList.add("popup--hidden");
      app.classList.remove("app--blurred");
      gsap.set(contentSelector, { scale: 1, opacity: 1 });
    },
  });
}

// SWITCH THÈMES
function switchToTeam2Theme() {
  app.style.backgroundColor = "#ED6E83";
  document.querySelector(".app__pattern").style.backgroundImage =
    'url("Assets/Pattern_r.svg")';
}
function resetToTeam1Theme() {
  app.style.backgroundColor = "#233A66";
  document.querySelector(".app__pattern").style.backgroundImage =
    'url("Assets/Patternplayer.svg")';
}

// CARTES
const playersCard = document.querySelector(".players__card--players");
const teamsCard = document.querySelector(".players__card--teams");
const m1t1Card = document.querySelector(".players__card--m1");
const m2t1Card = document.querySelector(".players__card--m2");
const m3t1Card = document.querySelector(".players__card--m3");
const m4t1Card = document.querySelector(".players__card--m4");
const m5Card = document.querySelector(".players__card--m5");
const m5winCard = document.querySelector(".players__card--m5win");
const finalCard = document.querySelector(".players__card--final");

animateCardIn(playersCard);

function animateCardIn(card) {
  gsap.fromTo(
    card,
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.9, ease: "power2.out" }
  );
}

// ARTICLES
const articles = {
  // 🔹 FAKE NEWS
  1111: {
    texte:
      "Un homme affirme avoir dressé un pigeon à livrer des pizzas chaudes.",
    vrai: false,
  },
  2222: {
    texte:
      "Une start-up invente une application pour traduire les miaulements en paroles humaines.",
    vrai: false,
  },
  3333: {
    texte: "Un supermarché teste des caddies autonomes capables de chanter.",
    vrai: false,
  },
  4444: {
    texte:
      "Des chercheurs créent une plante qui pousse directement des frites.",
    vrai: false,
  },
  5555: {
    texte:
      "Les Aliens et les Reptiliens utilisent des chauffe-plats pour les rituels.",
    vrai: false,
  },
  6666: {
    texte:
      "Un influenceur aurait vécu 30 jours uniquement en buvant du café froid.",
    vrai: false,
  },
  7777: {
    texte:
      "Les dauphins commenceraient à parler anglais selon une vidéo virale.",
    vrai: false,
  },
  8888: {
    texte:
      "La NASA annonce avoir trouvé une planète faite entièrement de chocolat.",
    vrai: false,
  },
  9999: {
    texte:
      "Une école interdit les baskets car elles feraient baisser les notes.",
    vrai: false,
  },
  1112: {
    texte: "Une étude prouve que regarder des séries rend plus intelligent.",
    vrai: false,
  },
  1234: {
    texte: "Des chercheurs réussissent à envoyer un texto par télépathie.",
    vrai: false,
  },
  2223: {
    texte:
      "Un homme se marie avec son grille-pain lors d'une cérémonie en ligne.",
    vrai: false,
  },
  3334: {
    texte: "Un zoo utilise des hologrammes pour remplacer les animaux réels.",
    vrai: false,
  },
  4445: {
    texte:
      "Une entreprise développe des chaussettes connectées pour mesurer le stress.",
    vrai: false,
  },
  5556: {
    texte:
      "Des scientifiques entraînent des fourmis à reconnaître les faux billets.",
    vrai: false,
  },
  6667: {
    texte:
      "Un coiffeur invente la première coupe de cheveux qui repousse à la forme d'origine.",
    vrai: false,
  },
  7778: {
    texte:
      "La Tour Eiffel serait en réalité un immense chargeur sans fil expérimental.",
    vrai: false,
  },
  8889: {
    texte:
      "Une ville italienne remplace les feux rouges par des emojis géants.",
    vrai: false,
  },
  9990: {
    texte:
      "Un robot humoriste fait un spectacle complet sans aucune blague écrite par un humain.",
    vrai: false,
  },

  // NEWS
  1113: {
    texte:
      "Un village norvégien construit des miroirs géants pour réfléchir la lumière du soleil pendant l'hiver.",
    vrai: true,
  },
  2224: {
    texte:
      "Une IA aide à diagnostiquer le cancer de la peau plus rapidement que les médecins.",
    vrai: true,
  },
  3335: {
    texte:
      "Un Français a recréé le son de la voix d'une momie grâce à une imprimante 3D.",
    vrai: true,
  },
  4446: {
    texte:
      "Des chercheurs ont découvert des microplastiques dans la neige de l'Everest.",
    vrai: true,
  },
  5557: {
    texte:
      "Une femme retrouve son chat disparu depuis 10 ans grâce à une puce électronique.",
    vrai: true,
  },
  6668: {
    texte:
      "Des singes au Japon ont appris à utiliser des pièces pour acheter de la nourriture.",
    vrai: true,
  },
  7779: {
    texte:
      "Une startup fabrique du cuir à partir de champignons pour remplacer la peau animale.",
    vrai: true,
  },
  8880: {
    texte:
      "Des chercheurs ont réussi à imprimer un cœur humain en 3D à partir de cellules vivantes.",
    vrai: true,
  },
  9991: {
    texte:
      "Un avion solaire a bouclé un tour du monde sans utiliser une goutte de carburant.",
    vrai: true,
  },
  1114: {
    texte:
      "La NASA cultive des légumes frais à bord de la Station Spatiale Internationale.",
    vrai: true,
  },
  2225: {
    texte:
      "Un drone a livré un cœur pour une greffe réussie dans un hôpital américain.",
    vrai: true,
  },
  3336: {
    texte:
      "Des chercheurs ont transformé des déchets plastiques en carburant propre.",
    vrai: true,
  },
  4447: {
    texte:
      "Une intelligence artificielle compose une symphonie dans le style de Beethoven.",
    vrai: true,
  },
  5558: {
    texte:
      "Un hôtel au Canada est construit entièrement en glace et fond chaque printemps.",
    vrai: true,
  },
  6669: {
    texte:
      "Des scientifiques ont observé un trou noir avaler une étoile en direct.",
    vrai: true,
  },
  7770: {
    texte:
      "Des abeilles ont été entraînées à détecter le Covid-19 dans des échantillons.",
    vrai: true,
  },
  8881: {
    texte:
      "Une ville chinoise teste des feux de circulation visibles pour les piétons distraits par leur téléphone.",
    vrai: true,
  },
  9992: {
    texte:
      "Des chercheurs ont créé du verre incassable inspiré des coquillages.",
    vrai: true,
  },
};

// CHOIX JOUEURS
let selectedPlayers = null;

document.querySelectorAll(".players__choice").forEach((btn) => {
  btn.addEventListener("click", () => {
    playClick();
    document
      .querySelectorAll(".players__choice")
      .forEach((b) => b.classList.remove("players__choice--active"));
    btn.classList.add("players__choice--active");
    selectedPlayers = parseInt(btn.dataset.value);
  });
});

document
  .querySelector(".players__submit--players")
  .addEventListener("click", () => {
    playClick();
    if (!selectedPlayers) return;
    gsap.to(playersCard, {
      opacity: 0,
      y: 100,
      duration: 0.5,
      onComplete: () => {
        playersCard.hidden = true;
        teamsCard.hidden = false;
        animateCardIn(teamsCard);
      },
    });
  });

// VARIABLES JEU
let team1Name = "",
  team2Name = "",
  scoreTeam1 = 0,
  scoreTeam2 = 0,
  currentTeam = 1;
let currentManche = 0;

//ÉQUIPES
document
  .querySelector(".players__submit--teams")
  .addEventListener("click", () => {
    playClick();

    const t1 = document.getElementById("team1"),
      t2 = document.getElementById("team2");

    if (!t1.value.trim() || !t2.value.trim()) {
      [t1, t2].forEach((input) => {
        if (!input.value.trim()) {
          gsap.fromTo(
            input,
            { x: -5 },
            { x: 5, duration: 0.1, repeat: 3, yoyo: true }
          );
        }
      });
      return;
    }
    team1Name = t1.value.trim();
    team2Name = t2.value.trim();

    document.getElementById("score-team1").textContent = team1Name;
    document.getElementById("score-team2").textContent = team2Name;

    gsap.to(teamsCard, {
      opacity: 0,
      y: 100,
      duration: 0.5,
      onComplete: () => {
        teamsCard.hidden = true;
        m1Card.hidden = false;
        animateCardIn(m1Card);
        startTeamTurn(1);
      },
    });
  });

// M1
const m1Card = document.querySelector(".players__card--m1");
const codeInput = m1Card.querySelector(".code-input");
const codePhase = m1Card.querySelector(".code-phase");
const articlePhase = m1Card.querySelector(".article-phase");
const articleText = m1Card.querySelector(".article-text");
const teamTitle = document.getElementById("m1-teams-name");
const validateBtn = m1Card.querySelector(".validate-code");
const choices = m1Card.querySelectorAll(".manche-choices .players__choice");

function startTeamTurn(teamNumber) {
  currentTeam = teamNumber;
  const teamName = teamNumber === 1 ? team1Name : team2Name;

  teamTitle.textContent = teamName;
  codeInput.value = "";
  articleText.textContent = "";
  codePhase.hidden = false;
  articlePhase.hidden = true;
}
-validateBtn.addEventListener("click", () => {
  playClick();

  const code = Number(codeInput.value.trim());
  if (!articles[code]) {
    gsap.fromTo(
      codeInput,
      { x: -5 },
      { x: 5, duration: 0.1, repeat: 3, yoyo: true }
    );
    return;
  }

  articleText.textContent = articles[code].texte;

  gsap.to(codePhase, {
    opacity: 0,
    duration: 0.4,
    onComplete: () => {
      codePhase.hidden = true;
      articlePhase.hidden = false;
      animateCardIn(articlePhase);
    },
  });
});

choices.forEach((btn) => {
  btn.addEventListener("click", () => {
    playClick();

    const code = Number(codeInput.value.trim());
    if (!articles[code]) return;

    const correct = articles[code].vrai;
    const choice = btn.classList.contains("choice-real");

    if (choice === correct) {
      if (currentTeam === 1) scoreTeam1++;
      else scoreTeam2++;
    }

    if (currentTeam === 1) {
      gsap.to(m1Card, {
        opacity: 0,
        y: 100,
        duration: 0.5,
        onComplete: () => {
          m1Card.style.opacity = 1;
          m1Card.style.transform = "translateY(0)";
          startTeamTurn(2);
          animateCardIn(m1Card);
          switchToTeam2Theme?.();

          gsap.set(codePhase, { opacity: 1, y: 0 });
          gsap.set(articlePhase, { opacity: 1, y: 0 });
        },
      });
    } else {
      document.getElementById("score-val1").textContent = scoreTeam1;
      document.getElementById("score-val2").textContent = scoreTeam2;

      gsap.to(m1Card, {
        opacity: 0,
        y: 100,
        duration: 0.5,
        onComplete: () => {
          resetToTeam1Theme();
          m1Card.hidden = true;
          showScoreCard(1);
        },
      });
    }
  });
});

// SCORE>NEXT M
document.addEventListener("DOMContentLoaded", () => {
  const nextMancheBtn = scoreCard?.querySelector(".next-manche");

  if (nextMancheBtn) {
    nextMancheBtn.addEventListener("click", () => {
      playClick();

      gsap.to(scoreCard, {
        opacity: 0,
        y: 100,
        duration: 0.5,
        onComplete: () => {
          scoreCard.hidden = true;
          currentManche++;

          switch (currentManche) {
            case 2:
              m2Card.hidden = false;
              animateCardIn(m2Card);
              startM2Turn(1);
              break;

            case 3:
              m3t1Card.hidden = false;
              animateCardIn(m3Card);
              startM3Turn(1);
              break;

            case 4:
              m4t1Card.hidden = false;
              animateCardIn(m4Card);
              startM4Turn(1);
              break;

            case 5:
              m5Card.hidden = false;
              animateCardIn(m5Card);
              break;

            default:
              alert("🎉 Fin du jeu !");
              break;
          }
        },
      });
    });
  }
});

// ARTICLES
function animateSwipe(oldSlide, newSlide, direction = "left") {
  const offset = direction === "left" ? "-100%" : "100%";
  const enterFrom = direction === "left" ? "100%" : "-100%";

  const tl = gsap.timeline();

  tl.to(oldSlide, {
    x: offset,
    opacity: 0,
    duration: 0.4,
    ease: "power2.inOut",
    onComplete: () => oldSlide.classList.remove("active"),
  });
  tl.fromTo(
    newSlide,
    { x: enterFrom, opacity: 0 },
    {
      x: "0%",
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
      onStart: () => newSlide.classList.add("active"),
    }
  );
}
function initSwipe(card) {
  const slides = card.querySelectorAll(".article-slide");
  const dots = card.querySelectorAll(".dot");
  let startX = 0;
  let current = 0;

  function showSlide(index, direction = "left") {
    if (index === current || index < 0 || index >= slides.length) return;

    const oldSlide = slides[current];
    const newSlide = slides[index];

    animateSwipe(oldSlide, newSlide, direction);

    dots.forEach((d, i) => d.classList.toggle("active", i === index));
    current = index;
  }

  card.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX));

  card.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].clientX - startX;

    if (Math.abs(diff) > 50) {
      if (diff < 0 && current < slides.length - 1) {
        showSlide(current + 1, "left");
      } else if (diff > 0 && current > 0) {
        showSlide(current - 1, "right");
      }
    }
  });
}

// M2
let currentTeamM2 = 1;
const m2Card = document.querySelector(".players__card--m2");
const m2ValidateBtn = m2Card.querySelector(".validate-code");
const m2Code1 = m2Card.querySelector(".code1");
const m2Code2 = m2Card.querySelector(".code2");
const m2CodePhase = m2Card.querySelector(".code-phase");
const m2ArticlePhase = m2Card.querySelector(".article-phase");
const m2Article1 = m2Card.querySelector(".article1");
const m2Article2 = m2Card.querySelector(".article2");
const m2ValidateFake = m2Card.querySelector(".validate-fake");
const teamTitleM2 = document.getElementById("m2-teams-name");

initSwipe(m2Card);

function startM2Turn(teamNumber) {
  currentTeamM2 = teamNumber;
  const teamName = teamNumber === 1 ? team1Name : team2Name;

  teamTitleM2.textContent = teamName;
  m2Code1.value = "";
  m2Code2.value = "";
  m2Article1.textContent = "";
  m2Article2.textContent = "";

  m2CodePhase.hidden = false;
  m2ArticlePhase.hidden = true;

  gsap.set(m2CodePhase, { opacity: 1, y: 0 });
  gsap.set(m2ArticlePhase, { opacity: 1, y: 0 });
}

m2ValidateBtn.addEventListener("click", () => {
  playClick();

  const code1 = Number(m2Code1.value.trim());
  const code2 = Number(m2Code2.value.trim());

  if (!articles[code1] || !articles[code2]) {
    [m2Code1, m2Code2].forEach((input) => {
      if (!articles[Number(input.value.trim())]) {
        gsap.fromTo(
          input,
          { x: -5 },
          { x: 5, duration: 0.1, repeat: 3, yoyo: true }
        );
      }
    });
    return;
  }

  m2Article1.textContent = articles[code1].texte;
  m2Article2.textContent = articles[code2].texte;
  m2Card.dataset.fake1 = !articles[code1].vrai;
  m2Card.dataset.fake2 = !articles[code2].vrai;

  gsap.to(m2CodePhase, {
    opacity: 0,
    duration: 0.4,
    onComplete: () => {
      m2CodePhase.hidden = true;
      m2ArticlePhase.hidden = false;
      animateCardIn(m2ArticlePhase);
    },
  });
});

m2ValidateFake.addEventListener("click", () => {
  playClick();

  const activeSlide = m2Card.querySelector(".article-slide.active");
  const index = [...m2Card.querySelectorAll(".article-slide")].indexOf(
    activeSlide
  );
  const fakeFound =
    (index === 0 && m2Card.dataset.fake1 === "true") ||
    (index === 1 && m2Card.dataset.fake2 === "true");

  if (fakeFound) {
    if (currentTeamM2 === 1) scoreTeam1++;
    else scoreTeam2++;
  }
  if (currentTeamM2 === 1) {
    gsap.to(m2Card, {
      opacity: 0,
      y: 100,
      duration: 0.5,
      onComplete: () => {
        currentTeamM2 = 2;
        switchToTeam2Theme?.();

        m2Code1.value = "";
        m2Code2.value = "";
        m2Article1.textContent = "";
        m2Article2.textContent = "";
        m2CodePhase.hidden = false;
        m2ArticlePhase.hidden = true;
        gsap.set(m2CodePhase, { opacity: 1, y: 0 });
        gsap.set(m2ArticlePhase, { opacity: 1, y: 0 });

        teamTitleM2.textContent = team2Name;

        m2Card.style.opacity = 1;
        m2Card.style.transform = "translateY(0)";
        animateCardIn(m2Card);
      },
    });
  } else {
    document.getElementById("score-team1").textContent = team1Name;
    document.getElementById("score-team2").textContent = team2Name;
    document.getElementById("score-val1").textContent = scoreTeam1;
    document.getElementById("score-val2").textContent = scoreTeam2;

    gsap.to(m2Card, {
      opacity: 0,
      y: 100,
      duration: 0.5,
      onComplete: () => {
        m2Card.hidden = true;
        resetToTeam1Theme?.();
        showScoreCard(2);
      },
    });
  }
});

// SCORE
const scoreCard = document.querySelector(".players__card--score");

function showScoreCard(manche) {
  currentManche = manche;

  const score1El = document.getElementById("score-val1");
  const score2El = document.getElementById("score-val2");

  document.getElementById("score-team1").textContent = team1Name;
  document.getElementById("score-team2").textContent = team2Name;

  score1El.textContent = scoreTeam1;
  score2El.textContent = scoreTeam2;

  gsap.fromTo(
    [score1El, score2El],
    { scale: 1.3, color: "#ed6e83" },
    { scale: 1, color: "#233a66", duration: 0.6, ease: "back.out(1.7)" }
  );

  scoreCard.hidden = false;
  animateCardIn(scoreCard);
}

// M3
let currentTeamM3 = 1;
const m3Card = document.querySelector(".players__card--m3");
const m3ArticleText = m3Card.querySelector(".article-text");
const m3Choices = m3Card.querySelectorAll(".players__choice");
const m3TeamTitle = document.getElementById("m3-teams-name");

let usedArticlesM3 = [];

function getUniqueRandomArticle() {
  const availableKeys = Object.keys(articles).filter(
    (key) => !usedArticlesM3.includes(key)
  );

  if (availableKeys.length === 0) {
    console.warn("Tous les articles ont été utilisés");
    return null;
  }

  const randomKey =
    availableKeys[Math.floor(Math.random() * availableKeys.length)];
  usedArticlesM3.push(randomKey);
  return articles[randomKey];
}

function startM3Turn(teamNumber) {
  currentTeamM3 = teamNumber;
  const teamName = teamNumber === 1 ? team1Name : team2Name;
  m3TeamTitle.textContent = teamName;

  const article = getUniqueRandomArticle();
  if (article) {
    m3ArticleText.textContent = article.texte;
    m3Card.dataset.correct = article.vrai;
  }

  m3Card.hidden = false;
  gsap.set(m3Card, { opacity: 1, y: 0 });
  animateCardIn(m3Card);
}
m3Choices.forEach((btn) => {
  btn.addEventListener("click", () => {
    playClick();

    const choice = btn.classList.contains("choice-real");
    const correct = m3Card.dataset.correct === "true";

    if (choice === correct) {
      if (currentTeamM3 === 1) scoreTeam1++;
      else scoreTeam2++;
    }

    if (currentTeamM3 === 1) {
      gsap.to(m3Card, {
        opacity: 0,
        y: 100,
        duration: 0.5,
        onComplete: () => {
          switchToTeam2Theme();
          startM3Turn(2);
        },
      });
    } else {
      gsap.to(m3Card, {
        opacity: 0,
        y: 100,
        duration: 0.5,
        onComplete: () => {
          m3Card.hidden = true;
          resetToTeam1Theme();
          showScoreCard(3);
          usedArticlesM3 = [];
        },
      });
    }
  });
});

// M4
const iaImages = [
  { src: "Assets/img/img1.jpg", isIA: true },
  { src: "Assets/img/img2.jpg", isIA: true },
  { src: "Assets/img/img3.jpg", isIA: true },
  { src: "Assets/img/img4.jpg", isIA: true },
  { src: "Assets/img/img5.jpg", isIA: true },
  { src: "Assets/img/img6.jpg", isIA: true },
  { src: "Assets/img/img7.jpg", isIA: true },
  { src: "Assets/img/img8.jpg", isIA: true },
  { src: "Assets/img/img9.jpg", isIA: true },
  { src: "Assets/img/img10.jpg", isIA: true },
  { src: "Assets/img/img11.jpg", isIA: true },
  { src: "Assets/img/img12.jpg", isIA: true },
  { src: "Assets/img/img13.jpg", isIA: true },
  { src: "Assets/img/img14.jpg", isIA: true },
  { src: "Assets/img/img15.jpg", isIA: true },
  { src: "Assets/img/img16.jpg", isIA: false },
  { src: "Assets/img/img17.jpg", isIA: false },
  { src: "Assets/img/img18.jpg", isIA: false },
  { src: "Assets/img/img19.jpg", isIA: false },
  { src: "Assets/img/img20.jpg", isIA: false },
  { src: "Assets/img/img21.jpg", isIA: false },
  { src: "Assets/img/img22.jpg", isIA: false },
  { src: "Assets/img/img23.jpg", isIA: false },
  { src: "Assets/img/img24.jpg", isIA: false },
  { src: "Assets/img/img25.jpg", isIA: false },
  { src: "Assets/img/img26.jpg", isIA: false },
  { src: "Assets/img/img27.jpg", isIA: false },
  { src: "Assets/img/img28.jpg", isIA: false },
  { src: "Assets/img/img29.jpg", isIA: false },
  { src: "Assets/img/img30.jpg", isIA: false },
];

const m4Card = document.querySelector(".players__card--m4");
const m4Img = document.getElementById("m4-img");
const m4Choices = m4Card.querySelectorAll(".players__choice");
const m4TeamTitle = document.getElementById("m4-teams-name");

let currentTeamM4 = 1;
let usedImagesM4 = [];

function getUniqueRandomImage() {
  const available = iaImages.filter((img) => !usedImagesM4.includes(img.src));
  if (available.length === 0) {
    console.warn("Toutes les images ont été utilisées");
    return null;
  }
  const random = available[Math.floor(Math.random() * available.length)];
  usedImagesM4.push(random.src);
  return random;
}

function startM4Turn(teamNumber) {
  currentTeamM4 = teamNumber;
  const teamName = teamNumber === 1 ? team1Name : team2Name;
  m4TeamTitle.textContent = teamName;

  const image = getUniqueRandomImage();
  if (image) {
    m4Img.src = image.src;
    m4Img.dataset.isIA = image.isIA;
  }

  m4Card.hidden = false;
  gsap.set(m4Card, { opacity: 1, y: 0 });
  animateCardIn(m4Card);
}

m4Choices.forEach((btn) => {
  btn.addEventListener("click", () => {
    playClick();

    const isIA = m4Img.dataset.isIA === "true";
    const choice = btn.classList.contains("choice-fake");
    const correct = choice === isIA;

    if (correct) {
      if (currentTeamM4 === 1) scoreTeam1++;
      else scoreTeam2++;
    }

    if (currentTeamM4 === 1) {
      gsap.to(m4Card, {
        opacity: 0,
        y: 100,
        duration: 0.5,
        onComplete: () => {
          switchToTeam2Theme();
          startM4Turn(2);
        },
      });
    } else {
      gsap.to(m4Card, {
        opacity: 0,
        y: 100,
        duration: 0.5,
        onComplete: () => {
          m4Card.hidden = true;
          resetToTeam1Theme();
          usedImagesM4 = [];
          showScoreCard(4);
        },
      });
    }
  });
});

// M5
m5Card.querySelector(".validate-code").addEventListener("click", () => {
  playClick();

  const codeInput = m5Card.querySelector(".code-input");
  const code = Number(codeInput.value.trim());
  const article = articles[code];

  if (!article) {
    gsap.fromTo(
      codeInput,
      { x: -5 },
      { x: 5, duration: 0.1, repeat: 3, yoyo: true }
    );
    return;
  }

  const codePhase = m5Card.querySelector(".code-phase");
  const articlePhase = m5Card.querySelector(".article-phase");
  const articleText = m5Card.querySelector(".article-text");

  articleText.textContent = article.texte;

  gsap.to(codePhase, {
    opacity: 0,
    duration: 0.4,
    ease: "power1.inOut",
    onComplete: () => {
      codePhase.hidden = true;
      articlePhase.hidden = false;

      gsap.fromTo(
        articlePhase,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }
      );
    },
  });
});

m5Card.querySelector(".reencode").addEventListener("click", () => {
  playClick();

  const codePhase = m5Card.querySelector(".code-phase");
  const articlePhase = m5Card.querySelector(".article-phase");

  gsap.to(articlePhase, {
    opacity: 0,
    y: 50,
    duration: 0.4,
    ease: "power1.inOut",
    onComplete: () => {
      articlePhase.hidden = true;
      codePhase.hidden = false;

      gsap.fromTo(
        codePhase,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }
      );
    },
  });
});

m5Card.querySelectorAll(".skip-final").forEach((btn) =>
  btn.addEventListener("click", () => {
    playClick();

    gsap.to(m5Card, {
      opacity: 0,
      y: 100,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        m5Card.hidden = true;
        resetToTeam1Theme();
        m5winCard.hidden = false;
        animateCardIn(m5winCard);

        m5winCard.querySelector(".choice-team1").textContent = team1Name;
        m5winCard.querySelector(".choice-team2").textContent = team2Name;
      },
    });
  })
);

// CHOIX DU GAGNANT
m5winCard.querySelector(".choice-team1").addEventListener("click", () => {
  playClick();
  scoreTeam1++;

  gsap.to(m5winCard, {
    opacity: 0,
    y: 100,
    duration: 0.5,
    ease: "power2.inOut",
    onComplete: () => {
      m5winCard.hidden = true;
      showFinalScreen(team1Name);
    },
  });
});

m5winCard.querySelector(".choice-team2").addEventListener("click", () => {
  playClick();
  scoreTeam2++;

  gsap.to(m5winCard, {
    opacity: 0,
    y: 100,
    duration: 0.5,
    ease: "power2.inOut",
    onComplete: () => {
      m5winCard.hidden = true;
      showFinalScreen(team2Name);
    },
  });
});

// FINAL
function showFinalScreen(selectedWinner) {
  m5winCard.hidden = true;

  let trueWinner;
  if (scoreTeam1 > scoreTeam2) {
    trueWinner = team1Name;
    resetToTeam1Theme();
  } else if (scoreTeam2 > scoreTeam1) {
    trueWinner = team2Name;
    switchToTeam2Theme();
  } else {
    trueWinner = selectedWinner;
    switchToTeam2Theme();
  }

  document.getElementById(
    "final-message"
  ).textContent = `${trueWinner} à remporté sa carte presse !`;

  document.getElementById("final-team1").textContent = team1Name;
  document.getElementById("final-team2").textContent = team2Name;
  document.getElementById("final-score1").textContent = scoreTeam1;
  document.getElementById("final-score2").textContent = scoreTeam2;

  finalCard.hidden = false;
  animateCardIn(finalCard);
}

// BOUTON MENU PRINCIPAL
const menuBtn = finalCard.querySelector(".choice-fmenu");
if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    playClick();

    gsap.to(finalCard, {
      opacity: 0,
      y: 100,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        scoreTeam1 = 0;
        scoreTeam2 = 0;
        team1Name = "";
        team2Name = "";
        selectedPlayers = null;
        currentManche = 0;
        currentTeam = 1;

        resetToTeam1Theme();

        document
          .querySelectorAll(".players__card")
          .forEach((c) => (c.hidden = true));

        const firstCard = document.querySelector(".players__card--players");
        firstCard.hidden = false;

        gsap.fromTo(
          firstCard,
          { opacity: 0, y: 100 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
      },
    });
  });
}

// BOUTON REJOUER
const btnReplay = document.querySelector(".choice-freplay");
if (btnReplay) {
  btnReplay.addEventListener("click", () => {
    playClick();

    gsap.to(finalCard, {
      opacity: 0,
      y: 100,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        currentManche = 1;
        currentTeam = 1;
        scoreTeam1 = 0;
        scoreTeam2 = 0;

        resetToTeam1Theme();

        const cards = document.querySelectorAll(".players__card");
        cards.forEach((card) => (card.hidden = true));

        const m1Card = Array.from(cards).find((card) =>
          card.classList.contains("players__card--m1")
        );

        const codePhase = m1Card.querySelector(".code-phase");
        const articlePhase = m1Card.querySelector(".article-phase");
        if (codePhase && articlePhase) {
          codePhase.hidden = false;
          articlePhase.hidden = true;
          gsap.set(codePhase, { opacity: 1, y: 0 });
          gsap.set(articlePhase, { opacity: 1, y: 0 });
        }

        m1Card.hidden = false;
        gsap.fromTo(
          m1Card,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            onStart: () => {
              currentTeam = 1;
              startTeamTurn(1);
            },
            onComplete: () => {
              const teamTitle = document.getElementById("m1-teams-name");
              if (teamTitle) teamTitle.textContent = team1Name;

              document.getElementById("score-val1").textContent = scoreTeam1;
              document.getElementById("score-val2").textContent = scoreTeam2;
            },
          }
        );
      },
    });
  });
}
