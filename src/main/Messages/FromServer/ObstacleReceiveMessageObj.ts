/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */

import {Position} from "../../Position";

class ObstacleReceiveMessageObj {
    public type: string;
    public obstacle: Position[];

    constructor(type: string, obstacle: Position[]) {
        this.type = type;
        this.obstacle = obstacle;
    }

    getType(): string {
        return this.type;
    }

    getObstacle(): Position[] {
        return this.obstacle;
    }
}
