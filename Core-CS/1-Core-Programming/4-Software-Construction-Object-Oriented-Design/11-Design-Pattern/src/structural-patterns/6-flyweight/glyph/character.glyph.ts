import { GlyphContext } from './glyph-context';
import { Glyph } from './glyph';

export class Character extends Glyph {
    private char: number;

    constructor(char: number) {
        super();
        this.char = char;
    }

    draw(context: GlyphContext) {
        // override
    }
}
