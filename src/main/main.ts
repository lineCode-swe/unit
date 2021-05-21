import "reflect-metadata";
import { container } from "tsyringe";
import { ModifyPositionService } from "./Domain/out/ModifyPositionService";
import { ModifyPathRequestService } from "./Domain/out/ModifyPathRequestService";
import { LoadPathService } from "./Domain/out/LoadPathService";
import { ModifySpeedService } from "./Domain/out/ModifySpeedService";
import { ModifyErrorService } from "./Domain/out/ModifyErrorService";
import { ModifyStatusService } from "./Domain/out/ModifyStatusService";
import { UnitDataAdapter } from "./Persistence/out/UnitDataAdapter";
import { UnitEngine } from "./UnitEngine/UnitEngine"; 

// DI for UseCase Classes
container.register("ModifyPositionUseCase", { useClass: ModifyPositionService });
container.register("ModifyPathRequestUseCase", { useClass: ModifyPathRequestService });
container.register("LoadPathUseCase", { useClass: LoadPathService });
container.register("ModifySpeedUseCase", { useClass: ModifySpeedService });
container.register("ModifyErrorUseCase", { useClass: ModifyErrorService });
container.register("ModifyStatusUseCase", { useClass: ModifyStatusService });

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
container.register("UnitChangedOutbound", { useClass: UnitDataAdapter });
container.register("UnitChangedStatusOutbound", { useClass: UnitDataAdapter });
container.register("UnitHasMovedOutbound", { useClass: UnitDataAdapter });
container.register("UnitPathRequestOutbound", { useClass: UnitDataAdapter });


const clientUnitEngine = container.resolve(UnitEngine);

clientUnitEngine.begin();

//clientUnitEngine.printHello()
