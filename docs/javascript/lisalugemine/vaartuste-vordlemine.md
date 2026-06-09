---
title: Väärtuste võrdlemine
description: Valikuline lisalugemine primitiivide, objektide ja viidete võrdlemisest.
outline: deep
---

# Väärtuste võrdlemine

::: warning Valikuline lisalugemine
See materjal ei kuulu programmeerimise aluste nõutava taseme ega mooduli vahekaitsmise alla.
:::

## Primitiivide võrdlemine

Range võrdlus `===` kontrollib väärtust ja tüüpi:

```js
console.log(5 === 5);     // true
console.log(5 === "5");   // false
console.log("Mari" === "Mari"); // true
```

Primitiivsete väärtuste puhul võrreldakse väärtuseid.

## Objektide võrdlemine

Objektide puhul kontrollib `===`, kas mõlemad pooled viitavad samale objektile:

```js
const first = { name: "Mari" };
const second = { name: "Mari" };

console.log(first === second); // false
```

Objektide sisu näeb samasugune välja, kuid tegemist on kahe eri objektiga.

```js
const first = { name: "Mari" };
const second = first;

console.log(first === second); // true
```

Nüüd annavad mõlemad muutujad ligipääsu samale objektile.

## Massiivide võrdlemine

Ka massiivid on objektid:

```js
console.log([1, 2] === [1, 2]); // false

const grades = [4, 5];
const sameGrades = grades;

console.log(grades === sameGrades); // true
```

## Kuidas sisu võrrelda?

Lihtsa objekti puhul võrdle vajalikke omadusi:

```js
const first = { name: "Mari", age: 17 };
const second = { name: "Mari", age: 17 };

const hasSameData =
  first.name === second.name &&
  first.age === second.age;

console.log(hasSameData); // true
```

Massiivide puhul sõltub sobiv lahendus ülesandest. Näiteks saab kontrollida pikkust ja elemente tsükliga. Üldist sügavat objektivõrdlust ei tasu alguses ise leiutada.

## Proovi ise

Ennusta tulemused:

```js
const student = { name: "Mari" };
const sameStudent = student;
const copiedStudent = { name: "Mari" };

console.log(student === sameStudent);
console.log(student === copiedStudent);
console.log(student.name === copiedStudent.name);
```

::: details Kontrolli vastust
```txt
true
false
true
```
:::

## Allikad

- [MDN: Strict equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality) — `===` operaatori käitumine.
