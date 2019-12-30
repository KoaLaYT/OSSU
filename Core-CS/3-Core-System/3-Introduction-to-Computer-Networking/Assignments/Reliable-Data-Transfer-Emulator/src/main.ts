import { RDTV1, RDTV2, RDTV2_1, RDTV3 } from "./model/RDT.class";
import { Host } from "./model/Host.class";
import * as Network from "./Network";

const version = process.argv[2];

const RDTVersions = {
  "1": RDTV1,
  "2": RDTV2,
  "2.1": RDTV2_1,
  "3": RDTV3
};

const RDT = RDTVersions[version];
if (!RDT) {
  console.log("Unknown RDT version!");
  console.log(
    `Support version numbers: ${Object.keys(RDTVersions).join(", ")}`
  );
  process.exit(1);
}

sample();

function sample() {
  const h1 = new Host("1.1.1.1");
  const h2 = new Host("2.2.2.2");

  Network.registerHost(h1);
  Network.registerHost(h2);

  const p1 = h1.createProc(new RDT());
  const p2 = h2.createProc(new RDT());

  p1.sendData("Hello world! Are we ok?", "2.2.2.2", p2.port);
}
