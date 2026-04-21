
export class Cell{
    constructor(){
        this.state = "empty";
        this.ship = null;
    }

    receiveHit(){
        if(this.state === "ship"){
            this.state = "hit";
            this.ship.hit();
            return true; // hit
        }else if(this.state === "empty"){
            this.state = "miss"
            return false; // miss
        }
        return null; // already shot
    }

    addShip(shipInst){
        if(this.state === "empty") {
            this.state = "ship";
            this.ship = shipInst;
        }
    }
    
    toString(){
        return "Cell: state = " + this.state;
    }
};

export class Gameboard{
    constructor(){
        this.board = this.createGameboard();
        this.missedHits = [];
    }
    createGameboard(){
        // create a new cell for each slot, so each is unique.
        const board = Array.from({length: 10}, () => 
            Array.from({length: 10}, () => new Cell())
        );
        return board;
    }
    getGameboard(){ return this.board; }
    
    placeShip(ship, startCoords, isHorizontal){
        const horizontal = (isHorizontal === "horizontal" || isHorizontal === "Horizontal" || isHorizontal == true);
        const cellsToOccupy = [];
        const [row, col] = startCoords;

        for(let i = 0; i < ship.getLength(); i++){
            // if horizontal==true, row stays the same, otherwise increase by i.
            const r = horizontal ? row: row + i;
            // if horizontal==true, col increases by i, otherwise stays the same.
            const c = horizontal ? col + i :col;
            // checks boundary
            if(r < 0 || r >= 10 || c < 0 || c >= 10){
                return "Out of Gameboard area!";
            }
            // ship already at location
            if(this.board[r][c].state !== "empty"){
                return "Space already occupied!";
            }
            // push path-in-progress to cellsToOccupy. 
            cellsToOccupy.push(this.board[r][c]);
        }
        // path is eligible, so push it to the gameboard
        cellsToOccupy.forEach(cell => cell.addShip(ship));
        return true;
    }

    receiveAttack([r, c]){
        // takes given coords, determines if attack hit ship or not
        // 'x' indice is the ROW and 'y' is the COLUMN.
        // ex: given [0,5] - target cell is @ row 0 column 5.
        return this.board[r][c].receiveHit();
    }

    allShipSunk(){
        // if all ships are sunk return true, else false.
        //.flat() makes board list of 100 cells and prevents us from iterating w/ nested for loops
        return this.board.flat().every(cell => cell.state !== "ship"); // will return T/F 
    }
}

// game.placeShip(myShip, [0,0], "vert");
//     console.table(board.map(row => row.map(cell => cell.state)));
