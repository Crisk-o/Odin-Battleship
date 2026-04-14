export default class Ship{
    constructor(length){
        this.length = length;
        this.hits = 0;
        this.sunk= false;
    }

    getLength(){
        return this.length;
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