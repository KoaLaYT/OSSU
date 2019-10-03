import { Request } from './request';
export class UnknownRequest extends Request {
    toString() {
        return 'Unknown Request';
    }
}
