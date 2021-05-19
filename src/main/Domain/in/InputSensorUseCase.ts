// import {ObstacleMessageObj} from "../../ObstacleMessageObj";
import {Position} from "../../Position";

export interface InputSensorUseCase {
    receivedObstacle(obs: Position[]): void;
}
