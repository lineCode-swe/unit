import {UnitStatus} from "../../UnitStatus";

class CommandReceiveMessageObj {
    public type: string;
    public command: UnitStatus;

    constructor(type: string, command: UnitStatus) {
        this.type = type;
        this.command = command;
    }

    getType(): string {
        return this.type;
    }

    getCommand(): UnitStatus {
        return this.command;
    }
}
