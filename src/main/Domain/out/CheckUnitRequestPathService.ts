/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */

import {CheckUnitRequestPathUseCase} from "../in/CheckUnitRequestPathUseCase";
import {UnitPathRequestOutbound} from "../../Persistence/in/UnitPathRequestOutbound";
import {inject, injectable} from "tsyringe";

@injectable()
export class CheckUnitRequestPathService implements CheckUnitRequestPathUseCase {

    constructor(@inject("UnitPathRequestOutbound") private outbound: UnitPathRequestOutbound) {}

    async checkIfUnitRequestPath(): Promise<boolean> {
        return this.outbound.loadPathRequest();
    }
}
