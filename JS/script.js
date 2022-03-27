/* ---- Global variables initialization ---- */

// if the player reaches one of these cases, he'll win
const winCases = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
let availableCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];  // all current possible cells
let player = "X";      // default value 'X' for the player
let competitor = "O";  // default value 'O' for the competitor
let winner = 0;        // 0 draw, 1 player won, -1 compatitor won
let cells = document.querySelectorAll(".row .cell");

// the position of the line to make animation 
// values: [width, top, left, transform] 
const linePostions = [["345px", "70px", "25px", "rotate(0deg)"], ["345px", "196px", "25px", "rotate(0deg)"], ["345px", "322px", "25px", "rotate(0deg)"],
                      ["345px", "75px", "25px", "rotate(90deg)"], ["345px", "25px", "200px", "rotate(90deg)"], ["345px", "25px", "325px", "rotate(90deg)"],
                      ["470px", "30px", "30px",  "rotate(45deg)"], ["470px", "360px", "30px",  "rotate(-45deg)"]];

/* ---- End of initializing global variables ---- */
/* ---------------------------------------------- */

// looping on all cells to listen for mouse click
for (let i = 0 ; i < cells.length ; i++) {
    cells[i].addEventListener('click', function(event) {
        let cell = event.target.innerText;

        if (cell === "?") {
            cells[i].innerHTML = `<p>${player}</p>`;
            removeFromAvalible(i);

            // if no winner then the competitor plays
            if (checkWinner() === 0) {
                setTimeout(() => {
                    competitorTurn();
                    checkWinner();
                }, 500);
            }
        }
    })
}

/* ------ functions ------ */

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
            lineAnimation(i)
            setTimeout(() => {endGame();}, 2000);
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

// remove the index of the cell that is no longer be available 
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

function reset() {
    availableCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    winner = 0;

    for (let i = 0 ; i < cells.length ; i++) {
        cells[i].innerHTML = `<p>?</p>`;
    }

    let line = document.getElementById("line");
    line.style.opacity = "0";
    line.style.width = "0";
}


function lineAnimation(i) {
    let line = document.getElementById("line");
    line.style.opacity = "1";
    line.style.width = linePostions[i][0];
    line.style.top = linePostions[i][1];
    line.style.left = linePostions[i][2];
    line.style.transform = linePostions[i][3];
}

/* -------- buttons actions -------- */

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