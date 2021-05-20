import {CheckUnitRequestPathUseCase} from "../in/CheckUnitRequestPathUseCase";
import {UnitPathRequestOutbound} from "../../Persistence/in/UnitPathRequestOutbound";
import {inject, injectable} from "tsyringe";

@injectable()
class CheckUnitRequestPathService implements CheckUnitRequestPathUseCase {

    constructor(@inject("UnitPathRequestOutbound") private outbound: UnitPathRequestOutbound) {}

    async checkIfUnitRequestPath(): Promise<boolean> {
        return await this.outbound.loadPathRequest();
    }
}
