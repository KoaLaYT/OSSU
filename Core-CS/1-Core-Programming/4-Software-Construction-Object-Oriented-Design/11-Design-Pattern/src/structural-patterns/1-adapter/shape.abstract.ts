import { Manipulator } from './utils/manipulator';
import { Point } from './utils/point';

export abstract class Shape {
    abstract boundingBox(a: Point, b: Point): void;
    abstract createManipulator(m: Manipulator): Manipulator;
}
