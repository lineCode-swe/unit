/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */

import {Position} from "../../Position";

class StartReceiveMessageObj {
    public type: string;
    public path: Position[];

    constructor(type: string, path: Position[]) {
        this.type = type;
        this.path = path;
    }

    getType(): string {
        return this.type;
    }

    getPath(): Position[] {
        return this.path;
    }
}
