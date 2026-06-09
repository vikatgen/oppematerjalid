---
title: Asünkroonne JavaScript brauseris
description: Õpi eristama kohe valmivat ja ootamist vajavat tegevust ning hoidma kasutajaliidese ootamise ajal kasutatavana.
outline: deep
---

# Asünkroonne JavaScript brauseris

::: info Õpiväljund
Pärast õppetundi oskad eristada sünkroonset ja asünkroonset tegevust ning põhjendada, miks rakendus peab ootamise ajal kasutajale reageerima.
:::

Tootekataloog on seni kasutanud kohe olemasolevaid kohalikke andmeid. Serverist toodete küsimine võtab aga teadmata aja. Rakendus ei tohi sellel ajal näida katki ega peatada teisi kasutaja tegevusi.

## Eeldused ja töövahendid

- Oskad kasutada funktsioone, sündmuseid ja DOM-i.
- Sul on töötav kohalike andmetega tootekataloog.
- Oskad jälgida Console'i väljundite järjekorda.
- Soovituslik kestus on 60–75 minutit.

## Sünkroonne tegevus valmib enne järgmist sammu

JavaScript täidab tavalise koodi rida-realt:

```js
console.log("1. Alustan");

const total = 2 + 3;
console.log("2. Tulemus:", total);

console.log("3. Lõpetan");
```

Console:

```text
1. Alustan
2. Tulemus: 5
3. Lõpetan
```

Iga järgmine rida saab kasutada eelmise rea valmis tulemust. Seda nimetatakse **sünkroonseks** täitmiseks.

## Mõni tegevus vajab ootamist

Brauseris võivad aega võtta näiteks:

- serveripäring;
- taimer;
- kasutaja asukoha küsimine;
- faili lugemine;
- kasutaja järgmise tegevuse ootamine.

Kui JavaScript peataks kogu lehe kuni serveri vastuseni, ei saaks kasutaja vahepeal kerida, vajutada nuppu ega lugeda olekuteadet.

Asünkroonne tegevus käivitatakse ning selle tulemus töödeldakse hiljem.

## Esimene mudel taimeriga

`setTimeout()` palub brauseril funktsiooni käivitada kõige varem määratud aja järel:

```js
console.log("1. Alustan");

setTimeout(() => {
  console.log("2. Taimer valmis");
}, 1000);

console.log("3. Jätkan kohe");
```

Console'i järjekord:

```text
1. Alustan
3. Jätkan kohe
2. Taimer valmis
```

JavaScript ei oota taimeri järel. Ta annab brauserile juhise ja jätkab järgmise reaga.

::: warning `setTimeout()` aeg ei ole täpne lubadus
`1000` tähendab, et töötleja ei käivitu enne ühe sekundi möödumist. Kui brauser on hõivatud, võib see käivituda hiljem.
:::

## Katseta kasutajaliidese reageerimist

HTML:

```html
<button id="start-demo" type="button">Käivita ootus</button>
<button id="count-click" type="button">Vajuta ootamise ajal</button>
<p id="demo-status">Ootan käivitamist.</p>
<p>Klõpse: <span id="click-count">0</span></p>
```

JavaScript:

```js
const startButton = document.querySelector("#start-demo");
const countButton = document.querySelector("#count-click");
const statusElement = document.querySelector("#demo-status");
const clickCountElement = document.querySelector("#click-count");

let clickCount = 0;

countButton.addEventListener("click", () => {
  clickCount += 1;
  clickCountElement.textContent = String(clickCount);
});

startButton.addEventListener("click", () => {
  statusElement.textContent = "Ootan tulemust...";

  setTimeout(() => {
    statusElement.textContent = "Tulemus saabus.";
  }, 3000);
});
```

Käivita ootus ja vajuta kolme sekundi jooksul loenduri nuppu. Loendur töötab, sest taimeri ootamine ei peata kasutajaliidest.

## Asünkroonne ei tähenda juhuslikku

Asünkroonse tegevuse lõppemise täpset hetke ei pruugi teada, kuid programm peab kirjeldama:

- mida teha enne ootamist;
- mida teha õnnestunud tulemusega;
- mida teha ebaõnnestumise korral;
- mida kasutajale ootamise ajal näidata.

Seda töövoogu hakkad järgmistes tundides kirjutama `Promise`, `async`/`await` ja `fetch()` abil.

## Ära kasuta tulemust enne selle saabumist

Järgmine mõte ei tööta:

```js
let result;

setTimeout(() => {
  result = "Valmis";
}, 1000);

console.log(result); // undefined
```

`console.log()` käivitub enne taimeri funktsiooni. Tulemust saab kasutada ainult tegevuse lõpetamist töötlevas funktsioonis:

```js
setTimeout(() => {
  const result = "Valmis";
  console.log(result);
}, 1000);
```

## Mida me praegu ei süvenda?

Brauser korraldab asünkroonsete tegevuste töötlemist event loop'i abil. Selle teema mõistmiseks kasuta esmalt järgmist vaimset mudelit:

1. JavaScript käivitab ootamist vajava tegevuse.
2. Brauser saab ootamise ajal muid tegevusi töödelda.
3. Valmis tulemus või viga antakse hiljem sinu koodile.

Kui soovid mõista mikroülesandeid, makroülesandeid ja event loop'i täpset järjekorda, loe [event loop'i lisamaterjali](../sundmused/event-loop-mikro-ja-makro.md).

## Praktiline ülesanne: simuleeri toodete laadimist

Täienda tootekataloogi ajutise laadimisnupuga.

### Nõuded

1. Nupp käivitab kolmesekundilise `setTimeout()` taimeri.
2. Staatuse tekst muutub kohe väärtuseks „Toodete laadimine...”.
3. Laadimise ajal on käivitusnupp keelatud.
4. Teised lehe nupud töötavad ootamise ajal edasi.
5. Taimeri lõppedes kuvatakse kohalikud tooted ja nupp lubatakse.
6. Console näitab tegevuste alguse, kohese jätkumise ja lõppemise järjekorda.

### Piirjuhud

Kontrolli:

- kasutaja proovib laadimisnuppu mitu korda vajutada;
- kasutaja kasutab ootamise ajal otsingut või muud nuppu;
- taimeri aeg on `0`;
- kohalik toodete massiiv on tühi.

### Vihjed

::: details Vihje 1
Keela nupp enne `setTimeout()` käivitamist ja luba see taimeri funktsiooni sees.
:::

::: details Vihje 2
Lisa `console.log()` enne taimerit, pärast taimeri käivitamist ja taimeri funktsiooni sisse.
:::

::: details Vihje 3
Kutsu `renderProducts(products)` alles taimeri funktsiooni sees.
:::

### Kontrollitav tulemus

Valmis töös:

- muutub laadimisolek kohe nähtavaks;
- jääb kasutajaliides taimeri ajal kasutatavaks;
- ei käivitu sama laadimine nupu korduvast vajutamisest paralleelselt;
- oskad ennustada Console'i teadete järjekorda ja seda põhjendada.

## Mõtesta

1. Miks kuvatakse „Jätkan kohe” enne taimeri tulemust?
2. Miks ei saa asünkroonset tulemust kasutada kohe järgmisel real?
3. Mida peab rakendus kasutajale ootamise ajal näitama?
4. Miks ei tähenda asünkroonsus seda, et kõik tegevused toimuvad suvalises järjekorras?

## Laiendus

Lisa teine taimer erineva ooteajaga. Ennusta enne käivitamist väljundite järjekord ning kontrolli tulemust Console'is.

## Kokkuvõte

- Sünkroonne kood valmib enne järgmise rea täitmist.
- Asünkroonne tegevus annab tulemuse või vea hiljem.
- Brauser saab ootamise ajal kasutajaliidest edasi teenindada.
- Asünkroonset tulemust kasutatakse alles selle saabumist töötlevas koodis.
- Rakendus peab ootamise ajal oma olekut kasutajale näitama.

## Edasi

Järgmises tunnis õpid töötlema hiljem saabuvat tulemust [Promise'i abil](./promise.md).

## Allikad

- [MDN: Introducing asynchronous JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Introducing) — asünkroonse täitmise põhikontseptsioonid.
- [MDN: `setTimeout()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout) — taimeri käitumine.
