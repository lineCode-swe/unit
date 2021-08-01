/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */

class KeepAliveMessageObj {
    public type: string;
    public keepAlive: string;

    constructor(type: string, keepAlive: string) {
        this.type = type;
        this.keepAlive = keepAlive;
    }

    getType(): string {
        return this.type;
    }

    getKeepAlive(): string {
        return this.keepAlive;
    }
}
