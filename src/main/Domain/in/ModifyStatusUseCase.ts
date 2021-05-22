import { UnitStatus } from "../../UnitStatus";

export interface ModifyStatusUseCase {
    modifyStatus(status: UnitStatus): void;
}
