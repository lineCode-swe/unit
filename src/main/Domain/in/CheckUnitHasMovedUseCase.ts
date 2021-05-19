import {Position} from "../../Position";

export interface CheckUnitHasMovedUseCase {
    checkIfUnitHasMoved(): Promise<Position>;
}
