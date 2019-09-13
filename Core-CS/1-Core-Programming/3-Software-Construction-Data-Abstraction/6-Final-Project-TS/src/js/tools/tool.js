export class Tool {
    constructor(drawer) {
        this.ele = document.createElement('button');
        this.drawer = drawer;
        this.drawer.controllers.appendChild(this.ele);
        this.ele.addEventListener('click', () => {
            this.drawer.activateTool = this;
        });
    }
    get element() {
        return this.ele;
    }
}
