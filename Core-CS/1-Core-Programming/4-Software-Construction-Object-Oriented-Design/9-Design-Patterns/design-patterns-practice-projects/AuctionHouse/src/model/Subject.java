package model;

import java.util.ArrayList;
import java.util.LinkedList;

public abstract class Subject {
    private LinkedList<Observer> observers;

    protected Subject() {
        observers = new LinkedList<>();
    }

    public void addObserver(Observer ob) {
        observers.add(ob);
    }

    public void notifyObservers(Subject observable, double bid) {
        for (Observer ob : observers) {
            ob.update(observable, (Object) bid);
        }
    }
}
