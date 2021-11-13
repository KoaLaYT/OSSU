const { msgToBuffer, bufferToMsg, PackChecker } = require("./util");
const dgram = require("dgram");
const client = dgram.createSocket("udp4");

const SERVER = {
  port: 12345,
  host: "localhost"
};

const checker = new PackChecker();

client.on("message", buffer => {
  const res = bufferToMsg(buffer);
  if (checker.check(res.index)) {
    rtt(res);
    checker.confirm(res.index);
  }
});

sendPing(0);

/** helpers */
function sendPing(index) {
  const begin = Date.now();
  client.send(
    msgToBuffer({ index, begin }),
    SERVER.port,
    SERVER.host,
    async err => {
      if (err) {
        console.log(`client err:\n${err.stack}`);
        return client.close();
      }
      // send packet one after one
      await checker.wait(index).catch(_ => {
        console.log(`#${index + 1}: lost after ${Date.now() - begin}ms`);
      });
      index++;
      if (index === 10) {
        return client.close();
      }
      sendPing(index);
    }
  );
}
function rtt(msg) {
  return console.log(`#${msg.index + 1}: ${Date.now() - msg.begin}ms`);
}
