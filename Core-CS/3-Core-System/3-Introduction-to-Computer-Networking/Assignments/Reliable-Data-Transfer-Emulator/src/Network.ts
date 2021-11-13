/**
 * This is an emulated network, provides IP service
 */
import { Data } from "./model/Data.class";
import { Datagram } from "./model/Datagram.class";
import { Host } from "./model/Host.class";

/** The hosts that exist in this network */
const HOSTS: Host[] = [];

/** create host */
export function registerHost(host: Host) {
  HOSTS.push(host);
}

/** V1.0 Perfect reliable channel */
/** only one datagram allow to be sending at the same time  */
const dgramQueue = {
  queue: [],
  idle(): Promise<void> {
    if (this.queue.length === 0) {
      this.queue.push(false);
      return Promise.resolve();
    } else {
      return new Promise(resolve => {
        this.queue.push(resolve);
      });
    }
  },
  next() {
    let nextDgram: Function;
    while (!nextDgram && this.queue.length > 0) {
      nextDgram = this.queue.shift();
    }
    nextDgram && nextDgram();
  }
};
export async function udtSendV1(dgram: Datagram) {
  await dgramQueue.idle();
  const host = findHostByIp(dgram.distIP);
  await sendDgram(host, dgram);
  dgramQueue.next();
}

/** V2.0 A channel with bit errors */
/** only the data part will be corrupted */
export async function udtSendV2(dgram: Datagram) {
  const host = findHostByIp(dgram.distIP);
  await sendDgram(host, dgram, 0.5);
}

/** V2.1 A channel with bit errors */
/** both data and ack/nak can be corrupted */
export async function udtSendV2_1(dgram: Datagram) {
  const host = findHostByIp(dgram.distIP);
  await sendDgram(host, dgram, 0.5, true);
}

/** V3.0 A lossy Channel with bit errors */
export async function udtSendV3(dgram: Datagram) {
  const host = findHostByIp(dgram.distIP);
  await sendDgram(host, dgram, 0.5, true, true);
}

// ================
// helper functions

/** the data and ack/nak of dgram could be corrupted */
function maybeCorrupt(dgram: Datagram, prob: number, corruptAll: boolean) {
  if (Math.random() < prob && dgram.seg.data) {
    dgram.seg.data = corruptData(dgram.seg.data);
  }
  if (Math.random() < prob && !dgram.seg.data && corruptAll) {
    dgram = corruptACK(dgram);
  }
  return dgram;
  // corrupt ack/nak
  // simply reverse these two
  function corruptACK(dgram: Datagram) {
    if (dgram.seg.ack) {
      delete dgram.seg.ack;
      dgram.seg.nak = true;
    } else if (dgram.seg.nak) {
      delete dgram.seg.nak;
      dgram.seg.ack = true;
    }
    return dgram;
  }
  // corrupt a random bit in the data
  function corruptData(data: Data) {
    const char2bin = (c: string) => c.charCodeAt(0).toString(2);
    const bin2char = (bits: string) => String.fromCharCode(Number("0b" + bits));
    const padByte = (bits: string) => {
      while (bits.length < 8) {
        bits = "0" + bits;
      }
      return bits;
    };
    // [1] convert to binary
    let binary = data
      .split("")
      .map(char2bin)
      .map(padByte)
      .join("");
    // [2] flip a random bit
    const random = Math.floor(Math.random() * binary.length);
    const bits = binary.split("");
    bits[random] = bits[random] === "0" ? "1" : "0";
    binary = bits.join("");
    // [3] convert back to data
    return binary
      .match(/\d{8}/g)
      .map(bin2char)
      .join("");
  }
}

/** find host by IP */
function findHostByIp(ip: string) {
  const host = HOSTS.find(host => host.ip === ip);
  if (!host) throw new Error("No such host at " + ip);
  return host;
}

/** send segment to host's buffer */
async function sendDgram(
  host: Host,
  dgram: Datagram,
  prob = 0,
  corruptAll = false,
  lossy = false
) {
  const {
    srcIP,
    distIP,
    seg: { srcPort, distPort, data, ack, seq }
  } = dgram;
  console.log(
    `\nSEND ${new Date().toISOString()} ${srcIP}:${srcPort} => ${distIP}:${distPort} ${data ||
      (ack ? "ACK" : "NAK")} ${seq ?? ""}${dgram.seg.seqNo ?? ""}`
  );
  dgram = await rtt(dgram, prob, corruptAll, lossy);
  console.log(
    `RECV ${new Date().toISOString()} ${distIP}:${distPort} <= ${srcIP}:${srcPort} ${dgram
      .seg.data || (dgram.seg.ack ? "ACK" : "NAK")} ${dgram.seg.seq ??
      ""}${dgram.seg.seqNo ?? ""}`
  );

  host.buffer.push(dgram);
  host.processes.forEach(p => p.fetchData()); // notify all processes
}

/** random round trip delay: 0.5s - 1s */
function rtt(
  dgram: Datagram,
  prob: number,
  corruptAll: boolean,
  lossy: boolean
): Promise<Datagram> {
  return new Promise(resolve =>
    setTimeout(
      () => {
        resolve(maybeCorrupt(dgram, prob, corruptAll));
      },
      lossy && Math.random() < 0.5
        ? Number(
            "0x0" +
              Array.from({ length: 7 })
                .fill("f")
                .join("")
          ) // MAX 32bit number, fake data loss
        : 500 + Math.random() * 500
    )
  );
}
