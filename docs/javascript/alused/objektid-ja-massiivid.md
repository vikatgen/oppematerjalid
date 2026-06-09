---
title: Objektid ja massiivid
description: Õpi valima andmete kirjeldamiseks objekti või massiivi ning nende väärtuseid lugema ja muutma.
outline: deep
---

# Objektid ja massiivid

::: info Õpiväljund
Pärast peatüki läbimist oskad modelleerida ühe olemi objektina ja väärtuste kogumi massiivina ning põhjendada oma valikut.
:::

## Eeldused ja töövahendid

- Oskad luua `const` ja `let` muutujaid.
- Tunned põhilisi andmetüüpe.
- Kasutad brauseri DevTools Console'it või Node.js-i.
- Soovituslik kestus on 60–75 minutit.

## Miks andmeid rühmitada?

Ühe õpilase andmeid võib hoida eraldi muutujates:

```js
const studentName = "Mari";
const studentCourse = "JavaScript";
const studentIsActive = true;
```

Objekt seob ühe olemi omadused kokku:

```js
const student = {
  name: "Mari",
  course: "JavaScript",
  isActive: true
};
```

Kui väärtuseid on mitu samalaadset, sobib massiiv:

```js
const grades = [5, 2, 4, 3];
```

::: tip Valikureegel
- Objekt vastab tavaliselt küsimusele: **millised omadused sellel asjal on?**
- Massiiv vastab tavaliselt küsimusele: **millised väärtused sellesse nimekirja kuuluvad?**
:::

## Objekt: ühe olemi omadused

Objekt koosneb omadustest. Igal omadusel on võti ja väärtus:

```js
const product = {
  name: "Klaviatuur",
  price: 45,
  isInStock: true
};
```

Omadust saab lugeda punktkirjaga:

```js
console.log(product.name);  // "Klaviatuur"
console.log(product.price); // 45
```

Omaduse väärtust saab muuta:

```js
product.price = 40;

console.log(product.price); // 40
```

Uue omaduse saab lisada:

```js
product.category = "Lisaseadmed";
```

`const` keelab muutujale uue objekti omistamise, kuid objekti omadused võivad muutuda.

## Massiiv: järjestatud väärtuste kogum

Massiivis on väärtused kindlas järjekorras:

```js
const grades = [5, 2, 4, 3];
```

Massiivi indeksid algavad nullist:

```js
console.log(grades[0]); // 5
console.log(grades[1]); // 2
```

Omadus `length` näitab elementide arvu:

```js
console.log(grades.length); // 4
```

Meetod `push()` lisab väärtuse massiivi lõppu:

```js
grades.push(5);

console.log(grades);        // [5, 2, 4, 3, 5]
console.log(grades.length); // 5
```

Massiivi elementi saab indeksi kaudu muuta:

```js
grades[1] = 3;
```

::: warning Olemasolev väärtus või puuduv väärtus?
Kui kasutad indeksit, mida massiivis ei ole, saad tulemuseks `undefined`.

```js
console.log(grades[100]); // undefined
```
:::

## Objekt ja massiiv koos

Objekti omadus võib olla massiiv:

```js
const student = {
  name: "Mari",
  course: "JavaScript",
  grades: [5, 2, 4, 3]
};

console.log(student.name);      // "Mari"
console.log(student.grades[0]); // 5
```

Massiiv võib sisaldada objekte:

```js
const students = [
  { name: "Mari", isActive: true },
  { name: "Joonas", isActive: false }
];

console.log(students[0].name); // "Mari"
```

See võimaldab modelleerida näiteks klassi, toodete nimekirja või ostukorvi.

## Proovi ise: toote modelleerimine

```js
const product = {
  name: "Hiir",
  price: 25,
  tags: ["juhtmevaba", "USB"]
};

product.price = 20;
product.tags.push("soodushind");

console.log(product.name);
console.log(product.price);
console.log(product.tags.length);
```

Enne käivitamist ennusta väljund ja selgita:

1. miks `product` on objekt;
2. miks `tags` on massiiv;
3. miks `const` ei takista hinna muutmist.

::: details Kontrolli vastust
```txt
Hiir
20
3
```

`product` kirjeldab ühe toote eri omadusi. `tags` on samalaadsete väärtuste nimekiri. `const` hoiab muutujat seotud sama objektiga, kuid objekti omadusi saab muuta.
:::

## Praktiline ülesanne: õpilase andmemudel

Loo objekt `student`, mis sisaldab:

- nime;
- kursuse nime;
- aktiivsuse tõeväärtust;
- hinnete massiivi.

Seejärel:

1. väljasta õpilase nimi ja esimene hinne;
2. lisa `push()` abil uus hinne;
3. muuda kursuse nime;
4. väljasta hinnete arv;
5. loo massiiv `students`, mis sisaldab vähemalt kahte õpilase objekti.

Valmis lahendus:

- ühe õpilase omadused on ühes objektis;
- hinded on massiivis;
- omadusi loetakse punktkirjaga;
- massiivi elementi loetakse indeksiga;
- uus hinne lisatakse `push()` abil;
- `students` on objektide massiiv.

Kontrolli lahendust ka järgmiste olukordadega:

| Olukord | Oodatav tähelepanek |
|---|---|
| `grades: []` | hinnete arv on `0` |
| `student.grades[0]`, kui hindeid pole | tulemus on `undefined` |
| `students[1].name` | loetakse teise õpilase nimi |

::: details Vihje 1
Alusta objektist, mille üks omadus on `grades: []`.
:::

::: details Vihje 2
Uue hinde saad lisada käsuga `student.grades.push(5)`.
:::

::: details Üks võimalik lahendus
```js
const student = {
  name: "Mari",
  course: "JavaScript",
  isActive: true,
  grades: [4, 5, 3]
};

console.log(student.name);
console.log(student.grades[0]);

student.grades.push(5);
student.course = "Veebirakendused";

console.log(student.grades.length);

const students = [
  student,
  {
    name: "Joonas",
    course: "Veebirakendused",
    isActive: true,
    grades: [3, 4]
  }
];

console.log(students[1].name);
```
:::

## Mõtesta

- Miks ei sobi õpilase nimi, kursus ja aktiivsus üheks lihtsaks massiiviks?
- Millal on massiiv objektist parem valik?
- Mida tähendab avaldis `students[0].grades[1]`?

## Levinud vead

### Punktkirja ja indeksi roll aetakse segamini

```js
student.name;     // objekti omadus
student.grades[0]; // massiivi element
```

### Eeldatakse, et indeksid algavad ühest

Massiivi esimene element on indeksiga `0`, mitte `1`.

### Ühte muutujasse pannakse mitu eri tähendust

Kasuta objekti, kui mitu eri omadust kirjeldavad sama olemit.

## Kokkuvõte

- Objekt kirjeldab ühe olemi omadusi.
- Massiiv hoiab järjestatud väärtuste kogumit.
- Objekti omadusi loetakse punktkirjaga.
- Massiivi elemente loetakse indeksiga ning elementide arvu näitab `length`.
- `push()` lisab massiivi lõppu uue väärtuse.
- Objektid ja massiivid võivad sisaldada teineteist.

## Allikad

- [MDN: Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects) — objektide omaduste loomine ja kasutamine.
- [MDN: Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) — massiivide omadused ja meetodid.
