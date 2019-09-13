import { Tool } from './tool';
import { SimpleDrawer } from '../simpleDrawer';

export class PlayOneTool extends Tool {
    constructor(drawer: SimpleDrawer) {
        super(drawer);
        this.ele.innerHTML = 'Play One';
    }

    public mousedownHandler(e: MouseEvent): void {}

    public mousemoveHandler(e: MouseEvent): void {}

    public mouseupHandler(e: MouseEvent): void {}

    public clickHandler(e: MouseEvent): void {
        const selected = this.drawer.selectedShape(e.offsetX, e.offsetY);
        this.drawer.playOne(selected);
    }
}
