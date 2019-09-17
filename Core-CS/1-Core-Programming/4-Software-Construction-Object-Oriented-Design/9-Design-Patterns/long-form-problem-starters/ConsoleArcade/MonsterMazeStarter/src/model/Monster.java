package model;

public class Monster extends Choice {

    private Treasure treasure;

    public Monster() {
        treasure = null;
    }

    protected String getOptionMessage() {
        return "Fight a monster.";
    }

    //MODIFIES: this
    //EFFECTS: sets the treasure to t
    public void setTreasure(Treasure t) {
        this.treasure = t;
    }

    //EFFECTS: prints the result of choosing this choice
    public void printOutcome() {
        if (treasure == null) {
            System.out.println("Ha! I killed you!");
        } else {
            System.out.println("Ahh! You killed me!");
            treasure.printOutcome();
        }
    }

}
