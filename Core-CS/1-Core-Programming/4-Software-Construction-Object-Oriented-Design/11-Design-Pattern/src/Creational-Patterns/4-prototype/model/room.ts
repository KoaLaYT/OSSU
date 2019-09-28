import { MapSite } from './map-site.abstract';

export enum Direction {
    NORTH = 'north',
    SOUTH = 'south',
    WEST = 'west',
    EAST = 'east'
}

export class Room extends MapSite {
    private roomNo: number;
    private sides = {
        [Direction.NORTH]: undefined,
        [Direction.SOUTH]: undefined,
        [Direction.WEST]: undefined,
        [Direction.EAST]: undefined
    };

    constructor(num: number) {
        super();
        this.roomNo = num;
    }

    enter(): void {}

    print(): string {
        let result = '';
        Object.keys(this.sides).forEach(side => {
            result +=
                `${side}: ${this.getSide(side as Direction).print()}` + '\n';
        });
        return result;
    }

    clone(): Room {
        return new Room(this.roomNo);
    }

    initialize(num: number): void {
        this.roomNo = num;
    }

    setSide(d: Direction, ms: MapSite) {
        this.sides[d] = ms;
    }

    getSide(d: Direction): MapSite {
        return this.sides[d];
    }

    get getRoomNo() {
        return this.roomNo;
    }
}
