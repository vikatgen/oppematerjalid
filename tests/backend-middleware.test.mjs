import test from 'node:test';
import assert from 'node:assert/strict';
import {
    CORRECT_ORDER, START_ORDER, SCENARIOS, checkOrder, simulateChain,
} from '../docs/.vitepress/components/backend/middlewareSimulation.mjs';

function permutations(items) {
    if (items.length <= 1) return [items];
    return items.flatMap((item, i) =>
        permutations([...items.slice(0, i), ...items.slice(i + 1)]).map(rest => [item, ...rest]));
}

const before = (order, a, b) => order.indexOf(a) < order.indexOf(b);
const scenario = key => SCENARIOS.find(s => s.key === key);

test('an order works for every request exactly when the rules hold', () => {
    const all = permutations(CORRECT_ORDER);
    assert.equal(all.length, 120);
    for (const order of all) {
        const rules = before(order, 'logger', 'json') && before(order, 'logger', 'auth') && before(order, 'logger', 'route')
            && before(order, 'json', 'route') && before(order, 'auth', 'route') && before(order, 'route', 'errors');
        assert.equal(checkOrder(order).allOk, rules, order.join(' → '));
    }
});

test('json and requireAuth may swap places', () => {
    assert.ok(checkOrder(CORRECT_ORDER).allOk);
    assert.ok(checkOrder(['logger', 'auth', 'json', 'route', 'errors']).allOk);
});

test('the starting order is broken for every request', () => {
    assert.ok(checkOrder(START_ORDER).results.every(r => !r.ok));
});

test('error handler before the route: errors are not caught, Express answers with HTML', () => {
    const run = simulateChain(['logger', 'json', 'auth', 'errors', 'route'], scenario('conflict'));
    assert.deepEqual([run.response.code, run.response.kind], [409, 'html']);
});

test('requireAuth after the route: the route runs without a user and crashes', () => {
    const run = simulateChain(['logger', 'json', 'route', 'auth', 'errors'], scenario('guest'));
    assert.equal(run.routeRan, true);
    assert.equal(run.response.code, 500);
    assert.equal(run.trace.find(t => t.key === 'auth').action, 'skipped', 'Nobody checks the login any more');
});

test('json after the route: a correct request fails with 400', () => {
    const run = simulateChain(['logger', 'auth', 'route', 'json', 'errors'], scenario('ok'));
    assert.equal(run.response.code, 400);
});

test('logger after requireAuth misses rejected requests but logs accepted ones', () => {
    const order = ['auth', 'logger', 'json', 'route', 'errors'];
    assert.equal(simulateChain(order, scenario('guest')).logged, false);
    assert.equal(simulateChain(order, scenario('ok')).logged, true);
});

test('every run ends with exactly one answer and middleware after it does not run', () => {
    for (const order of permutations(CORRECT_ORDER)) {
        for (const s of SCENARIOS) {
            const run = simulateChain(order, s);
            const answered = run.trace.findIndex(t => t.action === 'answered');
            assert.ok(answered >= 0);
            assert.equal(run.trace.filter(t => t.action === 'answered').length, 1);
            assert.ok(run.trace.slice(answered + 1).every(t => t.action === 'skipped'));
        }
    }
});
