/* ===================== SELECT DOM ===================== */

const board = document.querySelector(".board");
const highScoreElement = document.querySelector("#highscore");
const scoreElement = document.querySelector("#score");
const timeElement = document.querySelector("#time");
const startbutton = document.querySelector(".start-btn");
const restartbutton = document.querySelector(".restart-btn");
const modal = document.querySelector(".modal");
const startGameModal = document.querySelector(".start-game");
const h3 = document.querySelector(".game-over h3");
const gameOverModel = document.querySelector(".game-over");

/* ===================== CONFIG ===================== */

const blockSize = 50;
const cols = Math.floor(board.clientWidth / blockSize);
const rows = Math.floor(board.clientHeight / blockSize);

/* ===================== SOUNDS ===================== */

const gameOverSound = [
  new Audio("sounds/gameOverSound/arebhaibhai.mp3"),
  new Audio("sounds/gameOverSound/baigan.mp3"),
  new Audio("sounds/gameOverSound/chiisasur.mp3"),
  new Audio("sounds/gameOverSound/dry-fart.mp3"),
  new Audio("sounds/gameOverSound/sad-meow-song.mp3"),
  new Audio("sounds/gameOverSound/spongebob-fail.mp3"),
];
const gameStartSound = [
  new Audio("sounds/gameStartSound/chalo.mp3"),
  new Audio("sounds/gameStartSound/chal.mp3"),
  new Audio("sounds/gameStartSound/coc.mp3"),
  new Audio("sounds/gameStartSound/startingaudio.mp3"),
  new Audio("sounds/gameStartSound/rahanhijata.mp3"),
];
const gameEatSound = [
  new Audio("sounds/gameEatSound/maja-aaya.mp3"),
  new Audio("sounds/gameEatSound/munch-sound-effect.mp3"),
  new Audio("sounds/gameEatSound/rom-rom-bhaiyo.mp3"),
  new Audio("sounds/gameEatSound/wow_anime.mp3"),
   new Audio("sounds/gameEatSound/aww.mp3"),
    new Audio("sounds/gameEatSound/nioce.mp3"),
];

/* ===================== GAME STATE ===================== */

const blocks = {};
let snake = [{ x: 1, y: 3 }];
let direction = "right";
let interval = null;
let timerIntervalId = null;

let food = generateFood();
let score = 0;
let highscore = Number(localStorage.getItem("highscore")) || 0;
let time = `00:00`;

highScoreElement.textContent = highscore;

/* ===================== CREATE GRID ===================== */

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    blocks[`${row},${col}`] = block;
  }
}

/* ===================== HELPERS ===================== */

function generateFood() {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
  } while (
    snake.some(seg => seg.x === newFood.x && seg.y === newFood.y)
  );
  return newFood;
}

function playRandomSound(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const sound = arr[randomIndex];
  sound.currentTime = 0;
  sound.play();
}

function clearBoard() {
  Object.values(blocks).forEach(block => {
    block.classList.remove("fill", "head", "food");
  });
}

function endGame() {
  playRandomSound(gameOverSound);

  clearInterval(interval);
  clearInterval(timerIntervalId);

  clearBoard();

  modal.style.display = "flex";
  startGameModal.style.display = "none";
  gameOverModel.style.display = "flex";
  h3.innerHTML = `Game Over! Score : ${score}`;
}

/* ===================== RENDER ===================== */

function render() {

  let head;

  if (direction === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction === "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  } else if (direction === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  }

  /* Wall Collision */
  if (
    head.x < 0 ||
    head.x >= rows ||
    head.y < 0 ||
    head.y >= cols
  ) {
    return endGame();
  }

  /* Self Collision */
  if (snake.some(segment =>
      segment.x === head.x && segment.y === head.y
  )) {
    return endGame();
  }

  /* Clear previous visuals */
  clearBoard();

  /* Move snake */
  snake.unshift(head);

  /* Food Check */
  if (head.x === food.x && head.y === food.y) {

    playRandomSound(gameEatSound);

    score += 10;
    scoreElement.textContent = score;

    if (score > highscore) {
      highscore = score;
      localStorage.setItem("highscore", highscore);
      highScoreElement.textContent = highscore;
    }

    food = generateFood();

  } else {
    snake.pop();
  }

  /* Draw food */
  blocks[`${food.x},${food.y}`].classList.add("food");

  /* Draw snake */
  snake.forEach((segment, index) => {
    if (index === 0) {
      blocks[`${segment.x},${segment.y}`].classList.add("head");
    } else {
      blocks[`${segment.x},${segment.y}`].classList.add("fill");
    }
  });
}

/* ===================== START GAME ===================== */

startbutton.addEventListener("click", () => {

  playRandomSound(gameStartSound);

  modal.style.display = "none";

  interval = setInterval(render, 300);

  timerIntervalId = setInterval(() => {

    let [min, sec] = time.split(":").map(Number);

    if (sec === 59) {
      min += 1;
      sec = 0;
    } else {
      sec += 1;
    }

    // format with leading zeros
    time = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    timeElement.textContent = time;

  }, 1000);
});

/* ===================== RESTART ===================== */

restartbutton.addEventListener("click", () => {

  clearInterval(interval);
  clearInterval(timerIntervalId);

  score = 0;
  time = `00:00`;

  scoreElement.textContent = score;
  timeElement.textContent = time;

  direction = "right";
  snake = [{ x: 1, y: 3 }];
  food = generateFood();

  clearBoard();

  modal.style.display = "none";

  interval = setInterval(render, 300);

  // restart the timer as well
  timerIntervalId = setInterval(() => {
    let [min, sec] = time.split(":").map(Number);
    if (sec === 59) {
      min += 1;
      sec = 0;
    } else {
      sec += 1;
    }
    time = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    timeElement.textContent = time;
  }, 1000);
});

/* ===================== CONTROLS ===================== */

addEventListener("keydown", (event) => {

  const key = event.key.toLowerCase();

  if ((key === "arrowup" || key === "w") && direction !== "down") {
    direction = "up";
  }
  else if ((key === "arrowdown" || key === "s") && direction !== "up") {
    direction = "down";
  }
  else if ((key === "arrowleft" || key === "a") && direction !== "right") {
    direction = "left";
  }
  else if ((key === "arrowright" || key === "d") && direction !== "left") {
    direction = "right";
  }
});