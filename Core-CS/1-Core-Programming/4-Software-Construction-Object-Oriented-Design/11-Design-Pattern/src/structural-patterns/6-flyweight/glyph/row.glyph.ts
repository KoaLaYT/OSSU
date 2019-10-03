import { GlyphContext } from './glyph-context';
import { Character } from './character.glyph';
import { Glyph } from './glyph';

export class Row extends Glyph {
    private chars: Character[];

    constructor(chars: Character[]) {
        super();
        this.chars = [...chars];
    }

    draw(context: GlyphContext) {
        // override
    }
}
