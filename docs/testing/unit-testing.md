# Unit testid Vitestiga

## Miks Vitest?

Teie projektides kasutate **Vite**'i. **Vitest** on Vite'ile loodud testirunner — sama konfiguratsioon, ES moodulid, kiire käivitus. API on Jestiga sarnane, seega Jest'i teadmised kanduvad üle.

**Unit test** kontrollib ühte väikest osa (tavaliselt funktsiooni) ilma serveri, andmebaasi või võrguta.

---

## Õpieesmärgid

- Seadistada Vitest Vite projektis
- Kirjutada unit teste puhtadele funktsioonidele
- Rakendada TDD tsüklit (Red → Green → Refactor)
- Mõista `describe`, `test`, `expect` ja matchers

---

## 1. Projekti seadistamine

### Samm 1: Loo Vite projekt (kui pole veel)

```bash
npm create vite@latest vitest-workshop -- --template vanilla
cd vitest-workshop
npm install
```

### Samm 2: Paigalda Vitest

```bash
npm install --save-dev vitest
```

### Samm 3: Lisa skriptid `package.json` faili

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest",
    "test:run": "vitest run"
  }
}
```

- `npm test` — watch režiim (testid käivituvad uuesti faili salvestamisel)
- `npm run test:run` — üks kord, sobib CI jaoks

### Samm 4: Failide struktuur

```
vitest-workshop/
  src/
    booking.js
    validation.js
    math.js
  src/booking.test.js    ← testid võivad olla src kõrval
  package.json
  vite.config.js
```

Vitest leiab vaikimisi `*.test.js` ja `*.spec.js` failid.

### Samm 5: Kontrolli, et Vitest töötab

Loo `src/smoke.test.js`:

```js
import { describe, test, expect } from "vitest";

describe("Vitest seadistus", () => {
  test("töötab", () => {
    expect(1 + 1).toBe(2);
  });
});
```

```bash
npm run test:run
```

Kui näed rohelist — valmis. Kustuta `smoke.test.js` enne järgmist sammu.

---

## 2. Esimene unit test: canBook()

### Miks see näide?

Broneerimissüsteemis peab ära otsustama: kas on veel vabu kohti? See loogika sobib unit testiks — üks funktsioon, selged sisendid ja väljundid.

### Red — kirjuta ebaõnnestuv test

`src/booking.test.js`:

```js
import { describe, test, expect } from "vitest";
import { canBook } from "./booking.js";

describe("canBook", () => {
  test("tagastab true kui kohti on saadaval", () => {
    expect(canBook(10, 5)).toBe(true);
  });

  test("tagastab false kui workshop on täis", () => {
    expect(canBook(10, 10)).toBe(false);
  });

  test("tagastab false kui broneeringuid on üle capacity", () => {
    expect(canBook(10, 15)).toBe(false);
  });
});
```

Käivita `npm test` — testid **peavad ebaõnnestuma** (Red), sest `booking.js` pole veel olemas.

### Green — minimaalne implementatsioon

`src/booking.js`:

```js
export function canBook(capacity, currentBookings) {
  return currentBookings < capacity;
}
```

Käivita uuesti — Green.

### Refactor

Kood on lihtne; vaata üle, kas nimed ja struktuur on selged. Refactor faasis **ei tohi teste rikkuda**.

---

## 3. Harjutus: validateEmail()

TDD: testid enne koodi.

`src/validation.test.js`:

```js
import { describe, test, expect } from "vitest";
import { validateEmail } from "./validation.js";

describe("validateEmail", () => {
  test("kehtiv email tagastab true", () => {
    expect(validateEmail("test@example.com")).toBe(true);
  });

  test("email ilma @ tagastab false", () => {
    expect(validateEmail("testexample.com")).toBe(false);
  });

  test("tühi string tagastab false", () => {
    expect(validateEmail("")).toBe(false);
  });

  test("null tagastab false", () => {
    expect(validateEmail(null)).toBe(false);
  });
});
```

`src/validation.js`:

```js
export function validateEmail(email) {
  if (!email) return false;
  return email.includes("@");
}
```

::: tip Proovi ise
Lisa testid: `"@"`, `"test@"`, tühikud. Paranda implementatsiooni vajadusel.
:::

---

## 4. Veakäsitlus: divide()

```js
import { describe, test, expect } from "vitest";
import { divide } from "./math.js";

describe("divide", () => {
  test("jagab kaks arvu", () => {
    expect(divide(10, 2)).toBe(5);
  });

  test("viskab vea nulliga jagamisel", () => {
    expect(() => divide(10, 0)).toThrow("Cannot divide by zero");
  });
});
```

```js
export function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}
```

::: tip toThrow
Veateste puhul mähi kutse `() =>` sisse, et Vitest saaks vea püüda.
:::

---

## 5. Vitest API — mida pead teadma

| Konstruktsioon | Tähendus |
|----------------|----------|
| `describe("grupp", () => {})` | Grupeerib seotud testid |
| `test("nimi", () => {})` | Üks test |
| `expect(väärtus).toBe(x)` | Täpne võrdlus |
| `expect(v).toEqual(obj)` | Objekti võrdlus |
| `expect(fn).toThrow()` | Ootab viga |
| `beforeEach(() => {})` | Käivitub enne iga testi |

Levinumad matcherid: `toBeTruthy`, `toBeFalsy`, `toBeGreaterThan`, `toContain`.

---

## 6. Testi väljund — kuidas lugeda?

```
 ✓ src/booking.test.js (3)
   ✓ canBook > tagastab true kui kohti on saadaval
   ✗ canBook > tagastab false kui workshop on täis
     Expected: false
     Received: true
```

- **✓** — läbis
- **✗** — ebaõnnestus; loe Expected vs Received
- **FAIL** — faili import või süntaksiviga

---

## 7. Iseseisvad ülesanded

### A: canUserBook()

```js
// canUserBook(capacity, currentBookings, userAlreadyBooked)
// Täis → { allowed: false, reason: "Workshop is full" }
// Juba broneerinud → { allowed: false, reason: "Already booked" }
// Muidu → { allowed: true }
```

Kirjuta testid enne implementatsiooni.

### B: calculatePrice(basePrice, quantity, discountPercent)

Reeglid: quantity >= 1; discount 0–100; näide `calculatePrice(100, 3, 10)` → 270.

### C (edasijõudnud): parseBookingInput({ workshopId, userId, capacity })

Valideeri positiivsed täisarvud; vigade korral `throw Error` selge sõnumiga.

---

## 8. Levinumad vead

| Probleem | Lahendus |
|----------|----------|
| `Cannot find module` | Kontrolli import teed ja `.js` laiendit ES moodulites |
| Testid ei leia faile | Lisa `vitest` skript; kontrolli failinime `*.test.js` |
| `toBe` vs `toEqual` | Primitiivid → `toBe`; objektid → `toEqual` |

---

## 9. Kokkuvõte

Unit testid Vitestiga on esimene samm professionaalses testimises. Järgmine: [Mockimine](/testing/mocking) — kui funktsioon sõltub teistest osadest.

### Allikad

- [Vitest — Getting Started](https://vitest.dev/guide/)
- [Vitest — API](https://vitest.dev/api/)
