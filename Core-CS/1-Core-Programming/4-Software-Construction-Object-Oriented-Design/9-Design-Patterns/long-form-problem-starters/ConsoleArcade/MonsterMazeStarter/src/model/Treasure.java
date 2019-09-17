package model;

public class Treasure extends Choice {

    private int prize;

    public Treasure(int prize) {
        this.prize = prize;
    }

    protected String getOptionMessage() {
        return "Claim your treasure!";
    }

    //EFFECTS: prints the result of choosing this choice
    public void printOutcome() {
        System.out.println("Your prize is " + prize + " spendibees.");
    }

}
