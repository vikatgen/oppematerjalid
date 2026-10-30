<script setup>
import { computed, ref } from 'vue';
import { DATABASES, addMigration, compare, createState, editOldMigration, migrate, missingColumns } from './migrationSimulation.mjs';

const state = ref(createState());
const status = computed(() => compare(state.value));

const describe = op => op.type === 'createTable' ? `CREATE TABLE ${op.table} (${op.columns.join(', ')})` : `ALTER TABLE ${op.table} ADD COLUMN ${op.column}`;
const applied = (key, file) => state.value.dbs[key].applied.includes(file.id);
const isNewColumn = (table, column) => table === 'events' && column === 'image_url';
</script>

<template>
    <section class="mig-lab" aria-label="Migratsioonide katse">
        <div class="intro">
            <span class="eyebrow">KATSE · KOLM ANDMEBAASI</span>
            <p class="title">Kuidas jõuab tabeli muudatus igasse andmebaasi?</p>
            <ol class="tasks">
                <li>Käivita migratsioonid kolleegi arvutis ja serveris.</li>
                <li>Lisa üritusele veerg <code>image_url</code> <strong>uue</strong> migratsiooniga ja käivita igal pool.</li>
                <li>Vajuta „Alusta uuesti” ja tee sama, aga <strong>muuda vana faili</strong>. Mis vahe on?</li>
            </ol>
        </div>

        <div class="actions" role="group" aria-label="Muudatused failides">
            <button type="button" @click="state = addMigration(state)">+ Lisa uus migratsioon (image_url)</button>
            <button type="button" @click="state = editOldMigration(state)">✎ Muuda vana faili 0002 (image_url)</button>
            <button type="button" class="reset" @click="state = createState()">Alusta uuesti</button>
        </div>

        <div class="files">
            <span class="eyebrow">MIGRATSIOONIFAILID (KOODIS, GITIS)</span>
            <ol>
                <li v-for="file in state.files" :key="file.id" :class="{ added: file.added, edited: file.edited }">
                    <div class="file-head">
                        <code>{{ file.id }}_{{ file.name }}.sql</code>
                        <span v-if="file.added" class="tag added">uus</span>
                        <span v-if="file.edited" class="tag edited">muudetud</span>
                        <span class="dots">
                            <span v-for="(db, key) in DATABASES" :key="key" class="dot" :class="{ on: applied(key, file) }"
                                :title="`${db.label}: ${applied(key, file) ? 'rakendatud' : 'rakendamata'}`">{{ db.label.split(' ')[0] }}</span>
                        </span>
                    </div>
                    <small v-for="(op, i) in file.ops" :key="i">{{ describe(op) }}</small>
                </li>
            </ol>
        </div>

        <div class="banner" :class="status.level" aria-live="polite">{{ status.text }}</div>

        <div class="dbs">
            <article v-for="(db, key) in DATABASES" :key="key" class="db" :class="{ failed: state.dbs[key].error }">
                <header>
                    <strong>{{ db.label }}</strong>
                    <small>{{ state.dbs[key].applied.length }} / {{ state.files.length }} rakendatud</small>
                </header>
                <button type="button" @click="state = migrate(state, key)">Käivita migratsioonid</button>
                <p v-if="state.dbs[key].error" class="error">{{ state.dbs[key].error }}</p>
                <p v-if="!Object.keys(state.dbs[key].schema).length" class="muted">Andmebaas on tühi.</p>
                <dl>
                    <div v-for="(columns, table) in state.dbs[key].schema" :key="table">
                        <dt>{{ table }}</dt>
                        <dd><span v-for="column in columns" :key="column" :class="{ fresh: isNewColumn(table, column) }">{{ column }}</span></dd>
                    </div>
                </dl>
                <p v-for="column in missingColumns(state, key)" :key="column" class="missing">puudub: {{ column }}</p>
            </article>
        </div>

        <details v-if="state.log.length" class="log">
            <summary>Mis juhtus ({{ state.log.length }})</summary>
            <ol><li v-for="(line, i) in state.log" :key="i">{{ line }}</li></ol>
        </details>
        <p class="note">Iga andmebaas peab ise meeles, milliseid faile ta on juba käivitanud (Drizzle'is tabel <code>__drizzle_migrations</code>). Lihtsustatud: päris failides on täielik SQL.</p>
    </section>
</template>

<style scoped>
.mig-lab { margin: 24px 0; border: 1px solid var(--vp-c-divider); border-radius: 12px; overflow: hidden; background: var(--vp-c-bg); font-size: 14px; line-height: 1.6; }
.intro { padding: 24px; background: var(--vp-c-bg-soft); }
.eyebrow { font-size: 11px; font-weight: 700; letter-spacing: .06em; color: var(--vp-c-text-2); }
.mig-lab p { margin: 8px 0 0; }
.mig-lab .title { margin-top: 8px; font-size: 22px; line-height: 1.35; font-weight: 700; color: var(--vp-c-text-1); }
.mig-lab .tasks { margin: 8px 0 0; padding-left: 20px; font-size: 13px; }
.mig-lab :is(button, summary):focus-visible { outline: 3px solid var(--vp-c-brand-1); outline-offset: 3px; }
.mig-lab button { padding: 7px 12px; min-height: 38px; border: 1px solid var(--vp-c-divider); border-radius: 6px; font-weight: 600; font-size: 13px; cursor: pointer; background: var(--vp-c-bg-soft); }
.mig-lab button:hover { border-color: var(--vp-c-brand-1); }
.actions { margin: 20px 24px 0; display: flex; flex-wrap: wrap; gap: 8px; }
.actions .reset { background: var(--vp-c-bg); }
.files { margin: 16px 24px 0; }
.mig-lab .files ol { margin: 6px 0 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 4px; }
.files li { margin: 0; padding: 6px 10px; border: 1px solid var(--vp-c-divider); border-left: 4px solid var(--vp-c-divider); border-radius: 6px; display: grid; }
.files li.added { border-left-color: var(--vp-c-success-1); }
.files li.edited { border-left-color: var(--vp-c-danger-1); }
.file-head { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 8px; }
.file-head code { min-width: 0; font-size: 12px; overflow-wrap: anywhere; }
.files small { font-family: var(--vp-font-family-mono); font-size: 11px; color: var(--vp-c-text-2); overflow-wrap: anywhere; }
.tag { padding: 0 6px; border-radius: 4px; font-size: 11px; font-weight: 700; }
.tag.added { background: var(--vp-c-success-soft); color: var(--vp-c-success-1); }
.tag.edited { background: var(--vp-c-danger-soft); color: var(--vp-c-danger-1); }
.dots { margin-left: auto; display: flex; gap: 4px; }
.dot { padding: 0 6px; border-radius: 4px; font-size: 10px; border: 1px solid var(--vp-c-divider); color: var(--vp-c-text-3); }
.dot.on { background: var(--vp-c-brand-soft); border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
.banner { margin: 16px 24px 0; padding: 10px 14px; border-left: 3px solid var(--vp-c-warning-1); background: var(--vp-c-bg-soft); font-weight: 600; font-size: 13px; }
.banner.ok { border-left-color: var(--vp-c-success-1); }
.banner.fail { border-left-color: var(--vp-c-danger-1); color: var(--vp-c-danger-1); }
.dbs { margin: 12px 24px 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
.db { min-width: 0; padding: 10px 12px; border: 1px solid var(--vp-c-divider); border-radius: 6px; }
.db.failed { border-color: var(--vp-c-danger-1); }
.db header { display: grid; margin-bottom: 8px; }
.db header small { font-size: 11px; color: var(--vp-c-text-2); }
.db button { width: 100%; }
.mig-lab dl { margin: 8px 0 0; font-size: 11px; font-family: var(--vp-font-family-mono); }
.db dl > div { margin-top: 4px; }
.db dt { font-weight: 700; }
.db dd { margin: 0; display: flex; flex-wrap: wrap; gap: 2px 6px; color: var(--vp-c-text-2); }
.db dd .fresh { color: var(--vp-c-success-1); font-weight: 700; }
.mig-lab .error { font-size: 12px; color: var(--vp-c-danger-1); }
.mig-lab .missing { margin-top: 6px; font-size: 11px; font-weight: 700; color: var(--vp-c-danger-1); font-family: var(--vp-font-family-mono); }
.muted { font-size: 12px; color: var(--vp-c-text-2); }
.log { margin: 16px 24px 0; font-size: 12px; }
.log summary { cursor: pointer; font-weight: 600; }
.log ol { padding-left: 22px; }
.mig-lab .note { margin: 20px 24px; padding-top: 16px; border-top: 1px solid var(--vp-c-divider); font-size: 12px; color: var(--vp-c-text-2); }
@media (max-width: 720px) { .dbs { grid-template-columns: 1fr; } }
@media (max-width: 540px) {
    .intro { padding: 18px; }
    .actions, .files, .banner, .dbs, .log { margin-left: 18px; margin-right: 18px; }
    .mig-lab .note { margin-left: 18px; margin-right: 18px; }
    .dots { margin-left: 0; }
}
</style>
