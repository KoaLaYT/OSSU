import { Document } from './utils/document';
import { ommand } from './command.abstract';

export class PasteCommand extends Command {
    private doc: Document;

    constructor(doc: Document) {
        this.doc = doc;
    }

    execute() {
        this.doc.paste();
    }
}
