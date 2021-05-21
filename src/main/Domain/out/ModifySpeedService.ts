import {ModifySpeedUseCase} from "../in/ModifySpeedUseCase";
import {ModifySpeedOutbound} from "../../Persistence/in/ModifySpeedOutbound";
import {inject, injectable} from "tsyringe";

@injectable()
export class ModifySpeedService implements ModifySpeedUseCase {

    constructor(@inject("ModifySpeedOutbound") private outbound: ModifySpeedOutbound) {}

    modifySpeed(speed: number): void {
        this.outbound.speedToMongo(speed);
    }
}
