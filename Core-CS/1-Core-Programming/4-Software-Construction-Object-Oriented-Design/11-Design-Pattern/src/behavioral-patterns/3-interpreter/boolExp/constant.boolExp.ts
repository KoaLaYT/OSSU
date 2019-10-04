import { BoolExp } from './boolExp.abstract';
import { Context } from './context';

export class Constant extends BoolExp {
    private val: boolean;

    constructor(val: boolean) {
        super();
        this.val = val;
    }

    evaluate(context: Context) {
        return this.val;
    }
}
