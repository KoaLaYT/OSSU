import { Parser } from './sub-system/parser';
import { ProgramNodeBuilder } from './sub-system/program-node-builder';
import { Scanner } from './sub-system/scanner';
import { BytecodeStream } from './sub-system/bytecode-stream';

export class Compiler {
    private scanner: Scanner;
    private builder: ProgramNodeBuilder = new ProgramNodeBuilder();
    private parser: Parser = new Parser();

    constructor(input: string) {
        this.scanner = new Scanner(input);
    }

    compiler(): BytecodeStream {
        this.parser.parse(this.scanner, this.builder);
        // ...
        return;
    }
}
