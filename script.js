"use strict";

//Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1"); //other way to select queries,it's faster than querySelector
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//Starting Conditions
let scores, currentScore, activePlayer, playing;
const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add("hidden"); //Hiding the dice at starting
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
//Rolling Dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. display dice
    diceEl.classList.remove("hidden"); //First removing hidden class
    diceEl.src = `dice-${dice}.png`;

    // check for rolled 1,if true,switch to next player
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1. Add current Score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if score is less than 100,then finish game ,if not then
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");

      document.querySelector(`.player--${activePlayer}`).classList.add(
        "player--winner",
      );
      document.querySelector(`.player--${activePlayer}`).classList.remove(
        "player--active",
      );
    } else {
      // switch to next player after hold
      switchPlayer();
    }
  }
});

//Resetting the game
btnNew.addEventListener("click", init);
