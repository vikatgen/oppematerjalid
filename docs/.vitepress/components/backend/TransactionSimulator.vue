<script setup>
import StepSimulator from '../StepSimulator.vue';
import { SCENARIOS, simulateTransaction } from './transactionSimulation.mjs';

const settings = [
    { key: 'scenario', label: 'Olukord', options: Object.entries(SCENARIOS).map(([value, label]) => ({ value, label })) },
    { key: 'protection', label: 'Kuidas server broneerib?', options: [
        { value: 'none', label: 'Ilma kaitseta (loe → kontrolli → kirjuta, ilma tehinguta)' },
        { value: 'safe', label: 'Õigesti (üks tingimuslik UPDATE, tehing)' },
    ] },
];

const predictions = [
    { key: 'orders', label: 'Mitu tellimust õnnestub?', options: [0, 1, 2].map(value => ({ value, label: String(value) })) },
    { key: 'consistent', label: 'Kas andmed on lõpuks õiged?', options: [
        { value: 'yes', label: 'Jah' },
        { value: 'no', label: 'Ei' },
    ] },
];

const layers = ['Ostja A', 'Ostja B', 'Andmebaas'];

const checkPrediction = (p, run) => p.orders === run.orders && (p.consistent === 'yes') === run.consistent;
const describeOutcome = run => `Õnnestunud tellimusi: ${run.orders}. ` + (run.consistent ? 'Andmed on korras.' : 'Andmed on vigased.');
const dbAt = (visited, run) => (visited.at(-1) ?? run.steps[0]).db;
const realSold = (db, values) => values.scenario === 'race' ? 99 + db.orders.length : null;
</script>

<template>
    <StepSimulator
        title="Mis juhtub, kui mitu asja toimub korraga?"
        intro="Vali olukord ja broneerimise viis. Ennusta, siis jälgi samm-sammult, mida kumbki ostja ja andmebaas teevad."
        :settings="settings"
        :predictions="predictions"
        :layers="layers"
        :simulate="simulateTransaction"
        :check-prediction="checkPrediction"
        :describe-outcome="describeOutcome"
        try-next="Vaata mõlemat olukorda nii ilma kaitseta kui õigesti. Kus tekib viga: koodis, mis loeb ja kirjutab eraldi, või andmebaasis?"
    >
        <template #state="{ values, visited, run }">
            <span class="eyebrow">ANDMEBAAS · TICKET_TYPES</span>
            <div v-for="type in dbAt(visited, run).types" :key="type.name" class="type">
                <div class="type-head">
                    <strong>{{ type.name }}</strong>
                    <code>sold {{ type.sold }} / {{ type.capacity }}</code>
                    <span v-if="dbAt(visited, run).locked && type.name === 'Tavapilet'" class="lock">🔒 lukus ({{ dbAt(visited, run).locked }})</span>
                </div>
                <div class="bar" role="img" :aria-label="`${type.sold} kohta ${type.capacity}-st`">
                    <span :style="{ width: `${Math.min(100, (type.sold / type.capacity) * 100)}%` }" />
                </div>
            </div>
            <p v-if="dbAt(visited, run).waiting" class="muted">⏳ {{ dbAt(visited, run).waiting }} ootab, kuni lukk vabaneb</p>
            <p v-if="dbAt(visited, run).tx" class="muted">Tehing on pooleli: muudatused pole veel lõplikud</p>
            <p class="orders">Tellimused: <strong>{{ dbAt(visited, run).orders.length ? dbAt(visited, run).orders.join(', ') : 'pole' }}</strong></p>
            <p v-if="realSold(dbAt(visited, run), values) > 100" class="oversold">Tegelikult müüdud {{ realSold(dbAt(visited, run), values) }} piletit 100 kohale!</p>
        </template>
    </StepSimulator>
</template>

<style scoped>
.type { margin-top: 10px; }
.type-head { display: flex; flex-wrap: wrap; gap: 4px 10px; align-items: baseline; font-size: 13px; }
.type-head code { font-size: 12px; }
.lock { font-size: 12px; color: var(--vp-c-warning-1); font-weight: 600; }
.bar { margin-top: 4px; height: 8px; border-radius: 4px; background: var(--vp-c-default-soft); overflow: hidden; }
.bar span { display: block; height: 100%; background: var(--vp-c-brand-1); transition: width .3s; }
.orders { font-size: 13px; }
.oversold { font-size: 13px; font-weight: 700; color: var(--vp-c-danger-1); }
@media (prefers-reduced-motion: reduce) { .bar span { transition: none; } }
</style>
