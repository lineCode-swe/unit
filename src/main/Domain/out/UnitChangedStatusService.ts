import {UnitChangedStatusUseCase} from "../in/UnitChangedStatusUseCase";
import {UnitChangedStatusOutbound} from "../../Persistence/in/UnitChangedStatusOutbound";
import {UnitStatus} from "../../UnitStatus";

class UnitChangedStatusService implements UnitChangedStatusUseCase {
    public outbound: UnitChangedStatusOutbound;

    constructor(outbound: UnitChangedStatusOutbound) {
        this.outbound = outbound;
    }

    async checkIfUnitChangedStatus(): Promise<UnitStatus> {
        return await this.outbound.loadStatus();
    }
}
