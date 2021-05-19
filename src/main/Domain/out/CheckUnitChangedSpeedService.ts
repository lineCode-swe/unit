import { CheckUnitChangedSpeedUseCase } from "../in/CheckUnitChangedSpeedUseCase";
import { UnitChangedSpeedOutbound} from "../../Persistence/in/UnitChangedSpeedOutbound";

class CheckUnitChangedSpeedService implements CheckUnitChangedSpeedUseCase {
    public outbound: UnitChangedSpeedOutbound;

    constructor(outbound: UnitChangedSpeedOutbound) {
        this.outbound = outbound;
    }

    async checkIfUnitChangedSpeed(): Promise<number> {
        return await this.outbound.loadSpeed();
    }
}
