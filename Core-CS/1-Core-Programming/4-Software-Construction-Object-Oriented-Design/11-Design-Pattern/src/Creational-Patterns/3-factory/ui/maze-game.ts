import { Door } from '../model/door';
import { Room, Direction } from '../model/room';
import { Maze } from '../model/maze';
import { Wall } from '../model/wall';

export class MazeGame {
    protected maze: Maze;

    constructor() {
        this.maze = this.createMaze();
    }

    showConstruct() {
        for (const room of this.maze.allRooms()) {
            console.log('Room: ' + room.getRoomNo);
            console.log(room.print());
        }
    }

    protected createMaze(): Maze {
        const aMaze = this.makeMaze();

        const r1 = this.makeRoom(1);
        const r2 = this.makeRoom(2);

        const d = this.makeDoor(r1, r2);

        r1.setSide(Direction.NORTH, d);
        r1.setSide(Direction.SOUTH, this.makeWall());
        r1.setSide(Direction.EAST, this.makeWall());
        r1.setSide(Direction.WEST, this.makeWall());

        r2.setSide(Direction.NORTH, this.makeWall());
        r2.setSide(Direction.SOUTH, d);
        r2.setSide(Direction.EAST, this.makeWall());
        r2.setSide(Direction.WEST, this.makeWall());

        aMaze.addRoom(r1);
        aMaze.addRoom(r2);

        return aMaze;
    }

    protected makeWall() {
        return new Wall();
    }

    protected makeRoom(roomNo: number) {
        return new Room(roomNo);
    }

    protected makeDoor(r1: Room, r2: Room) {
        return new Door(r1, r2);
    }

    protected makeMaze() {
        return new Maze();
    }
}
