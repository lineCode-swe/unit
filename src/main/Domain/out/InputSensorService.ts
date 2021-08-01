/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */

import {InputSensorUseCase} from "../in/InputSensorUseCase";
import {InputSensorsOutbound} from "../../Persistence/in/InputSensorsOutbound";
import {Position} from "../../Position";
import {inject, injectable} from "tsyringe";

@injectable()
export class InputSensorService implements InputSensorUseCase {

    constructor(@inject("InputSensorsOutbound") private outbound: InputSensorsOutbound) {}

    receivedObstacle(obs: Position[]): void {
        this.outbound.obstaclesToMongo(obs);
    }
}
