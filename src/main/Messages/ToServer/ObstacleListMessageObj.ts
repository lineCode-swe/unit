import {Position} from "../../Position";

class ObstacleListMessageObj {
    public type: string;
    public obsList: Position[];

    constructor(type: string, obsList: Position[]) {
        this.type = type;
        this.obsList = obsList;
    }

    getType(): string {
        return this.type;
    }

    getObstacles(): Position[] {
        return this.obsList;
    }
}
