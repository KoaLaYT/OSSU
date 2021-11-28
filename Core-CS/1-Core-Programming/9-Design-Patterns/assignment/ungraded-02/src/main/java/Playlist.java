import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;

/**
 * @author koalayt 2021-11-21
 */
@Slf4j
public class Playlist implements IComponent {

    public String playlistName;
    public ArrayList<IComponent> playlist = new ArrayList();

    public Playlist(String playlistName) {
        this.playlistName = playlistName;
    }

    @Override
    public void play() {
        log.info("playing playlist {}", getName());
        playlist.forEach(IComponent::play);
    }

    @Override
    public void setPlaybackSpeed(float speed) {
        playlist.forEach(component -> component.setPlaybackSpeed(speed));
    }

    @Override
    public String getName() {
        return playlistName;
    }

    public void add(IComponent component) {
        playlist.add(component);
    }

    public void remove(IComponent component) {
        playlist.remove(component);
    }

}
