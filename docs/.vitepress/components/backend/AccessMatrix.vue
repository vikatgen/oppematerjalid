<script setup>
import { computed, ref } from 'vue';
import { USERS, matrix } from './accessSimulation.mjs';

const rows = matrix();
const total = rows.length * USERS.length;
const revealed = ref(new Set());
const selected = ref(null);
const count = computed(() => revealed.value.size);

const id = (row, cell) => `${row.action.key}|${cell.user.key}`;
function open(row, cell) {
    revealed.value = new Set([...revealed.value, id(row, cell)]);
    selected.value = { row, cell };
}
function revealAll() { revealed.value = new Set(rows.flatMap(row => row.cells.map(cell => id(row, cell)))); }
function hideAll() { revealed.value = new Set(); selected.value = null; }
const tone = code => code < 300 ? 'ok' : code === 401 ? 'authn' : 'authz';
</script>

<template>
    <section class="access" aria-label="Kes mida tohib">
        <div class="intro">
            <span class="eyebrow">KATSE · {{ total }} LAHTRIT</span>
            <p class="title">Kes mida tohib?</p>
            <p>Iga lahter on üks päring: rida on tegevus, veerg on kasutaja. <strong>Enne klõpsamist ennusta:</strong> <code>200</code>, <code>401</code>, <code>403</code> või <code>404</code>? Ja kes selle otsustab?</p>
        </div>

        <div class="scroll">
            <table>
                <thead>
                    <tr>
                        <th scope="col">Tegevus</th>
                        <th v-for="user in USERS" :key="user.key" scope="col">{{ user.label }}<small v-if="user.note">{{ user.note }}</small></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in rows" :key="row.action.key">
                        <th scope="row">{{ row.action.label }}<small><code>{{ row.action.request }}</code></small></th>
                        <td v-for="cell in row.cells" :key="cell.user.key">
                            <button type="button" class="cell"
                                :class="[revealed.has(id(row, cell)) ? tone(cell.code) : 'hidden', { selected: selected?.row === row && selected?.cell.user.key === cell.user.key }]"
                                :aria-label="`${row.action.label}, ${cell.user.label}: ${revealed.has(id(row, cell)) ? cell.code : 'näita'}`"
                                @click="open(row, cell)">
                                {{ revealed.has(id(row, cell)) ? cell.code : '?' }}
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="controls">
            <span>Avatud {{ count }} / {{ total }}</span>
            <button type="button" @click="revealAll">Näita kõiki</button>
            <button type="button" :disabled="!count" @click="hideAll">Peida kõik</button>
        </div>

        <div class="detail" :class="selected && tone(selected.cell.code)" aria-live="polite">
            <template v-if="selected">
                <span class="eyebrow">{{ selected.cell.user.label.toUpperCase() }} · {{ selected.row.action.request }}</span>
                <p class="verdict"><strong>{{ selected.cell.code }}</strong> · otsustas <code>{{ selected.cell.layer }}</code></p>
                <p>{{ selected.cell.why }}</p>
            </template>
            <p v-else class="muted">Klõpsa lahtrile, et näha vastust ja selgitust.</p>
        </div>

        <div class="legend">
            <span><i class="ok" /> lubatud</span>
            <span><i class="authn" /> 401: ei tea, kes sa oled</span>
            <span><i class="authz" /> 403/404: tean, aga ei tohi</span>
        </div>
    </section>
</template>

<style scoped>
.access { margin: 24px 0; border: 1px solid var(--vp-c-divider); border-radius: 12px; overflow: hidden; background: var(--vp-c-bg); font-size: 14px; line-height: 1.6; }
.intro { padding: 24px; background: var(--vp-c-bg-soft); }
.eyebrow { font-size: 11px; font-weight: 700; letter-spacing: .06em; color: var(--vp-c-text-2); }
.access p { margin: 8px 0 0; }
.access .title { font-size: 22px; line-height: 1.35; font-weight: 700; color: var(--vp-c-text-1); }
.access :is(button):focus-visible { outline: 3px solid var(--vp-c-brand-1); outline-offset: 2px; }
.scroll { margin: 20px 24px 0; overflow-x: auto; }
.access table { display: table; width: 100%; margin: 0; border-collapse: collapse; font-size: 12px; }
.access tr { background: transparent !important; border: 0; }
.access th, .access td { padding: 4px; border: 0; border-bottom: 1px solid var(--vp-c-divider); text-align: center; vertical-align: middle; }
.access thead th { font-weight: 600; min-width: 72px; line-height: 1.3; }
.access th small { display: block; font-weight: 400; font-size: 10px; color: var(--vp-c-text-2); }
.access tbody th { text-align: left; font-weight: 600; min-width: 150px; position: sticky; left: 0; background: var(--vp-c-bg); }
.access tbody th code { font-size: 10px; }
.cell { width: 100%; min-width: 48px; height: 34px; border: 1px solid var(--vp-c-divider); border-radius: 6px; font-weight: 700; font-family: var(--vp-font-family-mono); cursor: pointer; background: var(--vp-c-bg-soft); color: var(--vp-c-text-2); }
.cell.ok { background: var(--vp-c-success-soft); color: var(--vp-c-success-1); border-color: transparent; }
.cell.authn { background: var(--vp-c-warning-soft); color: var(--vp-c-warning-1); border-color: transparent; }
.cell.authz { background: var(--vp-c-danger-soft); color: var(--vp-c-danger-1); border-color: transparent; }
.cell.selected { outline: 2px solid var(--vp-c-brand-1); outline-offset: 1px; }
.controls { margin: 12px 24px 0; display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-size: 12px; color: var(--vp-c-text-2); }
.controls span { margin-right: auto; font-variant-numeric: tabular-nums; }
.controls button { padding: 6px 12px; min-height: 36px; border: 1px solid var(--vp-c-divider); border-radius: 6px; font-weight: 600; font-size: 13px; cursor: pointer; background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); }
.controls button:disabled { opacity: .5; cursor: default; }
.detail { margin: 12px 24px 0; padding: 12px 14px; min-height: 92px; border-left: 3px solid var(--vp-c-divider); background: var(--vp-c-bg-soft); }
.detail.ok { border-left-color: var(--vp-c-success-1); }
.detail.authn { border-left-color: var(--vp-c-warning-1); }
.detail.authz { border-left-color: var(--vp-c-danger-1); }
.verdict strong { font-size: 18px; }
.muted { font-size: 12px; color: var(--vp-c-text-2); }
.legend { margin: 12px 24px 20px; display: flex; flex-wrap: wrap; gap: 6px 16px; font-size: 12px; color: var(--vp-c-text-2); }
.legend i { display: inline-block; width: 10px; height: 10px; border-radius: 3px; margin-right: 4px; vertical-align: -1px; }
.legend i.ok { background: var(--vp-c-success-1); }
.legend i.authn { background: var(--vp-c-warning-1); }
.legend i.authz { background: var(--vp-c-danger-1); }
@media (max-width: 540px) {
    .intro { padding: 18px; }
    .scroll, .controls, .detail, .legend { margin-left: 18px; margin-right: 18px; }
    .access tbody th { min-width: 120px; }
}
</style>
