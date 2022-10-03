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

    for (let i = 1; i <= 64; i++) {
        // set up rows and columns
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
    let row = currentPosition[0];
    let column = parseInt(currentPosition[1]);
    const moves = [];

    // reset all square-highlighting
    Array.from(board.children).forEach((square)=>{
        square.classList.remove('capturable');
        square.onclick = null;
        setupPieces(false);
    });

    switch(pieceName){
        // Pawns
        case "pawn":
            // Move 1 or 2 spaces on the first move
            if(currentSquare.classList.contains("init") && currentSquare.classList.contains(pieceColor)){
                let move = row + (pieceColor === "W" ? (column+2): (column-2));
                checkNotOccupied(move) && moves.push(move);
            }

            if(column < 8){
                // Move 1 space on subsequent moves
                let move = row + (pieceColor === "W" ? (column+1): (column-1));
                checkNotOccupied(move) ? moves.push(move): moves=[];
            }else if (column==8){
                // promote pawn
            }
            break;
        default:
            alert("Not a pawn!");
            break;
    }
    

    // Highlight capturable squares
    highlightSquares(moves, piece, currentSquare);

    // Listen for click on current square to toggle highlighted squares
    currentSquare.onclick = ()=>highlightSquares(moves, piece, currentSquare);
}

function highlightSquares(moves, piece, currentSquare) {
    moves.forEach(position=>{
        let newSquare = document.getElementById(position);
        newSquare.classList.toggle("capturable");

        if(newSquare.onclick === null){
            newSquare.onclick = ()=>{
                movePiece(piece, position, moves, currentSquare);
            };
        }else{
            newSquare.onclick = null;
        }
        
    });
}

function checkNotOccupied(position){
    let square = document.getElementById(position);
    return !square.classList.contains("occupied");
}

// move piece
function movePiece(piece, newPosition, moves, currentSquare){
    // deselect other squares  
    moves.forEach((position)=>{
        let newSquare = document.getElementById(position);
        newSquare.classList.remove('capturable');
        newSquare.onclick = null;
    });

    // fetch current square
    // remove any init class since the square is not unused
    // remove any occupied class since the piece is leaving the square
    // remove image and event listener
    currentSquare.classList.remove("init", "occupied", "B", "W");
    currentSquare.style.backgroundImage = null;
    currentSquare.onclick = null;

    // Fetch new square
    let newSquare = document.getElementById(newPosition);
    newSquare.classList.add("occupied");

    // update position of piece in pieces array
    piece.pos = newPosition;

    // switch to other player
    setupPieces(false);
}

function takePiece() {
                // en passe
            // TBD
}

// Start game
createBoard();
setupPieces(true);