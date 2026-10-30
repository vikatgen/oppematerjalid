<script setup>
import StepSimulator from '../StepSimulator.vue';
import { SCENARIOS, simulateJobs } from './jobSimulation.mjs';

const settings = [
    { key: 'scenario', label: 'Olukord', options: Object.entries(SCENARIOS).map(([value, label]) => ({ value, label })) },
];

const predictions = [
    { key: 'refunds', label: 'Mitu tagasimakset Stripe tegelikult teeb?', options: [1, 2, 3].map(value => ({ value, label: String(value) })) },
    { key: 'quick', label: 'Kas kasutaja saab vastuse kohe?', options: [{ value: 'yes', label: 'Jah' }, { value: 'no', label: 'Ei' }] },
];

const layers = ['Meie server', 'Järjekord', 'Worker', 'Stripe'];
const checkPrediction = (p, run) => p.refunds === run.refunds && (p.quick === 'yes') === run.quick;
const describeOutcome = run => `Tagasimakseid: ${run.refunds}, õige oleks ${run.expected}. `
    + (run.refunds === run.expected ? 'Iga pilet sai raha tagasi täpselt üks kord.' : run.refunds > run.expected ? 'Raha läks topelt tagasi!' : 'Osa tagasimakseid jäi tegemata!');
const stateAt = (visited, run) => (visited.at(-1) ?? run.steps[0]).state;
</script>

<template>
    <StepSimulator
        title="Mis juhtub tagasimaksetega pärast ürituse tühistamist?"
        intro="Aeglane ja ebakindel töö (välise teenuse kutsed) käib taustal. Vaata, mis juhtub, kui midagi läheb vahepeal katki."
        :settings="settings"
        :predictions="predictions"
        :layers="layers"
        :simulate="simulateJobs"
        :check-prediction="checkPrediction"
        :describe-outcome="describeOutcome"
        try-next="Võrdle kahte „worker kukub” olukorda. Miks on kordus õige, aga ilma võtmeta ohtlik?"
    >
        <template #state="{ visited, run }">
            <span class="eyebrow">JÄRJEKORD (POSTGRES)</span>
            <ul class="queue">
                <li v-for="job in stateAt(visited, run).queue" :key="job"><code>{{ job.startsWith('t') ? `refund-ticket ${job}` : job }}</code></li>
                <li v-if="!stateAt(visited, run).queue.length" class="muted">tühi</li>
            </ul>
            <p class="refunds">Stripe’i tagasimakseid: <strong>{{ stateAt(visited, run).refunds }}</strong></p>
        </template>
    </StepSimulator>
</template>

<style scoped>
.queue { margin: 8px 0 0; padding-left: 18px; font-size: 12px; }
.queue li { margin: 2px 0; }
.refunds { font-size: 13px; }
</style>
