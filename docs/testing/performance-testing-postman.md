# Jõudluse testimine Postmaniga

## Miks jõudlust testida?

Funktsionaalne test ütleb: "API tagastab 201". **Jõudluse test** küsib: "Kas vastus tuleb piisavalt kiiresti, kui 50 kasutajat korraga broneerivad?"

Aeglane API = halb kasutajakogemus, timeoutid, katkine frontend. Postman sobib klassiruumis **API jõudluse esmaseks mõõtmiseks** ilma keeruka load-test infrastruktuurita.

---

## Õpieesmärgid

- Luua Postman collection API endpointidele
- Kasutada muutujaid ja test skripte
- Mõõta response time
- Käivitada korduvaid päringuid (Collection Runner)
- Tõlgendada tulemusi lihtsalt

---

## 1. Postman vs Supertest vs Playwright

| Tööriist | Peamine roll |
|----------|--------------|
| **Supertest / Vitest** | Automaattestid CI-s, regressioon |
| **Postman** | Käsitsi uurimine, dokumentatsioon, jõudlus, meeskonna collection |
| **Playwright** | UI ja kasutajateekond |

Postman **ei asenda** unit/integration teste — see täiendab neid, eriti arenduse ja demo faasis.

---

## 2. Collection loomine

1. Paigalda [Postman](https://www.postman.com/downloads/) või kasuta veebiversiooni
2. Loo **Collection**: `Workshop Booking API`
3. Lisa **Environment**: `local` muutujatega:

| Muutuja | Väärtus |
|---------|---------|
| `baseUrl` | `http://localhost:3000` |
| `userId` | (täidetakse skriptiga) |
| `workshopId` | (täidetakse skriptiga) |

4. Lisa requestid:

- `GET {{baseUrl}}/health`
- `POST {{baseUrl}}/users`
- `POST {{baseUrl}}/workshops`
- `POST {{baseUrl}}/bookings`

---

## 3. Näide: POST /users

**Body (JSON):**

```json
{
  "name": "Ada",
  "email": "ada-{{$randomInt}}@test.com"
}
```

**Tests** tab (JavaScript):

```js
pm.test("Status on 201", () => {
  pm.response.to.have.status(201);
});

pm.test("Vastus sisaldab id", () => {
  const json = pm.response.json();
  pm.expect(json).to.have.property("id");
  pm.environment.set("userId", json.id);
});

pm.test("Vastus alla 500 ms", () => {
  pm.expect(pm.response.responseTime).to.be.below(500);
});
```

Viimane test on **lihtne jõudluse lävi** — klassis saab numbrit muuta (nt 200 ms).

---

## 4. Jõudluse mõõtmine Collection Runneriga

1. Ava collection → **Run**
2. Vali requestid (health → users → workshops → bookings)
3. **Iterations**: nt 10
4. **Delay**: 0 ms (stress) või 100 ms (realistlikum)
5. Käivita

Vaata kokkuvõtet:

- **Average response time**
- **Failed requests** (4xx/5xx)
- Erinevad endpointid eraldi

::: tip Realistlik eesmärk klassis
`/health` < 100 ms; POST broneering < 500 ms lokaalselt. Tootmises sõltub infrastruktuurist.
:::

---

## 5. Broneerimise voog collectionis

Järjekord:

1. **Health** — server elus
2. **Create user** — salvesta `userId` environment'i
3. **Create workshop** — salvesta `workshopId`
4. **Create booking** — kasuta `{{userId}}` ja `{{workshopId}}`

Booking body:

```json
{
  "userId": {{userId}},
  "workshopId": {{workshopId}}
}
```

Tests:

```js
pm.test("Broneering õnnestus", () => {
  pm.response.to.have.status(201);
});

pm.test("Jõudlus OK", () => {
  pm.expect(pm.response.responseTime).to.be.below(500);
});
```

---

## 6. Negatiivsed ja piirtestid

Lisa request **täis workshop**:

1. Loo workshop `capacity: 1`
2. Broneeri kord — oota 201
3. Broneeri teist korda — oota 409
4. Kontrolli, et response time on endiselt mõistlik (vead ei tohiks "kinni jääda")

---

## 7. Postman vs spetsialiseeritud load test

Postman Collection Runner sobib:

- õppimiseks
- väikesele koormusele
- API lepingu ja latency kontrolliks

Suureks koormuseks (tuhanded kasutajad) kasutatakse tavaliselt k6, Artillery, JMeter. Põhimõte on sama: **mõõda latency, error rate, läbilasekust**.

---

## 8. Lihtne testiplaan (ÕV2)

Näide broneerimise API-le:

| ID | Stsenaarium | Oodatav | Jõudlus |
|----|-------------|---------|---------|
| T1 | Health check | 200 | < 100 ms |
| T2 | Loo kasutaja | 201 | < 500 ms |
| T3 | Broneeri vaba koht | 201 | < 500 ms |
| T4 | Broneeri täis workshop | 409 | < 500 ms |
| T5 | 10x booking järjest | 0 failures | avg < 500 ms |

---

## 9. Iseseisev ülesanne

1. Ekspordi collection JSON-ina (backup / Git)
2. Lisa test: duplikaat-email → 400/409
3. Käivita 20 iteratsiooni; dokumenteeri keskmine aeg
4. Võrdle: kas POST /bookings on aeglasem kui GET /health? Miks?

---

## 10. Levinumad vead

| Viga | Lahendus |
|------|----------|
| `Could not get response` | Käivita API (`npm run dev`) |
| Muutuja tühi | Eelmine request peab `set` tegema |
| Kõik testid punased | Kontrolli `baseUrl` ja port |

---

## 11. Edasi

[Praktiline töötuba](/testing/workshop) — ühenda Vitest, Supertest, Playwright ja Postman ühes projektis.

### Allikad

- [Postman — Writing tests](https://learning.postman.com/docs/tests-and-scripts/write-tests/intro-to-tests/)
- [Postman — Collection Runner](https://learning.postman.com/docs/collections/running-collections/intro-to-collection-runs/)
