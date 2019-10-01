import { StringStore } from './abstraction/string.storage';

const store = new StringStore();

store.store(['hello', 'world']);

console.log(store.get(1));
