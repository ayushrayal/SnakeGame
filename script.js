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
const blockHeight = 50;
const blockWidth = 50;
const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);
const startSound = new Audio("sounds/startingaudio.mp3");
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
  new Audio("sounds/gameEatSound/rom-rom-vhaiyo.mp3"),
  new Audio("sounds/gameEatSound/wow_anime.mp3"),
   new Audio("sounds/gameEatSound/aww.mp3"),
    new Audio("sounds/gameEatSound/nioce.mp3"),
];
const blocks = [];
let snake = [
  {
    x: 1,
    y: 3,
  },
];
let direction = "right";
let interval = null;
let timerIntervalId = null;
let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};
let score = 0;
let highscore = localStorage.getItem("highscore") || 0;
let time = `00-00`;
highScoreElement.textContent = highscore;
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    blocks[`${row},${col}`] = block;
  }
}
function gameFinishSounds() {
  const randomIndex = Math.floor(Math.random() * gameOverSound.length);
  const sound = gameOverSound[randomIndex];
  sound.currentTime = 0;
  sound.play();
}
function gameStartSounds() {
  const randomIndex = Math.floor(Math.random() * gameStartSound.length);
  const sound = gameStartSound[randomIndex];
  sound.currentTime = 0;
  sound.play();
}
function gameEatSounds() {
  const randomIndex = Math.floor(Math.random() * gameEatSound.length);
  const sound = gameEatSound[randomIndex];
  sound.currentTime = 0;
  sound.play();
}
function render() {
  blocks[`${food.x},${food.y}`].classList.add("food");
  let head = null;
  if (direction === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction === "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  } else if (direction === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  }

  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
    gameFinishSounds();
    clearInterval(interval);
    modal.style.display = "flex";
    startGameModal.style.display = "none";
    gameOverModel.style.display = "flex";
    h3.innerHTML = `Game over your score is : ${score}`;
    return;
  }

  if (head.x == food.x && head.y == food.y) {
    gameEatSounds();
    blocks[`${food.x},${food.y}`].classList.remove("food");
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
    blocks[`${food.x},${food.y}`].classList.remove("food");
    snake.unshift(head);
    score += 10;
    scoreElement.textContent = score;
    if (score > highscore) {
      highscore = score;
      localStorage.setItem("highscore", highscore.toString());
    }
  }

  snake.forEach((segment) => {
    blocks[`${segment.x},${segment.y}`].classList.remove("fill");
  });
  snake.unshift(head);
  snake.pop();

  snake.forEach((segment) => {
    blocks[`${segment.x},${segment.y}`].classList.add("fill");
  });
}

startbutton.addEventListener("click", () => {
  gameStartSounds();
  modal.style.display = "none";
  interval = setInterval(() => {
    render();
  }, 300);
  timerIntervalId = setInterval(() => {
    let [min, sec] = time.split("-").map(Number);
    if (sec == 59) {
      min += 1;
      sec = 0;
    } else {
      sec += 1;
    }
    time = `${min}-${sec}`;
    timeElement.textContent = time;
  }, 1000);
});
restartbutton.addEventListener("click", restartGame);

function restartGame() {
  gameStartSounds()
  blocks[`${food.x},${food.y}`].classList.remove("food");
  snake.forEach((segment) => {
    blocks[`${segment.x},${segment.y}`].classList.remove("fill");
  });
  score = 0;
  time = `00-00`;
  highScoreElement.textContent = highscore;
  scoreElement.textContent = score;
  timeElement.textContent = time;
  modal.style.display = "none";
  direction = "down";
  snake = [{ x: 1, y: 3 }];
  food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols),
  };
  interval = setInterval(() => {
    render();
  }, 300);
}

addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    direction = "up";
  } else if (event.key === "ArrowDown") {
    direction = "down";
  } else if (event.key === "ArrowRight") {
    direction = "right";
  } else if (event.key === "ArrowLeft") {
    direction = "left";
  }
});
