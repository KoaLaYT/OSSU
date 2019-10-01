import { Component } from './component.abstract';

export class File extends Component {
    constructor(name: string, size: number) {
        super();
        this.size = size;
        this.name = name;
    }
}
