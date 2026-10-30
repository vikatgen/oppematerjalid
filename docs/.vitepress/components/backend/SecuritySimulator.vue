<script setup>
import StepSimulator from '../StepSimulator.vue';
import { ACTIONS, ORIGINS, simulateSecurity } from './securitySimulation.mjs';

const settings = [
    { key: 'origin', label: 'Kust päring tuleb?', options: Object.entries(ORIGINS).map(([value, o]) => ({ value, label: o.label })) },
    { key: 'action', label: 'Mida päring teeb?', options: Object.entries(ACTIONS).map(([value, a]) => ({ value, label: `${a.label} (${a.request})` })) },
];

const predictions = [
    { key: 'code', label: 'Mis vastuse server annab?', options: [200, 201, 401, 403, 429].map(value => ({ value, label: String(value) })) },
    { key: 'readable', label: 'Kas leht või skript saab vastust lugeda?', options: [{ value: 'yes', label: 'Jah' }, { value: 'no', label: 'Ei' }] },
];

const layers = ['Leht / skript', 'Brauser', 'Turvakihid', 'Route'];
const request = ({ action }) => ACTIONS[action].request;
const checkPrediction = (p, run) => p.code === run.code && (p.readable === 'yes') === run.readable;
const describeOutcome = run => `Vastus ${run.code}. ` + (run.readable ? 'Vastust sai lugeda.' : 'Brauser ei andnud vastust lehele.');
</script>

<template>
    <StepSimulator
        title="Kes saab meie API-t kasutada?"
        intro="Kasutaja on meie rakenduses sisse logitud. Vaata, mis juhtub, kui päring tuleb meie lehelt, võõralt lehelt (samas brauseris) või skriptist."
        :settings="settings"
        :predictions="predictions"
        :layers="layers"
        :simulate="simulateSecurity"
        :request="request"
        :check-prediction="checkPrediction"
        :describe-outcome="describeOutcome"
        try-next="Võrdle võõrast lehte ja skripti. Miks saab skript vastust lugeda, aga võõras leht mitte? Ja miks ei saa kumbki kasutaja nimel osta?"
    >
        <template #state="{ values, run }">
            <span class="eyebrow">PÄISED</span>
            <dl>
                <div><dt>Origin</dt><dd><code>{{ ORIGINS[values.origin].origin ?? 'puudub' }}</code></dd></div>
                <div><dt>Cookie</dt><dd>{{ run.cookie ? 'session_token=… (kaasas)' : 'puudub' }}</dd></div>
                <div><dt>Allow-Origin</dt><dd><code v-if="values.origin === 'ours'">http://localhost:5173</code><template v-else>puudub</template></dd></div>
            </dl>
            <p class="muted">Allow-Origin on vastuse päis. Ilma selleta ei anna brauser vastust lehe JavaScriptile.</p>
        </template>
    </StepSimulator>
</template>

<style scoped>
dl { margin: 12px 0; font-size: 12px; }
dl > div { display: flex; gap: 8px; margin-top: 6px; }
dt { min-width: 84px; color: var(--vp-c-text-2); }
dd { margin: 0; overflow-wrap: anywhere; }
dd code { font-size: 11px; }
</style>
