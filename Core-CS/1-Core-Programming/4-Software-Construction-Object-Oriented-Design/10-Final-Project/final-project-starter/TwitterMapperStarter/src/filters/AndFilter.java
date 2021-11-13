package filters;

import twitter4j.Status;

import java.util.ArrayList;
import java.util.List;

public class AndFilter implements Filter {
    private final Filter term1;
    private final Filter term2;

    public AndFilter(Filter t1, Filter t2) {
        term1 = t1;
        term2 = t2;
    }

    @Override
    public boolean matches(Status s) {
        return term1.matches(s) && term2.matches(s);
    }

    @Override
    public List<String> terms() {
        List<String> res = new ArrayList<>();
        for (String t : term1.terms()) {
            res.add(t);
        }
        for (String t : term2.terms()) {
            res.add(t);
        }
        return res;
    }

    public String toString() {
        return "(" + term1.toString() + " and " + term2.toString() + ")";
    }
}
