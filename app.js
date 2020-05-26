const gameGrid = document.querySelector(".game-grid");
const scoreDisplay = document.querySelector("#score");
const startBtn = document.querySelector("#start-button");
const gridWidth = 10;
const gridHeight = 20;
const gridSize = gridWidth * gridHeight;

function insertGridUnits(parentElement) {
    for (let i = 0; i < gridSize; i++) {
        parentElement.appendChild(document.createElement("div"));
    }
}

insertGridUnits(gameGrid);

let squares = Array.from(document.querySelectorAll(".game-grid div"));

function identifyLastLine() {
    for (let i = 0; i < gridWidth; i++) {
        squares[gridSize - 1 - i].classList.add("last-line");
    }
}

identifyLastLine();

// Tetrominoes Forms

const lTetromino = [
    [1, gridWidth + 1, gridWidth * 2 + 1, 2],
    [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth * 2 + 2],
    [gridWidth * 2, 1, gridWidth + 1, gridWidth * 2 + 1],
    [gridWidth, gridWidth * 2, gridWidth * 2 + 1, gridWidth * 2 + 2]
];

const zTetromino = [
    [gridWidth * 2, gridWidth + 1, gridWidth * 2 + 1, gridWidth + 2],
    [0, gridWidth, gridWidth + 1, gridWidth * 2 + 1],
    [gridWidth * 2, gridWidth + 1, gridWidth * 2 + 1, gridWidth + 2],
    [0, gridWidth, gridWidth + 1, gridWidth * 2 + 1]
];

const tTetromino = [
    [gridWidth, 1, gridWidth + 1, gridWidth + 2],
    [1, gridWidth + 1, gridWidth * 2 + 1, gridWidth + 2],
    [gridWidth, gridWidth + 1, gridWidth * 2 + 1, gridWidth + 2],
    [gridWidth, 1, gridWidth + 1, gridWidth * 2 + 1]
];

const oTetromino = [
    [0, 1, gridWidth, gridWidth + 1],
    [0, 1, gridWidth, gridWidth + 1],
    [0, 1, gridWidth, gridWidth + 1],
    [0, 1, gridWidth, gridWidth + 1],
];

const iTetromino = [
    [1, gridWidth + 1, gridWidth * 2 + 1, gridWidth * 3 + 1],
    [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth + 3],
    [1, gridWidth + 1, gridWidth * 2 + 1, gridWidth * 3 + 1],
    [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth + 3]
];

const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

let currentPosition = 4;
let currentRotation = 0;

// Randomly select a Tetromino and its first rotation
let random = Math.floor(Math.random() * theTetrominoes.length);
let current = theTetrominoes[random][currentRotation];

// Draw the Tetromino
function draw() {
    current.forEach(gridPos => {
        squares[currentPosition + gridPos].classList.add("tetromino");
    })
}

// Undraw the Tetromino
function undraw() {
    current.forEach(gridPos => {
        squares[currentPosition + gridPos].classList.remove("tetromino");
    })
}

// Make the Tetromino move down every second
const timerId = setInterval(moveDown, 100);

// Move down function
function moveDown() {
    undraw();
    currentPosition += gridWidth;
    draw();
    freeze();
}

// A function to check the condition to stop the Tetromino going down
function freeze() {
    if (current.some(gridPos => (squares[gridPos + currentPosition].classList.contains("last-line") || squares[gridPos + currentPosition + gridWidth].classList.contains("taken")))) {
        current.forEach(gridPos => squares[gridPos + currentPosition].classList.add("taken"));
        // Start a new Tetromino
        currentPosition = 4;
        random = Math.floor(Math.random() * theTetrominoes.length);
        current = theTetrominoes[random][currentRotation];
        draw();
    }
}