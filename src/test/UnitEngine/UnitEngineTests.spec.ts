/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */

import "reflect-metadata";
import { expect } from 'chai';
import { mock, when, instance, verify, spy } from 'ts-mockito';
import { container, inject, injectable } from "tsyringe";
import { UnitEngine } from "../../main/UnitEngine/UnitEngine";
import { UnitStatus } from "../../main/UnitStatus";
import { ModifyPositionService } from "../../main/Domain/out/ModifyPositionService";
import { ModifyPathRequestService } from "../../main/Domain/out/ModifyPathRequestService";
import { LoadPathService } from "../../main/Domain/out/LoadPathService";
import { ModifySpeedService } from "../../main/Domain/out/ModifySpeedService";
import { ModifyErrorService } from "../../main/Domain/out/ModifyErrorService";
import { ModifyStatusService } from "../../main/Domain/out/ModifyStatusService";
import { UnitDataAdapter } from "../../main/Persistence/out/UnitDataAdapter"; 
import { Position } from "../../main/Position";

let unitDataAdapterMock: UnitDataAdapter = mock(UnitDataAdapter);
let unitDataAdapterMockInstance = instance(unitDataAdapterMock);

let array: Position[] = [ new Position(0, 0) ];
let pos: Position = new Position(0, 0);

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

let modifyPositionService: ModifyPositionService = container.resolve(ModifyPositionService);
let modifyPathRequestService: ModifyPathRequestService = container.resolve(ModifyPathRequestService);
let loadPathService: LoadPathService = container.resolve(LoadPathService);
let modifySpeedService: ModifySpeedService = container.resolve(ModifySpeedService);
let modifyErrorService: ModifyErrorService = container.resolve(ModifyErrorService);
let modifyStatusService: ModifyStatusService =  container.resolve(ModifyStatusService);

let modifyPositionServiceMock: ModifyPositionService = spy(modifyPositionService);
let modifyPathRequestServiceMock: ModifyPathRequestService = spy(modifyPathRequestService);
let loadPathServiceMock: LoadPathService = spy(loadPathService);
let modifySpeedServiceMock: ModifySpeedService = spy(modifySpeedService);
let modifyErrorServiceMock: ModifyErrorService = spy(modifyErrorService);
let modifyStatusServiceMock: ModifyStatusService = spy(modifyStatusService);

when(loadPathServiceMock.loadPath()).thenResolve(array);
when(modifyPositionServiceMock.modifyPosition(pos)).thenReturn();
when(modifySpeedServiceMock.modifySpeed(2500)).thenReturn();
when(modifyPathRequestServiceMock.receivedNewPathRequest(false)).thenReturn();
when(modifyErrorServiceMock.modifyError(0)).thenReturn();
when(modifyStatusServiceMock.modifyStatus(UnitStatus.START)).thenReturn();

container.register("ModifyPositionUseCase", { useValue: modifyPositionService });
container.register("ModifyPathRequestUseCase", { useValue: modifyPathRequestService });
container.register("LoadPathUseCase", { useValue: loadPathService });
container.register("ModifySpeedUseCase", { useValue: modifySpeedService });
container.register("ModifyErrorUseCase", { useValue: modifyErrorService });
container.register("ModifyStatusUseCase", { useValue: modifyStatusService });

let unitEngine = container.resolve(UnitEngine);

describe("Tests for UnitEngine", () => {
    
    before(async function() {
        this.timeout(10000);
        unitEngine.begin();
        await new Promise(resolve => setTimeout(resolve, 5000));
        unitEngine.stop();
    })

    it("Testing setSpeed", () => {
        verify(modifySpeedServiceMock.modifySpeed(0)).times(0);
    });
    
    it("Testing setError", () => {
        verify(modifyErrorServiceMock.modifyError(0)).times(0);
    });

    it("Testing setPosition", () => {
        verify(modifyPositionServiceMock.modifyPosition(pos)).times(0);
    });

    it("Testing setStatus", () => {
        verify(modifyStatusServiceMock.modifyStatus(UnitStatus.SHUTDOWN)).times(0);
    });

    it("Testing setPathRequest", () => {
        verify(modifyPathRequestServiceMock.receivedNewPathRequest(false)).called();
    });

    it("Testing loadPath", () => {
        verify(loadPathServiceMock.loadPath()).called();
    });

});
