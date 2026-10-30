// A deterministic teaching model: no requests are sent to a real backend.
// Mirrors event-management-api: public routes (no auth), /api/events (requireAuth → requireRole),
// uuid validation (400), draft/missing → 404, unexpected errors → 500 "Serveri viga".
export const EVENT_ID = '7f3c9a2e-41d8-4b6a-9c1e-2f5d8b0a4c42';
export const SHORT_ID = '7f3c9a2e…';

export const REQUESTS = {
    'public-list': { path: '/api/public/events', label: 'Avalik ürituste nimekiri' },
    'public-published': { path: `/api/public/events/${SHORT_ID}`, label: 'Üks avaldatud üritus' },
    'public-draft': { path: `/api/public/events/${SHORT_ID}`, label: 'Üks mustandis üritus' },
    'public-missing': { path: '/api/public/events/0b1e…', label: 'Olematu üritus' },
    'public-invalid': { path: '/api/public/events/abc', label: 'Vigane id (abc)' },
    'manage-list': { path: '/api/events', label: 'Korraldaja enda üritused' },
};

const publicEvent = { id: EVENT_ID, title: 'Sügiskontsert', city: 'Kuressaare', startsAt: '2026-11-14T18:00:00.000Z' };

export function simulateRequest({ request, session, db }) {
    const steps = [];
    const add = (layer, title, explanation, extra = {}) => steps.push({ layer, title, explanation, ...extra });
    const isPublic = request !== 'manage-list';
    const finish = (code, body, explanation) => {
        add('Server', `Saada vastus: ${code}`, explanation, { response: { code, body } });
        add('Brauser', code < 400 ? 'Joonista leht' : 'Näita veateadet',
            code < 400
                ? 'Brauser saab JSON-i ja teeb sellest ekraanil oleva lehe. Server ei tea, mis brauseris edasi toimub.'
                : 'Brauser saab staatusekoodi ja veateate. Frontend otsustab, kuidas viga kasutajale näidata.');
        return { steps, code, reachedDb: steps.some(step => step.layer === 'Andmebaas') };
    };
    const reject = (layer, code, error, title, explanation, extraBody = {}) => {
        add(layer, title, explanation, { rejected: true });
        return finish(code, { error, ...extraBody }, code === 500
            ? 'Kliendile läheb ainult üldine teade. Päris veateade (võib sisaldada SQL-i) läheb serveri logisse.'
            : 'Veatöötlus muudab vea staatusekoodiga vastuseks. Edasist tööd ei tehta.');
    };
    const dbDown = (what) => reject('Andmebaas', 500, 'Serveri viga', 'Andmebaas ei vasta',
        `Server proovis ${what}, aga andmebaas ei vastanud. See ei ole kliendi viga, seega 5xx.`);

    add('Brauser', 'Koosta päring',
        session === 'none'
            ? `GET ${REQUESTS[request].path}. Küpsist pole, sest kasutaja pole sisse loginud.`
            : `GET ${REQUESTS[request].path}. Brauser lisab sessiooni küpsise ise, igale päringule, ka siis, kui seda pole vaja.`);

    add('Server', 'Leia aadressile tegevus', isPublic
        ? 'Avalik aadress (/api/public/...): sisselogimist ei kontrollita. Kui küpsis tuli kaasa, server seda siin ei vaata.'
        : 'Kaitstud aadress (/api/events): enne tööd kontrollitakse sisselogimist ja rolli.');

    if (!isPublic) {
        if (session === 'none') {
            return reject('Server', 401, 'Pole sisse logitud', 'Kontrolli sisselogimist',
                'Päringus pole sessiooni küpsist. Server ei tea, kes sa oled. Andmebaasi pole vaja küsida.');
        }
        add('Server', 'Kontrolli sisselogimist',
            'Küpsises on sessiooni tunnus. Server ei mäleta eelmist päringut, seega peab ta tunnuse igal korral uuesti üle kontrollima.');
        if (db === 'down') return dbDown('sessiooni leida');
        add('Andmebaas', 'Leia sessioon ja kasutaja',
            `Sessioon kehtib. Kasutaja on ${session === 'buyer' ? 'ostja (buyer-1)' : 'korraldaja (organizer-1)'}.`, { read: true });
        if (session === 'buyer') {
            return reject('Server', 403, 'Puudub õigus', 'Kontrolli rolli',
                'Server teab nüüd, kes sa oled, aga ostja ei tohi korraldaja nimekirja näha. Uuesti sisselogimine ei aita, seega 403, mitte 401.');
        }
        add('Server', 'Kontrolli rolli', 'Kasutajal on korraldaja roll. Võib jätkata.');
        add('Server', 'Loe lehekülje parameetrid', 'Aadressis pole ?limit= ega ?offset=, seega võetakse vaikimisi esimesed 20 üritust.');
        add('Andmebaas', 'Leia korraldaja üritused', 'Ainult need üritused, mille omanik on organizer-1, ka mustandid.', { read: true });
        add('Server', 'Vali vastuse väljad', 'Korraldaja näeb ka ürituse olekut (mustand, avaldatud).');
        return finish(200, [{ ...publicEvent, status: 'published' }, { id: '0c2d…', title: 'Talvekontsert', city: 'Kuressaare', startsAt: '2026-12-20T18:00:00.000Z', status: 'draft' }],
            'Kõik õnnestus. Vastuses on JSON-kujul üritused.');
    }

    if (request === 'public-list') {
        add('Server', 'Loe lehekülje parameetrid', 'Aadressis pole ?limit= ega ?offset=, seega võetakse vaikimisi esimesed 20 üritust.');
        if (db === 'down') return dbDown('üritusi lugeda');
        add('Andmebaas', 'Leia avaldatud üritused', 'Mustandeid ja tühistatud üritusi avalikku nimekirja ei võeta.', { read: true });
        add('Server', 'Vali avalikud väljad', 'Korraldaja id, olek ja ajatemplid jäetakse välja: need on sisemised andmed.');
        return finish(200, [publicEvent], 'Kõik õnnestus. Vastuses on JSON-kujul üritused.');
    }

    if (request === 'public-invalid') {
        return reject('Server', 400, 'Vigane päring', 'Kontrolli id kuju',
            'Id peab olema uuid (nt 7f3c9a2e-41d8-…). „abc” ei ole. Server ei viitsi andmebaasilt küsidagi: vastus on kohe 400.',
            { details: { id: ['Invalid UUID'] } });
    }

    add('Server', 'Kontrolli id kuju', 'Id on uuid-kujul. Võib andmebaasist otsida.');
    if (db === 'down') return dbDown('üritust leida');
    if (request === 'public-missing') {
        add('Andmebaas', 'Otsi üritus', 'Sellise id-ga rida pole. Andmebaas tagastab tühja tulemuse, see ei ole viga.', { read: true });
        return reject('Server', 404, 'Üritust ei leitud', 'Otsusta, mis tühi tulemus tähendab',
            'Andmebaasi jaoks on tühi tulemus normaalne. Rakendus otsustab, et kliendile on see 404.');
    }
    add('Andmebaas', 'Otsi üritus', request === 'public-draft'
        ? 'Üritus leiti, aga selle olek on mustand (draft).'
        : 'Üritus leiti, olek on avaldatud (published).', { read: true });
    if (request === 'public-draft') {
        return reject('Server', 404, 'Üritust ei leitud', 'Kontrolli, kas üritus on avalik',
            'Mustand ei ole avalik. Server vastab 404, mitte 403: 403 reedaks, et selline üritus on olemas.');
    }
    add('Server', 'Vali avalikud väljad', 'Korraldaja id, olek ja ajatemplid jäetakse välja.');
    return finish(200, publicEvent, 'Kõik õnnestus. Vastuses on üks üritus JSON-kujul.');
}
