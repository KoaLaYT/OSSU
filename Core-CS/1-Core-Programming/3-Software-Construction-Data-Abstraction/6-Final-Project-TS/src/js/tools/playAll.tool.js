import { Tool } from './tool';
export class PlayAllTool extends Tool {
    constructor(drawer) {
        super(drawer);
        this.ele.innerHTML = 'Play All';
        this.ele.addEventListener('click', () => {
            this.drawer.playAll();
        });
    }
    mousedownHandler(e) { }
    mousemoveHandler(e) { }
    mouseupHandler(e) { }
    clickHandler(e) { }
}
