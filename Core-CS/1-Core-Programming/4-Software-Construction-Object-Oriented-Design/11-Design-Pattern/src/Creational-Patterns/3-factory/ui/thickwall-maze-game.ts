import { ThickWall } from './../model/thick-wall';
import { MazeGame } from './maze-game';

export class ThickwallMazeGame extends MazeGame {
    protected makeWall() {
        return new ThickWall();
    }
}
