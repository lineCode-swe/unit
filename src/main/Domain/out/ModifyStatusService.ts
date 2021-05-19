import {ModifyStatusUseCase} from "../in/ModifyStatusUseCase";
import {ModifyStatusOutbound} from "../../Persistence/in/ModifyStatusOutbound";
import {UnitStatus} from "../../UnitStatus";

class ModifyStatusService implements ModifyStatusUseCase {
    public outbound: ModifyStatusOutbound;

    constructor(outbound: ModifyStatusOutbound) {
        this.outbound = outbound;
    }

    modifyStatus(status: UnitStatus): void {
        this.outbound.statusToMongo(status);
    }
}
