import { Data } from "./Data.class";

/** RDT segment */
export abstract class Segment {
  srcPort: number;
  distPort: number;
  checksum?: number; // for V2.0
  ack?: boolean; // for V2.0
  nak?: boolean; // for V2.0
  seq?: 0 | 1; // for V2.1
  data?: Data; // ACK/NAK has no data
}
