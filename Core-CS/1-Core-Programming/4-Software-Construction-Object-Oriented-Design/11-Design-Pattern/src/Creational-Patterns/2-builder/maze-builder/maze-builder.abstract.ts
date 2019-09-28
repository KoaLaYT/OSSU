import { Maze } from '../model/maze';

export abstract class MazeBuilder {
    protected maze: Maze;

    getMaze(): Maze {
        return this.maze;
    }

    abstract buildMaze(): void;

    abstract buildRoom(num: number): void;

    abstract buildDoor(roomFrom: number, roomTo: number): void;
}
