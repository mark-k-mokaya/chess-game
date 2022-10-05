const pieces = [
    // Black Pieces
        {name: "rook_1B", pos: "a8", img:"rook-black"},
        {name: "rook_2B", pos: "h8", img:"rook-black"},
        {name: "knight_1B", pos: "b8", img:"knight-black"},
        {name: "knight_2B", pos: "g8", img:"knight-black"},
        {name: "bishop_1B", pos: "c8", img:"bishop-black"},
        {name: "bishop_2B", pos: "f8", img:"bishop-black"},
        {name: "queenB", pos: "d8", img:"queen-black"},
        {name: "kingB", pos: "e8", img:"king-black"},
        {name: "pawn_1B", pos: "a7", img:"pawn-black"},
        {name: "pawn_2B", pos: "b7", img:"pawn-black"},
        {name: "pawn_3B", pos: "c7", img:"pawn-black"},
        {name: "pawn_4B", pos: "d7", img:"pawn-black"},
        {name: "pawn_5B", pos: "e7", img:"pawn-black"},
        {name: "pawn_6B", pos: "f7", img:"pawn-black"},
        {name: "pawn_7B", pos: "g7", img:"pawn-black"},
        {name: "pawn_8B", pos: "h7", img:"pawn-black"},
    // white pieces
        {name: "rook_1W", pos: "a1", img:"rook-white"},
        {name: "rook_2W", pos: "h1", img:"rook-white"},
        {name: "knight_1W", pos: "b1", img:"knight-white"},
        {name: "knight_2W", pos: "g1", img:"knight-white"},
        {name: "bishop_1W", pos: "c1", img:"bishop-white"},
        {name: "bishop_2W", pos: "f1", img:"bishop-white"},
        {name: "queenW", pos: "d1", img:"queen-white"},
        {name: "kingW", pos: "e1", img:"king-white"},
        {name: "pawn_1W", pos: "a2", img:"pawn-white"},
        {name: "pawn_2W", pos: "b2", img:"pawn-white"},
        {name: "pawn_3W", pos: "c2", img:"pawn-white"},
        {name: "pawn_4W", pos: "d2", img:"pawn-white"},
        {name: "pawn_5W", pos: "e2", img:"pawn-white"},
        {name: "pawn_6W", pos: "f2", img:"pawn-white"},
        {name: "pawn_7W", pos: "g2", img:"pawn-white"},
        {name: "pawn_8W", pos: "h2", img:"pawn-white"}
];

let board = document.querySelector("#chess-board");

function createBoard() {
    // set up chess-board
    let boardSquares = [];

    // could have nested for loops, all we're doing is getting the values
    for (let i = 1; i <= 64; i++) {
        // set up columns and rows
        let row = Math.floor((64 - i) / 8) + 1;
        let column = i - (8 * (8 - row));

        // convert column to column letter
        let columnLetter = (column + 9).toString(36);

        // set up square colors
        let color = "";
        if (row % 2 === 0) {
            color = i % 2 ? "light" : "dark";
        } else {
            color = i % 2 ? "dark" : "light";
        }

        // Store properties of the current square  in boardSquares
        boardSquares.push([columnLetter, row, color]);
    }

    // create squares
    boardSquares.forEach(square => {
        board.appendChild(createSquare(square));
    });
}

function createSquare(square) {
    const newSquare = document.createElement("div");
    const position = square[0] + square[1];
    newSquare.classList.add("square", square[2]);
    newSquare.setAttribute("id", position);
    return newSquare;
}

// Setup the pieces on the board
function setupPieces(isInit){
     // set up chess pieces
    pieces.forEach((piece)=>{
        const pieceColor = piece.name[piece.name.length-1];
        let currentSquare = document.getElementById(piece.pos);
        currentSquare.style.backgroundImage = `url('images/chess-pieces/${piece.img}.png')`;
        if(isInit){
            currentSquare.classList.add("init", "occupied", pieceColor);
        }
        currentSquare.onclick = ()=>{
            showMoves(currentSquare, piece);
        }
    });
}

// show moves
function showMoves(currentSquare, piece){
    const pieceName = piece.name.split("_")[0];
    const pieceColor = piece.name[piece.name.length-1];
    const currentPosition = piece.pos;
    let columnLetter= currentPosition[0];
    let column = parseInt(columnLetter, 36);
    let row = parseInt(currentPosition[1]);
    let moves = [];
    let attackMoves = [];

    // reset all square-highlighting
    Array.from(board.children).forEach((square)=>{
        square.classList.remove('capturable', 'attackable');
        square.onclick = null;
        setupPieces(false);
    });

    // bounds object with rows:[], columns:[]
    // test if bounds.rows includes new value

    switch(pieceName){
        // Pawns
        case "pawn":
            // Move 1 or 2 spaces on the first move
            if(currentSquare.classList.contains("init") && currentSquare.classList.contains(pieceColor)){
                let move = columnLetter + (pieceColor === "W" ? (row+2): (row-2));
                checkCanCaptureSquare(move) && moves.push(move);
            }

            if(row < 8){
                // Move 1 space on subsequent moves
                let move = columnLetter + (pieceColor === "W" ? (row+1): (row-1));
                checkCanCaptureSquare(move) ? moves.push(move): moves=[];

                // check attack and en passe

                // right diagonal
                move = (column+1).toString(36) + (pieceColor === "W" ? (row+1): (row-1));
                checkCanAttack(move, pieceColor) && attackMoves.push(move);

                // left diagonal
                move = (column-1).toString(36) + (pieceColor === "W" ? (row+1): (row-1));
                checkCanAttack(move, pieceColor) && attackMoves.push(move);
            }           

            break;
        case "bishop":
            // move diagonally
            let canMoveRightUpDiag = canMoveLeftUpDiag = canMoveLeftDownDiag = canMoveRightDownDiag = true;

            // loop and find possible moves
            for (let i = 1; i < 8; i++) {
                // move right-diagonal-up
                if (row+i<9 && column+i<18 & canMoveRightUpDiag){
                    let move = (column+i).toString(36) + (row+i);
                    checkCanCaptureSquare(move) ? moves.push(move) : canMoveRightUpDiag = false;
                    checkCanAttack(move, pieceColor) && attackMoves.push(move);
                }

                // move left-diagonal-up
                if (row+i<9 && column-i>9 && canMoveLeftUpDiag){
                    let move = (column-i).toString(36) + (row+i);
                    checkCanCaptureSquare(move) ? moves.push(move) : canMoveLeftUpDiag = false;
                    checkCanAttack(move, pieceColor) && attackMoves.push(move);
                }

                // move left-diagonal-down
                if (row-i>0 && column-i>9 && canMoveLeftDownDiag){
                    let move = (column-i).toString(36) + (row-i);
                    checkCanCaptureSquare(move) ? moves.push(move) : canMoveLeftDownDiag = false;
                    checkCanAttack(move, pieceColor) && attackMoves.push(move);
                } 
                
                // move-right-diagonal-down
                if (row-i>0 && column+i<18 && canMoveRightDownDiag){
                    let move = (column+i).toString(36) + (row-i);
                    checkCanCaptureSquare(move) ? moves.push(move) : canMoveRightDownDiag = false;
                    checkCanAttack(move, pieceColor) && attackMoves.push(move);
                }
            }
            break;
        case "knight":
                // move 1 right & 2 forward 
                let move = (column+1).toString(36) + (row+2);
                checkCanCaptureSquare(move) && moves.push(move);
                checkCanAttack(move, pieceColor) && attackMoves.push(move);

                // move 1 left & 2 forward
                move = (column-1).toString(36) + (row+2);
                checkCanCaptureSquare(move) && moves.push(move);
                checkCanAttack(move, pieceColor) && attackMoves.push(move);

                // move 1 right & 2 backward
                move = (column+1).toString(36) + (row-2);
                checkCanCaptureSquare(move) && moves.push(move);
                checkCanAttack(move, pieceColor) && attackMoves.push(move);

                // move 1 left & 2 backward
                move = (column-1).toString(36) + (row-2);
                checkCanCaptureSquare(move) && moves.push(move);
                checkCanAttack(move, pieceColor) && attackMoves.push(move);

                // move 2 right & 1 forward
                move = (column+2).toString(36) + (row+1);
                checkCanCaptureSquare(move) && moves.push(move);
                checkCanAttack(move, pieceColor) && attackMoves.push(move);

                // move 2 right & 1 backward
                move = (column+2).toString(36) + (row-1);
                checkCanCaptureSquare(move) && moves.push(move);
                checkCanAttack(move, pieceColor) && attackMoves.push(move);

                // move 2 left & 1 forward
                move = (column-2).toString(36) + (row+1);
                checkCanCaptureSquare(move) && moves.push(move);
                checkCanAttack(move, pieceColor) && attackMoves.push(move);

                // move 2 left & 1 backward
                move = (column-2).toString(36) + (row-1);
                checkCanCaptureSquare(move) && moves.push(move);
                checkCanAttack(move, pieceColor) && attackMoves.push(move);
            break;
        default:
            alert("Not a pawn!");
            break;
    }
    

    // Highlight capturable squares
    highlightSquares(moves, attackMoves, piece, currentSquare);

    // Listen for click on current square to toggle highlighted squares
    currentSquare.onclick = ()=>highlightSquares(moves, attackMoves, piece, currentSquare);
}

function highlightSquares(moves, attackMoves, piece, currentSquare) {
    let totalMoves = moves.concat(attackMoves);

    for (let i = 0; i < totalMoves.length; i++) {
        let position = totalMoves[i];
        if(i<moves.length){
            let newSquare = document.getElementById(position);
            newSquare.classList.toggle("capturable");

            if(newSquare.onclick === null){
                newSquare.onclick = ()=>{
                    movePiece(piece, position, moves, attackMoves, currentSquare);
                };
            }else{
                setupPieces(false);
            }
        }else{
            let newSquare = document.getElementById(position);
            newSquare.classList.toggle("attackable");
            if(newSquare.classList.contains("attackable")){
                newSquare.onclick = ()=>{
                    takePiece(piece, position, moves, attackMoves, currentSquare);
                };
            }else {
                setupPieces(false);
            }
        }
        
    }
}

function checkCanCaptureSquare(position){
    let square = document.getElementById(position);
    // check if out of bounds
    if(square != null){
        return !square.classList.contains("occupied");
    }
    return false;
}

function checkCanAttack(position, pieceColor){
    let square = document.getElementById(position);
    // check if out of bounds
    if(square != null){
        return square.classList.contains("occupied") && !square.classList.contains(pieceColor);
    }
    return false;
}

// move piece
function movePiece(piece, newPosition, moves, attackMoves, currentSquare){
    // deselect other squares 
    let totalMoves = moves.concat(attackMoves);

    for (let i = 0; i < totalMoves.length; i++) {
        let position = totalMoves[i];
            let newSquare = document.getElementById(position);
            newSquare.classList.remove('capturable', "attackable");
            newSquare.onclick = null;
    }

    // fetch current square
    // remove any init class since the square is not unused
    // remove any occupied class since the piece is leaving the square
    // remove image and event listener
    currentSquare.classList.remove("init", "occupied", "B", "W");
    currentSquare.style.backgroundImage = null;
    currentSquare.onclick = null;

    // Fetch new square
    let newSquare = document.getElementById(newPosition);
    const pieceName = piece.name.split("_")[0];
    const pieceColor = piece.name[piece.name.length-1];
    newSquare.classList.add("occupied", pieceColor);

    // update position of piece in pieces array
    piece.pos = newPosition;

    // promote pawn using piece name and color and if new row == 8 or row == 1

    // switch to other player
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

// Start game
createBoard();
setupPieces(true);
// startGame();
// playerTurn = "white";
// movePiece to toggle playerTurn between "black" and "white"
// showMoves can check if piece color == playerTurn