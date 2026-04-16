import { Ship } from "./ship.js";
import { Cell, Gameboard} from "./gameboard.js";
import { Player } from "./player.js";
// ships are [Carrier(5), Battleship(4), Destroyer(3), Submarine(3), Patrol Boat(2)]
const player1 = new Player("player1");
const player2 = new Player("player2");
player1.gameboard.placeShip(player1.availableShips[0], [0,0], "horizontal");
player2.gameboard.placeShip(player2.availableShips[0], [0,0], "horizontal");
// Carrier (length: 5) @ [[0,0], [1,0], [2,0], [3,0], [4,0]]
player1.gameboard.placeShip(player1.availableShips[1], [5,5], "vert");
player2.gameboard.placeShip(player2.availableShips[1], [5,5], "vert");
// Battleship (length: 4) @ [[5,5], [6,5], [7,5], [8,5]]
console.log("player 1 board: ");
console.table(player1.getGameboard().map(row => row.map(cell => cell.state)));
console.log("player 2 board: ");
console.table(player2.getGameboard().map(row => row.map(cell => cell.state)));



