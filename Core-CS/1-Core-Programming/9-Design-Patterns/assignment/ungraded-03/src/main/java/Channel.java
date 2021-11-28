import java.util.ArrayList;
import java.util.List;

/**
 * @author koalayt 2021-11-27
 */
public class Channel implements Subject {

    private List<Observer> observers;
    private String channelName;
    private String status;

    public Channel(String channelName) {
        observers = new ArrayList<>();
        this.channelName = channelName;
        status = "unknown";
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
        notifyObservers();
    }

    @Override
    public void registerObserver(Observer obs) {
        observers.add(obs);
    }

    @Override
    public void removeObserver(Observer obs) {
        observers.remove(obs);
    }

    @Override
    public void notifyObservers() {
        observers.forEach(observer -> observer.update(status));
    }
}
