---
title: Window objekt
description: Lisalugemine brauseriakna, globaalse keskkonna ja window pakutavate API-de kohta.
outline: deep
---

# `window` objekt

::: warning Lisamaterjal
Loe seda materjali, kui soovid mõista, kust tulevad brauseris kasutatavad globaalsed nimed nagu `document`, `localStorage`, `fetch` ja `setTimeout`.
:::

Brauseris käivitatav JavaScript töötab keskkonnas, mis pakub keelele veebilehega seotud võimalusi. Selle keskkonna keskne objekt on `window`.

## JavaScripti keel ja brauseri võimalused

JavaScripti keel sisaldab näiteks:

- muutujaid ja funktsioone;
- objekte ja massiive;
- tingimusi ja tsükleid;
- `Promise` objekti.

Brauser lisab sellele näiteks:

- `document` HTML-dokumendiga töötamiseks;
- `localStorage` andmete säilitamiseks;
- `fetch()` serveripäringuteks;
- `setTimeout()` taimeriteks;
- `location` avatud aadressi kirjeldamiseks.

Need nimed on brauseris leitavad `window` objekti kaudu:

```js
console.log(window.document === document); // true
console.log(window.localStorage === localStorage); // true
console.log(window.fetch === fetch); // true
```

Brauser lubab paljude `window` omaduste puhul nime `window.` kirjutamata jätta.

## Mida `window` kirjeldab?

`window` kirjeldab brauseri avatud sirvimiskonteksti ehk lihtsustatud mudelis vahelehe akent.

```js
console.log(window.innerWidth);
console.log(window.innerHeight);
console.log(window.location.href);
```

- `innerWidth` ja `innerHeight` kirjeldavad lehe nähtava ala suurust;
- `location` kirjeldab avatud aadressi;
- `document` kirjeldab avatud HTML-dokumenti.

`window` ja `document` ei ole sama:

```text
window
└── document
    └── html
        ├── head
        └── body
```

`window` kirjeldab brauserikeskkonda. `document` kirjeldab selles avatud veebidokumenti.

## Globaalsed muutujad ja `window`

Klassikalise skripti kõige välimises skoobis deklareeritud `var` võib muutuda `window` omaduseks:

```html
<script>
  var oldStyleName = "Mari";
  let modernName = "Jüri";

  console.log(window.oldStyleName); // "Mari"
  console.log(window.modernName); // undefined
</script>
```

`let` ja `const` ei loo samal viisil `window` omadust. JavaScripti moodulite muutujad ei lisandu samuti globaalsele objektile.

See on üks põhjus, miks tasub:

- kasutada `const` ja `let` võtmesõnu;
- jagada suurem rakendus mooduliteks;
- vältida tarbetuid globaalseid muutujaid.

::: warning Globaalsed nimed võivad põrkuda
Kui mitu skripti kirjutavad sama `window` omadust, võib üks väärtus teise üle kirjutada. Hoia rakenduse olek võimalikult selgelt piiritletud.
:::

## Kasulikud `window` omadused

### Avatud aadress

```js
console.log(window.location.href);
console.log(window.location.pathname);
console.log(window.location.search);
```

`location` abil saab lugeda ja muuta avatud aadressi. Aadressi muutmine võib põhjustada navigeerimise või lehe uuesti laadimise.

### Vaateala suurus

```js
console.log(window.innerWidth);
console.log(window.innerHeight);
```

Need väärtused kirjeldavad hetkel nähtavat brauseriala CSS-pikslites.

### Kerimise asukoht

```js
console.log(window.scrollX);
console.log(window.scrollY);
```

Need kirjeldavad, kui kaugele dokumenti on horisontaalselt või vertikaalselt keritud.

### Taimerid

```js
const timerId = window.setTimeout(() => {
  console.log("Taimer valmis");
}, 1000);

window.clearTimeout(timerId);
```

Taimerid kuuluvad brauseri pakutavate API-de hulka.

## `window` sündmused

Mõni sündmus puudutab tervet akent, mitte ühte DOM-elementi:

```js
window.addEventListener("resize", () => {
  console.log(window.innerWidth);
});
```

```js
window.addEventListener("online", () => {
  console.log("Võrguühendus on saadaval.");
});

window.addEventListener("offline", () => {
  console.log("Võrguühendus puudub.");
});
```

`resize` võib toimuda väga sageli. Mahuka töö tegemine iga sündmuse ajal võib muuta lehe aeglaseks.

## `globalThis`

JavaScript võib töötada ka muudes keskkondades:

- brauseris;
- Node.js-is;
- veebitöölises (*Web Worker*);
- testikeskkonnas.

`globalThis` annab ühtse nime keskkonna globaalsele objektile:

```js
console.log(globalThis);
```

Brauseriakna tavaskriptis:

```js
console.log(globalThis === window); // true
```

Keskkonnast sõltumatu koodi puhul võib `globalThis` olla sobivam kui `window`.

## Ennusta ja kontrolli

Ennusta enne Console'is käivitamist:

```js
console.log(window.document === document);
console.log(window.setTimeout === setTimeout);
console.log(window.window === window);
console.log(typeof window.innerWidth);
console.log(typeof window.location);
```

::: details Vastused
- `window.document === document` on `true`.
- `window.setTimeout === setTimeout` on `true`.
- `window.window === window` on `true`.
- `window.innerWidth` on arv.
- `window.location` on objekt.
:::

## Uurimisülesanne: kirjelda brauseri keskkonda

Kasuta DevToolsi Console'i ja uuri:

```js
window.location.href;
window.innerWidth;
window.innerHeight;
window.scrollY;
window.localStorage;
window.document.title;
```

Seejärel vasta oma sõnadega:

1. Mis vahe on JavaScriptil kui keelel ja `window` pakutavatel võimalustel?
2. Mis vahe on `window` ning `document` objektil?
3. Miks ei tasu rakenduse kõiki muutujaid `window` külge lisada?
4. Milline väärtus muutub akna suuruse muutmisel?

## Kokkuvõte

- `window` kirjeldab brauseriakna globaalset keskkonda.
- `document`, `fetch`, `localStorage` ja taimerid on brauseri pakutavad võimalused.
- `document` kirjeldab `window` sees avatud HTML-dokumenti.
- Globaalseid nimesid tuleb kasutada ettevaatlikult.
- `globalThis` annab globaalsele objektile keskkonnast sõltumatu nime.

## Allikad

- [MDN: `Window`](https://developer.mozilla.org/en-US/docs/Web/API/Window) — brauseriakna omadused ja meetodid.
- [MDN: `globalThis`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis) — globaalse objekti ühtne nimi.
- [MDN: `Location`](https://developer.mozilla.org/en-US/docs/Web/API/Location) — avatud aadressi kirjeldamine.
