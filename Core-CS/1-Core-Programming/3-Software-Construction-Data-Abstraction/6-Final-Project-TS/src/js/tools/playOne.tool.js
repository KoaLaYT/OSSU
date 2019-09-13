import { Tool } from './tool';
export class PlayOneTool extends Tool {
    constructor(drawer) {
        super(drawer);
        this.ele.innerHTML = 'Play One';
    }
    mousedownHandler(e) { }
    mousemoveHandler(e) { }
    mouseupHandler(e) { }
    clickHandler(e) {
        const selected = this.drawer.selectedShape(e.offsetX, e.offsetY);
        this.drawer.playOne(selected);
    }
}
