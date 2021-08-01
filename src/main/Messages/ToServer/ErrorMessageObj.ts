/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */

class ErrorMessageObj {
    public type: string;
    public error: number;

    constructor(type: string, error: number) {
        this.type = type;
        this.error = error;
    }

    getType(): string {
        return this.type;
    }

    getError(): number {
        return this.error;
    }
}
