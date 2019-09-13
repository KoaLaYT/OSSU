package model;

import exceptions.*;

/**
 * A coffee maker used to train baristas.
 *
 * Class invariant: cups remaining >= 0, time since last brew >= 0
 */

public class CoffeeMaker {
    private int timeSinceLastBrew;
    private int cupsRemaining;

    public CoffeeMaker() {
        timeSinceLastBrew = 0;
        cupsRemaining = 0;
    }

    // getters
    public int getTimeSinceLastBrew() {
        return timeSinceLastBrew;
    }
    public int getCupsRemaining() {
        return cupsRemaining;
    }

    // EFFECTS: return true if there are coffee cups remaining
    public boolean areCupsRemaining() {
        return cupsRemaining > 0;
    }

    //EFFECTS: sets time since last brew
    //         throw exception if the time < 0
    public void setTimeSinceLastBrew(int time){
        timeSinceLastBrew = time;
    }

    //EFFECTS: sets cups remaining to full (20 cups) and time since last brew to 0
    //         beans is between 2.40 and 2.60 cups, water > 14.75 cups or throw exception
    public void brew(double beans, double water) throws WaterException, NotEnoughBeansException, TooManyBeansException {
        if (water <= 14.75) {
            throw new WaterException(water);
        }
        if (beans >= 2.4) {
            if (beans <= 2.6) {
                cupsRemaining = 20;
                timeSinceLastBrew = 0;
            } else {
                throw new TooManyBeansException(beans);
            }
        } else {
            throw new NotEnoughBeansException(beans);
        }
    }

    //MODIFIES: this
    //EFFECTS: subtracts one cup from cups remaining
    //         cups remaining > 0, time since last brew < 60 or throw exception
    public void pourCoffee() throws Exception {
        if (!areCupsRemaining()) {
            throw new NoCupsRemainingException();
        } else if (timeSinceLastBrew >= 60) {
            throw new StaleCoffeeException(timeSinceLastBrew);
        } else {
            cupsRemaining--;
        }
    }


}
