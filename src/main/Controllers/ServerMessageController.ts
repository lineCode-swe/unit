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
import {ModifyStatusUseCase} from "../Domain/in/ModifyStatusUseCase";

// + unit.getUUID a cosa serviva?
/*
Il websocket deve essere un campo del ServerMessageController?
Se si, forse i vari "ws.on" vanno nel costruttore?
*/

@injectable()
export class ServerMessageController {

    //private ws: WebSocket;
    private running: boolean;
    private pos: Position;
    private speed: number;
    private error: number;
    private path_request: boolean;
    private status: UnitStatus;

    constructor(@inject("CheckUnitErrorUseCase") private checkUnitError: CheckUnitErrorUseCase,
                @inject("CheckUnitRequestPathUseCase") private checkUnitRequestPath: CheckUnitRequestPathUseCase,
                @inject("ModifyPathUseCase") private modifyPath: ModifyPathUseCase,
                @inject("UnitChangedStatusUseCase") private unitChangedStatus: UnitChangedStatusUseCase,
                @inject("CheckUnitChangedSpeedUseCase") private checkUnitChangedSpeed: CheckUnitChangedSpeedUseCase,
                @inject("CheckObstaclesUseCase") private checkObstacles: CheckObstaclesUseCase,
                @inject("CheckUnitHasMovedUseCase") private checkUnitHasMoved: CheckUnitHasMovedUseCase,
                @inject("ModifyStatusUseCase") private modifyStatus: ModifyStatusUseCase,
                @inject("WebSocket") private ws: WebSocket) {

        this.ws.on('open', function open(): any {
            console.log("Connection with serveer established! \n");
        });
        
        this.ws.on('message', function incoming(data): any {
            var msg: any = JSON.parse(data.toString());
            switch(msg.type) {
                case "StartToUnit":
                    console.log("Received a start message")
                    //modifyPath.receivedNewPath(msg.path);
                    break;
                case "CommandToUnit":
                    console.log("Receive a command message")
                    //modifyStatus.modifyStatus(msg.command);
                    break
                case "KeepAliveToUnit":
                    break
                default:
                    console.log("Received an unknown type of message");
                    console.log(msg);
            }
            
            
        });
        
        this.ws.on('close', function close(reason) {
            console.log("Connection with server closed");
            console.log(reason);
        });
        
        this.ws.on('error', function error(err) {
            console.log("An internal error has occurred");
            console.log(err);    
        });
       
        this.running = true;
        this.pos = new Position(0, 0);
        this.speed = 2500;
        this.status = UnitStatus.STOP;
        this.error = 0;
        this.path_request = false;
    };

    
    async modifyDataForPath(data: any): Promise<void> {
        this.modifyPath.receivedNewPath(data);
    }

    async sendUnitInfoTest(): Promise<void> {
            const curr_position = await this.checkUnitHasMoved.checkIfUnitHasMoved();
            const curr_path_request = await this.checkUnitRequestPath.checkIfUnitRequestPath();
            
            console.log(curr_position);
            console.log(curr_path_request);

            var data = {
              "position": { "x": curr_position.x, "y": curr_position.y }, 
              "pathRequest": 1,
              "obstacle": []  
            }

            this.ws.send(JSON.stringify(data));
    }

    async sendUnitInfo(): Promise<void> {
        while(this.running === true) {
            const curr_position = await this.checkUnitHasMoved.checkIfUnitHasMoved();
            const curr_error = await this.checkUnitError.checkIfUnitError();
            const curr_path_request = await this.checkUnitRequestPath.checkIfUnitRequestPath();
            const curr_status = await this.unitChangedStatus.checkIfUnitChangedStatus();
            //const newObstacles = await this.checkObstacles.checkObstacles();

            this.checkAndSendUnitPosition(curr_position);
            this.checkAndSendUnitError(curr_error);
            this.checkAndSendUnitPathRequest(curr_path_request);
            //this.checkAndSendUnitStatus(curr_status);

            await new Promise(resolve => setTimeout(resolve, 1500));
        }
    }

    async checkAndSendUnitPosition(pos: Position) {
        if(JSON.stringify(pos) != JSON.stringify(this.pos)) {
            this.pos = pos;
            var msg = {
                "type": "PositionFromUnit",
                "position": this.pos
            }
            this.ws.send(JSON.stringify(msg));
            console.log("sending pos...");
        }
    }

    
    async checkAndSendUnitError(err: number) {
        if(err != this.error) {
            this.error = err;
            var msg = {
                "type": "ErrorFromUnit",
                "error": this.error
            }
            this.ws.send(JSON.stringify(msg));
            console.log("sending err...");
        }
    }

    async checkAndSendUnitPathRequest(pr: boolean) {
        if(pr != this.path_request) {
            this.path_request = pr;
            var msg = {
                "type": "PathRequestFromUnit"
            }
            this.ws.send(JSON.stringify(msg));
            console.log("sending pr...");
        }
    }

    async checkAndSendUnitStatus(stat: UnitStatus) {
        if(stat != this.status) {
            this.status = stat;
            var msg = {
                "type": "StatusFromUnit",
                "status": this.status
            }
            this.ws.send(JSON.stringify(msg));
            console.log("sending status...");
        }
    }
    
    /*
    async checkUnitSpeed() {
        let speed: number = await this.checkUnitChangedSpeed.checkIfUnitChangedSpeed();
        
        TO DO
        
    }
    */
}
