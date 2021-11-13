import { Shape } from './shape';

const Tone = require('Tone');

export class Rectangle extends Shape {
    constructor(x: number, y: number) {
        super(x, y);
        this.color = 'orangered';
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = this.color;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }

    public setSize(w: number, h: number): void {
        this.width = w;
        this.height = h;
    }

    public contains(x: number, y: number): boolean {
        return (
            x >= this.x &&
            x <= this.x + this.width &&
            (y >= this.y && y <= this.y + this.height)
        );
    }

    public progress(ctx: CanvasRenderingContext2D, w: number) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, w, this.height);
        ctx.restore();
    }

    play(): void {
        const synth = new Tone.Synth().toMaster();
        synth.triggerAttackRelease(
            this.height - this.y + 100,
            this.width / 100
        );
        this.isPlaying = true;
    }
}
