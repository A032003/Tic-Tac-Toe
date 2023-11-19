const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;
let gameOver = false;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;

    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index + 1}`;
    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

    if (currentPlayer === "O") {
        // Computer makes the first move
        makeComputerMove();
    }
}

initGame();

function swapTurn() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let winner = null;

    winningPositions.forEach((position) => {
        const [a, b, c] = position;

        if (gameGrid[a] && gameGrid[a] === gameGrid[b] && gameGrid[a] === gameGrid[c]) {
            winner = gameGrid[a];
            boxes[a].classList.add("win");
            boxes[b].classList.add("win");
            boxes[c].classList.add("win");
        }
    });

    if (winner) {
        gameInfo.innerText = `Winner Player - ${winner}`;
        gameOver = true;
        newGameBtn.classList.add("active");
        return;
    }

    if (!gameGrid.includes("") && !winner) {
        gameInfo.innerText = "Game Tie!";
        gameOver = true;
        newGameBtn.classList.add("active");
    }
}

function makeComputerMove() {
    if (!gameOver) {
        const availableMoves = gameGrid.reduce((acc, cell, index) => {
            if (!cell) acc.push(index);
            return acc;
        }, []);

        if (availableMoves.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableMoves.length);
            const computerMoveIndex = availableMoves[randomIndex];

            setTimeout(() => {
                handleClick(computerMoveIndex);
            }, 700); 
        }
    }
}

function handleClick(index) {
    if (gameGrid[index] === "" && !gameOver) {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        checkGameOver();
        if (!gameOver) {
            swapTurn();
            if (currentPlayer === "O") {
                makeComputerMove();
            }
        }
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});

newGameBtn.addEventListener("click", initGame);

