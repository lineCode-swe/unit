import {CheckObstaclesUseCase} from "../in/CheckObstaclesUseCase";
import {ObstaclesOutbound} from "../../Persistence/in/ObstaclesOutbound";
import {Position} from "../../Position";
import {inject, injectable} from "tsyringe";

@injectable()
export class CheckObstaclesService implements CheckObstaclesUseCase {

    constructor(@inject("ObstaclesOutbound") private outbound: ObstaclesOutbound) {}

    async checkObstacles(): Promise<Position[]> {
        return await this.outbound.loadObstacles();
    }
}
