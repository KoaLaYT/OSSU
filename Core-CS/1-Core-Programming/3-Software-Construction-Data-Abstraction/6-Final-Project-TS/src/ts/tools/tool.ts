import { SimpleDrawer } from '../simpleDrawer';

export abstract class Tool {
    protected ele: HTMLElement;
    protected drawer: SimpleDrawer;

    constructor(drawer: SimpleDrawer) {
        this.ele = document.createElement('button');
        this.drawer = drawer;

        this.drawer.controllers.appendChild(this.ele);

        this.ele.addEventListener('click', () => {
            this.drawer.activateTool = this;
        });
    }

    public get element(): HTMLElement {
        return this.ele;
    }

    public abstract mousedownHandler(e: MouseEvent): void;

    public abstract mousemoveHandler(e: MouseEvent): void;

    public abstract mouseupHandler(e: MouseEvent): void;

    public abstract clickHandler(e: MouseEvent): void;
}
