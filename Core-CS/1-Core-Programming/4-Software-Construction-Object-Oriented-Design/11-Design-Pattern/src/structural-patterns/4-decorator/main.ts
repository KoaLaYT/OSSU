import { BorderDecorator } from './border-decorator';
import { VisualComponent } from './visual-component';

class View {
    setContent(c: VisualComponent) {
        // detail omitted
    }
}

// usage example
const view = new View();
view.setContent(new BorderDecorator(new VisualComponent(), 1));
