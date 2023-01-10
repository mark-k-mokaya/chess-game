function fetchPawnMoves(currentSquare, piece, moves, attackMoves){
    // fetch column and row
    let column = piece.pos[0];
    let columnInt = mapColumn(column);
    let row = parseInt(piece.pos[1]);
    let canMove = true;
    
    if(row < 8){
        // Move 1 space
        let move = column + (piece.color === "W" ? (row+1): (row-1));
        confirmCaptureSquare(move) ? moves.push(move): canMove = false;

        // Move 2 spaces on the first move
        if(currentSquare.classList.contains("init") && currentSquare.classList.contains(piece.color) && canMove){
            move = column + (piece.color === "W" ? (row+2): (row-2));
            
            confirmCaptureSquare(move) && moves.push(move);   
        }

        // fetch attack and en passe

        // right diagonal
        move = mapColumn(columnInt+1) + (piece.color === "W" ? (row+1): (row-1));
        confirmAttack(move, piece.color) && attackMoves.push(move);

        // left diagonal
        move = mapColumn(columnInt-1) + (piece.color === "W" ? (row+1): (row-1));
        confirmAttack(move, piece.color) && attackMoves.push(move);
    }

}

function fetchKnightMoves(piece, moves, attackMoves){
    // fetch column and row
    let column = piece.pos[0];
    let columnInt = mapColumn(column);
    let row = parseInt(piece.pos[1]);

    let possibleMoves = [
        {cols: 1, rows: 2},
        {cols: -1, rows: 2},
        {cols: 1, rows: -2},
        {cols: -1, rows: -2},
        {cols: 2, rows: 1},
        {cols: 2, rows: -1},
        {cols: -2, rows: 1},
        {cols: -2, rows: -1},

    ];

    possibleMoves.map(possibleMove => {
        let move = mapColumn(columnInt + possibleMove.cols) + (row + possibleMove.rows);
        confirmCaptureSquare(move) && moves.push(move);
        confirmAttack(move, piece.color) && attackMoves.push(move);

        // if(piece.name == null){
        //     let opponent = pieces.find(piece=>{
        //         return piece.pos == move && piece.color != pieceColor;
        //     });

        //     if(opponent != null){
        //         opponentName = opponent.name.split("_")[0]; 
        //         if(opponentName != "knight"){
        //             attackMoves.pop();
        //         }
        //     }
            
        // }
    });

    
}

function fetchDiagonal(piece, moves, attackMoves){
    // fetch column and row
    let column = piece.pos[0];
    let columnInt = mapColumn(column);
    let row = parseInt(piece.pos[1]);

    let directions = {
        canMoveRightUpDiag: true,
        canMoveLeftUpDiag: true,
        canMoveLeftDownDiag: true,
        canMoveRightDownDiag: true
    }

    for (let i = 1; i < 8; i++) {
        let possibleMoves = [
            {cols: i, rows: i, direction: "canMoveRightUpDiag"},
            {cols: -i, rows: i, direction: "canMoveLeftUpDiag"},
            {cols: i, rows: -i, direction: "canMoveRightDownDiag"},
            {cols: -i, rows: -i, direction: "canMoveLeftDownDiag"}
        ];

        possibleMoves.map(possibleMove => {
            if (directions[possibleMove.direction]){
                let move = mapColumn(columnInt + possibleMove.cols) + (row + possibleMove.rows);
                confirmCaptureSquare(move) ? moves.push(move) : directions[possibleMove.direction] = false;
                confirmAttack(move, piece.color) && attackMoves.push(move);

                // if(piece.name == null){
                //     let opponent = pieces.find(piece=>{
                //         return piece.pos == move && piece.color != pieceColor;
                //     });

                //     if(opponent != null){
                //         opponentName = opponent.name.split("_")[0]; 
                //         if(opponentName != "queen" && opponentName != "bishop"){
                //             if(opponentName != "pawn" || i>1){
                //                 attackMoves.pop();
                //             } 
                //         }
                //     }
                // }
            }
        });

        if(piece.name == "king"){
            break;
        }
    }
}

function fetchHorizontalAndVertical(piece, moves, attackMoves){
    // fetch column and row
    let column = piece.pos[0];
    let columnInt = mapColumn(column);
    let row = parseInt(piece.pos[1]);

    let directions = {
        canMoveUp: true,
        canMoveDown: true,
        canMoveLeft: true,
        canMoveRight: true
    }

    for (let i = 1; i < 8; i++) {
        let possibleMoves = [
            {cols: 0, rows: i, direction: "canMoveUp"},
            {cols: 0, rows: -i, direction: "canMoveDown"},
            {cols: i, rows: 0, direction: "canMoveRight"},
            {cols: -i, rows: 0, direction: "canMoveLeft"}
        ];


        possibleMoves.map(possibleMove => {
            if(directions[possibleMove.direction]){
                let move = mapColumn(columnInt + possibleMove.cols) + (row + possibleMove.rows);
                confirmCaptureSquare(move) ? moves.push(move) : directions[possibleMove.direction] = false;
                confirmAttack(move, piece.color) && attackMoves.push(move);

                // can't stop using canMoveUp
                // Needs to fetch if piece behind same color piece is attacking.
                // If so, set onclick listener of same color piece to null

                // if(piece.name == null){
                //     let opponent = pieces.find(piece=>{
                //         return piece.pos == move && piece.color != pieceColor;
                //     });

                //     if(opponent != null){
                //         opponentName = opponent.name.split("_")[0]; 
                //         if(opponentName != "queen" && opponentName != "rook"){
                //             attackMoves.pop();
                //         }
                //     }
                // }
            }
        });

        if(piece.name == "king"){
            break;
        }
    }
}