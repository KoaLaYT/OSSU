package model;

import model.media.AbstractMedia;
import model.media.Movie;
import model.media.Photo;
import model.media.Song;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class iPod implements Iterable<AbstractMedia>{

    private String name;
    private List<AbstractMedia> media = new ArrayList<>();

    public iPod(String name) {
        this.name = name;
    }

    // getters
    public String getName() { return name; }

    public void addMedia(AbstractMedia m) {
        if (!media.contains(m)) {
            media.add(m);
        }
    }

    @Override
    public Iterator<AbstractMedia> iterator() {
        return media.iterator();
    }
}