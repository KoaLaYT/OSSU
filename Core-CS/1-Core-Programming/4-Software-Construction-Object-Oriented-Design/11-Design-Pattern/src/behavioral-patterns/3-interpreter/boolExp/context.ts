export class Context {
    private vars: Map<string, boolean> = new Map();

    lookup(name: string): boolean {
        return this.vars.get(name);
    }

    assign(name: string, val: boolean) {
        this.vars.set(name, val);
    }
}
