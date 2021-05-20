import {CheckUnitErrorUseCase} from "../in/CheckUnitErrorUseCase";
import {CheckErrorOutbound} from "../../Persistence/in/CheckErrorOutbound";
import {inject, injectable} from "tsyringe";

@injectable()
class CheckUnitErrorService implements CheckUnitErrorUseCase {

    constructor(@inject("CheckErrorOutbound") private outbound: CheckErrorOutbound) {}

    async checkIfUnitError(): Promise<number> {
        return await this.outbound.loadError();
    }
}
