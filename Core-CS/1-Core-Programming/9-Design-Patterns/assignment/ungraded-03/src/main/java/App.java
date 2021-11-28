/**
 * @author koalayt 2021-11-27
 */
public class App {

    public static void main(String[] args) {
        var channel = new Channel("KUSC");
        var follower1 = new Follower("John");
        var follower2 = new Follower("Mary");

        channel.registerObserver(follower1);
        channel.registerObserver(follower2);

        channel.setStatus("online");
    }

}
