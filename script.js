'use strict';

// DATI

// Elementi

let score0Element = document.querySelector('#score--0');
let score1Element = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');

const rollButton = document.querySelector('.btn--roll');
const newButton = document.querySelector('.btn--new');
const holdButton = document.querySelector('.btn--hold');

const player0Section = document.querySelector('.player--0');
const player1Section = document.querySelector('.player--1');

// Valori

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let giocoInCorso = true;
const winningCondition = 50;

let currentScorePlayer0 = document.getElementById('current--0');
let currentScorePlayer1 = document.getElementById('current--1');

// FUNCTIONS

const switchPlayer = function () {
  if (activePlayer === 0) {
    activePlayer = 1;
    currentScore = 0;
    document.getElementById(`current--0`).textContent = currentScore;

    player1Section.classList.toggle('player--active');
    player0Section.classList.toggle('player--active');
  } else {
    activePlayer = 0;
    currentScore = 0;
    document.getElementById(`current--1`).textContent = currentScore;

    player0Section.classList.toggle('player--active');
    player1Section.classList.toggle('player--active');
  }
};

rollButton.addEventListener('click', function () {
  if (giocoInCorso) {
    // 1. Generate rand number 1-6
    const diceValue = Math.trunc(Math.random() * 6) + 1;
    // 2. Display Dice IMG
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${diceValue}.png`;
    // 3. Check if dice is 1 ? switch player : add number
    if (diceValue === 1) {
      // Switch Player
      switchPlayer();
    } else {
      // Add Dice value to current score
      currentScore += diceValue;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }
  }
});

holdButton.addEventListener('click', function () {
  if (giocoInCorso) {
    // 1. Add current score to global score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    // 2. if GS is >= 100 : WIN ? switch player
    if (scores[activePlayer] >= winningCondition) {
      giocoInCorso = false;
      diceElement.classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

newButton.addEventListener('click', function () {
  giocoInCorso = true;
  player0Section.classList.add('player--active');
  player1Section.classList.remove('player--active');
  player0Section.classList.remove('player--winner');
  player1Section.classList.remove('player--winner');
  score1Element.textContent = 0;
  score0Element.textContent = 0;
  currentScore = 0;
  currentScorePlayer0.textContent = 0;
  currentScorePlayer1.textContent = 0;
  activePlayer = 0;
  scores = [0, 0];
});
