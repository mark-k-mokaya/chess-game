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

// function highlightAttackingPieces(attackMoves, piece, currentSquare) {
//     let totalMoves = moves.concat(attackMoves);

//     for (let i = 0; i < totalMoves.length; i++) {
//         let position = totalMoves[i];
//         if(i<moves.length){
//             let newSquare = document.getElementById(position);
//             newSquare.classList.toggle("capturable");

//         }else{ 
//             let newSquare = document.getElementById(position);
//             newSquare.classList.toggle("attackable");
//         }
        
//     }
// }