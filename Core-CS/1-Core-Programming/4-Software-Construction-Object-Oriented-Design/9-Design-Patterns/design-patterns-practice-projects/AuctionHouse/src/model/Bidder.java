package model;

import java.util.Random;

public class Bidder implements Observer {
    private String name;
    private double personalBid;
    private double currentBid;
    private double maxBid;

    public Bidder(String name, double bid) {
        this.name = name;
        maxBid = bid;
        personalBid = 0.0;
    }

    // getters

    public String getName() {
        return name;
    }

    public double getPersonalBid() {
        return personalBid;
    }

    public double getCurrentBid() {
        return currentBid;
    }

    public double getMaxBid() {
        return maxBid;
    }

    public void makeBid(double currentBid) {
        Random gen = new Random();
        personalBid = gen.nextDouble() * 9 + 1 + currentBid;
    }

    @Override
    public void update(Subject auctioneer, Object arg) {
        currentBid = (double) arg;
        System.out.println("Bidder: " + name + " has been updated with the most recent high bid");
        if ((double) arg < maxBid) {
            makeBid(currentBid);
        } else {
            System.out.println("I can't bid any higher");
        }
    }
}
