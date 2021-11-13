import { ThickWall } from './../model/thick-wall';
import { MazePrototypeFactory } from '../factory/maze-prototype-factory';
import { MazeFactory } from '../factory/maze-factory.abstract';
import { Door } from '../model/door';
import { Room, Direction } from '../model/room';
import { Maze } from '../model/maze';
import { Wall } from '../model/wall';

export class MazeGame {
    private maze: Maze;
    private factory: MazeFactory = new MazePrototypeFactory(
        new Maze(),
        new ThickWall(), // new Wall(),
        new Room(0),
        new Door(new Room(0), new Room(1))
    );

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
