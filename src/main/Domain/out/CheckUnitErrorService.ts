/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */

import {CheckUnitErrorUseCase} from "../in/CheckUnitErrorUseCase";
import {CheckErrorOutbound} from "../../Persistence/in/CheckErrorOutbound";
import {inject, injectable} from "tsyringe";

@injectable()
export class CheckUnitErrorService implements CheckUnitErrorUseCase {

    constructor(@inject("CheckErrorOutbound") private outbound: CheckErrorOutbound) {}

    async checkIfUnitError(): Promise<number> {
        return await this.outbound.loadError();
    }
}
