/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */

import {UnitChangedStatusUseCase} from "../in/UnitChangedStatusUseCase";
import {UnitChangedStatusOutbound} from "../../Persistence/in/UnitChangedStatusOutbound";
import {UnitStatus} from "../../UnitStatus";
import {inject, injectable} from "tsyringe";

@injectable()
export class UnitChangedStatusService implements UnitChangedStatusUseCase {

    constructor(@inject("UnitChangedStatusOutbound") private outbound: UnitChangedStatusOutbound) {}

    async checkIfUnitChangedStatus(): Promise<UnitStatus> {
        return this.outbound.loadStatus();
    }
}
