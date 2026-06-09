---
title: Programmeerimise aluste vahekaitsmine
description: Suulise vahekaitsmise nõuded ja valmistumise juhend.
outline: deep
---

# Mooduli vahekaitsmine

## Eesmärk

Vahekaitsmine kontrollib, kas oskad etteantud JavaScripti koodi lugeda, selle käitumist oma sõnadega selgitada ning põhjendada, kuidas tulemust kontrolliksid.

Vahekaitsmine on suuline arutelu, mitte süntaksi päheõppimise kontroll.

## Läbivad küsimused

Iga koodinäite juures ole valmis selgitama:

1. Millised on programmi sisendid ja väljund?
2. Millised sammud viivad sisendist väljundini?
3. Kuidas muutujate väärtused täitmise ajal muutuvad?
4. Miks kasutatakse objekti, massiivi, tingimust, tsüklit või funktsiooni?
5. Millise näidisandme või piirjuhuga tulemust kontrolliksid?
6. Kuidas otsiksid vea põhjust, kui tulemus oleks vale?

## Põhimõisted

### Muutujad ja andmetüübid

Oskad selgitada:

- deklaratsiooni ja omistamise erinevust;
- `const` ja `let` valikut;
- tähenduslike nimede kasu;
- põhilisi andmetüüpe;
- sisendväärtuse teadlikku tüübiteisendust.

```js
const quantityInput = "2";
const quantity = Number(quantityInput);
```

Selgita mõlema muutuja tüüpi ja miks teisendus on vajalik.

### Objektid ja massiivid

Oskad selgitada:

- miks ühe olemi omadused sobivad objekti;
- miks väärtuste kogum sobib massiivi;
- kuidas lugeda objekti omadust ja massiivi elementi;
- mida näitavad indeks ja `length`.

```js
const student = {
  name: "Mari",
  grades: [4, 5, 3]
};
```

Selgita, miks `student` on objekt ja `grades` massiiv.

### Tingimuslaused

Oskad selgitada:

- kuidas valitakse esimene sobiv haru;
- võrdlus- ja loogikaoperaatorite rolli;
- tingimuste järjekorda ja piirväärtuseid;
- `truthy` ja `falsy` väärtuste põhimõtet.

### Korduslaused

Oskad selgitada:

- mitu korda tsükkel käivitub;
- millise väärtuse saab tsüklimuutuja igal ringil;
- kuidas kogutakse summat või loendurit;
- kuidas tekib lõpmatu tsükkel.

### Funktsioonid

Oskad selgitada:

- funktsiooni parameetreid ja kutse argumente;
- `return` ja `console.log()` erinevust;
- funktsiooni kohalikku skoopi;
- miks funktsiooni kontrollitakse erinevate argumentidega.

## Arutelunäide

```js
function getAverageGrade(grades) {
  if (grades.length === 0) {
    return null;
  }

  let total = 0;

  for (const grade of grades) {
    total = total + grade;
  }

  return total / grades.length;
}

const student = {
  name: "Mari",
  grades: [4, 5, 3]
};

const average = getAverageGrade(student.grades);
```

Ole valmis selgitama:

- programmi sisendit ja tulemust;
- objekti ja massiivi rolli;
- `total` väärtust pärast iga tsükliringi;
- tühja massiivi kontrolli;
- parameetri ja argumendi erinevust;
- kuidas kontrolliksid funktsiooni käitumist.

## Kuidas valmistuda?

1. Käivita põhiloengute näited ise läbi.
2. Ennusta väljund enne käivitamist.
3. Koosta muutuvate väärtuste jälgimistabel.
4. Muuda näidisandmeid ja selgita, miks tulemus muutub.
5. Harjuta ühe vea põhjuse leidmist ning paranduse kontrollimist.
6. Selgita koodi valjusti ilma ridu lihtsalt ümber lugemata.

## Hindamise mõte

Kõige olulisem on arusaamine. Koodis tekkinud viga ei tähenda automaatselt ebaõnnestumist. Oluline on osata kirjeldada oodatavat tulemust, jälgida väärtuseid, leida tõenäoline põhjus ja põhjendada kontrolli.

Valikulised lisalugemised, näiteks hoisting, strict mode ja massiivimeetodid, ei kuulu vahekaitsmise nõutava taseme alla.
