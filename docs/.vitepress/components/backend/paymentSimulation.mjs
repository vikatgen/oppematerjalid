// A deterministic teaching model of the Stripe Checkout + webhook flow in event-management-api:
// the order is created as `pending` (tickets reserved), the browser goes to Stripe's payment page,
// Stripe calls our webhook with a signed event; only a webhook with a valid signature marks the order
// paid or expired. markPaid/expire only act on `pending` orders, so a repeated webhook changes nothing.

export const SCENARIOS = {
    paid: 'Ostja maksab',
    closedTab: 'Ostja maksab ja sulgeb kohe brauseri',
    duplicate: 'Stripe saadab sama teavituse kaks korda',
    expired: 'Ostja ei maksa (30 min möödub)',
    forged: 'Ründaja saadab võltsitud teavituse',
};

export function simulatePayment({ scenario }) {
    const steps = [];
    let status = 'pending';
    let reserved = true;
    const add = (layer, title, explanation, extra = {}) => steps.push({ layer, title, explanation, ...extra, state: { status, reserved } });

    add('Brauser', 'Vajutab „Maksma”', 'POST /api/orders: 2 piletit.');
    add('Meie server', 'Tellimus pending, piletid broneeritud', 'Tehingus: sold + 2 ja tellimus olekus pending (vt tehingute lehte). Raha pole veel tulnud.', { write: true });
    add('Stripe', 'Loo makseleht', 'Server küsib Stripe’ilt makselehe. Kaasa läheb meie tellimuse id (client_reference_id) ja aegumisaeg 30 minutit. Stripe tagastab lehe aadressi.');
    add('Brauser', 'Suunatakse Stripe’i makselehele', 'Kaardiandmed sisestatakse Stripe’i lehel. Meie server ei näe kunagi kaardinumbrit.');

    const webhook = (title, explanation) => add('Stripe', title, explanation);

    if (scenario === 'forged') {
        add('Brauser', 'Ostja mõtleb veel', 'Makseleht on lahti, makset pole tehtud.');
        add('Meie server', 'Saabub „makstud” teavitus', 'Keegi, kes teab meie webhooki aadressi, saadab POST /api/payments/webhook: { type: checkout.session.completed, tellimus: … }.');
        add('Meie server', 'Allkiri ei klapi → 400', 'Stripe allkirjastab iga teavituse saladusega, mida teavad ainult Stripe ja meie server. Võltsingul õiget allkirja pole. Midagi ei muudeta.', { rejected: true, response: { code: 400, body: { error: "Vigane Stripe'i allkiri" } } });
        return { steps, finalStatus: status, reserved };
    }

    if (scenario === 'expired') {
        add('Brauser', 'Ostja sulgeb lehe maksmata', 'Piletid on endiselt broneeritud: keegi teine neid osta ei saa.');
        webhook('30 minuti pärast: checkout.session.expired', 'Stripe teatab, et makseleht aegus. Teavitus on allkirjastatud.');
        status = 'expired'; reserved = false;
        add('Meie server', 'Allkiri klapib → tellimus expired', 'Tehingus: tellimus expired, piletid cancelled, sold − 2. Kohad on jälle müügis.', { write: true, response: { code: 200, body: { received: true } } });
        return { steps, finalStatus: status, reserved };
    }

    add('Stripe', 'Makse õnnestub', 'Raha liigub. Stripe teab nüüd, et tellimus on makstud.');

    if (scenario === 'closedTab') {
        add('Brauser', 'Brauser suletakse', 'Ostja sulgeb vahelehe kohe pärast maksmist. Tagasisuunamine meie lehele ei toimu kunagi.', { rejected: true });
    } else {
        add('Brauser', 'Tagasi meie lehele (?payment=success)', 'See on ainult tagasisuunamine. Seda aadressi saab igaüks käsitsi avada, seega ei tõenda see makset ja server ei muuda selle peale midagi.');
    }

    webhook('Webhook: checkout.session.completed', 'Stripe saadab meie serverile otse (mitte brauseri kaudu) allkirjastatud teavituse koos meie tellimuse id-ga.');
    status = 'paid';
    add('Meie server', 'Allkiri klapib → tellimus paid', 'Tellimus paid, piletid active. Kui server ei vastaks 200, saadaks Stripe teavitust uuesti.', { write: true, response: { code: 200, body: { received: true } } });

    if (scenario === 'duplicate') {
        webhook('Sama teavitus uuesti', 'Stripe võib sama sündmust saata mitu korda (nt kui meie vastus jäi teel kaduma).');
        add('Meie server', 'Tellimus pole enam pending → ei tee midagi', 'markPaid muudab ainult pending tellimust. Teine kord pole midagi muuta. Vastus on ikka 200, mitte viga: muidu saadaks Stripe seda aina uuesti.', { response: { code: 200, body: { received: true } } });
    }
    return { steps, finalStatus: status, reserved };
}
