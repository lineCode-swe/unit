import { Position } from "../../Position";

export interface ModifyPathOutbound {
    pathToMongo(path: Position[]): Promise<void>;
}