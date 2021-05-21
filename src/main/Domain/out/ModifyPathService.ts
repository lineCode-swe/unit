import {ModifyPathUseCase} from "../in/ModifyPathUseCase";
import {ModifyPathOutbound} from "../../Persistence/in/ModifyPathOutbound";
import {Position} from "../../Position";
import {inject, injectable} from "tsyringe";

@injectable()
export class ModifyPathService implements ModifyPathUseCase {

    constructor(@inject("ModifyPathOutbound") private outbound: ModifyPathOutbound) {}

    receivedNewPath(path: Position[]): void {
        this.outbound.pathToMongo(path);
    }
}
