export abstract class Shape {
    // cordinate of the topleft point
    protected x: number;
    protected y: number;
    // size of the shape
    public width: number;
    public height: number;
    // color of the shape
    protected color: string;
    // is music playing
    public isPlaying: boolean;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.isPlaying = false;
    }

    public get topLeftX(): number {
        return this.x;
    }

    public get topLeftY(): number {
        return this.y;
    }

    public setAnchor(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    /**
     * ABSTRACTS
     */
    // drawing the shape on to the canvas
    abstract draw(ctx: CanvasRenderingContext2D): void;
    // set width and height of the shape
    abstract setSize(w: number, h: number): void;
    // determine if the shape contains cordinate x and y
    abstract contains(x: number, y: number): boolean;
    // animate the progress effect of the shape
    abstract progress(ctx: CanvasRenderingContext2D, ratio: number): void;
    // start playing the music of the shape
    abstract play(): void;
}
