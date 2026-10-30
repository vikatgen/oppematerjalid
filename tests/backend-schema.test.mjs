import test from 'node:test';
import assert from 'node:assert/strict';
import { ACTIONS, TABLES, applyAction, createDb, rowId } from '../docs/.vitepress/components/backend/schemaSimulation.mjs';

/** Every foreign key points to an existing row and sold never exceeds capacity. */
function assertConsistent(db) {
    const has = (table, id) => db[table].some(r => r.id === id);
    for (const e of db.events) assert.ok(has('users', e.organizer_id));
    for (const t of db.ticket_types) {
        assert.ok(has('events', t.event_id));
        assert.ok(t.sold >= 0 && t.sold <= t.capacity, `${t.id} sold ${t.sold}/${t.capacity}`);
    }
    for (const o of db.orders) assert.ok(has('users', o.user_id) && has('events', o.event_id));
    for (const t of db.tickets) assert.ok(has('orders', t.order_id) && has('ticket_types', t.ticket_type_id));
    for (const s of db.event_staff) assert.ok(has('events', s.event_id) && has('users', s.user_id));
    const pairs = db.event_staff.map(s => rowId('event_staff', s));
    assert.equal(new Set(pairs).size, pairs.length, 'event_staff pairs are unique');
}

test('every column listed in TABLES exists in the sample rows', () => {
    const db = createDb();
    for (const [name, table] of Object.entries(TABLES)) {
        for (const row of db[name]) assert.deepEqual(Object.keys(row), table.columns, name);
    }
});

test('buying changes three tables and keeps sold in sync with tickets', () => {
    const run = applyAction(createDb(), 'buy');
    assert.ok(run.ok);
    assert.deepEqual([...new Set(run.changes.map(c => c.table))], ['ticket_types', 'orders', 'tickets']);
    assert.equal(run.db.ticket_types.find(t => t.id === 'tt1').sold, 3);
    assert.equal(run.db.tickets.filter(t => t.ticket_type_id === 'tt1').length, 3);
});

test('VIP does not fit and nothing changes', () => {
    const db = createDb();
    const run = applyAction(db, 'buyVip');
    assert.equal(run.ok, false);
    assert.deepEqual(run.db, db);
    assert.equal(run.changes.length, 0);
});

test('adding the same staff pair twice is rejected by the primary key', () => {
    const first = applyAction(createDb(), 'staff');
    assert.ok(first.ok);
    const second = applyAction(first.db, 'staff');
    assert.equal(second.ok, false);
    assert.match(second.message, /Primaarvõtme/);
});

test('deleting a draft cascades to its ticket types and staff', () => {
    const withStaff = applyAction(createDb(), 'staff').db;
    const run = applyAction(withStaff, 'deleteDraft');
    assert.ok(run.ok);
    assert.ok(!run.db.ticket_types.some(t => t.event_id === 'e2'));
    assert.ok(!run.db.event_staff.some(s => s.event_id === 'e2'));
    assert.deepEqual(run.changes.map(c => c.table).sort(), ['event_staff', 'events', 'ticket_types']);
    assert.match(applyAction(run.db, 'staff').message, /Võõrvõtme/, 'Cannot add staff to a deleted event');
});

test('restrict blocks deleting an event with orders and a user with orders', () => {
    for (const key of ['deleteEvent', 'deleteUser']) {
        const run = applyAction(createDb(), key);
        assert.equal(run.ok, false, key);
        assert.match(run.message, /restrict/);
    }
});

test('any sequence of actions keeps the database consistent', () => {
    const keys = ACTIONS.map(a => a.key);
    // Deterministic pseudo-random sequences.
    let seed = 7;
    const rand = () => (seed = (seed * 48271) % 2147483647) / 2147483647;
    for (let run = 0; run < 200; run++) {
        let db = createDb();
        for (let step = 0; step < 8; step++) {
            const result = applyAction(db, keys[Math.floor(rand() * keys.length)]);
            if (!result.ok) assert.deepEqual(result.db, db, 'Failed actions change nothing');
            db = result.db;
            assertConsistent(db);
        }
    }
});
