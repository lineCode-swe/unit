import {InputSensorUseCase} from "../in/InputSensorUseCase";
import {InputSensorsOutbound} from "../../Persistence/in/InputSensorsOutbound";
import {Position} from "../../Position";
import {inject, injectable} from "tsyringe";

@injectable()
export class InputSensorService implements InputSensorUseCase {

    constructor(@inject("InputSensorsOutbound") private outbound: InputSensorsOutbound) {}

    receivedObstacle(obs: Position[]): void {
        this.outbound.obstaclesToMongo(obs);
    }
}
