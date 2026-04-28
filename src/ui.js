import boat from "./assets/ship.png";
import arrows from "./assets/arrow-up-down.png";
import { player1, player2 } from "./index.js"
/*
This file handles the DOM. It knows how to:

    Create the grid in HTML.
    Change a cell's color to red when it's a "hit", white on "miss"
    Update the text on the screen. 
*/

const contentDiv = document.getElementById('content');
const gameboardsContainer = document.getElementById('gameboardsContainer');
const player1Div = document.getElementById('player1Div');
const player2Div = document.getElementById('player2Div');
const player1Name = document.getElementById('player1Name');
const player2Name = document.getElementById('player2Name');

const startGameBtn = document.getElementById("startGameBtn");
const startGameScreen = document.getElementById("startGameScreen");
const startScreenTitle = document.getElementById("startScreenTitle");
const titleDiv = document.getElementById('titleDiv');
const createPlayerBtn = document.getElementById('createPlayerBtn');
const setBotDialog = document.getElementById("formDialog");

startGameBtn.addEventListener('click', () => {
    setBotDialog.showModal();
    startGameScreen.remove();
    startScreenTitle.remove();
    startGameBtn.classList.toggle("hidden");
    titleDiv.classList.toggle("hidden");
    createPlayerBtn.classList.toggle("hidden");
})

const setBotForm = document.getElementById('setBotForm');
const isComputerInput = document.getElementById('isCompInput');
setBotForm.addEventListener('submit', () => {
    if(isComputerInput.checked)
        player2.setAsComputer();
    
    setBotDialog.close();
    setBotForm.reset();
});

export function updateCell(cell, cellContainer){
    cellContainer.classList.add("cell"); 

    if(cell.state === "ship"){
        cellContainer.classList.add("ship")
    }
    if(cell.state === "hit"){
        cellContainer.classList.add("hit");
    }
    else if(cell.state === "miss"){
        cellContainer.classList.add("miss");
    }
 
}
const p1ShipsContainer = document.getElementById("availableShips1");
const p2ShipsContainer = document.getElementById('availableShips2');
const p1InfoDiv = document.getElementById('infoDiv1');
const p2InfoDiv = document.getElementById('infoDiv2');

export function styleCurrentPlayer(player) {
    if(player.name === "player1"){
        p2InfoDiv.textContent = "Waiting for opponent...";
        p1InfoDiv.textContent = "Ready to attack opponent.";
        player1Name.classList.add('currentPlayer');
        player2Name.classList.toggle('currentPlayer');
    }
    else if(player.name === "player2"){
        p1InfoDiv.textContent = "Waiting for opponent...";
        p2InfoDiv.textContent = "Ready to attack opponent.";
        player2Name.classList.add('currentPlayer');
        player1Name.classList.toggle('currentPlayer');
    }
}
export function styleWinner(winner){
    const winnerContainer = document.createElement('div');
    const restartBtn = document.createElement('button');
    restartBtn.addEventListener('click', () => window.location.reload());
    restartBtn.textContent = "Restart Game";
    winnerContainer.classList.add('winner');
    const winnerName = winner.name.toUpperCase()
    winnerContainer.textContent = `${winnerName} Wins!`;
    contentDiv.classList.toggle("hidden");
    winnerContainer.append(restartBtn);
    document.body.append(winnerContainer);
    
}
export function playerInstructions(player){    
    if(player.name === "player1"){
        if(player.placedShipCount !== 5){
            p1InfoDiv.textContent = "Place your ships!";
        }
    }
    else if(player.name === "player2"){
        if(player.placedShipCount !== 5){
            p2InfoDiv.textContent = "Place your ships!";
        }
    }
}
const orientDiv1 = document.getElementById('orientDiv1');
const orientDiv2 = document.getElementById('orientDiv2');
const arrows1 = document.getElementById('arrows1');
arrows1.src = arrows;
const arrows2 = document.getElementById('arrows2');
arrows2.src = arrows;
export function appendName(player, container){
    const nameContainer = document.getElementById(container);
    nameContainer.textContent = player.name;
    playerInstructions(player);
    player.availableShips.forEach(ship => {
        const boatFigure = document.createElement('img');
        const boatFigureP2 = document.createElement('img');
        boatFigure.src = boat;
        boatFigureP2.src = boat;
        if(player.name === "player1"){
            p1ShipsContainer.append(boatFigure);
        }
        else if(player.name === "player2"){
            p2ShipsContainer.append(boatFigureP2);
        }
    });
}
export function removeShipIcon(player){
    if(player.name === "player1"){
        p1ShipsContainer.firstElementChild.remove();
        p1InfoDiv.textContent = `${p1ShipsContainer.children.length} ships left to place.`
        if(p1ShipsContainer.children.length === 0){
            p1InfoDiv.textContent  = "All ships placed. Prepare to attack!";
            p1ShipsContainer.remove();
            arrows1.remove();
            orientDiv1.remove();
            
        }
    }
    else if(player.name === "player2"){
        p2ShipsContainer.firstElementChild.remove();
        p2InfoDiv.textContent = `${p2ShipsContainer.children.length} ships left to place.`
        if(p2ShipsContainer.children.length === 0){
            p2InfoDiv.textContent = "All ships placed. Prepare to attack!";
            p2ShipsContainer.remove();
            arrows2.remove();
            orientDiv2.remove();
        }
    }
    
}

function createLabels(playerDiv){
    const labels = document.createElement('div');
    labels.classList.add('labels');
    for(let i = 1; i <= 10; i++){
        const labelDiv = document.createElement('div');
        labelDiv.textContent =  i + "\n";
        labels.append(labelDiv);
    }
    playerDiv.prepend(labels);
}
createLabels(player1Div);
createLabels(player2Div);
export function renderGameboard(player, container, onCellClick, isHidden){
    const boardContainer = document.getElementById(container);
    boardContainer.innerHTML = ""; // for re-rendering
    player.board.forEach((row, r) => {
        row.forEach((cell, c) => {
            const cellDiv = document.createElement('div');
            if(isHidden){
                cellDiv.addEventListener('click', () => {
                    if(onCellClick) onCellClick(r, c);
                });
                if(cell.state === "ship"){
                    cellDiv.classList.add('cell');
                    boardContainer.append(cellDiv);
                }else{
                    updateCell(cell, cellDiv);
                    boardContainer.append(cellDiv);
                }
            }
            else{
                updateCell(cell, cellDiv);
                cellDiv.addEventListener('click', () => {
                    if(onCellClick) onCellClick(r, c);
                });
                boardContainer.append(cellDiv);
            }
        });
    });
}

const changeOrientBtn1 = document.getElementById('changeOrientBtn1');
const changeOrientBtn2 = document.getElementById('changeOrientBtn2')
changeOrientBtn1.addEventListener('click', () => {
    arrows1.classList.toggle('transformArrow');
    if(arrows1.classList.contains('transformArrow')){
        player1.setOrientation(true);
    }else{
        player1.setOrientation(false);
    }
})
changeOrientBtn2.addEventListener('click', () => {
    arrows2.classList.toggle('transformArrow');
    // active == horizontal, else == vertical
    if(arrows2.classList.contains('transformArrow')){
        player2.setOrientation(true);
    }else{
        player2.setOrientation(false);
    }
})



