import { VisualComponent } from './visual-component';
import { Decorator } from './decorator.abstract';

export class BorderDecorator extends Decorator {
    private width: number;

    constructor(c: VisualComponent, width: number) {
        super(c);
        this.width = width;
    }

    private drawBorder() {
        // detail omitted
    }

    // override the default
    draw() {
        super.draw();
        this.drawBorder();
    }
}
