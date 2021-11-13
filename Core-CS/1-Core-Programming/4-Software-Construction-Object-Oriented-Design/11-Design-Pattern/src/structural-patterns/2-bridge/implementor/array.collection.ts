import { Collection } from './collection.abstract';

export class ArrayCollection<T> extends Collection<T, number> {
    private collection: T[] = [];

    put(token: number, thing: T) {
        this.collection[token] = thing;
    }

    get(token: number) {
        return this.collection[token];
    }
}
