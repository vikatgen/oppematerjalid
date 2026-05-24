# Integration testid

## Miks integration test?

Unit test kontrollib üksikut funktsiooni. **Integration test** kontrollib, kas **osad töötavad koos** — näiteks API route kutsub service'i, service repository't, repository kirjutab andmebaasi.

Kui unit testid on rohelised, aga kasutaja ikka ei saa broneerida, on sageli viga **ühenduses** kihtide vahel.

---

## Õpieesmärgid

- Eristada unit ja integration testi praktikas
- Testida API endpointe Supertestiga
- Mõista test-andmebaasi ja `beforeEach` puhastust
- Teada, millal integration test on vajalik

---

## 1. Unit vs integration — praktiline võrdlus

| | Unit | Integration |
|---|------|-------------|
| **Scope** | Üks funktsioon / service mockidega | Route → … → DB |
| **Kiirus** | Millisekundid | Sekundid |
| **Andmebaas** | Ei | Jah (test DB) |
| **Leiab** | Loogikavead service'is | Wiring, schema, HTTP vead |

Mõlemad on vajalikud. Unit testid on palju; integration testid kattavad kriitilised API voogud.

---

## 2. Frontend integration (lühidalt)

Vite + React/Vue projektis võid testida, kas komponent + hook + util töötavad koos Vitest + Testing Libraryga:

```js
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BookingButton } from "./BookingButton.jsx";

test("näitab veateadet kui API tagastab 409", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
    ok: false,
    status: 409,
    json: async () => ({ error: "Workshop is full" })
  }));

  render(<BookingButton workshopId={1} />);
  await userEvent.click(screen.getByRole("button", { name: /broneeri/i }));

  expect(await screen.findByText(/täis/i)).toBeInTheDocument();
});
```

See on **integration test komponendi tasemel** — mitte täis brauser (see on [UI testimine](/testing/ui-testing)).

---

## 3. API integration Supertestiga

### Miks Supertest?

Express rakendust saab testida **HTTP päringutega** ilma porti kuulata — Supertest simuleerib request/response.

```bash
npm install --save-dev supertest
```

```js
import { describe, test, expect, beforeEach } from "vitest";
import request from "supertest";
import { app } from "../src/app.js";
import { resetDb } from "./helpers/resetDb.js";

describe("POST /bookings", () => {
  beforeEach(async () => {
    await resetDb();
  });

  test("loob broneeringu kui kohti on", async () => {
    const user = await request(app)
      .post("/users")
      .send({ name: "Ada", email: "ada@test.com" });

    const workshop = await request(app)
      .post("/workshops")
      .send({ title: "Vitest", capacity: 10 });

    const res = await request(app)
      .post("/bookings")
      .send({
        userId: user.body.id,
        workshopId: workshop.body.id
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  test("tagastab 409 kui workshop täis", async () => {
    // ... loo user, workshop capacity 1, üks broneering, teine ebaõnnestub
  });
});
```

---

## 4. Test-andmebaas

Integration testid **ei tohi** rikkuda arendusandmeid.

| Keskkond | Fail | Andmebaas |
|----------|------|-----------|
| Arendus | `.env` | `app_dev` |
| Test | `.env.test` | `app_test` |

Enne iga testi:

```js
beforeEach(async () => {
  await resetDb();
});
```

**Miks?** Testid peavad olema sõltumatud järjekorrast ja korduvkäivitatavad.

Täpsemalt: [API testimine — scaffold projekt](/testing/api-testing).

---

## 5. Mida integration testis kontrollida?

- HTTP staatuskood (`201`, `400`, `409`, `404`)
- Vastuse body struktuur (`id`, `error`)
- Ärireeglid (täis workshop, topeltbroneering)
- Veateadete ühtlus

```js
test("error vastus sisaldab error välja", async () => {
  const res = await request(app)
    .post("/bookings")
    .send({ userId: 999, workshopId: 999 });

  expect(res.statusCode).toBeGreaterThanOrEqual(400);
  expect(res.body).toHaveProperty("error");
});
```

---

## 6. Vitest + Supertest samas projektis

`vitest.config.js` (või `vite.config.js`):

```js
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    setupFiles: ["./tests/setup.js"]
  }
});
```

`tests/setup.js` — lae `.env.test`:

```js
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });
```

Skriptid:

```json
{
  "scripts": {
    "test": "vitest",
    "test:integration": "vitest run tests/integration"
  }
}
```

---

## 7. Levinumad vead

| Viga | Lahendus |
|------|----------|
| Testid mõjutavad üksteist | `resetDb()` enne iga testi |
| Docker ei tööta | `docker compose up -d` |
| Vale DATABASE_URL | Kontrolli `.env.test` |
| Flaky concurrency test | Arutle race condition; võib vajada transaction |

---

## 8. Kontrollküsimused

- Miks integration test on aeglasem kui unit test?
- Mis juhtub, kui unustad `resetDb()`?
- Kas Supertest asendab Postmani? (Vihje: erinevad eesmärgid)

---

## 9. Edasi

- [API testimine](/testing/api-testing) — scaffold projekti struktuur
- [Praktiline töötuba](/testing/workshop) — integration harjutused

### Allikad

- [Supertest](https://github.com/ladjs/supertest)
- [Martin Fowler — Integration Test](https://martinfowler.com/bliki/IntegrationTest.html)
