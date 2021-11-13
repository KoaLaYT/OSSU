import { Tool } from './tool';
import { SimpleDrawer } from '../simpleDrawer';

export class PlayAllTool extends Tool {
    constructor(drawer: SimpleDrawer) {
        super(drawer);
        this.ele.innerHTML = 'Play All';

        this.ele.addEventListener('click', () => {
            this.drawer.playAll();
        });
    }

    public mousedownHandler(e: MouseEvent): void {}

    public mousemoveHandler(e: MouseEvent): void {}

    public mouseupHandler(e: MouseEvent): void {}

    public clickHandler(e: MouseEvent): void {}
}
