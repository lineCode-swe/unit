/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */

import {Position} from "../../Position";

class ObstacleListMessageObj {
    public type: string;
    public obsList: Position[];

    constructor(type: string, obsList: Position[]) {
        this.type = type;
        this.obsList = obsList;
    }

    getType(): string {
        return this.type;
    }

    getObstacles(): Position[] {
        return this.obsList;
    }
}
