import { Position } from "../Position";
import { ModifyPathRequestUseCase  } from "../Domain/in/ModifyPathRequestUseCase";
import { LoadPathUseCase } from "../Domain/in/LoadPathUseCase";
import { ModifyPositionUseCase } from "../Domain/in/ModifyPositionUseCase";
import { ModifySpeedUseCase } from "../Domain/in/ModifySpeedUseCase";
import { ModifyErrorUseCase } from "../Domain/in/ModifyErrorUseCase";
import { ModifyStatusUseCase } from "../Domain/in/ModifyStatusUseCase";
import { inject, injectable } from "tsyringe";
import { UnitStatus } from "../UnitStatus";

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


    private slowSpeed: number;

    constructor(@inject("ModifyPositionUseCase") private ModifyPosition: ModifyPositionUseCase,
                @inject("ModifyPathRequestUseCase") private ModifyPathRequest: ModifyPathRequestUseCase,
                @inject("LoadPathUseCase") private LoadPath: LoadPathUseCase,
                @inject("ModifySpeedUseCase") private ModifySpeed: ModifySpeedUseCase,
                @inject("ModifyErrorUseCase") private ModifyError: ModifyErrorUseCase,
                @inject("ModifyStatusUseCase") private ModifyStatus: ModifyStatusUseCase) {
        this.path = [ new Position(0, 0) ];
        this.curr_path_pos = 0;
        this.curr_path_length = this.path.length;
        this.curr_pos = new Position(0, 0);
        this.speed = 2500;
        this.status = UnitStatus.BASE;
        this.error = 0;
        this.slowSpeed = this.speed*2;
        this.path_request = true;
    };

    async begin(): Promise<void> {
        console.log("Unit is running");
        while(this.status != UnitStatus.DISCONNECTED) {
            if(this.status == UnitStatus.STOP || this.status == UnitStatus.BASE) {
                var new_path = await this.LoadPath.loadPath();
                if (JSON.stringify(new_path) != JSON.stringify(this.path)) {
                    this.path = new_path;
                    this.curr_path_length = this.path.length;
                    this.curr_path_pos = 0;
                    this.status = UnitStatus.GOINGTO;
                    this.setStatus(this.status);
                }
                await new Promise(resolve => setTimeout(resolve, this.speed));
            } 
            while(this.status == UnitStatus.GOINGTO) {
                if(this.curr_path_pos < this.curr_path_length) {
                    this.setPathRequest(false);
                    this.curr_pos = this.path[this.curr_path_pos];
                    console.log("Moving to:" + this.curr_pos);
                    this.curr_path_pos += 1;
                    this.setPosition(this.curr_pos);
                    await new Promise(resolve => setTimeout(resolve, this.speed));
                } else {
                    this.status = UnitStatus.STOP;
                    this.path_request = true;
                    this.setStatus(this.status);
                    this.setPathRequest(this.path_request);
                    await new Promise(resolve => setTimeout(resolve, 3000));
                }
            }
        }
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
}
