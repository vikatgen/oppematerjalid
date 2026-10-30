<script setup>
import StepSimulator from '../StepSimulator.vue';
import { SCENARIOS, simulateOAuth } from './oauthSimulation.mjs';

const settings = [
    { key: 'scenario', label: 'Olukord', options: Object.entries(SCENARIOS).map(([value, label]) => ({ value, label })) },
];

const predictions = [
    { key: 'loggedIn', label: 'Kas kasutaja saab sisse?', options: [{ value: 'yes', label: 'Jah' }, { value: 'no', label: 'Ei' }] },
    { key: 'newUser', label: 'Kas meie andmebaasi tekib uus kasutaja?', options: [{ value: 'yes', label: 'Jah' }, { value: 'no', label: 'Ei' }] },
];

const layers = ['Brauser', 'Meie server', 'Google'];
const checkPrediction = (p, run) => (p.loggedIn === 'yes') === run.loggedIn && (p.newUser === 'yes') === run.newUser;
const describeOutcome = run => (run.loggedIn ? 'Kasutaja on sisse logitud. ' : 'Sisselogimist ei toimunud. ')
    + (run.newUser ? 'Andmebaasi tekkis uus kasutaja.' : 'Uut kasutajat ei loodud.');

const knows = [
    { what: 'Google’i parool', ours: false, google: true },
    { what: 'E-post ja nimi', ours: true, google: true },
    { what: 'Kasutaja roll ja piletid', ours: true, google: false },
];
</script>

<template>
    <StepSimulator
        title="Mis juhtub, kui vajutad „Logi sisse Google’iga”?"
        intro="Jälgi, kuidas brauser liigub meie lehe ja Google’i vahel ning mida keegi teada saab."
        :settings="settings"
        :predictions="predictions"
        :layers="layers"
        :simulate="simulateOAuth"
        :check-prediction="checkPrediction"
        :describe-outcome="describeOutcome"
        try-next="Vaata võltsitud tagasisuunamist. Mis oleks juhtunud, kui server state väärtust ei kontrolliks?"
    >
        <template #state>
            <span class="eyebrow">KES MIDA TEAB?</span>
            <table class="knows">
                <thead><tr><th></th><th>Meie server</th><th>Google</th></tr></thead>
                <tbody>
                    <tr v-for="row in knows" :key="row.what">
                        <th scope="row">{{ row.what }}</th>
                        <td>{{ row.ours ? '✓' : '—' }}</td>
                        <td>{{ row.google ? '✓' : '—' }}</td>
                    </tr>
                </tbody>
            </table>
        </template>
    </StepSimulator>
</template>

<style scoped>
.knows { display: table; width: 100%; margin: 8px 0 0; font-size: 12px; border-collapse: collapse; }
.knows tr { background: transparent !important; border: 0; }
.knows th, .knows td { padding: 4px 6px; border: 0; border-bottom: 1px solid var(--vp-c-divider); text-align: center; }
.knows tbody th { text-align: left; font-weight: 500; }
.knows thead th { color: var(--vp-c-text-2); font-weight: 600; }
</style>
