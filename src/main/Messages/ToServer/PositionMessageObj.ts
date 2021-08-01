/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */

import {Position} from "../../Position";

class PositionMessageObj {
    public type: string;
    public position: Position;

    constructor(type: string, position: Position) {
        this.type = type;
        this.position = position;
    }

    getType(): string {
        return this.type;
    }

    getPosition(): Position {
        return this.position;
    }
}
