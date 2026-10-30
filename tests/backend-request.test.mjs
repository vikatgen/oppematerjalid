import test from 'node:test';
import assert from 'node:assert/strict';
import { REQUESTS, simulateRequest } from '../docs/.vitepress/components/backend/requestSimulation.mjs';

function expected({ request, session, db }) {
    if (request === 'manage-list') {
        if (session === 'none') return { code: 401, reachedDb: false };
        if (db === 'down') return { code: 500, reachedDb: true };
        return { code: session === 'buyer' ? 403 : 200, reachedDb: true };
    }
    if (request === 'public-invalid') return { code: 400, reachedDb: false };
    if (db === 'down') return { code: 500, reachedDb: true };
    if (request === 'public-missing' || request === 'public-draft') return { code: 404, reachedDb: true };
    return { code: 200, reachedDb: true };
}

for (const request of Object.keys(REQUESTS)) {
    for (const session of ['none', 'buyer', 'organizer']) {
        for (const db of ['up', 'down']) {
            test(`${request}, ${session}, db ${db}`, () => {
                const run = simulateRequest({ request, session, db });
                const want = expected({ request, session, db });
                assert.equal(run.code, want.code);
                assert.equal(run.reachedDb, want.reachedDb);

                const responses = run.steps.filter(step => step.response);
                assert.equal(responses.length, 1, 'Exactly one response');
                assert.equal(responses[0].response.code, run.code);
                assert.equal(run.steps[0].layer, 'Brauser', 'Starts in the browser');
                assert.equal(run.steps.at(-1).layer, 'Brauser', 'Ends in the browser');
                assert.equal(run.steps.filter(step => step.rejected).length, run.code >= 400 ? 1 : 0);
                assert.ok(!run.steps.some(step => step.write), 'GET never writes');

                if (run.code === 500) assert.deepEqual(responses[0].response.body, { error: 'Serveri viga' });
                if (request !== 'manage-list') {
                    // Only the browser step differs (cookie is sent); the server does the same work.
                    const anonymous = simulateRequest({ request, session: 'none', db });
                    assert.deepEqual(run.steps.slice(1), anonymous.steps.slice(1), 'Public routes ignore the session');
                }
            });
        }
    }
}
