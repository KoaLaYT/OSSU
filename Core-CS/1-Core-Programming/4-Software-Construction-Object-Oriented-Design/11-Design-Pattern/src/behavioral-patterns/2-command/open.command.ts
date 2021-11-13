import { Document } from './utils/document';
import { Application } from './utils/application';
import { Command } from './command.abstract';

export class OpenCommand extends Command {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    execute() {
        const name = askUser();
        const doc = new Document(name);
        this.app.add(doc);
        doc.open();
    }

    private askUser(): string {
        return;
    }
}
