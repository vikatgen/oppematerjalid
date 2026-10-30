<script setup>
/**
 * Korduvkasutatav samm-sammult simulaator: vali olukord → ennusta → jälgi sammud → võrdle.
 * Teemapõhine loogika on puhtas funktsioonis (`simulate`), mida saab testida ilma brauserita.
 * Vt docs/.vitepress/components/README.md.
 */
import { computed, reactive, ref, watch } from 'vue';

const props = defineProps({
    title: { type: String, required: true },
    intro: { type: String, default: '' },
    eyebrow: { type: String, default: 'KATSE · 3–5 MINUTIT' },
    /** [{ key, label, options: [{ value, label }] }]; esimene valik on vaikimisi. */
    settings: { type: Array, required: true },
    /** [{ key, label, options: [{ value, label }] }] */
    predictions: { type: Array, default: () => [] },
    /** Kihid, mis on näha teekonna ribal (sammu `layer` peab olema üks neist, muidu ribal ei märgita). */
    layers: { type: Array, required: true },
    /** (settings) => { steps: [{ layer, title, explanation, rejected?, response? }], ... } */
    simulate: { type: Function, required: true },
    /** (settings) => string, nt "POST /events/42/publish" */
    request: { type: Function, default: null },
    /** (prediction, run) => boolean */
    checkPrediction: { type: Function, default: null },
    /** (run, visited) => string: lõpus näidatav kokkuvõte */
    describeOutcome: { type: Function, default: null },
    tryNext: { type: String, default: 'Muuda ainult üht tingimust ja ennusta, milline samm nüüd teisiti läheb.' },
    note: { type: String, default: 'Õppimiseks mõeldud simulatsioon näidisandmetega. Päris serverisse päringuid ei saadeta.' },
});

const values = reactive(Object.fromEntries(props.settings.map(s => [s.key, s.options[0].value])));
const prediction = reactive(Object.fromEntries(props.predictions.map(p => [p.key, ''])));
const cursor = ref(-1);

const run = computed(() => props.simulate({ ...values }));
const steps = computed(() => run.value.steps);
const current = computed(() => steps.value[cursor.value]);
const visited = computed(() => steps.value.slice(0, cursor.value + 1));
const started = computed(() => cursor.value >= 0);
const done = computed(() => cursor.value === steps.value.length - 1);
/** Viimane saadetud vastus jääb näha ka järgmistel sammudel (nt "brauser joonistab lehe"). */
const response = computed(() => [...visited.value].reverse().find(step => step.response)?.response);
const predicted = computed(() => props.predictions.length > 0 && props.predictions.every(p => prediction[p.key] !== ''));
const correct = computed(() => props.checkPrediction?.({ ...prediction }, run.value));

const wasVisited = layer => visited.value.some(step => step.layer === layer);

function next() { if (!done.value) cursor.value++; }
function skipToEnd() { cursor.value = steps.value.length - 1; }
function reset() { cursor.value = -1; }

watch(values, () => {
    reset();
    for (const key in prediction) prediction[key] = '';
});
</script>

<template>
    <section class="step-sim" :aria-label="title">
        <div class="sim-intro">
            <span class="eyebrow">{{ eyebrow }}</span>
            <p class="sim-title">{{ title }}</p>
            <p v-if="intro">{{ intro }}</p>
        </div>

        <fieldset class="settings">
            <legend>1. Vali olukord</legend>
            <label v-for="setting in settings" :key="setting.key">{{ setting.label }}
                <select v-model="values[setting.key]">
                    <option v-for="option in setting.options" :key="String(option.value)" :value="option.value">{{ option.label }}</option>
                </select>
            </label>
        </fieldset>

        <fieldset v-if="predictions.length" class="forecast" :disabled="started">
            <legend>2. Ennusta enne käivitamist</legend>
            <label v-for="item in predictions" :key="item.key">{{ item.label }}
                <select v-model="prediction[item.key]">
                    <option disabled value="">Vali oma ennustus</option>
                    <option v-for="option in item.options" :key="String(option.value)" :value="option.value">{{ option.label }}</option>
                </select>
            </label>
        </fieldset>

        <div v-if="request" class="request"><span>PÄRING</span><code>{{ request({ ...values }) }}</code></div>

        <!-- Kihid on üksteise all nagu tarkvara kihid: päring liigub alla, vastus tuleb üles tagasi. -->
        <ol class="journey" aria-label="Päringu teekonna kihid">
            <li v-for="layer in layers" :key="layer" class="layer"
                :class="{ active: current?.layer === layer, passed: wasVisited(layer) }"
                :aria-current="current?.layer === layer ? 'step' : undefined">
                <span class="layer-name">{{ layer }}</span>
                <span class="layer-doing">{{ current?.layer === layer ? current.title : '' }}</span>
                <small>{{ current?.layer === layer ? 'Praegu' : wasVisited(layer) ? 'Külastatud' : 'Ootel' }}</small>
            </li>
        </ol>

        <div class="step-panel" aria-live="polite" aria-atomic="true" :class="{ rejected: current?.rejected }">
            <template v-if="current">
                <span class="eyebrow">SAMM {{ cursor + 1 }} / {{ steps.length }} · {{ current.layer }}</span>
                <p class="step-title">{{ current.title }}</p>
                <p>{{ current.explanation }}</p>
            </template>
            <template v-else>
                <span class="eyebrow">{{ predictions.length ? '3.' : '2.' }} JÄLGI TEEKONDA</span>
                <p class="step-title">Päringut pole veel saadetud</p>
                <p>Iga vajutus viib ühe sammu edasi. „Hüppa lõppu” näitab kohe tulemust.</p>
            </template>
        </div>

        <div class="controls">
            <button type="button" class="primary" :disabled="done" @click="next">
                {{ !started ? 'Saada päring' : done ? 'Päring lõpetatud' : 'Järgmine samm →' }}
            </button>
            <button type="button" :disabled="done" @click="skipToEnd">Hüppa lõppu</button>
            <button type="button" :disabled="!started" @click="reset">Alusta uuesti</button>
            <span v-if="started">{{ cursor + 1 }} / {{ steps.length }}</span>
        </div>

        <div class="result-grid">
            <div class="result">
                <slot name="state" :values="values" :run="run" :visited="visited" :current="current" :started="started" />
            </div>
            <div class="result" aria-live="polite">
                <span class="eyebrow">HTTP-VASTUS BRAUSERILE</span>
                <template v-if="response">
                    <p class="response-code">{{ response.code }}</p>
                    <pre class="response-body">{{ JSON.stringify(response.body, null, 2) }}</pre>
                </template>
                <p v-else class="muted">{{ !started ? 'Vastust veel pole.' : 'Server töötleb päringut. Vastust pole veel saadetud.' }}</p>
            </div>
        </div>

        <div v-if="done" class="reflection" aria-live="polite">
            <p v-if="predicted || describeOutcome">
                <strong v-if="predicted && checkPrediction">{{ correct ? 'Sinu ennustus läks täppi.' : 'Võrdle tulemust oma ennustusega.' }}</strong>
                {{ describeOutcome?.(run, visited) }}
            </p>
            <p><strong>Proovi järgmiseks:</strong> {{ tryNext }}</p>
        </div>

        <details v-if="visited.length" class="history">
            <summary>Läbitud sammud ({{ visited.length }})</summary>
            <ol><li v-for="(step, index) in visited" :key="index"><strong>{{ step.layer }}</strong> · {{ step.title }}</li></ol>
        </details>
        <p class="simulation-note">{{ note }}</p>
    </section>
</template>

<style scoped>
.step-sim { margin: 24px 0; border: 1px solid var(--vp-c-divider); border-radius: 12px; overflow: hidden; background: var(--vp-c-bg); font-size: 14px; line-height: 1.65; }
.sim-intro { padding: 24px; background: var(--vp-c-bg-soft); }
.step-sim :deep(.eyebrow) { font-size: 11px; font-weight: 700; letter-spacing: .06em; color: var(--vp-c-text-2); }
.step-sim p { margin: 8px 0 0; }
.step-sim .sim-title { margin-top: 8px; font-size: 22px; line-height: 1.35; font-weight: 700; color: var(--vp-c-text-1); }
.step-sim fieldset { min-width: 0; margin: 20px 24px; padding: 0; border: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px 16px; }
.step-sim legend { padding: 0; margin-bottom: 12px; font-weight: 700; font-size: 15px; }
.step-sim label { display: grid; gap: 5px; color: var(--vp-c-text-2); font-size: 13px; }
.step-sim select { width: 100%; min-width: 0; appearance: auto; padding: 9px 8px; border: 1px solid var(--vp-c-divider); border-radius: 6px; background: var(--vp-c-bg); color: var(--vp-c-text-1); font: inherit; min-height: 42px; }
.step-sim select:disabled { opacity: .7; }
.step-sim :is(button, select, summary):focus-visible { outline: 3px solid var(--vp-c-brand-1); outline-offset: 3px; }
.request { margin: 24px 24px 16px; display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; }
.request > span { font-size: 11px; font-weight: 700; color: var(--vp-c-text-2); letter-spacing: .06em; }
.request code { overflow-wrap: anywhere; }
.step-sim .journey { margin: 0 24px; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 4px; }
.step-sim .layer { margin: 0; border: 1px solid var(--vp-c-divider); border-left: 4px solid var(--vp-c-divider); border-radius: 6px; padding: 10px 14px; display: flex; align-items: center; gap: 12px; line-height: 1.4; transition: background-color .2s, border-color .2s; }
.layer-name { flex: 0 0 96px; font-weight: 600; font-size: 13px; }
.layer-doing { flex: 1; min-width: 0; font-size: 13px; color: var(--vp-c-text-1); }
.layer small { flex: none; color: var(--vp-c-text-2); font-size: 11px; }
.step-sim .layer.passed { background: var(--vp-c-bg-soft); border-left-color: var(--vp-c-text-3); }
.step-sim .layer.active { border-color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); }
.step-sim .layer.active small { color: var(--vp-c-brand-1); font-weight: 700; }
@media (prefers-reduced-motion: reduce) { .step-sim .layer { transition: none; } }
.step-panel { margin: 16px 24px; padding: 18px; border-left: 3px solid var(--vp-c-brand-1); background: var(--vp-c-bg-soft); min-height: 170px; }
.step-panel.rejected { border-left-color: var(--vp-c-warning-1); }
.step-sim .step-title { font-size: 18px; line-height: 1.4; font-weight: 700; }
.controls { margin: 16px 24px 24px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.controls button { padding: 9px 14px; min-height: 42px; border: 1px solid var(--vp-c-divider); border-radius: 6px; font-weight: 600; cursor: pointer; background: var(--vp-c-bg-soft); }
.controls button.primary { background: var(--vp-c-brand-3); color: var(--vp-c-white); border-color: transparent; }
.controls button:disabled { opacity: .5; cursor: default; }
.controls span { margin-left: auto; color: var(--vp-c-text-2); font-size: 12px; font-variant-numeric: tabular-nums; }
.result-grid { margin: 0 24px 20px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); border-top: 1px solid var(--vp-c-divider); border-bottom: 1px solid var(--vp-c-divider); }
.result { min-width: 0; padding: 16px 0; }
.result + .result { border-left: 1px solid var(--vp-c-divider); padding-left: 16px; margin-left: 16px; }
.step-sim :deep(.muted) { font-size: 12px; color: var(--vp-c-text-2); }
.step-sim .response-code { font-size: 26px; line-height: 1.2; font-weight: 700; }
.response-body { white-space: pre-wrap; overflow-wrap: anywhere; font-size: 12px; line-height: 1.6; padding: 0; margin: 12px 0 0; background: transparent; }
.reflection { margin: 0 24px 20px; padding: 0 0 0 14px; border-left: 3px solid var(--vp-c-brand-1); }
.history { margin: 16px 24px; }
.history summary { cursor: pointer; font-weight: 600; }
.history ol { padding-left: 22px; font-size: 12px; }
.step-sim .simulation-note { margin: 16px 24px 20px; font-size: 12px; color: var(--vp-c-text-2); }
@media (max-width: 540px) {
    .sim-intro { padding: 18px; }
    .step-sim fieldset { margin: 18px; grid-template-columns: 1fr; }
    .request, .journey, .step-panel, .controls, .result-grid, .reflection, .history { margin-left: 18px; margin-right: 18px; }
    .step-sim .layer { padding: 9px 10px; gap: 8px; flex-wrap: wrap; }
    .layer-name { flex-basis: auto; }
    .layer small { margin-left: auto; }
    .layer-doing { order: 3; flex-basis: 100%; }
    .layer-doing:empty { display: none; }
    .result-grid { grid-template-columns: 1fr; }
    .result + .result { border-left: 0; border-top: 1px solid var(--vp-c-divider); padding-left: 0; margin-left: 0; }
    .step-sim .simulation-note { margin-left: 18px; margin-right: 18px; }
}
</style>
