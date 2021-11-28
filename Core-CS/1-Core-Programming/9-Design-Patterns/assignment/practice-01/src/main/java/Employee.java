import lombok.extern.slf4j.Slf4j;

/**
 * @author koalayt 2021-11-19
 */
@Slf4j
public class Employee implements Producer {

    private final String name;

    public Employee(String name) {
        this.name = name;
    }

    @Override
    public void work() {
        log.info("{} is doing some hard working...", name);
    }

}
