import { Context } from './context';
import { BoolExp } from './boolExp.abstract';

export class NotExp extends BoolExp {
    private exp: BoolExp;

    constructor(exp: BoolExp) {
        super();
        this.exp = exp;
    }

    evaluate(context: Context): boolean {
        return !this.exp.evaluate(context);
    }
}
