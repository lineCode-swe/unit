import {ModifyStatusUseCase} from "../in/ModifyStatusUseCase";
import {ModifyStatusOutbound} from "../../Persistence/in/ModifyStatusOutbound";

class ModifyStatusService implements ModifyStatusUseCase {
    public outbound: ModifyStatusOutbound;

    constructor(outbound: ModifyStatusOutbound) {
        this.outbound = outbound;
    }

    modifyStatus(msg: string): void {
        this.outbound.statusToMongo(msg);
    }
}
