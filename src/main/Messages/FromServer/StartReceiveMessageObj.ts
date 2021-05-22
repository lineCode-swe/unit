import {Position} from "../../Position";

class StartReceiveMessageObj {
    public type: string;
    public path: Position[];

    constructor(type: string, path: Position[]) {
        this.type = type;
        this.path = path;
    }

    getType(): string {
        return this.type;
    }

    getPath(): Position[] {
        return this.path;
    }
}
