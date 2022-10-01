// switching to dark and light mode
document.querySelector(".btn").addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
      document.querySelector(".btn").innerHTML = "Light";
    } else {
      document.querySelector(".btn").innerHTML = "Dark";
    }
});

//initialize board and moves history
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
];
let moves = [];
let turnNow = '';
let squares = Array.from(document.querySelectorAll('.box'));
let maxTurn = 0;
let movesIndex = 0;
// let isEndGame = false;

//function who will go first
function whoseTurn(){
    turnNow = prompt('Who will go first?');
    while(true){
        if(turnNow === 'X' || turnNow === 'O'){
            document.querySelector(".turnNow").textContent = turnNow + ' is playing';
            break;
        }
        turnNow = prompt('Who will go first? Please enter X or O');
    }
}

//function that will switch X and O
function switchTurn(turnNow){
    if(turnNow === 'X'){
        return 'O';
    }
    else if(turnNow === 'O'){
        return 'X';
    }
}

//reset the board
document.querySelector(".restart").addEventListener("click", () => {
    // board = [
    //     ['', '', ''],
    //     ['', '', ''],
    //     ['', '', ''],
    // ];
    // moves = [];
    // maxTurn = 0;
    // movesIndex = 0;
    // document.querySelector(".previousMove").classList.add('hidden');
    // document.querySelector(".nextMove").classList.add('hidden');
    // for(let i = 0; i < squares.length; i++){
    //     squares[i].classList.remove('win');
    // }
    // startGame();
    location.reload();
});

//function that will print board to the grid
function printTicTacToeBoard(board){
    let indexSquare = 0;
    for(i = 0; i < board.length; i++){
        for(j = 0; j < board[i].length; j++){
            squares[indexSquare].textContent = board[i][j];
            indexSquare += 1;
        }
    }
}

//putting the input to the appropriate place in squares and board as well as saving to moves array
function startGame(){
    printTicTacToeBoard(board);
    whoseTurn();
    for(let i = 0; i < squares.length; i++){
        squares[i].onclick = function(){
            if(squares[i].textContent === ''){
                squares[i].textContent = turnNow;
                board[Math.floor(i/3)][i%3] = turnNow;
                let temp = JSON.parse(JSON.stringify(board));
                maxTurn += 1;
                turnNow = switchTurn(turnNow);
                document.querySelector(".turnNow").textContent = turnNow + ' is playing';
                moves = [...moves, temp];
                movesIndex += 1;
                endGame(maxTurn, board);
            }
        }
    }
}

//functions checking the win conditions
function endGame(maxTurn, board){
    if(maxTurn === 9 && !(checkVertical(board) || checkHorizontal(board) || checkDiagonal(board))){
        movesIndex -= 1;
        document.querySelector(".turnNow").textContent = 'Tie!';
        document.querySelector(".previousMove").classList.remove('hidden');
        document.querySelector(".nextMove").classList.remove('hidden');
        document.querySelector(".nextMove").classList.add('transparentColor');
        removeClickBoard();
    }
    else if(checkVertical(board) || checkHorizontal(board) || checkDiagonal(board)){
        movesIndex -= 1;
        document.querySelector(".turnNow").textContent = 'Congrats ' + switchTurn(turnNow) + '!';
        document.querySelector(".previousMove").classList.remove('hidden');
        document.querySelector(".nextMove").classList.remove('hidden');
        document.querySelector(".nextMove").classList.add('transparentColor');
        removeClickBoard();
    }
}

//removing the onclick event to the board if the game ends
function removeClickBoard(){
    for(let i = 0; i < squares.length; i++){
        squares[i].onclick = null;
    }
}

function checkVertical(board){
    for(i = 0; i < 3; i++){
        let temp = board[0][i];
        if(temp != '' && board[1][i] === temp && board[2][i] === temp){
            squares[i].classList.add('win');
            squares[i+3].classList.add('win');
            squares[i+6].classList.add('win');
            return true;
        }
    }
    return false;
}

function checkHorizontal(board){
    for(i = 0; i < 3; i++){
        let temp = board[i][0];
        if(temp != '' && board[i][1] === temp && board[i][2] === temp){
            squares[i*3].classList.add('win');
            squares[i*3+1].classList.add('win');
            squares[i*3+2].classList.add('win');
            return true;
        }
    }
    return false;
}

function checkDiagonal(board){
    let temp = board[1][1];
    if(temp != '' && ((board[0][0] === temp && board[2][2] === temp) || (board[0][2] === temp && board[2][0] === temp))){
        squares[4].classList.add('win');
        if(board[0][0] === temp && board[2][2] === temp){
            squares[0].classList.add('win');
            squares[8].classList.add('win');
        }
        else if(board[0][2] === temp && board[2][0] === temp){
            squares[2].classList.add('win');
            squares[6].classList.add('win');
        }
        return true;
    }
    return false;
}

//navigating the history of the moves
document.querySelector(".previousMove").addEventListener("click", () => {
    if(movesIndex < moves.length && movesIndex > 1){
        movesIndex -= 1;
        printTicTacToeBoard(moves[movesIndex]);
        document.querySelector(".previousMove").classList.remove('transparentColor');
        document.querySelector(".nextMove").classList.remove('transparentColor');
    }
    else if(movesIndex === 1){
        movesIndex -= 1;
        printTicTacToeBoard(moves[movesIndex]);
        document.querySelector(".previousMove").classList.add('transparentColor');
    }
});

document.querySelector(".nextMove").addEventListener("click", () => {
    if(movesIndex < moves.length - 2 && movesIndex >= 0){
        movesIndex += 1;
        printTicTacToeBoard(moves[movesIndex]);
        document.querySelector(".nextMove").classList.remove('transparentColor');
        document.querySelector(".previousMove").classList.remove('transparentColor');
    }
    else if(movesIndex === moves.length - 2){
        movesIndex += 1;
        printTicTacToeBoard(moves[movesIndex]);
        document.querySelector(".nextMove").classList.add('transparentColor');
    }
});

startGame();