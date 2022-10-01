// Clearing the Grid
function clearGrid(){
    var grid = [];
    for(k = 0; k < 64; k++){
        grid.push("");
    }

    return grid;
}

// Printing the Chessboard with its contents
function printChessboard(gridinfo){
    let text = "";
    var sqnumber = 0;
    var grid = gridinfo;

    for(var ctr = 0; ctr < 8; ctr++){
        for(var ctr2 = 0; ctr2 < 8; ctr2++){
            text += '<div class="box">'+ grid[sqnumber] +'</div>';
            sqnumber += 1;
        }
    }
    document.getElementById("chessboard").innerHTML = text;
}

// Initial Placement of pcs inside the Chessboard
function StartGame(){
    var grid = clearGrid();
    var whitepcs = [['&#9817', 48, 49, 50, 51, 52, 53, 54, 55], ['&#9814', 56, 63], ['&#9816', 57, 62], ['&#9815',58, 61], ['&#9813', 59], ['&#9812', 60]];
    var blackpcs = [['&#9823', 8, 9, 10, 11, 12, 13, 14, 15], ['&#9820', 0, 7], ['&#9822', 1, 6], ['&#9821', 2, 5], ['&#9819', 3], ['&#9818', 4]];
    var chesspcs = whitepcs.concat(blackpcs);

    for(i = 0; i < chesspcs.length; i++){
        for(j = 1; j < chesspcs[i].length; j++){
            grid[chesspcs[i][j]] = chesspcs[i][0];
        }
    }

    return grid;
}

var grid = clearGrid();
printChessboard(grid);

btn1.onclick = function(){
    var grid = StartGame();
    var move1 = "";
    var move1_number = "";
    var move1_checker = 0;
    var selectPiece = document.getElementsByClassName("box");

    printChessboard(grid);

    for(let i = 0; i < selectPiece.length; i++) {
        selectPiece[i].onclick = function(){
            if(move1_checker == 0 && selectPiece[i].innerHTML != ""){
                selectPiece[i].classList.add("selected");
                move1 = selectPiece[i].innerHTML;
                move1_number = i;
                move1_checker = 1;
            }
            else if(move1_checker == 1){
                selectPiece[move1_number].classList.remove("selected");
                selectPiece[move1_number].innerHTML = "";
                selectPiece[i].innerHTML = move1;
                move1_checker = 0;
            }
        }
    }
}

btn2.onclick = function(){
    grid = clearGrid();
    printChessboard(grid);
}