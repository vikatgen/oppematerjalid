// A deterministic teaching model of POST /api/events with a simplified createEventDto
// (5 of the 11 real fields). Mirrors event-management-api: zod z.object strips unknown keys,
// field errors → 400 { error, details }, date order refine runs after the fields are valid,
// organizerId comes from the session, status defaults to "draft", 201 + organizer response.
export const ORGANIZER_ID = 'organizer-1';
export const NEW_ID = '7f3c9a2e-41d8-4b6a-9c1e-2f5d8b0a4c42';
export const NOW = '2026-10-30T10:00:00.000Z';

/** Fields of the (simplified) input DTO, in display order. */
export const DTO_FIELDS = [
    { name: 'title', required: true, hint: 'tekst, 1–255 märki' },
    { name: 'city', required: true, hint: 'tekst, 1–100 märki' },
    { name: 'imageUrl', required: false, hint: 'valikuline, veebiaadress' },
    { name: 'startsAt', required: true, hint: 'ISO kuupäev' },
    { name: 'endsAt', required: true, hint: 'ISO kuupäev, pärast algust' },
];

/** Fields the server sets itself: sending them changes nothing. */
const SERVER_FIELDS = {
    id: 'andmebaas loob ise',
    organizerId: 'võetakse sisselogitud kasutajalt',
    status: 'uus üritus on alati mustand',
    createdAt: 'andmebaas paneb ise',
    updatedAt: 'andmebaas paneb ise',
};

/** Who sees which column of the stored row. */
export const ROW_FIELDS = [
    { name: 'id', organizer: true, public: true },
    { name: 'title', organizer: true, public: true },
    { name: 'city', organizer: true, public: true },
    { name: 'imageUrl', organizer: true, public: true },
    { name: 'startsAt', organizer: true, public: true },
    { name: 'endsAt', organizer: true, public: true },
    { name: 'organizerId', organizer: true, public: false },
    { name: 'status', organizer: true, public: false },
    { name: 'createdAt', organizer: true, public: false },
    { name: 'updatedAt', organizer: true, public: false },
];

const base = {
    title: 'Sügiskontsert',
    city: 'Kuressaare',
    startsAt: '2026-11-14T18:00:00Z',
    endsAt: '2026-11-14T21:00:00Z',
};

export const PRESETS = [
    { key: 'valid', label: 'Korrektne', body: base },
    { key: 'extra', label: 'Liigsed väljad', body: { ...base, status: 'published', organizerId: 'organizer-2', isFree: true } },
    { key: 'missing', label: 'Puuduv pealkiri', body: { city: base.city, startsAt: base.startsAt, endsAt: base.endsAt } },
    { key: 'types', label: 'Vale tüüp', body: { ...base, title: 123, startsAt: '14.11.2026 18:00' } },
    { key: 'order', label: 'Lõpp enne algust', body: { ...base, endsAt: '2026-11-14T17:00:00Z' } },
    { key: 'json', label: 'Katkine JSON', text: '{ "title": "Sügiskontsert", "city": "Kuressaare", }' },
].map(p => ({ ...p, text: p.text ?? JSON.stringify(p.body, null, 2) }));

const ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:\d{2})$/;

function checkField(field, value) {
    if (value === undefined) return field.required ? 'Kohustuslik väli puudub' : null;
    switch (field.name) {
        case 'title':
        case 'city': {
            const max = field.name === 'title' ? 255 : 100;
            if (typeof value !== 'string') return 'Peab olema tekst';
            if (value.length < 1) return 'Ei tohi olla tühi';
            if (value.length > max) return `Liiga pikk (kuni ${max} märki)`;
            return null;
        }
        case 'imageUrl': {
            if (typeof value !== 'string') return 'Peab olema tekst';
            try {
                const url = new URL(value);
                return ['http:', 'https:'].includes(url.protocol) ? null : 'Peab olema veebiaadress';
            } catch {
                return 'Peab olema veebiaadress';
            }
        }
        default:
            if (typeof value !== 'string' || !ISO.test(value) || Number.isNaN(Date.parse(value))) {
                return 'Peab olema ISO kuupäev, nt 2026-11-14T18:00:00Z';
            }
            return null;
    }
}

export function submitEvent(text) {
    let body;
    try {
        body = JSON.parse(text);
    } catch {
        return { stage: 'json', response: { code: 400, body: { error: 'Vigane JSON' } }, fields: [] };
    }
    if (body === null || typeof body !== 'object' || Array.isArray(body)) {
        return { stage: 'validation', response: { code: 400, body: { error: 'Vigane päring', details: {} } }, fields: [],
            message: 'Päringu keha peab olema objekt: { "väli": väärtus }.' };
    }

    const fields = [];
    const errors = {};
    const data = {};
    for (const field of DTO_FIELDS) {
        const value = body[field.name];
        const error = checkField(field, value);
        if (error) errors[field.name] = [error];
        else if (value !== undefined) data[field.name] = value;
        fields.push({
            name: field.name, sent: value !== undefined, value,
            outcome: error ? 'error' : value === undefined ? 'absent' : 'kept',
            note: error ?? (value === undefined ? 'Valikuline, jäeti saatmata' : 'Võeti vastu'),
        });
    }
    for (const [name, value] of Object.entries(body)) {
        if (DTO_FIELDS.some(f => f.name === name)) continue;
        fields.push({ name, sent: true, value, outcome: 'dropped', note: SERVER_FIELDS[name] ? `Eemaldati: ${SERVER_FIELDS[name]}` : 'Eemaldati: seda välja DTO-s pole' });
    }

    // Like zod .refine: the object-level rule runs only when the fields themselves are valid.
    if (Object.keys(errors).length === 0 && Date.parse(data.endsAt) <= Date.parse(data.startsAt)) {
        errors.endsAt = ['Üritus peab lõppema pärast algust'];
        const endsAt = fields.find(f => f.name === 'endsAt');
        endsAt.outcome = 'error';
        endsAt.note = errors.endsAt[0];
    }

    if (Object.keys(errors).length > 0) {
        return { stage: 'validation', response: { code: 400, body: { error: 'Vigane päring', details: errors } }, fields };
    }

    const row = {
        id: NEW_ID,
        title: data.title,
        city: data.city,
        imageUrl: data.imageUrl ?? null,
        startsAt: new Date(data.startsAt).toISOString(),
        endsAt: new Date(data.endsAt).toISOString(),
        organizerId: ORGANIZER_ID,
        status: 'draft',
        createdAt: NOW,
        updatedAt: NOW,
    };
    const pick = who => Object.fromEntries(ROW_FIELDS.filter(f => f[who]).map(f => [f.name, row[f.name]]));
    const organizerResponse = pick('organizer');
    return {
        stage: 'created',
        response: { code: 201, body: organizerResponse },
        fields,
        row,
        organizerResponse,
        publicResponse: pick('public'),
    };
}
