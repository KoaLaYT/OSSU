import { Room } from './room';

export class Maze {
    private rooms: Map<number, Room> = new Map();

    allRooms(): IterableIterator<Room> {
        return this.rooms.values();
    }

    roomNo(num: number): Room {
        return this.rooms.get(num);
    }

    addRoom(room: Room) {
        this.rooms.set(room.getRoomNo, room);
    }
}
