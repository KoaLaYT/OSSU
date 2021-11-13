import { Request } from './../request/request';
import { ButtonRequest } from './../request/button.request';
import { Handler } from './handler';

export class Button extends Handler {
    constructor(successor: Handler) {
        super(successor);
    }

    handle(req: Request) {
        if (req instanceof ButtonRequest) {
            console.log(`${req} handled by <<button>>`);
        } else {
            this.successor.handle(req);
        }
    }
}
