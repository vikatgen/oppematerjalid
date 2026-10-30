<script setup>
import StepSimulator from '../StepSimulator.vue';
import { SCENARIOS, simulatePayment } from './paymentSimulation.mjs';

const settings = [
    { key: 'scenario', label: 'Olukord', options: Object.entries(SCENARIOS).map(([value, label]) => ({ value, label })) },
];

const predictions = [
    { key: 'status', label: 'Mis on tellimuse lõppolek?', options: [
        { value: 'pending', label: 'pending (ootab makset)' },
        { value: 'paid', label: 'paid (makstud)' },
        { value: 'expired', label: 'expired (aegunud)' },
    ] },
    { key: 'reserved', label: 'Kas piletid jäävad selle tellimuse jaoks kinni?', options: [{ value: 'yes', label: 'Jah' }, { value: 'no', label: 'Ei' }] },
];

const layers = ['Brauser', 'Meie server', 'Stripe'];
const checkPrediction = (p, run) => p.status === run.finalStatus && (p.reserved === 'yes') === run.reserved;
const describeOutcome = run => `Tellimus on ${run.finalStatus}. ` + (run.reserved ? 'Piletid on kinni.' : 'Piletid on jälle müügis.');
const names = { pending: 'ootab makset', paid: 'makstud', expired: 'aegunud' };
const stateAt = (visited, run) => (visited.at(-1) ?? run.steps[0]).state;
</script>

<template>
    <StepSimulator
        title="Kust server teab, et makse tuli?"
        intro="Raha ei liigu meie serveri kaudu. Vaata, kuidas Stripe meile teada annab ja miks brauseri tagasitulekut ei usaldata."
        :settings="settings"
        :predictions="predictions"
        :layers="layers"
        :simulate="simulatePayment"
        :check-prediction="checkPrediction"
        :describe-outcome="describeOutcome"
        try-next="Võrdle „Ostja maksab” ja „sulgeb kohe brauseri”. Miks on tulemus sama? Ja mis juhtuks, kui server märgiks tellimuse makstuks brauseri tagasisuunamise peale?"
    >
        <template #state="{ visited, run }">
            <span class="eyebrow">TELLIMUS ANDMEBAASIS</span>
            <p class="status" :class="stateAt(visited, run).status"><code>{{ stateAt(visited, run).status }}</code> · {{ names[stateAt(visited, run).status] }}</p>
            <p class="muted">Piletid: {{ stateAt(visited, run).reserved ? '2 tk kinni selle tellimuse jaoks' : 'vabastatud, jälle müügis' }}</p>
        </template>
    </StepSimulator>
</template>

<style scoped>
.status { margin-top: 8px; font-size: 15px; font-weight: 700; }
.status.paid { color: var(--vp-c-success-1); }
.status.expired { color: var(--vp-c-text-2); }
.status.pending { color: var(--vp-c-warning-1); }
</style>
