package model;


public class Treatment {

    private String name;
    private int hoursNeeded;

    public Treatment(String name, int time) {
        this.name = name;
        this.hoursNeeded = time;
    }

    // getters
    public String getName() { return name; }
    public int getHoursNeeded() { return hoursNeeded; }


}