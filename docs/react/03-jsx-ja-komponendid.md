---
title: JSX ja komponendid
description: Jaga artiklikataloog komponentideks ja kirjuta korrektset JSX-i.
outline: deep
---

# 3. JSX ja komponendid

::: info Õpiväljund
Jagad staatilise artiklivaate selge vastutusega komponentideks ning parandad JSX-i süntaksivead.
:::

## Eeldused ja kiire algus

Vajad 2. kohtumise töötavat projekti. Käivita `npm run dev`. Kohtumine kestab 90 minutit tavapärase rütmiga 10/20/20/30/10.

Täna teeme `App` komponendi loetavamaks. Kui ühes failis on navigatsioon, kümme kaarti ja jalus, on muudatuse õiget kohta raske leida.

## JSX seob JavaScripti ja märgenduse

JSX on JavaScripti süntaksilaiendus. Looksulgudes kasutame avaldisi, näiteks muutuja väärtust või funktsiooni tulemust.

Loo `src/components/PostCard.jsx`:

```jsx
export default function PostCard() {
  const title = "Miks õppida Reacti?";
  const readingMinutes = 4;

  return (
    <article className="post-card">
      <h2>{title}</h2>
      <p>Lugemiseks kulub {readingMinutes} minutit.</p>
      <p>Komponendid aitavad jagada suure vaate väikesteks osadeks.</p>
    </article>
  );
}
```

`{readingMinutes + 1}` on avaldis. `{if (...) ...}` ei ole korrektne JSX. Tingimusi õpime 6. kohtumisel.

## HTML-i ja JSX-i erinevused

| HTML-is | JSX-is | Põhjus või kasutus |
|---|---|---|
| `class` | `className` | Reacti DOM-omaduse nimi |
| `for` sildil | `htmlFor` | Vormisildi seos väljaga |
| `<img>` | `<img />` | Kõik märgendid suletakse |
| mitu kõrvutist elementi | ühine vanem või fragment | Üks tagastatav avaldis |

Fragment `<>...</>` rühmitab elemendid ilma täiendava DOM-elemendita. Nupp ja link täidavad erinevaid ülesandeid: nupuga teeme tegevuse, lingiga navigeerime.

## Komponendid eraldi failides

Asenda `src/App.jsx`:

```jsx
import PostCard from "./components/PostCard.jsx";

export default function App() {
  return (
    <main>
      <h1>Artiklikataloog</h1>
      <PostCard />
      <PostCard />
    </main>
  );
}
```

`export default` määrab faili põhiekspordi. Vaikimisi impordi ümber looksulge ei ole. Nimega eksportide korral kasutatakse näiteks `import { useState } from "react"`.

Defineeri komponendid mooduli ülemisel tasemel. Kui defineerid `PostCard` funktsiooni `App` sees, loob iga renderdus uue funktsiooni; hiljem võib see põhjustada alamkomponendi oleku lähtestumist.

## Renderdamine peab olema puhas

Komponendi ülesanne on sisendite põhjal vaade arvutada. Ära muuda renderdamise ajal võõrast massiivi, tee API päringut ega kirjuta salvestusse. Renderdust peab saama korrata ilma selliste kõrvalmõjudeta.

Praegu on mõlemad kaardid ühesugused. Järgmisel tunnil anname samale komponendile erinevad andmed.

## Praktiline ülesanne

Loo `Header.jsx` ja `Footer.jsx`. Header kuvab rakenduse nime, Footer kursuse nime. Lisa need `App` komponenti ning jäta lehele ainult üks `main`.

Lisa kaardile `className` abil piirjoon, sisemine vahe ja kaartide vahe. Kasuta olemasolevat CSS-faili. Lisa kaks artiklikaardi eksemplari.

## Kontrolli tulemust

- Komponentidel on suured algustähed ja korrektsed impordid.
- Brauseri Elements-paneelis on päris HTML, mitte `PostCard` märgend.
- Mõlemad kaardid muutuvad, kui muudad `PostCard` komponenti.
- `npm run build` õnnestub. Tee commit „Jaga vaade komponentideks”.

::: details Vihje: adjacent JSX elements
Vaata `return` sees olevaid kõrvutisi elemente. Lisa ühine sobiv HTML-element või fragment.
:::

## Mõtesta

Miks ei loo me iga lõigu jaoks eraldi komponenti? Millal on eraldi komponent põhjendatud ka siis, kui seda kasutatakse ainult üks kord?

## Laiendus

Lisa pilt koos sisulise `alt` tekstiga. Dekoratiivsel pildil kasuta tühja `alt=""`. Kontrolli lehte klaviatuuriga.

## Kokkuvõte

JSX-i looksulud näitavad JavaScripti avaldist. Komponentide failid ühendame importidega. Komponent kirjeldab vaadet ja peab olema renderdamise ajal puhas.

## Allikad

- [Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx) — märgenduse reeglid.
- [Keeping Components Pure](https://react.dev/learn/keeping-components-pure) — korratava renderduse põhimõte.

