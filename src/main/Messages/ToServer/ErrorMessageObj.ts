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
