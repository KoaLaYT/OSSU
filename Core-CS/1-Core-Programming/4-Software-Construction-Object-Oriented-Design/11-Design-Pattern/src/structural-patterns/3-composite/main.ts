import { File } from './file.component';
import { Directory } from './directory.component';

const f1 = new File('file1', 10);
const f2 = new File('file2', 20);
const f3 = new File('file3', 30);

const d1 = new Directory('dir1');
const d2 = new Directory('dir2');

d2.add(f3);
d1.add(f1);
d1.add(f2);
d1.add(d2);

console.log(d1.print());
