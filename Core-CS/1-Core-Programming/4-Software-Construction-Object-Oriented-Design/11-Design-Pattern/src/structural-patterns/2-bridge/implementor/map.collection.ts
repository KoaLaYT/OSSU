import { Collection } from './collection.abstract';

export class MapCollection<T, K> extends Collection<T, K> {
    private collection: Map<K, T> = new Map();

    put(token: K, thing: T) {
        this.collection.set(token, thing);
    }

    get(token: K) {
        return this.collection.get(token);
    }
}
