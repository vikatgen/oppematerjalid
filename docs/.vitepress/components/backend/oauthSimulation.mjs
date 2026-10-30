// A deterministic teaching model of "Sign in with Google" (OAuth 2.0 authorization code flow with
// state and PKCE), as Better Auth runs it in event-management-api: the browser is redirected to Google,
// Google redirects back to /api/auth/callback/google with a one-time code, our server checks state and
// exchanges the code (with the client secret) for the user's profile, finds or creates user + account,
// creates a session and sets the cookie. The password never reaches our server.

export const SCENARIOS = {
    first: 'Esimene sisselogimine, kasutaja lubab',
    returning: 'Teine sisselogimine (konto on olemas)',
    deny: 'Kasutaja keeldub Google’is',
    forged: 'Ründaja saadab võltsitud tagasisuunamise',
};

export function simulateOAuth({ scenario }) {
    const steps = [];
    const add = (layer, title, explanation, extra = {}) => steps.push({ layer, title, explanation, ...extra });

    if (scenario === 'forged') {
        add('Brauser', 'Ohver avab ründaja lingi', 'Link viib otse meie tagasisuunamise aadressile: /api/auth/callback/google?code=RÜNDAJA_KOOD&state=… Eesmärk: logida ohver sisse ründaja kontoga, et näha, mida ohver seal teeb.');
        add('Meie server', 'Kontrolli state väärtust', 'Ohvri brauser ei alustanud sisselogimist, seega pole sellel brauseril meie salvestatud state väärtust. Päringus olev state ei klapi millegagi.', { rejected: true });
        add('Meie server', 'Katkesta', 'Koodi Google’i juures ei vahetata, sessiooni ei looda.', { response: { code: 'viga', body: { error: 'state ei klapi', sessioon: 'ei loodud' } } });
        return { steps, loggedIn: false, newUser: false };
    }

    add('Brauser', 'Vajutab „Logi sisse Google’iga”', 'Brauser küsib meie serverilt, kuhu minna.');
    add('Meie server', 'Koosta Google’i aadress', 'Server loob juhusliku state väärtuse (ja PKCE saladuse), jätab need meelde ja annab aadressi: accounts.google.com/…?client_id=…&redirect_uri=…/api/auth/callback/google&state=…');
    add('Brauser', 'Suunatakse Google’isse', 'Kasutaja lahkub meie lehelt. Edasine toimub Google’i lehel, mida meie server ei näe.');
    add('Google', 'Kasutaja logib sisse', 'Parool (ja kaheastmeline kinnitus) sisestatakse Google’i lehel. Meie server ei näe parooli kunagi.');

    if (scenario === 'deny') {
        add('Google', 'Kasutaja vajutab „Tühista”', 'Kasutaja ei luba oma andmeid jagada.', { rejected: true });
        add('Brauser', 'Tagasi meie juurde veaga', '/api/auth/callback/google?error=access_denied. Koodi pole, seega pole ka midagi vahetada.');
        add('Meie server', 'Suuna tagasi sisselogimise lehele', 'Kasutaja näeb teadet, et sisselogimine katkestati.', { response: { code: 302, body: { error: 'access_denied', sessioon: 'ei loodud' } } });
        return { steps, loggedIn: false, newUser: false };
    }

    add('Google', 'Küsi luba', scenario === 'first'
        ? 'Google küsib: kas lubad sellel rakendusel näha oma nime ja e-posti? Kasutaja lubab.'
        : 'Kasutaja on varem luba andnud, Google ei küsi uuesti.');
    add('Brauser', 'Tagasi meie juurde koodiga', '/api/auth/callback/google?code=4/0Ab…&state=… Kood on ühekordne ja kehtib vaid hetke. Kood üksi ei anna midagi: selle vahetamiseks on vaja meie saladust.');
    add('Meie server', 'Kontrolli state väärtust', 'state klapib sellega, mille server sisselogimise alguses meelde jättis. Järelikult alustas sisselogimist see sama brauser.');
    add('Google', 'Vaheta kood profiili vastu', 'Server räägib Google’iga otse (mitte brauseri kaudu) ja saadab koodi koos client secret’iga. Google tagastab kasutaja andmed: e-post, nimi, Google’i konto id.');
    if (scenario === 'first') {
        add('Meie server', 'Loo kasutaja ja konto', 'Seda Google’i kontot pole meie andmebaasis. Luuakse rida tabelisse user (roll: attendee) ja rida tabelisse account (google + konto id).', { write: true });
    } else {
        add('Meie server', 'Leia olemasolev kasutaja', 'Tabelis account on rida google + see konto id. Uut kasutajat ei looda: kasutaja jääb samaks koos oma rolli ja piletitega.');
    }
    add('Meie server', 'Loo sessioon, Set-Cookie', 'Edasi on kõik nagu sessioonide lehel: sessioon andmebaasi ja küpsis brauserisse.', { write: true });
    add('Brauser', 'Rakenduses sisse logitud', 'Brauser suunatakse tagasi rakendusse, nüüd koos sessiooni küpsisega.',
        { response: { code: 302, body: { suunatakse: '/', 'Set-Cookie': 'session_token=…', kasutaja: scenario === 'first' ? 'uus (attendee)' : 'olemasolev' } } });
    return { steps, loggedIn: true, newUser: scenario === 'first' };
}
