import { Position } from "./Position";
import {throws} from "assert";

const {MongoClient} = require('mongodb');

export class UnitDataAdapter {
    constructor() {};

    async pathToMongo(path: Position[]): Promise<void> {
        let client: any;
        try {
            const url = "mongodb://localhost:27017/mydb";
            client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
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
        let client: any;
        try {
            const url = "mongodb://localhost:27017/mydb";
            client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
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
            await client.close();
        }
    }

    async obstaclesToMongo(obstacles: Position[]): Promise<void> {
        let client: any;
        try {
            const url = "mongodb://localhost:27017/mydb";
            client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();
            const collection = client.db('Unit').collection('obstacles');

            await collection.deleteMany({});

            const options = { ordered: true };
            await collection.insertMany(obstacles, options);
        }
        catch (e) {
            throw(e);
        }
        finally {
            await client.close();
        }
    }

    async loadObstacles(): Promise<Position[]> {
        let client: any;
        try {
            const url = "mongodb://localhost:27017/mydb";
            client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();
            const collection = client.db('Unit').collection('obstacles');

            const projection = { _id: 0, x: 1 , y:1};
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

    async positionToMongo(position: Position): Promise<void> {
        let client: any;
        try {
            const url = "mongodb://localhost:27017/mydb";
            client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();
            const collection = client.db('Unit').collection('details');

            const query = { position: Position };
            const update = { $set: { 'position': position }};
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

    async loadPosition(): Promise<Position> {
        let client: any;
        try {
            const url = "mongodb://localhost:27017/mydb";
            client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();
            const collection = client.db('Unit').collection('details');

            const projection = { _id: 0, x: 1 , y:1};
            const cursor = collection.find().project(projection);
            const results = await cursor.toArray();

            return results[0] as Position;
        }
        catch (e) {
            throw(e);
        }
        finally {
            await client.close();
        }
    }

    async statusToMongo(status: string): Promise<void> {
        let client: any;
        try {
            const url = "mongodb://localhost:27017/mydb";
            client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();
            const collection = client.db('Unit').collection('details');

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

    async loadStatus(): Promise<string> {
        let client: any;
        try {
            const url = "mongodb://localhost:27017/mydb";
            client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();
            const collection = client.db('Unit').collection('details');

            const projection = { _id: 0, status:1};
            const cursor = collection.find().project(projection);
            const results = await cursor.toArray();

            return results[0] as string;
        }
        catch (e) {
            throw(e);
        }
        finally {
            await client.close();
        }
    }

    async errorToMongo(error: string): Promise<void> {
        let client: any;
        try {
            const url = "mongodb://localhost:27017/mydb";
            client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();
            const collection = client.db('Unit').collection('details');

            const query = { error: String };
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

    async loadError(): Promise<string> {
        let client: any;
        try {
            const url = "mongodb://localhost:27017/mydb";
            client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();
            const collection = client.db('Unit').collection('details');

            const projection = { _id: 0, error:1};
            const cursor = collection.find().project(projection);
            const results = await cursor.toArray();

            return results[0] as string;
        }
        catch (e) {
            throw(e);
        }
        finally {
            await client.close();
        }
    }

    async speedToMongo(speed: number): Promise<void> {
        let client: any;
        try {
            const url = "mongodb://localhost:27017/mydb";
            client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();
            const collection = client.db('Unit').collection('details');

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
        let client: any;
        try {
            const url = "mongodb://localhost:27017/mydb";
            client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();
            const collection = client.db('Unit').collection('details');

            const projection = { _id: 0, speed:1};
            const cursor = collection.find().project(projection);
            const results = await cursor.toArray();

            return results[0] as number;
        }
        catch (e) {
            throw(e);
        }
        finally {
            await client.close();
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
        let client: any;
        try {
            const url = "mongodb://localhost:27017/mydb";
            client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();
            const collection = client.db('Unit').collection('details');

            const projection = { _id: 0, pathRequest:1};
            const cursor = collection.find().project(projection);
            const results = await cursor.toArray();

            return results[0] as boolean;
        }
        catch (e) {
            throw(e);
        }
        finally {
            await client.close();
        }
    }
}








