import WebSocket = require('ws');
import {inject, injectable} from "tsyringe";
import {Position} from "../Position";

import {InputSensorUseCase} from "../Domain/in/InputSensorUseCase";
import {UnitStatus} from "../UnitStatus";

@injectable()
export class SensorMessageController {

    constructor(@inject("InputSensorUseCase") private inputSensor: InputSensorUseCase,
                @inject("WebSocketSensors") private ws: WebSocket) {

        this.ws.on('open', function open(): any {
            console.log("Connection with sensors established! \n");
        });

        this.ws.on('message', function incoming(data): any {
            let msg: any = JSON.parse(data.toString());
            let obs_array: Position[] = [];
            msg.forEach(function(value: any) {
                obs_array.push(new Position(Number(value.x), Number(value.y)));
            });
            inputSensor.receivedObstacle(obs_array);
        });

        this.ws.on('close', function close(reason) {
            console.log("Connection with sensors closed");
            console.log(reason);
        });

        this.ws.on('error', function error(err) {
            console.log("An internal error in sensors websocket has occurred");
            console.log(err);
        });
    }

}