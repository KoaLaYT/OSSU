import { Shape } from './shape';
const Tone = require('Tone');
export class Rectangle extends Shape {
    constructor(x, y) {
        super(x, y);
        this.color = 'orangered';
    }
    draw(ctx) {
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = this.color;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }
    setSize(w, h) {
        this.width = w;
        this.height = h;
    }
    contains(x, y) {
        return (x >= this.x &&
            x <= this.x + this.width &&
            (y >= this.y && y <= this.y + this.height));
    }
    progress(ctx, w) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, w, this.height);
        ctx.restore();
    }
    // TODO
    play() {
        const synth = new Tone.Synth().toMaster();
        synth.triggerAttackRelease(this.height - this.y + 100, this.width / 100);
        this.isPlaying = true;
    }
}
