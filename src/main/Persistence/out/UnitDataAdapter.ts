/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */

import { Position } from "../../Position";
import { ModifyPathOutbound } from "../in/ModifyPathOutbound";
import { LoadPathOutbound } from "../in/LoadPathOutbound";
import { InputSensorsOutbound } from "../in/InputSensorsOutbound";
import { ObstaclesOutbound } from "../in/ObstaclesOutbound";
import { ModifyPositionOutbound } from "../in/ModifyPositionOutbound";
import { UnitHasMovedOutbound } from "../in/UnitHasMovedOutbound";
import { ModifyStatusOutbound } from "../in/ModifyStatusOutbound";
import { UnitChangedStatusOutbound } from "../in/UnitChangedStatusOutbound";
import { ModifyPathRequestOutbound } from "../in/ModifyPathRequestOutbound";
import { UnitPathRequestOutbound } from "../in/UnitPathRequestOutbound";
import { ModifySpeedOutbound } from "../in/ModifySpeedOutbound";
import { UnitChangedSpeedOutbound } from "../in/UnitChangedSpeedOutbound";
import { ModifyErrorOutbound } from "../in/ModifyErrorOutbound";
import { CheckErrorOutbound } from "../in/CheckErrorOutbound";
import { ModifyDetectedObstaclesOutbound } from "../in/ModifyDetectedObstaclesOutbound";
import { LoadDetectedObstaclesOutbound } from "../in/LoadDetectedObstaclesOutbound";
import { UnitStatus } from "../../UnitStatus";
import { LoadReceivedStartOutbound } from "../in/LoadReceivedStartOutbound";
import { ModifyReceivedStartOutbound } from "../in/ModifyReceivedStartOutbound";

const {MongoClient} = require('mongodb');

export class UnitDataAdapter implements ModifyPathOutbound, LoadPathOutbound, InputSensorsOutbound, 
                                        ObstaclesOutbound, ModifyPositionOutbound, UnitHasMovedOutbound,
                                        ModifyStatusOutbound, UnitChangedStatusOutbound, ModifyPathRequestOutbound, 
                                        UnitPathRequestOutbound, ModifySpeedOutbound, UnitChangedSpeedOutbound,
                                        ModifyErrorOutbound, CheckErrorOutbound, ModifyDetectedObstaclesOutbound,
                                        LoadDetectedObstaclesOutbound, LoadReceivedStartOutbound, ModifyReceivedStartOutbound {

    constructor() {}

    async loadReceivedStart(): Promise<boolean> {
        let url = "mongodb://localhost:27017/";
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        try {
            await client.connect();
            const collection = client.db('Unit').collection('received_start');

            const projection = { _id: 0, received_start:1 };
            const cursor = collection.find().project(projection);
            const results = await cursor.toArray();

            if (results[0]) {
                return results[0].received_start;
            }
            else {
                return false;
            }
        }
        catch (e) {
            throw(e);
        }
        finally {
            await client.close();
        }
    }

    async receivedStartToMongo(received_start: boolean): Promise<void> {
        let url = "mongodb://localhost:27017/";
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        try {
            await client.connect();
            const collection = client.db('Unit').collection('received_start');

            const query = { pathRequest: Boolean };
            const update = { $set: { 'received_start': received_start }};
            const options = { upsert: true };

            await collection.updateOne(query, update, options);
        }
        catch (e) {
            throw(e);
        }
        finally {
            await client.close();
        }
    }

    async detectedObstaclesFromMongo(): Promise<Position[]> {
        let url = "mongodb://localhost:27017/";
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        try {
            await client.connect();
            const collection = client.db('Unit').collection('detected_obs');

            const projection = { _id: 0, x: 1 , y: 1 };
            const cursor = collection.find().project(projection);
            const results = await cursor.toArray();

            if(JSON.stringify(results[0]) == JSON.stringify(new Position(-1, -1))) {
                return [] as Position[];
            } else {
                return results as Position[];
            }
        }
        catch (e) {
            throw(e);
        }
        finally {
            await client.close();
        }
    }

    async detectedObstaclesToMongo(obstacles: Position[]): Promise<void> {
        let url = "mongodb://localhost:27017/";
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        try {
            await client.connect();
            const collection = client.db('Unit').collection('detected_obs');

            await collection.deleteMany({});
            const options = { ordered: true };
            if(JSON.stringify(obstacles) == JSON.stringify([])) {
                let new_obstacles: Position[] = [new Position(-1, -1)];
                await collection.insertMany(new_obstacles, options);
            } else {
                await collection.insertMany(obstacles, options);
            }
        }
        catch (e) {
            throw(e);
        }
        finally {
            await client.close();
        }
    }

    async pathToMongo(path: Position[]): Promise<void> {
        let url = "mongodb://localhost:27017/";
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        try {
            await client.connect();
            const collection = client.db('Unit').collection('path');

            await collection.deleteMany({});
            const options = { ordered: true };
            await collection.insertMany(path, options);
        }
        catch (e) {
            throw(e);
        }
        finally {
            await client.close();
        }
    }

    async loadPath(): Promise<Position[]> {
        let url = "mongodb://localhost:27017/";
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        try {
            await client.connect();
            const collection = client.db('Unit').collection('path');

            const projection = { _id: 0, x: 1 , y: 1 };
            const cursor = collection.find().project(projection);
            const results = await cursor.toArray();

            return results as Position[];
        }
        catch (e) {
            throw(e);
        }
        finally {
            await client.close();
        }
    }

    async obstaclesToMongo(obstacles: Position[]): Promise<void> {
        let url = "mongodb://localhost:27017/";
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        try {
            await client.connect();
            const collection = client.db('Unit').collection('obstacles');

            await collection.deleteMany({});

            const options = { ordered: true };
            if(JSON.stringify(obstacles) == JSON.stringify([])) {
                let new_obstacles: Position[] = [new Position(-1, -1)];
                await collection.insertMany(new_obstacles, options);
            } else {
                await collection.insertMany(obstacles, options);
            }
        }
        catch (e) {
            throw(e);
        }
        finally {
            await client.close();
        }
    }

    async loadObstacles(): Promise<Position[]> {
        let url = "mongodb://localhost:27017/";
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        try {
            await client.connect();
            const collection = client.db('Unit').collection('obstacles');

            const projection = { _id: 0, x: 1 , y: 1 };
            const cursor = collection.find().project(projection);
            const results = await cursor.toArray();

            if(JSON.stringify(results[0]) == JSON.stringify(new Position(-1, -1))) {
                return [] as Position[];
            } else {
                return results as Position[];
            }
        }
        catch (e) {
            throw(e);
        }
        finally {
            await client.close();
        }
    }

    async positionToMongo(position: Position): Promise<void> {
        let url = "mongodb://localhost:27017/";
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        try {
            await client.connect();
            const collection = client.db('Unit').collection('position');

            await collection.deleteMany({});
            var formatted_position = {
                "position": {
                    "x": position.x,
                    "y": position.y
                }
            }
            await collection.insertOne(formatted_position);
        }
        catch (e) {
            throw(e);
        }
        finally {
            await client.close();
        }
    }

    async loadPosition(): Promise<Position> {
        let url = "mongodb://localhost:27017/";
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        try {
            await client.connect();
            const collection = client.db('Unit').collection('position');
            
            const cursor = collection.find();
            const results = await cursor.toArray();

            if (results[0]) {
                return results[0].position as Position;
            }
            else {
                return new Position(-1, -1);
            }
        }
        catch (e) {
            throw(e);
        }
        finally {
            await client.close();
        }
    }

    async statusToMongo(status: UnitStatus): Promise<void> {
        let url = "mongodb://localhost:27017/";
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        try {
            await client.connect();
            const collection = client.db('Unit').collection('status');

            const query = { status: String };
            const update = { $set: { 'status': status }};
            const options = { upsert: true };

            await collection.updateOne(query, update, options);
        }
        catch (e) {
            throw(e);
        }
        finally {
            await client.close();
        }
    }

    async loadStatus(): Promise<UnitStatus> {
        let url = "mongodb://localhost:27017/";
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        try {
            await client.connect();
            const collection = client.db('Unit').collection('status');

            const projection = { _id: 0, status:1 };
            const cursor = collection.find().project(projection);
            const results = await cursor.toArray();

            if (results[0]) {
                return results[0].status;
            }
            else {
                return UnitStatus.DISCONNECTED;
            }
        }
        catch (e) {
            throw(e);
        }
        finally {
            await client.close();
        }
    }

    async errorToMongo(error: number): Promise<void> {
        let url = "mongodb://localhost:27017/";
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        try {
            await client.connect();
            const collection = client.db('Unit').collection('error');

            const query = { error: Number };
            const update = { $set: { 'error': error }};
            const options = { upsert: true };

            await collection.updateOne(query, update, options);
        }
        catch (e) {
            throw(e);
        }
        finally {
            await client.close();
        }
    }

    async loadError(): Promise<number> {
        let url = "mongodb://localhost:27017/";
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        try {
            await client.connect();
            const collection = client.db('Unit').collection('error');

            const projection = { _id: 0, error:1};
            const cursor = collection.find().project(projection);
            const results = await cursor.toArray();

            if (results[0]) {
                return results[0].error;
            }
            else {
                return 0;
            }
        }
        catch (e) {
            throw(e);
        }
        finally {
            await client.close();
        }
    }

    async speedToMongo(speed: number): Promise<void> {
        let url = "mongodb://localhost:27017/";
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        try {
            await client.connect();
            const collection = client.db('Unit').collection('speed');

            const query = { speed: Number };
            const update = { $set: { 'speed': speed }};
            const options = { upsert: true };

            await collection.updateOne(query, update, options);
        }
        catch (e) {
            throw(e);
        }
        finally {
            await client.close();
        }
    }

    async loadSpeed(): Promise<number> {
        let url = "mongodb://localhost:27017/";
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        try {
            await client.connect();
            const collection = client.db('Unit').collection('speed');

            const projection = { _id: 0, speed:1};
            const cursor = collection.find().project(projection);
            const results = await cursor.toArray();

            if (results[0]) {
                return results[0].speed;
            }
            else {
                return 0;
            }
        }
        catch (e) {
            throw(e);
        }
        finally {
            await client.close();
        }
    }

    async pathRequestToMongo(pathRequest: boolean): Promise<void> {
        let url = "mongodb://localhost:27017/";
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        try {
            await client.connect();
            const collection = client.db('Unit').collection('pathRequest');

            const query = { pathRequest: Boolean };
            const update = { $set: { 'pathRequest': pathRequest }};
            const options = { upsert: true };

            await collection.updateOne(query, update, options);
        }
        catch (e) {
            throw(e);
        }
        finally {
            await client.close();
        }
    }

    async loadPathRequest(): Promise<boolean> {
        let url = "mongodb://localhost:27017/";
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        try {
            await client.connect();
            const collection = client.db('Unit').collection('pathRequest');

            const projection = { _id: 0, pathRequest:1 };
            const cursor = collection.find().project(projection);
            const results = await cursor.toArray();

            if (results[0]) {
                return results[0].pathRequest;
            }
            else {
                return false;
            }
        }
        catch (e) {
            throw(e);
        }
        finally {
            await client.close();
        }
    }
}








