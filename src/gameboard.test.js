import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";

describe('Gameboard', () => {
    let gameBoard;
    beforeEach(() => { gameBoard = new Gameboard()});

    test('creating a 10x10 gameboard', () =>{
        expect(gameBoard.getGameboard().length).toBe(10);
        gameBoard.getGameboard().forEach(element => {
            expect(element.length).toBe(10);
        });
    });

    test('placing a ship of length 3 at cells [[0,0], [0,1], [0,2]', ()=> {
        let myShip = new Ship(3);
        expect(gameBoard.placeShip(myShip, [0,0], "horizontal")).toBe(true);
    })


    
})