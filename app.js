const gameGrid = document.querySelector(".game-grid");
const miniGrid = document.querySelector(".mini-grid");
const scoreDisplay = document.querySelector("#score");
const startBtn = document.querySelector("#start-button");
const gridWidth = 10;
const gridHeight = 20;
const gridSize = gridWidth * gridHeight;
let score = 0;
let nextRandom = 0;
let timerId;

function insertGridUnits(parentElement) {
    for (let i = 0; i < gridSize; i++) {
        parentElement.appendChild(document.createElement("div"));
    }
}

insertGridUnits(gameGrid);

let squares = Array.from(document.querySelectorAll(".game-grid div"));

function identifyLastLine() {
    // adds bottom border identifier
    for (let i = 0; i < gridWidth; i++) {
        squares[gridSize - 1 - i].classList.add("last-line");
    }
}

function identifyBorders() {
    // adds right border identifier
    for (let i = 0; i < gridHeight; i++) {
        squares[gridWidth * i + gridWidth - 1].classList.add("right-border");
        squares[gridWidth * i + gridWidth - 2].classList.add("right-border");
    }

    // adds left border identifier
    for (let i = 0; i < gridHeight; i++) {
        squares[gridWidth * i].classList.add("left-border");
        squares[gridWidth * i + 1].classList.add("left-border");
    }
}

identifyLastLine();
identifyBorders();

function insertMiniGridUnits() {
    for (let i = 0; i < 16; i++) {
        miniGrid.appendChild(document.createElement("div"));
    }
}

insertMiniGridUnits();

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

// Assign functions to keyCodes
function control(e) {
    if (e.keyCode === 37 || e.keyCode === 65 || e.keyCode === 100) {
        moveLeft();
    } else if (e.keyCode === 39 || e.keyCode === 68 || e.keyCode === 102) {
        moveRight();
    } else if (e.keyCode === 40 || e.keyCode === 83 || e.keyCode === 98) {
        moveDown();
    } else if (e.keyCode === 38 || e.keyCode === 87 || e.keyCode === 104) {
        rotate();
    }
}

document.addEventListener("keyup", control);

// Move down function
function moveDown() {
    freezeTaken();
    undraw();
    currentPosition += gridWidth;
    draw();
    freezeLastLine();
}

// A function to check the condition to stop the Tetromino going down
function freezeLastLine() {
    if (current.some(gridPos => (squares[gridPos + currentPosition].classList.contains("last-line")))) { 
        current.forEach(gridPos => squares[gridPos + currentPosition].classList.add("taken"));
        // Start a new Tetromino
        currentPosition = 4;
        random = nextRandom;
        nextRandom = Math.floor(Math.random() * theTetrominoes.length);
        current = theTetrominoes[random][currentRotation];
        draw();
        displayMiniShape();
        addScore();
    }
}

function freezeTaken() {
    if (current.some(gridPos => (squares[gridPos + currentPosition + gridWidth].classList.contains("taken")))) {
        current.forEach(gridPos => squares[gridPos + currentPosition].classList.add("taken"));
        // Start a new Tetromino
        currentPosition = 4;
        random = nextRandom;
        nextRandom = Math.floor(Math.random() * theTetrominoes.length);
        current = theTetrominoes[random][currentRotation];
        draw();
        displayMiniShape();
        addScore();
        gameOver();
    }
}

function isAtLeftEdge() {
    return current.some(gridPos => (gridPos + currentPosition) % gridWidth === 0);
}

function isLeftTaken() {
    return current.some(gridPos => squares[gridPos + currentPosition - 1].classList.contains("taken"));
}

function isAtRightEdge() {
    return current.some(gridPos => (gridPos + currentPosition) % gridWidth === gridWidth - 1);
}

function isRightTaken() {
    return current.some(gridPos => squares[gridPos + currentPosition + 1].classList.contains("taken"));
}

// Move Tetromino left, unless it is at the edge or there is a blockage
function moveLeft() {
    undraw();

    if(!isAtLeftEdge() && !isLeftTaken()) {
        currentPosition -= 1;
    }

    draw();
}

// Move Tetromino right, unless it is at the edge or there is a blockage
function moveRight() {
    undraw();

    if(!isAtRightEdge() && !isRightTaken()) {
        currentPosition += 1;
    }

    draw();
}

function rightBorderChecker() {
    return current.some(gridPos => squares[gridPos + currentPosition].classList.contains("right-border"));
}

function leftBorderChecker() {
    return current.some(gridPos => squares[gridPos + currentPosition].classList.contains("left-border"));
}

function checkOverlap() {
    return current.some(gridPos => squares[gridPos + currentPosition].classList.contains("taken"));
}

// Rotate the Tetromino
function rotate() {
    undraw();
    currentRotation++;

    if(currentRotation == theTetrominoes[random].length) {
        currentRotation = 0;
    }

    const rightEdger = rightBorderChecker();
    const leftEdger = leftBorderChecker();

    current = theTetrominoes[random][currentRotation];

    if (checkOverlap()) {
        currentRotation--;
        if(currentRotation < 0) {
            currentRotation = theTetrominoes[random].length - 1;
        }
        current = theTetrominoes[random][currentRotation];
    } else {

        let posAcc = 0;

        while(rightEdger && leftBorderChecker()) {
            if(isLeftTaken()) {
                currentPosition -= posAcc;
                currentRotation--;
                if(currentRotation < 0) {
                    currentRotation = theTetrominoes[random].length - 1;
                }
                current = theTetrominoes[random][currentRotation];
                break;
            } else {
                currentPosition--;
                posAcc--;
            }
        }
    
        while(leftEdger && rightBorderChecker()) {
            if(isRightTaken()) {
                currentPosition -= posAcc;
                currentRotation--;
                if(currentRotation < 0) {
                    currentRotation = theTetrominoes[random].length - 1;
                }
                current = theTetrominoes[random][currentRotation];
                break;
            } else {
                currentPosition++;
                posAcc++;
            }
        }

    }

    draw();
}

// Display up-next Tetromino in mini-grid

const miniSquares = document.querySelectorAll(".mini-grid div");
const miniWidth = 4;
const miniHeight = 4;
const miniGridPos = 0;

//the Tetrominos without rotations
const upNextTetromino = [
    [1, miniWidth + 1, miniWidth * 2 + 1, 2], // lTetromino
    [miniWidth * 2, miniWidth + 1, miniWidth * 2 + 1, miniWidth + 2], // zTetromino
    [miniWidth, 1, miniWidth + 1, miniWidth + 2], // tTetromino
    [0, 1, miniWidth, miniWidth + 1], // oTetromino
    [1, miniWidth + 1, miniWidth * 2 + 1, miniWidth * 3 + 1]  // iTetromino
];

function displayMiniShape() {
    //remove previous Tetromino form
    miniSquares.forEach(gridPos => {
        gridPos.classList.remove("tetromino");
    })
    upNextTetromino[nextRandom].forEach(gridPos => miniSquares[gridPos + miniGridPos].classList.add("tetromino"));
}

// add functionality to the button
startBtn.addEventListener("click", () => {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    } else {
        draw();
        timerId = setInterval(moveDown, 500);
        nextRandom = Math.floor(Math.random() * theTetrominoes.length);
        displayMiniShape();
    }
})

// add score
function addScore() {
    for (let i = 0; i < gridSize - 1; i += gridWidth) {
        const row = [];

        // fill roll positions to be analyzed
        for (let j = 0; j < gridWidth; j++) {
            row.push(i + j);
        }

        if (row.every(gridPos => squares[gridPos].classList.contains("taken"))) {
            score += 10;
            scoreDisplay.textContent = score.toString();
            row.forEach(gridPos => {
                squares[gridPos].classList.remove("taken", "last-line", "tetromino");
            })
            const squaresRemoved = squares.splice(i, gridWidth);
            squares = squaresRemoved.concat(squares);
            squares.forEach(cell => gameGrid.appendChild(cell));
            identifyLastLine();
        }
    }
}

// Game Over
function gameOver() {
    if (current.some(gridPos => squares[gridPos + currentPosition].classList.contains("taken"))) {
        scoreDisplay.textContent = "Game Over";
        clearInterval(timerId);
    }
}