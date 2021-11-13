import { Context } from './context';
import { BoolExp } from './boolExp.abstract';

export class AndExp extends BoolExp {
    private exp1: BoolExp;
    private exp2: BoolExp;

    constructor(exp1: BoolExp, exp2: BoolExp) {
        super();
        this.exp1 = exp1;
        this.exp2 = exp2;
    }

    evaluate(context: Context): boolean {
        return this.exp1.evaluate(context) && this.exp2.evaluate(context);
    }
}
