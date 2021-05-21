import {UnitChangedStatusUseCase} from "../in/UnitChangedStatusUseCase";
import {UnitChangedStatusOutbound} from "../../Persistence/in/UnitChangedStatusOutbound";
import {UnitStatus} from "../../UnitStatus";
import {inject, injectable} from "tsyringe";

@injectable()
export class UnitChangedStatusService implements UnitChangedStatusUseCase {

    constructor(@inject("UnitChangedStatusOutbound") private outbound: UnitChangedStatusOutbound) {}

    async checkIfUnitChangedStatus(): Promise<UnitStatus> {
        return await this.outbound.loadStatus();
    }
}
