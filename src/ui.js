import { player1 , player2} from "./index.js";
import { Player } from "./player.js";
import { createPlayer, GameManager } from "./index.js";
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
    // contentDiv.classList.toggle("hidden");
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
export function appendName(player, container){
    const nameContainer = document.getElementById(container);
    nameContainer.textContent = player.getName();
}
export function renderGameboard(playerBoard, container){
    const boardContainer = document.getElementById(container)
    boardContainer.innerHTML = ""; // for re-rendering
    if(container.id === "player2Board"){
        // make .ship cells hidden.....
    }
    // to figure out placement when player attack by clicking on a cellDiv:
    // row = Math.floor(index/10) 
    // col = index % 10 ex: cell 23 chosen(1-100 not 0-99) index is 22. 22 % 10 = col2.
    playerBoard.board.flat().forEach((cell) => {
        const cellDiv = document.createElement('div');
        updateCell(cell, cellDiv);
        boardContainer.append(cellDiv);
    });
}




