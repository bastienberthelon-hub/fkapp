"use strict";
gsap.to(".app__pattern", {
  backgroundPosition: "-4000px 4000px",
  duration: 100,
  ease: "none",
  repeat: -1,
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
// POPUPS
const rulesPopup = document.querySelector(".popup--rules");
const startButton = document.querySelector(".app__button");
const closeRules = document.querySelector(".popup__close--rules");
const rulesButton = document.querySelector(".app__button--popup");

// POPUP RÈGLES
const steps = document.querySelectorAll(".rules__step");
let currentStep = 0;

function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle("rules__step--active", i === index);
  });

  if (index === 0) {
    rulesButton.textContent = "Accéder au dossier";
  } else if (index < steps.length - 1) {
    rulesButton.textContent = "Signer le réglement";
  } else {
    rulesButton.textContent = "Commencer l'examen";
  }
}

startButton.addEventListener("click", () => {
  playClick();
  currentStep = 0;
  showStep(currentStep);

  app.classList.add("app--blurred");
  rulesPopup.classList.remove("popup--hidden");

  gsap.fromTo(
    ".popup--rules .popup__content",
    { scale: 0.9, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.3, ease: "power1.out" }
  );
});

rulesButton.addEventListener("click", () => {
  playClick();

  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep(currentStep);
  } else {
    closePopupAnimated(rulesPopup, ".popup--rules .popup__content");
    setTimeout(() => {
      window.location.href = "players.html";
    }, 600);
  }
});

closeRules.addEventListener("click", () => {
  playClick();
  closePopupAnimated(rulesPopup, ".popup--rules .popup__content");
  currentStep = 0;
});
