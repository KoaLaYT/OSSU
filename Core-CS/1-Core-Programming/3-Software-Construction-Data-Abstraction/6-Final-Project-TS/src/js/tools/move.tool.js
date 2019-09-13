import { Tool } from './tool';
export class MoveTool extends Tool {
    constructor(drawer) {
        super(drawer);
        this.selectedIndex = -1;
        this.ele.innerHTML = 'Move';
    }
    mousedownHandler(e) {
        this.selectedIndex = this.drawer.selectedShape(e.offsetX, e.offsetY);
        if (this.selectedIndex >= 0) {
            this.lastMouseX = e.offsetX;
            this.lastMouseY = e.offsetY;
        }
    }
    mousemoveHandler(e) {
        if (this.selectedIndex >= 0) {
            this.drawer.moveShape(this.selectedIndex, e.offsetX - this.lastMouseX, e.offsetY - this.lastMouseY);
            this.drawer.draw();
            this.lastMouseX = e.offsetX;
            this.lastMouseY = e.offsetY;
        }
    }
    mouseupHandler(e) {
        this.selectedIndex = -1;
    }
    clickHandler(e) { }
}
