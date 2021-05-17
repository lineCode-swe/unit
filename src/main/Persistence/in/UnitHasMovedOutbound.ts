import { Position } from "../../Position"

export interface UnitHasMovedOutbound {
    loadPosition(): Promise<Position>;
}