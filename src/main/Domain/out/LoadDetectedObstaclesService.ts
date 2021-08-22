import {LoadDetectedObstaclesUseCase} from "../in/LoadDetectedObstaclesUseCase";
import {LoadDetectedObstaclesOutbound} from "../../Persistence/in/LoadDetectedObstaclesOutbound";
import {Position} from "../../Position";
import {inject, injectable} from "tsyringe";

@injectable()
export class LoadDetectedObstaclesService implements LoadDetectedObstaclesUseCase {

    constructor(@inject("LoadDetectedObstaclesOutbound") private outbound: LoadDetectedObstaclesOutbound) {}

    async loadDetectedObstacles(): Promise<Position[]> {
        return await this.outbound.detectedObstaclesFromMongo();
    }
}