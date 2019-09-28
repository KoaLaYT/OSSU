import { SuperMazeFactory } from '../factories/super-maze-factory';
import { MazeFactory } from '../factories/maze-factory';
import { Direction } from '../model/room';
import { Maze } from '../model/maze';

export class MazeGame {
    private maze: Maze;
    /**
     * this factory can easily be replaced by its subclass
     * which may produce some subclass of Wall, Door or Room
     * and the createMaze did't need to change at all
     */
    // private factory = new MazeFactory();
    private factory = new SuperMazeFactory();

    constructor() {
        this.maze = this.createMaze(this.factory);
    }

    public showConstruct() {
        for (const room of this.maze.allRooms()) {
            console.log('Room: ' + room.getRoomNo);
            console.log(room.print());
        }
    }

    private createMaze(factory: MazeFactory): Maze {
        const aMaze = factory.makeMaze();

        const r1 = factory.makeRoom(1);
        const r2 = factory.makeRoom(2);

        const d = factory.makeDoor(r1, r2);

        r1.setSide(Direction.NORTH, d);
        r1.setSide(Direction.SOUTH, factory.makeWall());
        r1.setSide(Direction.EAST, factory.makeWall());
        r1.setSide(Direction.WEST, factory.makeWall());

        r2.setSide(Direction.NORTH, factory.makeWall());
        r2.setSide(Direction.SOUTH, d);
        r2.setSide(Direction.EAST, factory.makeWall());
        r2.setSide(Direction.WEST, factory.makeWall());

        aMaze.addRoom(r1);
        aMaze.addRoom(r2);

        return aMaze;
    }
}

new MazeGame().showConstruct();
