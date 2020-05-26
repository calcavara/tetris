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

console.log(squares);

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