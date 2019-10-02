import { VisualComponent } from './visual-component';

export abstract class Decorator extends VisualComponent {
    private component: VisualComponent;

    constructor(c: VisualComponent) {
        super();
        this.component = c;
    }

    draw() {
        this.component.draw();
    }

    resize() {
        this.component.resize();
    }
}
