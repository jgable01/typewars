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
const backgroundMusic = document.querySelector('.backgroundMusic');
const pointSound = document.querySelector('.pointSound');
const incorrectSound = document.querySelector('.incorrectSound');

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
    if (guessBox.value.trim().toUpperCase() === wordBox.innerHTML.toUpperCase()) {
      correctGuess();
    } else {
      incorrectSound.play();
      guessBox.style.border = "1px solid #ff3c57";
      guessBox.value = "";
    }
  }
});

function correctGuess() {
  pointSound.play()
  let wordIndex = wordsTemp.indexOf(wordBox.innerHTML);
  console.log(`Index: ${wordIndex}`);
  wordsTemp.splice(wordIndex, 1);
  console.log(wordsTemp);
  guessBox.style.border = "1px solid #4dcc3c";
  wordBox.innerHTML = wordsTemp[randomNum()];
  points += 1;
  pointCount.innerHTML = `Points: ${points}`;
  guessBox.value = "";
  if(wordsTemp.length === 0) {
    displayScore()
    resetGame();
  }
}

function randomNum() {
  return Math.floor(Math.random() * wordsTemp.length + 0);
}

function startGame() {
  wordsTemp = [...words];
  console.log(wordsTemp.length);
  count = 90;
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
  guessBox.style.border = '';
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
    guessBox.style.border = "";
  } else {
    if (isActive === true) {
      isActive = false;
      displayScore();
      resetGame();
    }
  }
}
