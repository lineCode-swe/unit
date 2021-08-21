/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */

import {LoadPathUseCase} from "../in/LoadPathUseCase";
import {LoadPathOutbound} from "../../Persistence/in/LoadPathOutbound";
import {Position} from "../../Position";
import {inject, injectable} from "tsyringe";

@injectable()
export class LoadPathService implements LoadPathUseCase {

    constructor(@inject("LoadPathOutbound") private outbound: LoadPathOutbound) {}

    async loadPath(): Promise<Position[]> {
        return this.outbound.loadPath();
    }
}
