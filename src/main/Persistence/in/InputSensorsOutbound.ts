/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */

import { Position } from "../../Position"

export interface InputSensorsOutbound {
    obstaclesToMongo(obstacles: Position[]): Promise<void>;
}
