/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */

import {ModifyPositionUseCase} from "../in/ModifyPositionUseCase";
import {ModifyPositionOutbound} from "../../Persistence/in/ModifyPositionOutbound";
import {Position} from "../../Position";
import {inject, injectable} from "tsyringe";

@injectable()
export class ModifyPositionService implements ModifyPositionUseCase {

    constructor(@inject("ModifyPositionOutbound") private outbound: ModifyPositionOutbound) {}

    modifyPosition(pos: Position): void {
        this.outbound.positionToMongo(pos);
    }
}
