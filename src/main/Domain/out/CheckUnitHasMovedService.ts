import {CheckUnitHasMovedUseCase} from "../in/CheckUnitHasMovedUseCase";
import {UnitHasMovedOutbound} from "../../Persistence/in/UnitHasMovedOutbound";
import {Position} from "../../Position";

class CheckUnitHasMovedService implements CheckUnitHasMovedUseCase {
    public outbound: UnitHasMovedOutbound;

    constructor(outbound: UnitHasMovedOutbound) {
        this.outbound = outbound;
    }

    checkIfUnitHasMoved(): Position {
        // const response = await this.outbound.loadPosition();

        return new Position(1, 1);
    }
}
