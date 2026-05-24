# UI testimine

## Miks UI testida?

Unit test kontrollib funktsiooni. Integration test kontrollib API'd. **UI test** kontrollib, kas **kasutaja** saab teha seda, mida vaja — nupp töötab, vorm näitab viga, leht laadib õige sisu.

Kui API on korras, aga nupp on vale CSS-iga peidetud, leiab seda ainult UI test (või kasutaja).

---

## Õpieesmärgid

- Eristada komponendi testi ja brauseri E2E testi
- Kasutada Testing Library't Vitestiga
- Seadistada Playwright Vite projektis
- Kirjutada lihtne kasutajateekonna test

---

## 1. Kaks taset UI testimises

| Tasand | Tööriist | Mida testib? |
|--------|----------|--------------|
| **Komponent** | Vitest + Testing Library | Üks komponent, DOM simuleeritud (jsdom) |
| **E2E / brauser** | Playwright | Täis rakendus päris brauseris |

Alusta komponendist; lisa Playwright kriitilistele teekondadele (nt broneerimine algusest lõpuni).

---

## 2. Miks Playwright?

Playwright on tänapäeva standard brauseritestideks:

- töötab Chromium, Firefox, WebKit
- hea debugimine (trace, screenshot)
- laialt kasutusel CI/CD-s ja **AI/agent automatiseerimises** (nt brauseri juhtimine testide kaudu)

Õppides Playwrighti, oled valmis nii klassi projektideks kui ka tööstusharu töövoogudeks.

---

## 3. Komponendi test — Testing Library

### Paigaldus (Vite + React näide)

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

`vite.config.js`:

```js
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.js"]
  }
});
```

`src/test/setup.js`:

```js
import "@testing-library/jest-dom/vitest";
```

### Näide: broneerimisnupp

```jsx
// BookingButton.jsx
export function BookingButton({ onBook, disabled }) {
  return (
    <button type="button" onClick={onBook} disabled={disabled}>
      Broneeri
    </button>
  );
}
```

```jsx
// BookingButton.test.jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import { BookingButton } from "./BookingButton.jsx";

describe("BookingButton", () => {
  test("kutsub onBook kliki peale", async () => {
    const onBook = vi.fn();
    render(<BookingButton onBook={onBook} disabled={false} />);

    await userEvent.click(screen.getByRole("button", { name: /broneeri/i }));

    expect(onBook).toHaveBeenCalledTimes(1);
  });

  test("on disabled kui workshop täis", () => {
    render(<BookingButton onBook={() => {}} disabled={true} />);
    expect(screen.getByRole("button", { name: /broneeri/i })).toBeDisabled();
  });
});
```

::: tip Testi nagu kasutaja
Kasuta `getByRole`, `getByLabelText` — mitte `getByClassName` või sisemisi implementatsiooni detaile.
:::

---

## 4. Playwright — seadistamine

Vite projekti juurkaustas:

```bash
npm init playwright@latest
```

Vali: TypeScript või JavaScript, testide kaust `e2e`, base URL `http://localhost:5173`.

`playwright.config.js` (lühendatud):

```js
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "http://localhost:5173"
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI
  }
});
```

`webServer` käivitab Vite dev serveri automaatselt enne teste.

Lisa `package.json`:

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

---

## 5. Playwright — esimene E2E test

Eeldame lihtsat broneerimislehte (`/` — vorm kasutaja ID ja workshop ID-ga).

`e2e/booking.spec.js`:

```js
import { test, expect } from "@playwright/test";

test("kasutaja saab broneeringu teha", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Kasutaja ID").fill("1");
  await page.getByLabel("Workshop ID").fill("1");
  await page.getByRole("button", { name: "Broneeri" }).click();

  await expect(page.getByText(/broneering kinnitatud/i)).toBeVisible();
});

test("näitab veateadet kui workshop täis", async ({ page }) => {
  await page.goto("/workshops/1");

  // eeldus: workshop on juba täis testandmetega
  await page.getByRole("button", { name: "Broneeri" }).click();

  await expect(page.getByText(/täis/i)).toBeVisible();
});
```

### Playwright vs Testing Library

| | Testing Library | Playwright |
|---|-----------------|------------|
| Keskkond | jsdom (simuleeritud) | Päris brauser |
| Kiirus | Kiire | Aeglasem |
| Skoop | Komponent | Terve rakendus + võrk |
| Millal? | Palju teste | Võtmeteekonnad |

---

## 6. Parimad praktikad

- Testi **kasutaja nähtavat käitumist**, mitte React state'i
- E2E testidele: lühike, stabiilne, unikaalsed `data-testid` ainult kui role/label ei piisa
- Ära dubleeri sama stsenaariumi 10 E2E testiga — unit + integration katavad detailid
- CI-s: `playwright install --with-deps` ja `npm run test:e2e`

---

## 7. AI ja Playwright

Paljud AI-tööriistad genereerivad Playwright skripte brauseri interaktsioonide põhjal. Kui mõistad Playwrighti locatoreid (`getByRole`, `getByLabel`) ja ootamisi (`expect(...).toBeVisible()`), saad **kontrollida ja parandada** automaatselt loodud teste — see on oluline oskus tulevikuarenduses.

---

## 8. Iseseisev ülesanne

1. Lisa komponendile `BookingForm` test: tühi submit näitab valideerimisviga
2. Lisa Playwright test: avaleht laadib ja pealkiri on nähtav
3. (Edasijõudnud) Testi navigatsiooni: töötoa nimekirjast detaililehele

---

## 9. Levinumad vead

| Viga | Lahendus |
|------|----------|
| `element not found` | Oota: `await expect(...).toBeVisible()` |
| Test flakib | Väldi `sleep`; kasuta Playwright auto-wait |
| Dev server ei käi | Seadista `webServer` configis |

---

## 10. Edasi

[Jõudluse testimine Postmaniga](/testing/performance-testing-postman) — API kiirus ja koormus.

### Allikad

- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright — Getting Started](https://playwright.dev/docs/intro)
- [Playwright — Best Practices](https://playwright.dev/docs/best-practices)
