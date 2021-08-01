/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */

import {ModifyStatusUseCase} from "../in/ModifyStatusUseCase";
import {ModifyStatusOutbound} from "../../Persistence/in/ModifyStatusOutbound";
import {UnitStatus} from "../../UnitStatus";
import {inject, injectable} from "tsyringe";

@injectable()
export class ModifyStatusService implements ModifyStatusUseCase {

    constructor(@inject("ModifyStatusOutbound") private outbound: ModifyStatusOutbound) {}

    modifyStatus(status: UnitStatus): void {
        this.outbound.statusToMongo(status);
    }
}
