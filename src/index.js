import { Player } from "./player.js";
import { renderGameboard, updateCell, appendName, removeShipIcon, styleCurrentPlayer, styleWinner} from "./ui.js";
import "./styles.css";
// ships are [Carrier(5), Battleship(4), Destroyer(3), Submarine(3), Patrol Boat(2)]


export function createPlayer(name){
    const player = new Player(name);
}
const player1 = new Player("player1");
const player2 = new Player("player2");
player2.setAsComputer();
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
// for use CPU attack phase.
let missedShots = [];
function computerAttack(){
    let row = Math.floor(Math.random() * fleet.length);
    let col = Math.floor(Math.random() * fleet.length);
    if(!missedShots.includes[row,col]){
        const result = player2.attackShip(player1.gameboard, row, col);
        if(result !== "Already attacked here"){
            renderGameboard(player1.gameboard, "player1Board", (r,c) => handleAttack(player2,r,c));
            if(result === false){
                missedShots.push([row,col]);
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
    console.log("currentPlayer (after switch): " + currentPlayer.name); // remove later.

    styleCurrentPlayer(currentPlayer);
}

function handleAttack(player, row, col){
    if(player.name === "player1"){
        // pass to attackShip - the opponent's gameboard, and [row,col]
        const result = player1.attackShip(player2.gameboard, row, col);
        if(result !== "Already attacked here"){
            renderGameboard(player2.gameboard, "player2Board", (r,c) => handleAttack(player1,r,c));
        }
    }
    else if(player.name === "player2"){
        renderGameboard(player1.gameboard, "player1Board", (r,c) => handleAttack(player2,r,c));
        const result = player2.attackShip(player1.gameboard, row,col);
        if(result !== "Already attacked here")
            renderGameboard(player1.gameboard, "player1Board", (r,c) => handleAttack(player2,r,c));
        // if(player2.isComputer === true){
        //     // computerAttack();
        // }
    }
    checkForWin();
}

async function startAttackPhase(){
        // asks if currentPlayer is player1
        const isP1 = currentPlayer.name === "player1";
        const attacker = isP1 ? player1 : player2;
        const defender = isP1 ? player2 : player1;
        const attackerBoard = isP1 ? "player1Board" : "player2Board";
        const defenderBoard = isP1 ? "player2Board" : "player1Board";
        renderGameboard(attacker.gameboard, attackerBoard);

        await new Promise(resolve => {
            renderGameboard(defender.gameboard, defenderBoard, (r,c) => {
                handleAttack(attacker, r,c,);
                resolve();
            })
        });
        console.log("Finished turn. Switching player....");
}
function initializeUI(){
    renderGameboard(player1.gameboard, "player1Board");
    renderGameboard(player2.gameboard, "player2Board");
    appendName(player1, "player1Name");
    appendName(player2, "player2Name");
}
function startPlacementPhase(){
    // for 'real' player to click on board for placements.
    renderGameboard(player1.gameboard, "player1Board", (r,c) => handlePlacement(player1, r, c));
    randomShipPlacements(); // computer places ships at random.
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
            // condition not met, wait 0.1sec and try again.
            else{
                setTimeout(check, 100);
            }
        };
        check();
    });
}


function checkForWin(){
    if(player1.gameboard.allShipsSunk()) return "Player2 Wins";
    if(player2.gameboard.allShipsSunk()) return "Player1 Wins;"
    return null;
}
function declareWinner(winner){
    styleWinner();
}
async function GameManager(){
    let winner = null;
    const getCurrentPlayer = () => currentPlayer.getName();
    const getWaitingPlayer = () => waitingPlayer.getName();
    /* UI INIT. */
    initializeUI();
    startPlacementPhase();
    await waitForPlacement();
    while(!winner) {
        await startAttackPhase();
        winner = checkForWin();
        if(!winner)
            switchPlayer();
    }
    declareWinner(winner);
};

GameManager();



