import {UnitStatus} from "../../UnitStatus";

class StatusMessageObj {
    public type: string;
    public status: UnitStatus;

    constructor(type: string, status: UnitStatus) {
        this.type = type;
        this.status = status;
    }

    getType(): string {
        return this.type;
    }

    getStatus(): UnitStatus {
        return this.status;
    }
}
