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
