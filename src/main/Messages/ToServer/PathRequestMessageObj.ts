/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */

class PathRequestMessageObj {
    public type: string;
    public pathRequest: boolean;

    constructor(type: string, pathRequest: boolean) {
        this.type = type;
        this.pathRequest = pathRequest;
    }

    getType(): string {
        return this.type;
    }

    getPathRequest(): boolean {
        return this.pathRequest;
    }
}
