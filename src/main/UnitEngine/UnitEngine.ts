import {Position} from "../Position";
import {ModifyPathRequestUseCase} from "../Domain/in/ModifyPathRequestUseCase";
import {LoadPathUseCase} from "../Domain/in/LoadPathUseCase";
import {ModifyPositionUseCase} from "../Domain/in/ModifyPositionUseCase";
import {ModifySpeedUseCase} from "../Domain/in/ModifySpeedUseCase";
import {ModifyErrorUseCase} from "../Domain/in/ModifyErrorUseCase";
import {ModifyStatusUseCase} from "../Domain/in/ModifyStatusUseCase";
import {CheckObstaclesUseCase} from "../Domain/in/CheckObstaclesUseCase";
import {ModifyDetectedObstaclesUseCase} from "../Domain/in/ModifyDetectedObstaclesUseCase";
import {UnitChangedStatusUseCase} from "../Domain/in/UnitChangedStatusUseCase";
import {inject, injectable} from "tsyringe";
import {UnitStatus} from "../UnitStatus";

@injectable()
export class UnitEngine {

    private path: Position[];
    private curr_path_pos: number;
    private curr_path_length: number;
    private curr_pos: Position;
    private speed: number;
    private error: number;
    private path_request: boolean;
    private status: UnitStatus;
    private obs: Position[];
    private readonly base: any;

    private slowSpeed: number;

    constructor(@inject("ModifyPositionUseCase") private ModifyPosition: ModifyPositionUseCase,
                @inject("ModifyPathRequestUseCase") private ModifyPathRequest: ModifyPathRequestUseCase,
                @inject("LoadPathUseCase") private LoadPath: LoadPathUseCase,
                @inject("ModifySpeedUseCase") private ModifySpeed: ModifySpeedUseCase,
                @inject("ModifyErrorUseCase") private ModifyError: ModifyErrorUseCase,
                @inject("ModifyStatusUseCase") private ModifyStatus: ModifyStatusUseCase,
                @inject("CheckObstaclesUseCase") private CheckObstacles: CheckObstaclesUseCase,
                @inject("ModifyDetectedObstaclesUseCase") private ModifyDetectedObstacles: ModifyDetectedObstaclesUseCase,
                @inject("UnitChangedStatusUseCase") private UnitChangedStatus: UnitChangedStatusUseCase) {
        this.path = [ new Position(0, 0) ];
        this.curr_path_pos = 0;
        this.curr_path_length = this.path.length;
        let ubx: any = process.env.UNIT_BASE_X;
        let uby: any = process.env.UNIT_BASE_Y;
        this.curr_pos = new Position(ubx, uby);
        this.speed = 2500;
        this.status = UnitStatus.BASE;
        this.error = 0;
        this.slowSpeed = this.speed*2;
        this.path_request = true;
        this.base = {
            "x": Number(process.env.UNIT_BASE_X),
            "y": Number(process.env.UNIT_BASE_Y)
        }
        this.obs = []
        /*this.unit_base_x = process.env.UNIT_BASE_X;
        this.unit_base_y = process.env.UNIT_BASE_Y;
        console.log(this.unit_base_x);
        console.log(this.unit_base_y);*/
    };

    async begin(): Promise<void> {
        console.log("Unit is running");
        while(this.status != UnitStatus.DISCONNECTED) {
            this.status = await this.UnitChangedStatus.checkIfUnitChangedStatus();
            if (this.status == UnitStatus.STOP || this.status == UnitStatus.BASE || this.status == UnitStatus.ERROR) {
                let new_path = await this.LoadPath.loadPath();
                console.log("Checking for new path");
                if (JSON.stringify(new_path) != JSON.stringify(this.path)) {
                    this.path = new_path;
                    this.curr_path_length = this.path.length;
                    this.curr_path_pos = 0;
                    this.error = 0;
                    this.status = UnitStatus.GOINGTO;
                    console.log(this.status);
                    this.setStatus(this.status);
                    this.setError(0);
                }
                await new Promise(resolve => setTimeout(resolve, this.speed));
            } else if (this.status == UnitStatus.GOINGTO) {
                console.log("Unit is starting");
                this.obs = await this.CheckObstacles.checkObstacles();
                let det_obs = this.checkForInboundObs(this.obs); // Controllo se ci sono ostacoli intorno all' unita
                console.log("Obstacles found: " + JSON.stringify(det_obs));
                let block = this.checkForBlockingObs(det_obs); // Controllo se ci sono ostacoli che bloccano i movimenti dell' unita
                console.log("Blocking obstacles found: " + block);

                this.ModifyDetectedObstacles.detectedObstacles(det_obs);


                if(this.curr_path_pos < this.curr_path_length) {
                    if(!block) {
                        console.log("No blocking obstacles, advancing");
                        this.path_request = false;
                        this.setPathRequest(this.path_request);
                        this.curr_pos = this.path[this.curr_path_pos];
                        console.log("Moving to: " + this.curr_pos.x + ", " + this.curr_pos.y);
                        this.curr_path_pos += 1;
                        this.setPosition(this.curr_pos);
                        await new Promise(resolve => setTimeout(resolve, this.speed));
                        await this.updateStatus();
                    } else {
                        console.log("There is a blocking obstacle, stop");
                        this.error = 10;
                        this.status = UnitStatus.STOP;
                        this.setStatus(this.status);
                        this.setError(10);
                        await new Promise(resolve => setTimeout(resolve, this.speed));
                    }
                } else {
                    if(JSON.stringify(this.curr_pos) == JSON.stringify(this.base)) {
                        this.status = UnitStatus.BASE;
                        this.setStatus(this.status);
                    } else {
                        this.status = UnitStatus.STOP;
                        this.path_request = true;
                        this.setStatus(this.status);
                        this.setPathRequest(this.path_request);
                        await new Promise(resolve => setTimeout(resolve, 3000));
                    }
                }
            }
            if (this.status == UnitStatus.ERROR) {
                await new Promise(resolve => setTimeout(resolve, 5000));
                this.path_request = true;
                this.setPathRequest(this.path_request);
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        }
    }

    checkForInboundObs(obs: Position[]): Position[] {
        let det_obs: Position[] = [];
        obs.forEach( value => {
            if((value.x == (this.curr_pos.x) || value.x == (this.curr_pos.x-1) || value.x == (this.curr_pos.x+1))
                && (value.y == (this.curr_pos.y) || value.y == (this.curr_pos.y-1) || value.y == (this.curr_pos.y+1))) {
                det_obs.push(value);
                console.log("Update di ostacoli:" + JSON.stringify(det_obs));
            }
        })
        return det_obs;
    }

    private checkForBlockingObs(det_obs: Position[]): boolean {
        let blocked: boolean = false;
        det_obs.forEach(value => {
            console.log(JSON.stringify(value));
            console.log(JSON.stringify(this.path[this.curr_path_pos]));
            console.log(JSON.stringify(value) == JSON.stringify(this.path[this.curr_path_pos]));
            if(JSON.stringify(value) == JSON.stringify(this.path[this.curr_path_pos])) {
                blocked = true;
            }
        })
        return blocked;
    }

    stop(): void {
        this.status = UnitStatus.DISCONNECTED;
    }

    private setSpeed(new_speed: number): void {
        this.ModifySpeed.modifySpeed(new_speed);
    }

    private setError(new_error: number): void {
        this.ModifyError.modifyError(new_error);
    }

    private setPosition(new_position: Position): void {
        this.ModifyPosition.modifyPosition(new_position);
    }

    private setStatus(new_status: UnitStatus): void {
        this.ModifyStatus.modifyStatus(new_status);
    }

    private setPathRequest(new_path_request: boolean): void {
        this.ModifyPathRequest.receivedNewPathRequest(new_path_request);
    }

    private async updateStatus(): Promise<void> {
        let aux_status = await this.UnitChangedStatus.checkIfUnitChangedStatus();
        if(aux_status != this.status) {
            this.status = aux_status;
        }
    }
}
