const { bufferToMsg } = require("./util");
const dgram = require("dgram");
const server = dgram.createSocket("udp4");

server.on("error", err => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on("message", async (msg, rinfo) => {
  const req = bufferToMsg(msg);
  const random = Math.round(Math.random() * 2000);
  await sleep(random);
  server.send(msg, rinfo.port, rinfo.address);
  console.log(`#${req.index + 1}: ${random}ms`);
});

server.on("listening", () => {
  const address = server.address();
  console.log(`server listening on ${address.address}:${address.port}`);
});

server.bind("12345");

/** helpers */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
