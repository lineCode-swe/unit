import {ModifyPathRequestUseCase} from "../in/ModifyPathRequestUseCase";
import {ModifyPathRequestOutbound} from "../../Persistence/in/ModifyPathRequestOutbound";
import {inject, injectable} from "tsyringe";

@injectable()
export class ModifyPathRequestService implements ModifyPathRequestUseCase {

    constructor(@inject("ModifyPathRequestOutbound") private outbound: ModifyPathRequestOutbound) {}

    receivedNewPathRequest(pathRequest: boolean): void {
        this.outbound.pathRequestToMongo(pathRequest);
    }
}
