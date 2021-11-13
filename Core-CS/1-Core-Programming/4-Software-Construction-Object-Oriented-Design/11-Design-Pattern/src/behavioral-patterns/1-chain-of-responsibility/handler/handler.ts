import { Request } from '../request/request';

export class Handler {
    protected successor: Handler;

    constructor(successor: Handler) {
        this.successor = successor;
    }

    handle(req: Request) {
        console.log(`${req} has not been handled!`);
    }
}
