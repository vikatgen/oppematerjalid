---
title: Rakenduse tervik
description: Koonda päringuloogika kohandatud Hooki ning lõpeta artiklikataloog.
outline: deep
---

# 13. Rakenduse tervik

::: info Õpiväljund
Korrastad töötava rakenduse vastutuste järgi ja tõendad, et ümberkorraldus säilitab kasutaja jaoks olulise käitumise.
:::

## Eeldused ja kiire algus

Vajad 12. kohtumise loendi-, artikli- ja autorivaatega projekti. Kestus 90 minutit: 10 min puudujääkide kaardistus, 15 min selgitus, 15 min demo, 40 min rakenduse lõpetamine, 10 min paariskontroll.

Ära alusta tervet rakendust uuesti. Tee enne muudatusi töötavast seisust commit ning kontrolli [lõputöö nõudeid](./praktiline-too.md).

## Milline kood vastutab mille eest?

```text
src/
├── main.jsx
├── App.jsx
├── components/
│   ├── Layout.jsx
│   ├── PostList.jsx
│   └── PostCard.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── PostsPage.jsx
│   ├── PostDetailsPage.jsx
│   ├── UserDetailsPage.jsx
│   └── AboutPage.jsx
├── hooks/useResource.js
├── services/api.js
└── utils/posts.js
```

Leht otsustab, milliseid andmeid vajab. Teenusefunktsioon suhtleb API-ga. Hook seob päringu Reacti olekuga. Komponent kuvab talle antud andmeid. Väike puhas funktsioon filtreerib artikleid.

Failide arv ei ole kvaliteedimõõdik. Eralda loogika siis, kui vastutus on selge või sama loogika kordub.

## API teenusefunktsioon

Loo `src/services/api.js`:

```js
const API_BASE = "https://jsonplaceholder.typicode.com";

export async function getJson(path, signal) {
  const response = await fetch(API_BASE + path, { signal });
  if (!response.ok) {
    const error = new Error("HTTP " + response.status);
    error.status = response.status;
    throw error;
  }
  return response.json();
}
```

Teenusefunktsioon ei kutsu Reacti Hooke. Seda saab kasutada ja kontrollida ka komponendita.

## Kohandatud Hook

Loo `src/hooks/useResource.js`:

```js
import { useEffect, useState } from "react";
import { getJson } from "../services/api.js";

export function useResource(path) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState({
    path: null, status: "loading", data: null, error: null,
  });

  useEffect(() => {
    if (path === null) return;
    const controller = new AbortController();
    let active = true;
    setResult({ path, status: "loading", data: null, error: null });

    getJson(path, controller.signal).then(
      data => {
        if (active) setResult({ path, status: "success", data, error: null });
      },
      error => {
        if (active && error.name !== "AbortError") {
          setResult({ path, status: "error", data: null, error });
        }
      }
    );

    return () => { active = false; controller.abort(); };
  }, [path, attempt]);

  const current = result.path === path
    ? result
    : { path, status: "loading", data: null, error: null };

  return {
    ...current,
    retry: () => setAttempt(value => value + 1),
  };
}
```

Leht kasutab `useResource("/posts")` või detailvaates `useResource(validId ? "/posts/" + postId : null)`. Hook peab olema kutsutud enne varajasi tagastusi. `null` keelab päringu vigase ID korral; leht kuvab siis vastava teate.

Eemalda lehtedest vana kopeeritud laadimise efekt. Säilita lehel andmekuju kontroll: Hook ei tea, milline peab välja nägema artikkel või autor. Kontrolli andmeid pärast edukat laadimist ja enne omaduste kuvamist.

Custom Hook jagab loogikat, mitte automaatselt state'i ega vahemälu. Kui kaks komponenti kutsuvad seda, tekivad kaks eraldi päringuolekut.

## Puhas filtrifunktsioon

Loo `src/utils/posts.js`:

```js
export function filterPosts(posts, query, favoritesOnly, favoriteIds) {
  const needle = query.trim().toLowerCase();
  return posts.filter(post =>
    post.title.toLowerCase().includes(needle) &&
    (!favoritesOnly || favoriteIds.includes(post.id))
  );
}
```

Kasuta seda PostsPage'is. Funktsioon ei vaja DOM-i ega Reacti, seega on seda lihtne automaattestiga kontrollida.

## Tööks valmistumine

Refaktoreerimine muudab koodi korraldust, säilitades käitumise. Väike commit võimaldab ülevaatajal aru saada, mida ja miks muutsid.

Tee paarilisega koodiülevaatus: jälgige ühte päringut URL-ist ekraanini ja ühte klõpsu state'i muutuseni. Küsimus „miks state siin asub?” annab rohkem infot kui „kas failinimi meeldib?”.

## Praktiline ülesanne

1. Koonda korduv päringuloogika Hooki.
2. Lisa igale päringuveale uuesti proovimine.
3. Kontrolli andmekuju igal API-lehel.
4. Veendu, et autorivaade avaneb artikli lingist.
5. Lõpeta puuduvad kohustuslikud nõuded ja kirjuta README-sse teadaolevad piirangud.

## Kontrolli tulemust

Navigeerimine, otsing, lemmikud, otselingid ja veaolekud töötavad samamoodi nagu enne ümberkorraldust. Eraldi Hooki kasutamine ei tekita lõputuid päringuid. Build õnnestub.

::: details Vihje: lemmikud läksid kahe lehe vahel lahku
Kaks korda kutsutud kohandatud Hook ei ole jagatud hoidla. Hoia ühised lemmikud endiselt Appis ja edasta props'ina.
:::

## Mõtesta

Milline osa koodist muutuks teise API kasutamisel? Miks ei ole selles mahus rakenduses Redux veel vajalik?

## Laiendus: lemmikute säilitamine

Loe `localStorage` algväärtus `useState` laisa algataja kaudu `try/catch` sees. Kontrolli, et JSON annab täisarvude massiivi. Sünkrooni state salvestusse efektiga ja käsitle ka kirjutamise viga. Vigase või keelatud salvestuse korral peab rakendus edasi töötama.

Ära lisa autentimist ega saladusi localStorage'i selle harjutuse osana. Siin hoiame ainult artiklite ID-sid.

## Kokkuvõte

Vastutuste eraldamine aitab muutusi teha ja kontrollida. Hook seob välise päringu Reactiga. Puhast äriloogikat saab testida kasutajaliideseta.

## Allikad

- [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks) — korduva loogika eraldamine.

