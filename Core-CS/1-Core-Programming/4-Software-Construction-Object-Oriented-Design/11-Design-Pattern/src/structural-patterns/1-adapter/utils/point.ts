export class Point {
    constructor(public x: number, public y: number) {}

    print() {
        return `Point: (${this.x}, ${this.y})`;
    }
}
