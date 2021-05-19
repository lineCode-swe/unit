import {CheckUnitRequestPathUseCase} from "../in/CheckUnitRequestPathUseCase";
import {UnitPathRequestOutbound} from "../../Persistence/in/UnitPathRequestOutbound";

class CheckUnitRequestPathService implements CheckUnitRequestPathUseCase {
    public outbound: UnitPathRequestOutbound;

    constructor(outbound: UnitPathRequestOutbound) {
        this.outbound = outbound;
    }

    async checkIfUnitRequestPath(): Promise<boolean> {
        return await this.outbound.loadPathRequest();
    }
}
