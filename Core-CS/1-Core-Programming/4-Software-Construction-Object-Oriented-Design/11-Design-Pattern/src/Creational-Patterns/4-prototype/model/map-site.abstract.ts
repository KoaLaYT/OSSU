export abstract class MapSite {
    public abstract enter(): void;

    public abstract print(): string;

    public abstract clone(): MapSite;
}
