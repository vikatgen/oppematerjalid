---
title: Levinud JavaScripti veateated
description: Valikuline lisalugemine levinud vigade ja veaotsingu töövoo kohta.
outline: deep
---

# Levinud JavaScripti veateated

::: warning Valikuline lisalugemine
See leht on teatmematerjal. Veateadete lugemist harjutatakse peatükis [Koodi jälgimine ja silumine](/javascript/alused/koodi-jalgimine-ja-silumine).
:::

## Veaotsingu töövoog

1. Loe veateate esimene rida.
2. Leia vea liik ja kirjeldus.
3. Leia esimene sinu faili ning rea numbriga viide.
4. Kontrolli sellel real kasutatud väärtuseid.
5. Paranda üks põhjus ja käivita programm uuesti.

## `ReferenceError`

JavaScript ei leia kasutatud nime:

```js
console.log(userName);
```

```txt
ReferenceError: userName is not defined
```

Kontrolli kirjapilti, skoopi ja seda, kas muutuja on enne kasutamist deklareeritud.

## `TypeError`

Väärtusega proovitakse teha tegevust, mida see ei toeta:

```js
const user = null;
console.log(user.name);
```

```txt
TypeError: Cannot read properties of null
```

Kontrolli väärtust vahetult enne veaga rida.

## `SyntaxError`

JavaScript ei saa koodi süntaksist aru:

```js
const name = "Mari;
```

Kontrolli puuduvaid jutumärke, sulge, komasid ja loogelisi sulge.

## `NaN`

`NaN` ei ole visatud veateade, vaid arvuline väärtus, mis näitab ebaõnnestunud arvuteisendust või arvutust:

```js
const quantity = Number("kaks");

console.log(quantity);              // NaN
console.log(Number.isNaN(quantity)); // true
```

## `undefined`

`undefined` tähendab sageli, et soovitud väärtust ei leitud või sellele pole väärtust omistatud:

```js
const grades = [4, 5];

console.log(grades[10]); // undefined
```

`undefined` ei ole alati viga, kuid võib aidata vea põhjust leida.

## Kontrollküsimused

Kui näed viga, küsi:

- Millist väärtust programm sellel real kasutas?
- Kas nimi on õiges skoobis?
- Kas objekt või massiivi element on olemas?
- Kas sisend on oodatud tüüpi?
- Milline oli esimene ootamatu väärtus?

## Allikad

- [MDN: JavaScript error reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors) — JavaScripti veateadete teatmik.
