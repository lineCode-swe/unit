import { CheckUnitChangedSpeedUseCase } from "../in/CheckUnitChangedSpeedUseCase";
import { UnitChangedSpeedOutbound} from "../../Persistence/in/UnitChangedSpeedOutbound";
import {inject, injectable} from "tsyringe";

@injectable()
export class CheckUnitChangedSpeedService implements CheckUnitChangedSpeedUseCase {

    constructor(@inject("UnitChangedSpeedOutbound") private outbound: UnitChangedSpeedOutbound) {}

    async checkIfUnitChangedSpeed(): Promise<number> {
        return await this.outbound.loadSpeed();
    }
}
