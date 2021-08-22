import {Position} from "../../Position";

export interface ModifyDetectedObstaclesUseCase {
    detectedObstacles(obs: Position[]): void;
}