/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

  Object-oriented JavaScript
  Joshua Gable

  Word Game

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
"use strict";

const startBtn = document.querySelector(".start");
const info = document.querySelector(".info");
const counter = document.querySelector(".counterp");
const pointCount = document.querySelector(".points");
const guessBox = document.querySelector(".guessBox");
const wordBox = document.querySelector(".wordBox");
const textField = document.getElementsByClassName("textField");
const resetBtn = document.querySelector(".reset");
const scoreSheet = document.querySelector(".scoreSheet");
const showDate = document.querySelector(".date");
const hits = document.querySelector(".hits");
const showPercentage = document.querySelector(".percent");
const backgroundMusic = document.querySelector(".backgroundMusic");
const pointSound = document.querySelector(".pointSound");
const incorrectSound = document.querySelector(".incorrectSound");
const scoreBoard = document.querySelector(".scoreBoard");

class Score {
  #date;
  #hits;
  #percentage;

  constructor(date, hits, percentage) {
    this.#date = date;
    this.#hits = hits;
    this.#percentage = percentage;
  }

  get date() {
    return this.#date;
  }

  get hits() {
    return this.#hits;
  }

  get percentage() {
    return this.#percentage;
  }
}

const words = [
  "dinosaur",
  "love",
  "pineapple",
  "calendar",
  "robot",
  "building",
  "population",
  "weather",
  "bottle",
  "history",
  "dream",
  "character",
  "money",
  "absolute",
  "discipline",
  "machine",
  "accurate",
  "connection",
  "rainbow",
  "bicycle",
  "eclipse",
  "calculator",
  "trouble",
  "watermelon",
  "developer",
  "philosophy",
  "database",
  "periodic",
  "capitalism",
  "abominable",
  "component",
  "future",
  "pasta",
  "microwave",
  "jungle",
  "wallet",
  "canada",
  "coffee",
  "beauty",
  "agency",
  "chocolate",
  "eleven",
  "technology",
  "alphabet",
  "knowledge",
  "magician",
  "professor",
  "triangle",
  "earthquake",
  "baseball",
  "beyond",
  "evolution",
  "banana",
  "perfumer",
  "computer",
  "management",
  "discovery",
  "ambition",
  "music",
  "eagle",
  "crown",
  "chess",
  "laptop",
  "bedroom",
  "delivery",
  "enemy",
  "button",
  "superman",
  "library",
  "unboxing",
  "bookstore",
  "language",
  "homework",
  "fantastic",
  "economy",
  "interview",
  "awesome",
  "challenge",
  "science",
  "mystery",
  "famous",
  "league",
  "memory",
  "leather",
  "planet",
  "software",
  "update",
  "yellow",
  "keyboard",
  "window",
];

let wordsTemp = [...words];
let count = 0;
let points = 0;
let guesses = 0;
let isActive = false;

setInterval(update, 1000);

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  resetBtn.style.display = "inline";
  wordBox.style.display = "grid";
  guessBox.style.display = "grid";
  startGame();
});

resetBtn.addEventListener("click", () => {
  resetGame();
});

guessBox.addEventListener("keydown", (event) => {
  resetSounds();
  if (event.key === "Enter") {
    guesses += 1;
    if (
      guessBox.value.trim().toUpperCase() === wordBox.innerHTML.toUpperCase()
    ) {
      correctGuess();
    } else {
      incorrectSound.play();
      guessBox.classList.add("incorrect");
      setTimeout(() => {
        guessBox.classList.remove("incorrect");
      }, 750);
      guessBox.value = "";
    }
  }
});

function correctGuess() {
  pointSound.play();
  let wordIndex = wordsTemp.indexOf(wordBox.innerHTML);
  wordsTemp.splice(wordIndex, 1);
  guessBox.classList.add("correct");
  setTimeout(() => {
    guessBox.classList.remove("correct");
  }, 750);
  wordBox.innerHTML = wordsTemp[randomNum()];
  points += 1;
  pointCount.innerHTML = `Points: ${points}`;
  guessBox.value = "";
  if (wordsTemp.length === 0) {
    displayScore();
    resetGame();
  }
}

function randomNum() {
  return Math.floor(Math.random() * wordsTemp.length + 0);
}

function startGame() {
  wordsTemp = [...words];
  count = 99;
  points = 0;
  guesses = 0;
  pointCount.innerHTML = `Points: ${points}`;
  counter.innerHTML = `Time Left: ${count}`;
  isActive = true;
  backgroundMusic.play();
  wordBox.innerHTML = wordsTemp[randomNum()];
}

function resetGame() {
  isActive = false;
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
  displayScore();
  count = 0;
  points = 0;
  guesses = 0;
  counter.innerHTML = `Time Left: ${count}`;
  pointCount.innerHTML = `Points: ${points}`;
  startBtn.style.display = "inline";
  resetBtn.style.display = "none";
  wordBox.style.display = "none";
  guessBox.style.display = "none";
  guessBox.style.border = "";
  guessBox.value = "";
}

function displayScore() {
  let date = new Date();
  let percent = 0;
  let dateLocal = date.toDateString();
  if (guesses > 0) {
    percent = Math.round((points / guesses) * 100);
  }
  const player = new Score(dateLocal, points, percent);
  showDate.innerHTML = `Date: ${player.date}`;
  hits.innerHTML = `Score: ${player.hits}`;
  showPercentage.innerHTML = `Percentage: ${player.percentage}%`;
  scoreSheet.style.display = "grid";
  saveScore(player);
}

function saveScore(player) {
  let scores = JSON.parse(localStorage.getItem("score")) || [];
  const playerScores = {
    date: player.date,
    hits: player.hits,
    percentage: player.percentage,
  };
  scores.push(playerScores);
  scores.sort((a, b) => b.hits - a.hits);

  const topScores = scores.length > 9 ? scores.splice(0, 9) : scores;
  localStorage.setItem("score", JSON.stringify(topScores));
  getScore();
}

function getScore() {
  console.log(JSON.parse(localStorage.getItem("score")));
  const scoresLocal = JSON.parse(localStorage.getItem("score"));
  scoresLocal.forEach((score, index) => {
    let scoreRow = document.createElement("ul");
    let scoreNum = document.createElement("li");
    let scoreHits = document.createElement("li");
    let scorePercent = document.createElement("li");
    scoreNum.innerHTML = `#${index + 1}`;
    scoreHits.innerHTML = `${score.hits} Words`;
    scorePercent.innerHTML = `${score.percentage}%`;
    scoreRow.appendChild(scoreNum);
    scoreRow.appendChild(scoreHits);
    scoreRow.appendChild(scorePercent);
    scoreBoard.appendChild(scoreRow);
  });
}

function closeScore() {
  scoreSheet.style.display = "none";
}

function resetSounds() {
  pointSound.pause();
  incorrectSound.pause();
  pointSound.currentTime = 0;
  incorrectSound.currentTime = 0;
}

function update() {
  if (count != 0 && isActive === true) {
    count -= 1;
    counter.innerHTML = `Time Left: ${count}`;
  } else {
    if (isActive === true) {
      isActive = false;
      displayScore();
      resetGame();
    }
  }
}

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

  Store Player Data In Local Storage

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
