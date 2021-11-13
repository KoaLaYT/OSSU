package model.StringInstrument;

import model.Instrument;
import model.Orchestra;

abstract public class StringInstrument implements Instrument {
    private Orchestra orchestra;

    protected StringInstrument(Orchestra orchestra) {
        this.orchestra = orchestra;
    }
}
