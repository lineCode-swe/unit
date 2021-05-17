import {CheckUnitErrorUseCase} from "../in/CheckUnitErrorUseCase";
import {CheckErrorOutbound} from "../../Persistence/in/CheckErrorOutbound";

class CheckUnitErrorService implements CheckUnitErrorUseCase {
    public outbound: CheckErrorOutbound;

    constructor(outbound: CheckErrorOutbound) {
        this.outbound = outbound;
    }

    checkIfUnitError(): string {
        // const response = await this.outbound.loadError();

        return "";
    }
}
