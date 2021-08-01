/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */

import {CheckObstaclesUseCase} from "../in/CheckObstaclesUseCase";
import {ObstaclesOutbound} from "../../Persistence/in/ObstaclesOutbound";
import {Position} from "../../Position";
import {inject, injectable} from "tsyringe";

@injectable()
export class CheckObstaclesService implements CheckObstaclesUseCase {

    constructor(@inject("ObstaclesOutbound") private outbound: ObstaclesOutbound) {}

    async checkObstacles(): Promise<Position[]> {
        return await this.outbound.loadObstacles();
    }
}
