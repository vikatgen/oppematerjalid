---
title: Kontrollimine ja esitlus
description: Kontrolli lõpurakendust, paranda vigu ning põhjenda oma arendusotsuseid.
outline: deep
---

# 14. Kontrollimine ja esitlus

::: info Õpiväljund
Tõendad testide ja esitlusega, et rakendus täidab nõuded, ning põhjendad oma lahenduse andmevoogu.
:::

## Eeldused ja ajakava

Vajad 13. kohtumise rakendust, brauseri arendustööriistu ja README-d.

90 minutit: 10 min käivituse kontroll, 15 min silumise ja testimise demo, 25 min paaristestimine ning parandused, 30 min lühiesitlused, 10 min kokkuvõte. Kuni kümme 3-minutilist esitlust mahub 30 minutisse. Suuremas rühmas toimuvad 3-minutilised esitlused paarides või väikestes rühmades; õpetaja kogub iga õppija kontrolltabeli ja teeb individuaalsed pistelised põhjendusküsimused.

## Süsteemne silumine

Kui leht on tühi, kogu kõigepealt tõendid:

1. Vaata Console'i esimest viga ja selle viidatud faili.
2. Kontrolli React DevToolsis komponendi props'i ja state'i.
3. Vaata Network-paneelis Request URL-i, staatusekoodi ja vastuse keha.
4. Kontrolli, milline renderdusharu peaks praegu nähtav olema.
5. Muuda ühte asja korraga ja korda sama tegevust.

Näiteks „Cannot read properties of null” võib tähendada, et `data.title` renderdatakse enne edukat päringut. Lahendus on sobiv olekuharu, mitte juhuslik viivitus.

React DevTools aitab eristada komponendipuud brauseri DOM-puust. Profiler aitab mõõta renderdusi. Lisa memoiseerimist alles mõõdetud probleemi korral.

## Üks väike automaattest

Loo projekti juurkausta `tests/posts.test.js`. See kasutab Node'i sisseehitatud testimisvahendit ja 13. tunni filtrifunktsiooni:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { filterPosts } from "../src/utils/posts.js";

const posts = [
  { id: 1, title: "Reacti alused" },
  { id: 2, title: "API päringud" },
];

test("otsing eirab tõstutundlikkust ja väliseid tühikuid", () => {
  assert.deepEqual(filterPosts(posts, " REACT ", false, []), [posts[0]]);
});

test("lemmikute filter ja otsing rakenduvad koos", () => {
  assert.deepEqual(filterPosts(posts, "api", true, [1]), []);
});

test("filtreerimine ei muuda algandmeid", () => {
  const original = JSON.stringify(posts);
  filterPosts(posts, "react", true, [1]);
  assert.equal(JSON.stringify(posts), original);
});
```

Käivita:

```bash
node --test
npm run build
npm run preview
```

Lisa üks enda test: näiteks tühi loend või tühi otsing koos lemmikute filtriga. Testi käitumist, mitte seda, mitu korda mõni abifunktsioon välja kutsuti.

See test ei tõenda kogu kasutajaliidese töötamist. Kasutaja teekonnad vajavad eraldi kontrolli.

## Paaristestimise tabel

| Tegevus | Oodatav tulemus |
|---|---|
| Ava artiklid | Laadimisteade asendub kaartidega |
| Otsi puuduvat pealkirja | Tühja tulemuse teade |
| Märgi lemmik, mine infolehele, tule tagasi | Lemmik säilib |
| Ava /posts/1 otse ja värskenda | Õige artikkel |
| Ava /posts/abc ja /posts/999999 | Sobiv vigase või puuduva artikli teade |
| Mine Offline'i ja värskenda | Veateade ning uuesti proovimise võimalus |
| Taasta ühendus ja proovi uuesti | Andmed laaditakse |
| Kasuta Tab-i ja Enterit | Menüü, otsing ja nupud on kasutatavad |
| Vaata kitsas aknas | Tekst ja kontrollid mahuvad kasutamiseks |

Kirjuta iga vea kohta tegevused, oodatud tulemus, tegelik tulemus ja paranduse järel tehtud korduskatse. „Ei tööta” ei ole piisav veakirjeldus.

## Avaldamise eripära

BrowserRouteri korral peab veebiserver suunama tundmatud rakenduse teed samale `index.html` failile. Muidu võib `/posts/1` link rakenduse sees töötada, aga värskendamisel anda serveri 404.

Alamkaustas avaldamisel peavad Vite'i `base`, Routeri `basename` ja serveri seadistus kokku sobima. See on eraldi Reacti projekt, mitte õppematerjalide VitePressi konfiguratsioon.

Kui majutus SPA fallback'i ei toeta, saab kaaluda HashRouterit. Siis on aadress näiteks `/#/posts/1`. Kursuse kohustuslik tulemus on töötav kohalik build koos avaldamise nõude selgitusega. Avaldamine on laiendus.

## Esitlus

Näita kolme minuti jooksul:

- artikli leidmist, lemmikuks märkimist ja detailvaadet;
- üht kontrollitud veaolukorda;
- state'i asukohta ja ühe API päringu teekonda;
- üht arendusotsust ning üht teadaolevat piirangut.

Vaata [hindamiskriteeriume](./praktiline-too.md). Õpetaja võib paluda teha väikese muudatuse, näiteks lisada filtritingimuse. See näitab, et oskad oma lahendusega edasi töötada.

## Mõtesta

Millise vea leidis test ja millise inimene? Mis juhtub järgmise arendajaga, kui README-st puudub käivitamise juhis?

## Edasi tööeluks

Järgmised teemad on TypeScript, komponendi käitumise testimine React Testing Libraryga, brauseritestid Playwrightiga, päringu vahemälu ja Routeri loader'id, autentimine koos backend'iga ning raamistikupõhine serverrenderdus. Õpi neid konkreetse probleemi lahendamiseks. Context, memoiseerimine ja globaalsed state'i teegid pole iga rakenduse automaatne nõue.

## Kokkuvõte

Valmis rakendus vajab kontrollitavat käitumist, korratavat käivitust ja põhjendatud otsuseid. Build ja unit-test on osa tõenditest; kasutaja teekond ning võrguvead vajavad samuti kontrolli.

## Allikad

- [React Developer Tools](https://react.dev/learn/react-developer-tools) — komponentide uurimine.
- [Node.js test runner](https://nodejs.org/api/test.html) — sisseehitatud testimine.
- [Vite static deployment](https://vite.dev/guide/static-deploy.html) — build'i avaldamine.

