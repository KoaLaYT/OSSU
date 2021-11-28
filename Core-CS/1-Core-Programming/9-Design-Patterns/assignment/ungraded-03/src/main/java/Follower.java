import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * @author koalayt 2021-11-27
 */
@Slf4j
@RequiredArgsConstructor
public class Follower implements Observer {

    private final String followerName;

    @Override
    public void update(String status) {
        if ("online".equals(status)) {
            play();
        }
    }

    public void play() {
        log.info("{} playing", followerName);
    }
}
