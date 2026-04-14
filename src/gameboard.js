class Gameboard{
    constructor(){
        const gameBoard = Array.from({length: 10}, (_,x) => 
            Array.from({ length: 10 }, (_, y) => ({ x, y})));
        const missedHits = [];
    }

    placeShip(ship , [x,y]){
        // place given ship class at given coordinates. 
        // if coords are off the board, throw error
    }

    receiveAttack([x,y]){
        // takes given coords, determines if attack hit ship or not
        // sends 'hit' function to correct ship OR records coordinates of missed shot.

    }

    allShipSunk(){
        // iterate through gameBoard and scan if unsunk ships.
        // if all ships are sunk return true, else false.


        return false;
    }
}