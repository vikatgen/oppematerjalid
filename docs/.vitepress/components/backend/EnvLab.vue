<script setup>
import { computed, ref } from 'vue';
import { PRESETS, mask, validateEnv } from './envSimulation.mjs';

const text = ref(PRESETS[0].text);
const active = ref(PRESETS[0].key);
const result = computed(() => validateEnv(text.value));
const revealSecrets = ref(false);

function choose(preset) {
    text.value = preset.text;
    active.value = preset.key;
}
const shown = row => row.value === undefined ? '—' : row.secret && !revealSecrets.value ? mask(row.value) : row.value;
const port = computed(() => result.value.rows.find(r => r.name === 'PORT').value);
const nodeEnv = computed(() => result.value.rows.find(r => r.name === 'NODE_ENV').value);
</script>

<template>
    <section class="env-lab" aria-label="Keskkonnamuutujate katse">
        <div class="intro">
            <span class="eyebrow">KATSE · MUUDA .ENV FAILI</span>
            <p class="title">Kas server käivitub?</p>
            <p>Server loeb seadistuse käivitamisel ja kontrollib selle üle. Kui midagi on valesti, keeldub ta käivitumast. Vali näide või muuda faili ise.</p>
        </div>

        <div class="presets" role="group" aria-label="Näited">
            <button v-for="preset in PRESETS" :key="preset.key" type="button" :class="{ active: active === preset.key }" :aria-pressed="active === preset.key" @click="choose(preset)">{{ preset.label }}</button>
        </div>

        <label class="editor">
            <span><code>.env</code> (ei lähe Giti)</span>
            <textarea v-model="text" rows="9" spellcheck="false" @input="active = ''" />
        </label>

        <div class="banner" :class="{ ok: result.ok }" aria-live="polite">
            <template v-if="result.ok">✓ Server käivitub: port {{ port }}, NODE_ENV={{ nodeEnv }}</template>
            <template v-else>✕ Server ei käivitu. Vigaseid muutujaid: {{ result.errors.length }}</template>
        </div>

        <div class="block">
            <div class="block-head">
                <span class="eyebrow">MIDA SERVER NÄEB</span>
                <label class="toggle"><input v-model="revealSecrets" type="checkbox"> näita saladusi</label>
            </div>
            <table>
                <thead><tr><th>Muutuja</th><th>Väärtus</th><th>Allikas</th><th>Tulemus</th></tr></thead>
                <tbody>
                    <tr v-for="row in result.rows" :key="row.name" :class="{ bad: row.error }">
                        <td><code>{{ row.name }}</code><span v-if="row.secret" class="tag">saladus</span></td>
                        <td class="value"><code>{{ shown(row) }}</code></td>
                        <td class="muted">{{ row.source }}</td>
                        <td>{{ row.error ?? '✓' }}<small v-if="row.error">{{ row.hint }}</small></td>
                    </tr>
                </tbody>
            </table>
            <p v-if="result.unknown.length" class="muted">Tundmatud muutujad (server ei kasuta): {{ result.unknown.join(', ') }}</p>
        </div>

        <pre v-if="!result.ok" class="console" aria-label="Serveri väljund">$ npm start
Invalid environment variable:
<template v-for="row in result.errors" :key="row.name">✖ {{ row.error }}
  → at {{ row.name }}
</template>
Protsess lõpetas koodiga 1</pre>

        <p class="note">Lihtsustatud: päris rakenduses on ka Google’i ja GitHubi võtmed. Kõik väärtused siin on väljamõeldud.</p>
    </section>
</template>

<style scoped>
.env-lab { margin: 24px 0; border: 1px solid var(--vp-c-divider); border-radius: 12px; overflow: hidden; background: var(--vp-c-bg); font-size: 14px; line-height: 1.6; }
.intro { padding: 24px; background: var(--vp-c-bg-soft); }
.eyebrow { font-size: 11px; font-weight: 700; letter-spacing: .06em; color: var(--vp-c-text-2); }
.env-lab p { margin: 8px 0 0; }
.env-lab .title { font-size: 22px; line-height: 1.35; font-weight: 700; color: var(--vp-c-text-1); }
.env-lab :is(button, textarea, input):focus-visible { outline: 3px solid var(--vp-c-brand-1); outline-offset: 3px; }
.presets { margin: 20px 24px 0; display: flex; flex-wrap: wrap; gap: 8px; }
.presets button { padding: 7px 12px; min-height: 38px; border: 1px solid var(--vp-c-divider); border-radius: 6px; font-weight: 600; font-size: 13px; cursor: pointer; background: var(--vp-c-bg-soft); }
.presets button.active { border-color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); }
.editor { margin: 16px 24px 0; display: grid; gap: 5px; color: var(--vp-c-text-2); font-size: 13px; }
.editor textarea { width: 100%; padding: 12px; border: 1px solid var(--vp-c-divider); border-radius: 6px; background: var(--vp-c-bg-alt); color: var(--vp-c-text-1); font-family: var(--vp-font-family-mono); font-size: 12px; line-height: 1.6; resize: vertical; }
.banner { margin: 16px 24px 0; padding: 10px 14px; border-left: 3px solid var(--vp-c-danger-1); background: var(--vp-c-bg-soft); font-weight: 700; color: var(--vp-c-danger-1); }
.banner.ok { border-left-color: var(--vp-c-success-1); color: var(--vp-c-success-1); }
.block { margin: 16px 24px 0; }
.block-head { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px; align-items: center; }
.toggle { font-size: 12px; color: var(--vp-c-text-2); display: flex; gap: 6px; align-items: center; }
.env-lab table { display: table; width: 100%; margin: 8px 0 0; font-size: 12px; border-collapse: collapse; }
.env-lab tr { background: transparent !important; border: 0; }
.env-lab th, .env-lab td { padding: 5px 6px; border: 0; border-bottom: 1px solid var(--vp-c-divider); text-align: left; vertical-align: top; }
.env-lab th { color: var(--vp-c-text-2); font-weight: 600; }
.env-lab tr.bad td { background: var(--vp-c-danger-soft); }
.env-lab td small { display: block; color: var(--vp-c-text-2); }
.value { overflow-wrap: anywhere; max-width: 220px; }
.tag { margin-left: 6px; padding: 0 5px; border-radius: 4px; font-size: 10px; font-weight: 700; background: var(--vp-c-warning-soft); color: var(--vp-c-warning-1); }
.muted { font-size: 12px; color: var(--vp-c-text-2); }
.console { margin: 16px 24px 0; padding: 12px; border-radius: 6px; background: #1e1e20; color: #f87171; font-size: 12px; line-height: 1.5; white-space: pre-wrap; overflow-wrap: anywhere; }
.env-lab .note { margin: 20px 24px; padding-top: 16px; border-top: 1px solid var(--vp-c-divider); font-size: 12px; color: var(--vp-c-text-2); }
@media (max-width: 540px) {
    .intro { padding: 18px; }
    .presets, .editor, .banner, .block, .console { margin-left: 18px; margin-right: 18px; }
    .env-lab .note { margin-left: 18px; margin-right: 18px; }
    .env-lab th:nth-child(3), .env-lab td:nth-child(3) { display: none; }
    .env-lab table { table-layout: fixed; }
    .env-lab td { overflow-wrap: anywhere; }
    .env-lab td code { word-break: break-all; }
    .value { max-width: none; }
}
</style>
