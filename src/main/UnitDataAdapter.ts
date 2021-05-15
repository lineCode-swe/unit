import { Position } from "./Position";

const {MongoClient} = require('mongodb');

// AGGIUNGERE EXPORT???

async function pathToMongo(path: Position[]) {
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
        console.error(e);
    }
    finally {
        await client.close();
    }
}

async function loadPath(): Promise<Position[]> {
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
        console.error(e);
    }
    finally {
        await client.close();
    }
}

async function obstaclesToMongo(obstacles: Position[]) {
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
        console.error(e);
    }
    finally {
        await client.close();
    }
}

async function loadObstacles(): Promise<Position[]> {
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
        console.error(e);
    }
    finally {
        await client.close();
    }
}
