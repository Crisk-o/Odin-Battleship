import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";

export class Player{
    constructor(name){
        this.name = name;
        this.isComputer = false;
        this.gameboard =  new Gameboard();
        this.availableShips = this.#createFleet();
    }
    setAsComputer(){
        this.isComputer = true;
        this.name = "Bot";
    }

    attack(coords){
        // player chooses coords and then at
        return this.gameboard.receiveAttack(coords);
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