import {InputSensorUseCase} from "../in/InputSensorUseCase";
import {InputSensorsOutbound} from "../../Persistence/in/InputSensorsOutbound";
import {Position} from "../../Position";

class InputSensorService implements InputSensorUseCase {
    public outbound: InputSensorsOutbound;

    constructor(outbound: InputSensorsOutbound) {
        this.outbound = outbound;
    }

    receivedObstacle(obs: Position[]): void {
        this.outbound.obstaclesToMongo(obs);
    }
}
