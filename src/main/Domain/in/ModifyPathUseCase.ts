import {Position} from "../../Position";

export interface ModifyPathUseCase {
    receivedNewPath(path: Position[]): void;
}
