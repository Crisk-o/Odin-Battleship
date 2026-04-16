/*
This file handles the DOM. It knows how to:

    Create the grid in HTML.
    Change a cell's color to red when it's a "hit", white on "miss"
    Update the text on the screen. 
*/

const contentDiv = document.getElementById('content');
const player1Div = document.getElementById('player1Div');
const player2Div = document.getElementById('player2Div');
const player1Board = document.getElementById('player1Board');
const player2Board = document.getElementById('player2Board');

export function renderGameboard(playerBoard, container){
    const boardContainer = document.getElementById(container)
    boardContainer.innerHTML = ""; // for re-rendering
    // to figure out placement when player attack by clicking on a cellDiv:
    // row = Math.floor(index/10) 
    // col = index % 10 ex: cell 23 chosen(1-100 not 0-99) index is 22. 22 % 10 = col2.
    playerBoard.board.flat().forEach((cellLogic, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');

        // This is where the magic happens:
        // Use the cellLogic (the Cell class instance) to style the div
        if (cellLogic.state === "ship") {
            cellDiv.classList.add("ship"); // Only show for the player's own board!
        }

        boardContainer.appendChild(cellDiv);
    });
}

// when a cell is attacked.
export function updateCell(cell){
    if(cell.state === "hit"){
        cell.classList.add("cellDiv hit");
    }
    else if(cell.state === "miss"){
        cell.classList.add("cellDiv miss");
    }
}


