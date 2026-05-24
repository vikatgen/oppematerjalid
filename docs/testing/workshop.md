# Praktiline töötuba — capstone

## Miks see töötuba?

Seni õpid teooriat ja väikesi harjutusi eraldi. **Capstone** ühendab kõik:

- Unit testid (Vitest + mock)
- Integration testid (Supertest)
- UI testid (Playwright — kui frontend on olemas)
- Jõudlus (Postman)

Sama **broneerimise API** kogu päeva vältel — nagu päris meeskonnas enne release'i.

---

## Enne alustamist

- [ ] Loe [API projekti ülevaade](/testing/api-testing)
- [ ] Loe [Unit testid](/testing/unit-testing) ja [Mockimine](/testing/mocking)
- [ ] Docker töötab (`docker compose ps`)
- [ ] Node.js >= 18, projekt kloonitud, `npm install`
- [ ] Migratsioonid: `npx prisma migrate dev` ja `npm run migrate:test`

```bash
docker compose up -d
npm run dev   # Swagger: http://localhost:3000/docs
npm test      # olemasolevad testid
```

Töötate paarides. Rollivahetus ~40 min.

---

# Faas 0: Vitest unit testid (kui pole veel teinud)

Kui unit harjutus on juba [Unit testid Vitestiga](/testing/unit-testing) lehel tehtud, võid liikuda Faas 1 juurde.

Kiirkontroll scaffold projektis — service unit test mockidega (vt Faas 2).

---

# Faas 1: Tutvu API-ga käsitsi

## 1.1 Swagger ja Postman

Ava `http://localhost:3000/docs`. Tee käsitsi:

- Loo kasutaja
- Loo workshop
- Tee broneering
- Proovi topeltbroneeringut

::: tip Miks käsitsi?
Automaattestid eeldavad, et sa **mõistad õiget käitumist**. Käsitsi test on kiireim viis seda õppida.
:::

Postman collection loomine: [Jõudluse testimine Postmaniga](/testing/performance-testing-postman) — võid alustada juba siin.

## 1.2 Uuri koodi

Jälgi päringut:

1. `routes/bookingRoutes.js`
2. `controllers/bookingController.js`
3. `services/bookingService.js`
4. `repositories/bookingRepository.js`

**Küsimus:** Kus on äriloogika? Kuidas seda unit testida ilma DB-ta?

## 1.3 Käivita testid

```bash
npm test
```

Millised testid on juba olemas? Unit vs integration?

---

# Faas 2: Unit testid — service kiht (Vitest)

Testime **äriloogikat mock repository'ga** — [Mockimine](/testing/mocking).

Loo `tests/unit/bookingService.test.js`:

```js
import { describe, test, expect, vi, beforeEach } from "vitest";
import { BookingService } from "../../src/services/bookingService.js";

describe("BookingService", () => {
  let mockBookingRepo;
  let mockWorkshopRepo;
  let bookingService;

  beforeEach(() => {
    mockBookingRepo = {
      countBookings: vi.fn(),
      createBooking: vi.fn(),
      findByUserAndWorkshop: vi.fn()
    };
    mockWorkshopRepo = {
      findById: vi.fn()
    };
    bookingService = new BookingService(mockBookingRepo, mockWorkshopRepo);
  });

  test("loob broneeringu kui kohti on", async () => {
    mockWorkshopRepo.findById.mockResolvedValue({
      id: 1, title: "Testing", capacity: 10
    });
    mockBookingRepo.countBookings.mockResolvedValue(3);
    mockBookingRepo.findByUserAndWorkshop.mockResolvedValue(null);
    mockBookingRepo.createBooking.mockResolvedValue({
      id: 1, userId: 1, workshopId: 1
    });

    const result = await bookingService.createBooking(1, 1);
    expect(result).toEqual({ id: 1, userId: 1, workshopId: 1 });
    expect(mockBookingRepo.createBooking).toHaveBeenCalled();
  });
});
```

**Sinu ülesanded:**

1. Workshop täis → viga, `createBooking` ei kutsuta
2. Kasutaja juba broneerinud → viga
3. Workshop puudub → viga

Lisa testid `UserService` ja `WorkshopService` jaoks (sama muster).

```bash
npm test -- tests/unit/bookingService.test.js
```

---

# Faas 3: Integration testid — Supertest

Testime **kogu stacki** — [Integration testid](/testing/integration-testing).

## 3.1 GET /health

`tests/integration/health.test.js`:

```js
import { describe, test, expect } from "vitest";
import request from "supertest";
import { app } from "../../src/app.js";

describe("GET /health", () => {
  test("tagastab 200", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("status", "ok");
  });
});
```

## 3.2 POST /users

```js
import { describe, test, expect, beforeEach } from "vitest";
import request from "supertest";
import { app } from "../../src/app.js";
import { resetDb } from "../helpers/resetDb.js";

describe("POST /users", () => {
  beforeEach(async () => {
    await resetDb();
  });

  test("loob kasutaja", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Ada", email: "ada@test.com" });

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe("ada@test.com");
  });
});
```

**Lisa:** duplikaat-email, puuduv email, POST /workshops, POST /bookings (happy + 409 + 404).

::: warning resetDb
Ilma `beforeEach` puhastuseta testid mõjutavad üksteist.
:::

---

# Faas 4: Postman — jõudlus ja testiplaan

1. Impordi või loo collection (health → user → workshop → booking)
2. Lisa response time testid (< 500 ms)
3. Käivita Collection Runner 10 iteratsiooniga
4. Täida lihtne testiplaan tabel ([juhend](/testing/performance-testing-postman))

**Arutelu:** Kas mõni endpoint on aeglasem? Miks POST /bookings võib olla aeglasem kui GET /health?

---

# Faas 5: UI testid — Playwright (kui frontend on olemas)

Kui kursusel on Vite frontend samale API-le:

1. Seadista Playwright (`npm init playwright@latest`)
2. Kirjuta E2E test: broneerimise vorm või nupp
3. Kirjuta test veateatele (täis workshop)

Juhend: [UI testimine](/testing/ui-testing)

Kui frontend puudub, harjuta Playwright eraldi Vite demo lehel — oskus on üle kantav.

---

# Faas 6: Edasijõudnud

- Mock-meetodite argumentide kontroll
- Error body struktuuri ühtlus kõigil 4xx vastustel
- Concurrency test (2 paralleelset broneeringut, capacity 1)
- Lisa `GET /workshops` + test + Swagger

Concurrency näide:

```js
test("ainult üks broneering õnnestub kui 1 koht", async () => {
  // ... loo 2 kasutajat, workshop capacity 1
  const [res1, res2] = await Promise.all([
    request(app).post("/bookings").send({ userId: u1.body.id, workshopId: ws.body.id }),
    request(app).post("/bookings").send({ userId: u2.body.id, workshopId: ws.body.id })
  ]);
  const statuses = [res1.statusCode, res2.statusCode].sort();
  expect(statuses).toEqual([201, 409]);
});
```

---

# Hindamiskriteeriumid

### Baastase
- GET /health integration test
- POST /users happy path + viga
- POST /bookings happy path
- `resetDb` enne teste
- Postman collection vähemalt 3 requestiga

### Kesktase
- Unit testid service kihile (mock)
- POST /bookings veajuhtumid
- Postman response time testid

### Edasijõudnud
- Playwright E2E (või Testing Library komponent)
- Concurrency või GET /workshops laiendus
- Testiplaan dokumenteeritud

---

# Päeva lõpu refleksioon

- Mis vahe on unit ja integration testil **selles projektis**?
- Kas unit testid andsid kindlust? Kas integration test leidis midagi uut?
- Millal Postman, millal Supertest?
- Mida Playwright testiks, mida API test ei kata?

**Järgmine samm:** [Ülesanded](/testing/assignments) iseseisevaks harjutamiseks.
