import {Position} from "../../Position";

export interface StartReceivedUseCase {
    receivedNewPath(msg: Position[]): void;
}
