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
import {ModifyPathRequestUseCase} from "../Domain/in/ModifyPathRequestUseCase";
import {LoadDetectedObstaclesUseCase} from "../Domain/in/LoadDetectedObstaclesUseCase";
import {ModifyErrorUseCase} from "../Domain/in/ModifyErrorUseCase";
import {UnitEngine} from '../UnitEngine/UnitEngine';

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
                @inject("ModifyPathRequestUseCase") private modifyPathRequest: ModifyPathRequestUseCase,
                @inject("LoadDetectedObstaclesUseCase") private loadDetectedObstacles: LoadDetectedObstaclesUseCase,
                @inject("ModifyErrorUseCase") private modifyError: ModifyErrorUseCase,
                @inject("WebSocketServer") private ws: WebSocket,
                @inject("UnitEngine") private clientUnitEngine: UnitEngine) {

        this.ws.on('open', function open(): any {
            console.log("Connection with server established! \n");
        });
        
        this.ws.on('message', function incoming(data): any {
            let msg: any = JSON.parse(data.toString());
            switch(msg.type) {
                case "StartToUnit":
                    console.log("Received a start message");
                    console.log(msg.path);
                    modifyPath.receivedNewPath(msg.path);
                    break;
                case "CommandToUnit":
                    console.log("Receive a command message");
                    if(msg.command == "SHUTDOWN") {
                        modifyStatus.modifyStatus(UnitStatus.DISCONNECTED);
                    } else {
                        modifyStatus.modifyStatus(msg.command);
                    }
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
            console.log("An internal error in server websocket has occurred");
            console.log(err);    
        });
       
        this.pos = new Position(-1, -1);
        this.speed = 2500;
        this.status = UnitStatus.BASE;
        this.error = 0;
        this.path_request = false;
        this.running = false;
    };

    async checkWebSocketStateBeforeRunning() {
        while(this.ws.readyState !== WebSocket.OPEN) {
            console.log("Waiting to start for connection to open");
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
        this.running = true;
        this.clientUnitEngine.begin();
        this.sendUnitInfo();
    }

    async modifyDataForPath(data: any): Promise<void> {
        this.modifyPath.receivedNewPath(data);
    }

    async sendUnitInfo(): Promise<void> {
        while(this.running) {
            let curr_position = await this.checkUnitHasMoved.checkIfUnitHasMoved();
            let curr_error = await this.checkUnitError.checkIfUnitError();
            let curr_path_request = await this.checkUnitRequestPath.checkIfUnitRequestPath();
            let curr_status = await this.unitChangedStatus.checkIfUnitChangedStatus();
            let curr_obs = await this.loadDetectedObstacles.loadDetectedObstacles();

            this.checkAndSendUnitPositionAndObstacles(curr_position, curr_obs, curr_error);
            this.checkAndSendUnitError(curr_error);
            this.checkAndSendUnitPathRequest(curr_path_request);
            this.checkAndSendUnitStatus(curr_status);

            await new Promise(resolve => setTimeout(resolve, 1500));
        }
    }

    async checkAndSendUnitPositionAndObstacles(pos: Position, obs: Position[], err: number) {
        if(JSON.stringify(pos) != JSON.stringify(this.pos)) {
            this.pos = pos;
            let msg = {
                "type": "PositionToServer",
                "position": this.pos,
                "obstacles": obs
            }
            console.log(msg);
            this.ws.send(JSON.stringify(msg));
            console.log("sending pos and obstacles: position changes");
        } else if(err == 10) {
            this.modifyError.modifyError(1);
            this.pos = pos;
            let msg = {
                "type": "PositionToServer",
                "position": this.pos,
                "obstacles": obs
            }
            console.log(msg);
            this.ws.send(JSON.stringify(msg));
            console.log("sending pos and obstacles: found obstacles");
        }
    }

    
    async checkAndSendUnitError(err: number) {
        if(err != this.error) {
            this.error = err;
            let msg = {
                "type": "ErrorToServer",
                "error": this.error
            }
            this.ws.send(JSON.stringify(msg));
            console.log("sending err...");
        }
    }

    async checkAndSendUnitPathRequest(pr: boolean) {
        if(pr != this.path_request) {
            this.path_request = pr;
            if(this.path_request) {
                let msg = {
                    "type": "PathRequestToServer"
                }
                this.ws.send(JSON.stringify(msg));
                console.log("sending pr...");
            }
            this.modifyPathRequest.receivedNewPathRequest(false);
        }
    }

    async checkAndSendUnitStatus(stat: UnitStatus) {
        if(stat != this.status) {
            this.status = stat;
            if(this.status == UnitStatus.DISCONNECTED) {
                let msg = {
                    "type": "StatusToServer",
                    "status": this.status
                }
                this.ws.send(JSON.stringify(msg));
                console.log("sending status...");
                process.exit();
            } else {
                let msg = {
                    "type": "StatusToServer",
                    "status": this.status
                }
                this.ws.send(JSON.stringify(msg));
                console.log("sending status...");
            }
        }
    }
}
