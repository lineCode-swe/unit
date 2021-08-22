import {Position} from "../../Position";

export interface LoadDetectedObstaclesUseCase {
    loadDetectedObstacles(): Promise<Position[]>;
}