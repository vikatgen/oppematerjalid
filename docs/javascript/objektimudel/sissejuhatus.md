---
title: JavaScripti objektimudel
description: Mõista primitiivide ja objektide erinevust ning selgita, miks massiiv ja funktsioon on JavaScriptis objektid.
outline: deep
---

# JavaScripti objektimudel

::: info Õpiväljund
Pärast õppetundi oskad kontrollida väärtuse liiki ning selgitada, miks massiiv ja funktsioon käituvad objektidena, kuid kõik JavaScripti väärtused ei ole objektid.
:::

See eraldiseisev moodul järgneb JavaScripti aluste ja brauserikeskkonna teemadele ning valmistab ette klassipõhist lähenemist Node.js API loomisel.

Objektorienteeritud programmeerimise mõistmiseks tuleb esmalt aru saada, mida JavaScript **objektiks** nimetab. Igapäevases koodis kohtad tavalisi objekte, massiive, funktsioone, kuupäevi, DOM-elemente ja palju muid objektide liike.

## Kõik ei ole objekt

JavaScripti väärtused jagunevad lihtsustatud kujul kaheks:

| Primitiivid | Objektid |
|---|---|
| `string`, `number`, `boolean`, `undefined`, `null`, `bigint`, `symbol` | tavalised objektid, massiivid, funktsioonid, `Date`, `URL`, DOM-elemendid |
| kirjeldavad üht lihtsat väärtust | võivad sisaldada omadusi ja käitumist |
| on muutumatud | nende omadusi saab üldjuhul muuta |

```js
const name = "Mari";
const grades = [4, 5, 3];
const student = { name: "Mari" };

console.log(typeof name);    // "string"
console.log(typeof grades);  // "object"
console.log(typeof student); // "object"
```

::: warning `typeof null` on ajalooline erand
`typeof null` annab tulemuseks `"object"`, kuigi `null` on primitiiv. Ära kasuta seda tulemust tõendina, et `null` on objekt.
:::

## Massiiv on eriline objekt

Massiivi indeksid ja `length` on objektiga seotud omadused:

```js
const grades = [4, 5, 3];

console.log(grades[0]);      // 4
console.log(grades.length);  // 3
grades.push(5);
```

Massiiv on loodud järjestatud väärtuste hoidmiseks. See pakub selleks erikäitumist, näiteks automaatselt muutuvat `length` omadust ja massiivimeetodeid.

Kuna `typeof` ütleb massiivi kohta ainult `"object"`, kasuta täpsemaks kontrolliks:

```js
console.log(Array.isArray(grades)); // true
console.log(Array.isArray(student)); // false
```

## Funktsioon on väljakutsutav objekt

Funktsiooni saab välja kutsuda, kuid sellel võivad olla ka omadused:

```js
function greet(name) {
  return `Tere, ${name}!`;
}

greet.description = "Loob tervituse";

console.log(greet("Mari"));
console.log(greet.description);
console.log(typeof greet); // "function"
```

`typeof` annab funktsiooni jaoks eraldi tulemuse `"function"`, kuid funktsioon osaleb JavaScripti objektimudelis: sellel on omadused ja prototüüp.

## Miks primitiivil näib olevat meetod?

```js
console.log("tere".toUpperCase()); // "TERE"
```

String on primitiiv, kuid JavaScript võimaldab sellel kasutada `String.prototype` meetodeid. Meetodi kasutamise ajaks käsitleb mootor primitiivi ajutiselt vastava objektitaolise väärtusena. Primitiiv ise ei muutu objektiks ega muudetavaks.

Stringi meetod tagastab uue väärtuse. Algne string ei muutu:

```js
const word = "tere";
const upperWord = word.toUpperCase();

console.log(word);      // "tere"
console.log(upperWord); // "TERE"
```

## Praktiline ülesanne: liigita väärtused

Käivita järgmine kood ja koosta iga väärtuse kohta selgitus:

```js
const values = [
  "tere",
  42,
  null,
  { name: "Mari" },
  [4, 5],
  function calculate() {},
  new Date()
];

for (const value of values) {
  console.log({
    value,
    type: typeof value,
    isArray: Array.isArray(value)
  });
}
```

Kontrollitav tulemus: oskad iga väärtuse puhul põhjendada, kas tegemist on primitiivi, massiivi, funktsiooni või muu objektiga.

## Kontrollpunkt

- Miks ei ole väide „JavaScriptis on kõik objekt” täpne?
- Miks tagastab `typeof []` tulemuse `"object"`?
- Miks kasutada massiivi tuvastamiseks `Array.isArray()` meetodit?
- Kuidas saab string kasutada meetodit, kuigi string on primitiiv?

Järgmisena: [Prototüübid ja pärilikkus](/javascript/objektimudel/prototuubid-ja-parilikkus).

## Allikad

- [MDN: JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures)
- [MDN: Array.isArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
