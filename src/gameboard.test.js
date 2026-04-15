import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";

describe('Gameboard', () => {
    let gameBoard = new Gameboard();
    // beforeEach(() => { gameBoard = new Gameboard()});

    test('creating a 10x10 gameboard', () =>{
        expect(gameBoard.getGameboard().length).toBe(10);
        gameBoard.getGameboard().forEach(element => {
            expect(element.length).toBe(10);
        });
    });

    test('placing ship of length 3 at cells [[0,0], [0,1], [0,2]', ()=> {
        let myShip1 = new Ship(3);
        expect(gameBoard.placeShip(myShip1, [0,0], "horizontal")).toBe(true);
    });

    test('placing ship of length 3 at cells [[0,9], [1,9], [2,9]]', () => {
        let myShip2 = new Ship(3);
        expect(gameBoard.placeShip(myShip2, [0,9], "vertical")).toBe(true);
    });

    test('placing ship in an occupied space, expecting an error', () => {
        let myShip3 = new Ship(3);
        expect(gameBoard.placeShip(myShip3, [0,9], "vertical")).toBe('Space already occupied!');
    });
    
    test("testing Gameboard's receiveAttack function on ship at [[0,0], [0,1], [0,2]. Attacking cell [0,0]", () =>{
        expect(gameBoard.receiveAttack([0,0])).toBe(true);
    });

    test("testing Gameboard's receiveAttack on empty cell", () => {
        expect(gameBoard.receiveAttack([9,9])).toBe(false);
    });
    
    test("testing Gameboard's allShipSunk w/ active ships on board. Expecting false.", () => {
        expect(gameBoard.allShipSunk()).toBe(false);
    });

    test("testing Gameboard's allShipSunk w/ no active ships on board. Expecting true.", () => {
        gameBoard.receiveAttack([0,0]); gameBoard.receiveAttack([0,1]); gameBoard.receiveAttack([0,2]); gameBoard.receiveAttack([0, 9]); 
        gameBoard.receiveAttack([1,9]); gameBoard.receiveAttack([2,9]);
        expect(gameBoard.allShipSunk()).toBe(true);
    });


    
})