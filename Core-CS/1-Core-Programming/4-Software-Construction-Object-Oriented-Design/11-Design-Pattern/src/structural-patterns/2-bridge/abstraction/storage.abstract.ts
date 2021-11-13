export abstract class Store<T> {
    abstract store(things: T[]): void;
    abstract get(NO: number): T;
}
