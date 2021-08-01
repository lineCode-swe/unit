/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */

import {CheckUnitHasMovedUseCase} from "../in/CheckUnitHasMovedUseCase";
import {UnitHasMovedOutbound} from "../../Persistence/in/UnitHasMovedOutbound";
import {Position} from "../../Position";
import {inject, injectable} from "tsyringe";

@injectable()
export class CheckUnitHasMovedService implements CheckUnitHasMovedUseCase {

    constructor(@inject("UnitHasMovedOutbound") private outbound: UnitHasMovedOutbound) {}

    async checkIfUnitHasMoved(): Promise<Position> {
        return await this.outbound.loadPosition();
    }
}
