import { Segment } from "./Segment.class";

/** IP datagram */
export class Datagram {
  srcIP: string;
  distIP: string;
  seg: Segment;
}
