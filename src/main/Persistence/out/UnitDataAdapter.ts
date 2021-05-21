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
import {UnitStatus} from "../../UnitStatus";

const {MongoClient} = require('mongodb');

export class UnitDataAdapter implements ModifyPathOutbound, LoadPathOutbound, InputSensorsOutbound, 
                                        ObstaclesOutbound, ModifyPositionOutbound, UnitHasMovedOutbound,
                                        ModifyStatusOutbound, UnitChangedStatusOutbound, ModifyPathRequestOutbound, 
                                        UnitPathRequestOutbound, ModifySpeedOutbound, UnitChangedSpeedOutbound,
                                        ModifyErrorOutbound, CheckErrorOutbound {
   
    private client: any;
    private readonly url: string;

    constructor() {
        this.url = "mongodb://localhost:27017/mydb";
        this.client = new MongoClient(this.url, { useNewUrlParser: true, useUnifiedTopology: true });
    };

    async pathToMongo(path: Position[]): Promise<void> {
        try {
            await this.client.connect();
            const collection = this.client.db('Unit').collection('path');

            await collection.deleteMany({});
            const options = { ordered: true };
            await collection.insertMany(path, options);
        }
        catch (e) {
            throw(e);
        }
        finally {
            await this.client.close();
        }
    }

    async loadPath(): Promise<Position[]> {
        try {
            let url = "mongodb://localhost:27017/mydb";
            let client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

            await client.connect();
            const collection = client.db('Unit').collection('path');

            const projection = { _id: 0, x: 1 , y:1};
            const cursor = collection.find().project(projection);
            const results = await cursor.toArray();

            return results as Position[];
        }
        catch (e) {
            throw(e);
        }
        finally {
            await this.client.close();
        }
    }

    async obstaclesToMongo(obstacles: Position[]): Promise<void> {
        try {
            await this.client.connect();
            const collection = this.client.db('Unit').collection('obstacles');

            await collection.deleteMany({});

            const options = { ordered: true };
            await collection.insertMany(obstacles, options);
        }
        catch (e) {
            throw(e);
        }
        finally {
            await this.client.close();
        }
    }

    async loadObstacles(): Promise<Position[]> {
        try {
            await this.client.connect();
            const collection = this.client.db('Unit').collection('obstacles');

            const projection = { _id: 0, x: 1 , y:1};
            const cursor = collection.find().project(projection);
            const results = await cursor.toArray();

            return results as Position[];
        }
        catch (e) {
            throw(e);
        }
        finally {
            await this.client.close();
        }
    }

    async positionToMongo(position: Position): Promise<void> {
        try {
            await this.client.connect();
            const collection = this.client.db('Unit').collection('details');

            const query = { position: Position };
            const update = { $set: { 'position': position }};
            const options = { upsert: true };

            await collection.updateOne(query, update, options);
        }
        catch (e) {
            throw(e);
        }
        finally {
            await this.client.close();
        }
    }

    async loadPosition(): Promise<Position> {
        try {
            await this.client.connect();
            const collection = this.client.db('Unit').collection('details');

            const projection = { _id: 0, x: 1 , y:1};
            const cursor = collection.find().project(projection);
            const results = await cursor.toArray();

            return results[0] as Position;
        }
        catch (e) {
            throw(e);
        }
        finally {
            await this.client.close();
        }
    }

    async statusToMongo(status: UnitStatus): Promise<void> {
        try {
            await this.client.connect();
            const collection = this.client.db('Unit').collection('details');

            const query = { status: UnitStatus };
            const update = { $set: { 'status': status }};
            const options = { upsert: true };

            await collection.updateOne(query, update, options);
        }
        catch (e) {
            throw(e);
        }
        finally {
            await this.client.close();
        }
    }

    async loadStatus(): Promise<UnitStatus> {
        try {
            await this.client.connect();
            const collection = this.client.db('Unit').collection('details');

            const projection = { _id: 0, status:1};
            const cursor = collection.find().project(projection);
            const results = await cursor.toArray();

            return results[0] as UnitStatus;
        }
        catch (e) {
            throw(e);
        }
        finally {
            await this.client.close();
        }
    }

    async errorToMongo(error: number): Promise<void> {
        try {
            await this.client.connect();
            const collection = this.client.db('Unit').collection('details');

            const query = { error: Number };
            const update = { $set: { 'error': error }};
            const options = { upsert: true };

            await collection.updateOne(query, update, options);
        }
        catch (e) {
            throw(e);
        }
        finally {
            await this.client.close();
        }
    }

    async loadError(): Promise<number> {
        try {
            await this.client.connect();
            const collection = this.client.db('Unit').collection('details');

            const projection = { _id: 0, error:1};
            const cursor = collection.find().project(projection);
            const results = await cursor.toArray();

            return results[0] as number;
        }
        catch (e) {
            throw(e);
        }
        finally {
            await this.client.close();
        }
    }

    async speedToMongo(speed: number): Promise<void> {
        try {
            await this.client.connect();
            const collection = this.client.db('Unit').collection('details');

            const query = { speed: Number };
            const update = { $set: { 'speed': speed }};
            const options = { upsert: true };

            await collection.updateOne(query, update, options);
        }
        catch (e) {
            throw(e);
        }
        finally {
            await this.client.close();
        }
    }

    async loadSpeed(): Promise<number> {

        try {
            await this.client.connect();
            const collection = this.client.db('Unit').collection('details');

            const projection = { _id: 0, speed:1};
            const cursor = collection.find().project(projection);
            const results = await cursor.toArray();

            return results[0] as number;
        }
        catch (e) {
            throw(e);
        }
        finally {
            await this.client.close();
        }
    }

    async pathRequestToMongo(pathRequest: boolean): Promise<void> {
        let client: any;
        try {
            const url = "mongodb://localhost:27017/mydb";
            client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();
            const collection = client.db('Unit').collection('details');

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
        try {
            await this.client.connect();
            const collection = this.client.db('Unit').collection('details');

            const projection = { _id: 0, pathRequest:1 };
            const cursor = collection.find().project(projection);
            const results = await cursor.toArray();

            return results[0] as boolean;
        }
        catch (e) {
            throw(e);
        }
        finally {
            await this.client.close();
        }
    }
}








