const NUMBER_OF_ROWS = 3;
const NUMBER_OF_COLUMNS = 3;

const PLAYER_ONE_TOKEN = 'X';
const PLAYER_TWO_TOKEN = 'O';
const EMPTY_TOKEN = '-';

let replayBtn$ = document.querySelector('#replay');
replayBtn$.addEventListener('click', init);

let currentPlayer;

init();

function init() {
    cleanBoard();
    printBoard();
    switchPlayer(1);
}

function cleanBoard() {
    let board$ = document.querySelector('#board');
    board$.innerHTML = '';
}

function printBoard() {
    let board$ = document.querySelector('#board');
    for(let i = 0; i < NUMBER_OF_ROWS; i++) {
        let tr$ = document.createElement('tr');
        for(let j = 0; j < NUMBER_OF_COLUMNS; j++) {
            let td$ = document.createElement('td');
            td$.textContent = EMPTY_TOKEN;
            td$.addEventListener('click', placeToken);
            tr$.appendChild(td$);
        }
        board$.appendChild(tr$);
    }
}

function getBoardArray() {
    let board$ = document.querySelector('#board');
    let trs$ = board$.querySelectorAll('tr');
    let boardArray = [];
    for(let tr$ of trs$) {
        let tds$ = tr$.querySelectorAll('td');
        let row = [];
        for(let td$ of tds$) {
            row.push(td$.textContent);
        }

        boardArray.push(row);
    }

    return boardArray;
}

function placeToken() {
    if(this.textContent === EMPTY_TOKEN) {
        this.textContent = currentPlayer === 1 ? PLAYER_ONE_TOKEN : PLAYER_TWO_TOKEN;
        if(checkWinPro()) {
            showMessage('ha ganado el jugador ' + currentPlayer);
        } else if(checkEven()) {
            showMessage('habeis empatado');    
        } else {
            let newPlayer = currentPlayer === 1 ? 2 : 1;
            switchPlayer(newPlayer);
        }
    }
}

function switchPlayer(newPlayer) {
    currentPlayer = newPlayer;
    let title$ = document.querySelector('#currentPlayer');
    title$.textContent = 'Jugador ' + currentPlayer;
}

/*
function getBoardArray2() {
    let board$ = document.querySelector('#board');
    let tds$ = board$.querySelectorAll('td');
    let boardArray = [];
    let row = [];
    for(let i = 0; i < tds$.length; i++) {
        row.push(tds$[i].textContent);
        if((i + 1) % NUMBER_OF_COLUMNS === 0) {
            boardArray.push(row);
            row = [];
        }
    }
    return boardArray;
}
*/

function checkEven() {
    let boardArray = getBoardArray();
    for(let row of boardArray) {
        for(let cell of row) {
            if(cell === EMPTY_TOKEN) {
                return false;
            }
        }
    }

    return true;
}

function showMessage(msg) {
    setTimeout(function() {
        alert(msg);
    }, 100);
}

function checkWin() {
    let boardArray = getBoardArray();
    if(boardArray[0][0] !== EMPTY_TOKEN) {
        if(boardArray[0][0] === boardArray[0][1] && boardArray[0][0] === boardArray[0][2]) {
            return true;
        }
        if(boardArray[0][0] === boardArray[1][0] && boardArray[0][0] === boardArray[2][0]) {
            return true;
        }
        if(boardArray[0][0] === boardArray[1][1] && boardArray[0][0] === boardArray[2][2]) {
            return true;
        }
    }
    if(boardArray[0][1] !== EMPTY_TOKEN) {
        if(boardArray[0][1] === boardArray[1][1] && boardArray[0][1] === boardArray[2][1]) {
            return true;
        }
    }
    if(boardArray[0][2] !== EMPTY_TOKEN) {
        if(boardArray[0][2] === boardArray[1][2] && boardArray[0][2] === boardArray[2][2]) {
            return true;
        }
        if(boardArray[0][2] === boardArray[1][1] && boardArray[0][2] === boardArray[2][0]) {
            return true;
        }
    }
    if(boardArray[1][0] !== EMPTY_TOKEN) {
        if(boardArray[1][0] === boardArray[1][1] && boardArray[1][0] === boardArray[1][2]) {
            return true;
        }
    }
    if(boardArray[2][0] !== EMPTY_TOKEN) {
        if(boardArray[2][0] === boardArray[2][1] && boardArray[2][0] === boardArray[2][2]) {
            return true;
        }
    }
    return false;
}

function checkWinPro() {
    let boardArray = getBoardArray();
    for(let r = 0; r < boardArray.length; r++) {
        for(let c = 0; c < boardArray[r].length; c++) {
            if(boardArray[r][c] !== EMPTY_TOKEN) {
                //Horizontal
                if(c - 2 >= 0 && boardArray[r][c-2] === boardArray[r][c-1] && boardArray[r-2] === boardArray[r][c]) {
                    return true;
                }
                if(c - 1 >= 0 && c + 1 < boardArray[r].length && boardArray[r][c-1] === boardArray[r][c] && boardArray[r][c] === boardArray[r][c+1]) {
                    return true;
                }
                if(c + 2 < boardArray[r].length && boardArray[r][c] === boardArray[r][c+1] && boardArray[r][c] === boardArray[r][c+2]) {
                    return true;
                }

                //Vertical
                if(r - 2 >= 0 && boardArray[r-2][c] === boardArray[r-1][c] && boardArray[r-1][c] === boardArray[r][c]) {
                    return true;
                }
                if(r - 1 >= 0 && r + 1 < boardArray.length && boardArray[r-1][c] === boardArray[r][c] && boardArray[r][c] === boardArray[r+1][c]) {
                    return true;
                }
                if(r + 2 < boardArray.length && boardArray[r][c] === boardArray[r+1][c] && boardArray[r][c] === boardArray[r+2][c]) {
                    return true;
                }

                //Diagonal left up to right down
                if(r - 2 >= 0 && c - 2 >= 0 && boardArray[r-2][c-2] === boardArray[r-1][c-1] && boardArray[r-1][c-1] === boardArray[r][c]) {
                    return true;
                }
                if(r - 1 >= 0 && r + 1 < boardArray.length && c - 1 >= 0 && c + 1 < boardArray[r].length && boardArray[r-1][c-1] === boardArray[r][c] && boardArray[r][c] === boardArray[r+1][c+1]) {
                    return true;
                }
                if(r + 2 < boardArray.length && c + 2 < boardArray[r].length && boardArray[r][c] === boardArray[r+1][c+1] && boardArray[r][c] === boardArray[r+2][c+2]) {
                    return true;
                }

                //Diagonal left down to right up
                if(r - 2 >= 0 && c + 2 < boardArray[r].length && boardArray[r-2][c+2] === boardArray[r-1][c+1] && boardArray[r-1][c+1] === boardArray[r][c]){
                    return true;
                }
                if(r - 1 >= 0 && r + 1 < boardArray.length && c - 1 >= 0 && c + 1 < boardArray[r].length && boardArray[r-1][c+1] === boardArray[r][c] && boardArray[r][c] === boardArray[r+1][c-1]) {
                    return true;
                }
                if(r + 2 < boardArray.length && c - 2 >= 0 && boardArray[r][c] === boardArray[r+1][c-1] && boardArray[r][c] === boardArray[r+2][c-2]) {
                    return true;
                }
            }
        }
    }

    return false;
}