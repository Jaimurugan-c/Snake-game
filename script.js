const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const box = 20; // Size of snake segment
let snake = [{ x: 200, y: 200 }];
let food = { x: 100, y: 100 };
let dx = box;
let dy = 0;
let gameOver = false;

// Function to draw the snake
function drawSnake() {
    ctx.fillStyle = "lime";
    snake.forEach((part) => {
        ctx.fillRect(part.x, part.y, box, box);
    });
}

// Function to draw food
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
}

// Function to update the snake's movement
function update() {
    if (gameOver) return;

    let head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Check collision with walls
    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height) {
        gameOver = true;
        alert("Game Over! Refresh to restart.");
        return;
    }

    // Check collision with itself
    for (let part of snake) {
        if (head.x === part.x && head.y === part.y) {
            gameOver = true;
            alert("Game Over! Refresh to restart.");
            return;
        }
    }

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
        food = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box,
        };
    } else {
        snake.pop(); // Remove tail
    }

    snake.unshift(head); // Add new head
}

// Function to change direction
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && dy === 0) {
        dx = 0;
        dy = -box;
    } else if (e.key === "ArrowDown" && dy === 0) {
        dx = 0;
        dy = box;
    } else if (e.key === "ArrowLeft" && dx === 0) {
        dx = -box;
        dy = 0;
    } else if (e.key === "ArrowRight" && dx === 0) {
        dx = box;
        dy = 0;
    }
});

// Game loop
function gameLoop() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawFood();
        drawSnake();
        update();
    }
    setTimeout(gameLoop, 100);
}

gameLoop();