import { Position } from "../../Position"

export interface LoadPathOutbound {
    loadPath(): Promise<Position[]>;
}