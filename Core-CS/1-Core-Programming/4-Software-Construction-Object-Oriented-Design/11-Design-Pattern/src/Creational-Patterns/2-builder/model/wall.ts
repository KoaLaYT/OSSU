import { MapSite } from './map-site.abstract';

export class Wall extends MapSite {
    enter(): void {}

    print(): string {
        return '|';
    }
}
