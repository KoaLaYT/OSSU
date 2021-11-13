import { Datagram } from "./Datagram.class";
import { Process } from "./Process.class";
import { RDT } from "./RDT.class";

export class Host {
  buffer: Datagram[] = [];
  processes: Process[] = [];

  constructor(public ip: string) {}

  createProc(RDT: RDT): Process {
    const p = new Process(this, RDT);
    this.processes.push(p);
    return p;
  }
}
