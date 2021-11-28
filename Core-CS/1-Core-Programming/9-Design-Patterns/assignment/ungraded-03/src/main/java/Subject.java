/**
 * @author koalayt 2021-11-27
 */
public interface Subject {

    void registerObserver(Observer obs);

    void removeObserver(Observer obs);

    void notifyObservers();

}
