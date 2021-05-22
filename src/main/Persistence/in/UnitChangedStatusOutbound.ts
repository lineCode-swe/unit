import {UnitStatus} from "../../UnitStatus";

export interface UnitChangedStatusOutbound {
    loadStatus(): Promise<UnitStatus>;
}
