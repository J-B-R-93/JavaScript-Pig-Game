'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player0ScoreEl = document.getElementById('score--0');
const player0currentEl = document.getElementById('current--0');

const player1El = document.querySelector('.player--1');
const player1ScoreEl = document.getElementById('score--1');
const player1currentEl = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');

let playersTotalScores, currentScore, activePlayer, playing;

// Initial State of the game
const init = function () {
  playersTotalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  player0ScoreEl.textContent = 0;
  player1ScoreEl.textContent = 0;
  player0currentEl.textContent = 0;
  player1currentEl.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

// Player switching
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

init();

// Rolling Dice button functionality
btnRollEl.addEventListener('click', function () {
  if (playing) {
    // Generate a random dice roll
    let diceRoll = Math.trunc(Math.random() * 6) + 1;
    //Display dice roll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRoll}.png`;
    // If 1 move to player 2 or add number to current score
    if (diceRoll !== 1) {
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Hold button functionality
btnHoldEl.addEventListener('click', function () {
  if (playing) {
    // Add current score to active player score
    playersTotalScores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      playersTotalScores[activePlayer];

    // Check if score >= 100, to display winner
    if (playersTotalScores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      //   If score not 100, switch player
      switchPlayer();
    }
  }
});

// Resetting the game button
btnNewEl.addEventListener('click', init);
