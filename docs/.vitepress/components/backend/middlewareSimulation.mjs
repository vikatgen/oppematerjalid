// A deterministic teaching model of an Express middleware chain (POST /api/events).
// Rules mirror Express 5: middleware runs in registration order; it can pass on (next),
// answer (res.json) or fail (throw / next(err)). After an error only error handlers run,
// and only those registered AFTER the failing middleware. Without one, Express answers
// with its default HTML error page (status from err.status / err.statusCode, otherwise 500).

export const MIDDLEWARES = {
    logger: { label: 'Logija', hint: 'kirjutab iga päringu ja vastuse logisse' },
    json: { label: 'express.json()', hint: 'loeb päringu keha JSON-ist objektiks' },
    auth: { label: 'requireAuth', hint: 'lubab edasi ainult sisselogitud kasutaja' },
    route: { label: 'Route (controller)', hint: 'loob ürituse, vajab keha ja kasutajat' },
    errors: { label: 'Veatöötlus', hint: 'teeb igast veast korraliku JSON-vastuse' },
};

export const SCENARIOS = [
    { key: 'ok', label: 'Korrektne päring, sisse logitud', loggedIn: true, brokenJson: false, conflict: false,
        expected: { code: 201, kind: 'json', logged: true, routeRan: true } },
    { key: 'guest', label: 'Sisse logimata', loggedIn: false, brokenJson: false, conflict: false,
        expected: { code: 401, kind: 'json', logged: true, routeRan: false } },
    { key: 'badJson', label: 'Katkine JSON', loggedIn: true, brokenJson: true, conflict: false,
        expected: { code: 400, kind: 'json', logged: true, routeRan: false } },
    { key: 'conflict', label: 'Service keeldub (409)', loggedIn: true, brokenJson: false, conflict: true,
        expected: { code: 409, kind: 'json', logged: true, routeRan: true } },
];

export const CORRECT_ORDER = ['logger', 'json', 'auth', 'route', 'errors'];
export const START_ORDER = ['route', 'logger', 'errors', 'json', 'auth'];

const errorsByKind = {
    json: { code: 400, expressCode: 400, message: 'Vigane JSON', why: 'Keha ei ole korrektne JSON.' },
    zod: { code: 400, expressCode: 500, message: 'Vigane päring', why: 'Keha on lugemata (undefined), valideerimine kukub läbi.' },
    noUser: { code: 500, expressCode: 500, message: 'Serveri viga', why: 'req.user puudub, controller ei saa omanikku määrata.' },
    conflict: { code: 409, expressCode: 409, message: 'Konflikt andmete praeguse olekuga', why: 'Service keeldus (nt üritus on juba avaldatud).' },
};

export function simulateChain(order, scenario) {
    const trace = [];
    let error = null;
    let response = null;
    let parsed = false;
    let user = false;
    let logged = false;
    let routeRan = false;
    let loggerRegistered = false;

    for (const key of order) {
        const name = MIDDLEWARES[key].label;
        if (response) {
            trace.push({ key, name, action: 'skipped', text: 'Ei käivitu: vastus on juba saadetud.' });
            continue;
        }
        if (error) {
            if (key === 'errors') {
                response = { code: error.code, kind: 'json', body: { error: error.message } };
                trace.push({ key, name, action: 'answered', text: `Püüab vea kinni ja vastab ${error.code} JSON-iga.` });
            } else {
                trace.push({ key, name, action: 'skipped', text: 'Jäetakse vahele: viga liigub otse veatöötluse poole.' });
            }
            continue;
        }
        switch (key) {
            case 'logger':
                loggerRegistered = true;
                trace.push({ key, name, action: 'next', text: 'Paneb kirja: kui vastus valmis saab, logitakse see.' });
                break;
            case 'json':
                if (scenario.brokenJson) {
                    error = errorsByKind.json;
                    trace.push({ key, name, action: 'error', text: 'Viskab vea: keha ei ole korrektne JSON.' });
                } else {
                    parsed = true;
                    trace.push({ key, name, action: 'next', text: 'Loeb keha objektiks ja annab edasi.' });
                }
                break;
            case 'auth':
                if (!scenario.loggedIn) {
                    response = { code: 401, kind: 'json', body: { error: 'Pole sisse logitud' } };
                    trace.push({ key, name, action: 'answered', text: 'Vastab ise 401: kasutaja pole sisse logitud.' });
                } else {
                    user = true;
                    trace.push({ key, name, action: 'next', text: 'Kasutaja on sisse logitud, annab edasi.' });
                }
                break;
            case 'route':
                routeRan = true;
                if (!parsed) {
                    error = errorsByKind.zod;
                    trace.push({ key, name, action: 'error', text: 'Viskab vea: keha pole veel loetud, andmeid pole.' });
                } else if (!user) {
                    error = errorsByKind.noUser;
                    trace.push({ key, name, action: 'error', text: 'Käivitub ilma sisselogimise kontrollita ja kukub: kasutajat pole.' });
                } else if (scenario.conflict) {
                    error = errorsByKind.conflict;
                    trace.push({ key, name, action: 'error', text: 'Service keeldub ja viskab vea (409).' });
                } else {
                    response = { code: 201, kind: 'json', body: { id: '7f3c9a2e…', title: 'Sügiskontsert', status: 'draft' } };
                    trace.push({ key, name, action: 'answered', text: 'Loob ürituse ja vastab 201.' });
                }
                break;
            case 'errors':
                trace.push({ key, name, action: 'next', text: 'Viga pole, ei tee midagi.' });
                break;
        }
    }

    if (!response && error) {
        response = { code: error.expressCode, kind: 'html', body: 'Expressi vaikimisi vealeht (HTML, arenduses koos koodi asukohaga)' };
        trace.push({ key: 'express', name: 'Express', action: 'answered', text: `Keegi ei püüdnud viga kinni. Express vastab ise: ${error.expressCode} ja HTML-leht.` });
    }
    // The logger only sees responses if it was registered before whoever answered.
    logged = loggerRegistered;

    const problems = [];
    const want = scenario.expected;
    if (response.code !== want.code) problems.push(`Staatus ${response.code}, oodati ${want.code}.`);
    if (response.kind !== want.kind) problems.push('Vastus on HTML-leht, mitte JSON: viga ei jõudnud veatöötluseni.');
    if (!logged) problems.push('Päring ei jõudnud logisse.');
    if (routeRan && !want.routeRan) problems.push('Controller käivitus, kuigi ei oleks tohtinud.');
    if (error && error === errorsByKind.zod) problems.push('Controller sai lugemata keha.');
    return { trace, response, logged, routeRan, ok: problems.length === 0, problems };
}

export function checkOrder(order) {
    const results = SCENARIOS.map(scenario => ({ scenario, ...simulateChain(order, scenario) }));
    return { results, allOk: results.every(r => r.ok) };
}
