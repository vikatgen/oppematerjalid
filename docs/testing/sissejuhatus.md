# Testimine — sissejuhatus moodulisse

## Miks seda moodulit vajame?

Professionaalses tarkvaraarenduses ei saada koodi lihtsalt "valmis" ja unustatakse. Iga uus funktsioon, parandus või refaktoreerimine võib katki teha midagi, mis varem töötas. **Testid on sinu turvavõrk** — need ütlevad sekunditega, kas süsteem käitub endiselt ootuspäraselt.

Kujuta ette broneerimissüsteemi: kasutaja lisab uue töötoa, teine kasutaja broneerib koha, kolmas proovib broneerida täis töötoa. Kui midagi läheb valesti, peab arendaja seda teadma **enne** kasutajat.

---

## Mida sa selles moodulis õpid?

Selle mooduli lõpuks oskad:

- selgitada, **miks** me testime ja millised testitüübid eksisteerivad
- kirjutada **unit teste** Vitestiga Vite projektis
- kasutada **mocke** ja mõista testitavat arhitektuuri
- kirjutada **integration teste** — komponentide ja API koostööd
- testida **kasutajaliidest** Testing Library ja Playwrightiga
- teha ** jõudluse kontrolli** Postmaniga

---

## Meie läbiv näide: töötoa broneerimissüsteem

Kogu moodul kasutab üht ja sama stsenaariumi erinevates tasemetes:

| Tasand | Mida testime? | Tööriist |
|--------|---------------|----------|
| Unit | Kas saab broneerida, kui kohti on? | Vitest |
| Mock | Kas service viskab vea, kui workshop täis? | Vitest + mock |
| Integration | Kas API endpoint tagastab 409, kui täis? | Supertest |
| UI | Kas nupp "Broneeri" töötab brauseris? | Playwright |
| Performance | Kas API vastab alla 500 ms? | Postman |

See lähenemine aitab mõista, et **erinevad testid kontrollivad erinevaid asju** — mitte üks test ei asenda teist.

---

## Soovitatud õppejärjekord

1. [Testimise alused](/testing/fundamentals) — miks, millal, mis tüübid
2. [Unit testid Vitestiga](/testing/unit-testing) — esimesed testid Vite projektis
3. [Mockimine ja testitav kood](/testing/mocking) — sõltuvuste asendamine, arhitektuur
4. [Integration testid](/testing/integration-testing) — komponentide ja API koostöö
5. [API testimine](/testing/api-testing) — scaffold projekti ülevaade
6. [UI testimine](/testing/ui-testing) — Testing Library + Playwright
7. [Jõudluse testimine Postmaniga](/testing/performance-testing-postman) — response time, koormus
8. [Praktiline töötuba](/testing/workshop) — kõik kokku
9. [Ülesanded](/testing/assignments) — iseseisev harjutamine

---

## Eeltingimused

Enne alustamist peaks sul olema:

- Node.js >= 18 paigaldatud
- npm ja Vite projektide põhitõed ([Arendusvahendid I](/arendusvahendid-i/sissejuhatus))
- JavaScripti alused (funktsioonid, objektid, async/await)
- Hiljem API töötoas: Docker ja Postgres ([API testimine](/testing/api-testing))

::: tip Alusta lihtsalt
Ära proovi kõike korraga. Esimene samm on üks unit test Vitestiga. Kui see töötab, liigu edasi.
:::

---

## Tööriistad selles moodulis

| Tööriist | Kasutus |
|----------|---------|
| **Vite** | Arenduskeskkond — sama, mida kasutate teistes projektides |
| **Vitest** | Unit ja integration testid — Jest-sarnane API, Vite'iga integreeritud |
| **Testing Library** | UI komponentide testid — testib seda, mida kasutaja näeb |
| **Playwright** | Brauseripõhised UI/E2E testid — laialt kasutusel ka AI automatiseerimises |
| **Supertest** | Express API HTTP testid |
| **Postman** | API käsitsi test, collection runner, jõudluse mõõtmine |

---

## Õpiväljundid (M7)

- **ÕV1** — kirjeldad testimise põhimõtteid ja testitüüpe
- **ÕV2** — koostad lihtsa testiplaani konkreetsele funktsioonile

---

## Kontrollküsimused enne edasi liikumist

- Miks automaattest on parem kui ainult käsitsi klikkimine?
- Mis vahe on unit testil ja integration testil?
- Miks me kasutame Vitestit, mitte eraldi Jest projekti?
