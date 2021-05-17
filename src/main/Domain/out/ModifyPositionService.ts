import {ModifyPositionUseCase} from "../in/ModifyPositionUseCase";
import {ModifyPositionOutbound} from "../../Persistence/in/ModifyPositionOutbound";
import {Position} from "../../Position";

class ModifyPositionService implements ModifyPositionUseCase {
    public outbound: ModifyPositionOutbound;

    constructor(outbound: ModifyPositionOutbound) {
        this.outbound = outbound;
    }

    modifyPosition(pos: Position): void {
        this.outbound.positionToMongo(pos);
    }
}
