// move piece
function movePiece(piece, newPosition, moves, attackMoves, currentSquare){
    // deselect all other squares 
    let totalMoves = moves.concat(attackMoves);

    for (let i = 0; i < totalMoves.length; i++) {
        let position = totalMoves[i];
            let newSquare = document.getElementById(position);
            newSquare.classList.remove('capturable', "attackable");
            newSquare.onclick = null;
    }

    // fetch current square and remove any init, any occupied class, image and event listener
    currentSquare.classList.remove("init", "occupied", "B", "W");
    currentSquare.style.backgroundImage = null;
    currentSquare.onclick = null;

    // Fetch new square
    let newSquare = document.getElementById(newPosition);
    newSquare.classList.add("occupied", piece.color);

    // update position of piece in pieces array
    piece.pos = newPosition;

    // promote pawn using piece name and color and if new row == 8 or row == 1

    // switch to other player
    if(playerTurn == "W"){
        playerTurn = "B";
    }else{
        playerTurn = "W";
    }
    
    setupPieces(false);
}

function takePiece(currentPiece, newPosition, moves, attackMoves, currentSquare) {
    let opponent = pieces.indexOf(pieces.find(piece=>{
        return piece.pos == newPosition;
    }));

    // remove opponent piece
    let capturedSquare = document.getElementById(newPosition);
    capturedSquare.classList.remove("init", "occupied", "B", "W");
    pieces.splice(opponent, 1);

    movePiece(currentPiece, newPosition, moves, attackMoves, currentSquare);
}


// castling

// promotion