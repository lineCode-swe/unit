import { CheckUnitChangedSpeedUseCase } from "../in/CheckUnitChangedSpeedUseCase";
import { UnitChangedSpeedOutbound} from "../../Persistence/in/UnitChangedSpeedOutbound";

class CheckUnitChangedSpeedService implements CheckUnitChangedSpeedUseCase {
    public outbound: UnitChangedSpeedOutbound;

    constructor(outbound: UnitChangedSpeedOutbound) {
        this.outbound = outbound;
    }

    checkIfUnitChangedSpeed(): void {
        // this.outbound.loadSpeed();
    }
}
