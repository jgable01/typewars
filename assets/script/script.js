/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

  Object-oriented JavaScript
  Joshua Gable

  Word Game

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
"use strict";

const startBtn = document.querySelector(".start");
const info = document.querySelector(".info");
const counter = document.querySelector('.counterp');
const pointCount = document.querySelector('.points');
const guessBox = document.querySelector(".guessBox");
const wordBox = document.querySelector(".wordBox");
const textField = document.getElementsByClassName("textField");
const resetBtn = document.querySelector(".reset");

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

setInterval(update, 1000);



startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  resetBtn.style.display = "inline";
  wordBox.style.display = "grid";
  guessBox.style.display = "grid";
  startGame();
});

guessBox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    if (guessBox.value.trim() === wordBox.innerHTML) {
      correctGuess();
    } else {
      guessBox.style.border = '1px solid #ff3c57';
      guessBox.value = '';
    }
  }
});

function correctGuess() {
  let wordIndex = wordsTemp.indexOf(wordBox.innerHTML);
  console.log(`Index: ${wordIndex}`);
  wordsTemp.splice(wordIndex, 1);
  console.log(wordsTemp);
  guessBox.style.border = '1px solid #4dcc3c';
  wordBox.innerHTML = wordsTemp[randomNum()];
  points += 1;
  guessBox.value = '';
}

function randomNum() {
  return Math.floor(Math.random() * (wordsTemp.length - 0 + 1) + 0);
}

function startGame() {
  wordsTemp = [...words];
  console.log(wordsTemp.length);
  count = 99;
  points = 0;
  pointCount.innerHTML = `Points: ${points}`;
  counter.innerHTML = `Time Left: ${count}`;
  wordBox.innerHTML = wordsTemp[randomNum()];
}

function update() {
  if (count != 0) {
    count -= 1;
    counter.innerHTML = `Time Left: ${count}`;
    pointCount.innerHTML = `Points: ${points}`;
  }
}
