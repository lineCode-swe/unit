import {inject, injectable} from "tsyringe";
import {LoadReceivedStartUseCase} from "../in/LoadReceivedStartUseCase";
import {LoadReceivedStartOutbound} from "../../Persistence/in/LoadReceivedStartOutbound";

@injectable()
export class LoadReceivedStartService implements LoadReceivedStartUseCase {
  constructor(@inject("LoadReceivedStartOutbound") private outbound: LoadReceivedStartOutbound) {
  }

  loadReceivedStart(): Promise<boolean> {
    return this.outbound.loadReceivedStart();
  }
}