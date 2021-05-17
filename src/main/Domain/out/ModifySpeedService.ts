import {ModifySpeedUseCase} from "../in/ModifySpeedUseCase";
import {ModifySpeedOutbound} from "../../Persistence/in/ModifySpeedOutbound";

class ModifySpeedService implements ModifySpeedUseCase {
    public outbound: ModifySpeedOutbound;

    constructor(outbound: ModifySpeedOutbound) {
        this.outbound = outbound;
    }

    modifySpeed(speed: number): void {
        this.outbound.speedToMongo(speed);
    }
}
