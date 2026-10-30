// A deterministic teaching model of src/config/env.ts in event-management-api: process.env values are
// strings; zod validates them once at startup (with defaults and coercion) and the server refuses to
// start if anything is missing or wrong. Simplified: Google/GitHub keys are left out.

export const VARIABLES = [
    { name: 'NODE_ENV', secret: false, hint: 'development | production | test', default: 'development' },
    { name: 'PORT', secret: false, hint: 'täisarv 1024–65535', default: '3000' },
    { name: 'LOG_LEVEL', secret: false, hint: 'debug | info | warn | error | silent', default: 'info' },
    { name: 'DATABASE_URL', secret: true, hint: 'aadress koos kasutaja ja parooliga' },
    { name: 'BETTER_AUTH_SECRET', secret: true, hint: 'vähemalt 32 märki' },
    { name: 'BETTER_AUTH_URL', secret: false, hint: 'rakenduse avalik aadress' },
    { name: 'FRONTEND_URL', secret: false, hint: 'frontend’i aadress' },
    { name: 'STRIPE_SECRET_KEY', secret: true, hint: 'algab sk_' },
    { name: 'STRIPE_WEBHOOK_SECRET', secret: true, hint: 'algab whsec_' },
];

const valid = `NODE_ENV=development
PORT=3000
DATABASE_URL=postgres://app:salajane@localhost:5432/events
BETTER_AUTH_SECRET=Zk3f9QmV2xLp8RtY6wNc1BgH4jUe7sAo
BETTER_AUTH_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173
STRIPE_SECRET_KEY=sk_test_51Hx…
STRIPE_WEBHOOK_SECRET=whsec_9a8b…`;

const replace = (text, name, line) => text.split('\n').map(l => l.startsWith(`${name}=`) ? line : l).join('\n');

export const PRESETS = [
    { key: 'valid', label: 'Korrektne arendus', text: valid },
    { key: 'missing', label: 'DATABASE_URL puudub', text: valid.split('\n').filter(l => !l.startsWith('DATABASE_URL=')).join('\n') },
    { key: 'short', label: 'Liiga lühike saladus', text: replace(valid, 'BETTER_AUTH_SECRET', 'BETTER_AUTH_SECRET=salajane') },
    { key: 'publicKey', label: 'Avalik võti salajase asemel', text: replace(valid, 'STRIPE_SECRET_KEY', 'STRIPE_SECRET_KEY=pk_test_51Hx…') },
    { key: 'port', label: 'Port tekstina', text: replace(valid, 'PORT', 'PORT=kolmtuhat') },
    { key: 'production', label: 'Toodang', text: valid
        .replace('NODE_ENV=development', 'NODE_ENV=production\nLOG_LEVEL=warn')
        .replace('postgres://app:salajane@localhost:5432/events', 'postgres://app:Pr0d-S4l4!@db.internal:5432/events')
        .replace('Zk3f9QmV2xLp8RtY6wNc1BgH4jUe7sAo', 'p9XqL2vB7nT4mK8sR1wY6cZ3hJ5fD0gA')
        .replace('http://localhost:3000', 'https://api.piletid.example')
        .replace('http://localhost:5173', 'https://piletid.example')
        .replace('sk_test_51Hx…', 'sk_live_51Hx…')
        .replace('whsec_9a8b…', 'whsec_7f6e…') },
];

/** Parses KEY=VALUE lines like a .env file. Comments and blank lines are ignored. */
export function parseDotenv(text) {
    const values = {};
    for (const raw of text.split('\n')) {
        const line = raw.trim();
        if (!line || line.startsWith('#')) continue;
        const eq = line.indexOf('=');
        if (eq < 1) continue;
        values[line.slice(0, eq).trim()] = line.slice(eq + 1).trim();
    }
    return values;
}

const isUrl = value => { try { new URL(value); return true; } catch { return false; } };

function check(variable, value) {
    switch (variable.name) {
        case 'NODE_ENV': return ['development', 'production', 'test'].includes(value) ? null : 'Lubatud: development, production, test';
        case 'LOG_LEVEL': return ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'].includes(value) ? null : 'Tundmatu logitase';
        case 'PORT': {
            const n = Number(value);
            if (value === '' || !Number.isInteger(n)) return 'Peab olema täisarv';
            return n >= 1024 && n <= 65535 ? null : 'Peab olema vahemikus 1024–65535';
        }
        case 'DATABASE_URL': case 'BETTER_AUTH_URL': case 'FRONTEND_URL':
            return isUrl(value) ? null : 'Peab olema aadress (URL)';
        case 'BETTER_AUTH_SECRET': return value.length >= 32 ? null : `Liiga lühike: ${value.length} märki, vaja vähemalt 32`;
        case 'STRIPE_SECRET_KEY': return value.startsWith('sk_') ? null : (value.startsWith('pk_') ? 'See on AVALIK võti (pk_). Serveris on vaja salajast võtit (sk_)' : 'Peab algama sk_');
        case 'STRIPE_WEBHOOK_SECRET': return value.startsWith('whsec_') ? null : 'Peab algama whsec_';
        default: return null;
    }
}

export function validateEnv(text) {
    const values = parseDotenv(text);
    const rows = VARIABLES.map(variable => {
        const given = values[variable.name];
        if (given === undefined) {
            if (variable.default !== undefined) return { ...variable, value: variable.default, source: 'vaikimisi', error: null };
            return { ...variable, value: undefined, source: 'puudub', error: 'Puudub' };
        }
        return { ...variable, value: given, source: '.env', error: check(variable, given) };
    });
    const unknown = Object.keys(values).filter(name => !VARIABLES.some(v => v.name === name));
    const errors = rows.filter(r => r.error);
    return { rows, unknown, ok: errors.length === 0, errors };
}

/** Shows only the start of a secret, like a careful log line would. */
export const mask = value => value === undefined ? '' : value.length <= 6 ? '••••' : `${value.slice(0, 4)}••••`;
