import { Position } from "../../Position"

export interface ObstaclesOutbound {
    loadObstacles(): Promise<Position[]>;
}