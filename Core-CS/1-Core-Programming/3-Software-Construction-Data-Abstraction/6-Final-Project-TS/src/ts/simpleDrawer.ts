import { PlayAllTool } from './tools/playAll.tool';
import { PlayOneTool } from './tools/playOne.tool';
import { MoveTool } from './tools/move.tool';
import { Shape } from './shapes/shape';
import { Tool } from './tools/tool';
import { DrawRectTool } from './tools/drawRect.tool';
import { RemoveTool } from './tools/remove.tool';

export class SimpleDrawer {
    private shapes: Shape[] = [];
    private tools: Tool[] = [];
    private canvas: HTMLCanvasElement;
    private currentTool: Tool;
    private RATIO = 10; // playing speed
    private playingShapes: number[] = [];
    public readonly ctx: CanvasRenderingContext2D;
    public readonly controllers: HTMLElement;

    constructor() {
        this.controllers = document.createElement('div');
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.controllers.classList.add('controllers');
        document.body.appendChild(this.controllers);

        this.equipTool([
            new DrawRectTool(this),
            new RemoveTool(this),
            new MoveTool(this),
            new PlayOneTool(this),
            new PlayAllTool(this)
        ]);
        this.initalEventListeners();
    }

    public addShape(s: Shape) {
        this.shapes.push(s);
    }

    public removeShape(i: number) {
        if (i >= 0) this.shapes.splice(i, 1);
    }

    public moveShape(i: number, dx: number, dy: number) {
        const shape = this.shapes[i];
        let x = shape.topLeftX + dx;
        let y = shape.topLeftY + dy;
        // boundary check
        if (x < 0) x = 0;
        if (x + shape.width > this.canvas.width)
            x = this.canvas.width - shape.width;
        if (y < 0) y = 0;
        if (y + shape.height > this.canvas.height)
            y = this.canvas.height - shape.height;
        // set new anchor
        shape.setAnchor(x, y);
    }

    public playOne(i: number) {
        if (i < 0) return;

        this.playingShapes = [];
        this.playingShapes.push(i);
        this.play(
            this.shapes[i].topLeftX,
            this.shapes[i].width * this.RATIO,
            false
        );
    }

    public playAll() {
        this.play(0, this.canvas.width * this.RATIO, true);
    }

    public selectedShape(x: number, y: number): number {
        for (let i = this.shapes.length - 1; i >= 0; i--) {
            const shape = this.shapes[i];
            if (shape.contains(x, y)) {
                return i;
            }
        }
        return -1;
    }

    public draw() {
        this.clearCanvas();
        this.shapes.forEach(s => {
            s.draw(this.ctx);
        });
    }

    public set activateTool(t: Tool) {
        if (this.currentTool)
            this.currentTool.element.classList.remove('chosen');

        this.currentTool = t;
        this.currentTool.element.classList.add('chosen');
    }

    private equipTool(ts: Tool[]) {
        this.tools.push(...ts);
    }

    private initalEventListeners() {
        this.canvas.addEventListener('mousedown', e => {
            if (this.currentTool) this.currentTool.mousedownHandler(e);
        });
        this.canvas.addEventListener('mousemove', e => {
            if (this.currentTool) this.currentTool.mousemoveHandler(e);
        });
        this.canvas.addEventListener('mouseup', e => {
            if (this.currentTool) this.currentTool.mouseupHandler(e);
        });
        this.canvas.addEventListener('click', e => {
            if (this.currentTool) this.currentTool.clickHandler(e);
        });
    }

    private play(start: number, total: number, all: boolean) {
        const self = this;
        let initTime: number;
        let now: number;

        const raf = window.requestAnimationFrame($play);

        function $play(t: number) {
            if (!initTime) {
                initTime = t;
                now = start;
                self.draw();
            } else if (t - initTime <= total) {
                self.clearCanvas();
                now = start + (t - initTime) / self.RATIO;
                if (all) {
                    self.checkPlayingShapes(now);
                }
                self.shapes.forEach((s: Shape, i: number) => {
                    if (self.playingShapes.includes(i)) {
                        s.draw(self.ctx);
                        s.progress(self.ctx, now - s.topLeftX);
                        if (!s.isPlaying) s.play();
                    } else {
                        s.draw(self.ctx);
                        s.isPlaying = false;
                    }
                });
            } else {
                self.draw();
                self.closeAllMusic();
                window.cancelAnimationFrame(raf);
                return;
            }
            if (all) {
                self.drawProgressLine(now);
            }
            window.requestAnimationFrame($play);
        }
    }

    private checkPlayingShapes(w: number) {
        this.playingShapes = [];
        this.shapes.forEach((s: Shape, i: number) => {
            if (w >= s.topLeftX && w <= s.topLeftX + s.width) {
                this.playingShapes.push(i);
            }
        });
    }

    private clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private closeAllMusic() {
        this.shapes.forEach(s => (s.isPlaying = false));
    }

    private drawProgressLine(x: number) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.moveTo(x, 0);
        this.ctx.lineTo(x, this.canvas.height);
        this.ctx.stroke();
        this.ctx.restore();
    }
}
