package model;

import model.BrassInstrument.BrassInstrument;
import model.StringInstrument.StringInstrument;

import java.util.Collection;
import java.util.HashSet;

public class Orchestra {
    private Collection<BrassInstrument> brassInstruments = new HashSet<>();
    private Collection<StringInstrument> stringInstruments = new HashSet<>();
}
