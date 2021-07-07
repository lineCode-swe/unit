import { mock, when, instance } from 'ts-mockito';
import { UnitStatus } from '../../main/UnitStatus';
import { Position } from '../../main/Position';
import { expect } from 'chai';
import { UnitDataAdapter } from '../../main/Persistence/out/UnitDataAdapter'

let da: UnitDataAdapter = new UnitDataAdapter();

let array: Position[] = [ new Position(0, 0) ];
let pos: Position = new Position(0, 0);

let curr_path: Position[];
let curr_obs: Position[];
let curr_pos: Position;
let curr_status: UnitStatus;
let curr_error: number;
let curr_speed: number;
let curr_path_request: boolean;

async function setupDataForTests(): Promise<void> {
    curr_path = await da.loadPath();
    curr_obs = await da.loadObstacles();
    curr_pos = await da.loadPosition();
    curr_status = await da.loadStatus();
    curr_error = await da.loadError();
    curr_speed = await da.loadSpeed();
    curr_path_request = await da.loadPathRequest();
}

describe('Tests for UnitDataAdapter', () => {

    before(async function() {
        await setupDataForTests();
    });

    it('Testing loadPath', () => {
        expect(curr_path).to.eql(array);
    })

    it('Testing loadObstacles', () => {
        expect(curr_obs).to.eql(array);
    })

    it('Testing loadPosition', () => {
        expect(curr_pos).to.eql(pos);
    })

    it('Testing loadStatus', () => {
        expect(curr_status).to.equal(UnitStatus.SHUTDOWN);
    })

    it('Testing loadError', () => {
        expect(curr_error).to.equal(0);
    })

    it('Testing loadSpeed', () => {
        expect(curr_speed).to.equal(0);
    })

    it('Testing loadPathRequest', () => {
        expect(curr_path_request).to.equal(true);
    })
})
