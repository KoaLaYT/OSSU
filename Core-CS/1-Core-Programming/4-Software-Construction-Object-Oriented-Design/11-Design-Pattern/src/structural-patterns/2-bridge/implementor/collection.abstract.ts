export abstract class Collection<T, K> {
    abstract put(token: K, thing: T): void;
    abstract get(token: K): T;
}
