import test from 'node:test';
import assert from 'node:assert/strict';
import {
    addMigration, compare, createState, editOldMigration, migrate, missingColumns,
} from '../docs/.vitepress/components/backend/migrationSimulation.mjs';

const migrateAll = state => ['mine', 'colleague', 'production'].reduce(migrate, state);

test('start: colleague and server are behind', () => {
    const state = createState();
    assert.equal(compare(state).level, 'pending');
    assert.equal(state.dbs.mine.applied.length, 5);
    assert.equal(state.dbs.colleague.applied.length, 0);
    assert.equal(state.dbs.production.applied.length, 4);
});

test('migrating every database brings them to the same schema', () => {
    assert.equal(compare(migrateAll(createState())).level, 'ok');
});

test('running migrations twice does nothing the second time', () => {
    const once = migrate(createState(), 'colleague');
    const twice = migrate(once, 'colleague');
    assert.deepEqual(twice.dbs, once.dbs);
});

test('the correct way: a new migration reaches every database', () => {
    const state = migrateAll(addMigration(createState()));
    assert.equal(compare(state).level, 'ok');
    for (const db of Object.values(state.dbs)) assert.ok(db.schema.events.includes('image_url'));
});

test('editing an old migration makes databases silently differ', () => {
    const state = migrateAll(editOldMigration(createState()));
    assert.equal(compare(state).level, 'fail');
    assert.ok(!state.dbs.mine.schema.events.includes('image_url'), 'Already applied file is not run again');
    assert.ok(!state.dbs.production.schema.events.includes('image_url'));
    assert.ok(state.dbs.colleague.schema.events.includes('image_url'), 'Fresh database gets the edited file');
    assert.deepEqual(missingColumns(state, 'mine'), ['events.image_url']);
});

test('editing the old file and adding a new one breaks the fresh database', () => {
    const state = migrateAll(addMigration(editOldMigration(createState())));
    assert.match(state.dbs.colleague.error, /on juba olemas/);
    assert.equal(state.dbs.colleague.applied.length, 5, 'Stops at the failing migration');
    assert.equal(state.dbs.mine.error, null);
    assert.equal(compare(state).level, 'fail');
});

test('actions are idempotent', () => {
    const s = createState();
    assert.deepEqual(addMigration(addMigration(s)).files, addMigration(s).files);
    assert.deepEqual(editOldMigration(editOldMigration(s)).files, editOldMigration(s).files);
});
