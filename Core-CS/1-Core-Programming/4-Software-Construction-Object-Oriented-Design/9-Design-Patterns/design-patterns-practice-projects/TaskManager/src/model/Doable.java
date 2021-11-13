package model;

public abstract class Doable {
    protected boolean complete;

    protected Doable() {
        complete = false;
    }

    public abstract String getDescription();
    public abstract void display(String indentSpace);

    public void complete() {
        if (!complete) {
            complete = true;
        }
    }
}
