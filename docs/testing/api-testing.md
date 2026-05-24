# API testimine — projekti ülevaade

## Miks eraldi API projekt?

Unit testid Vitestiga ([Unit testid](/testing/unit-testing)) on isoleeritud. **Päris API** ühendab HTTP, äriloogika, andmebaasi ja migratsioonid. Selle projektiga harjutad [integration teste](/testing/integration-testing) Supertestiga ja saad sama API'd testida [Postmaniga](/testing/performance-testing-postman).

See leht selgitab **projekti struktuuri**. Hands-on ülesanded on [töötuba](/testing/workshop).

---

## Eesmärk

Töötame **töötoa broneerimise API**-ga — sama äri stsenaarium kogu mooduli vältel:

- Loo kasutajaid ja töötubasid
- Broneeri kohti
- Kontrolli reegleid (täis workshop, topeltbroneering)

Projekt kasutab kihilist arhitektuuri, mida [mockimise](/testing/mocking) peatükis õpitud.

---

## 1. Projekti kloonimine ja käivitamine

Õpetaja annab scaffold projekti lingi:

```bash
git clone https://github.com/vikatgen/test-handbook-nodejs-express-application.git
cd test-handbook-nodejs-express-application
npm install
```

Kontrolli:

```bash
node --version   # >= 18
docker --version
```

---

## 2. Projekti struktuur

```
workshop-booking-api/
├── src/
│   ├── app.js              ← Express rakendus (export testidele)
│   ├── server.js           ← Porti kuulav server
│   ├── routes/
│   ├── controllers/
│   ├── services/           ← Unit testide sihtmärk (mock repo)
│   └── repositories/       ← Andmebaas
├── prisma/
│   └── schema.prisma
├── tests/
│   ├── unit/
│   ├── integration/
│   └── helpers/
│       └── resetDb.js
├── docker-compose.yml
├── .env
├── .env.test
└── package.json
```

::: tip Seos teooriaga
**Service** → unit test mockidega. **Kogu stack** → integration test Supertest + test DB.
:::

---

## 3. Kihiline arhitektuur

```
Route → Controller → Service → Repository → Database
```

| Kiht | Näide | Testimine |
|------|-------|-----------|
| Route | `bookingRoutes.js` | Integration |
| Controller | `bookingController.js` | Integration |
| Service | `bookingService.js` | **Unit** (mock) |
| Repository | `bookingRepository.js` | Integration |

---

## 4. Docker ja kaks andmebaasi

```bash
docker compose up -d
```

| Andmebaas | Env | Kasutus |
|-----------|-----|---------|
| `app_dev` | `.env` | Arendus |
| `app_test` | `.env.test` | Automaattestid |

Migratsioonid:

```bash
npx prisma migrate dev
npm run migrate:test
```

::: warning
Mõlemad andmebaasid peavad migratsioonid saama — muidu integration testid ebaõnnestuvad.
:::

---

## 5. Prisma skeem (lühidalt)

```prisma
model Booking {
  id         Int      @id @default(autoincrement())
  userId     Int
  workshopId Int
  user       User     @relation(...)
  workshop   Workshop @relation(...)

  @@unique([userId, workshopId])
}
```

`@@unique` — sama kasutaja ei saa sama workshop'i kaks korda broneerida.

---

## 6. Testkeskkond

`npm test` / `vitest` kasutab `.env.test` — ühendus test-andmebaasiga.

```js
beforeEach(async () => {
  await resetDb();
});
```

Iga integration test algab puhtast olekust.

---

## 7. API endpointid

| Meetod | URL | Kirjeldus |
|--------|-----|-----------|
| GET | `/health` | Tervisekontroll |
| POST | `/users` | Loo kasutaja |
| POST | `/workshops` | Loo workshop |
| POST | `/bookings` | Loo broneering |

**Ärireeglid (bookings):**

- Workshop peab eksisteerima
- Workshop ei tohi olla täis
- Topeltbroneering keelatud

Swagger: `http://localhost:3000/docs`

---

## 8. Kolm viisi sama API testida

| Viis | Millal? | Leht |
|------|---------|------|
| **Vitest + Supertest** | CI, regressioon | [Integration](/testing/integration-testing), [Töötuba](/testing/workshop) |
| **Postman** | Käsitsi, jõudlus, demo | [Postman](/testing/performance-testing-postman) |
| **Playwright** | Kui on Vite frontend API-le | [UI testimine](/testing/ui-testing) |

---

## 9. Enne töötuba — kontrollnimekiri

- [ ] Docker töötab
- [ ] Migratsioonid mõlemas DB-s
- [ ] `npm run dev` — Swagger avaneb
- [ ] `npm test` — olemasolevad testid läbivad
- [ ] Mõistan service vs integration testi vahet

**Järgmine samm:** [Praktiline töötuba](/testing/workshop)

---

## 10. Lisamaterjalid

- [Vitest](https://vitest.dev/)
- [Supertest](https://github.com/ladjs/supertest)
- [Prisma](https://www.prisma.io/docs)
- [Docker Compose](https://docs.docker.com/compose/)
