import {ModifyPositionUseCase} from "../in/ModifyPositionUseCase";
import {ModifyPositionOutbound} from "../../Persistence/in/ModifyPositionOutbound";
import {Position} from "../../Position";
import {inject, injectable} from "tsyringe";

@injectable()
class ModifyPositionService implements ModifyPositionUseCase {

    constructor(@inject("ModifyPositionOutbound") private outbound: ModifyPositionOutbound) {}

    modifyPosition(pos: Position): void {
        this.outbound.positionToMongo(pos);
    }
}
