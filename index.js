const pieces = [
    // Black Pieces
        {name: "rook_1B", pos: "A8", img:"rook-black"},
        {name: "rook_2B", pos: "H8", img:"rook-black"},
        {name: "knight_1B", pos: "B8", img:"knight-black"},
        {name: "knight_2B", pos: "G8", img:"knight-black"},
        {name: "bishop_1B", pos: "C8", img:"bishop-black"},
        {name: "bishop_2B", pos: "F8", img:"bishop-black"},
        {name: "queenB", pos: "D8", img:"queen-black"},
        {name: "kingB", pos: "E8", img:"king-black"},
        {name: "pawn_1B", pos: "A7", img:"pawn-black"},
        {name: "pawn_2B", pos: "B7", img:"pawn-black"},
        {name: "pawn_3B", pos: "C7", img:"pawn-black"},
        {name: "pawn_4B", pos: "D7", img:"pawn-black"},
        {name: "pawn_5B", pos: "E7", img:"pawn-black"},
        {name: "pawn_6B", pos: "F7", img:"pawn-black"},
        {name: "pawn_7B", pos: "G7", img:"pawn-black"},
        {name: "pawn_8B", pos: "H7", img:"pawn-black"},
    // white pieces
        {name: "rook_1W", pos: "A1", img:"rook-white"},
        {name: "rook_2W", pos: "H1", img:"rook-white"},
        {name: "knight_1W", pos: "B1", img:"knight-white"},
        {name: "knight_2W", pos: "G1", img:"knight-white"},
        {name: "bishop_1W", pos: "C1", img:"bishop-white"},
        {name: "bishop_2W", pos: "F1", img:"bishop-white"},
        {name: "queenW", pos: "D1", img:"queen-white"},
        {name: "kingW", pos: "E1", img:"king-white"},
        {name: "pawn_1W", pos: "A2", img:"pawn-white"},
        {name: "pawn_2W", pos: "B2", img:"pawn-white"},
        {name: "pawn_3W", pos: "C2", img:"pawn-white"},
        {name: "pawn_4W", pos: "D2", img:"pawn-white"},
        {name: "pawn_5W", pos: "E2", img:"pawn-white"},
        {name: "pawn_6W", pos: "F2", img:"pawn-white"},
        {name: "pawn_7W", pos: "G2", img:"pawn-white"},
        {name: "pawn_8W", pos: "H2", img:"pawn-white"}
];

alert("Hello");

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
};


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