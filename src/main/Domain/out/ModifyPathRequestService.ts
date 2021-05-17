import {ModifyPathRequestUseCase} from "../in/ModifyPathRequestUseCase";
import {ModifyPathRequestOutbound} from "../../Persistence/in/ModifyPathRequestOutbound";

class ModifyPathRequestService implements ModifyPathRequestUseCase {
    public outbound: ModifyPathRequestOutbound;

    constructor(outbound: ModifyPathRequestOutbound) {
        this.outbound = outbound;
    }

    receivedNewPathRequest(pathRequest: boolean): void {
        this.outbound.pathRequestToMongo(pathRequest);
    }
}
