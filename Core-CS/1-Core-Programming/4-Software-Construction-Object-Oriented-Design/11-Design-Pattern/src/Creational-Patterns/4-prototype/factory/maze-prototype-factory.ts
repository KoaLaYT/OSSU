import { MazeFactory } from './maze-factory.abstract';
import { Maze } from '../model/maze';
import { Wall } from '../model/wall';
import { Room } from '../model/room';
import { Door } from '../model/door';

export class MazePrototypeFactory extends MazeFactory {
    private prototypeMaze: Maze;
    private prototypeWall: Wall;
    private prototypeRoom: Room;
    private prototypeDoor: Door;

    constructor(m: Maze, w: Wall, r: Room, d: Door) {
        super();
        this.prototypeMaze = m;
        this.prototypeWall = w;
        this.prototypeRoom = r;
        this.prototypeDoor = d;
    }

    makeMaze(): Maze {
        return this.prototypeMaze.clone();
    }

    makeWall(): Wall {
        return this.prototypeWall.clone();
    }

    makeRoom(num: number): Room {
        const room = this.prototypeRoom.clone();
        room.initialize(num);
        return room;
    }

    makeDoor(r1: Room, r2: Room): Door {
        const door = this.prototypeDoor.clone();
        door.initalize(r1, r2);
        return door;
    }
}
