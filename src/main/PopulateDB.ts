/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */

import {Position} from "./Position";
import {UnitStatus} from "./UnitStatus";

const {MongoClient} = require('mongodb');

let unit_base_x: any = process.env.UNIT_BASE_X;
let unit_base_y: any = process.env.UNIT_BASE_Y;
let val: any;

async function setupDB(ubx: any, uby: any): Promise<void> {
    let array: Position[] = [ new Position(0, 0) ];
    let pos: Position = new Position(ubx, uby);
    let empty_array: Position[] = [];
    await pathToMongo(array);
    await obstaclesToMongo(empty_array);
    await positionToMongo(pos);
    await statusToMongo(UnitStatus.BASE);
    await errorToMongo(0);
    await speedToMongo(2500);
    await pathRequestToMongo(false);
    await detectedObstaclesToMongo(empty_array);
    await receivedStartToMongo(false);
}

async function receivedStartToMongo(received_start: boolean): Promise<void> {
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

async function detectedObstaclesToMongo(obstacles: Position[]): Promise<void> {
    let url = "mongodb://localhost:27017/mydb";
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

setupDB(unit_base_x, unit_base_y);
