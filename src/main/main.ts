import "reflect-metadata";
import WebSocket = require('ws');
import { container } from "tsyringe";
import { ModifyPositionService } from "./Domain/out/ModifyPositionService";
import { ModifyPathRequestService } from "./Domain/out/ModifyPathRequestService";
import { LoadPathService } from "./Domain/out/LoadPathService";
import { ModifySpeedService } from "./Domain/out/ModifySpeedService";
import { ModifyErrorService } from "./Domain/out/ModifyErrorService";
import { ModifyStatusService } from "./Domain/out/ModifyStatusService";
import { CheckObstaclesService } from "./Domain/out/CheckObstaclesService";
import { CheckUnitChangedSpeedService } from "./Domain/out/CheckUnitChangedSpeedService";
import { CheckUnitErrorService } from "./Domain/out/CheckUnitErrorService";
import { CheckUnitHasMovedService } from "./Domain/out/CheckUnitHasMovedService";
import { CheckUnitRequestPathService } from "./Domain/out/CheckUnitRequestPathService";
import { UnitChangedStatusService } from "./Domain/out/UnitChangedStatusService";
import { ModifyPathService } from "./Domain/out/ModifyPathService";
import { InputSensorService } from "./Domain/out/InputSensorService";
import { ModifyDetectedObstaclesService } from "./Domain/out/ModifyDetectedObstaclesService";
import { LoadDetectedObstaclesService } from "./Domain/out/LoadDetectedObstaclesService";
import { UnitDataAdapter } from "./Persistence/out/UnitDataAdapter"; 
import { UnitEngine } from "./UnitEngine/UnitEngine";
import { ServerMessageController } from "./Controllers/ServerMessageController";
import {SensorMessageController} from "./Controllers/SensorMessageController";



// DI for UseCase Classes
container.register("CheckObstaclesUseCase", { useClass: CheckObstaclesService });
container.register("CheckUnitChangedSpeedUseCase", { useClass: CheckUnitChangedSpeedService });
container.register("CheckUnitErrorUseCase", { useClass: CheckUnitErrorService });
container.register("CheckUnitHasMovedUseCase", { useClass: CheckUnitHasMovedService });
container.register("CheckUnitRequestPathUseCase", { useClass: CheckUnitRequestPathService });
container.register("UnitChangedStatusUseCase", { useClass: UnitChangedStatusService });
container.register("ModifyPathUseCase", { useClass: ModifyPathService });
container.register("InputSensorUseCase", { useClass: InputSensorService });
container.register("ModifyPositionUseCase", { useClass: ModifyPositionService });
container.register("ModifyPathRequestUseCase", { useClass: ModifyPathRequestService });
container.register("LoadPathUseCase", { useClass: LoadPathService });
container.register("ModifySpeedUseCase", { useClass: ModifySpeedService });
container.register("ModifyErrorUseCase", { useClass: ModifyErrorService });
container.register("ModifyStatusUseCase", { useClass: ModifyStatusService });
container.register("LoadDetectedObstaclesUseCase", { useClass: LoadDetectedObstaclesService });
container.register("ModifyDetectedObstaclesUseCase", { useClass: ModifyDetectedObstaclesService });

// DI for Outbound Classes
container.register("CheckErrorOutbound", { useClass: UnitDataAdapter });
container.register("InputSensorsOutbound", { useClass: UnitDataAdapter });
container.register("LoadPathOutbound", { useClass: UnitDataAdapter });
container.register("ModifyErrorOutbound", { useClass: UnitDataAdapter });
container.register("ModifyPathOutbound", { useClass: UnitDataAdapter });
container.register("ModifyPathRequestOutbound", { useClass: UnitDataAdapter });
container.register("ModifyPositionOutbound", { useClass: UnitDataAdapter });
container.register("ModifySpeedOutbound", { useClass: UnitDataAdapter });
container.register("ModifyStatusOutbound", { useClass: UnitDataAdapter });
container.register("ObstaclesOutbound", { useClass: UnitDataAdapter });
container.register("UnitChangedSpeedOutbound", { useClass: UnitDataAdapter });
container.register("UnitChangedStatusOutbound", { useClass: UnitDataAdapter });
container.register("UnitHasMovedOutbound", { useClass: UnitDataAdapter });
container.register("UnitPathRequestOutbound", { useClass: UnitDataAdapter });
container.register("LoadDetectedObstaclesOutbound", { useClass: UnitDataAdapter });
container.register("ModifyDetectedObstaclesOutbound", { useClass: UnitDataAdapter });

let id: any = process.env.UNIT_ID;

let urlServer: any = 'ws://server:8080/unit/' + id;
let urlSensors: any = 'ws://sensors:8082';

let wsServer: WebSocket = new WebSocket(urlServer);
let wsSensors: WebSocket = new WebSocket(urlSensors);

container.register("WebSocketServer", { useValue: wsServer });
container.register("WebSocketSensors", { useValue: wsSensors });

const clientUnitEngine = container.resolve(UnitEngine);

container.register("UnitEngine", { useValue: clientUnitEngine });

const clientSensorsController = container.resolve(SensorMessageController);
const clientServerController = container.resolve(ServerMessageController);


wait();

clientServerController.checkWebSocketStateBeforeRunning();

async function wait(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 5000));
}
