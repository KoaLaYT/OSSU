package exceptions;

public class WaterException extends Exception {
    private double water;

    public WaterException(double water) {
        super(water + " is not enough!");
        this.water = water;
    }

    public double getWater() {
        return water;
    }
}
