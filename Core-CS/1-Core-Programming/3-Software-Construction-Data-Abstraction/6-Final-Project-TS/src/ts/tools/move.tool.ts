import { Tool } from './tool';
import { SimpleDrawer } from '../simpleDrawer';

export class MoveTool extends Tool {
    private selectedIndex = -1;
    private lastMouseX: number;
    private lastMouseY: number;

    constructor(drawer: SimpleDrawer) {
        super(drawer);
        this.ele.innerHTML = 'Move';
    }

    public mousedownHandler(e: MouseEvent): void {
        this.selectedIndex = this.drawer.selectedShape(e.offsetX, e.offsetY);
        if (this.selectedIndex >= 0) {
            this.lastMouseX = e.offsetX;
            this.lastMouseY = e.offsetY;
        }
    }

    public mousemoveHandler(e: MouseEvent): void {
        if (this.selectedIndex >= 0) {
            this.drawer.moveShape(
                this.selectedIndex,
                e.offsetX - this.lastMouseX,
                e.offsetY - this.lastMouseY
            );
            this.drawer.draw();
            this.lastMouseX = e.offsetX;
            this.lastMouseY = e.offsetY;
        }
    }

    public mouseupHandler(e: MouseEvent): void {
        this.selectedIndex = -1;
    }

    public clickHandler(e: MouseEvent): void {}
}
