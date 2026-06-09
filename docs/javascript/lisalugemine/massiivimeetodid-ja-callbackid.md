---
title: Massiivimeetodid ja callback-funktsioonid
description: Valikuline lisalugemine map-, filter-, find-, some-, every- ja reduce-meetoditest.
outline: deep
---

# Massiivimeetodid ja callback-funktsioonid

::: warning Valikuline lisalugemine
See materjal ei kuulu programmeerimise aluste nõutava taseme ega mooduli vahekaitsmise alla.
:::

Massiivimeetodid läbivad massiivi väärtuseid nagu tsükkel, kuid iga meetod kirjeldab kindlat eesmärki. Meetodile antud funktsiooni nimetatakse **tagasikutsefunktsiooniks** (*callback function*).

```js
function isPositiveGrade(grade) {
  return grade >= 3;
}

const grades = [5, 2, 4, 1, 3];
const positiveGrades = grades.filter(isPositiveGrade);
```

`filter()` kutsub funktsiooni `isPositiveGrade` iga hinde jaoks.

## Meetodi valimine

| Küsimus | Meetod | Tulemus |
|---|---|---|
| Soovin iga väärtust muuta | `map()` | uus sama pikkusega massiiv |
| Soovin sobivad väärtused alles jätta | `filter()` | uus massiiv |
| Soovin esimese sobiva väärtuse leida | `find()` | väärtus või `undefined` |
| Kas vähemalt üks väärtus sobib? | `some()` | `boolean` |
| Kas kõik väärtused sobivad? | `every()` | `boolean` |
| Soovin ühe tulemuse koguda | `reduce()` | üks väärtus |

## `map()`: muuda iga väärtust

```js
const grades = [5, 2, 4];
const labels = grades.map((grade) => `Hinne: ${grade}`);

console.log(labels); // ["Hinne: 5", "Hinne: 2", "Hinne: 4"]
```

`map()` ei muuda algset massiivi. Ta loob iga algse elemendi kohta ühe uue elemendi.

## `filter()`: jäta sobivad alles

```js
const grades = [5, 2, 4, 1, 3];
const positiveGrades = grades.filter((grade) => grade >= 3);

console.log(positiveGrades); // [5, 4, 3]
```

Callback peab tagastama `true` nende väärtuste jaoks, mis jäävad tulemusse.

## `find()`, `some()` ja `every()`

```js
const grades = [5, 2, 4, 1, 3];

const firstFailingGrade = grades.find((grade) => grade < 3);
const hasFailingGrade = grades.some((grade) => grade < 3);
const allGradesValid = grades.every((grade) => grade >= 1 && grade <= 5);

console.log(firstFailingGrade); // 2
console.log(hasFailingGrade);   // true
console.log(allGradesValid);    // true
```

## `reduce()`: kogu üks tulemus

```js
const grades = [5, 2, 4];
const total = grades.reduce((sum, grade) => {
  return sum + grade;
}, 0);

console.log(total); // 11
```

Väärtus `0` on kogumismuutuja `sum` algväärtus.

::: tip Eelista alguses loetavust
Kui `reduce()` lahendus tundub raskemini selgitatav kui `for...of` tsükkel, kasuta tsüklit. Lühim kood ei ole alati kõige selgem.
:::

## Tsükkel või meetod?

Käsitsi kirjutatud tsükkel:

```js
const grades = [5, 2, 4, 1, 3];
const positiveGrades = [];

for (const grade of grades) {
  if (grade >= 3) {
    positiveGrades.push(grade);
  }
}
```

Sama eesmärk meetodiga:

```js
const positiveGrades = grades.filter((grade) => grade >= 3);
```

Meetod ütleb kohe, millist tulemust soovitakse. Tsükkel annab rohkem kontrolli, kui ühel läbimisel tehakse mitu eri tegevust.

## Proovi ise

Kasuta massiivi:

```js
const prices = [10, 25, 5, 60];
```

1. Loo `map()` abil hinnasildid.
2. Leia `filter()` abil hinnad alates 20 eurost.
3. Leia `find()` abil esimene hind üle 50 euro.
4. Kontrolli `some()` abil, kas leidub hind alla 10 euro.
5. Arvuta `reduce()` abil summa.

::: details Kontrolli vastust
```js
const labels = prices.map((price) => `${price} €`);
const expensivePrices = prices.filter((price) => price >= 20);
const firstOverFifty = prices.find((price) => price > 50);
const hasPriceUnderTen = prices.some((price) => price < 10);
const total = prices.reduce((sum, price) => sum + price, 0);
```
:::

## Allikad

- [MDN: Array iterative methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#iterative_methods) — massiivimeetodite teatmematerjal.
