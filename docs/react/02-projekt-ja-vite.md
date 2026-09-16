---
title: Projekt ja Vite
description: Loo Reacti projekt ning jälgi koodi teekonda HTML-ist komponendini.
outline: deep
---

# 2. Projekt ja Vite

::: info Õpiväljund
Käivitad Reacti projekti ja põhjendad, millises failis teha kasutajaliidese muudatus.
:::

## Miks see oluline on?

Uues töökohas algab arendamine sageli võõra projekti käivitamisest. Pead leidma käivituskäsud, kontrollima sõltuvusi ja mõistma, kus rakendus algab. Täna loome artiklikataloogi projekti, mida kasutame järgmise 12 kohtumise jooksul.

## Eeldused ja vahendid

Kestus 90 minutit: 10 min kordamine, 20 min selgitus, 20 min demo, 30 min praktika, 10 min kontroll.

Vajad terminali, koodiredaktorit, brauserit ja Giti. Kasutame Node.js 24 LTS-i, React 19-t ning React Router 7 deklaratiivset režiimi. Vite'i arendustööriist töötab Node.js-is, meie loodav rakendus brauseris. Selle dokumentatsioonisaidi Node'i seadistus ei määra õppija eraldi Reacti projekti versiooni.

Korda vajadusel [npm-i ja package.json-i](/arendusvahendid-i/npm-ja-package-json).

## Kiire algus

Käivita oma õppeprojektide kaustas:

```bash
node --version
npm --version
npm create vite@latest artiklikataloog -- --template react
cd artiklikataloog
npm install
npm run dev
```

Kui loomise tööriist pakub paigaldamist ja käivitamist sinu eest, võid sellest keelduda ning teha sammud ise. Ava terminalis näidatud aadress. Server jääb tööle; lõpetamiseks kasuta Ctrl+C.

Loomiskäsk kasutab sel hetkel saadaolevat Vite'i malli. Säilita loodud `package-lock.json` Git-is: see fikseerib projektis paigaldatud sõltuvused. Meeskonnaliige kasutab olemasoleva projekti paigaldamiseks `npm ci`.

## Millised failid käivitavad rakenduse?

| Fail | Vastutus |
|---|---|
| `package.json` | Sõltuvused ja käsud |
| `index.html` | HTML-dokument ning element `id="root"` |
| `src/main.jsx` | Reacti ühendamine DOM-i juurega |
| `src/App.jsx` | Rakenduse põhikomponent |
| `src/index.css` | Üldised stiilid |

`index.html` laadib moodulina `src/main.jsx`. Vite teisendab JSX-i brauserile sobivaks JavaScriptiks. Brauser ei loe JSX-i otse.

Asenda `src/main.jsx`:

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

`createRoot` annab Reactile hallata ühe DOM-i piirkonna. `render` annab sinna esimese komponendi. `StrictMode` lisab arenduses kontrollid; selle üksikasju uurime efektide tunnis.

Asenda `src/App.jsx`:

```jsx
export default function App() {
  return (
    <main>
      <h1>Artiklikataloog</h1>
      <p>Siia hakkavad ilmuma meie artiklid.</p>
    </main>
  );
}
```

Asenda `src/index.css` minimaalse stiiliga:

```css
body { margin: 0; font-family: system-ui, sans-serif; line-height: 1.5; }
main { max-width: 64rem; margin: auto; padding: 1.5rem; }
button, input, select, textarea { font: inherit; }
:focus-visible { outline: 3px solid #185adb; outline-offset: 3px; }
```

Salvestamisel näed brauseris muudatust. Vite'i kiire arendusuuendus ei ole sama asi mis lõppkasutaja rakenduse tööloogika.

## Praktiline ülesanne

1. Käivita projekt ning muuda pealkirja ja kirjeldust.
2. Muuda `index.html` dokumendi pealkiri ja `lang="et"`.
3. Lisa README-sse projekti eesmärk, nõutud Node'i versioon ja käivituskäsud.
4. Tee commit. Kontrolli enne `git status` abil, et `node_modules` pole lisatavate failide hulgas.
5. Käivita `npm run build` ja seejärel `npm run preview`.

`build` teeb avaldamiseks failid kausta `dist`. `preview` võimaldab neid kohapeal proovida ega ole tootmiskeskkonna server.

## Kontrolli tulemust

- Uus pealkiri on lehel ning brauseri vahelehel.
- Console'is pole vigu; build lõpeb edukalt.
- Oskad näidata teekonda `index.html → main.jsx → App.jsx`.
- README abil saab kaasõppija projekti käivitada.

::: details Vihje: terminal ütleb, et package.json puudub
Kontrolli `pwd` ja kausta sisu. Käivita npm-i skript projektikaustas, kus asub `package.json`.
:::

## Mõtesta

Miks vajame Node.js-i arendamiseks, kuigi leht töötab brauseris? Mis juhtub, kui HTML-is on `id="app"`, aga `main.jsx` otsib `root`?

## Laiendus

Muuda teadlikult ühe impordi failinime. Leia veast fail ja rida, seejärel taasta õige import. Kirjuta README-sse üks lahendatud probleem.

## Kokkuvõte

Vite käitab arendustööriistu. React haldab DOM-i juurt. Rakendus koosneb moodulitest. Build kontrollib, kas projektist saab avaldamiseks failid koostada.

## Allikad

- [Vite'i alustamisjuhend](https://vite.dev/guide/) — malli loomine ja nõuded.
- [Reacti createRoot](https://react.dev/reference/react-dom/client/createRoot) — DOM-i juure ühendamine Reactiga.

