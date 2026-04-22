import { Player } from "./player.js";
import { renderGameboard, updateCell, appendName, removeShipIcon, styleCurrentPlayer} from "./ui.js";
import "./styles.css";
// ships are [Carrier(5), Battleship(4), Destroyer(3), Submarine(3), Patrol Boat(2)]


export function createPlayer(name){
    const player = new Player(name);
}
const player1 = new Player("player1");
const player2 = new Player("player2");
let currentPlayer = player1;
let waitingPlayer = player2;
let shipIndex = 0;
function handlePlacement(player, row, col){
    const fleet = player.availableShips;
    /* SWITCH THIS W/ A ROTATE BUTTON LATER */
    const isHorizontal = true;
    if(shipIndex < fleet.length){
        const currentShip = fleet[shipIndex];
        const result = player.placeShip(currentShip, [row, col], isHorizontal);
        if(result === true){
            player.placedShipCount += 1;
            removeShipIcon(player);
            shipIndex++;
            renderGameboard(player.gameboard, `${player.name}Board`, (r,c) => {
                handlePlacement(player, r, c)
            });
        }
    }
    else if(shipIndex === fleet.length)
        alert("All ships placed!");
    else
        alert("Did nothing...."); // space occupied 
}


// for use when CPU is chosen to play
let alreadyChosen = [];
function randomShipPlacements(){
    let i = 0;
    let fleet = player2.availableShips;
    while(i < fleet.length){
        let row = Math.floor(Math.random() * fleet.length);
        let col = Math.floor(Math.random() * fleet.length);
        if(!alreadyChosen.includes([row,col])){
            let result = player2.placeShip(fleet[i], [row, col], true);
            if(result === true){
                player2.placedShipCount += 1;
                i++;
                removeShipIcon(player2)
                alreadyChosen.push([row,col]);
            }
        }
    } 
    renderGameboard(player2.gameboard, "player2Board");
  
}
function switchPlayer(){
    if(currentPlayer == player1){
        currentPlayer = player2
        waitingPlayer = player1;
    }
    else{
        currentPlayer = player1;
        waitingPlayer = player2;
    }
    styleCurrentPlayer(currentPlayer)
}

function handleAttack(player, row, col){
    if(player.name === "player1"){
        // pass to attackShip - the opponent's gameboard, and [row,col]
        const result = player1.attackShip(player2.gameboard, row, col);
        if(result !== "Already attack here"){
            renderGameboard(player2.gameboard, "player2Board", (r,c) => handleAttack(player1,r,c));
            if(player2.gameboard.allShipsSunk()){
                return `${player.name} Wins!`;
            }
            switchPlayer();
        }
    }
    else if(player.name === "player2"){
        if(player2.isComputer === true){
            // computer attack function here.
        }
        const result = player2.attackShip(player1.gameboard, row,col);
        if(result !== "Already attack here"){
            renderGameboard(player1.gameboard, "player1Board", (r,c) => handleAttack(player2,r,c));
            if(player1.gameboard.allShipsSunk()){
                return `${player.name} Wins!`;
            }
            switchPlayer();
        }
    }
};
// function awaitAttack(){
//     return new Promise(resolve => {
//         const checkTurnTaken = () =>{
//             if()
//         }
//     })
// }
function takeAttackTurn(){
    let turnTaken = false;
    // while(turnTaken === false){
        if(currentPlayer.name === "player1"){
            renderGameboard(player2.gameboard, "player2Board", (r,c) => handleAttack(player1, r, c));
            renderGameboard(player1.gameboard, "player1Board")
            turnTaken = true;
        }
        else if(currentPlayer.name === "player2"){
            renderGameboard(player1.gameboard, "player1Board", (r,c) => handleAttack(player2, r, c)); 
            renderGameboard(player2.gameboard, "player2Board") 
            turnTaken = true;
        }
    //}
}
function initializeUI(){
    renderGameboard(player1.gameboard, "player1Board");
    renderGameboard(player2.gameboard, "player2Board");
    appendName(player1, "player1Name");
    appendName(player2, "player2Name");
}
function startPlacementPhase(){
    renderGameboard(player1.gameboard, "player1Board", (r,c) => handlePlacement(player1, r, c));
    randomShipPlacements();
}
function waitForPlacement(){
    let maxShipCount = 5;
    return new Promise(resolve => {
        // check function 'checks' for count amount
        const check = () => {
            // if condition is met, resolve promise.
            if(player1.placedShipCount === maxShipCount && player2.placedShipCount === maxShipCount){
                console.log("ALL SHIPS PLACED. RESOLVING PROMISE");
                resolve();
            }
            // condition not met, wait 2sec and try again.
            else{
                setTimeout(check, 2000);
            }
        };
        check();
    });
}
async function startAttackPhase(){
    takeAttackTurn();
}

async function GameManager(){
    const getCurrentPlayer = () => currentPlayer.getName();
    const getWaitingPlayer = () => waitingPlayer.getName();
    /* UI INIT. */
    initializeUI();
    startPlacementPhase();
    await waitForPlacement();
    startAttackPhase();
    

};

GameManager();



