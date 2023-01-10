let board = document.querySelector("#chess-board");
let playerTurn;

function createBoard() {
    // set up chess-board
    let boardSquares = [];

    for (let i = 1; i <= 64; i++) {
        // set up columns and rows
        let row = Math.floor((64 - i) / 8) + 1;
        let column = i - (8 * (8 - row));

        // convert column to column letter
        column = mapColumn(column);

        // create new position by combining column and row
        const position = column + row;

        // set up square colors
        let color = "";
        if (row % 2 === 0) {
            color = i % 2 ? "light" : "dark";
        } else {
            color = i % 2 ? "dark" : "light";
        }

        // Store properties of the current square in boardSquares
        boardSquares.push({position, color});
    }

    // create squares
    boardSquares.forEach(square => {
        board.appendChild(createSquare(square));
    });
}

function createSquare(square) {
    const newSquare = document.createElement("div");
    newSquare.classList.add("square", square.color);
    newSquare.setAttribute("id", square.position);
    return newSquare;
}