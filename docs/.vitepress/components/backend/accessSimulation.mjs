// A deterministic model of who may do what in event-management-api.
// Order of checks mirrors the real code: requireAuth (401) → requireRole (403, admin always passes)
// → service rules: owner check (403 for events, 404 for tickets), staff list for scanning (403).

export const USERS = [
    { key: 'guest', label: 'Sisse logimata', role: null },
    { key: 'attendee', label: 'Ostja', role: 'attendee', note: 'pileti t1 omanik' },
    { key: 'organizer1', label: 'Korraldaja 1', role: 'organizer', note: 'ürituse 1 omanik' },
    { key: 'organizer2', label: 'Korraldaja 2', role: 'organizer' },
    { key: 'security1', label: 'Turvamees 1', role: 'security', note: 'lisatud üritusele 1' },
    { key: 'security2', label: 'Turvamees 2', role: 'security' },
    { key: 'admin', label: 'Admin', role: 'admin' },
];

export const ACTIONS = [
    { key: 'public', label: 'Vaata avalikke üritusi', request: 'GET /api/public/events', auth: false },
    { key: 'order', label: 'Osta pilet', request: 'POST /api/orders', auth: true },
    { key: 'create', label: 'Loo üritus', request: 'POST /api/events', auth: true, role: 'organizer' },
    { key: 'update', label: 'Muuda üritust 1', request: 'PUT /api/events/1', auth: true, role: 'organizer', owner: 'organizer1' },
    { key: 'qr', label: 'Ava pileti t1 QR-kood', request: 'GET /api/tickets/t1/qr', auth: true, ticketOwner: 'attendee' },
    { key: 'scan', label: 'Skänni piletit üritusel 1', request: 'POST /api/scan', auth: true, role: 'security', staff: ['security1'] },
    { key: 'role', label: 'Muuda kasutaja rolli', request: 'PATCH /api/admin/users/:id/role', auth: true, role: 'admin' },
];

const roleNames = { organizer: 'korraldaja', security: 'turvamees', admin: 'admin' };

export function decide(actionKey, userKey) {
    const action = ACTIONS.find(a => a.key === actionKey);
    const user = USERS.find(u => u.key === userKey);
    const ok = action.request.startsWith('POST') && action.key !== 'scan' ? 201 : 200;

    if (!action.auth) {
        return { code: 200, layer: 'Route', kind: 'none', why: 'Avalik aadress: keegi ei kontrolli, kes sa oled. Kõik näevad sama avalikku nimekirja.' };
    }
    if (!user.role) {
        return { code: 401, layer: 'requireAuth', kind: 'authn', why: 'Sessiooni pole. Server ei tea, kes sa oled. Lahendus: logi sisse.' };
    }
    if (action.role && user.role !== 'admin' && user.role !== action.role) {
        return { code: 403, layer: 'requireRole', kind: 'authz', why: `Server teab, kes sa oled, aga see tegevus on ainult rollile „${roleNames[action.role]}”. Uuesti sisselogimine ei aita.` };
    }
    if (action.owner && user.role !== 'admin' && user.key !== action.owner) {
        return { code: 403, layer: 'Service', kind: 'owner', why: 'Roll on õige (korraldaja), aga üritus 1 kuulub teisele korraldajale. Seda teab ainult service, sest ta vaatab ürituse omanikku andmebaasist.' };
    }
    if (action.ticketOwner && user.role !== 'admin' && user.key !== action.ticketOwner) {
        return { code: 404, layer: 'Service', kind: 'owner', why: 'Pilet kuulub kellelegi teisele. Vastus on 404, mitte 403: nii ei saa teiste piletite olemasolu ära arvata.' };
    }
    if (action.staff && user.role !== 'admin' && !action.staff.includes(user.key)) {
        return { code: 403, layer: 'Service', kind: 'owner', why: 'Roll on õige (turvamees), aga ta pole selle ürituse turvameeste nimekirjas (event_staff).' };
    }
    const adminNote = user.role === 'admin' && (action.role !== 'admin' && (action.role || action.owner || action.ticketOwner || action.staff))
        ? ' Admin läbib kõik rolli- ja omanikukontrollid.' : '';
    return { code: ok, layer: action.owner || action.ticketOwner || action.staff ? 'Service' : action.role ? 'requireRole' : 'requireAuth', kind: 'allowed',
        why: `Lubatud.${adminNote}` };
}

export function matrix() {
    return ACTIONS.map(action => ({ action, cells: USERS.map(user => ({ user, ...decide(action.key, user.key) })) }));
}
