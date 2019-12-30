import { Data } from "./Data.class";
import { Datagram } from "./Datagram.class";
import * as Network from "../Network";

export abstract class RDT {
  abstract rdtSend(
    srcIP: string,
    srcPort: number,
    distIP: string,
    distPort: number,
    data: Data
  ): void;

  abstract extract(dgram: Datagram): Data | false;
}

export class RDTV1 extends RDT {
  rdtSend(
    srcIP: string,
    srcPort: number,
    distIP: string,
    distPort: number,
    data: Data
  ) {
    for (const pack of data.split(/\s+/)) {
      Network.udtSendV1({
        srcIP,
        distIP,
        seg: { srcPort, distPort, data: pack }
      });
    }
  }

  extract(dgram: Datagram): Data | false {
    return dgram.seg.data;
  }
}

export class RDTV2 extends RDT {
  protected packs = [];
  protected headers;
  rdtSend(
    srcIP: string,
    srcPort: number,
    distIP: string,
    distPort: number,
    data: Data
  ) {
    this.packs = data.split(/\s+/);
    this.headers = {
      srcIP,
      distIP,
      seg: { srcPort, distPort }
    };
    this.sendPack(this.packs[0]);
  }

  extract(dgram: Datagram): Data | false {
    // client side
    if (dgram.seg.checksum) {
      // check if corrupt
      if (!this.isCorrupt(dgram)) {
        this.makeRespond(dgram, "ack");
        return dgram.seg.data;
      } else {
        this.makeRespond(dgram, "nak");
        return false;
      }
    }
    // server side
    if (dgram.seg.ack) {
      this.packs.shift();
      if (this.packs.length > 0) {
        this.sendPack(this.packs[0]);
      }
    } else {
      this.sendPack(this.packs[0]);
    }
  }

  protected sendPack(pack: Data) {
    Network.udtSendV2({
      ...this.headers,
      seg: { ...this.headers.seg, checksum: this.checksum(pack), data: pack }
    });
  }

  protected makeRespond(dgram: Datagram, key: string) {
    Network.udtSendV2({
      srcIP: dgram.distIP,
      distIP: dgram.srcIP,
      seg: {
        srcPort: dgram.seg.distPort,
        distPort: dgram.seg.srcPort,
        [key]: true
      }
    });
  }

  protected checksum(data: Data) {
    const sum = data
      .split("")
      .map(c => c.charCodeAt(0))
      .reduce((acc, ele) => acc + ele);

    return -sum;
  }

  protected isCorrupt(dgram: Datagram) {
    return dgram.seg.checksum !== this.checksum(dgram.seg.data);
  }
}

export class RDTV2_1 extends RDTV2 {
  protected expectSeq: 0 | 1 = 0;

  extract(dgram: Datagram): Data | false {
    // client side
    if (dgram.seg.data) {
      // check if corrupt
      if (!this.isCorrupt(dgram)) {
        this.makeRespond(dgram, "ack");
        if (this.expectSeq === dgram.seg.seq) {
          this.nextSeq();
          return dgram.seg.data;
        }
      } else {
        this.makeRespond(dgram, "nak");
        return false;
      }
    }
    // server side
    if (!this.isACKCorrupt(dgram) && dgram.seg.ack) {
      this.nextSeq();
      this.packs.shift();
    }
    if (this.packs.length > 0) {
      this.sendPack(this.packs[0]);
    }
  }

  protected sendPack(pack: Data) {
    Network.udtSendV2_1({
      ...this.headers,
      seg: {
        ...this.headers.seg,
        checksum: this.checksum(pack),
        data: pack,
        seq: this.expectSeq
      }
    });
  }

  protected makeRespond(dgram: Datagram, key: string) {
    Network.udtSendV2_1({
      srcIP: dgram.distIP,
      distIP: dgram.srcIP,
      seg: {
        srcPort: dgram.seg.distPort,
        distPort: dgram.seg.srcPort,
        checksum: key === "ack" ? 0 : 1,
        [key]: true
      }
    });
  }

  protected isACKCorrupt(dgram: Datagram) {
    if (dgram.seg.ack) return dgram.seg.checksum !== 0;
    if (dgram.seg.nak) return dgram.seg.checksum !== 1;
  }

  protected nextSeq() {
    this.expectSeq = (this.expectSeq ^ 1) as 0 | 1;
  }
}

export class RDTV3 extends RDTV2_1 {
  protected timer: NodeJS.Timeout;

  extract(dgram: Datagram): Data | false {
    // client side
    if (dgram.seg.data) {
      // check if corrupt
      if (!this.isCorrupt(dgram)) {
        this.makeRespond(dgram, "ack");
        if (this.expectSeq === dgram.seg.seq) {
          this.nextSeq();
          return dgram.seg.data;
        }
      } else {
        this.makeRespond(dgram, "nak");
        return false;
      }
    }
    // server side
    if (
      !this.isACKCorrupt(dgram) &&
      dgram.seg.ack &&
      dgram.seg.seq === this.expectSeq
    ) {
      clearInterval(this.timer);
      this.timer = undefined;
      this.nextSeq();
      this.packs.shift();
      if (this.packs.length > 0) {
        this.sendPack(this.packs[0]);
      } else {
        process.exit(0);
      }
    }
  }

  protected sendPack(pack: Data) {
    if (!this.timer) {
      this.timer = setInterval(() => {
        this.sendPack(this.packs[0]);
      }, 1500); // the network's rtt time is 1s - 2s
    }
    Network.udtSendV3({
      ...this.headers,
      seg: {
        ...this.headers.seg,
        checksum: this.checksum(pack),
        data: pack,
        seq: this.expectSeq
      }
    });
  }

  protected makeRespond(dgram: Datagram, key: string) {
    Network.udtSendV3({
      srcIP: dgram.distIP,
      distIP: dgram.srcIP,
      seg: {
        srcPort: dgram.seg.distPort,
        distPort: dgram.seg.srcPort,
        checksum: key === "ack" ? 0 : 1,
        [key]: true,
        seq: dgram.seg.seq
      }
    });
  }
}

export class RDTGBN extends RDT {
  // header info
  private header;
  // server side
  private packs: Data[] = [];
  private timer: NodeJS.Timeout;
  private base = 0;
  private nextSeqNo = 0;
  private readonly winSize = 2;
  // client side
  private expectedSeq = 0;

  rdtSend(
    srcIP: string,
    srcPort: number,
    distIP: string,
    distPort: number,
    data: Data
  ): void {
    this.packs = data.split(/\s+/);
    this.header = {
      srcIP,
      distIP,
      seg: { srcPort, distPort }
    };
    this.sendPacks();
  }

  extract(dgram: Datagram): Data | false {
    // client side
    if (dgram.seg.data) {
      let data: Data | false = false;
      if (!this.isCorrupt(dgram) && dgram.seg.seqNo === this.expectedSeq) {
        this.expectedSeq++;
        data = dgram.seg.data;
      }
      Network.udtSendV3({
        srcIP: dgram.distIP,
        distIP: dgram.srcIP,
        seg: {
          srcPort: dgram.seg.distPort,
          distPort: dgram.seg.srcPort,
          ack: true,
          checksum: 0,
          seqNo: this.expectedSeq
        }
      });
      return data;
    }
    // server side
    if (!this.isACKCorrupt(dgram) && this.base < dgram.seg.seqNo) {
      this.base = dgram.seg.seqNo;
      clearInterval(this.timer);
      this.timer = undefined;
      this.sendNextPack();
    }
  }

  private sendNextPack() {
    if (this.base > this.packs.length - 1) {
      clearInterval(this.timer);
      process.exit(0);
    }
    if (this.nextSeqNo > this.base + this.winSize) return;
    if (!this.timer) {
      this.timer = setInterval(() => {
        this.sendPacks();
      }, 1500);
    }
    const pack = this.packs[this.nextSeqNo];
    if (!pack) return;
    Network.udtSendV3({
      ...this.header,
      seg: {
        ...this.header.seg,
        checksum: this.checksum(pack),
        seqNo: this.nextSeqNo,
        data: pack
      }
    });
    this.nextSeqNo++;
  }

  private sendPacks() {
    if (this.base > this.packs.length - 1) {
      clearInterval(this.timer);
      process.exit(0);
    }
    if (this.nextSeqNo > this.base + this.winSize) return;
    if (!this.timer) {
      this.timer = setInterval(() => {
        this.sendPacks();
      }, 1500);
    }
    this.nextSeqNo = this.base;
    for (let seqNo = this.base; seqNo < this.base + this.winSize; seqNo++) {
      const pack = this.packs[seqNo];
      if (!pack) return;
      Network.udtSendV3({
        ...this.header,
        seg: {
          ...this.header.seg,
          checksum: this.checksum(pack),
          seqNo,
          data: pack
        }
      });
      this.nextSeqNo++;
    }
  }

  private checksum(data: Data) {
    const sum = data
      .split("")
      .map(c => c.charCodeAt(0))
      .reduce((acc, ele) => acc + ele);

    return -sum;
  }

  private isCorrupt(dgram: Datagram) {
    return dgram.seg.checksum !== this.checksum(dgram.seg.data);
  }

  // for simplicity and compatiable with previous RDT design
  private isACKCorrupt(dgram: Datagram) {
    if (dgram.seg.ack) return dgram.seg.checksum !== 0;
    if (dgram.seg.nak) return true;
  }
}
