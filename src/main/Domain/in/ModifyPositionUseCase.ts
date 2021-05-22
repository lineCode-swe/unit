import { Position } from "../../Position";

export interface ModifyPositionUseCase {
    modifyPosition(pos: Position): void;
}
