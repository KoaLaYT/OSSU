import { Room } from '../model/room';
import { Wall } from '../model/wall';
import { Maze } from '../model/maze';
import { Door } from '../model/door';

export abstract class MazeFactory {
    abstract makeMaze(): Maze;

    abstract makeWall(): Wall;

    abstract makeRoom(num: number): Room;

    abstract makeDoor(r1: Room, r2: Room): Door;
}
