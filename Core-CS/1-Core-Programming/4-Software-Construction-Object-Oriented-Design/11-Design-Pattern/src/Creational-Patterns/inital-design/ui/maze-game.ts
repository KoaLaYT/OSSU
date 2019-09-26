import { Door } from './../model/door.class';
import { Room, Direction } from './../model/room.class';
import { Maze } from '../model/maze.class';
import { Wall } from '../model/wall.class';

export class MazeGame {
    private maze: Maze;

    constructor() {
        this.maze = this.createMaze();
    }

    public showConstruct() {
        for (const room of this.maze.allRooms()) {
            console.log('Room: ' + room.getRoomNo);
            console.log(room.print());
        }
    }

    private createMaze(): Maze {
        const aMaze = new Maze();

        const r1 = new Room(1);
        const r2 = new Room(2);

        const d = new Door(r1, r2);

        r1.setSide(Direction.NORTH, d);
        r1.setSide(Direction.SOUTH, new Wall());
        r1.setSide(Direction.EAST, new Wall());
        r1.setSide(Direction.WEST, new Wall());

        r2.setSide(Direction.NORTH, new Wall());
        r2.setSide(Direction.SOUTH, d);
        r2.setSide(Direction.EAST, new Wall());
        r2.setSide(Direction.WEST, new Wall());

        aMaze.addRoom(r1);
        aMaze.addRoom(r2);

        return aMaze;
    }
}

new MazeGame().showConstruct();
