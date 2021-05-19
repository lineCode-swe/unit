import { Position } from "../../Position";

export interface LoadPathUseCase {
    loadPath(): Promise<Position[]>;
}
