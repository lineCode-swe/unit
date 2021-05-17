import {Position} from "../../Position";

export interface ModifyPathUseCase {
    receivedNewPath(msg: Position[]): void;
}
