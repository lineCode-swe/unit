import {Position} from "./Position";
import {UnitStatus} from "./UnitStatus";

const {MongoClient} = require('mongodb');

async function setupDB(): Promise<void> {
    let array: Position[] = [new Position(-1, -1)];
    let pos: Position = new Position(0, 0);
    await pathToMongo(array);
    await obstaclesToMongo(array);
    await positionToMongo(pos);
    await statusToMongo(UnitStatus.SHUTDOWN);
    await errorToMongo(0);
    await speedToMongo(0);
    await pathRequestToMongo(false);
}

async function pathToMongo(path: Position[]): Promise<void> {
    let url = "mongodb://localhost:27017/mydb";
    var client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
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

async function obstaclesToMongo(obstacles: Position[]): Promise<void> {
    let url = "mongodb://localhost:27017/mydb";
    var client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
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

async function positionToMongo(position: Position): Promise<void> {
    let url = "mongodb://localhost:27017/mydb";
    var client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const collection = client.db('Unit').collection('position');

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

async function statusToMongo(status: UnitStatus): Promise<void> {
    let url = "mongodb://localhost:27017/mydb";
    var client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
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

async function errorToMongo(error: number): Promise<void> {
    let url = "mongodb://localhost:27017/mydb";
    var client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
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

async function speedToMongo(speed: number): Promise<void> {
    let url = "mongodb://localhost:27017/mydb";
    var client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
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

async function pathRequestToMongo(pathRequest: boolean): Promise<void> {
    let url = "mongodb://localhost:27017/mydb";
    var client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
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

setupDB();