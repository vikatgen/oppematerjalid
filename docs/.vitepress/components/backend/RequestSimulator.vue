<script setup>
import StepSimulator from '../StepSimulator.vue';
import { REQUESTS, simulateRequest } from './requestSimulation.mjs';

const settings = [
    { key: 'request', label: 'Päring', options: Object.entries(REQUESTS).map(([value, r]) => ({ value, label: r.label })) },
    { key: 'session', label: 'Kes on sisse logitud?', options: [
        { value: 'none', label: 'Keegi · küpsist pole' },
        { value: 'buyer', label: 'Ostja' },
        { value: 'organizer', label: 'Korraldaja' },
    ] },
    { key: 'db', label: 'Andmebaas', options: [
        { value: 'up', label: 'Töötab' },
        { value: 'down', label: 'Ei vasta' },
    ] },
];

const predictions = [
    { key: 'code', label: 'Mis staatusekoodi saad?', options: [200, 400, 401, 403, 404, 500].map(value => ({ value, label: String(value) })) },
    { key: 'db', label: 'Kas server küsib andmebaasilt?', options: [
        { value: 'yes', label: 'Jah' },
        { value: 'no', label: 'Ei' },
    ] },
];

const layers = ['Brauser', 'Server', 'Andmebaas'];
const groups = { 2: 'läks hästi', 4: 'kliendi viga', 5: 'serveri viga' };

const request = ({ request }) => `GET ${REQUESTS[request].path}`;
const checkPrediction = (p, run) => p.code === run.code && (p.db === 'yes') === run.reachedDb;
const describeOutcome = run =>
    `Vastus ${run.code} (${String(run.code)[0]}xx: ${groups[String(run.code)[0]]}). `
    + (run.reachedDb ? 'Server küsis andmebaasilt.' : 'Server vastas ilma andmebaasi küsimata.');
</script>

<template>
    <StepSimulator
        title="Mis juhtub ühe päringu ajal?"
        intro="Vali päring ja olukord, ennusta vastust ja jälgi, kuidas päring brauserist serverisse ja andmebaasi liigub."
        :settings="settings"
        :predictions="predictions"
        :layers="layers"
        :simulate="simulateRequest"
        :request="request"
        :check-prediction="checkPrediction"
        :describe-outcome="describeOutcome"
        try-next="Logi sisse korraldajana ja ava avalik nimekiri. Kas küpsis muudab avaliku vastuse? Siis vali „Ei vasta” andmebaasi juures: millal saad 500 ja millal mitte?"
    >
        <template #state="{ values }">
            <span class="eyebrow">PÄRINGU OSAD</span>
            <dl>
                <div><dt>Meetod</dt><dd><code>GET</code> · ainult lugemine</dd></div>
                <div><dt>Aadress</dt><dd><code>{{ REQUESTS[values.request].path }}</code></dd></div>
                <div><dt>Päised</dt><dd><code>Accept: application/json</code></dd></div>
                <div><dt>Küpsis</dt><dd>
                    <code v-if="values.session !== 'none'">better-auth.session_token=…</code>
                    <template v-else>puudub</template>
                </dd></div>
                <div><dt>Keha</dt><dd>puudub (GET-päringul keha pole)</dd></div>
            </dl>
            <p class="muted">Server ei mäleta eelmist päringut. Kõik, mida ta sinu kohta teab, peab olema selles päringus.</p>
        </template>
    </StepSimulator>
</template>

<style scoped>
dl { margin: 12px 0; font-size: 12px; }
dl > div { display: flex; gap: 8px; margin-top: 6px; }
dt { min-width: 56px; color: var(--vp-c-text-2); }
dd { margin: 0; overflow-wrap: anywhere; }
dd code { font-size: 11px; }
</style>
