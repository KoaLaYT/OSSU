import { BTree } from '../utils/BTree';
import { Font } from '../utils/font';

export class GlyphContext {
    private index: number = 0;
    private fonts: BTree = new BTree();

    insert(quantity: number) {}
    next() {}

    setFont(font: Font, span: number) {}
    getFont(): Font {
        return;
    }
}
