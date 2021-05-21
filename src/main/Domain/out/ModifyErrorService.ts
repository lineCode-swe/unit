import {ModifyErrorUseCase} from "../in/ModifyErrorUseCase";
import {ModifyErrorOutbound} from "../../Persistence/in/ModifyErrorOutbound";
import {inject, injectable} from "tsyringe";

@injectable()
export class ModifyErrorService implements ModifyErrorUseCase {

    constructor(@inject("ModifyErrorOutbound") private outbound: ModifyErrorOutbound) {}

    modifyError(err: number): void {
        this.outbound.errorToMongo(err);
    }
}
