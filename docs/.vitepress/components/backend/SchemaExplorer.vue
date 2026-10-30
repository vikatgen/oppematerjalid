<script setup>
import { computed, ref } from 'vue';
import { ACTIONS, TABLES, applyAction, createDb, rowId } from './schemaSimulation.mjs';

const db = ref(createDb());
const previous = ref(null);
const result = ref(null);
const history = ref([]);

function run(action) {
    const outcome = applyAction(db.value, action.key);
    previous.value = db.value;
    db.value = outcome.db;
    result.value = outcome;
    history.value = [...history.value, { label: action.label, ok: outcome.ok }];
}
function reset() {
    db.value = createDb();
    previous.value = null;
    result.value = null;
    history.value = [];
}

const changeOf = (table, id) => result.value?.changes.find(c => c.table === table && c.id === id);
const touched = table => result.value?.changes.some(c => c.table === table);

/** Kustutatud read näitame eelmisest seisust läbikriipsutatult. */
const rowsOf = computed(() => Object.fromEntries(Object.keys(TABLES).map(table => {
    const rows = db.value[table].map(row => ({ row, change: changeOf(table, rowId(table, row)) }));
    const deleted = (previous.value?.[table] ?? [])
        .filter(row => changeOf(table, rowId(table, row))?.op === 'delete')
        .map(row => ({ row, change: { op: 'delete' } }));
    return [table, [...rows, ...deleted]];
})));
</script>

<template>
    <section class="schema-x" aria-label="Andmebaasi tabelid ja seosed">
        <div class="intro">
            <span class="eyebrow">KATSE · VAJUTA TEGEVUSI JÄRJEST</span>
            <p class="title">Mis andmebaasis muutub?</p>
            <p>Iga nupp teeb ühe tegevuse. Vaata, millised read lisanduvad, muutuvad või kustuvad, ja millal andmebaas ütleb „ei”. Tegevused kuhjuvad: proovi samu nuppe ka teises järjekorras.</p>
        </div>

        <div class="actions" role="group" aria-label="Tegevused">
            <button v-for="action in ACTIONS" :key="action.key" type="button" @click="run(action)">{{ action.label }}</button>
            <button type="button" class="reset" :disabled="!history.length" @click="reset">Alusta uuesti</button>
        </div>

        <div class="message" :class="{ ok: result?.ok, fail: result && !result.ok }" aria-live="polite">
            <template v-if="result">
                <strong>{{ result.ok ? '✓' : '✕' }} {{ result.message }}</strong>
                <p>{{ result.explanation }}</p>
            </template>
            <p v-else class="muted">Vali tegevus. Esimeseks sobib „Ostja ostab 2 tavapiletit”.</p>
        </div>

        <div class="tables">
            <article v-for="(table, name) in TABLES" :key="name" class="table" :class="{ touched: touched(name) }">
                <header>
                    <code class="name">{{ table.label }}</code>
                    <span class="what">{{ table.what }}</span>
                </header>
                <p class="relations">
                    <span v-for="relation in table.relations" :key="relation">{{ relation }}</span>
                    <span v-if="!table.relations.length">Ei viita teistele tabelitele</span>
                </p>
                <div class="scroll">
                    <table>
                        <thead>
                            <tr>
                                <th v-for="column in table.columns" :key="column">
                                    {{ column }}<small v-if="table.keys[column]">{{ table.keys[column] }}</small>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="{ row, change } in rowsOf[name]" :key="rowId(name, row) + (change?.op ?? '')" :class="change?.op">
                                <td v-for="column in table.columns" :key="column"
                                    :class="{ changed: change?.op === 'update' && change.column === column }">{{ row[column] }}</td>
                            </tr>
                            <tr v-if="!rowsOf[name].length"><td :colspan="table.columns.length" class="muted">Ridu pole</td></tr>
                        </tbody>
                    </table>
                </div>
            </article>
        </div>

        <details v-if="history.length" class="history">
            <summary>Tehtud tegevused ({{ history.length }})</summary>
            <ol><li v-for="(item, i) in history" :key="i">{{ item.ok ? '✓' : '✕' }} {{ item.label }}</li></ol>
        </details>
        <p class="note">Lihtsustatud näide: päris tabelites on rohkem veerge (ajad, kirjeldused, ajatemplid) ja id-d on uuid-d. Hinnad on sentides: <code>2500</code> = 25,00 €.</p>
    </section>
</template>

<style scoped>
.schema-x { margin: 24px 0; border: 1px solid var(--vp-c-divider); border-radius: 12px; overflow: hidden; background: var(--vp-c-bg); font-size: 14px; line-height: 1.6; }
.intro { padding: 24px; background: var(--vp-c-bg-soft); }
.eyebrow { font-size: 11px; font-weight: 700; letter-spacing: .06em; color: var(--vp-c-text-2); }
.schema-x p { margin: 8px 0 0; }
.schema-x .title { font-size: 22px; line-height: 1.35; font-weight: 700; color: var(--vp-c-text-1); }
.schema-x :is(button, summary):focus-visible { outline: 3px solid var(--vp-c-brand-1); outline-offset: 3px; }
.actions { margin: 20px 24px 0; display: flex; flex-wrap: wrap; gap: 8px; }
.actions button { padding: 7px 12px; min-height: 38px; border: 1px solid var(--vp-c-divider); border-radius: 6px; font-weight: 600; font-size: 13px; cursor: pointer; background: var(--vp-c-bg-soft); text-align: left; }
.actions button:hover { border-color: var(--vp-c-brand-1); }
.actions .reset { background: var(--vp-c-bg); }
.actions button:disabled { opacity: .5; cursor: default; }
.message { margin: 16px 24px 0; padding: 12px 14px; border-left: 3px solid var(--vp-c-divider); background: var(--vp-c-bg-soft); min-height: 64px; }
.message.ok { border-left-color: var(--vp-c-success-1); }
.message.fail { border-left-color: var(--vp-c-danger-1); }
.message.ok strong { color: var(--vp-c-success-1); }
.message.fail strong { color: var(--vp-c-danger-1); }
.message p { font-size: 13px; }
.tables { margin: 16px 24px 0; display: flex; flex-direction: column; gap: 8px; }
.table { min-width: 0; border: 1px solid var(--vp-c-divider); border-left: 4px solid var(--vp-c-divider); border-radius: 6px; padding: 10px 12px; transition: border-color .2s; }
.table.touched { border-left-color: var(--vp-c-brand-1); }
.table header { display: flex; flex-wrap: wrap; gap: 4px 10px; align-items: baseline; }
.name { font-weight: 700; }
.what { font-size: 12px; color: var(--vp-c-text-2); }
.schema-x .relations { margin: 4px 0 0; display: flex; flex-wrap: wrap; gap: 4px 12px; font-size: 11px; color: var(--vp-c-text-2); font-family: var(--vp-font-family-mono); }
.scroll { overflow-x: auto; margin-top: 6px; }
.schema-x table { display: table; width: 100%; margin: 0; font-size: 12px; border-collapse: collapse; }
.schema-x th, .schema-x td { padding: 4px 8px; border: 0; border-bottom: 1px solid var(--vp-c-divider); text-align: left; white-space: nowrap; font-family: var(--vp-font-family-mono); }
.schema-x tr { background: transparent !important; border: 0; }
.schema-x th { color: var(--vp-c-text-2); font-weight: 600; }
.schema-x th small { margin-left: 4px; padding: 0 4px; border-radius: 3px; background: var(--vp-c-default-soft); font-size: 10px; }
tr.insert td { background: var(--vp-c-success-soft); }
tr.delete td { background: var(--vp-c-danger-soft); text-decoration: line-through; color: var(--vp-c-text-2); }
td.changed { background: var(--vp-c-warning-soft); font-weight: 700; }
.muted { font-size: 12px; color: var(--vp-c-text-2); }
.history { margin: 16px 24px 0; font-size: 12px; }
.history summary { cursor: pointer; font-weight: 600; }
.history ol { padding-left: 22px; }
.schema-x .note { margin: 20px 24px; padding-top: 16px; border-top: 1px solid var(--vp-c-divider); font-size: 12px; color: var(--vp-c-text-2); }
@media (prefers-reduced-motion: reduce) { .table { transition: none; } }
@media (max-width: 540px) {
    .intro { padding: 18px; }
    .actions, .message, .tables, .history { margin-left: 18px; margin-right: 18px; }
    .schema-x .note { margin-left: 18px; margin-right: 18px; }
}
</style>
