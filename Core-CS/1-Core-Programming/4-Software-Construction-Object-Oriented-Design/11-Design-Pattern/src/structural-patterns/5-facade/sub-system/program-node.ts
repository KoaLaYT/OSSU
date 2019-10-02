import { CodeGenerator } from './code-generator';

export abstract class ProgramNode {
    add(node: ProgramNode) {}
    remove(node: ProgramNode) {}
    traverse(generator: CodeGenerator) {}
}
