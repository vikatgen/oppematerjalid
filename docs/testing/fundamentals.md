# Testimise alused

## Miks me testime?

Oled lõpetanud broneerimissüsteemi. Kõik toimib. Nädal hiljem lisad uue feature'i ja järsku ei saa kasutajad enam broneerida — vana loogika läks katki. Klient on pahane, sa otsid bugi mitu tundi.

**Automaattest oleks selle ära hoidnud.** Test ütleks kohe: "broneerimine ei tööta enam."

Testimine ei ole vigade otsimine pärast valmimist. See on mehhanism, mis:

- valideerib äriloogikat
- vähendab regressioonivigu (vana funktsioon katki minemist)
- võimaldab turvalist refaktoreerimist
- annab kindlust enne deploy'd

---

## Õpieesmärgid

Selle peatüki lõpuks peaks õppija:

- mõistma, miks testimine on arendusprotsessi osa
- oskama eristada unit-, integration- ja UI/E2E teste
- mõistma testimise püramiidi loogikat
- oskama kasutada Arrange–Act–Assert mustrit
- teadma levinumaid algaja vigu

---

## 1. Käsitsi vs automaattest

| | Käsitsi test | Automaattest |
|---|-------------|--------------|
| **Kuidas?** | Ava brauser, kliki, vaata | Käivita `npm test` |
| **Kiirus** | Aeglane, kordub iga kord | Sekundid |
| **Korduvus** | Inimene unustab samu asju | Sama test iga kord |
| **Millal?** | Uue feature'i avastamine | Regressioon, CI/CD |

**Mõlemad on vajalikud.** Automaattest ei asenda mõtlemist — see kaitseb seda, mida juba tead, et peab töötama.

---

## 2. Testimise tasemed — üks näide, neli vaatenurka

Meie broneerimissüsteem: kas kasutaja saab broneerida töötoa?

### 2.1 Unit test

Testib **ühte väikest osa** eraldi — tavaliselt ühte funktsiooni.

```js
function canBook(capacity, currentBookings) {
  return currentBookings < capacity;
}

// Unit test — ei vaja andmebaasi ega serverit
expect(canBook(10, 5)).toBe(true);
expect(canBook(10, 10)).toBe(false);
```

**Omadused:** kiire, isoleeritud, deterministlik.

### 2.2 Integration test

Testib **mitme komponendi koostööd** — näiteks API route + service + andmebaas.

```js
// HTTP päring läbi kogu stacki
const res = await request(app)
  .post("/bookings")
  .send({ userId: 1, workshopId: 1 });

expect(res.statusCode).toBe(201);
```

**Omadused:** aeglasem, annab suurema kindluse, et osad töötavad koos.

### 2.3 UI test (komponent)

Testib **kasutajaliidese osa** — kas nupp on nähtav, kas vorm valideerib.

```js
// Testing Library — testib seda, mida kasutaja näeb
render(<BookingForm />);
await userEvent.click(screen.getByRole("button", { name: /broneeri/i }));
expect(screen.getByText(/täis/i)).toBeInTheDocument();
```

### 2.4 E2E test (brauser)

Simuleerib **täielikku kasutajateekonda** brauseris.

```js
// Playwright — avab päris brauseri
await page.goto("http://localhost:5173");
await page.getByRole("button", { name: "Broneeri" }).click();
await expect(page.getByText("Broneering kinnitatud")).toBeVisible();
```

**Omadused:** aeglasemad, kallimad, annavad kõrge kindlustunde enne release'i.

---

## 3. Testimise püramiid

```
        /‾‾‾‾‾‾‾\
       /  E2E    \          ← vähe, aeglased (Playwright)
      /‾‾‾‾‾‾‾‾‾‾‾\
     / Integration  \       ← mõõdukas (Supertest, API)
    /‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\
   /   Unit Tests      \    ← palju, kiired (Vitest)
  /‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\
```

**Miks nii?**

- Unit testid on odavad — kirjuta neid palju
- Integration testid kontrollivad koostööd — mõõdukas arv
- E2E testid on kallid — ainult kriitilised teekonnad

Vale jaotus (liiga palju E2E) muudab `npm test` aeglaseks ja CI ebastabiilseks.

---

## 4. Arrange – Act – Assert (AAA)

Iga hea test järgib kolme sammu:

```js
test("ei luba broneerida kui workshop on täis", () => {
  // Arrange — seadista andmed
  const capacity = 10;
  const currentBookings = 10;

  // Act — tee midagi
  const result = canBook(capacity, currentBookings);

  // Assert — kontrolli tulemust
  expect(result).toBe(false);
});
```

See muster teeb testid loetavaks ja hõlbustab debugimist.

---

## 5. Hea test vs halb test

**Halb test** — ei testi midagi kasulikku:

```js
expect(true).toBe(true);
```

**Hea test** — kirjeldab käitumist:

```js
expect(validateEmail("test@test.com")).toBe(true);
expect(validateEmail("vale-email")).toBe(false);
```

Hea test:

- on loetav (nimi ütleb, mida kontrollitakse)
- testib **ühte** konkreetset asja
- ei sõltu juhuslikkusest ega ajast
- on korduvkäivitatav

---

## 6. Edge case'id — mida veel testida?

```js
function divide(a, b) {
  return a / b;
}
```

Küsimused enne testide kirjutamist:

- Mis juhtub, kui `b = 0`?
- Mis juhtub stringidega?
- Kas funktsioon peaks viskama vea?

Testimine sunnib defineerima süsteemi piirid **enne** implementeerimist.

---

## 7. Levinumad algaja vead

| Viga | Parem lahendus |
|------|----------------|
| Testid implementatsiooni detaile, mitte käitumist | Testi tulemust, mitte sisemist muutujat |
| Üks suur test kõigele | Palju väikeseid teste |
| Testid sõltuvad üksteisest | Iga test alustab puhtalt olekust |
| Ainult "happy path" | Lisa veajuhtumid ja piirid |
| Testid ei käivitu CI-s | Lisa `npm test` pipeline'i |

---

## 8. TDD — lühidalt

**Test Driven Development** tähendab: kirjuta test **enne** koodi.

1. **Red** — test ebaõnnestub (funktsiooni pole)
2. **Green** — minimaalne kood, mis testi läbib
3. **Refactor** — paranda struktuuri ilma teste rikkumata

TDD ei ole kohustuslik, aga unit testide õppimisel aitab see mõtteviisi kujundada. Praktiline harjutus: [Unit testid Vitestiga](/testing/unit-testing).

---

## 9. Kontrollküsimused

- Miks unit test ei peaks kasutama päris andmebaasi?
- Millal integration test annab rohkem väärtust kui unit test?
- Miks E2E teste peaks olema vähe?
- Mis on Arrange–Act–Assert?

---

## 10. Edasi

Järgmine samm: [Unit testid Vitestiga](/testing/unit-testing) — seadistame Vite projekti ja kirjutame esimesed testid.

### Allikad

- [Martin Fowler — Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)
- [Kent C. Dodds — Write Tests](https://kentcdodds.com/blog/write-tests)
- [Vitest dokumentatsioon](https://vitest.dev/)
