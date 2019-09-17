package model;

public abstract class Choice {
    //EFFECTS: prints a message representing this possible next choice
    public void printOptionMessage() {
        System.out.println(this.getOptionMessage());
    }

    protected abstract String getOptionMessage();

    public abstract void printOutcome();
}
