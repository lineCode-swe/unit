import {CheckObstaclesUseCase} from "../in/CheckObstaclesUseCase";
import {ObstaclesOutbound} from "../../Persistence/in/ObstaclesOutbound";
import {Position} from "../../Position";

class CheckObstaclesService implements CheckObstaclesUseCase {
    public outbound: ObstaclesOutbound;

    constructor(outbound: ObstaclesOutbound) {
        this.outbound = outbound;
    }

    checkObstacles(obs: Position): boolean {
        // this.outbound.loadObstacles();

        return false;
    }
}
