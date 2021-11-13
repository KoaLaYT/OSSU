import { Character } from './character.glyph';
import { Row } from './row.glyph';

export class GlyphFactory {
    private chars: Character[] = [];

    createCharacter(char: number) {
        if (!this.chars[char]) {
            this.chars[char] = new Character(char);
        }
        return this.chars[char];
    }

    createRow(chars: Character[]) {
        return new Row(chars);
    }
}
