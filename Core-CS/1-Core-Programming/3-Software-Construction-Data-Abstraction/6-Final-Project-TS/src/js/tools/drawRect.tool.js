import { Tool } from './tool';
import { Rectangle } from '../shapes/rectangle.shape';
export class DrawRectTool extends Tool {
    constructor(drawer) {
        super(drawer);
        this.isDrawing = false;
        this.ele.innerHTML = 'Draw Rectangle';
    }
    mousedownHandler(e) {
        this.currentRect = new Rectangle(e.offsetX, e.offsetY);
        this.drawer.addShape(this.currentRect);
        this.isDrawing = true;
    }
    mousemoveHandler(e) {
        if (this.isDrawing) {
            this.currentRect.setSize(e.offsetX - this.currentRect.topLeftX, e.offsetY - this.currentRect.topLeftY);
            this.drawer.draw();
        }
    }
    mouseupHandler(e) {
        this.isDrawing = false;
    }
    clickHandler(e) { }
}
