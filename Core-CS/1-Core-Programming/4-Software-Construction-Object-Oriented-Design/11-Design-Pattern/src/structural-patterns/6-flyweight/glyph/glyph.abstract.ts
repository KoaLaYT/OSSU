import { GlyphContext } from './glyph-context';
import { Font } from '../utils/font';

export abstract class Glyph {
    draw(context: GlyphContext) {}

    setFont(font: Font, context: GlyphContext) {}
    getFont(context: GlyphContext): Font {
        return;
    }

    first(context: GlyphContext) {}
    next(context: GlyphContext) {}

    current(context: GlyphContext): Glyph {
        return;
    }

    insert(g: Glyph, context: GlyphContext) {}
    remove(context: GlyphContext) {}
}
