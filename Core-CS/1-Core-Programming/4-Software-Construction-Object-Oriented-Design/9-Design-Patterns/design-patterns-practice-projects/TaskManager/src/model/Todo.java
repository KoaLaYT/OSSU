package model;

import java.util.LinkedList;
import java.util.List;


public class Todo extends Doable {

    private String description;
    private List<Doable> doables;
    public Todo(String description) {
        super();
        this.description = description;
        doables = new LinkedList<>();
    }

    // getters
    public List<Doable> getSubTasks() {
        return doables;
    }

    public String getDescription() {
        return description;
    }

    public boolean addDoable(Doable d) {
        if (!doables.contains(d)) {
            doables.add(d);
            return true;
        } else {
            return false;
        }
    }

    public boolean removeDoable(Doable d) {
        if (doables.contains(d)) {
            doables.remove(d);
            return true;
        } else {
            return false;
        }
    }

    public void display(String indentSpace) {
        System.out.println(indentSpace + getDescription());

        for (Doable d : doables) {
            d.display(indentSpace + indentSpace);
        }
    }

}