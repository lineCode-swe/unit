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
