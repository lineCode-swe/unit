/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */

import {ModifyPathRequestUseCase} from "../in/ModifyPathRequestUseCase";
import {ModifyPathRequestOutbound} from "../../Persistence/in/ModifyPathRequestOutbound";
import {inject, injectable} from "tsyringe";

@injectable()
export class ModifyPathRequestService implements ModifyPathRequestUseCase {

    constructor(@inject("ModifyPathRequestOutbound") private outbound: ModifyPathRequestOutbound) {}

    receivedNewPathRequest(pathRequest: boolean): void {
        this.outbound.pathRequestToMongo(pathRequest);
    }
}
