import { Request } from './../request/request';
import { DialogRequest } from './../request/dialog.request';
import { Handler } from './handler';

export class Dialog extends Handler {
    constructor(successor: Handler) {
        super(successor);
    }

    handle(req: Request) {
        if (req instanceof DialogRequest) {
            console.log(`${req} handled by <<dialog>>`);
        } else {
            this.successor.handle(req);
        }
    }
}
