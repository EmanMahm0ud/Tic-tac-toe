let winCases = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
let availableCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let player = "X";
let competitor = "O";
let winner = 0; // 0 draw, 1 player won, -1 compatitor won
let flag = false;

let cells = document.querySelectorAll(".row .cell");

for (let i = 0 ; i < cells.length ; i++) {
    cells[i].addEventListener('click', function(event) {
        let x = event.target.innerText;

        if (x === "?") {
            cells[i].innerHTML = `<p>${player}</p>`;
            removeFromAvalible(i);
            checkWinner();
            
            if (winner === 0) {
                setTimeout(() => {
                    competitorTurn();
                    checkWinner();
                }, 500);
            }
        }
    })
}

function checkWinner() {
    for (let i = 0 ; i < winCases.length ; i++) {
        // subtract from 1 to reach 0-based index
        let a = winCases[i][0] - 1;
        let b = winCases[i][1] - 1;
        let c = winCases[i][2] - 1;

        if (cells[a].innerText !== "?" && cells[a].innerText === cells[b].innerText && cells[b].innerText === cells[c].innerText) {
            if (cells[a].innerText === player) {
                winner = 1;
            } else if (cells[a].innerText === competitor) {
                winner = -1;
            }
            endGame();
            return 1;
        }
    }
    return 0;
}

function competitorTurn() {

    // base case
    if (availableCells.length === 0) {
        endGame();
        return;
    }

    for (let i = 0 ; i < winCases.length ; i++) {

        // subtract from 1 to reach 0-based index
        let a = winCases[i][0] - 1;
        let b = winCases[i][1] - 1;
        let c = winCases[i][2] - 1;

        // compatitor win situations
        if (cells[a].innerText === cells[b].innerText && cells[b].innerText === competitor && cells[c].innerText === "?") {
            cells[c].innerHTML = `<p>${competitor}</p>`;
            removeFromAvalible(c);
            return;
        } else if (cells[a].innerText === cells[c].innerText && cells[c].innerText === competitor && cells[b].innerText === "?") {
            cells[b].innerHTML = `<p>${competitor}</p>`;
            removeFromAvalible(b);
            return;
        } else if (cells[b].innerText === cells[c].innerText && cells[c].innerText === competitor && cells[a].innerText === "?") {
            cells[a].innerHTML = `<p>${competitor}</p>`;
            removeFromAvalible(a);
            return;
        }
    }

    for (let i = 0 ; i < winCases.length ; i++) {
        // subtract from 1 to reach 0-based index
        let a = winCases[i][0] - 1;
        let b = winCases[i][1] - 1;
        let c = winCases[i][2] - 1;

        // player win situations
        if (cells[a].innerText === cells[b].innerText && cells[b].innerText === player && cells[c].innerText === "?") {
            cells[c].innerHTML = `<p>${competitor}</p>`;
            removeFromAvalible(c);
            return;
        } else if (cells[a].innerText === cells[c].innerText && cells[c].innerText === player && cells[b].innerText === "?") {
            cells[b].innerHTML = `<p>${competitor}</p>`;
            removeFromAvalible(b);
            return;
        } else if (cells[b].innerText === cells[c].innerText && cells[c].innerText === player && cells[a].innerText === "?") {
            cells[a].innerHTML = `<p>${competitor}</p>`;
            removeFromAvalible(a);
            return;
        }
    }

    // no winning situations
    randomIndex = Math.floor(Math.random()*availableCells.length);

    if (cells[availableCells[randomIndex]].innerText === "?") {
        cells[availableCells[randomIndex]].innerHTML = `<p>${competitor}</p>`;
        removeFromAvalible(availableCells[randomIndex]);
    }
}

function removeFromAvalible(value) {
    let index = availableCells.indexOf(value);
    if (index !== -1) {
        availableCells.splice(index, 1);
    }
}

function endGame() {
    let playagainWindow = document.getElementById("playagain-window");
    playagainWindow.style.visibility = "visible";

    if (winner === 0) {
        document.getElementById("result").innerText = "Draw!";
    } else if (winner === 1) {
        document.getElementById("result").innerText = "Yahoo!";
    } else if (winner === -1) {
        document.getElementById("result").innerText = "Oh..oh!";
    }
}

let xSymbole = document.getElementById("x-symbole");
let oSymbole = document.getElementById("o-symbole");

xSymbole.addEventListener('click', function(event) {
    xSymbole.style.boxShadow = "0 0 10px #F4AAB9";
    oSymbole.style.boxShadow = "none";
    player = "X";
    competitor = "O";
});

oSymbole.addEventListener('click', function(event) {
    oSymbole.style.boxShadow = "0 0 10px #F4AAB9";
    xSymbole.style.boxShadow = "none";
    player = "O";
    competitor = "X";
});

document.getElementById("play").addEventListener('click', function(event) {
    let playWindow = document.getElementById("play-window");
    playWindow.style.visibility = "hidden";
});

document.getElementById("again").addEventListener('click', function(event) {
    let playagainWindow = document.getElementById("playagain-window");
    playagainWindow.style.visibility = "hidden";
    reset();
});

function reset() {
    availableCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    winner = 0;

    for (let i = 0 ; i < cells.length ; i++) {
        cells[i].innerHTML = `<p>?</p>`;
    }
}