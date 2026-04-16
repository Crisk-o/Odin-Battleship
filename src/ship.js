export class Ship{
    constructor(length, name){
        this.length = length;
        this.hits = 0;
        this.sunk= false;
        this.position = [];
        this.name = name;
    }

    getLength(){
        return this.length;
    }
    getPosition(){
        return this.position;
    }
    // this should only be called once, when the ship is initially placed.
    setPosition([x,y]){
        return this.position = [x,y];
    }
    timesHit(){
        this.hits += 1;
    }

    isSunk(){
        if(this.length == this.hits)
            return this.sunk = true;
        return this.sunk = false;
    }
}

