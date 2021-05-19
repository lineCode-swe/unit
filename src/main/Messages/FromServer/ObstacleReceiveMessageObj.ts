import {Position} from "../../Position";

class ObstacleReceiveMessageObj {
    public type: string;
    public obstacle: Position;

    constructor(type: string, obstacle: Position) {
        this.type = type;
        this.obstacle = obstacle;
    }

    getType(): string {
        return this.type;
    }

    getObstacle(): Position {
        return this.obstacle;
    }
}
