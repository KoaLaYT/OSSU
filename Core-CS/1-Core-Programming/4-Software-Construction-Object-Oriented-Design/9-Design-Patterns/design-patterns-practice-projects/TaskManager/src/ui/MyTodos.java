package ui;

import model.Task;
import model.Todo;

public class MyTodos {
    public static void main(String[] args) {
        Todo td1 = new Todo("Throw Party");

        Todo td11 = new Todo("Send Out Invitations");
        Todo td12 = new Todo("Get cake ingredients");
        Todo td13 = new Todo("Bake cake and food");
        td1.addDoable(td11);
        td1.addDoable(td12);
        td1.addDoable(td13);

        Task t1 = new Task("Buy flour", "09/12/2017", "Whole Foods");
        Task t2 = new Task("Get a new cake tin", "09/13/2017", "Williams Sonoma");
        Task t3 = new Task("Buy a dozen eggs", "09/12/2017", "Farmer's Market");
        td12.addDoable(t1);
        td12.addDoable(t2);
        td12.addDoable(t3);

        Task t4 = new Task("Mix flour", "09/14/2017", "Anna's house");
        Task t5 = new Task("Grill fillet", "09/14/2017", "Anna's grill");
        td13.addDoable(t4);
        td13.addDoable(t5);

        td1.display(" ");
    }
}
