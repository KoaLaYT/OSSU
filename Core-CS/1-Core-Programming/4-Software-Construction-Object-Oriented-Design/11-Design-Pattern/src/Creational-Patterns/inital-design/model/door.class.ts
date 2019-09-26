import { MapSite } from './map-site.abstract';
import { Room } from './room.class';

export class Door extends MapSite {
    private room1: Room;
    private room2: Room;
    private isOpen = false;

    constructor(r1: Room, r2: Room) {
        super();
        this.room1 = r1;
        this.room2 = r2;
    }

    enter(): void {}

    print(): string {
        return `Room${this.room1.getRoomNo} <---> Room${this.room2.getRoomNo}`;
    }

    otherSideFrom(room: Room): Room {
        if (room.getRoomNo === this.room1.getRoomNo) {
            return this.room2;
        } else if (room.getRoomNo === this.room2.getRoomNo) {
            return this.room1;
        }
    }
}
