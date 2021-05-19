import {CheckUnitHasMovedUseCase} from "../in/CheckUnitHasMovedUseCase";
import {UnitHasMovedOutbound} from "../../Persistence/in/UnitHasMovedOutbound";
import {Position} from "../../Position";

class CheckUnitHasMovedService implements CheckUnitHasMovedUseCase {
    public outbound: UnitHasMovedOutbound;

    constructor(outbound: UnitHasMovedOutbound) {
        this.outbound = outbound;
    }

    async checkIfUnitHasMoved(): Promise<Position> {
        return await this.outbound.loadPosition();
    }
}
