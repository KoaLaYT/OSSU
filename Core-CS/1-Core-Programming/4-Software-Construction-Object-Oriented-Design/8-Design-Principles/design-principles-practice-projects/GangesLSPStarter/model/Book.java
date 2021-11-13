package model;

abstract public class Book {
    protected String title;
    protected double price;
    protected Box box;

    protected Book(String title, double price) {
        this.title = title;
        this.price = price;
        this.box = null; // book starts off unpackaged
    }

    public String getTitle() {
        return title;
    }

    public void setBox(Box box) {
        this.box = box;
    }

    abstract public Box packageBook(Box b);

    abstract public double calculateShipping();

    abstract public String getMinBoxSize();
}
