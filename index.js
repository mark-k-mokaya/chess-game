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

function createBoard() {
    // set up chess-board
    let board = document.querySelector("#chess-board");
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
    newSquare.addEventListener("click", function (event) {
        alert(position);
    });
    return newSquare;
}

// Setup the pieces on the board
function setupPieces(){
    // set up chess pieces
    pieces.forEach((piece)=>{
        let currentSquare = document.getElementById(piece.pos);
        currentSquare.style.backgroundImage = `url('images/chess-pieces/${piece.img}.png')`;
        currentSquare.classList.add(piece.name);
    });
}


// Set up their movements
function movePiece(piece, newPosition){
    const pieceName = piece.name.split("_")[0];
    newPosition = newPosition.toUpperCase();
    let currentSquare = document.getElementById(piece.pos);
    let newSquare = document.getElementById(newPosition);
    currentSquare.style.backgroundImage = null;
    piece.pos = newPosition;
    newSquare.classList.add(piece.name);
    newSquare.style.backgroundImage = `url('images/chess-pieces/${piece.img}.png')`;
}

function canMove(){
    // switch (pieceName) {
    //     case "rook":
            
    //     case "knight":
    //         alert("I'm a knight!");
    //         break;
    //     case "bishop":
    //         alert("I'm a bishop!");
    //         break;
    //     case "queen":
    //         alert("I'm a queen!");
    //         break;
    //     case "king":
    //         alert("I'm a king!");
    //         break;
    //     case "pawn":
    //         alert("I'm a queen!");
    //         break;
    //     default:
    //         alert("I'm an empty square!");
    //         break;
    // }
}


// Start game
createBoard();
setupPieces();
movePiece(pieces.black[10], "d1");