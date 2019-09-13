import { Tool } from './tool';
import { Rectangle } from '../shapes/rectangle.shape';
import { SimpleDrawer } from '../simpleDrawer';

export class DrawRectTool extends Tool {
    private isDrawing = false;
    private currentRect: Rectangle;

    constructor(drawer: SimpleDrawer) {
        super(drawer);
        this.ele.innerHTML = 'Draw Rectangle';
    }

    public mousedownHandler(e: MouseEvent): void {
        this.currentRect = new Rectangle(e.offsetX, e.offsetY);
        this.drawer.addShape(this.currentRect);
        this.isDrawing = true;
    }

    public mousemoveHandler(e: MouseEvent): void {
        if (this.isDrawing) {
            this.currentRect.setSize(
                e.offsetX - this.currentRect.topLeftX,
                e.offsetY - this.currentRect.topLeftY
            );
            this.drawer.draw();
        }
    }

    public mouseupHandler(e: MouseEvent): void {
        this.isDrawing = false;
    }

    public clickHandler(e: MouseEvent): void {}
}
