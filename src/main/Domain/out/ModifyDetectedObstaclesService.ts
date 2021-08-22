import {ModifyDetectedObstaclesUseCase} from "../in/ModifyDetectedObstaclesUseCase";
import {ModifyDetectedObstaclesOutbound} from "../../Persistence/in/ModifyDetectedObstaclesOutbound";
import {Position} from "../../Position";
import {inject, injectable} from "tsyringe";

@injectable()
export class ModifyDetectedObstaclesService implements ModifyDetectedObstaclesUseCase {

    constructor(@inject("ModifyDetectedObstaclesOutbound") private outbound: ModifyDetectedObstaclesOutbound) {}

    detectedObstacles(obs: Position[]): void {
        this.outbound.detectedObstaclesToMongo(obs);
    }
}