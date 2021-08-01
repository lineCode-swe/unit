/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */

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
                @inject("WebSocket") private ws: WebSocket,
                @inject("UnitEngine") private clientUnitEngine: UnitEngine) {

        this.ws.on('open', function open(): any {
            console.log("Connection with server established! \n");
        });
        
        this.ws.on('message', function incoming(data): any {
            var msg: any = JSON.parse(data.toString());
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
            console.log("An internal error has occurred");
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
            const curr_position = await this.checkUnitHasMoved.checkIfUnitHasMoved();
            const curr_error = await this.checkUnitError.checkIfUnitError();
            const curr_path_request = await this.checkUnitRequestPath.checkIfUnitRequestPath();
            const curr_status = await this.unitChangedStatus.checkIfUnitChangedStatus();
            console.log(curr_status);
            //const newObstacles = await this.checkObstacles.checkObstacles();

            this.checkAndSendUnitPosition(curr_position);
            this.checkAndSendUnitError(curr_error);
            this.checkAndSendUnitPathRequest(curr_path_request);
            this.checkAndSendUnitStatus(curr_status);

            await new Promise(resolve => setTimeout(resolve, 1500));
        }
    }

    async checkAndSendUnitPosition(pos: Position) {
        if(JSON.stringify(pos) != JSON.stringify(this.pos)) {
            this.pos = pos;
            let msg = {
                "type": "PositionToServer",
                "position": this.pos
            }
            this.ws.send(JSON.stringify(msg));
            console.log("sending pos...");
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
            if(this.path_request == true) {
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
