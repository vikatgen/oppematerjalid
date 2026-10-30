import test from 'node:test';
import assert from 'node:assert/strict';
import { ACTIONS, ORIGINS, simulateSecurity } from '../docs/.vitepress/components/backend/securitySimulation.mjs';

const expected = {
    'ours/read': [200, true], 'ours/write': [201, true], 'ours/flood': [429, true],
    'evil/read': [401, false], 'evil/write': [403, false], 'evil/flood': [429, false],
    'script/read': [401, true], 'script/write': [401, true], 'script/flood': [429, true],
};

for (const origin of Object.keys(ORIGINS)) {
    for (const action of Object.keys(ACTIONS)) {
        test(`${origin}, ${action}`, () => {
            const run = simulateSecurity({ origin, action });
            assert.deepEqual([run.code, run.readable], expected[`${origin}/${action}`]);
            assert.equal(run.steps.filter(s => s.response).length, 1);
            assert.equal(run.steps.find(s => s.response).response.code, run.code);
            assert.equal(run.cookie, origin === 'ours', 'Only our own page sends the session cookie');
            if (run.code === 429) assert.ok(!run.steps.some(s => s.layer === 'Route'), 'Rate limit stops before the route');
            if (run.code === 403) assert.ok(!run.steps.some(s => s.layer === 'Route'), 'Origin check stops before the route');
        });
    }
}

test('CORS protects the user, not the server: a script can read every response', () => {
    for (const action of Object.keys(ACTIONS)) assert.equal(simulateSecurity({ origin: 'script', action }).readable, true);
});
