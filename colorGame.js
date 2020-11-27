"use strict";

//DOM Selection
const container = document.querySelector("#cards-container");
const images = document.querySelectorAll(".image");
const covers = document.querySelectorAll(".cover");
const cards = document.querySelectorAll(".card");
const headerDisplay = document.querySelector("h1");
const message = document.querySelector('#message');
const stripe = document.querySelector('.stripe');
const buttons = document.querySelectorAll('button');

let openedCards = [];

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
  if (isMatch(arr[0].src, arr[1].src)) {
    message.textContent = '';
    message.insertAdjacentText('beforeend', 'Shabbashhh!! ');
    if (!(checkAllMatches(gameLevel, gameLevels[3]))) return;
    headerDisplay.textContent = '';
    headerDisplay.textContent = 'That took a while.... 🤔';
    headerDisplay.style.backgroundColor = 'limegreen';
  } else {
    message.textContent = '';
    message.insertAdjacentText('beforeend', 'Beta Tum Sai Na Ho Paye Ga 😏😏');
  }
};

const checkAllMatches = function(cardsCount, totalCards){
  const unopenedImgs = [...images].filter(image => image.style.display === 'none');
  if((totalCards - unopenedImgs.length) === cardsCount) return true;
  return false;
}


const isMatch = function (d1, d2) {
  if (d1 === d2) return true;
  return false;
};

const gameLevels = [6, 8, 12, 20];
let gameLevel = gameLevels[1];

stripe.addEventListener('click', function(e){
  e.stopPropagation();
  if(e.target.id === 'reset') displayLevels(selectLevels(imgUrls, gameLevel));
  if(e.target.textContent === 'Nanny') {
    displayLevels(selectLevels(imgUrls, gameLevels[0]));
    buttons.forEach(btn => btn.classList.remove('selected'));
    e.target.classList.add('selected');
    gameLevel = gameLevels[0];
  }
  if(e.target.textContent === 'Mommy') {
    displayLevels(selectLevels(imgUrls, gameLevels[1]));
    buttons.forEach(btn => btn.classList.remove('selected'));
    e.target.classList.add('selected');
    gameLevel = gameLevels[1];
  }
  if(e.target.textContent === 'Wifey'){
    displayLevels(selectLevels(imgUrls, gameLevels[2]));
    buttons.forEach(btn => btn.classList.remove('selected'));
    e.target.classList.add('selected');
    gameLevel = gameLevels[2];
  }
  if(e.target.textContent === 'Crush') {
    displayLevels(selectLevels(imgUrls, gameLevels[3]));
    buttons.forEach(btn => btn.classList.remove('selected'));
    e.target.classList.add('selected');
    gameLevel = gameLevels[3];
  }
});



const imgUrls = [
  "./img/img-1.jpg",
  "./img/img-2.jpg",
  "./img/img-3.jpg",
  "./img/img-4.jpg",
  "./img/img-5.jpg",
  "./img/img-6.jpg",
  "./img/img-7.jpg",
  "./img/img-8.jpg",
  "./img/img-9.jpg",
  "./img/img-10.jpg",
  "./img/img-1.jpg",
  "./img/img-2.jpg",
  "./img/img-3.jpg",
  "./img/img-4.jpg",
  "./img/img-5.jpg",
  "./img/img-6.jpg",
  "./img/img-7.jpg",
  "./img/img-8.jpg",
  "./img/img-9.jpg",
  "./img/img-10.jpg"
];

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
  console.clear()
  urls = shuffleArray(urls);
  urls.forEach((url, i) => {
    images[i].src = url;
    console.log(images[i]);
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


const threeInARow = function(urls){
  urls.forEach((_, i) => {
    container.style.width = "60%";
    cards[i].classList.remove("cards");
    cards[i].classList.remove("cardsFour");
    cards[i].classList.remove("cardsFive");
    cards[i].classList.add("cardsThree");
  });
}

const fiveInARow = function(urls){
  container.style.width = "90%";
  urls.forEach((_, i) => {
    cards[i].classList.remove("cards");
    cards[i].classList.remove("cardsThree");
    cards[i].classList.remove("cardsFour");
    cards[i].classList.add("cardsFive");
  });
}

const fourInARow = function(urls){
  container.style.width = "75%";
  urls.forEach((_, i) => {
    cards[i].classList.remove("cards");
    cards[i].classList.remove("cardsThree");
    cards[i].classList.remove("cardsFive");
    cards[i].classList.add("cardsFour");
  });
}

const displayLevels = function (urls) {
  cards.forEach((card, i) => {
    card.style.display = "none";
    images[i].style.display = 'none';
  });
  urls.forEach((_, i) => {
    cards[i].style.display = "block";
    covers[i].style.display = 'block';
  });
  resetImgs(urls);
  if (urls.length < 7) threeInARow(urls);
  if (urls.length > 12) fiveInARow(urls);
};
displayLevels(selectLevels(imgUrls, gameLevel));