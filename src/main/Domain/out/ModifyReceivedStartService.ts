import {inject, injectable} from "tsyringe";
import {ModifyReceivedStartUseCase} from "../in/ModifyReceivedStartUseCase";
import {ModifyReceivedStartOutbound} from "../../Persistence/in/ModifyReceivedStartOutbound";

@injectable()
export class ModifyReceivedStartService implements ModifyReceivedStartUseCase {

  constructor(@inject("ModifyReceivedStartOutbound") private outbound: ModifyReceivedStartOutbound) {}

  receivedNewReceivedStart(received_start: boolean): void {
    this.outbound.receivedStartToMongo(received_start);
  }
}