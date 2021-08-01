/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */

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
