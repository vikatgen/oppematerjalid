// A deterministic teaching model of database migrations (drizzle-kit style).
// Each database remembers which migration files it has applied (Drizzle keeps them in the
// __drizzle_migrations table) and runs only the new ones, in order. An already applied file is
// never run again, so editing it later changes nothing in that database (Drizzle does not compare
// checksums). A migration that fails stops the run; earlier ones stay applied.

export const DATABASES = {
    mine: { label: 'Sinu arvuti', hint: 'kõik senised migratsioonid rakendatud' },
    colleague: { label: 'Kolleegi arvuti', hint: 'uus arvuti, tühi andmebaas' },
    production: { label: 'Server (päris andmed)', hint: 'viimane migratsioon rakendamata' },
};

const NEW_COLUMN = { table: 'events', column: 'image_url' };

function initialFiles() {
    return [
        { id: '0001', name: 'create_users_table', ops: [{ type: 'createTable', table: 'users', columns: ['id', 'name', 'email', 'role'] }] },
        { id: '0002', name: 'create_events_table', ops: [{ type: 'createTable', table: 'events', columns: ['id', 'title', 'status', 'organizer_id'] }] },
        { id: '0003', name: 'create_ticket_types_table', ops: [{ type: 'createTable', table: 'ticket_types', columns: ['id', 'event_id', 'name', 'price_cents', 'capacity', 'sold'] }] },
        { id: '0004', name: 'create_orders_and_tickets_tables', ops: [
            { type: 'createTable', table: 'orders', columns: ['id', 'user_id', 'event_id', 'status', 'total_cents'] },
            { type: 'createTable', table: 'tickets', columns: ['id', 'order_id', 'ticket_type_id', 'price_cents', 'status'] },
        ] },
        { id: '0005', name: 'add_payment_id_to_orders', ops: [{ type: 'addColumn', table: 'orders', column: 'payment_id' }] },
    ];
}

const clone = value => JSON.parse(JSON.stringify(value));

function runOps(schema, ops) {
    const next = clone(schema);
    for (const op of ops) {
        if (op.type === 'createTable') {
            if (next[op.table]) return { error: `tabel "${op.table}" on juba olemas` };
            next[op.table] = [...op.columns];
        } else if (op.type === 'addColumn') {
            if (!next[op.table]) return { error: `tabelit "${op.table}" pole` };
            if (next[op.table].includes(op.column)) return { error: `veerg "${op.table}.${op.column}" on juba olemas` };
            next[op.table].push(op.column);
        }
    }
    return { schema: next };
}

function applyFiles(db, files) {
    let current = { applied: [...db.applied], schema: clone(db.schema), error: null };
    for (const file of files) {
        if (current.applied.includes(file.id)) continue;
        const result = runOps(current.schema, file.ops);
        if (result.error) return { ...current, error: `Migratsioon ${file.id} kukkus läbi: ${result.error}. Järgmisi ei käivitatud.` };
        current = { ...current, applied: [...current.applied, file.id], schema: result.schema };
    }
    return current;
}

export function createState() {
    const files = initialFiles();
    const empty = { applied: [], schema: {}, error: null };
    return {
        files,
        dbs: {
            mine: applyFiles(empty, files),
            colleague: clone(empty),
            production: applyFiles(empty, files.slice(0, 4)),
        },
        log: [],
    };
}

export function migrate(state, key) {
    const next = clone(state);
    const before = next.dbs[key].applied.length;
    next.dbs[key] = applyFiles(next.dbs[key], next.files);
    const ran = next.dbs[key].applied.length - before;
    next.log.push(next.dbs[key].error
        ? `${DATABASES[key].label}: ${next.dbs[key].error}`
        : `${DATABASES[key].label}: ${ran ? `rakendati ${ran} migratsioon(i)` : 'midagi polnud teha, kõik on juba rakendatud'}.`);
    return next;
}

export function addMigration(state) {
    const next = clone(state);
    if (next.files.some(f => f.name === 'add_image_url_to_events')) return next;
    const id = String(next.files.length + 1).padStart(4, '0');
    next.files.push({ id, name: 'add_image_url_to_events', ops: [{ type: 'addColumn', ...NEW_COLUMN }], added: true });
    next.log.push(`Lisati uus fail ${id}_add_image_url_to_events.sql. Vanad failid jäid samaks.`);
    return next;
}

export function editOldMigration(state) {
    const next = clone(state);
    const file = next.files.find(f => f.id === '0002');
    if (file.edited) return next;
    file.ops[0].columns.push(NEW_COLUMN.column);
    file.edited = true;
    next.log.push('Muudeti vana faili 0002_create_events_table.sql: lisati veerg image_url.');
    return next;
}

/** Overall status for the banner. */
export function compare(state) {
    const keys = Object.keys(state.dbs);
    const behind = keys.filter(k => state.dbs[k].applied.length < state.files.length);
    const failed = keys.filter(k => state.dbs[k].error);
    const schemas = keys.map(k => JSON.stringify(state.dbs[k].schema));
    const same = schemas.every(s => s === schemas[0]);
    if (failed.length) return { level: 'fail', text: `${failed.map(k => DATABASES[k].label).join(', ')}: migratsioon kukkus läbi.` };
    if (behind.length) return { level: 'pending', text: `Rakendamata migratsioone: ${behind.map(k => DATABASES[k].label).join(', ')}.` };
    if (!same) return { level: 'fail', text: 'Kõik migratsioonid on rakendatud, aga andmebaasid on ERINEVAD. Keegi ei saa sellest teada enne, kui midagi katki läheb.' };
    return { level: 'ok', text: 'Kõik andmebaasid on ajakohased ja ühesugused.' };
}

/** Columns that exist in some database but not in this one. */
export function missingColumns(state, key) {
    const all = new Set(Object.values(state.dbs).flatMap(db => Object.entries(db.schema).flatMap(([t, cols]) => cols.map(c => `${t}.${c}`))));
    const own = new Set(Object.entries(state.dbs[key].schema).flatMap(([t, cols]) => cols.map(c => `${t}.${c}`)));
    return [...all].filter(c => !own.has(c));
}
