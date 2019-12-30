import { Host } from "./Host.class";
import { Data } from "./Data.class";
import { RDT } from "./RDT.class";

export class Process {
  host: Host;
  port: number;
  RDT: RDT;
  buffer: Data[];

  constructor(host: Host, RDT: RDT) {
    this.host = host;
    this.RDT = RDT;
    this.port = this.generateUnusedPort();
    this.buffer = [];
  }

  sendData(data: Data, distIP: string, distPort: number) {
    console.log(
      `${new Date().toISOString()} => ${this.host.ip}:${
        this.port
      } send data: ${data}`
    );
    this.RDT.rdtSend(this.host.ip, this.port, distIP, distPort, data);
  }

  fetchData() {
    const data = this.RDT.extract(this.host.buffer.shift());
    if (data) {
      this.buffer.push(data);
      console.log(`${this.host.ip}:${this.port} buffer: ${this.buffer}`);
    }
  }

  private generateUnusedPort(): number {
    // generate a random port number from 1024 - 65536
    let port: number;
    do {
      port = Math.floor(Math.random() * 2 ** 16) + 1;
    } while (port <= 1024 || this.host.processes.find(p => p.port === port));
    return port;
  }
}
