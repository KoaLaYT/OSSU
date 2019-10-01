import { MapCollection } from './../implementor/map.collection';
import { Store } from './storage.abstract';
import { Collection } from '../implementor/collection.abstract';

export class StringStore extends Store<string> {
    private imp: Collection<string, number> = new MapCollection();

    store(things: string[]) {
        things.forEach((thing, index) => {
            this.imp.put(index, thing);
        });
    }

    get(NO: number) {
        return this.imp.get(NO);
    }
}
