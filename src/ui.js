import boat from "./assets/ship.png";
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
const createPlayerBtn = document.getElementById('createPlayerBtn');
const createPlayerDialog = document.getElementById("formDialog");

startGameBtn.addEventListener('click', () => {
    startGameBtn.classList.toggle("hidden");
    createPlayerBtn.classList.toggle("hidden");
    contentDiv.classList.toggle("hidden");
})
createPlayerBtn.addEventListener('click', () => {
    createPlayerDialog.showModal();
})

const form = document.getElementById('createPlayerForm');
const formPlayerName = document.getElementById('nameInput');
form.addEventListener('submit', () => {
    createPlayer(formPlayerName);
    createPlayerDialog.close();
    form.reset();
});

const changeP1NameBtn = document.getElementById('changeNameBtn1')
const changeP2NameBtn = document.getElementById('changeNameBtn2');
const changeNameDialog = document.getElementById('changeNameDialog');
const changeNameForm = document.getElementById('changeNameForm');
const changeNameInput = document.getElementById('newNameInput');
changeP1NameBtn.addEventListener('click', (event) => {
    changeNameForm.setAttribute('data-player', '1');
    changeNameDialog.showModal();
})
changeP2NameBtn.addEventListener('click', (event) => {
    changeNameForm.setAttribute('data-player', '2');
    changeNameDialog.showModal();
})
changeNameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const changeNameInput = document.getElementById('newNameInput');
    const pNum = e.target.getAttribute('data-player')
    if(pNum == 1){
        player1Name.innerHTML = "";
        player1Name.textContent = changeNameInput.value; 
    }
    else if(pNum == 2){
        player2Name.innerHTML = "";
        player2Name.textContent = changeNameInput.value;
    }
    else{
        console.log("I did nothing. No name change." + pNum);
    }
    changeNameDialog.close();
    changeNameForm.reset();
})




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
        player1Name.classList.add('currentPlayer');
        player2Name.classList.toggle('currentPlayer');
    }
    else if(player.name === "player2"){
        player2Name.classList.add('currentPlayer');
        player1Name.classList.toggle('currentPlayer');
    }
}
export function playerInstructions(player){
    if(player.name === "player1"){
        if(player.placedShipCount !== 5){
            const result = `${player.name} place your ships!`;
            p1InfoDiv.append(result);
        }
    }
    else if(player.name === "player2"){
        if(player.placedShipCount !== 5){
            const result = `${player.name} place your ships!`;
            p2InfoDiv.append(result);
        }
    }
}

export function appendName(player, container){
    const nameContainer = document.getElementById(container);
    nameContainer.textContent = player.name;
    // playerInstructions(player);
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
        }
    }
    else if(player.name === "player2"){
        p2ShipsContainer.firstElementChild.remove();
        p2InfoDiv.textContent = `${p2ShipsContainer.children.length} ships left to place.`
        if(p2ShipsContainer.children.length === 0){
            p2InfoDiv.textContent = "All ships placed. Prepare to attack!";
            p2ShipsContainer.remove();
        }
    }
    
}

function createLabels(playerDiv){
    const labels = document.createElement('div');
    labels.classList.add('labels');
    for(let i = 0; i <= 9; i++){
        const labelDiv = document.createElement('div');
        labelDiv.textContent =  i + "\n";
        labels.append(labelDiv);
    }
    playerDiv.prepend(labels);
}
createLabels(player1Div);
createLabels(player2Div);
export function renderGameboard(player, container, onCellClick){
    const boardContainer = document.getElementById(container);
    boardContainer.innerHTML = ""; // for re-rendering
    player.board.forEach((row, r) => {
        row.forEach((cell, c) => {
            const cellDiv = document.createElement('div');
            updateCell(cell, cellDiv);
            // this sends row/col data back to index.js upon click
            cellDiv.addEventListener('click', () => {
                if(onCellClick) onCellClick(r, c);
            });
            boardContainer.append(cellDiv);
        });
    });
}




