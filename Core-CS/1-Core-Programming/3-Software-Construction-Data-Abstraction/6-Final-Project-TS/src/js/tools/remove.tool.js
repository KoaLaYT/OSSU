import { Tool } from './tool';
export class RemoveTool extends Tool {
    constructor(drawer) {
        super(drawer);
        this.ele.innerHTML = 'Remove';
    }
    mousedownHandler(e) { }
    mousemoveHandler(e) { }
    mouseupHandler(e) {
        const selected = this.drawer.selectedShape(e.offsetX, e.offsetY);
        this.drawer.removeShape(selected);
        this.drawer.draw();
    }
    clickHandler(e) { }
}
