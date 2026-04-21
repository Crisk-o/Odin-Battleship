import { Player } from "./player.js";
import { renderGameboard, updateCell, appendName, removeShipIcon} from "./ui.js";
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
}

function handleAttack(player, row, col){
    currentPlayer = player;
    if(player.name === "player1"){
        const result = player1.attackShip(player2.gameboard, [row, col]);
        if(result !== "Already attack here"){
            renderGameboard(player2.gameboard, "player2Board", handleAttack);
            if(player2.gameboard.allShipsSunk()){
                return `${player.name} Wins!`;
            }
            switchPlayer();
        }
    }
    else if(player.name === "player2"){
        const result = player2.attackShip(player1.gameboard, [row,col]);
        if(result !== "Already attack here"){
            renderGameboard(player2.gameboard, "player2Board", handleAttack);
            if(player2.gameboard.allShipsSunk()){
                return `${player.name} Wins!`;
            }
            switchPlayer();
        }
    }
}
const GameManager = (() => {
    /* UI INIT. */
    const getCurrentPlayer = () => currentPlayer.getName();
    const getWaitingPlayer = () => waitingPlayer.getName();
    appendName(player1, "player1Name");
    appendName(player2, "player2Name");
    renderGameboard(player1.gameboard, "player1Board", (r,c) => handlePlacement(player1, r, c));
    randomShipPlacements();
    renderGameboard(player2.gameboard, "player2Board", (r,c) => handleAttack(currentPlayer, r, c));    
    /* ATTACK PHASE */
    // goes until one players ships are all sunk
    // while(!(player1.gameboard.allShipsSunk() || player2.gameboard.allShipsSunk())){
    //     handleAttack(getCurrentPlayer, );

    // }


});

GameManager();



