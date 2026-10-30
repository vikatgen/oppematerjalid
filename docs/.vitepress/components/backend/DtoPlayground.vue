<script setup>
import { computed, ref } from 'vue';
import { PRESETS, ROW_FIELDS, ORGANIZER_ID, submitEvent } from './dtoSimulation.mjs';

const text = ref(PRESETS.find(p => p.key === 'extra').text);
const active = ref('extra');
const result = computed(() => submitEvent(text.value));
const badges = { kept: 'Võetud', dropped: 'Eemaldatud', error: 'Viga', absent: 'Saatmata' };

function choose(preset) {
    text.value = preset.text;
    active.value = preset.key;
}
function edited() { active.value = ''; }
const show = value => value === undefined ? '' : JSON.stringify(value);
</script>

<template>
    <section class="dto-play" aria-label="DTO mänguväljak">
        <div class="intro">
            <span class="eyebrow">KATSE · MUUDA PÄRINGUT</span>
            <p class="title">Mida server su päringust alles jätab?</p>
            <p>Vali näide või muuda JSON-i ise. Tulemus uueneb kohe. Enne vaatamist mõtle: mis juhtub väljadega <code>status</code> ja <code>organizerId</code>?</p>
        </div>

        <div class="presets" role="group" aria-label="Näited">
            <button v-for="preset in PRESETS" :key="preset.key" type="button"
                :class="{ active: active === preset.key }" :aria-pressed="active === preset.key" @click="choose(preset)">
                {{ preset.label }}
            </button>
        </div>

        <div class="request">
            <span>PÄRING</span><code>POST /api/events</code>
            <span class="who">sisse logitud: korraldaja <code>{{ ORGANIZER_ID }}</code></span>
        </div>
        <label class="editor">
            <span>Päringu keha (JSON)</span>
            <textarea v-model="text" rows="9" spellcheck="false" @input="edited" />
        </label>

        <div class="block">
            <span class="eyebrow">1. SISEND-DTO: MIS VÄLJADEGA JUHTUS?</span>
            <p v-if="result.stage === 'json'" class="muted">JSON on katki (nt koma viimase välja järel või puuduv jutumärk). Server ei jõua väljasid vaatamagi.</p>
            <p v-else-if="result.message" class="muted">{{ result.message }}</p>
            <table v-else>
                <thead><tr><th>Väli</th><th>Saadeti</th><th>Tulemus</th></tr></thead>
                <tbody>
                    <tr v-for="field in result.fields" :key="field.name">
                        <td><code>{{ field.name }}</code></td>
                        <td class="value"><code v-if="field.sent">{{ show(field.value) }}</code><span v-else class="muted">—</span></td>
                        <td><span class="badge" :class="field.outcome">{{ badges[field.outcome] }}</span> {{ field.note }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="block" aria-live="polite">
            <span class="eyebrow">2. HTTP-VASTUS</span>
            <p class="code" :class="{ bad: result.response.code >= 400 }">{{ result.response.code }}
                <small>{{ result.response.code === 201 ? 'loodud' : 'vigane päring, midagi ei salvestatud' }}</small></p>
            <pre>{{ JSON.stringify(result.response.body, null, 2) }}</pre>
        </div>

        <div v-if="result.row" class="block">
            <span class="eyebrow">3. VÄLJUND-DTO: KES MIDA NÄEB?</span>
            <table class="matrix">
                <thead><tr><th>Väli andmebaasis</th><th>Väärtus</th><th>Korraldaja</th><th>Avalik</th></tr></thead>
                <tbody>
                    <tr v-for="field in ROW_FIELDS" :key="field.name">
                        <td><code>{{ field.name }}</code></td>
                        <td class="value"><code>{{ show(result.row[field.name]) }}</code></td>
                        <td :aria-label="field.organizer ? 'näeb' : 'ei näe'">{{ field.organizer ? '✓' : '—' }}</td>
                        <td :aria-label="field.public ? 'näeb' : 'ei näe'">{{ field.public ? '✓' : '—' }}</td>
                    </tr>
                </tbody>
            </table>
            <p class="muted">Server lisas ise <code>id</code>, <code>organizerId</code>, <code>status</code> ja ajatemplid. Avalik vastus (mida näeb ostja, kui üritus on avaldatud) jätab sisemised väljad välja.</p>
        </div>

        <p class="note">Lihtsustatud näide: päris DTO-s on 11 välja (ka kirjeldus, koht, aadress, müügiajad) ja veateated tulevad valideerimise teegist inglise keeles. Päris serverisse päringuid ei saadeta.</p>
    </section>
</template>

<style scoped>
.dto-play { margin: 24px 0; border: 1px solid var(--vp-c-divider); border-radius: 12px; overflow: hidden; background: var(--vp-c-bg); font-size: 14px; line-height: 1.65; }
.intro { padding: 24px; background: var(--vp-c-bg-soft); }
.eyebrow { font-size: 11px; font-weight: 700; letter-spacing: .06em; color: var(--vp-c-text-2); }
.dto-play p { margin: 8px 0 0; }
.dto-play .title { font-size: 22px; line-height: 1.35; font-weight: 700; color: var(--vp-c-text-1); }
.presets { margin: 20px 24px 0; display: flex; flex-wrap: wrap; gap: 8px; }
.presets button { padding: 7px 12px; min-height: 38px; border: 1px solid var(--vp-c-divider); border-radius: 6px; font-weight: 600; font-size: 13px; cursor: pointer; background: var(--vp-c-bg-soft); }
.presets button.active { border-color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); }
.dto-play :is(button, textarea):focus-visible { outline: 3px solid var(--vp-c-brand-1); outline-offset: 3px; }
.request { margin: 20px 24px 8px; display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; }
.request > span { font-size: 11px; font-weight: 700; color: var(--vp-c-text-2); letter-spacing: .06em; }
.request .who { margin-left: auto; font-weight: 400; letter-spacing: 0; font-size: 12px; }
.editor { margin: 0 24px; display: grid; gap: 5px; color: var(--vp-c-text-2); font-size: 13px; }
.editor textarea { width: 100%; padding: 12px; border: 1px solid var(--vp-c-divider); border-radius: 6px; background: var(--vp-c-bg-alt); color: var(--vp-c-text-1); font-family: var(--vp-font-family-mono); font-size: 13px; line-height: 1.6; resize: vertical; }
.block { margin: 20px 24px 0; padding-top: 16px; border-top: 1px solid var(--vp-c-divider); }
.dto-play table { display: table; width: 100%; margin: 10px 0 0; font-size: 12px; border-collapse: collapse; }
.dto-play th, .dto-play td { padding: 6px 8px; border: 0; border-bottom: 1px solid var(--vp-c-divider); text-align: left; vertical-align: top; }
.dto-play tr { background: transparent !important; border: 0; }
.dto-play th { color: var(--vp-c-text-2); font-weight: 600; }
.value { overflow-wrap: anywhere; max-width: 220px; }
.matrix td:nth-child(3), .matrix td:nth-child(4), .matrix th:nth-child(3), .matrix th:nth-child(4) { text-align: center; }
.badge { display: inline-block; padding: 0 6px; margin-right: 4px; border-radius: 4px; font-size: 11px; font-weight: 700; background: var(--vp-c-default-soft); }
.badge.kept { background: var(--vp-c-success-soft); color: var(--vp-c-success-1); }
.badge.dropped { background: var(--vp-c-warning-soft); color: var(--vp-c-warning-1); }
.badge.error { background: var(--vp-c-danger-soft); color: var(--vp-c-danger-1); }
.dto-play .code { font-size: 26px; line-height: 1.2; font-weight: 700; color: var(--vp-c-success-1); }
.dto-play .code.bad { color: var(--vp-c-danger-1); }
.code small { font-size: 13px; font-weight: 500; color: var(--vp-c-text-2); margin-left: 6px; }
.block pre { white-space: pre-wrap; overflow-wrap: anywhere; font-size: 12px; line-height: 1.6; margin: 10px 0 0; padding: 12px; border-radius: 6px; background: var(--vp-c-bg-alt); }
.muted { font-size: 12px; color: var(--vp-c-text-2); }
.note { margin: 20px 24px !important; padding-top: 16px; border-top: 1px solid var(--vp-c-divider); font-size: 12px; color: var(--vp-c-text-2); }
@media (max-width: 540px) {
    .intro { padding: 18px; }
    .presets, .request, .editor, .block { margin-left: 18px; margin-right: 18px; }
    .note { margin-left: 18px !important; margin-right: 18px !important; }
    .request .who { margin-left: 0; }
    /* Väärtused on näha redaktoris ja vastuses, kitsal ekraanil jätame veeru ära. */
    .dto-play th:nth-child(2), .dto-play td:nth-child(2) { display: none; }
    .dto-play th, .dto-play td { padding: 6px 4px; }
}
</style>
