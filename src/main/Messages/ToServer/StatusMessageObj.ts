/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */

import {UnitStatus} from "../../UnitStatus";

class StatusMessageObj {
    public type: string;
    public status: UnitStatus;

    constructor(type: string, status: UnitStatus) {
        this.type = type;
        this.status = status;
    }

    getType(): string {
        return this.type;
    }

    getStatus(): UnitStatus {
        return this.status;
    }
}
