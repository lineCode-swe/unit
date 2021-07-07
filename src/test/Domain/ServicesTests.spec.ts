import "reflect-metadata";
import { mock, when, instance, verify } from "ts-mockito";
import { container } from "tsyringe";
import { ModifyPositionService } from "../../main/Domain/out/ModifyPositionService";
import { ModifyPathRequestService } from "../../main/Domain/out/ModifyPathRequestService";
import { LoadPathService } from "../../main/Domain/out/LoadPathService";
import { ModifySpeedService } from "../../main/Domain/out/ModifySpeedService";
import { ModifyErrorService } from "../../main/Domain/out/ModifyErrorService";
import { ModifyStatusService } from "../../main/Domain/out/ModifyStatusService";
import { CheckObstaclesService } from "../../main/Domain/out/CheckObstaclesService";
import { CheckUnitChangedSpeedService } from "../../main/Domain/out/CheckUnitChangedSpeedService";
import { CheckUnitErrorService } from "../../main/Domain/out/CheckUnitErrorService";
import { CheckUnitHasMovedService } from "../../main/Domain/out/CheckUnitHasMovedService";
import { CheckUnitRequestPathService } from "../../main/Domain/out/CheckUnitRequestPathService";
import { UnitChangedStatusService } from "../../main/Domain/out/UnitChangedStatusService";
import { ModifyPathService } from "../../main/Domain/out/ModifyPathService";
import { InputSensorService } from "../../main/Domain/out/InputSensorService";
import { UnitDataAdapter } from "../../main/Persistence/out/UnitDataAdapter";
import { Position } from "../../main/Position";
import { UnitStatus } from "../../main/UnitStatus";
import { expect } from "chai";

let unitDataAdapterMock: UnitDataAdapter = mock(UnitDataAdapter);
let unitDataAdapterMockInstance = instance(unitDataAdapterMock);

let array: Position[] = [ new Position(0, 0) ];
let pos: Position = new Position(0, 0);

when(unitDataAdapterMock.obstaclesToMongo(array)).thenResolve();
when(unitDataAdapterMock.errorToMongo(0)).thenResolve();
when(unitDataAdapterMock.pathToMongo(array)).thenResolve();
when(unitDataAdapterMock.pathRequestToMongo(false)).thenResolve();
when(unitDataAdapterMock.positionToMongo(pos)).thenResolve();
when(unitDataAdapterMock.speedToMongo(0)).thenResolve();
when(unitDataAdapterMock.statusToMongo(UnitStatus.SHUTDOWN)).thenResolve();
when(unitDataAdapterMock.loadError).thenReturn(() => Promise.resolve(0));
when(unitDataAdapterMock.loadPath).thenReturn(() => Promise.resolve(array));
when(unitDataAdapterMock.loadObstacles).thenReturn(() => Promise.resolve(array));
when(unitDataAdapterMock.loadSpeed).thenReturn(() => Promise.resolve(0));
when(unitDataAdapterMock.loadStatus).thenReturn(() => Promise.resolve(UnitStatus.SHUTDOWN));
when(unitDataAdapterMock.loadPosition).thenReturn(() => Promise.resolve(pos));
when(unitDataAdapterMock.loadPathRequest).thenReturn(() => Promise.resolve(true));

container.register("CheckErrorOutbound", { useValue: unitDataAdapterMockInstance });
container.register("InputSensorsOutbound", { useValue: unitDataAdapterMockInstance });
container.register("LoadPathOutbound", { useValue: unitDataAdapterMockInstance });
container.register("ModifyErrorOutbound", { useValue: unitDataAdapterMockInstance });
container.register("ModifyPathOutbound", { useValue: unitDataAdapterMockInstance });
container.register("ModifyPathRequestOutbound", { useValue: unitDataAdapterMockInstance });
container.register("ModifyPositionOutbound", { useValue: unitDataAdapterMockInstance });
container.register("ModifySpeedOutbound", { useValue: unitDataAdapterMockInstance });
container.register("ModifyStatusOutbound", { useValue: unitDataAdapterMockInstance });
container.register("ObstaclesOutbound", { useValue: unitDataAdapterMockInstance });
container.register("UnitChangedSpeedOutbound", { useValue: unitDataAdapterMockInstance });
container.register("UnitChangedStatusOutbound", { useValue: unitDataAdapterMockInstance });
container.register("UnitHasMovedOutbound", { useValue: unitDataAdapterMockInstance });
container.register("UnitPathRequestOutbound", { useValue: unitDataAdapterMockInstance });

let checkErrorService: CheckUnitErrorService = container.resolve(CheckUnitErrorService);
let loadPathService: LoadPathService = container.resolve(LoadPathService);
let checkUnitChangedStatus: UnitChangedStatusService = container.resolve(UnitChangedStatusService);
let checkObstaclesService: CheckObstaclesService = container.resolve(CheckObstaclesService);
let checkUnitChangedSpeedService: CheckUnitChangedSpeedService = container.resolve(CheckUnitChangedSpeedService);
let checkUnitHasMovedService: CheckUnitHasMovedService = container.resolve(CheckUnitHasMovedService);
let checkUnitRequestPathService: CheckUnitRequestPathService = container.resolve(CheckUnitRequestPathService);
let modifyPathService: ModifyPathService = container.resolve(ModifyPathService);
let modifyErrorService: ModifyErrorService = container.resolve(ModifyErrorService);
let inputSensorService: InputSensorService = container.resolve(InputSensorService);
let modifyPositionService: ModifyPositionService = container.resolve(ModifyPositionService);
let modifyStatusService: ModifyStatusService = container.resolve(ModifyStatusService);
let modifySpeedService: ModifySpeedService = container.resolve(ModifySpeedService);
let modifyPathRequestService: ModifyPathRequestService = container.resolve(ModifyPathRequestService);

let curr_path: Position[];
let curr_obs: Position[];
let curr_pos: Position;
let curr_status: UnitStatus;
let curr_error: number;
let curr_speed: number;
let curr_path_request: boolean;

async function setupDataForTests(): Promise<void> {
    curr_path = await loadPathService.loadPath();
    curr_obs = await checkObstaclesService.checkObstacles();
    curr_pos = await checkUnitHasMovedService.checkIfUnitHasMoved();
    curr_status = await checkUnitChangedStatus.checkIfUnitChangedStatus();
    curr_error = await checkErrorService.checkIfUnitError();
    curr_speed = await checkUnitChangedSpeedService.checkIfUnitChangedSpeed();
    curr_path_request = await checkUnitRequestPathService.checkIfUnitRequestPath(); 
}

describe("Tests for Services", () => {

    before(async function() {
        await setupDataForTests();
    });

    it("Testing LoadPathService", () => {
        expect(curr_path).to.equal(array);
    });

    it("Testing CheckObstaclesService", () => {
        expect(curr_obs).to.equal(array);
    });

    it("Testing CheckUnitHasMovedService", () => {
        expect(curr_pos).to.equal(pos);
    });

    it("Testing CheckUnitChangedStatus", () => {
        expect(curr_status).to.equal(UnitStatus.SHUTDOWN);
    });

    it("Testing CheckErrorService", () => {
        expect(curr_error).to.equal(0);
    });

    it("Testing CheckUnitChangedSpeedService", () => {
        expect(curr_speed).to.equal(0);
    });

    it("Testing CheckUnitRequestPathService", () => {
        expect(curr_path_request).to.equal(true);
    });

    it("Testing ModifyPathService", () => {
        modifyPathService.receivedNewPath(array);
        verify(unitDataAdapterMock.pathToMongo(array)).called();
    });

    it("Testing InputSensorsService", () => {
        inputSensorService.receivedObstacle(array);
        verify(unitDataAdapterMock.obstaclesToMongo(array)).called();
    });

    it("Testing ModifyPositionService", () => {
        modifyPositionService.modifyPosition(pos);
        verify(unitDataAdapterMock.positionToMongo(pos)).called();
    });

    it("Testing ModifyStatusService", () => {
        modifyStatusService.modifyStatus(UnitStatus.SHUTDOWN);
        verify(unitDataAdapterMock.statusToMongo(UnitStatus.SHUTDOWN)).called();
    });

    it("Testing ModifyErrorOutbound", () => {
        modifyErrorService.modifyError(0);
        verify(unitDataAdapterMock.errorToMongo(0)).called();
    });

    it("Testing ModifySpeedService", () => {
        modifySpeedService.modifySpeed(0);
        verify(unitDataAdapterMock.speedToMongo(0)).called();
    });
    
    it("Testing ModifyPathRequestService", () => {
        modifyPathRequestService.receivedNewPathRequest(false);
        verify(unitDataAdapterMock.pathRequestToMongo(false)).called();
    });
});

