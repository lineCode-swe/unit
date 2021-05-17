import { Position } from "../../Position"

export interface InputSensorsOutbound {
    obstaclesToMongo(obstacles: Position[]): Promise<void>;
}