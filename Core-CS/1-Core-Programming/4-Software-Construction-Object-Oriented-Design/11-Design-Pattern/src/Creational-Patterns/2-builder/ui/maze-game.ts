import { CrazyMazeBuilder } from '../maze-builder/crazy-maze-builder';
import { StandardMazeBuilder } from '../maze-builder/standard-maze-builder';
import { Maze } from '../model/maze';
import { MazeBuilder } from '../maze-builder/maze-builder.abstract';

export class MazeGame {
    private maze: Maze;
    // private builder: MazeBuilder = new StandardMazeBuilder();
    private builder: MazeBuilder = new CrazyMazeBuilder();

    constructor() {
        this.maze = this.createMaze(this.builder);
    }

    public showConstruct() {
        for (const room of this.maze.allRooms()) {
            console.log('Room: ' + room.getRoomNo);
            console.log(room.print());
        }
    }

    // createMaze act like the Director
    // told the builder to build things
    private createMaze(builder: MazeBuilder): Maze {
        builder.buildMaze();

        builder.buildRoom(1);
        builder.buildRoom(2);

        builder.buildDoor(1, 2);

        return builder.getMaze();
    }
}

new MazeGame().showConstruct();
