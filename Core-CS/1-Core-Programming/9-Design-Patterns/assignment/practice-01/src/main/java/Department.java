import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

/**
 * @author koalayt 2021-11-19
 */
@Slf4j
public class Department implements Producer {

    private final List<Producer> producers = new ArrayList<>();
    private final String name;

    public Department(String name) {
        this.name = name;
    }

    public void addProducer(Producer producer) {
        producers.add(producer);
    }

    @Override
    public void work() {
        log.info("in {}, there are: ", name);
        producers.forEach(Producer::work);
    }

}
