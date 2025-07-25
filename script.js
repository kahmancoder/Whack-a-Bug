"use strict";
(function () {
  window.addEventListener("load", init);

  const TOTAL_BUGS = 8;
  const GAME_DURATION = 15; // secondes
  let score = 0;
  let timeLeft = GAME_DURATION;
  let timerId;
  let restartBtn;

  function init() {
    restartBtn = id("restart-btn");
    restartBtn.addEventListener("click", resetGame);

    let bugs = qsa("#bug-container img");
    for (let bug of bugs) {
      bug.addEventListener("click", whackBug);
    }

    updateScore(0);
    updateTimer(GAME_DURATION);
    restartBtn.classList.add("hidden");

    startTimer();
  }

  function startTimer() {
    timerId = setInterval(() => {
      timeLeft--;
      updateTimer(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(timerId);
        endGame();
      }
    }, 1000);
  }

  function whackBug(event) {
    let bug = event.target;

    if (!bug.classList.contains("whacked")) {
      bug.classList.add("whacked");
      bug.src = "bug-whacked.png";

      score++;
      updateScore(score);

      if (score === TOTAL_BUGS) {
        clearInterval(timerId);
        displayVictory();
      }
    }
  }

  function displayVictory() {
    qs("#game p").textContent = "Félicitations ! Tous les cafards ont été éliminés à temps !";
    restartBtn.classList.remove("hidden");
  }

  function endGame() {
    if (score < TOTAL_BUGS) {
      qs("#game p").textContent = "⏱ Temps écoulé ! Vous avez éliminé " + score + " cafards sur 8.";
      restartBtn.classList.remove("hidden");
    }
  }

  function resetGame() {
    score = 0;
    timeLeft = GAME_DURATION;
    updateScore(score);
    updateTimer(timeLeft);
    restartBtn.classList.add("hidden");

    let message = qs("#game p");
    message.textContent = "Score : " + score + " | Temps restant : " + timeLeft + "s";

    let bugs = qsa("#bug-container img");
    for (let bug of bugs) {
      bug.classList.remove("whacked");
      bug.src = "bug.png";
    }

    startTimer();
  }

  function updateScore(val) {
    id("score").textContent = val;
  }

  function updateTimer(val) {
    id("timer").textContent = val;
  }

  function id(name) {
    return document.getElementById(name);
  }

  function qs(selector) {
    return document.querySelector(selector);
  }

  function qsa(selector) {
    return document.querySelectorAll(selector);
  }
})();
