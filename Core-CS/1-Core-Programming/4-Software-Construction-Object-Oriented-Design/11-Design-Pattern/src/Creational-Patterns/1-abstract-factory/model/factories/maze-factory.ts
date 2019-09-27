import { Maze } from '../maze.class';
import { Door } from '../door.class';
import { Wall } from '../wall.class';
import { Room } from '../room.class';

export class MazeFactory {
    makeMaze() {
        return new Maze();
    }

    makeWall() {
        return new Wall();
    }

    makeDoor(r1: Room, r2: Room) {
        return new Door(r1, r2);
    }

    makeRoom(num: number) {
        return new Room(num);
    }
}
