/**
 * @author koalayt 2021-11-19
 */
public class App {

    public static void main(String[] args) {
        var company = new Department("Big Company");
        var department = new Department("Cool Department");
        var employee1 = new Employee("Ben");
        var employee2 = new Employee("Mary");
        var employee3 = new Employee("John");

        department.addProducer(employee1);
        department.addProducer(employee2);

        company.addProducer(employee3);
        company.addProducer(department);

        company.work();
    }

}
