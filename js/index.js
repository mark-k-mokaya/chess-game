// Start game
function startGame(){
    createBoard();
    playerTurn = "W";
    setupPieces(true);
}

startGame();


function inCheck(pieceColor, attackingPieces) {
    // fetch kings
    let king = pieces.find((piece)=>{
        return piece.name.split("_")[0] == "king" && piece.color == pieceColor;
    });

    let pieceInfo = fetchPieceInfo(king);
    let pieceName;
    let moves = [];
    let attackMoves = [];

    checkKnightMoves(pieceName, pieceInfo.pieceColor, pieceInfo.column, pieceInfo.row, moves, attackMoves);

    checkDiagonal(pieceName, pieceInfo.pieceColor, pieceInfo.column, pieceInfo.row, moves, attackMoves);

    checkHorizontalAndVertical(pieceName, pieceInfo.pieceColor, pieceInfo.column, pieceInfo.row, moves, attackMoves);

    if(attackMoves.length > 0){
        attackMoves.forEach(square => {
            highlightAttackingPieces(attackMoves, king, pieceInfo.currentSquare);
            attackingPieces.push(pieces.find(piece=>piece.pos==square));
        });
        attackMoves = [];
        return true;
    }else{
        return false;
    }
}

// stop check

// check if moving piece endangers king

