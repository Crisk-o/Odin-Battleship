import Ship from "./ship.js";
describe('Ship', () => {
    let myShip;

    beforeEach(() => { myShip = new Ship(5)});

    test('creating a ship of length 5 and hitting it once', () => {
        myShip.timesHit();
        expect(myShip.hits).toBe(1);
    });

    test('sinking ship of length 5. isSunk() should return true', () => {
        myShip.timesHit(); myShip.timesHit(); myShip.timesHit(); myShip.timesHit(); myShip.timesHit();
        expect(myShip.isSunk()).toBe(true);
    });
});