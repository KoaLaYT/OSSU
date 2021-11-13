import { Context } from './context';

export abstract class BoolExp {
    abstract evaluate(context: Context): boolean;
}
