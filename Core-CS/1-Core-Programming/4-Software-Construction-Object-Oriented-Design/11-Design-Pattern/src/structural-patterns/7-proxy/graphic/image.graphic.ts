import { Graphic } from './graphic.abstract';

export class Image extends Graphic {
    private fileName: string;

    constructor(fileName: string) {
        super();
        this.fileName = fileName;
    }
}
