import {ModifyPathUseCase} from "../in/ModifyPathUseCase";
import {ModifyPathOutbound} from "../../Persistence/in/ModifyPathOutbound";
import {Position} from "../../Position";

class ModifyPathService implements ModifyPathUseCase {
    public outbound: ModifyPathOutbound;

    constructor(outbound: ModifyPathOutbound) {
        this.outbound = outbound;
    }

    receivedNewPath(path: Position[]): void {
        this.outbound.pathToMongo(path);
    }
}
