/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */

import {UnitStatus} from "../../UnitStatus";

class CommandReceiveMessageObj {
    public type: string;
    public command: UnitStatus;

    constructor(type: string, command: UnitStatus) {
        this.type = type;
        this.command = command;
    }

    getType(): string {
        return this.type;
    }

    getCommand(): UnitStatus {
        return this.command;
    }
}
