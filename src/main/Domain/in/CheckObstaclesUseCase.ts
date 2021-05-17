import {Position} from "../../Position";

export interface CheckObstaclesUseCase {
    checkObstacles(obs: Position): boolean;
}
