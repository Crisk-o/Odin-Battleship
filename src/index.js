import { Player } from "./player.js";
import { renderGameboard, updateCell, appendName, removeShipIcon, styleCurrentPlayer, styleWinner, switchPlayerScreen} from "./ui.js";
import "./styles.css";
// ships are [Carrier(5), Battleship(4), Destroyer(3), Submarine(3), Patrol Boat(2)]

export const player1 = new Player("player1");
export const player2 = new Player("player2");
let currentPlayer = player1;
let waitingPlayer = player2;
let shipIndex = 0;

function setOrientation(player, orient){
    player.setOrientation(orient);
}
function getOrientation(player){
    return player.getOrientation();
}
function handlePlacement(player, row, col){
    const fleet = player.availableShips;
    const isHorizontal = getOrientation(player);
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
    else if(player.placedShipCount === fleet.length)
        alert("All ships placed!");
}

// for use when CPU is chosen to play
let alreadyChosen = [];
function randomShipPlacements(){
    let i = 0;
    let horizontal = true;
    const orientations = [0,1]; // 0 = vertical, 1 = horizontal
    let orientation = Math.floor(Math.random() * orientations.length);
    if(orientation === orientation[0]){
        horizontal = false;
    }
    const fleet = player2.availableShips;
    while(i < fleet.length){
        let row = Math.floor(Math.random() * fleet.length);
        let col = Math.floor(Math.random() * fleet.length);
        if(!alreadyChosen.includes([row,col])){
            let result = player2.placeShip(fleet[i], [row, col], horizontal);
            if(result === true){
                player2.placedShipCount += 1;
                i++;
                removeShipIcon(player2)
                alreadyChosen.push([row,col]);
                renderGameboard(player2.gameboard, "player2Board", handlePlacement(player2, row, col), true);
            }
        }
    } 
}
// for CPU attack phase.
let missedShots = [];
async function computerAttack(){
    let shotLaunched = false;
    const fleet = player2.availableShips;
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);
    while(shotLaunched == false){
        if(!(missedShots.includes[row,col])){
            const result = player2.attackShip(player1.gameboard, row, col);
            if(result === false){
                missedShots.push([row,col]);
                shotLaunched = true;
            }  
            if(result === true){
                renderGameboard(player1.gameboard, "player1Board", (r,c) => handleAttack(player2,r,c), false);
                shotLaunched = true;
            }
            if(result === "Already attacked here"){
                row = Math.floor(Math.random() * fleet.length);
                col = Math.floor(Math.random() * fleet.length);
            }
        }
    }
}

async function switchPlayer(){
    if(player2.isComputer === false){
    }
    if(currentPlayer == player1){
        currentPlayer = player2
        waitingPlayer = player1;
    }
    else{
        currentPlayer = player1;
        waitingPlayer = player2;
    }
    if(player1.isComputer === false && player2.isComputer === false)
        await switchPlayerScreen();
    styleCurrentPlayer(currentPlayer);

}

async function waitHalfSecond(){
    return new Promise(resolve => setTimeout(resolve, 500));
}



function handleAttack(player, row, col){
    if(player.name === "player1"){
        // pass to attackShip - the opponent's gameboard, and [row,col]
        const result = player1.attackShip(player2.gameboard, row, col);
        if(result !== "Already attacked here"){
            renderGameboard(player2.gameboard, "player2Board", (r,c) => handleAttack(player1,r,c), true);
        }
    }
    else if(player.name === "player2"){
        if(player2.isComputer === true){
            computerAttack();
        }else{
            const result = player2.attackShip(player1.gameboard, row,col);
            if(result !== "Already attacked here")
                renderGameboard(player1.gameboard, "player1Board", (r,c) => handleAttack(player2,r,c));
        }
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
        if(attacker.name === player2.name && attacker.isComputer === true){
            renderGameboard(attacker.gameboard, attackerBoard,"", true);
            computerAttack();
        }
        else{
            renderGameboard(attacker.gameboard, attackerBoard);
            await new Promise(resolve => {
                renderGameboard(defender.gameboard, defenderBoard, (r,c) => {
                    handleAttack(attacker, r,c,);
                    resolve();
                }, true);
            });
        }
}

function initializeUI(){
    renderGameboard(player1.gameboard, "player1Board");
    renderGameboard(player2.gameboard, "player2Board");
    appendName(player1, "player1Name");
    appendName(player2, "player2Name");
}

async function startPlacementPhase(){
    // for 'real' player to click on board for placements.
    renderGameboard(player1.gameboard, "player1Board", (r,c) => handlePlacement(player1, r, c));
    await waitForPlacement(player1);
    if(player2.isComputer === true){
        randomShipPlacements(); // computer places ships at random.
    }
    else{
        shipIndex = 0;
        renderGameboard(player2.gameboard, "player2Board", (r,c) => handlePlacement(player2, r, c));
    }
}
function waitForPlacement(player){
    let maxShipCount = 5;
    return new Promise(resolve => {
        // check function 'checks' for count amount
        const check = () => {
            // if condition is met, resolve promise.
            if(player.placedShipCount === maxShipCount){
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
    if(player1.gameboard.allShipsSunk()) return player2;
    if(player2.gameboard.allShipsSunk()) return player1
    return null;
}
function declareWinner(winner){
    styleWinner(winner);
}

async function GameManager(){
    let winner = null;
    initializeUI();
    startPlacementPhase();
    await waitForPlacement(player1);
    await waitForPlacement(player2);
    while(!winner) {
        await startAttackPhase();
        winner = checkForWin();
        if(!winner)
            switchPlayer();
    }
    declareWinner(winner);
};

GameManager();



