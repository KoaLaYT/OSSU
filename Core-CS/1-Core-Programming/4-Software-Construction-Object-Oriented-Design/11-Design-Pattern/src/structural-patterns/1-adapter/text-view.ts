export class TextView {
    constructor(
        private x: number,
        private y: number,
        private width: number,
        private height: number
    ) {}

    getOrigin() {
        return [this.x, this.y];
    }

    getExtent() {
        return [this.width, this.height];
    }
}
