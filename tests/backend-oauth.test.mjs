import test from 'node:test';
import assert from 'node:assert/strict';
import { SCENARIOS, simulateOAuth } from '../docs/.vitepress/components/backend/oauthSimulation.mjs';

const expected = { first: [true, true], returning: [true, false], deny: [false, false], forged: [false, false] };

for (const scenario of Object.keys(SCENARIOS)) {
    test(scenario, () => {
        const run = simulateOAuth({ scenario });
        assert.deepEqual([run.loggedIn, run.newUser], expected[scenario]);
        assert.equal(run.steps.filter(s => s.response).length, 1);
        assert.ok(run.steps.at(-1).response, 'Response is the last step');
        const ourSteps = run.steps.filter(s => s.layer === 'Meie server').map(s => s.explanation).join(' ');
        assert.ok(!/parool/i.test(ourSteps) || /ei näe parooli/i.test(ourSteps), 'Our server never handles the password');
        const session = run.steps.some(s => s.title.includes('Loo sessioon'));
        assert.equal(session, run.loggedIn, 'A session exists only after a successful login');
    });
}

test('state is checked before the code is exchanged', () => {
    const { steps } = simulateOAuth({ scenario: 'first' });
    const state = steps.findIndex(s => s.title.includes('state'));
    const exchange = steps.findIndex(s => s.title.includes('Vaheta kood'));
    assert.ok(state >= 0 && exchange > state);
});

test('a forged callback never reaches Google', () => {
    assert.ok(!simulateOAuth({ scenario: 'forged' }).steps.some(s => s.layer === 'Google'));
});
