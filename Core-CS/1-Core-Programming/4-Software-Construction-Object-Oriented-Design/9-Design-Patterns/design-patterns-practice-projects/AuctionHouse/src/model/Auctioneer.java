package model;

public class Auctioneer extends Subject {
    private String name;
    private double currentBid;

    public Auctioneer(String name) {
        this.name = name;
    }

    // getters
    public String getName() {
        return name;
    }
    public double getCurrentBid() {
        return currentBid;
    }

    public void acceptBid(double bid) {
        if (bid < currentBid) {
            System.out.printf("That bid isn't larger than the current bid!");
        } else {
            currentBid = bid;
            notifyObservers(bid);
        }
    }

    public void notifyObservers(double newBidAmt) {
        super.notifyObservers(this, newBidAmt);
    }
}
