import {ModifyStatusUseCase} from "../in/ModifyStatusUseCase";
import {ModifyStatusOutbound} from "../../Persistence/in/ModifyStatusOutbound";
import {UnitStatus} from "../../UnitStatus";
import {inject, injectable} from "tsyringe";

@injectable()
class ModifyStatusService implements ModifyStatusUseCase {

    constructor(@inject("ModifyStatusOutbound") private outbound: ModifyStatusOutbound) {}

    modifyStatus(status: UnitStatus): void {
        this.outbound.statusToMongo(status);
    }
}
