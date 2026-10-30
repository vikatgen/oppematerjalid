// A deterministic teaching model of the browser + API security layers in event-management-api:
// SameSite=Lax session cookie (not sent on cross-site fetch/POST), CORS with an allow-list and
// credentials (no Access-Control-Allow-Origin for other origins → the page cannot read the response),
// apiLimiter (100 requests / minute / IP → 429), originCheck (unsafe method from a foreign Origin → 403),
// requireAuth (no session → 401). Order: helmet → cors → apiLimiter → originCheck → route (requireAuth).

export const ORIGINS = {
    ours: { label: 'Meie frontend (localhost:5173)', origin: 'http://localhost:5173', browser: true, allowed: true },
    evil: { label: 'Võõras leht (kuri.example)', origin: 'https://kuri.example', browser: true, allowed: false },
    script: { label: 'Skript ilma brauserita (curl)', origin: null, browser: false, allowed: false },
};

export const ACTIONS = {
    read: { label: 'Loe minu tellimusi', request: 'GET /api/orders/me', unsafe: false, auth: true },
    write: { label: 'Osta pilet', request: 'POST /api/orders', unsafe: true, auth: true },
    flood: { label: '150 päringut minutiga', request: 'GET /api/public/events × 150', unsafe: false, auth: false },
};

export function simulateSecurity({ origin: originKey, action: actionKey }) {
    const origin = ORIGINS[originKey];
    const action = ACTIONS[actionKey];
    const steps = [];
    const add = (layer, title, explanation, extra = {}) => steps.push({ layer, title, explanation, ...extra });
    // The session cookie belongs to the user's browser. Only our own page (same site) gets it attached.
    const cookie = origin.browser && origin.allowed;
    const corsAllowed = origin.browser && origin.allowed;
    const finish = (code, body, why) => {
        const readable = !origin.browser || corsAllowed;
        add('Server', `Vastus ${code}`, why, { response: { code, body } });
        if (origin.browser) {
            add('Brauser', readable ? 'Annab vastuse lehele' : 'Peidab vastuse (CORS)', readable
                ? 'Vastuses on Access-Control-Allow-Origin: http://localhost:5173 ja Allow-Credentials. Lehe JavaScript saab vastuse kätte.'
                : 'Vastuses pole luba selle lehe jaoks. Brauser ei anna vastust lehe JavaScriptile, konsoolis on CORS-viga. Server tegi oma töö ikkagi ära.',
            { rejected: !readable });
        } else {
            add('Leht / skript', 'Saab vastuse kätte', 'CORS on brauseri reegel. Skript ei ole brauser ja loeb kõik vastused. Seepärast ei kaitse CORS serverit, vaid kasutajat.');
        }
        return { steps, code, readable, cookie };
    };

    add('Leht / skript', action.request, origin.browser
        ? `Leht ${origin.origin} käivitab päringu JavaScriptiga, kasutaja brauseris.`
        : 'Keegi saadab päringu käsurealt või oma programmist. Brauserit pole, seega pole ka kasutaja küpsist.');

    if (origin.browser) {
        add('Brauser', cookie ? 'Lisab Origin päise ja küpsise' : 'Lisab Origin päise, küpsist EI lisa', cookie
            ? 'Origin: http://localhost:5173. Sama sait, seega läheb sessiooni küpsis kaasa.'
            : 'Origin: https://kuri.example. Küpsis on SameSite=Lax: teise saidi päringuga seda kaasa ei saadeta. Origin päist JavaScript võltsida ei saa.');
    }

    add('Turvakihid', 'helmet ja CORS', 'helmet lisab vastusele turvapäised. CORS paneb vastusele loa ainult lubatud aadressidele, aga päringut ei peata.');

    if (actionKey === 'flood') {
        add('Turvakihid', 'Päringute piirang: 100 minutis', 'Esimesed 100 päringut lähevad läbi. Alates 101. vastab piirang ise, route ei käivitu.', { rejected: true });
        return finish(429, { error: 'Liiga palju päringuid, proovi minuti pärast uuesti', läbi: 100, tagasi_lükatud: 50 },
            'Ühe minuti jooksul 150 päringut samalt IP-lt: 100 said vastuse 200, ülejäänud 50 said 429.');
    }

    add('Turvakihid', 'Päringute piirang', 'Piirangust on veel palju alles.');

    if (action.unsafe) {
        if (origin.origin && !origin.allowed) {
            add('Turvakihid', 'Origin kontroll (CSRF)', 'POST võõralt aadressilt. Andmeid muutvad päringud on lubatud ainult meie aadressidelt.', { rejected: true });
            return finish(403, { error: 'Päring teiselt aadressilt ei ole lubatud' },
                'Isegi kui küpsis oleks kuidagi kaasa läinud, peatab Origin kontroll päringu enne route\'i.');
        }
        add('Turvakihid', 'Origin kontroll (CSRF)', origin.origin
            ? 'Origin on lubatute nimekirjas.'
            : 'Origin päist pole: päring ei tule brauserist, seega pole ka kasutaja küpsist, mida ära kasutada. Lastakse läbi.');
    }

    if (!cookie) {
        add('Route', 'requireAuth', 'Küpsist pole, seega pole sessiooni.', { rejected: true });
        return finish(401, { error: 'Pole sisse logitud' }, 'Ilma kasutaja sessioonita ei saa keegi tema andmeid lugeda ega tema nimel osta.');
    }
    add('Route', 'requireAuth', 'Sessioon on olemas, kasutaja on tuvastatud.');
    return action.unsafe
        ? finish(201, { order: 'pending', checkoutUrl: 'https://checkout.stripe.com/…' }, 'Tellimus loodi.')
        : finish(200, [{ id: 'o1', status: 'paid' }], 'Kasutaja tellimused.');
}
