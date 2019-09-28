import { Maze } from '../model/maze';
import { Door } from '../model/door';
import { Wall } from '../model/wall';
import { Room } from '../model/room';

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
