// A deterministic teaching model of the pg-boss job queue in event-management-api:
// cancelling an event changes its status AND enqueues `event-cancelled` in one transaction, answers at once;
// the worker fans out one `refund-ticket` job per active ticket; a failing job is retried with backoff
// (10 s, 20 s, 40 s ...); the refund uses the idempotency key `refund-<ticketId>`, so a retry after a crash
// does not refund twice. Compare: doing the refunds inside the HTTP request.

export const SCENARIOS = {
    cancelEvent: 'Korraldaja tühistab ürituse (3 piletit)',
    stripeDown: 'Stripe ei vasta (üks pilet)',
    crashWithKey: 'Worker kukub pärast tagasimakset, idempotency key olemas',
    crashNoKey: 'Worker kukub pärast tagasimakset, võtit pole',
    inline: 'Ilma järjekorrata: tagasimaksed päringu sees',
};

export function simulateJobs({ scenario }) {
    const steps = [];
    let refunds = 0;
    const queue = [];
    const add = (layer, title, explanation, extra = {}) => steps.push({ layer, title, explanation, ...extra, state: { refunds, queue: [...queue] } });

    if (scenario === 'inline') {
        add('Meie server', 'POST /api/events/1/cancel', 'Server teeb kõik tagasimaksed kohe, päringu sees, ükshaaval.');
        for (const t of ['t1', 't2']) {
            refunds++;
            add('Stripe', `Tagasimakse ${t}`, 'Iga Stripe’i päring võtab umbes sekundi. 300 piletiga oleks see 5 minutit.', { write: true });
        }
        add('Meie server', 'Server taaskäivitub (uus versioon)', 'Päring oli pooleli. Mälus olev töö kaob: keegi ei tea, et t3 jäi tagasi maksmata.', { rejected: true });
        add('Meie server', 'Korraldaja ei saa vastust', 'Brauser ootas ja sai lõpuks vea. Kas üritus on tühistatud? Kas raha läks tagasi? Ebaselge.',
            { rejected: true, response: { code: 'katkes', body: { tagasi_makstud: 2, unustatud: 1 } } });
        return { steps, refunds, expected: 3, quick: false };
    }

    if (scenario === 'cancelEvent') {
        queue.push('event-cancelled');
        add('Meie server', 'Tehing: üritus cancelled + töö järjekorda', 'Mõlemad ühes tehingus: kui üks ei õnnestu, ei jää alles kumbki. Töö on andmebaasis, mitte mälus.', { write: true });
        add('Meie server', 'Vastus kohe: 200', 'Korraldaja saab vastuse millisekunditega. Tagasimaksed tehakse taustal.', { response: { code: 200, body: { status: 'cancelled' } } });
        queue.splice(0, 1, 't1', 't2', 't3');
        add('Worker', 'event-cancelled: fan-out', 'Worker leiab ürituse 3 kehtivat piletit ja paneb igaühe kohta eraldi töö: refund-ticket t1, t2, t3. Üks pilet = üks töö, nii ei sega ühe pileti viga teisi.');
        for (const t of ['t1', 't2', 't3']) {
            refunds++;
            add('Stripe', `Tagasimakse ${t} (võti refund-${t})`, 'Stripe tagastab raha.', { write: true });
            queue.shift();
            add('Worker', `${t}: pilet cancelled, sold − 1`, 'Tehingus. Töö on tehtud ja kaob järjekorrast.');
        }
        return { steps, refunds, expected: 3, quick: true };
    }

    queue.push('t1');
    add('Meie server', 'Pileti tühistamine: töö järjekorda', 'Ostja tühistab pileti. Vastus 202: „võetud vastu, tehakse taustal”.', { response: { code: 202, body: { status: 'refund_queued' } } });

    if (scenario === 'stripeDown') {
        add('Stripe', 'Ei vasta', 'Stripe’il on häire. Worker viskab vea.', { rejected: true });
        add('Järjekord', 'Uuesti 10 sekundi pärast', 'pg-boss märgib töö ebaõnnestunuks ja proovib uuesti. Andmebaasis pole midagi muudetud, sest Stripe’i kutse on enne tehingut.');
        add('Stripe', 'Ei vasta ka teist korda', 'Häire kestab.', { rejected: true });
        add('Järjekord', 'Uuesti 20 sekundi pärast', 'Iga kord pikem vahe, et maas olevat teenust mitte üle koormata. Kokku kuni 5 katset.');
        refunds++;
        add('Stripe', 'Tagasimakse õnnestub', 'Kolmas katse õnnestub.', { write: true });
        queue.shift();
        add('Worker', 't1: pilet cancelled, sold − 1', 'Töö on tehtud. Keegi ei pidanud midagi käsitsi uuesti käivitama.');
        return { steps, refunds, expected: 1, quick: true };
    }

    const key = scenario === 'crashWithKey';
    refunds++;
    add('Stripe', key ? 'Tagasimakse (võti refund-t1)' : 'Tagasimakse (võtmeta)', 'Raha läheb tagasi.', { write: true });
    add('Worker', 'Worker kukub enne andmebaasi muutmist', 'Näiteks server taaskäivitub just sel hetkel. Pilet on andmebaasis endiselt active.', { rejected: true });
    add('Järjekord', 'Töö pole lõpetatud → uuesti', 'pg-boss ei saanud kinnitust, et töö on tehtud, ja annab selle uuesti workerile. See on õige: töö ei tohi kaduda.');
    add('Worker', 'Pilet on active → maksa tagasi', 'Worker näeb ainult andmebaasi seisu ja ei tea, et raha juba läks.');
    if (key) {
        add('Stripe', 'Sama võti → sama tulemus, uut makset pole', 'Stripe mäletab võtit refund-t1 ja tagastab esimese tagasimakse tulemuse. Raha ei lähe teist korda.');
    } else {
        refunds++;
        add('Stripe', 'Uus tagasimakse!', 'Stripe ei tea, et see on kordus. Raha läheb teist korda tagasi.', { write: true, rejected: true });
    }
    queue.shift();
    add('Worker', 't1: pilet cancelled, sold − 1', key ? 'Töö on tehtud, raha läks tagasi täpselt üks kord.' : 'Töö on tehtud, aga ostja sai topelt raha.');
    return { steps, refunds, expected: 1, quick: true };
}
