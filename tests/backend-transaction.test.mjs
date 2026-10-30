import test from 'node:test';
import assert from 'node:assert/strict';
import { SCENARIOS, simulateTransaction } from '../docs/.vitepress/components/backend/transactionSimulation.mjs';

const expected = {
    'race/none': { orders: 2, consistent: false },
    'race/safe': { orders: 1, consistent: true },
    'allOrNothing/none': { orders: 0, consistent: false },
    'allOrNothing/safe': { orders: 0, consistent: true },
};

for (const scenario of Object.keys(SCENARIOS)) {
    for (const protection of ['none', 'safe']) {
        test(`${scenario}, ${protection}`, () => {
            const run = simulateTransaction({ scenario, protection });
            assert.deepEqual({ orders: run.orders, consistent: run.consistent }, expected[`${scenario}/${protection}`]);
            assert.equal(run.steps.filter(s => s.response).length, 1, 'One final response');
            assert.ok(run.steps.at(-1).response, 'Response is the last step');
            assert.ok(run.steps.every(s => s.db && Array.isArray(s.db.types)), 'Every step has a db snapshot');

            const last = run.steps.at(-1).db;
            assert.equal(last.orders.length, run.orders, 'Snapshot orders match the result');
            const overbooked = last.types.some(t => t.sold > t.capacity) || (scenario === 'race' && last.orders.length + 99 > 100);
            if (run.consistent) assert.ok(!overbooked);
        });
    }
}

test('safe race: B waits while A holds the lock and never reads the old value', () => {
    const { steps } = simulateTransaction({ scenario: 'race', protection: 'safe' });
    const waiting = steps.findIndex(s => s.db.waiting === 'B');
    const commit = steps.findIndex(s => s.title.includes('COMMIT'));
    assert.ok(waiting >= 0 && commit > waiting);
    assert.ok(!steps.some(s => s.title.startsWith('B loeb')));
});

test('transaction: the counter is back to the original value after ROLLBACK', () => {
    const { steps } = simulateTransaction({ scenario: 'allOrNothing', protection: 'safe' });
    assert.equal(steps.at(-1).db.types[0].sold, 50);
    assert.ok(steps.some(s => s.title === 'ROLLBACK'));
    const none = simulateTransaction({ scenario: 'allOrNothing', protection: 'none' });
    assert.equal(none.steps.at(-1).db.types[0].sold, 51, 'Without a transaction the first update stays');
});
