import {InputSensorUseCase} from "../in/InputSensorUseCase";
import {InputSensorsOutbound} from "../../Persistence/in/InputSensorsOutbound";

class InputSensorService implements InputSensorUseCase {
    public outbound: InputSensorsOutbound;

    constructor(outbound: InputSensorsOutbound) {
        this.outbound = outbound;
    }

    receivedObstacle(msg: string): void {
        // msg -> obstacles: Position[]
        // this.outbound.obstaclesToMongo(obstacles);
    }
}
