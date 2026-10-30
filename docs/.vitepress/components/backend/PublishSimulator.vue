<script setup>
import StepSimulator from '../StepSimulator.vue';
import { simulatePublish, SHORT_ID } from './publishSimulation.mjs';

const statusNames = { draft: 'Mustand', published: 'Avaldatud', cancelled: 'Tühistatud' };
const stopNames = { Middleware: 'middleware’is', Controller: 'controller’is', Service: 'service’is' };

const settings = [
    { key: 'user', label: 'Kasutaja', options: [
        { value: 'organizer', label: 'Korraldaja · organizer-1' },
        { value: 'buyer', label: 'Ostja' },
        { value: 'guest', label: 'Sisse logimata' },
    ] },
    { key: 'owner', label: 'Ürituse omanik', options: [
        { value: 'mine', label: 'organizer-1' },
        { value: 'other', label: 'organizer-2 · teine korraldaja' },
    ] },
    { key: 'status', label: 'Ürituse algolek', options: [
        { value: 'draft', label: 'Mustand · draft' },
        { value: 'published', label: 'Avaldatud · published' },
        { value: 'cancelled', label: 'Tühistatud · cancelled' },
    ] },
    { key: 'validId', label: 'Aadressis olev ID', options: [
        { value: true, label: `${SHORT_ID} · uuid` },
        { value: false, label: 'abc · vigane kuju' },
    ] },
];

const predictions = [
    { key: 'stop', label: 'Kus tegevus katkeb?', options: [
        { value: 'success', label: 'Ei katke · avaldamine õnnestub' },
        { value: 'Middleware', label: 'Middleware’is' },
        { value: 'Controller', label: 'Controller’is' },
        { value: 'Service', label: 'Service’is' },
    ] },
    { key: 'change', label: 'Kas andmebaasi kirje muutub?', options: [
        { value: 'yes', label: 'Jah' },
        { value: 'no', label: 'Ei' },
    ] },
];

const layers = ['Route', 'Middleware', 'Controller', 'Service', 'Repository', 'Andmebaas'];

const request = ({ validId }) => `POST /events/${validId ? SHORT_ID : 'abc'}/publish`;
const checkPrediction = (p, run) => p.stop === run.stoppedAt && (p.change === 'yes') === run.changed;
const describeOutcome = run =>
    (run.stoppedAt === 'success' ? 'Avaldamine õnnestus.' : `Tegevus katkes ${stopNames[run.stoppedAt]}.`)
    + (run.changed ? ' Andmebaasi kirje muutus.' : ' Andmebaasi kirje ei muutunud.');
</script>

<template>
    <StepSimulator
        title="Mis juhtub, kui vajutad „Avalda”?"
        intro="Vali olukord, ennusta tulemust ja jälgi üht päringut. Tingimuse muutmine alustab uut katset."
        :settings="settings"
        :predictions="predictions"
        :layers="layers"
        :simulate="simulatePublish"
        :request="request"
        :check-prediction="checkPrediction"
        :describe-outcome="describeOutcome"
        try-next="Muuda ainult üht tingimust ja ennusta, milline samm nüüd teisiti läheb. Miks ei tähenda andmete lugemine veel nende muutmist?"
    >
        <template #state="{ values, visited }">
            <span class="eyebrow">ANDMEBAAS · ÜRITUS {{ SHORT_ID }}</span>
            <p class="event-name">Sügiskontsert</p>
            <dl>
                <div><dt>Omanik</dt><dd>{{ values.owner === 'mine' ? 'organizer-1' : 'organizer-2' }}</dd></div>
                <div><dt>Enne</dt><dd>{{ statusNames[values.status] }} <code>{{ values.status }}</code></dd></div>
                <div><dt>Praegu</dt><dd>
                    <template v-if="visited.some(s => s.write)">{{ statusNames.published }} <code>published</code></template>
                    <template v-else>{{ statusNames[values.status] }} <code>{{ values.status }}</code></template>
                </dd></div>
            </dl>
            <p class="muted">{{ visited.some(s => s.write) ? 'Kirje on muudetud.' : visited.some(s => s.read) ? 'Kirjet on loetud. Muudetud ei ole.' : 'Andmebaasi pole veel kasutatud.' }}</p>
        </template>
    </StepSimulator>
</template>

<style scoped>
.event-name { font-weight: 700; margin-top: 8px; }
dl { margin: 12px 0; font-size: 12px; }
dl > div { display: flex; gap: 8px; margin-top: 6px; }
dt { min-width: 48px; color: var(--vp-c-text-2); }
dd { margin: 0; overflow-wrap: anywhere; }
dd code { display: inline-block; font-size: 11px; }
</style>
