<script setup>
import StepSimulator from '../StepSimulator.vue';
import { MECHANISMS, SCENARIOS, simulateSession } from './sessionSimulation.mjs';

const settings = [
    { key: 'mechanism', label: 'Kuidas server kasutaja ära tunneb?', options: Object.entries(MECHANISMS).map(([value, label]) => ({ value, label })) },
    { key: 'scenario', label: 'Olukord', options: Object.entries(SCENARIOS).map(([value, label]) => ({ value, label })) },
];

const predictions = [
    { key: 'code', label: 'Mis on viimase päringu vastus?', options: [200, 201, 401, 403].map(value => ({ value, label: String(value) })) },
    { key: 'db', label: 'Kas server küsib andmebaasilt, kes see on?', options: [
        { value: 'yes', label: 'Jah' },
        { value: 'no', label: 'Ei' },
    ] },
];

const layers = ['Brauser', 'Server', 'Andmebaas'];
const checkPrediction = (p, run) => p.code === run.code && (p.db === 'yes') === run.dbLookup;
const describeOutcome = run => `Vastus ${run.code}. ` + (run.safe ? 'Server käitus nii, nagu peab.' : 'Server usaldas vananenud tõendit.');
</script>

<template>
    <StepSimulator
        title="Kuidas server mäletab, et oled sisse loginud?"
        intro="Võrdle kahte viisi: sessioon andmebaasis ja isesisaldav token. Mõlemad töötavad tavaolukorras. Vahe tuleb välja, kui midagi muutub."
        :settings="settings"
        :predictions="predictions"
        :layers="layers"
        :simulate="simulateSession"
        :check-prediction="checkPrediction"
        :describe-outcome="describeOutcome"
        try-next="Vaata kõiki kolme olukorda mõlema viisiga. Millal on JWT eelis (andmebaasi pole vaja) ja millal muutub see probleemiks?"
    >
        <template #state="{ values, visited }">
            <span class="eyebrow">TÕEND BRAUSERIS</span>
            <p v-if="values.mechanism === 'session'" class="token"><code>session_token=k3J9xQ…</code></p>
            <p v-else class="token"><code>eyJhbGciOi…</code></p>
            <p class="muted">{{ values.mechanism === 'session'
                ? 'Juhuslik tunnus. Selle järgi otsitakse andmebaasist, kes kasutaja on.'
                : 'Sisaldab kasutajat, rolli ja aegumisaega. Allkiri takistab muutmist.' }}</p>
            <p class="muted">{{ visited.some(s => s.layer === 'Andmebaas' && s.read) ? 'Server küsis andmebaasilt.' : 'Andmebaasilt pole kasutaja kohta küsitud.' }}</p>
        </template>
    </StepSimulator>
</template>

<style scoped>
.token { margin-top: 8px; }
.token code { font-size: 12px; overflow-wrap: anywhere; }
</style>
