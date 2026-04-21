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

function onCellClick(player, row, col){
    const fleet = player.availableShips;
    // remoe this later
    console.log(`ShipIndex: ${shipIndex} + FleetLength: ${fleet.length}` );
    /* SWITCH THIS W/ A ROTATE BUTTON LATER */
    const isHorizontal = true;
    // if(!currentShip) return;
    if(shipIndex < fleet.length){
        const currentShip = fleet[shipIndex];
        const result = player.placeShip(currentShip, [row, col], isHorizontal);
        console.log(`Result: ${result} and Row: ${row} and Col: ${col}`);

        if(result === true){
            removeShipIcon(player);
            shipIndex++;
            renderGameboard(player.gameboard, `${player.name}Board`, (r,c) => {
                onCellClick(player, r, c)
            });
        }
    }
    else if(shipIndex === fleet.length){
        alert("All ships placed!");
    }
    else
        alert("Did nothing...."); // space occupied 
}

function switchPlayer(){
    if(currentPlayer === player1){
        currentPlayer = player2
        waitingPlayer = player1;
    }
    else{
        currentPlayer = player1;
        waitingPlayer = player2;
    }
}


const GameManager = (() => {
    /* UI INIT. */
    appendName(player1, "player1Name");
    appendName(player2, "player2Name");
    renderGameboard(player1.gameboard, "player1Board", (r,c) => onCellClick(player1, r, c));
    renderGameboard(player2.gameboard, "player2Board");
    /* INIT. PHASE (SHIP PLACEMENT PHASE) */
    // /* PLAYER 2 SHIP PLACEMENTS */
    // manageShipPlacement(player2, 0, [0,0], true);
    // // Carrier (length: 5) @ [[0,0], [1,0], [2,0], [3,0], [4,0]]
    // manageShipPlacement(player2, 1, [5,5], false);
    // // Battleship (length: 4) @ [[5,5], [6,5], [7,5], [8,5]]
    // manageShipPlacement(player2, 2, [1,1], false);
    // // Destroyer (length: 3) @ [[1,1], [2,1], [3,1]]
    // manageShipPlacement(player2, 3, [3,3], false);
    // // Submarine (length: 3) @ [[3,3], [3,4], [3,5]]
    // manageShipPlacement(player2, 4, [4,4], false);
    // // Patrol Boat (length: 2) @ [[4,4], [5,4]]
    
    /* ATTACK PHASE */

    const getCurrentPlayer = () => currentPlayer.getName();
    const getWaitingPlayer = () => waitingPlayer.getName();
});

GameManager();



