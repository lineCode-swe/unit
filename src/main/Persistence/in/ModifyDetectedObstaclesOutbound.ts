import { Position } from "../../Position"

export interface ModifyDetectedObstaclesOutbound {
    detectedObstaclesToMongo(obstacles: Position[]): Promise<void>;
}