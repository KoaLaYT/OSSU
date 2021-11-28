/**
 * @author koalayt 2021-11-19
 */
public class CoffeeTouchscreenAdapter implements CoffeeMachineInterface {

    private final OldCoffeeMachine oldCoffeeMachine;

    public CoffeeTouchscreenAdapter() {
        oldCoffeeMachine = new OldCoffeeMachine();
    }

    @Override
    public void chooseFirstSelection() {
        oldCoffeeMachine.selectA();
    }

    @Override
    public void chooseSecondSelection() {
        oldCoffeeMachine.selectB();
    }

}
