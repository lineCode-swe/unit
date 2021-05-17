import {UnitChangedStatusUseCase} from "../in/UnitChangedStatusUseCase";
import {UnitChangedStatusOutbound} from "../../Persistence/in/UnitChangedStatusOutbound";

class UnitChangedStatusService implements UnitChangedStatusUseCase {
    public outbound: UnitChangedStatusOutbound;

    constructor(outbound: UnitChangedStatusOutbound) {
        this.outbound = outbound;
    }

    checkIfUnitChangedStatus(): string {
        // this.outbound.loadStatus();

        return "";
    }
}
