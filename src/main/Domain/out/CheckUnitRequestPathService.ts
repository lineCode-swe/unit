import {CheckUnitRequestPathUseCase} from "../in/CheckUnitRequestPathUseCase";
import {UnitPathRequestOutbound} from "../../Persistence/in/UnitPathRequestOutbound";
import {Position} from "../../Position";

class CheckUnitRequestPathService implements CheckUnitRequestPathUseCase {
    public outbound: UnitPathRequestOutbound;

    constructor(outbound: UnitPathRequestOutbound) {
        this.outbound = outbound;
    }

    checkIfUnitRequestPath(): boolean {
        // const response = await this.outbound.loadPathRequest();

        return false;
    }
}
