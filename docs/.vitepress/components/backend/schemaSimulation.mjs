// A deterministic teaching model of the event-management-api tables (simplified columns).
// Mirrors the real schema: primary keys, foreign keys with cascade/restrict, check constraint
// sold <= capacity (the reservation UPDATE only matches when the tickets fit),
// event_staff primary key on (event_id, user_id).

export const TABLES = {
    users: {
        label: 'users', what: 'Kasutajad',
        columns: ['id', 'name', 'role'],
        keys: { id: 'PK' },
        relations: [],
    },
    events: {
        label: 'events', what: 'Üritused',
        columns: ['id', 'title', 'status', 'organizer_id'],
        keys: { id: 'PK', organizer_id: 'FK' },
        relations: ['organizer_id → users.id (restrict)'],
    },
    ticket_types: {
        label: 'ticket_types', what: 'Piletitüübid',
        columns: ['id', 'event_id', 'name', 'price_cents', 'capacity', 'sold'],
        keys: { id: 'PK', event_id: 'FK' },
        relations: ['event_id → events.id (cascade)', 'check: sold ≤ capacity'],
    },
    orders: {
        label: 'orders', what: 'Tellimused',
        columns: ['id', 'user_id', 'event_id', 'status', 'total_cents'],
        keys: { id: 'PK', user_id: 'FK', event_id: 'FK' },
        relations: ['user_id → users.id (restrict)', 'event_id → events.id (restrict)'],
    },
    tickets: {
        label: 'tickets', what: 'Piletid',
        columns: ['id', 'order_id', 'ticket_type_id', 'price_cents', 'status'],
        keys: { id: 'PK', order_id: 'FK', ticket_type_id: 'FK' },
        relations: ['order_id → orders.id (restrict)', 'ticket_type_id → ticket_types.id (restrict)'],
    },
    event_staff: {
        label: 'event_staff', what: 'Turvamehed üritustel',
        columns: ['event_id', 'user_id'],
        keys: { event_id: 'PK, FK', user_id: 'PK, FK' },
        relations: ['event_id → events.id (cascade)', 'user_id → users.id (cascade)', 'PK: (event_id, user_id) paar'],
    },
};

export function createDb() {
    return {
        users: [
            { id: 'u1', name: 'Korraldaja', role: 'organizer' },
            { id: 'u2', name: 'Ostja', role: 'attendee' },
            { id: 'u3', name: 'Turvamees', role: 'security' },
        ],
        events: [
            { id: 'e1', title: 'Sügiskontsert', status: 'published', organizer_id: 'u1' },
            { id: 'e2', title: 'Talvekontsert', status: 'draft', organizer_id: 'u1' },
        ],
        ticket_types: [
            { id: 'tt1', event_id: 'e1', name: 'Tavapilet', price_cents: 2500, capacity: 100, sold: 1 },
            { id: 'tt2', event_id: 'e1', name: 'VIP', price_cents: 6000, capacity: 2, sold: 1 },
            { id: 'tt3', event_id: 'e2', name: 'Tavapilet', price_cents: 2000, capacity: 50, sold: 0 },
        ],
        orders: [
            { id: 'o1', user_id: 'u2', event_id: 'e1', status: 'paid', total_cents: 8500 },
        ],
        tickets: [
            { id: 't1', order_id: 'o1', ticket_type_id: 'tt1', price_cents: 2500, status: 'active' },
            { id: 't2', order_id: 'o1', ticket_type_id: 'tt2', price_cents: 6000, status: 'active' },
        ],
        event_staff: [
            { event_id: 'e1', user_id: 'u3' },
        ],
    };
}

export const ACTIONS = [
    { key: 'buy', label: 'Ostja ostab 2 tavapiletit (Sügiskontsert)' },
    { key: 'buyVip', label: 'Ostja ostab 2 VIP-piletit' },
    { key: 'staff', label: 'Lisa turvamees Talvekontserdile' },
    { key: 'deleteDraft', label: 'Kustuta Talvekontsert (mustand)' },
    { key: 'deleteEvent', label: 'Kustuta Sügiskontsert' },
    { key: 'deleteUser', label: 'Kustuta ostja konto' },
];

const clone = db => JSON.parse(JSON.stringify(db));
const nextId = (rows, prefix) => `${prefix}${rows.length ? Math.max(...rows.map(r => Number(r.id.slice(prefix.length)))) + 1 : 1}`;
const fail = (db, message, explanation) => ({ db, ok: false, changes: [], message, explanation });

/** Who references this row with `restrict`? Those rows block deletion. */
function blockers(db, table, id) {
    const refs = {
        users: [['events', 'organizer_id'], ['orders', 'user_id']],
        events: [['orders', 'event_id']],
        ticket_types: [['tickets', 'ticket_type_id']],
        orders: [['tickets', 'order_id']],
    }[table] ?? [];
    return refs.flatMap(([t, col]) => db[t].filter(r => r[col] === id).map(r => ({ table: t, id: r.id, col })));
}

export function applyAction(current, key) {
    const db = clone(current);
    const changes = [];

    switch (key) {
        case 'buy':
        case 'buyVip': {
            const typeId = key === 'buy' ? 'tt1' : 'tt2';
            const type = db.ticket_types.find(t => t.id === typeId);
            if (!type) return fail(current, 'Piletitüüpi pole', 'Seda piletitüüpi enam ei ole.');
            const event = db.events.find(e => e.id === type.event_id);
            if (!db.users.some(u => u.id === 'u2')) {
                return fail(current, 'Võõrvõtme viga', 'Ostja kontot pole: orders.user_id peab viitama olemasolevale kasutajale.');
            }
            if (type.sold + 2 > type.capacity) {
                return fail(current, `Ei mahu: ${type.name} alles ${type.capacity - type.sold}`,
                    `UPDATE ... SET sold = sold + 2 WHERE sold + 2 <= capacity ei leidnud ühtegi rida (${type.sold} + 2 > ${type.capacity}). Kuna kõik käib ühes tehingus, ei looda ka tellimust ega pileteid. Andmebaasis on lisaks piirang sold ≤ capacity, mis ei lase vigast arvu isegi koodivea korral salvestada.`);
            }
            type.sold += 2;
            changes.push({ table: 'ticket_types', op: 'update', id: type.id, column: 'sold' });
            const orderId = nextId(db.orders, 'o');
            db.orders.push({ id: orderId, user_id: 'u2', event_id: event.id, status: 'pending', total_cents: type.price_cents * 2 });
            changes.push({ table: 'orders', op: 'insert', id: orderId });
            for (let i = 0; i < 2; i++) {
                const ticketId = nextId(db.tickets, 't');
                db.tickets.push({ id: ticketId, order_id: orderId, ticket_type_id: type.id, price_cents: type.price_cents, status: 'pending' });
                changes.push({ table: 'tickets', op: 'insert', id: ticketId });
            }
            return { db, ok: true, changes, message: 'Ost õnnestus: 3 tabelit muutus',
                explanation: `Ühe ostuga muutub kolm tabelit: ticket_types (sold kasvab), orders (uus tellimus, viitab kasutajale ja üritusele) ja tickets (kaks rida, mõlemad viitavad tellimusele ${orderId} ja piletitüübile ${type.id}). Pileti hind kopeeritakse ostu hetkel: kui korraldaja hiljem hinda muudab, ostetud pilet ei muutu.` };
        }
        case 'staff': {
            if (!db.events.some(e => e.id === 'e2')) {
                return fail(current, 'Võõrvõtme viga: üritust pole',
                    'event_staff.event_id peab viitama olemasolevale üritusele. Talvekontsert on kustutatud, seega andmebaas ei luba rida lisada.');
            }
            if (db.event_staff.some(s => s.event_id === 'e2' && s.user_id === 'u3')) {
                return fail(current, 'Primaarvõtme viga: paar on juba olemas',
                    'event_staff primaarvõti on paar (event_id, user_id). Sama turvameest ei saa samale üritusele teist korda lisada.');
            }
            db.event_staff.push({ event_id: 'e2', user_id: 'u3' });
            changes.push({ table: 'event_staff', op: 'insert', id: 'e2|u3' });
            return { db, ok: true, changes, message: 'Turvamees lisatud',
                explanation: 'Mitu-mitmele seos: üks turvamees võib olla mitmel üritusel ja ühel üritusel mitu turvameest. Selleks on vahetabel event_staff, kus iga rida on üks paar. Proovi sama nuppu uuesti.' };
        }
        case 'deleteDraft':
        case 'deleteEvent': {
            const id = key === 'deleteDraft' ? 'e2' : 'e1';
            const event = db.events.find(e => e.id === id);
            if (!event) return fail(current, 'Üritust pole', 'See üritus on juba kustutatud.');
            const blocked = blockers(db, 'events', id);
            if (blocked.length) {
                return fail(current, 'Kustutamine keelatud (restrict)',
                    `${blocked.length} tellimus(t) viitab sellele üritusele (orders.event_id, restrict). Andmebaas ei lase kustutada rida, millele teised read viitavad: muidu jääksid tellimused "orvuks". Avaldatud üritus tühistatakse, mitte ei kustutata.`);
            }
            const types = db.ticket_types.filter(t => t.event_id === id);
            const typeBlockers = types.flatMap(t => blockers(db, 'ticket_types', t.id));
            if (typeBlockers.length) {
                return fail(current, 'Kustutamine keelatud (restrict)', 'Piletitüüpidel on pileteid (tickets.ticket_type_id, restrict).');
            }
            db.events = db.events.filter(e => e.id !== id);
            changes.push({ table: 'events', op: 'delete', id });
            for (const t of types) changes.push({ table: 'ticket_types', op: 'delete', id: t.id });
            db.ticket_types = db.ticket_types.filter(t => t.event_id !== id);
            for (const s of db.event_staff.filter(s => s.event_id === id)) changes.push({ table: 'event_staff', op: 'delete', id: `${s.event_id}|${s.user_id}` });
            db.event_staff = db.event_staff.filter(s => s.event_id !== id);
            return { db, ok: true, changes, message: 'Kustutatud koos seotud ridadega (cascade)',
                explanation: 'Mustandil pole tellimusi. Piletitüübid ja turvamehe seosed on seotud cascade-reegliga: need kustutatakse automaatselt koos üritusega, sest ilma ürituseta pole neil mõtet.' };
        }
        case 'deleteUser': {
            const blocked = blockers(db, 'users', 'u2');
            if (!db.users.some(u => u.id === 'u2')) return fail(current, 'Kasutajat pole', 'Ostja konto on juba kustutatud.');
            if (blocked.length) {
                return fail(current, 'Kustutamine keelatud (restrict)',
                    `Ostjal on ${blocked.length} tellimus(t) (orders.user_id, restrict). Tellimused on raamatupidamise andmed: neid ei tohi koos kontoga kaotada.`);
            }
            db.users = db.users.filter(u => u.id !== 'u2');
            changes.push({ table: 'users', op: 'delete', id: 'u2' });
            return { db, ok: true, changes, message: 'Konto kustutatud', explanation: 'Ostjal polnud tellimusi, seega miski ei viidanud talle.' };
        }
        default:
            throw new Error(`Tundmatu tegevus: ${key}`);
    }
}

/** Row identity used to highlight changes (event_staff has no id column). */
export const rowId = (table, row) => table === 'event_staff' ? `${row.event_id}|${row.user_id}` : row.id;
