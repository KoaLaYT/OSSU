import { subscribe, publish } from './subpub';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const sub1 = subscribe('hello/teacher', async function(topic, data) {
    console.log('I feel something is happening...');
    await wait(1000);
    console.log(`sub1::TOPIC: ${topic} >> ${data}`);
});
const sub2 = subscribe('hello/teacher', function(topic, data) {
    console.log(`sub2::TOPIC: ${topic} >> ${data}`);
});
sub2.unsubscribe();

publish('hello/teacher', 'heihei');
