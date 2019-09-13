package exceptions;

public class StaleCoffeeException extends Exception {
    private int elapsed;

    public StaleCoffeeException(int elapsed) {
        super(elapsed + " is too long!");
        this.elapsed = elapsed;
    }

    public int getElapsed() {
        return elapsed;
    }
}
