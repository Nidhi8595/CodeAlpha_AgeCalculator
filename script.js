const proceedBtn = document.getElementById("proceedBtn");
const hero = document.querySelector(".hero");
const calculatorSection = document.getElementById("calculatorSection");
const ageForm = document.getElementById("ageForm");
const dobInput = document.getElementById("dob");
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const resultDiv = document.getElementById("result");
const countdownDiv = document.getElementById("countdown");
const clearBtn = document.getElementById("clearBtn");
const toast = document.getElementById("toast");
const floatingStickers = document.getElementById("floatingStickers");
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

const birthdayQuotes = [
  "🎉 Cheers to you and your best year yet!",
  "🎂 Eat cake, be happy, repeat!",
  "🥳 Level up! Happy Birthday, champ!",
  "🎈 Another trip around the sun, still shining bright!",
  "🎁 Birthday vibes: party hard, smile harder!",
  "🎉 Officially older, still rocking it!",
  "🥳 Keep calm and birthday on!",
  "🎂 Cake calories don’t count today!",
  "🎈 Born to sparkle, born to shine!",
  "🎉 Age is just a number, fun is forever!",
  "🎁 Here’s to more candles and more fun!",
  "🎂 Birthday mood: Let’s get lit!",
  "🥳 Eat cake like nobody’s watching!",
  "🎈 Make a wish and crush it!",
  "🎉 Time to party like a rockstar!",
  "🎁 You’re not older, just more awesome!",
  "🎂 Keep shining, birthday star!",
  "🥳 It’s your day — own it!",
  "🎈 Smile big, laugh loud, love more!",
  "🎉 Born to celebrate, born to shine!"
];

dayInput.setAttribute("maxlength", 2);
monthInput.setAttribute("maxlength", 2);
yearInput.setAttribute("maxlength", 4);

dayInput.addEventListener("input", () => {
  if (dayInput.value.length === 2) monthInput.focus();
});

monthInput.addEventListener("input", () => {
  if (monthInput.value.length === 2) yearInput.focus();
});

dayInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    monthInput.focus();
  }
});

monthInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    yearInput.focus();
  }
});

yearInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    ageForm.requestSubmit();
  }
});

// Moving from Landing page to main section
proceedBtn.addEventListener("click", () => {
  history.pushState({ page: "calculator" }, "", "#calculator");
  calculatorSection.classList.remove("hidden");
  hero.classList.add("hidden");
});

// Dark mode toggle
darkModeToggle.addEventListener("change", () => {
  body.classList.toggle("dark-mode", darkModeToggle.checked);
});

// Show toast message
function showToast(message) {
  toast.textContent = message;
  toast.style.opacity = "1";
  setTimeout(() => {
    toast.style.opacity = "0";
  }, 2500);
}

// Input validation
function getValidDOB() {
  if (dobInput.value) {
    const dobDate = new Date(dobInput.value);
    if (dobDate.toString() !== "Invalid Date") return dobDate;
  }

  // manual inputs fallback
  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value);
  const year = parseInt(yearInput.value);

  if (
    !Number.isInteger(day) ||
    !Number.isInteger(month) ||
    !Number.isInteger(year) ||
    day < 1 ||
    day > 31 ||
    month < 1 ||
    month > 12 ||
    year < 1900 ||
    year > new Date().getFullYear()
  ) {
    return null;
  }

  const manualDate = new Date(year, month - 1, day);
  if (
    manualDate.getFullYear() === year &&
    manualDate.getMonth() === month - 1 &&
    manualDate.getDate() === day
  ) {
    return manualDate;
  }

  return null;
}

function calculateAge(dob) {
  const now = new Date();
  let years = now.getFullYear() - dob.getFullYear();
  let months = now.getMonth() - dob.getMonth();
  let days = now.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

function timeUntilNextBirthday(dob) {
  const now = new Date();
  let nextBirthday = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());

  if (nextBirthday < now) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  }

  const diffMs = nextBirthday - now;
  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const remainingHours = totalHours % 24;
  const remainingMinutes = totalMinutes % 60;

  return {
    days: totalDays,
    hours: remainingHours,
    minutes: remainingMinutes,
  };
}

// Confetti animation on Bday
function launchConfetti() {
  const duration = 5000;
  const end = Date.now() + duration;

  (function frame() {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
    confetti.style.animationDuration = 3000 + Math.random() * 2000 + "ms";

    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 5000);

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

ageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const dob = getValidDOB();
  if (!dob) {
    showToast("Please enter a valid date of birth.");
    return;
  }

  if (dob > new Date()) {
    showToast("Date of birth cannot be in the future.");
    return;
  }

  const age = calculateAge(dob);
  resultDiv.textContent = `You are ${age.years} years, ${age.months} months, and ${age.days} days old.`;

  const now = new Date();
  const isBirthdayToday =
    now.getDate() === dob.getDate() && now.getMonth() === dob.getMonth();

  if (isBirthdayToday) {
    
    const randomQuote = birthdayQuotes[Math.floor(Math.random() * birthdayQuotes.length)];

    countdownDiv.innerHTML = `🎉 Happy Birthday! 🎂<br>${randomQuote}`;

    launchConfetti();
    
  } else {
    const { days, hours, minutes } = timeUntilNextBirthday(dob);
    countdownDiv.textContent = `Your upcoming Birthday is : ${days} days, ${hours} hours, ${minutes} minutes away 🥳`;
  }
});

// Checking new date input
clearBtn.addEventListener("click", () => {
  ageForm.reset();
  resultDiv.textContent = "";
  countdownDiv.textContent = "";
});

// Stickers on landing page
const stickers = ["🎂", "🎉", "🎈", "🎁", "🎊", "🥳", "🍰"];
const maxStickers = 20;
const animationDuration = 2000;

function createSticker() {
  const sticker = document.createElement("div");
  sticker.classList.add("sticker");
  sticker.textContent = stickers[Math.floor(Math.random() * stickers.length)];

  const heroRect = hero.getBoundingClientRect();

  const maxLeft = heroRect.width - 32;
  const left = Math.random() * maxLeft;

  sticker.style.left = `${left}px`;

  const duration = animationDuration * (0.7 + Math.random() * 0.6);
  sticker.style.animationDuration = `${duration}ms`;

  floatingStickers.appendChild(sticker);

  sticker.addEventListener("animationend", () => {
    sticker.remove();
  });
}

function generateStickers() {
  if (floatingStickers.children.length < maxStickers) {
    createSticker();
  }
}

setInterval(generateStickers, 800);

for (let i = 0; i < maxStickers / 3; i++) {
  setTimeout(createSticker, i * 500);
}

window.addEventListener("popstate", () => {
  // Show landing page and hide calculator
  calculatorSection.classList.add("hidden");
  hero.classList.remove("hidden");
});
window.addEventListener("load", () => {
  history.replaceState({ page: "landing" }, "", "#landing");
});
