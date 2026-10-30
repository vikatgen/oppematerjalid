// A deterministic teaching model: no requests are sent to a real backend.
// Mirrors event-management-api: EventService.publish → findOwnedById (403) → status check (409).
export const EVENT_ID = '7f3c9a2e-41d8-4b6a-9c1e-2f5d8b0a4c42';
export const SHORT_ID = '7f3c9a2e…';

export function simulatePublish({ user, owner, status, validId }) {
    const steps = [];
    const add = (layer, title, explanation, extra = {}) =>
        steps.push({ layer, title, explanation, ...extra });
    const fail = (layer, code, message, explanation) => {
        add(layer, message, explanation, { rejected: true });
        add('Veatöötlus', 'Veast saab HTTP-vastus',
            `Veatöötlus seob vea staatusekoodiga ${code}. Päringu edasine töö katkeb; salvestamist ei toimu.`);
        add('Vastus', `${code} · ${message}`, 'Brauser saab veateate. Andmebaasi kirjet ei muudetud.',
            { response: { code, body: { error: message } } });
        return { steps, stoppedAt: layer, changed: false };
    };

    add('Route', 'Leia aadressile tegevus',
        'POST /events/:id/publish suunatakse avaldamise tegevusele. Route seob selle ka sisselogimise ja rolli kontrollidega.');
    if (user === 'guest') {
        return fail('Middleware', 401, 'Sisselogimine on vajalik',
            'Päringus puudub sisselogimise tõend. Middleware katkestab töö enne controller’it.');
    }
    add('Middleware', 'Kontrolli sisselogimist', 'Tõend on kontrollitud. Päringuga seotud kasutaja ID on korraldajal organizer-1, ostjal buyer-1.');
    if (user === 'buyer') {
        return fail('Middleware', 403, 'Korraldaja roll on vajalik',
            'Kasutaja on küll tuvastatud, kuid ostja ei tohi korraldaja avaldamise tegevust kasutada.');
    }
    add('Middleware', 'Kontrolli rolli', 'Kasutajal on korraldaja roll. Nüüd võib controller päringut töödelda.');
    if (!validId) {
        return fail('Controller', 400, 'Ürituse ID on vigane',
            'ID peab olema uuid-kujul (nt 7f3c9a2e-41d8-…). Controller’i sisendivalideerimine lükkab teksti „abc” tagasi. Service’it ei kutsuta.');
    }
    add('Controller', 'Loe sisend ja anna töö edasi',
        `ID ${SHORT_ID} on sobiva kujuga. Controller kutsub service.publish(id, user); omanikku ega ürituse olekut ta ei kontrolli.`);
    add('Service', 'Küsi kontrollimiseks üritus',
        'Reeglite kontrollimiseks on vaja olemasolevaid andmeid. Service palub repository’l ürituse leida.');
    add('Repository', 'Koosta lugemispäring',
        `Repository teab tabelit ja päringu kuju: SELECT … FROM events WHERE id = '${SHORT_ID}'. See on lugemine, mitte salvestamine.`);
    add('Andmebaas', 'Tagasta olemasolev kirje',
        'Andmebaas tagastab ürituse praeguse omaniku ja oleku. Kirje ei muutu.', { read: true });
    add('Repository', 'Anna kirje service’ile tagasi',
        'Repository tagastab leitud andmed. Otsuse avaldamise lubamise kohta teeb service.');
    if (owner === 'other') {
        return fail('Service', 403, 'See ei ole sinu üritus',
            'Ürituse organizerId on organizer-2, päringu kasutaja on organizer-1. Roll on õige, aga üritus kuulub teisele korraldajale. Service tekitab ForbiddenError’i, HTTP-koodi valib veatöötlus.');
    }
    add('Service', 'Kontrolli omanikku', 'Ürituse organizerId ja kasutaja ID on mõlemad organizer-1. See on tema üritus.');
    if (status !== 'draft') {
        return fail('Service', 409, 'Seda üritust ei saa avaldada',
            `Ürituse olek on ${status}. Avaldada võib ainult mustandit. Service tekitab ConflictError’i ja ei telli salvestamist.`);
    }
    add('Service', 'Kontrolli avaldamise reeglit',
        'Üritus on mustand. Reeglid lubavad avaldada; service palub repository’l olekut muuta.');
    add('Repository', 'Koosta muutmispäring',
        'Repository koostab UPDATE events SET status = \'published\' WHERE id = …. Päring on valmis, andmebaas pole seda veel täitnud.');
    add('Andmebaas', 'Salvesta uus olek',
        'Nüüd muutub kirje: draft → published. See on selle teekonna ainus andmete muutmise samm.', { write: true });
    add('Repository', 'Tagasta uuendatud kirje', 'Andmebaasi tulemus liigub repository kaudu tagasi service’ile.');
    add('Service', 'Tagasta avaldatud üritus', 'Äritegevus on lõpetatud. Service tagastab tulemuse controller’ile ega koosta HTTP-vastust.');
    add('Controller', 'Koosta väljund-DTO ja vastus', 'Controller valib vastuse väljad ja saadab JSON-i staatusekoodiga 200.');
    add('Vastus', '200 · Üritus avaldatud', 'Brauser saab kinnituse. Andmebaasis on ürituse uus olek published.',
        { response: { code: 200, body: { id: EVENT_ID, title: 'Sügiskontsert', status: 'published' } } });
    return { steps, stoppedAt: 'success', changed: true };
}
