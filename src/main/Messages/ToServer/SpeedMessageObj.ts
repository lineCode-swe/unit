/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */

class SpeedMessageObj {
    public type: string;
    public speed: number;

    constructor(type: string, speed: number) {
        this.type = type;
        this.speed = speed;
    }

    getType(): string {
        return this.type;
    }

    getSpeed(): number {
        return this.speed;
    }
}
