// A deterministic teaching model: server-side session (what event-management-api uses via Better Auth:
// a session row in the database, an HttpOnly cookie with the session token, looked up on every request)
// versus a self-contained signed token (JWT) that the server verifies without the database.

export const MECHANISMS = {
    session: 'Sessioon andmebaasis (meie rakendus)',
    jwt: 'JWT: allkirjastatud token',
};

export const SCENARIOS = {
    normal: 'Logi sisse ja tee päring',
    logout: 'Logi välja, ründajal on tõendi koopia',
    role: 'Admin võtab korraldajalt rolli ära',
};

export function simulateSession({ mechanism, scenario }) {
    const steps = [];
    const add = (layer, title, explanation, extra = {}) => steps.push({ layer, title, explanation, ...extra });
    const session = mechanism === 'session';

    add('Brauser', 'Logib sisse', 'Kasutaja (korraldaja) tõestab, kes ta on, nt Google’i kaudu.');
    if (session) {
        add('Andmebaas', 'Uus rida tabelis session', 'Server loob juhusliku sessiooni tunnuse ja salvestab selle koos kasutaja id ja aegumisajaga andmebaasi.', { write: true });
        add('Server', 'Set-Cookie: session_token=…', 'Brauser saab ainult juhusliku tunnuse. See ei sisalda kasutaja andmeid. HttpOnly: JavaScript ei näe küpsist. SameSite=Lax: teised saidid ei saa seda kaasa saata.');
    } else {
        add('Server', 'Allkirjastab tokeni', 'Token sisaldab andmeid ise: { kasutaja: organizer-1, roll: organizer, aegub: 1 tunni pärast } ja serveri allkirja. Andmebaasi midagi ei salvestata.');
        add('Server', 'Saadab tokeni brauserile', 'Igaüks saab tokeni sisu lugeda (see on lihtsalt kodeeritud), aga ilma serveri saladuseta ei saa seda muuta: allkiri läheks katki.');
    }

    if (scenario === 'normal') {
        add('Brauser', 'GET /api/events koos tõendiga', 'Brauser saadab tõendi igal päringul kaasa. Server ei mäleta eelmist päringut.');
        if (session) {
            add('Andmebaas', 'Otsi sessioon tunnuse järgi', 'Sessioon on olemas ja kehtib. Koos sellega tuleb kasutaja ja tema praegune roll.', { read: true });
        } else {
            add('Server', 'Kontrolli allkirja ja aegumist', 'Allkiri klapib ja token pole aegunud. Andmebaasi pole vaja küsida: kõik vajalik on tokenis.');
        }
        add('Server', 'Vastus 200', 'Kasutaja on tuvastatud.', { response: { code: 200, body: [{ title: 'Sügiskontsert' }] } });
        return { steps, code: 200, dbLookup: session, safe: true };
    }

    if (scenario === 'logout') {
        add('Brauser', 'Logib välja', 'Kasutaja vajutab „Logi välja”. Brauser kustutab oma küpsise. Aga ründaja on tõendi koopia varem ära varastanud.');
        if (session) {
            add('Andmebaas', 'Kustuta sessiooni rida', 'Server kustutab sessiooni andmebaasist. Tunnus on nüüd väärtusetu, ükskõik kellel koopia on.', { write: true });
        } else {
            add('Server', 'Midagi kustutada pole', 'Token ei ole serveris kirjas. Server ei saa seda tühistada: see kehtib, kuni aegub.');
        }
        add('Brauser', 'Ründaja saadab varastatud koopia', 'GET /api/events sama tõendiga, mis kasutajal enne väljalogimist oli.');
        if (session) {
            add('Andmebaas', 'Otsi sessioon: pole', 'Sellist sessiooni enam ei ole.', { read: true });
            add('Server', 'Vastus 401', 'Väljalogimine kehtib kohe ja kõigile koopiatele.', { response: { code: 401, body: { error: 'Pole sisse logitud' } } });
            return { steps, code: 401, dbLookup: true, safe: true };
        }
        add('Server', 'Allkiri klapib, pole aegunud', 'Server ei tea, et kasutaja on välja loginud. Tokenist endast seda välja ei loe.', { rejected: true });
        add('Server', 'Vastus 200 ründajale', 'Ründaja pääseb sisse, kuni token aegub. Seepärast tehakse JWT-d lühiajalisteks (minutid) ja lisatakse uuendamise token.',
            { response: { code: 200, body: [{ title: 'Sügiskontsert' }] } });
        return { steps, code: 200, dbLookup: false, safe: false };
    }

    add('Andmebaas', 'Admin muudab rolli: organizer → attendee', 'Kasutaja roll andmebaasis on nüüd attendee.', { write: true });
    add('Brauser', 'POST /api/events (loo üritus)', 'Endine korraldaja proovib uut üritust luua, sama tõendiga mis enne.');
    if (session) {
        add('Andmebaas', 'Otsi sessioon ja kasutaja', 'Sessioon kehtib, aga kasutaja roll tuleb andmebaasist värskena: attendee.', { read: true });
        add('Server', 'requireRole: 403', 'Rolli muutus kehtib kohe järgmisest päringust.', { response: { code: 403, body: { error: 'Puudub õigus' } } });
        return { steps, code: 403, dbLookup: true, safe: true };
    }
    add('Server', 'Tokenis on roll: organizer', 'Token tehti enne rolli muutust ja selles on vana roll. Server usaldab tokenit ega vaata andmebaasi.', { rejected: true });
    add('Server', 'Vastus 201', 'Rolli muutus jõuab kohale alles siis, kui token aegub ja tehakse uus.', { response: { code: 201, body: { title: 'Uus üritus', status: 'draft' } } });
    return { steps, code: 201, dbLookup: false, safe: false };
}
