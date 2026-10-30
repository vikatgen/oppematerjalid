import test from 'node:test';
import assert from 'node:assert/strict';
import { ACTIONS, USERS, decide, matrix } from '../docs/.vitepress/components/backend/accessSimulation.mjs';

const code = (a, u) => decide(a, u).code;

test('the public list is open to everyone', () => {
    for (const u of USERS) assert.equal(code('public', u.key), 200);
});

test('every protected action answers 401 to a guest, decided by requireAuth', () => {
    for (const a of ACTIONS.filter(a => a.auth)) {
        assert.deepEqual([code(a.key, 'guest'), decide(a.key, 'guest').layer], [401, 'requireAuth'], a.key);
    }
});

test('admin passes every check', () => {
    for (const a of ACTIONS) assert.ok(code(a.key, 'admin') < 300, a.key);
});

test('wrong role → 403 from requireRole, right role but not owner → decided in the service', () => {
    assert.deepEqual([code('create', 'attendee'), decide('create', 'attendee').layer], [403, 'requireRole']);
    assert.deepEqual([code('update', 'organizer2'), decide('update', 'organizer2').layer], [403, 'Service']);
    assert.equal(code('update', 'organizer1'), 200);
    assert.deepEqual([code('scan', 'security2'), decide('scan', 'security2').layer], [403, 'Service']);
    assert.equal(code('scan', 'security1'), 200);
    assert.equal(code('scan', 'organizer1'), 403);
});

test('a foreign ticket is 404, not 403', () => {
    assert.equal(code('qr', 'attendee'), 200);
    for (const u of ['organizer1', 'organizer2', 'security1', 'security2']) assert.equal(code('qr', u), 404, u);
});

test('anyone logged in may order, only admin may change roles', () => {
    for (const u of USERS.filter(u => u.role)) {
        assert.equal(code('order', u.key), 201, u.key);
        assert.equal(code('role', u.key), u.role === 'admin' ? 200 : 403, u.key);
    }
});

test('the matrix covers every pair', () => {
    const m = matrix();
    assert.equal(m.length, ACTIONS.length);
    for (const row of m) assert.equal(row.cells.length, USERS.length);
});
