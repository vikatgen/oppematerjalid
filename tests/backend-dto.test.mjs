import test from 'node:test';
import assert from 'node:assert/strict';
import { PRESETS, ORGANIZER_ID, submitEvent } from '../docs/.vitepress/components/backend/dtoSimulation.mjs';

const preset = key => PRESETS.find(p => p.key === key).text;
const send = body => submitEvent(JSON.stringify(body));
const valid = JSON.parse(preset('valid'));

test('valid body creates a draft owned by the logged-in organizer', () => {
    const run = submitEvent(preset('valid'));
    assert.equal(run.response.code, 201);
    assert.equal(run.row.status, 'draft');
    assert.equal(run.row.organizerId, ORGANIZER_ID);
    assert.equal(run.row.imageUrl, null, 'Optional field missing → null');
    assert.equal(run.row.startsAt, '2026-11-14T18:00:00.000Z', 'Dates are normalised to ISO');
});

test('extra fields are dropped, not rejected, and cannot change owner or status', () => {
    const run = submitEvent(preset('extra'));
    assert.equal(run.response.code, 201);
    assert.equal(run.row.status, 'draft');
    assert.equal(run.row.organizerId, ORGANIZER_ID);
    assert.ok(!('isFree' in run.row));
    const dropped = run.fields.filter(f => f.outcome === 'dropped').map(f => f.name).sort();
    assert.deepEqual(dropped, ['isFree', 'organizerId', 'status']);
});

test('public response hides internal fields, organizer response does not', () => {
    const run = submitEvent(preset('valid'));
    for (const name of ['organizerId', 'status', 'createdAt', 'updatedAt']) {
        assert.ok(!(name in run.publicResponse), `${name} is not public`);
        assert.ok(name in run.organizerResponse, `${name} is visible to the organizer`);
    }
    assert.deepEqual(run.response.body, run.organizerResponse, 'Create answers with the organizer response');
});

test('missing required field → 400 with details', () => {
    const run = submitEvent(preset('missing'));
    assert.equal(run.response.code, 400);
    assert.equal(run.response.body.error, 'Vigane päring');
    assert.deepEqual(Object.keys(run.response.body.details), ['title']);
    assert.equal(run.row, undefined);
});

test('wrong types are reported per field', () => {
    const run = submitEvent(preset('types'));
    assert.equal(run.response.code, 400);
    assert.deepEqual(Object.keys(run.response.body.details).sort(), ['startsAt', 'title']);
});

test('date order is checked only after the fields are valid', () => {
    assert.deepEqual(submitEvent(preset('order')).response.body.details, { endsAt: ['Üritus peab lõppema pärast algust'] });
    const both = send({ ...valid, title: '', endsAt: '2026-11-14T17:00:00Z' });
    assert.deepEqual(Object.keys(both.response.body.details), ['title'], 'Refine waits for field errors');
    assert.equal(send({ ...valid, endsAt: valid.startsAt }).response.code, 400, 'Equal start and end is not allowed');
});

test('broken JSON → 400 Vigane JSON before validation', () => {
    const run = submitEvent(preset('json'));
    assert.deepEqual(run.response, { code: 400, body: { error: 'Vigane JSON' } });
    assert.equal(run.stage, 'json');
});

test('non-object bodies are rejected', () => {
    for (const body of [null, [], 'tekst', 42]) {
        assert.equal(send(body).response.code, 400);
    }
});

test('imageUrl must be an http(s) address when sent', () => {
    assert.equal(send({ ...valid, imageUrl: 'https://example.com/pilt.jpg' }).response.code, 201);
    assert.equal(send({ ...valid, imageUrl: 'pilt.jpg' }).response.code, 400);
    assert.equal(send({ ...valid, imageUrl: 'javascript:alert(1)' }).response.code, 400);
});

test('length limits', () => {
    assert.equal(send({ ...valid, title: 'a'.repeat(255) }).response.code, 201);
    assert.equal(send({ ...valid, title: 'a'.repeat(256) }).response.code, 400);
    assert.equal(send({ ...valid, city: 'a'.repeat(101) }).response.code, 400);
});

test('every preset produces a response', () => {
    for (const p of PRESETS) assert.ok([201, 400].includes(submitEvent(p.text).response.code), p.key);
});
