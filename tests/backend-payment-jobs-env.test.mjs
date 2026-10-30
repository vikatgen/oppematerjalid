import test from 'node:test';
import assert from 'node:assert/strict';
import { SCENARIOS as PAY, simulatePayment } from '../docs/.vitepress/components/backend/paymentSimulation.mjs';
import { SCENARIOS as JOBS, simulateJobs } from '../docs/.vitepress/components/backend/jobSimulation.mjs';
import { PRESETS, VARIABLES, mask, parseDotenv, validateEnv } from '../docs/.vitepress/components/backend/envSimulation.mjs';

const payExpected = {
    paid: ['paid', true], closedTab: ['paid', true], duplicate: ['paid', true],
    expired: ['expired', false], forged: ['pending', true],
};

for (const scenario of Object.keys(PAY)) {
    test(`payment: ${scenario}`, () => {
        const run = simulatePayment({ scenario });
        assert.deepEqual([run.finalStatus, run.reserved], payExpected[scenario]);
        assert.ok(run.steps.at(-1).response, 'Ends with our response to Stripe');
        assert.deepEqual(run.steps.at(-1).state, { status: run.finalStatus, reserved: run.reserved }, 'Last snapshot matches');
        const browserMarksPaid = run.steps.some(s => s.layer === 'Brauser' && s.state.status === 'paid' && !run.steps.slice(0, run.steps.indexOf(s)).some(p => p.title.startsWith('Webhook')));
        assert.ok(!browserMarksPaid, 'Only the webhook changes the order to paid');
    });
}

test('payment: a duplicate webhook does not change the order twice', () => {
    const { steps } = simulatePayment({ scenario: 'duplicate' });
    assert.equal(steps.filter(s => s.write && s.layer === 'Meie server' && s.state.status === 'paid').length, 1);
    assert.ok(steps.filter(s => s.response).every(s => s.response.code === 200), 'Always 200 to Stripe');
});

const jobExpected = {
    cancelEvent: [3, 3, true], stripeDown: [1, 1, true], crashWithKey: [1, 1, true],
    crashNoKey: [2, 1, true], inline: [2, 3, false],
};

for (const scenario of Object.keys(JOBS)) {
    test(`jobs: ${scenario}`, () => {
        const run = simulateJobs({ scenario });
        assert.deepEqual([run.refunds, run.expected, run.quick], jobExpected[scenario]);
        const stripeWrites = run.steps.filter(s => s.layer === 'Stripe' && s.write).length;
        assert.equal(stripeWrites, run.refunds, 'Refund count matches Stripe writes');
        assert.equal(run.steps.at(-1).state.refunds, run.refunds);
        if (run.quick) assert.ok(run.steps.findIndex(s => s.response) < run.steps.findIndex(s => s.layer === 'Stripe'), 'Answer comes before any refund');
    });
}

test('env: the valid preset starts the server, every broken preset does not', () => {
    for (const p of PRESETS) {
        const result = validateEnv(p.text);
        assert.equal(result.ok, ['valid', 'production'].includes(p.key), p.key);
    }
});

test('env: each broken preset fails on exactly the intended variable', () => {
    const failing = key => validateEnv(PRESETS.find(p => p.key === key).text).errors.map(e => e.name);
    assert.deepEqual(failing('missing'), ['DATABASE_URL']);
    assert.deepEqual(failing('short'), ['BETTER_AUTH_SECRET']);
    assert.deepEqual(failing('publicKey'), ['STRIPE_SECRET_KEY']);
    assert.deepEqual(failing('port'), ['PORT']);
});

test('env: defaults, comments, empty values and unknown keys', () => {
    const valid = PRESETS[0].text;
    const result = validateEnv(`# kommentaar\n\n${valid}\nUNKNOWN=1`);
    assert.equal(result.rows.find(r => r.name === 'LOG_LEVEL').source, 'vaikimisi');
    assert.deepEqual(result.unknown, ['UNKNOWN']);
    assert.equal(validateEnv(valid.replace(/^FRONTEND_URL=.*$/m, 'FRONTEND_URL=')).ok, false, 'Empty is not missing: it fails URL check');
    assert.equal(validateEnv(valid.replace('PORT=3000', 'PORT=80')).ok, false, 'Port below 1024');
    assert.deepEqual(parseDotenv('A=b=c'), { A: 'b=c' }, 'Only the first = splits');
});

test('env: production differs in values, not in variable names', () => {
    const dev = parseDotenv(PRESETS.find(p => p.key === 'valid').text);
    const prod = parseDotenv(PRESETS.find(p => p.key === 'production').text);
    for (const v of VARIABLES.filter(v => v.secret)) assert.notEqual(dev[v.name], prod[v.name], v.name);
});

test('env: secrets are masked', () => {
    assert.equal(mask('sk_test_51Hx'), 'sk_t••••');
    assert.equal(mask('abc'), '••••');
});
