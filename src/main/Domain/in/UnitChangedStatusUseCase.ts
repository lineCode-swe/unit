import { UnitStatus } from "../../UnitStatus";

export interface UnitChangedStatusUseCase {
    checkIfUnitChangedStatus(): Promise<UnitStatus>;
}
