// Show possible moves for a specific piece
function showMoves(currentSquare, piece){
    let moves = [];
    let attackMoves = [];
    let attackingPieces = [];

    // reset all square-highlighting
    Array.from(board.children).forEach((square)=>{
        square.classList.remove('capturable', 'attackable');
        square.onclick = null;
        setupPieces(false);
    });

    // Confirm if not in check
    // if(!inCheck(pieceInfo.pieceColor, attackingPieces)){
        switch(piece.name){
            case "pawn":
                fetchPawnMoves(currentSquare, piece, moves, attackMoves);
                break;
            case "bishop":
                fetchDiagonal(piece, moves, attackMoves);
                break;
            case "knight":
                fetchKnightMoves(piece, moves, attackMoves);
                break;
            case "rook":
                fetchHorizontalAndVertical(piece, moves, attackMoves);
                break;
            case "queen":
                fetchDiagonal(piece, moves, attackMoves);
                fetchHorizontalAndVertical(piece, moves, attackMoves);               
                break;
            case "king":
                fetchDiagonal(piece, moves, attackMoves);
                fetchHorizontalAndVertical(piece, moves, attackMoves);
                break;
            default:
                alert("An unexpected error has occurred!");
                break;
        }

        // Highlight capturable squares
        highlightSquares(moves, attackMoves, piece, currentSquare);

        // Listen for click on current square to toggle highlighted squares
        currentSquare.onclick = () => highlightSquares(moves, attackMoves, piece, currentSquare);
        
    // }else{
    //     // King is in check
    //     // Fetch moves to stop check
    //     alert("Check");
    // }
}