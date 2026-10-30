import test from 'node:test';
import assert from 'node:assert/strict';
import { MECHANISMS, SCENARIOS, simulateSession } from '../docs/.vitepress/components/backend/sessionSimulation.mjs';

const expected = {
    'session/normal': [200, true, true], 'jwt/normal': [200, false, true],
    'session/logout': [401, true, true], 'jwt/logout': [200, false, false],
    'session/role': [403, true, true], 'jwt/role': [201, false, false],
};

for (const mechanism of Object.keys(MECHANISMS)) {
    for (const scenario of Object.keys(SCENARIOS)) {
        test(`${mechanism}, ${scenario}`, () => {
            const run = simulateSession({ mechanism, scenario });
            assert.deepEqual([run.code, run.dbLookup, run.safe], expected[`${mechanism}/${scenario}`]);
            const responses = run.steps.filter(s => s.response);
            assert.equal(responses.length, 1);
            assert.equal(responses[0].response.code, run.code);
            assert.ok(run.steps.at(-1).response, 'The response is the last step');
            const reads = run.steps.filter(s => s.layer === 'Andmebaas' && s.read).length;
            assert.equal(reads > 0, run.dbLookup, 'dbLookup matches database reads');
            if (mechanism === 'jwt') assert.ok(!run.steps.some(s => s.layer === 'Andmebaas' && s.title.includes('session')), 'JWT stores nothing');
        });
    }
}
