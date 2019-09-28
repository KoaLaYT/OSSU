import { MazeFactory } from './maze-factory';
import { SuperWall } from '../model/variations/super-wall';

export class SuperMazeFactory extends MazeFactory {
    makeWall() {
        return new SuperWall();
    }
}
