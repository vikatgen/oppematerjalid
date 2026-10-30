// A deterministic teaching model of concurrency and transactions (PostgreSQL, READ COMMITTED).
// Mirrors event-management-api: the reservation is ONE conditional statement
//   UPDATE ticket_types SET sold = sold + n WHERE id = ? AND sold + n <= capacity RETURNING *
// which locks the row; a second UPDATE on the same row waits and re-checks the WHERE after the
// first transaction commits. All rows of one order are reserved inside one transaction (ROLLBACK on failure).

export const SCENARIOS = {
    race: 'Kaks ostjat, viimane pilet',
    allOrNothing: 'Üks tellimus, kaks piletitüüpi (VIP otsas)',
};

const snapshot = (types, orders, extra = {}) => ({ types: types.map(t => ({ ...t })), orders: [...orders], ...extra });

function race(protection) {
    const steps = [];
    const types = [{ name: 'Tavapilet', capacity: 100, sold: 99 }];
    const orders = [];
    const add = (layer, title, explanation, { db, ...extra } = {}) =>
        steps.push({ layer, title, explanation, ...extra, db: snapshot(types, orders, db) });

    add('Ostja A', 'Vajutab „Osta”', 'Saalis on 100 kohta, müüdud 99. Alles on täpselt üks pilet.');
    add('Ostja B', 'Vajutab „Osta” samal hetkel', 'Kaks päringut jõuavad serverisse peaaegu korraga. Server teenindab neid paralleelselt.');

    if (protection === 'none') {
        add('Andmebaas', 'A loeb: sold = 99', 'SELECT sold FROM ticket_types. Kood kavatseb ise kontrollida ja siis kirjutada.', { read: true });
        add('Andmebaas', 'B loeb: sold = 99', 'A pole veel kirjutanud, seega näeb ka B arvu 99.', { read: true });
        add('Ostja A', 'Kontrollib koodis: 99 + 1 ≤ 100 ✓', 'A arvates on üks pilet alles.');
        add('Ostja B', 'Kontrollib koodis: 99 + 1 ≤ 100 ✓', 'B arvates on ka üks pilet alles. Mõlemad otsustasid vana info põhjal.');
        types[0].sold = 100; orders.push('A');
        add('Andmebaas', 'A kirjutab sold = 100 ja loob tellimuse', 'UPDATE ... SET sold = 100. A tellimus on olemas.', { write: true });
        orders.push('B');
        add('Andmebaas', 'B kirjutab sold = 100 ja loob tellimuse', 'B arvutas samuti 99 + 1 = 100 ja kirjutas selle üle. A muudatus kadus (lost update). Loendur ütleb 100, aga müüdud on 101 piletit.', { write: true, rejected: true });
        add('Ostja A', 'Mõlemad saavad 201', 'Kaks inimest tulevad viimasele kohale. Loendur valetab, seega ei märka seda ka keegi teine.',
            { response: { code: '201 + 201', body: { A: '201 Created', B: '201 Created', müüdud: 101, kohti: 100 } } });
        return { steps, orders: 2, consistent: false };
    }

    types[0].sold = 100;
    add('Andmebaas', 'A: UPDATE … WHERE sold + 1 ≤ capacity', 'Lugemine, kontroll ja kirjutamine on ÜKS lause. Andmebaas lukustab rea: sold = 100. A tehing pole veel lõppenud.', { write: true, db: { locked: 'A' } });
    add('Andmebaas', 'B: sama UPDATE, rida on lukus', 'B lause peab ootama, kuni A tehing lõpeb. B ei saa vahepeal vana väärtust lugeda.', { db: { locked: 'A', waiting: 'B' } });
    orders.push('A');
    add('Andmebaas', 'A loob tellimuse ja COMMIT', 'A tehing on lõppenud, lukk vabaneb.', { write: true });
    add('Andmebaas', 'B UPDATE jätkub: 100 + 1 > 100', 'Andmebaas kontrollib tingimust uuesti uue väärtusega. Ükski rida ei sobi, midagi ei muutu.', { read: true });
    add('Ostja B', 'Ei mahtunud → 409', 'Service näeb, et UPDATE ei muutnud ühtegi rida, ja vastab „Piletitüüpi ei ole piisavalt alles”.', { rejected: true });
    add('Ostja A', 'A saab 201, B saab 409', 'Viimane pilet läks täpselt ühele ostjale. Loendur ja tellimused klapivad.',
        { response: { code: '201 + 409', body: { A: '201 Created', B: '409 Conflict', müüdud: 100, kohti: 100 } } });
    return { steps, orders: 1, consistent: true };
}

function allOrNothing(protection) {
    const steps = [];
    const types = [{ name: 'Tavapilet', capacity: 100, sold: 50 }, { name: 'VIP', capacity: 10, sold: 10 }];
    const orders = [];
    const add = (layer, title, explanation, { db, ...extra } = {}) =>
        steps.push({ layer, title, explanation, ...extra, db: snapshot(types, orders, db) });

    add('Ostja A', 'Tellib 1 tavapileti + 1 VIP', 'VIP on välja müüdud (10/10). Tellimus ei saa õnnestuda. Küsimus on: mis jääb andmebaasi maha?');

    if (protection === 'none') {
        types[0].sold = 51;
        add('Andmebaas', 'Tavapilet: sold 50 → 51 ✓', 'Ilma tehinguta salvestub iga lause kohe ja lõplikult.', { write: true });
        add('Andmebaas', 'VIP: 10 + 1 > 10 → 0 rida', 'VIP ei mahu. Tellimust ei looda.', { rejected: true });
        add('Ostja A', 'Service viskab vea → 409', 'Ostja saab teate, et VIP on otsas.');
        add('Andmebaas', 'Tavapilet jääb 51', 'Üks koht on loendis „müüdud”, aga sellel pole tellimust ega piletit. Seda kohta ei saa enam keegi osta.',
            { rejected: true, response: { code: 409, body: { error: 'Piletitüüpi "VIP" ei ole piisavalt alles', tavapilet: '51/100 (peaks olema 50)' } } });
        return { steps, orders: 0, consistent: false };
    }

    add('Andmebaas', 'BEGIN: tehing algab', 'Kõik järgmised laused kuuluvad ühte tervikusse: kas kõik õnnestuvad või ei jää alles midagi.', { db: { tx: true } });
    types[0].sold = 51;
    add('Andmebaas', 'Tavapilet: sold 50 → 51 (tehingu sees)', 'Muudatus on tehtud, aga ainult selles tehingus. Teised ei näe seda enne COMMIT-i.', { write: true, db: { tx: true } });
    add('Andmebaas', 'VIP: 10 + 1 > 10 → 0 rida', 'VIP ei mahu. Service viskab vea tehingu sees.', { rejected: true, db: { tx: true } });
    types[0].sold = 50;
    add('Andmebaas', 'ROLLBACK', 'Viga tehingu sees → andmebaas tühistab KÕIK selle tehingu muudatused. Tavapilet on jälle 50.', { write: true });
    add('Ostja A', '409, andmed korras', 'Ostja saab sama veateate, aga andmebaasi ei jäänud midagi poolikut.',
        { response: { code: 409, body: { error: 'Piletitüüpi "VIP" ei ole piisavalt alles', tavapilet: '50/100' } } });
    return { steps, orders: 0, consistent: true };
}

export function simulateTransaction({ scenario, protection }) {
    return scenario === 'race' ? race(protection) : allOrNothing(protection);
}
