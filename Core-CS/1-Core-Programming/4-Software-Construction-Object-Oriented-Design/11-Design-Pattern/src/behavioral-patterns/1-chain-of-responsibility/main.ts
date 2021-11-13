import { UnknownRequest } from './request/unknown.request';
import { DialogRequest } from './request/dialog.request';
import { ButtonRequest } from './request/button.request';
import { Button } from './handler/button.handler';
import { Dialog } from './handler/dialog.handler';
import { Handler } from './handler/handler';

const baseHandler = new Handler(null);
const dialog = new Dialog(baseHandler);
const button = new Button(dialog);

button.handle(new ButtonRequest());
button.handle(new DialogRequest());
button.handle(new UnknownRequest());
