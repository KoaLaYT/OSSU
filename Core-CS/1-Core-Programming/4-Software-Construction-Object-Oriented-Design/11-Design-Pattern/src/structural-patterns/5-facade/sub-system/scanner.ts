import { Token } from './token';

export class Scanner {
    private inputStream: string;

    constructor(input: string) {
        this.inputStream = input;
    }

    scan(): Token {
        return new Token();
    }
}
