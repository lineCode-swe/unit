import WebSocket = require('ws');
import {inject, injectable} from "tsyringe";
import {Position} from "../Position";
import {UnitStatus} from "../UnitStatus";

import {CheckUnitErrorUseCase} from "../Domain/in/CheckUnitErrorUseCase";
import {CheckUnitRequestPathUseCase} from "../Domain/in/CheckUnitRequestPathUseCase";
import {ModifyPathUseCase} from "../Domain/in/ModifyPathUseCase";
import {UnitChangedStatusUseCase} from "../Domain/in/UnitChangedStatusUseCase";
import {CheckUnitChangedSpeedUseCase} from "../Domain/in/CheckUnitChangedSpeedUseCase";
import {CheckObstaclesUseCase} from "../Domain/in/CheckObstaclesUseCase";
import {CheckUnitHasMovedUseCase} from "../Domain/in/CheckUnitHasMovedUseCase";

let ws: WebSocket = new WebSocket('ws://localhost:8080/unit/');
// + unit.getUUID a cosa serviva?

ws.on('open', function open(): any {
    console.log("Connection with server established! \n");
    /*
    TO DO
    */
});

ws.on('message', function incoming(data): any {
    /*
    TO DO
    */
});

ws.on('close', function close() {
    console.log("Connection with server closed");
});

ws.on('Error', function error() {
    console.log("An internal error has occurred");
});

/*
Il websocket deve essere un campo del ServerMessageController?
Se si, forse i vari "ws.on" vanno nel costruttore?
*/

@injectable()
class ServerMessageController {

    constructor(@inject("CheckUnitErrorUseCase") private CheckUnitError: CheckUnitErrorUseCase,
                @inject("CheckUnitRequestPathUseCase") private CheckUnitRequestPath: CheckUnitRequestPathUseCase,
                @inject("ModifyPathUseCase") private ModifyPath: ModifyPathUseCase,
                @inject("UnitChangedStatusUseCase") private UnitChangedStatus: UnitChangedStatusUseCase,
                @inject("CheckUnitChangedSpeedUseCase") private CheckUnitChangedSpeed: CheckUnitChangedSpeedUseCase,
                @inject("CheckObstaclesUseCase") private CheckObstacles: CheckObstaclesUseCase,
                @inject("CheckUnitHasMovedUseCase") private CheckUnitHasMoved: CheckUnitHasMovedUseCase
    ) {}; // servono tutti gli UseCase?

    async checkUnitPosition() {
        let position: Position = await this.CheckUnitHasMoved.checkIfUnitHasMoved();
        /*
        TO DO
        */
    }

    async checkUnitSpeed() {
        let speed: number = await this.CheckUnitChangedSpeed.checkIfUnitChangedSpeed();
        /*
        TO DO
        */
    }
}
