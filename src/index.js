import { Player } from "./player.js";
import { renderGameboard, updateCell, appendName } from "./ui.js";
import "./styles.css";
// ships are [Carrier(5), Battleship(4), Destroyer(3), Submarine(3), Patrol Boat(2)]
// Use this to view board in console: console.table(player1.getGameboard().map(row => row.map(cell => cell.state)));

let activePlayers = [];
function manageShipPlacement(player, ship, coords, isHorizontal, container){
    const result = player.gameboard.placeShip(player.availableShips[ship], coords, isHorizontal);
    if(result === true){
        container = player.name + "Board";
        renderGameboard(player.gameboard, container);
        // switchPlayer()......
    }
    else{
        console.error(result);
    }
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
export function createPlayer(name){
    const player = new Player(name);
}

export const player1 = new Player("player1");
export const player2 = new Player("player2");

const GameManager = (() => {
    appendName(player1, "player1Name");
    appendName(player2, "player2Name");
    
    /* PLAYER 1 MOVES */
    manageShipPlacement(player1, 0, [0,0], true);
    // Carrier (length: 5) @ [[0,0], [1,0], [2,0], [3,0], [4,0]]
    manageShipPlacement(player1, 1, [5,5], false);
    // Battleship (length: 4) @ [[5,5], [6,5], [7,5], [8,5]]
    manageShipPlacement(player1, 2, [1,1], false);
    // Destroyer (length: 3) @ [[1,1], [2,1], [3,1]]
    manageShipPlacement(player1, 3, [3,3], false);
    // Submarine (length: 3) @ [[3,3], [3,4], [3,5]]
    manageShipPlacement(player1, 4, [4,4], false);
    // Patrol Boat (length: 2) @ [[4,4], [5,4]]
    
    /* PLAYER 2 MOVES */
    manageShipPlacement(player2, 0, [0,0], true);
    // Carrier (length: 5) @ [[0,0], [1,0], [2,0], [3,0], [4,0]]
    manageShipPlacement(player2, 1, [5,5], false);
    // Battleship (length: 4) @ [[5,5], [6,5], [7,5], [8,5]]
    manageShipPlacement(player2, 2, [1,1], false);
    // Destroyer (length: 3) @ [[1,1], [2,1], [3,1]]
    manageShipPlacement(player2, 3, [3,3], false);
    // Submarine (length: 3) @ [[3,3], [3,4], [3,5]]
    manageShipPlacement(player2, 4, [4,4], false);
    // Patrol Boat (length: 2) @ [[4,4], [5,4]]

    let currentPlayer = player1;
    let waitingPlayer = player2;

    const getCurrentPlayer = () => currentPlayer.getName();
    const getWaitingPlayer = () => waitingPlayer.getName();
});
    // user hits 'start game' -> creates player w/ form -> battleship grids appear
    // game begins after players are created.

GameManager();



