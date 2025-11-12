const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const restartBtn = document.getElementById("restartBtn");
const scoreDisplay = document.getElementById("scoreDisplay");

const gridSize = 20;
let snake, direction, food, score, game;

// 🧠 Keyboard controls
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && direction !== "down") direction = "up";
  if (e.key === "ArrowDown" && direction !== "up") direction = "down";
  if (e.key === "ArrowLeft" && direction !== "right") direction = "left";
  if (e.key === "ArrowRight" && direction !== "left") direction = "right";
});

// 🟩 Draw snake
function drawSnake() {
  snake.forEach((segment) => {
    ctx.fillStyle = "#00ff88";
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  });
}

// 🍎 Draw food
function drawFood() {
  ctx.fillStyle = "#ff0044";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// 🎯 Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let head = snake[0];
  let newHead = { x: head.x, y: head.y };

  if (direction === "up") newHead.y -= 1;
  if (direction === "down") newHead.y += 1;
  if (direction === "left") newHead.x -= 1;
  if (direction === "right") newHead.x += 1;

  // 🧱 Wall collision
  if (
    newHead.x < 0 ||
    newHead.y < 0 ||
    newHead.x >= canvas.width / gridSize ||
    newHead.y >= canvas.height / gridSize
  ) {
    clearInterval(game);
    alert(`Game Over! You hit the wall!
     Your score: ${score}`);
    score = 0;
    document.getElementById("scoreDisplay").textContent = "Score: 0";
    
    return;
  }

  // 🐍 Self collision
  for (let segment of snake) {
    if (segment.x === newHead.x && segment.y === newHead.y) {
        clearInterval(game);
        alert("Game Over! You hit yourself!");
        score = 0;
        document.getElementById("scoreDisplay").textContent = "Score: 0";
      endGame("You hit yourself!");
      return;
    }
  }

  // 🧩 Move snake
  snake.unshift(newHead);

  // 🍎 Food eaten?
  if (newHead.x === food.x && newHead.y === food.y) {
    score++;
    scoreDisplay.textContent = "Score: " + score;
    food = randomFood();
  } else {
    snake.pop();
  }

  // 🖼️ Draw everything
  drawFood();
  drawSnake();
}

// 🎮 Start or Restart game
function resetGame() {
  snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ];
  direction = "right";
  food = randomFood();
  score = 0;
  scoreDisplay.textContent = "Score: 0";

  if (game) clearInterval(game);
  game = setInterval(gameLoop, 150);
}

// 🍏 Random food position
function randomFood() {
  return {
    x: Math.floor(Math.random() * (canvas.width / gridSize)),
    y: Math.floor(Math.random() * (canvas.height / gridSize)),
  };
}

// 💀 End game
function endGame(message) {
  clearInterval(game);
  alert("Game Over! " + message + "\nYour Score: " + score);
}

// 🔘 Restart button event
restartBtn.addEventListener("click", resetGame);

// 🚀 Start the game initially
resetGame();
