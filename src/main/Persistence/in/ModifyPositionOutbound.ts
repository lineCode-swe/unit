import { Position } from "../../Position"

export interface ModifyPositionOutbound {
    positionToMongo(pos: Position): Promise<void>;
}