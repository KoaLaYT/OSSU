import { Maze } from '../model/maze';
import { Door } from '../model/door';
import { Wall } from '../model/wall';
import { Room } from '../model/room';

export class MazeFactory {
    private static theInstance: MazeFactory;
    private static registries: Map<string, MazeFactory> = new Map();

    static instance() {
        if (!this.theInstance) {
            const choice = process.env.MAZESTYLE || 'MazeFactory';
            this.theInstance = this.lookup(choice);
        }
        return this.theInstance;
    }

    private static lookup(choice: string): MazeFactory {
        return this.registries.get(choice);
    }

    static registry(factoryToken: string, factory: typeof MazeFactory) {
        if (!this.registries.get(factoryToken)) {
            this.registries.set(factoryToken, new factory());
        }
    }

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
