import {ModifyErrorUseCase} from "../in/ModifyErrorUseCase";
import {ModifyErrorOutbound} from "../../Persistence/in/ModifyErrorOutbound";

class ModifyErrorService implements ModifyErrorUseCase {
    public outbound: ModifyErrorOutbound;

    constructor(outbound: ModifyErrorOutbound) {
        this.outbound = outbound;
    }

    modifyError(err: string): void {
        this.outbound.errorToMongo(err);
    }
}