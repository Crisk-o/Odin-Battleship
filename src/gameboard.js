export class Cell{
    constructor(){
        //this.validStates = ["empty", "ship", "miss", "hit"]
        this.state = "empty";
    }
    getState(){
        return this.state;
    }
    //change state on hit, ship placement,
    receiveHit(){
        if(this.state === "ship"){
            this.state = "hit";
            return true;
        }else if(this.state === "empty"){
            this.state === "miss"
            return false;
        }
        return null;
    }
    addShip(){
        if(this.state === "empty") this.state === "ship";
    }
};

export class Gameboard{
    constructor(){
        this.board = this.createGameboard();
        this.missedHits = Array.from({length: 10}, () => Array(10).fill(false));;
    }
    createGameboard(){
        // const yLabels = "ABCDEFGHIJ".split("");
        // const board = yLabels.map(x => Array.from({length:10},(_,y) => ({x, y: y+1}))
        // );
        // create a new cell for each slot, so each is unique.
        const board = Array.from({length: 10}, () => 
            Array.from({length: 10}, () => new Cell())
        );
        return board;
    }
    getGameboard(){
        return this.board;
    }

    placeShip(ship, startCoords, isHorizontal){
        // place given ship class at given coordinates. 
        let horizontal = false;
        if(isHorizontal == "horizontal"){
            horizontal = true;
        }
        const cellsToOccupy = [];
        const [row, col] = startCoords;

        for(let i = 0; i < ship.getLength(); i++){
            // if horizontal==true, row stays the same, otherwise increase by i.
            const r = horizontal ? row: row + i;
            // if horizontal==true, col increases by i, otherwise stays the same.
            const c = horizontal ? col + i :col;

            if(r < 0 || r >= 10 || c < 0 || c >= 10){
                throw RangeError("Out of Gameboard area!");
            }
            if(board[r][c].state !== "empty"){
                return "Space already occupied!";
            }
            // push path-in-progress to cellsToOccupy. 
            cellsToOccupy.push(this.board[r][c]);
        }
        // path is eligible, so push it to the gameboard
        cellsToOccupy.forEach(cell => cell.addShip());
        return true;
    }

    receiveAttack([x,y]){
        // takes given coords, determines if attack hit ship or not
        // 'x' indice is the ROW and 'y' is the COLUMN.
        // ex: given [0,5] - target cell is @ row 0 column 5.
        const target = this.board[x][y];
        target.receiveHit();

    }

    allShipSunk(){
        // iterate through gameBoard and scan if unsunk ships.
        // if all ships are sunk return true, else false.


        return false;
    }
}

let game = new Gameboard();
let board = game.getGameboard();
console.table(board.map(row => row.map(cell => cell.state))); // visualize the gameboard
