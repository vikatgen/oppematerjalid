---
title: Event loop, ülesanded ja mikroülesanded
description: Lisalugemine JavaScripti täitmisjärjekorrast, ülesannetest, mikroülesannetest ja brauseri renderdamisest.
outline: deep
---

# Event loop, ülesanded ja mikroülesanded

::: warning Lisamaterjal
Loe seda materjali, kui soovid täpsemalt põhjendada, miks Promise'i töötleja, taimer ja sündmusekuulaja võivad käivituda erinevas järjekorras.
:::

Asünkroonsuse õppimisel piisab sageli mudelist „käivita tegevus ja töötle tulemus hiljem”. Kui tahad täpselt ennustada hilisemate tegevuste järjekorda, on vaja mõista event loop'i.

## JavaScript täidab korraga üht koodilõiku

Brauseri ühes JavaScripti täitmiskontekstis täidetakse korraga üht koodilõiku. Funktsioonikutsed paiknevad lihtsustatud mudelis **kutsepinus** (*call stack*).

```js
function second() {
  console.log("second");
}

function first() {
  second();
}

first();
```

Lihtsustatud kutsepinu:

```text
first()
└── second()
    └── console.log()
```

Kui `second()` lõpetab, jätkub `first()`. Kui pinu on tühi, saab brauser võtta töötlemiseks järgmise valmis tegevuse.

## Event loop'i lihtsustatud mudel

Brauser:

1. käivitab ühe ülesande;
2. täidab selle sünkroonse JavaScripti lõpuni;
3. töötleb kõik valmis mikroülesanded;
4. võib uuendada kasutajaliidest;
5. võtab järgmise ülesande.

```text
üks ülesanne
→ kogu sünkroonne kood
→ kõik mikroülesanded
→ võimalik renderdamine
→ järgmine ülesanne
```

See on õppimiseks kasulik mudel. Brauseri tegelik ajastamine sisaldab rohkem detaile.

## Ülesanded ehk task'id

Ülesannete järjekorda jõuavad näiteks:

- algse skripti käivitamine;
- `setTimeout()` töötleja;
- kasutaja sündmuse töötleja;
- osa brauseri API-de lõpetamise tegevusi.

Neid nimetati varem sageli **makroülesanneteks** (*macrotasks*). Veebiplatvormi dokumentatsioon kasutab tavaliselt lihtsalt sõna **task**.

```js
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");
```

Väljund:

```text
A
C
B
```

Taimeri töötleja ei katkesta praegust skripti. See saab omaette tulevase ülesande.

## Mikroülesanded

Mikroülesannete järjekorda jõuavad näiteks:

- Promise'i `.then()`, `.catch()` ja `.finally()` töötlejad;
- `queueMicrotask()` kaudu lisatud töö;
- `MutationObserver` callback'id.

```js
console.log("A");

Promise.resolve().then(() => {
  console.log("B");
});

console.log("C");
```

Väljund:

```text
A
C
B
```

Promise'i töötleja ei käivitu kohe `.then()` real. See lisatakse mikroülesandena pärast praeguse sünkroonse koodi lõppu.

## Mikroülesanne enne järgmist taimerit

```js
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
});

console.log("D");
```

Väljund:

```text
A
D
C
B
```

Põhjus:

1. algne skript logib `A` ja `D`;
2. Promise'i töötleja on mikroülesanne;
3. mikroülesanded töödeldakse enne järgmist ülesannet;
4. taimeri töötleja käivitub järgmise ülesandena.

::: tip Nullmillisekundiline taimer ei tähenda „kohe”
`setTimeout(callback, 0)` tähendab, et callback võib saada tulevase ülesande niipea kui võimalik. See ootab siiski praeguse ülesande ja mikroülesannete lõppu.
:::

## Mikroülesanded võivad lisada mikroülesandeid

```js
Promise.resolve().then(() => {
  console.log("A");

  Promise.resolve().then(() => {
    console.log("B");
  });
});

setTimeout(() => {
  console.log("C");
}, 0);
```

Väljund:

```text
A
B
C
```

Brauser tühjendab mikroülesannete järjekorra enne järgmise ülesande võtmist. Kui mikroülesanded lisavad pidevalt uusi mikroülesandeid, võib renderdamine ja kasutaja sündmuste töötlemine viibida.

## `await` ja mikroülesanded

`await` järel jätkuv `async` funktsiooni osa käitub Promise'i töötlejana:

```js
async function demo() {
  console.log("B");
  await Promise.resolve();
  console.log("D");
}

console.log("A");
demo();
console.log("C");
```

Väljund:

```text
A
B
C
D
```

`demo()` käivitub kohe ja logib `B`. Pärast `await` rida jätkub funktsioon mikroülesandena.

## Renderdamine ei toimu keset pikka ülesannet

```js
statusElement.textContent = "Töötan...";

const start = Date.now();

while (Date.now() - start < 3000) {
  // Blokeeriv töö
}

statusElement.textContent = "Valmis.";
```

Kuigi DOM-i tekst muutub esmalt väärtuseks „Töötan...”, ei pruugi kasutaja seda näha. Sama pikk ülesanne blokeerib brauserit ning renderdamine saab toimuda alles pärast ülesande lõppu.

Asünkroonne API ei muuda rasket sünkroonset arvutust automaatselt mitteblokeerivaks.

## Event loop ei tähenda paralleelset JavaScripti

Event loop korraldab, millal valmis tegevuste JavaScript käivitub. See ei tähenda, et kõik töötlejad jooksevad samal ajal.

Tõeline paralleelne töö vajab teistsuguseid vahendeid, näiteks Web Workerit. Brauser võib ise võrgu- ja muid tegevusi taustal korraldada, kuid nende JavaScripti töötlejad täidetakse ikkagi sobival ajal.

## Ennusta järjekord

```js
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve()
  .then(() => {
    console.log("3");
  })
  .then(() => {
    console.log("4");
  });

queueMicrotask(() => {
  console.log("5");
});

console.log("6");
```

::: details Vastus ja põhjendus
Väljund on:

```text
1
6
3
5
4
2
```

Algne skript logib `1` ja `6`. Esimene Promise'i töötleja ning `queueMicrotask()` lisatakse selles järjekorras mikroülesannetena. Teine `.then()` saab mikroülesandeks alles pärast esimese töötleja lõpetamist, seega tuleb see pärast `5`. Taimer on järgmine ülesanne.
:::

## Uurimisülesanne: kirjelda järjekorda

Koosta näide, mis sisaldab:

- kahte sünkroonset `console.log()` kutset;
- ühte `setTimeout(..., 0)` töötlejat;
- ühte Promise'i `.then()` töötlejat;
- ühte `async` funktsiooni koos `await` reaga.

Enne käivitamist kirjuta väljundite ennustatud järjekord. Seejärel kontrolli Console'is ning põhjenda iga rea asukohta sõnadega:

- praegune ülesanne;
- sünkroonne kood;
- mikroülesanne;
- järgmine ülesanne.

## Kokkuvõte

- JavaScript täidab ühe ülesande sünkroonse koodi lõpuni.
- Promise'i töötlejad ja `await` järel jätkuv kood kasutavad mikroülesandeid.
- Mikroülesanded töödeldakse enne järgmise ülesande, näiteks taimeri käivitamist.
- Pikk sünkroonne töö blokeerib sündmuseid ja renderdamist.
- Event loop aitab järjekorda korraldada, kuid ei muuda JavaScripti automaatselt paralleelseks.

## Allikad

- [MDN: JavaScript execution model](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model) — täitmisjärjekord ja event loop.
- [MDN: Microtask guide](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide) — ülesannete ja mikroülesannete erinevus.
- [HTML Standard: Event loops](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops) — veebiplatvormi normatiivne kirjeldus.
