import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";

export class Player{
    constructor(name){
        this.name = name;
        this.isComputer = false;
        this.gameboard =  new Gameboard();
        this.availableShips = this.#createFleet();
        this.placedShipCount = 0;
    }
    setAsComputer(){
        this.isComputer = true;
        this.name = "Bot";
    }
    getName(){
        return this.name;
    }
    setName(name){ 
        this.name = name;
    }

    placeShip(ship, startCoords, isHorizontal){
        return this.gameboard.placeShip(ship, startCoords, isHorizontal);
    }

    attackShip(oppGameboard, coords){
        // player chooses coords and then at
        return oppGameboard.receiveAttack(coords);
    }
    getGameboard(){
        return this.gameboard.getGameboard();
    }    
    #createFleet(){ 
      return  [
            new Ship(5, "Carrier"),
            new Ship(4, "Battleship"),
            new Ship(3, "Destroyer"),
            new Ship(3, "Submarine"),
            new Ship(2, "Patrol Boat")
        ];
    }
}