package model.BrassInstrument;

import model.Instrument;
import model.Orchestra;

abstract public class BrassInstrument implements Instrument {
    private Orchestra orchestra;

    protected BrassInstrument(Orchestra orchestra) {
        this.orchestra = orchestra;
    }
}
