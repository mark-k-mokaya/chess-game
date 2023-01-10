// Set up pieces array with their initial positions
const pieces = [
    // Black Pieces
        {name: "rook", color: "B", pos: "a8", img:"rook-black"},
        {name: "rook", color: "B", pos: "h8", img:"rook-black"},
        {name: "knight", color: "B", pos: "b8", img:"knight-black"},
        {name: "knight", color: "B", pos: "g8", img:"knight-black"},
        {name: "bishop", color: "B", pos: "c8", img:"bishop-black"},
        {name: "bishop", color: "B", pos: "f8", img:"bishop-black"},
        {name: "queen", color: "B", pos: "d8", img:"queen-black"},
        {name: "king", color: "B", pos: "e8", img:"king-black"},
        {name: "pawn", color: "B", pos: "a7", img:"pawn-black"},
        {name: "pawn", color: "B", pos: "b7", img:"pawn-black"},
        {name: "pawn", color: "B", pos: "c7", img:"pawn-black"},
        {name: "pawn", color: "B", pos: "d7", img:"pawn-black"},
        {name: "pawn", color: "B", pos: "e7", img:"pawn-black"},
        {name: "pawn", color: "B", pos: "f7", img:"pawn-black"},
        {name: "pawn", color: "B", pos: "g7", img:"pawn-black"},
        {name: "pawn", color: "B", pos: "h7", img:"pawn-black"},
    // white pieces
        {name: "rook", color: "W", pos: "a1", img:"rook-white"},
        {name: "rook", color: "W", pos: "h1", img:"rook-white"},
        {name: "knight", color: "W", pos: "b1", img:"knight-white"},
        {name: "knight", color: "W", pos: "g1", img:"knight-white"},
        {name: "bishop", color: "W", pos: "c1", img:"bishop-white"},
        {name: "bishop", color: "W", pos: "f1", img:"bishop-white"},
        {name: "queen", color: "W", pos: "d1", img:"queen-white"},
        {name: "king", color: "W", pos: "e1", img:"king-white"},
        {name: "pawn", color: "W", pos: "a2", img:"pawn-white"},
        {name: "pawn", color: "W", pos: "b2", img:"pawn-white"},
        {name: "pawn", color: "W", pos: "c2", img:"pawn-white"},
        {name: "pawn", color: "W", pos: "d2", img:"pawn-white"},
        {name: "pawn", color: "W", pos: "e2", img:"pawn-white"},
        {name: "pawn", color: "W", pos: "f2", img:"pawn-white"},
        {name: "pawn", color: "W", pos: "g2", img:"pawn-white"},
        {name: "pawn", color: "W", pos: "h2", img:"pawn-white"}
];

// Setup the pieces on the chessboard
function setupPieces(isInit){
     // set up chess pieces
    pieces.forEach((piece)=>{
        let currentSquare = document.getElementById(piece.pos);
        
        currentSquare.style.backgroundImage = `url('images/chess-pieces/${piece.img}.png')`;
        if(isInit){
            currentSquare.classList.add("init", "occupied", piece.color);
        }

        if(piece.color == playerTurn){
            currentSquare.onclick = ()=>{
                showMoves(currentSquare, piece);
            }
        } else{
            currentSquare.onclick = null;
        }
    });
}