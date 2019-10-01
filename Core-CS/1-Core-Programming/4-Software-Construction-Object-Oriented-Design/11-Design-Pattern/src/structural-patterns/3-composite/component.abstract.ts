export abstract class Component {
    protected name: string;
    protected size: number;

    add(c: Component): void {
        throw new Error(`${this.constructor.name} can't add components`);
    }

    remove(c: Component): void {
        throw new Error(`${this.constructor.name} has no child to remove`);
    }

    totalSize(): number {
        return this.size;
    }

    print(indent: string = ''): string {
        return `${indent}${this.constructor.name}-${
            this.name
        }: ${this.totalSize()}`;
    }
}
