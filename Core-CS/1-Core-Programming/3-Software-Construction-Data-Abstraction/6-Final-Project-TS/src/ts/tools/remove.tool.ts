import { Tool } from './tool';
import { SimpleDrawer } from '../simpleDrawer';

export class RemoveTool extends Tool {
    constructor(drawer: SimpleDrawer) {
        super(drawer);
        this.ele.innerHTML = 'Remove';
    }

    public mousedownHandler(e: MouseEvent): void {}

    public mousemoveHandler(e: MouseEvent): void {}

    public mouseupHandler(e: MouseEvent): void {
        const selected = this.drawer.selectedShape(e.offsetX, e.offsetY);
        this.drawer.removeShape(selected);
        this.drawer.draw();
    }

    public clickHandler(e: MouseEvent): void {}
}
