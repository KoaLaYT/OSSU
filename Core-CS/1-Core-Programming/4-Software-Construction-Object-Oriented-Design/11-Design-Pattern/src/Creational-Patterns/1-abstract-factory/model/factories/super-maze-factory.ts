import { MazeFactory } from './maze-factory';
import { SuperWall } from '../variations/super-wall.class';

export class SuperMazeFactory extends MazeFactory {
    makeWall() {
        return new SuperWall();
    }
}
