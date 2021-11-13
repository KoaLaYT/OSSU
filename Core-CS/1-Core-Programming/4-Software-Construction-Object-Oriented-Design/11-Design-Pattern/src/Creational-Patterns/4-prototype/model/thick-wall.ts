import { Wall } from './wall';
export class ThickWall extends Wall {
    print(): string {
        return '|||';
    }

    clone(): Wall {
        return new ThickWall();
    }
}
