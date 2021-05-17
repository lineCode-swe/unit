import {LoadPathUseCase} from "../in/LoadPathUseCase";
import {LoadPathOutbound} from "../../Persistence/in/LoadPathOutbound";
import {Position} from "../../Position";

class LoadPathService implements LoadPathUseCase {
    public outbound: LoadPathOutbound;

    constructor(outbound: LoadPathOutbound) {
        this.outbound = outbound;
    }

    loadPath(): Position[] {
        // const response = await this.outbound.loadPath();;

        let temporary: Position[] = [];
        return temporary;
    }
}
