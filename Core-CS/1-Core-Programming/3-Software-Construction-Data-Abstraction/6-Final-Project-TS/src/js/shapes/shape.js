export class Shape {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isPlaying = false;
    }
    get topLeftX() {
        return this.x;
    }
    get topLeftY() {
        return this.y;
    }
    setAnchor(x, y) {
        this.x = x;
        this.y = y;
    }
}
