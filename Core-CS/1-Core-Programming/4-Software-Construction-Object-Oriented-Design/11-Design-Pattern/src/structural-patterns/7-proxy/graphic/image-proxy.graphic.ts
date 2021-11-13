import { Graphic } from './graphic.abstract';
import { Image } from './image.graphic';
import { Point } from '../utils/Point';

export class ImageProxy extends Graphic {
    private fileName: string;
    private image: Image;
    private extent: Point;

    constructor(fileName: string) {
        super();
        this.fileName = fileName;
    }

    private getImage() {
        if (!this.image) {
            this.image = new Image(this.fileName);
        }
        return this.image;
    }

    draw() {
        this.getImage().draw();
    }

    handleEvent() {
        this.getImage().handleEvent();
    }

    getExtent() {
        if (!this.extent) {
            this.extent = this.getImage().getExtent();
        }
        return this.extent;
    }

    load() {
        this.getImage().load();
    }
}
