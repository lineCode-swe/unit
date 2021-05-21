import {CheckUnitHasMovedUseCase} from "../in/CheckUnitHasMovedUseCase";
import {UnitHasMovedOutbound} from "../../Persistence/in/UnitHasMovedOutbound";
import {Position} from "../../Position";
import {inject, injectable} from "tsyringe";

@injectable()
export class CheckUnitHasMovedService implements CheckUnitHasMovedUseCase {

    constructor(@inject("UnitHasMovedOutbound") private outbound: UnitHasMovedOutbound) {}

    async checkIfUnitHasMoved(): Promise<Position> {
        return await this.outbound.loadPosition();
    }
}
