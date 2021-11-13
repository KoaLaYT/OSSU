import { Graphic } from './graphic/graphic.abstract';
import { ImageProxy } from './graphic/image-proxy.graphic';

class TextDocument {
    insert(g: Graphic) {}
}

// usage example
const doc = new TextDocument();
doc.insert(new ImageProxy('aImage.jpg'));
