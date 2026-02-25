# Testimise alused ja TDD

## Õpieesmärgid

Selle peatüki lõpuks peaks õppija:

- Mõistma tarkvara testimise rolli professionaalses arenduses
- Oskama selgitada unit-, integration- ja end-to-end testide erinevust
- Mõistma testimise püramiidi loogikat
- Oskama rakendada TDD tsüklit
- Oskama kirjutada esimesi teste Jestiga
- Mõistma Express API testimise põhimõtteid

---

# 1. Tarkvara testimise olemus

Kujuta ette: oled lõpetanud broneerimissüsteemi arenduse ja teed deploy. Kõik toimib. Nädal hiljem lisad uue feature'i ja järsku ei saa kasutajad enam broneerida — vana loogika läks katki. Klient on pahane, sa otsid bugi mitu tundi.

**Testid oleksid selle ära hoidnud.** Automaatne test oleks kohe öelnud, et broneerimine ei tööta enam.

Tarkvara testimine on süsteemne protsess, mille eesmärk on hinnata tarkvara kvaliteeti ja tuvastada kõrvalekaldeid ootuspärasest käitumisest.

Testimine ei ole pelgalt vigade leidmine.
Testimine on mehhanism, mis võimaldab:

- valideerida äriloogikat
- vähendada regressioonivigu
- võimaldada turvalist refaktoreerimist
- tagada süsteemi töökindlus

Professionaalses arenduses ei käsitleta testimist kui lisategevust, vaid kui arendusprotsessi lahutamatut osa.

### Allikad
- ISTQB Glossary – Software Testing Definition
  https://glossary.istqb.org/
- Martin Fowler – The Practical Test Pyramid
  https://martinfowler.com/articles/practical-test-pyramid.html

---

# 2. Testimise tasemed
## 2.1 Unit test

Unit test kontrollib väikest, iseseisvat funktsionaalsust (tavaliselt ühte funktsiooni või meetodit).

Iseloomulikud omadused:

- Ei kasuta andmebaasi
- Ei käivita HTTP serverit
- Ei sõltu välistest süsteemidest
- On kiire ja deterministlik

Näide:

```js
function canBook(capacity, currentBookings) {
  return currentBookings < capacity;
}
```

Unit test:

```js
test("ei luba broneerida kui kohad on täis", () => {
  expect(canBook(5, 5)).toBe(false);
});
```

Unit testide eesmärk on kontrollida äriloogikat eraldatult.

### Allikad
- Jest Documentation
  https://jestjs.io/docs/getting-started
- Kent C. Dodds – Write Tests, Not Too Many, Mostly Integration
  https://kentcdodds.com/blog/write-tests

---

## 2.2 Integration test

Integration test kontrollib mitme komponendi koostööd.

Näiteks:

- Express route
- Service layer
- Andmebaasi ühendus

Näide:

```
POST /users
```

Integration test võib kasutada test-andmebaasi ja reaalset HTTP päringut (Supertest kaudu).

### Allikad
- Supertest GitHub
  https://github.com/ladjs/supertest
- Martin Fowler – Integration Tests
  https://martinfowler.com/bliki/IntegrationTest.html

---

## 2.3 End-to-End test (E2E)

End-to-End test simuleerib kasutaja tegelikku käitumist ja testib kogu süsteemi voogu.

Näide:

1. Loo kasutaja
2. Loo töötuba
3. Tee broneering
4. Kontrolli tulemust

Need testid on aeglasemad ja kallimad, kuid annavad kõrge kindlustunde.

### Allikad
- Cypress Documentation (näide E2E testidest)
  https://docs.cypress.io/
- Testimise püramiidi käsitlus
  https://martinfowler.com/articles/practical-test-pyramid.html

---

# 3. Testimise püramiid

Testimise püramiid kirjeldab testide optimaalset jaotust:

```
        /‾‾‾‾‾‾‾\
       /  E2E    \          ← vähe, aeglased, kallid
      /‾‾‾‾‾‾‾‾‾‾‾\
     / Integration  \       ← mõõdukas arv
    /‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\
   /   Unit Tests      \    ← palju, kiired, odavad
  /‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\
```

Miks?

- Unit testid on kiired ja odavad
- Integration testid on aeglasemad
- E2E testid on kõige ressursimahukamad

Vale jaotus (liiga palju E2E teste) muudab arenduse aeglaseks ja ebastabiilseks.

### Allikad
- Martin Fowler – Practical Test Pyramid
  https://martinfowler.com/articles/practical-test-pyramid.html

---

# 4. TDD – Test Driven Development

TDD on arendusmetoodika, kus test kirjutatakse enne implementatsiooni.

TDD tsükkel:

1. 🔴 RED – kirjuta test (ebaõnnestub)
2. 🟢 GREEN – kirjuta minimaalne kood, mis testi läbib
3. 🔵 REFACTOR – paranda koodi struktuuri

TDD eesmärk ei ole ainult testimine, vaid:

- parem disain
- väiksemad funktsioonid
- selgem API
- vähem üleliigset loogikat

Näide:

```js
test("ei luba broneerida kui capacity on täis", () => {
  expect(canBook(2, 2)).toBe(false);
});
```

Seejärel kirjutame funktsiooni.

### Allikad
- Martin Fowler – Test Driven Development
  https://martinfowler.com/bliki/TestDrivenDevelopment.html
- Kent Beck – Test-Driven Development: By Example

---

# 5. Hea testi omadused

Hea test:

- On loetav
- Testib ühte konkreetset käitumist
- Ei sõltu välistest süsteemidest (unit testide puhul)
- On korduvkäivitatav ja deterministlik

Halb test:

```js
expect(true).toBe(true);
```

Hea test:

```js
expect(validateEmail("test@test.com")).toBe(true);
```

Test peaks kirjeldama süsteemi käitumist, mitte implementatsiooni detaile.

### Allikad
- Clean Code – Robert C. Martin
- Kent C. Dodds – Testing Implementation Details

---

# 6. Edge case mõtlemine

Näide:

```js
function divide(a, b) {
  return a / b;
}
```

Küsimused:

- Mis juhtub kui b = 0?
- Mis juhtub kui sisend on string?
- Kas funktsioon peaks viskama vea?

Testimine sunnib defineerima süsteemi piirid ja käitumise.

---

# 7. Jest – Node.js testimisraamistik

Paigaldamine:

```bash
npm install --save-dev jest
```

package.json:

```json
"scripts": {
  "test": "jest"
}
```

Näide:

```js
test("liidab kaks arvu", () => {
  expect(2 + 3).toBe(5);
});
```

---

# 8. Express API testimine (Supertest)

Supertest võimaldab testida Express rakendust ilma serverit käivitamata.

```js
const request = require("supertest");
const app = require("../app");

test("GET /health tagastab 200", async () => {
  const res = await request(app).get("/health");
  expect(res.statusCode).toBe(200);
});
```

See test kontrollib:

- HTTP staatust
- Vastuse sisu
- Endpointi olemasolu

---

# 9. Aruteluküsimused

- Kas testimine muudab arenduse aeglasemaks või kiiremaks pikemas perspektiivis?
- Kas TDD parandab süsteemi disaini?
- Kui palju teste on piisav arv teste?

---

# 10. Kokkuvõte

Testimine ei ole lisategevus.
Testimine on kvaliteetse tarkvara loomise fundamentaalne osa.

Professionaalne arendaja:

- Mõtleb enne implementatsiooni
- Testib äriloogikat
- Kontrollib API käitumist
- Kaitseb süsteemi regressioonide eest
