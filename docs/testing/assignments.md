# Testimise ülesanded

Ülesanded on jaotatud tasemetele. Alusta alati madalamast — iga tase eeldab eelmise mõistmist.

---

## Taseme 1: Unit testid (Vitest)

**Eesmärk:** Oskad seadistada Vitest Vite projektis ja kirjutada puhtaid unit teste.

1. Loo Vite projekt või kasuta olemasolevat
2. Paigalda Vitest, lisa `test` skript
3. Implementeeri ja testi TDD-ga:
   - `canBook(capacity, currentBookings)`
   - `validateEmail(email)`
   - `divide(a, b)` — sh nulliga jagamine

**Juhend:** [Unit testid Vitestiga](/testing/unit-testing)

**Kontroll:**

- [ ] `npm run test:run` läbib
- [ ] Testides on nii happy path kui edge case
- [ ] Kasutad `describe` ja selgeid testinimesid

---

## Taseme 2: Mockimine ja service unit testid

**Eesmärk:** Testid äriloogikat mock repository'ga.

1. Loo lihtne `BookingService` klass dependency injection'iga
2. Mocki `countBookings` ja `createBooking`
3. Testi:
   - Broneering õnnestub
   - Workshop täis → viga
   - Kasutaja juba broneerinud → viga

**Juhend:** [Mockimine](/testing/mocking)

**Kontroll:**

- [ ] Unit test ei kasuta andmebaasi
- [ ] Kontrollid `not.toHaveBeenCalled()` kui broneeringut ei tohiks tekkida

---

## Taseme 3: Integration testid (API)

**Eesmärk:** Testid Express API Supertestiga scaffold projektis.

1. Klooni API projekt ([ülevaade](/testing/api-testing))
2. Kirjuta integration testid:
   - `GET /health` → 200
   - `POST /users` — happy path + valideerimisvead
   - `POST /workshops` — capacity reeglid
   - `POST /bookings` — happy path, täis workshop, topeltbroneering

**Juhend:** [Integration testid](/testing/integration-testing), [Töötuba](/testing/workshop) faasid 2–3

**Kontroll:**

- [ ] `beforeEach` kutsub `resetDb()`
- [ ] Testid töötavad järjekorra sõltumatult

---

## Taseme 4: UI testid (Playwright)

**Eesmärk:** Testid kasutajateekonda brauseris.

1. Seadista Playwright Vite frontend projektis (või õpetaja antud UI)
2. Kirjuta vähemalt 2 E2E testi:
   - Edukas broneerimine (või vormi submit)
   - Veateade (nt täis workshop või valideerimine)
3. (Valikuline) Lisa 1 komponendi test Testing Libraryga

**Juhend:** [UI testimine](/testing/ui-testing)

**Kontroll:**

- [ ] `npm run test:e2e` läbib lokaalselt
- [ ] Kasutad `getByRole` / `getByLabel`, mitte ainult CSS selektoreid

---

## Taseme 5: Jõudlus (Postman)

**Eesmärk:** Mõõdad API response time ja dokumenteerid tulemused.

1. Loo Postman collection (health, users, workshops, bookings)
2. Lisa test skriptid: status + `responseTime < 500` (või kokkulepitud piir)
3. Käivita Collection Runner 10+ iteratsiooniga
4. Koosta lühike testiplaan tabel (ÕV2)

**Juhend:** [Jõudluse testimine Postmaniga](/testing/performance-testing-postman)

**Kontroll:**

- [ ] Environment muutujad (`userId`, `workshopId`) töötavad
- [ ] Testiplaan sisaldab oodatavat tulemust ja latency eesmärki

---

## Refleksioon (kõik tasemed)

Vasta paaris või portfolio kirjelduseks:

1. Mis vahe on unit, integration ja E2E testil **sinu projektis**?
2. Milline test leidis vea, mida teine tüüp ei leidnud?
3. Miks Vitest sobib Vite projektiga?
4. Millal kasutaksid Postmanit vs Supertesti?
5. Miks Playwright on oluline oskus (sh AI/automatiseerimise kontekstis)?
