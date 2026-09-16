---
title: Vormid
description: Seo otsing ja artikli vorm Reacti olekuga ning anna kasutajale tagasisidet.
outline: deep
---

# 7. Vormid

::: info Õpiväljund
Koostad kontrollitud vormi, mis kasutab kasutaja sisestust artiklite filtreerimiseks ja kontrollib vigast sisendit.
:::

## Eeldused ja kiire algus

Jätka 6. kohtumise projektis. Käivita `npm run dev`. Kestus 90 minutit, rütm 10/20/20/30/10. Vajad state'i, sündmuste ja `filter` tundmist.

Päris kasutaja kirjutab otsingusse ka tühikuid, vajutab Enterit ja kasutab klaviatuuri. Vorm peab neile tegevustele arusaadavalt vastama.

## Kontrollitud sisestusväli

Lisa `App` komponendi algusesse `useState` import ning state:

```js
const [query, setQuery] = useState("");
const visiblePosts = posts.filter(post =>
  post.title.toLowerCase().includes(query.trim().toLowerCase())
);
```

Asenda varasem fikseeritud autori filter selle arvutusega. Lisa enne `PostList` komponenti:

```jsx
<label htmlFor="search">Otsi pealkirja järgi</label>
<input
  id="search"
  type="search"
  value={query}
  onChange={event => setQuery(event.target.value)}
/>
<p role="status">Leitud artikleid: {visiblePosts.length}</p>
<PostList posts={visiblePosts} />
```

Kontrollitud välja väärtus tuleb state'ist. Kasutaja muudatus kutsub `onChange`, setter salvestab uue sisendi ja React renderdab vastava väärtuse.

`value` ilma `onChange` töötlejata teeb välja sisuliselt kirjutuskaitstuks. Tekstivälja algväärtus olgu tühi string, mitte `undefined`.

Placeholder kaob kirjutades. Püsiv `label` ütleb ka pärast sisestamist, milleks väli mõeldud on.

## Vormi saatmine on eraldi sündmus

Harjutuseks loo `src/components/PostDraftForm.jsx`:

```jsx
import { useState } from "react";

export default function PostDraftForm() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (title.trim().length < 3) {
      setMessage("Pealkirjas peab olema vähemalt 3 märki.");
      return;
    }
    setMessage("Mustand sobib. Serverisse seda veel ei saadetud.");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="draft-title">Mustandi pealkiri</label>
      <input
        id="draft-title"
        value={title}
        onChange={event => setTitle(event.target.value)}
        aria-describedby="draft-feedback"
      />
      <button type="submit">Kontrolli mustandit</button>
      <p id="draft-feedback" role="status">{message}</p>
    </form>
  );
}
```

Impordi vorm Appi ja kuva see loendi järel. Näites kontrollib sisendit meie JavaScript. HTML-i `required` ja `minLength` on samuti kasulikud, kuid kliendi kontroll ei asenda tulevase serveri kontrolli.

`preventDefault` takistab vormi tavalist dokumendi navigeerimist. `onSubmit` toetab ka Enteriga saatmist. Tavalise tegevusnupu tüübiks vormis määra `button`, sest vaikimisi võib nupp vormi saata.

## Praktiline ülesanne

1. Lisa reaalajas pealkirjaotsing.
2. Lisa nupp „Tühjenda otsing”, mis seab query tühjaks.
3. Proovi mustandivormi tühja teksti, kahe märgi ja sobiva pealkirjaga.
4. Lisa mustandisse `textarea` sisuteksti jaoks ning nõua vähemalt 10 sisulist märki.
5. Veendu, et igal väljal on nähtav silt.

## Kontrolli tulemust

Otsing „ REACT ” leiab sama artikli kui „react”. Puuduv vaste kuvab tühja tulemuse teate. Enter ei laadi lehte uuesti. Vigane mustand annab konkreetse juhise, sobiv mustand selge tagasiside.

::: details Vihje: miks trim toimub otsimisel?
Hoia väljas kasutaja sisestatud teksti. Otsinguks saad sellest tuletada puhastatud väärtuse. Iga klahvivajutuse ajal sisendi ümberkirjutamine võib kasutajat segada.
:::

## Mõtesta

Mis vahe on kasutaja sisendil ja selle põhjal arvutatud otsingutulemusel? Miks ei ole avalikule veebilehele kirjutatud sisendikontroll piisav serveri kaitsmiseks?

## Laiendus

Lisa märkeruut „Ainult autori 1 artiklid”. Kasuta `checked` ja `event.target.checked`, mitte teksti `value`.

## Kokkuvõte

Vormi väärtus ja sündmus moodustavad andmevoo. Saatmist töötleb vorm. Nähtavad sildid ning selge tagasiside muudavad vormi kasutatavaks.

## Allikad

- [React input](https://react.dev/reference/react-dom/components/input) — value, checked ja kontrollitud väljad.

