"use strict";

//DOM Selection - Fixed DOM
const container = document.querySelector("#cards-container");
const headerDisplay = document.querySelector("h1");
const message = document.querySelector("#message");
const stripe = document.querySelector(".stripe");
const buttons = document.querySelectorAll("button");
const movesBtn = document.querySelector(".moves");
const header = document.querySelector("header");
const nav = document.querySelector(".header");

//Dynamic DOM
let images = document.querySelectorAll(".image");
let covers = document.querySelectorAll(".cover");
let cards = document.querySelectorAll(".card");

//Global Setters
const gameLevels = [12, 20, 32, 48, 64];
const imagePaths = 38;
let imgUrls = [];
let gameLevel = gameLevels[0];
let openedCards = [];
let moves = 0;

//Event Listeners
container.addEventListener("click", (e) => {
  e.stopPropagation();
  if (!e.target.classList.contains("cover")) return;
  const card = e.target.closest(".card");
  const image = card.querySelector(".image");
  openedCards = updateDisplay(openedCards);
  image.style.display = "block";
  e.target.style.display = "none";
  openedCards.push(image);
  displayMatchResult(openedCards);
});

stripe.addEventListener("click", function (e) {
  e.stopPropagation();
  if (e.target.id === "shuffle")
    displayLevels(selectLevels(imgUrls, gameLevel));
  if (e.target.id === "reset") reset();
  if (e.target.textContent === "Easy") modeHandeller(gameLevels[0], e.target);
  if (e.target.textContent === "Medium") modeHandeller(gameLevels[1], e.target);
  if (e.target.textContent === "Hard") modeHandeller(gameLevels[2], e.target);
  if (e.target.textContent === "Ultra") modeHandeller(gameLevels[3], e.target);
  if (e.target.textContent === "Legend") modeHandeller(gameLevels[4], e.target);
});


//Logic + Helpers

const updateDisplay = function (arr) {
  if (!(arr.length === 2)) return arr;
  if (isMatch(arr[0].src, arr[1].src)) {
  } else {
    arr.forEach((el) => {
      el.style.display = "none";
      el.closest(".card").querySelector(".cover").style.display = "block";
    });
  }
  arr.splice(0, 2);
  return arr;
};

const displayMatchResult = function (arr) {
  if (!(arr.length === 2)) return;
  moves++;
  movesBtn.textContent = `Moves: ${moves}`;
  if (isMatch(arr[0].src, arr[1].src)) {
    message.textContent = "Shabbashhh 👏";
    if (!checkAllMatches()) return;
    winningText();
  } else {
    message.textContent = "Beta Tum Sai Na Ho Paye Ga 😏😏";
  }
};

const winningText = function () {
  const guessRate = (gameLevel / 2 / moves) * 100;
  console.log("check score");
  if (moves === gameLevel / 2) {
    headerDisplay.textContent = `You Nailed it! Your Guess Rate is ${+guessRate.toFixed(
      2
    )}%`;
    headerDisplay.style.backgroundColor = "limegreen";
    headerDisplay.style.color = "whitesmoke";
  }
  if (moves > gameLevel / 2 && moves <= 2 * (gameLevel / 2)) {
    headerDisplay.textContent = `Great Work! Your Guess Rate is ${+guessRate.toFixed(
      2
    )}%`;
    headerDisplay.style.backgroundColor = "lime";
    headerDisplay.style.color = "steelblue";
  }
  if (moves > 2 * (gameLevel / 2) && moves <= 3 * (gameLevel / 2)) {
    headerDisplay.textContent = `That's Okay, Keep it up! Your Guess Rate is ${+guessRate.toFixed(
      2
    )}%`;
    headerDisplay.style.backgroundColor = "gold";
    headerDisplay.style.color = "steelblue";
  }
  if (moves > 3 * (gameLevel / 2)) {
    headerDisplay.textContent = `Poor Work, Try Again! Your Guess Rate is ${+guessRate.toFixed(
      2
    )}%`;
    headerDisplay.style.backgroundColor = "orangered";
    headerDisplay.style.color = "whitesmoke";
  }
};

const checkAllMatches = function () {
  const unopenedImgs = [...images].filter(
    (image) => image.style.display === "none"
  );
  if (unopenedImgs.length === 0) return true;
  return false;
};

const isMatch = function (d1, d2) {
  if (d1 === d2) return true;
  return false;
};

const modeHandeller = function (cardsCount, mode) {
  gameLevel = cardsCount;
  cardsCreation(gameLevel);
  displayLevels(selectLevels(imgUrls, gameLevel));
  buttons.forEach((btn) => btn.classList.remove("selected"));
  mode.classList.add("selected");
};

const shuffleArray = function (arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

const resetImgs = function (urls) {
  //console.clear()
  urls = shuffleArray(urls);
  urls.forEach((url, i) => {
    images[i].src = url;
    //console.log(images[i]);
  });
};

const selectLevels = function (urls, cardsCount) {
  if (cardsCount % 2 !== 0) return alert("Please Enter an Even Number");
  let imgArr = [];
  urls.forEach((url, i) => {
    if (cardsCount / 2 > i) {
      imgArr.push(url);
    }
  });
  imgArr = [...imgArr, ...imgArr];
  return imgArr;
};

const threeInARow = function (urls) {
  urls.forEach((_, i) => {
    container.style.width = "60%";
    cards[i].classList.remove("cards", "cardsFour", "cardsFive", "cardsEight");
    cards[i].classList.add("cardsThree");
  });
};

const fiveInARow = function (urls) {
  container.style.width = "90%";
  urls.forEach((_, i) => {
    cards[i].classList.remove("cards", "cardsThree", "cardsFour", "cardsEight");
    cards[i].classList.add("cardsFive");
  });
};

const fourInARow = function (urls) {
  container.style.width = "75%";
  urls.forEach((_, i) => {
    cards[i].classList.remove("cards", "cardsThree", "cardsFive", "cardsEight");
    cards[i].classList.add("cardsFour");
  });
};

const eightInARow = function (urls) {
  container.style.width = "95%";
  urls.forEach((_, i) => {
    cards[i].classList.remove("cards", "cardsThree", "cardsFour", "cardsFive");
    cards[i].classList.add("cardsEight");
  });
};

const reset = function () {
  images.forEach((image) => (image.style.display = "none"));
  covers.forEach((cover) => (cover.style.display = "block"));
  moves = 0;
  message.textContent = "Chalo Khelo 😋";
  movesBtn.textContent = `Moves: ${moves}`;
  headerDisplay.textContent = "Match Up";
  headerDisplay.style.backgroundColor = "steelblue";
  headerDisplay.style.color = "whitesmoke";
};

const displayLevels = function (urls) {
  reset();
  resetImgs(urls);
  if (urls.length <= 12 && urls.length > 6) fourInARow(urls);
  if (urls.length <= 20 && urls.length > 12) fiveInARow(urls);
  if (urls.length > 20) eightInARow(urls);
};

const stickyNav = function () {
  const options = {
    root: null,
    threshold: 0,
  };
  const toggleNav = function (entries) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        nav.classList.add("sticky");
      } else {
        nav.classList.remove("sticky");
      }
    });
  };
  const headerObserver = new IntersectionObserver(toggleNav, options);
  headerObserver.observe(header);
};

const cardsCreation = function (cardsCount) {
  container.innerHTML = "";
  cards = images = covers = null;
  for (let i = 0; i < cardsCount; i++) {
    let html = `
    <div class="card">			
      <div class="cover"></div>
      <img src="" class='image' id= ${i + 1}>
    </div>`;
    container.insertAdjacentHTML("beforeend", html);
  }
  cards = document.querySelectorAll(".card");
  images = document.querySelectorAll(".image");
  covers = document.querySelectorAll(".cover");
};

const populatePaths = function (totalUrls) {
  let arr = [];
  for (let i = 0; i < totalUrls; i++) {
    const path = `./img/img-${i + 1}.jpg`;
    arr.push(path);
  }
  return arr;
};

const init = function () {
  imgUrls = shuffleArray(populatePaths(imagePaths));
  cardsCreation(gameLevel);
  displayLevels(selectLevels(imgUrls, gameLevel));
  stickyNav();
};



//Game Initialization


init();
