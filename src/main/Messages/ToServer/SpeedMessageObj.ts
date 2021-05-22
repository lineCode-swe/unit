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
