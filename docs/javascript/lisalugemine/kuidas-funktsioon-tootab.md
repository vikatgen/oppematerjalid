---
title: Kuidas funktsioon töötab?
description: Valikuline lisalugemine funktsioonikutsetest, parameetritest, kohalikust skoobist ja call stack'ist.
outline: deep
---

# Kuidas funktsioon töötab?

::: warning Valikuline lisalugemine
See materjal ei kuulu programmeerimise aluste nõutava taseme ega mooduli vahekaitsmise alla.
:::

Funktsiooni kutsumisel loob JavaScript selle kutse jaoks täitmiskonteksti: seob argumendid parameetritega, loob kohalikud muutujad ja jätab meelde, kuhu pärast `return` käsku tagasi minna.

```js
function calculateTotal(price, quantity) {
  const total = price * quantity;
  return total;
}

const result = calculateTotal(10, 3);
```

Lihtsustatud sammud:

1. käivitatakse `calculateTotal(10, 3)`;
2. `price` seotakse väärtusega `10`;
3. `quantity` seotakse väärtusega `3`;
4. luuakse kohalik `total` väärtusega `30`;
5. `return` annab väärtuse `30` kutsujale;
6. `result` seotakse väärtusega `30`.

## Iga kutse saab oma kohalikud väärtused

```js
function double(number) {
  const result = number * 2;
  return result;
}

const first = double(3);
const second = double(5);
```

Esimesel ja teisel kutsel on eraldi `number` ning `result` väärtused.

## Call stack'i lihtsustatud mudel

**Kutsepinu** (*call stack*) aitab kirjeldada, milline funktsioon parasjagu töötab ja kuhu pärast selle lõppu tagasi minna.

```js
function addTax(price) {
  return price * 1.2;
}

function getFinalPrice(price) {
  return addTax(price);
}

console.log(getFinalPrice(10));
```

Lihtsustatud järjekord:

```txt
globaalne kood
└─ getFinalPrice(10)
   └─ addTax(10)
```

`addTax()` lõpetab esimesena, seejärel jätkab `getFinalPrice()` ja lõpuks globaalne kood.

::: warning Lihtsustatud mootorimudel
Call stack kirjeldab funktsioonikutsete järjekorda. JavaScripti mootor võib väärtuseid ja mälu sisemiselt optimeerida viisil, mida see joonis ei näita.
:::

## `return` lõpetab aktiivse kutse

```js
function getAccessMessage(isBlocked) {
  if (isBlocked) {
    return "Ligipääs keelatud";
  }

  return "Ligipääs lubatud";
}
```

Kui `isBlocked` on `true`, lõpetab esimene `return` funktsioonikutse. Teist `return` käsku ei käivitata.

## Rekursiooni asemel selge tsükkel

Funktsioon võib tehniliselt kutsuda iseennast, kuid rekursiooni selles materjalis veel ei käsitleta. Alguses eelista korduva töö jaoks tsüklit, mille tööjärjekorda oskad jälgida.

## Ennusta ja joonista

Joonista kutsepinu järgmise programmi jaoks:

```js
function multiply(a, b) {
  return a * b;
}

function calculateArea(width, height) {
  return multiply(width, height);
}

const area = calculateArea(4, 3);
```

::: details Kontrolli mudelit
```txt
globaalne kood
└─ calculateArea(4, 3)
   └─ multiply(4, 3)
```

`multiply()` tagastab `12`, `calculateArea()` tagastab `12` ja `area` saab väärtuse `12`.
:::

## Allikad

- [MDN: Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions) — funktsioonide töö ja kasutamine.
- [MDN: Execution model](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model) — JavaScripti täitmise ja kutsepinu ülevaade.
