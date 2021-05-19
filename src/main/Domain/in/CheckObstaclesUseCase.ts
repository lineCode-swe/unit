import {Position} from "../../Position";

export interface CheckObstaclesUseCase {
    checkObstacles(): Promise<Position[]>;
}
