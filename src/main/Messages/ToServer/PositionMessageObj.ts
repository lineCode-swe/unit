import {Position} from "../../Position";

class PositionMessageObj {
    public type: string;
    public position: Position;

    constructor(type: string, position: Position) {
        this.type = type;
        this.position = position;
    }

    getType(): string {
        return this.type;
    }

    getPosition(): Position {
        return this.position;
    }
}
