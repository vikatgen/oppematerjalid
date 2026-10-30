<script setup>
import { computed, ref } from 'vue';
import { MIDDLEWARES, START_ORDER, checkOrder } from './middlewareSimulation.mjs';

const order = ref([...START_ORDER]);
const check = computed(() => checkOrder(order.value));
const passing = computed(() => check.value.results.filter(r => r.ok).length);
const icons = { next: '→', answered: '■', error: '✕', skipped: '·' };

function move(index, delta) {
    const target = index + delta;
    if (target < 0 || target >= order.value.length) return;
    const next = [...order.value];
    [next[index], next[target]] = [next[target], next[index]];
    order.value = next;
}
function reset() { order.value = [...START_ORDER]; }
</script>

<template>
    <section class="mw-order" aria-label="Middleware'i järjekorra ülesanne">
        <div class="intro">
            <span class="eyebrow">ÜLESANNE · 5–10 MINUTIT</span>
            <p class="title">Pane middleware'id õigesse järjekorda</p>
            <p>Praegune järjekord on vale ja kõik neli päringut käituvad valesti. Liiguta kihte nooltega. Tulemus uueneb kohe.</p>
        </div>

        <ol class="chain" aria-label="Middleware'ide järjekord">
            <li v-for="(key, index) in order" :key="key">
                <span class="pos">{{ index + 1 }}</span>
                <span class="name"><strong>{{ MIDDLEWARES[key].label }}</strong><small>{{ MIDDLEWARES[key].hint }}</small></span>
                <span class="moves">
                    <button type="button" :disabled="index === 0" :aria-label="`Liiguta ${MIDDLEWARES[key].label} üles`" @click="move(index, -1)">↑</button>
                    <button type="button" :disabled="index === order.length - 1" :aria-label="`Liiguta ${MIDDLEWARES[key].label} alla`" @click="move(index, 1)">↓</button>
                </span>
            </li>
        </ol>

        <div class="summary" :class="{ done: check.allOk }" aria-live="polite">
            <strong>{{ passing }} / {{ check.results.length }} päringut käitub õigesti.</strong>
            <span v-if="check.allOk"> Hästi tehtud! Logija on ees, kontrollid enne controller'it ja veatöötlus viimasena.</span>
            <button type="button" @click="reset">Alusta uuesti</button>
        </div>

        <div class="results">
            <article v-for="result in check.results" :key="result.scenario.key" class="result" :class="{ ok: result.ok }">
                <header>
                    <span class="mark" :aria-label="result.ok ? 'õige' : 'vale'">{{ result.ok ? '✓' : '✕' }}</span>
                    <span class="label">POST /api/events · {{ result.scenario.label }}</span>
                </header>
                <p class="outcome">
                    <span class="code">{{ result.response.code }}</span>
                    {{ result.response.kind === 'json' ? 'JSON' : 'HTML-leht' }}
                    <span class="muted">· oodati {{ result.scenario.expected.code }} JSON</span>
                </p>
                <ul v-if="result.problems.length" class="problems">
                    <li v-for="problem in result.problems" :key="problem">{{ problem }}</li>
                </ul>
                <details>
                    <summary>Mis juhtus samm-sammult?</summary>
                    <ol class="trace">
                        <li v-for="(step, i) in result.trace" :key="i" :class="step.action">
                            <span class="icon" aria-hidden="true">{{ icons[step.action] }}</span>
                            <strong>{{ step.name }}</strong> {{ step.text }}
                        </li>
                    </ol>
                </details>
            </article>
        </div>

        <p class="note">Õppimiseks mõeldud mudel: päris rakenduses on ahelas rohkem kihte (turvapäised, CORS, päringute piirang) ja <code>requireAuth</code> on kaitstud route'ide routeri ees, mitte kõigi päringute ees.</p>
    </section>
</template>

<style scoped>
.mw-order { margin: 24px 0; border: 1px solid var(--vp-c-divider); border-radius: 12px; overflow: hidden; background: var(--vp-c-bg); font-size: 14px; line-height: 1.6; }
.intro { padding: 24px; background: var(--vp-c-bg-soft); }
.eyebrow { font-size: 11px; font-weight: 700; letter-spacing: .06em; color: var(--vp-c-text-2); }
.mw-order p { margin: 8px 0 0; }
.mw-order .title { font-size: 22px; line-height: 1.35; font-weight: 700; color: var(--vp-c-text-1); }
.mw-order :is(button, summary):focus-visible { outline: 3px solid var(--vp-c-brand-1); outline-offset: 3px; }
.mw-order .chain { margin: 20px 24px 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 4px; }
.chain li { margin: 0; display: flex; align-items: center; gap: 12px; padding: 8px 10px 8px 12px; border: 1px solid var(--vp-c-divider); border-left: 4px solid var(--vp-c-brand-1); border-radius: 6px; background: var(--vp-c-bg); }
.pos { flex: none; width: 22px; font-weight: 700; color: var(--vp-c-text-2); font-variant-numeric: tabular-nums; }
.name { flex: 1; min-width: 0; display: grid; }
.name strong { font-size: 13px; }
.name small { font-size: 12px; color: var(--vp-c-text-2); }
.moves { flex: none; display: flex; gap: 4px; }
.moves button { width: 38px; height: 38px; border: 1px solid var(--vp-c-divider); border-radius: 6px; background: var(--vp-c-bg-soft); font-size: 16px; cursor: pointer; }
.moves button:disabled { opacity: .35; cursor: default; }
.summary { margin: 16px 24px 0; padding: 12px 14px; border-left: 3px solid var(--vp-c-warning-1); background: var(--vp-c-bg-soft); display: flex; flex-wrap: wrap; align-items: center; gap: 6px 10px; }
.summary.done { border-left-color: var(--vp-c-success-1); }
.summary button { margin-left: auto; padding: 6px 12px; min-height: 36px; border: 1px solid var(--vp-c-divider); border-radius: 6px; font-weight: 600; font-size: 13px; cursor: pointer; background: var(--vp-c-bg); }
.results { margin: 16px 24px 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
.result { min-width: 0; padding: 12px 14px; border: 1px solid var(--vp-c-divider); border-top: 3px solid var(--vp-c-danger-1); border-radius: 6px; }
.result.ok { border-top-color: var(--vp-c-success-1); }
.result header { display: flex; gap: 8px; align-items: baseline; }
.mark { font-weight: 700; color: var(--vp-c-danger-1); }
.result.ok .mark { color: var(--vp-c-success-1); }
.label { font-size: 12px; font-weight: 600; }
.outcome { font-size: 13px; }
.code { font-size: 20px; font-weight: 700; margin-right: 4px; }
.muted { color: var(--vp-c-text-2); font-size: 12px; }
.mw-order .problems { margin: 6px 0 0; padding-left: 18px; font-size: 12px; color: var(--vp-c-danger-1); }
.problems li { margin: 2px 0; }
.result details { margin-top: 8px; font-size: 12px; }
.result summary { cursor: pointer; font-weight: 600; color: var(--vp-c-text-2); }
.mw-order .trace { margin: 6px 0 0; padding: 0; list-style: none; }
.trace li { margin: 3px 0; display: flex; gap: 6px; align-items: baseline; }
.trace li strong { flex: none; }
.trace li.skipped { color: var(--vp-c-text-3); }
.trace li.error .icon { color: var(--vp-c-danger-1); }
.trace li.answered .icon { color: var(--vp-c-brand-1); }
.icon { flex: none; width: 12px; text-align: center; font-weight: 700; }
.mw-order .note { margin: 20px 24px; padding-top: 16px; border-top: 1px solid var(--vp-c-divider); font-size: 12px; color: var(--vp-c-text-2); }
@media (max-width: 640px) {
    .results { grid-template-columns: 1fr; }
}
@media (max-width: 540px) {
    .intro { padding: 18px; }
    .mw-order .chain, .summary, .results { margin-left: 18px; margin-right: 18px; }
    .mw-order .note { margin-left: 18px; margin-right: 18px; }
    .chain li { gap: 8px; }
    .summary button { margin-left: 0; }
}
</style>
