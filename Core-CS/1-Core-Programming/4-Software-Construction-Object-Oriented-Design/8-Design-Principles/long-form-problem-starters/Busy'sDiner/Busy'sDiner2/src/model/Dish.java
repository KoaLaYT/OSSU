package model;

import java.util.ArrayList;
import java.util.List;

public class Dish {
    private String name;
    private String description = "";
    private List<String> ingredients = new ArrayList<>();
    private String recipe = "";

    public Dish(String name) {
        this.name = name;
    }

    public Dish(String name, String desc, List<String> ingredients, String recipe) {
        this.name = name;
        description = desc;
        this.ingredients = ingredients;
        this.recipe = recipe;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }

    public String getRecipe() {
        return recipe;
    }

    public void setRecipe(String recipe) {
        this.recipe = recipe;
    }
}
