import test from 'node:test';
import assert from 'node:assert/strict';
import { simulatePublish } from '../docs/.vitepress/components/backend/publishSimulation.mjs';

for (const user of ['guest', 'buyer', 'organizer']) {
    for (const owner of ['mine', 'other']) {
        for (const status of ['draft', 'published', 'cancelled']) {
            for (const validId of [false, true]) {
                test(`${user}, ${owner}, ${status}, ${validId ? 'valid' : 'invalid'} ID`, () => {
                    const run = simulatePublish({ user, owner, status, validId });
                    const expectedCode = user === 'guest' ? 401 : user === 'buyer' ? 403
                        : !validId ? 400 : owner === 'other' ? 403 : status !== 'draft' ? 409 : 200;
                    const response = run.steps.at(-1).response;
                    assert.equal(response.code, expectedCode);
                    assert.equal(run.changed, expectedCode === 200);
                    assert.equal(run.steps.filter(step => step.response).length, 1);
                    const readIndex = run.steps.findIndex(step => step.read);
                    const writeIndex = run.steps.findIndex(step => step.write);
                    assert.equal(readIndex >= 0, user === 'organizer' && validId);
                    assert.equal(writeIndex >= 0, expectedCode === 200);
                    if (expectedCode === 200) {
                        assert.ok(writeIndex > readIndex, 'Reading must precede writing');
                        assert.equal(response.body.status, 'published');
                        assert.ok(run.steps.slice(writeIndex + 1).some(step => step.layer === 'Controller'), 'Response passes back through controller');
                    } else {
                        assert.equal(run.steps.at(-2).layer, 'Veatöötlus', 'Error handler maps error before HTTP response');
                        assert.equal(run.steps.filter(step => step.rejected).length, 1);
                    }
                    const expectedStop = user !== 'organizer' ? 'Middleware' : !validId ? 'Controller'
                        : owner === 'other' || status !== 'draft' ? 'Service' : 'success';
                    assert.equal(run.stoppedAt, expectedStop);
                    if (expectedStop === 'Middleware') {
                        assert.ok(!run.steps.some(step => step.layer === 'Controller'), 'Middleware rejection must prevent controller access');
                    }
                    if (expectedCode === 400) {
                        assert.ok(!run.steps.some(step => step.layer === 'Service'), 'Invalid request must not reach service');
                    }
                });
            }
        }
    }
}
