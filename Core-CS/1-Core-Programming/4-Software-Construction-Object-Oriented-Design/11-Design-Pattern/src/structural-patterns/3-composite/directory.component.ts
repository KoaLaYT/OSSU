import { Component } from './component.abstract';

export class Directory extends Component {
    private componets = new Set<Component>();

    constructor(name: string) {
        super();
        this.size = 0;
        this.name = name;
    }

    add(c: Component): void {
        this.componets.add(c);
    }

    remove(c: Component): void {
        this.componets.delete(c);
    }

    totalSize(): number {
        return Array.from(this.componets).reduce(
            (acc, component) => acc + component.totalSize(),
            0
        );
    }

    print(indent: string = ''): string {
        return [
            super.print(indent),
            ...Array.from(this.componets).map(component =>
                component.print(indent + '  ')
            )
        ].join('\n');
    }
}
