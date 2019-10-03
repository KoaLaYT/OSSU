import { Point } from '../utils/Point';

export abstract class Graphic {
    draw() {}
    handleEvent() {}
    getExtent(): Point {
        return;
    }
    load() {}
}
