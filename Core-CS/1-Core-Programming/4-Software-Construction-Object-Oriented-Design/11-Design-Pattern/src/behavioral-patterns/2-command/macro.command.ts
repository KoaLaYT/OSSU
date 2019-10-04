import { Command } from './command.abstract';

export class MacroCommand extends Command {
    private cmds: Set<Command> = new Set();

    execute() {
        for (const cmd of this.cmds) {
            cmd.execute();
        }
    }

    add(cmd: Command) {
        this.cmds.add(cmd);
    }

    remove(cmd: Command) {
        this.cmds.delete(cmd);
    }
}
