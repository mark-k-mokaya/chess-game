function confirmCaptureSquare(position){
    let square = document.getElementById(position);
    // check if out of bounds
    if(square != null){
        return !square.classList.contains("occupied");
    }
    return false;
}

function confirmAttack(position, pieceColor){
    let square = document.getElementById(position);
    // check if out of bounds
     if(square != null){
        return square.classList.contains("occupied") && !square.classList.contains(pieceColor);
    }
    return false;
}