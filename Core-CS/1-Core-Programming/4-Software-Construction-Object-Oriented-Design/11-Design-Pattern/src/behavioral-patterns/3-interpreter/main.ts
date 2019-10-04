import { Context } from './boolExp/context';
import { Constant } from './boolExp/constant.boolExp';
import { VariableExp } from './boolExp/variableExp.boolExp';
import { AndExp } from './boolExp/andExp.boolExp';
import { OrExp } from './boolExp/orExp.boolExp';
import { BoolExp } from './boolExp/boolExp.abstract';
import { NotExp } from './boolExp/notExp.boolExp';

//  (true and x) or (y and (not x))
const x: VariableExp = new VariableExp('X');
const y: VariableExp = new VariableExp('Y');

const context: Context = new Context();
context.assign('X', false);
context.assign('Y', true);

const exp: BoolExp = new OrExp(
    new AndExp(new Constant(true), x),
    new AndExp(y, new NotExp(x))
);

console.log(exp.evaluate(context));
