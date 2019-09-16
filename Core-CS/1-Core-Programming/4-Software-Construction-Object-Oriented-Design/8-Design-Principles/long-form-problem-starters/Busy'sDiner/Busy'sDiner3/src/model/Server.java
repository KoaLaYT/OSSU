package model;

import java.util.ArrayList;
import java.util.List;

public class Server extends FOEEmployee{

    private static final double DISH_PRICE = 10.00;

    private List<Order> orders;
    private double cash;
    private int currentOrderNumber;
    private Dish dish;

    public Server(Dish dish) {
        super();
        this.orders = new ArrayList<>();
        currentOrderNumber = 100;
        this.dish = dish;
    }

    //getter
    public List<Order> getActiveOrders() {
        return orders;
    }

    public double getCash() { return cash; }

    public String getPrefix() { return "SERVER - "; }

    //MODIFIES: this
    //EFFECTS: creates new order with the dish on the menu
    public Order takeOrder() {
        System.out.println(getPrefix() + "Taking order...");
        Order o = new Order(this.dish, currentOrderNumber++);
        orders.add(o);
        System.out.print("Order taken: ");
        o.print();
        return o;
    }

    //EFFECTS: prints out a description of the dish on the menu
    public void describeDish() {
        System.out.println(dish.getDescription());
    }

    //MODIFIES: this
    //EFFECTS: takes payment for the guest and removes order from system
    public void takePayment(Order order) {
        System.out.println(getPrefix() + "Taking payment...");
        orders.remove(order);
        cash += DISH_PRICE;
        System.out.println("\"Thanks for visiting Busy's Diner!\"");
    }

}
