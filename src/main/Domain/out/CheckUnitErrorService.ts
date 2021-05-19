import {CheckUnitErrorUseCase} from "../in/CheckUnitErrorUseCase";
import {CheckErrorOutbound} from "../../Persistence/in/CheckErrorOutbound";

class CheckUnitErrorService implements CheckUnitErrorUseCase {
    public outbound: CheckErrorOutbound;

    constructor(outbound: CheckErrorOutbound) {
        this.outbound = outbound;
    }

    async checkIfUnitError(): Promise<number> {
        return await this.outbound.loadError();
    }
}
