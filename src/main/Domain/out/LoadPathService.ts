import {LoadPathUseCase} from "../in/LoadPathUseCase";
import {LoadPathOutbound} from "../../Persistence/in/LoadPathOutbound";
import {Position} from "../../Position";
import {inject, injectable} from "tsyringe";

@injectable()
class LoadPathService implements LoadPathUseCase {

    constructor(@inject("LoadPathOutbound") private outbound: LoadPathOutbound) {}

    async loadPath(): Promise<Position[]> {
        return await this.outbound.loadPath();
    }
}
