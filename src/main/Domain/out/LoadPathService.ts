import {LoadPathUseCase} from "../in/LoadPathUseCase";
import {LoadPathOutbound} from "../../Persistence/in/LoadPathOutbound";
import {Position} from "../../Position";

class LoadPathService implements LoadPathUseCase {
    public outbound: LoadPathOutbound;

    constructor(outbound: LoadPathOutbound) {
        this.outbound = outbound;
    }

    async loadPath(): Promise<Position[]> {
        return await this.outbound.loadPath();
    }
}
