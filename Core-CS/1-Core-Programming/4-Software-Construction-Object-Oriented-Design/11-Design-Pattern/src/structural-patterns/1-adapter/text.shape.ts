import { Manipulator } from './utils/manipulator';
import { TextView } from './text-view';
import { Shape } from './shape.abstract';
import { Point } from './utils/point';

export class TextShape extends Shape {
    private view: TextView;

    constructor(a: Point, b: Point) {
        super();
        this.view = new TextView(a.x, a.y, b.x - a.x, b.y - a.y);
    }

    boundingBox(a: Point, b: Point) {
        const [left, bottom] = this.view.getOrigin();
        const [width, height] = this.view.getExtent();

        a.x = left;
        a.y = bottom;
        b.x = left + width;
        b.y = bottom + height;
    }

    createManipulator(m: Manipulator) {
        return new Manipulator();
    }
}
