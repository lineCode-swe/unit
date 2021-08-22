import { Position } from "../../Position"

export interface LoadDetectedObstaclesOutbound {
    detectedObstaclesFromMongo(): Promise<Position[]>;
}