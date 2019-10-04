import { BoolExp } from './boolExp.abstract';
import { Context } from './context';

export class VariableExp extends BoolExp {
    private name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }

    evaluate(context: Context): boolean {
        return context.lookup(this.name);
    }
}
