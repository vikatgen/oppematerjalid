---
title: JavaScripti korduslaused
description: Õpi massiivi väärtuseid tsükliga läbima ning nende põhjal kokkuvõtet arvutama.
outline: deep
---

# Korduslaused

::: info Õpiväljund
Pärast peatüki läbimist oskad töödelda massiivi tsükliga ning arvutada selle väärtuste põhjal kontrollitava kokkuvõtte.
:::

## Eeldused ja töövahendid

- Oskad luua `const` ja `let` muutujaid.
- Oskad kasutada lihtsat tingimuslauset.
- Tead, et massiiv hoiab järjestatud väärtuste nimekirja.
- Kasutad brauseri DevTools Console'it või Node.js-i.
- Soovituslik kestus on 60–75 minutit.

## Miks korduslauseid vaja on?

Rakendused töötavad sageli nimekirjadega: klassi hinded, ostukorvi tooted, kasutajad või teavitused. Nimekirja pikkus võib muutuda, seega ei saa iga väärtuse jaoks eraldi koodirida kirjutada.

Ilma tsüklita:

```js
const grades = [4, 5, 3];

console.log(grades[0]);
console.log(grades[1]);
console.log(grades[2]);
```

Tsükliga:

```js
const grades = [4, 5, 3];

for (const grade of grades) {
  console.log(grade);
}
```

Tsükkel käivitab sama koodiploki iga massiivi väärtuse jaoks. Kui massiivi lisatakse uus hinne, töötab tsükkel ilma uusi `console.log()` ridu lisamata.

## Üks tsükliring korraga

Tsükli keha on loogeliste sulgude vahele kirjutatud kood:

```js
const grades = [4, 5, 3];

for (const grade of grades) {
  console.log(`Praegune hinne: ${grade}`);
}
```

Tsükkel teeb kolm ringi:

| Ring | `grade` väärtus | Väljund |
|---:|---:|---|
| 1 | `4` | `Praegune hinne: 4` |
| 2 | `5` | `Praegune hinne: 5` |
| 3 | `3` | `Praegune hinne: 3` |

Iga ringi alguses saab tsüklimuutuja `grade` järgmise massiivi väärtuse.

::: details Ennusta
Mitu korda käivitub tsükli keha ja mida väljastatakse?

```js
const names = ["Mari", "Joonas"];

for (const name of names) {
  console.log(`Tere, ${name}!`);
}
```
:::

::: details Kontrolli vastust
Tsükli keha käivitub kaks korda:

```txt
Tere, Mari!
Tere, Joonas!
```
:::

## `for...of`: töötle massiivi väärtuseid

Kasuta `for...of` tsüklit, kui soovid massiivi väärtuseid ükshaaval kasutada ja nende indeksit pole vaja.

```js
const prices = [10, 25, 5];

for (const price of prices) {
  console.log(`${price} €`);
}
```

Tsüklimuutuja nimi peaks kirjeldama ühte massiivi elementi:

```js
for (const grade of grades) {
  // grade on üks hinne
}

for (const product of products) {
  // product on üks toode
}
```

## Tulemuse kogumine tsüklis

Sageli peab tsükkel koostama mitme väärtuse põhjal ühe tulemuse. Selleks loo enne tsüklit kogumismuutuja ja uuenda seda igal ringil.

### Summa arvutamine

```js
const grades = [4, 5, 3, 2];
let total = 0;

for (const grade of grades) {
  total = total + grade;
}

console.log(total); // 14
```

Kogumismuutuja `total` muutub igal ringil:

| Ring | `grade` | `total` enne | `total` pärast |
|---:|---:|---:|---:|
| algus | – | – | `0` |
| 1 | `4` | `0` | `4` |
| 2 | `5` | `4` | `9` |
| 3 | `3` | `9` | `12` |
| 4 | `2` | `12` | `14` |

::: tip Kogumismuutuja algväärtus
Summa alustab tavaliselt väärtusest `0`, sest null ei muuda liitmise tulemust.
:::

### Sobivate väärtuste loendamine

Tsükli sees saab kasutada tingimuslauset:

```js
const grades = [4, 2, 5, 1, 3];
let positiveGradeCount = 0;

for (const grade of grades) {
  if (grade >= 3) {
    positiveGradeCount = positiveGradeCount + 1;
  }
}

console.log(positiveGradeCount); // 3
```

Loendur suureneb ainult nende hinnete puhul, mis vastavad tingimusele `grade >= 3`.

## Praktiline näide: hinnete kokkuvõte

Ühes tsüklis saab koguda mitu tulemust:

```js
const grades = [4, 5, 2, 3, 1];
let total = 0;
let positiveGradeCount = 0;

for (const grade of grades) {
  total = total + grade;

  if (grade >= 3) {
    positiveGradeCount = positiveGradeCount + 1;
  }
}

const average = total / grades.length;

console.log(`Keskmine hinne: ${average}`);
console.log(`Positiivseid hindeid: ${positiveGradeCount}`);
```

Tsükkel teeb iga hinde jaoks kaks võimalikku tegevust:

1. lisab hinde summale;
2. suurendab loendurit, kui hinne on positiivne.

::: warning Tühi massiiv
Kui massiiv on tühi, siis `grades.length` on `0` ning `total / grades.length` annab tulemuseks `NaN`.

Enne keskmise arvutamist kontrolli, kas massiivis on väärtuseid:

```js
if (grades.length > 0) {
  const average = total / grades.length;
  console.log(average);
} else {
  console.log("Hinded puuduvad");
}
```
:::

## Indeksiga `for`-tsükkel

Kasuta tavalist `for`-tsüklit, kui vajad massiivi elemendi asukohta ehk indeksit.

```js
const names = ["Mari", "Joonas", "Kati"];

for (let index = 0; index < names.length; index++) {
  console.log(`${index + 1}. ${names[index]}`);
}
```

`for`-tsükli päises on kolm osa:

```js
for (let index = 0; index < names.length; index++) {
  // tsükli keha
}
```

| Osa | Roll |
|---|---|
| `let index = 0` | loob algväärtusega tsüklimuutuja |
| `index < names.length` | määrab, kas järgmine ring toimub |
| `index++` | suurendab indeksit pärast iga ringi |

Massiivi indeksid algavad nullist. Viimase elemendi indeks on alati ühe võrra väiksem kui massiivi pikkus.

::: details Ennusta
Millised väärtused saab `index` ja mida programm väljastab?

```js
const colors = ["sinine", "roheline"];

for (let index = 0; index < colors.length; index++) {
  console.log(index, colors[index]);
}
```
:::

::: details Kontrolli vastust
```txt
0 sinine
1 roheline
```

Kui `index` saab väärtuseks `2`, on tingimus `index < colors.length` väär ja tsükkel lõpeb.
:::

## `while`: korda kuni olukord muutub

`while` sobib olukorda, kus ringide arv sõltub tingimusest ja pole alguses kindlalt teada.

```js
let attemptsLeft = 3;

while (attemptsLeft > 0) {
  console.log(`Katseid alles: ${attemptsLeft}`);
  attemptsLeft = attemptsLeft - 1;
}
```

Iga `while`-tsükkel vajab:

1. algseisu enne tsüklit;
2. jätkamise tingimust;
3. muutust tsükli sees, mis viib tingimuse lõpuks väärtuseni `false`.

::: danger Lõpmatu tsükkel
Kui tingimuses kasutatav väärtus ei muutu, võib tsükkel jääda lõputult tööle:

```js
let count = 0;

while (count < 5) {
  console.log(count);
  // count ei muutu
}
```

Kui käivitasid kogemata lõpmatu tsükli, peata programmi töö. Brauseri konsool võib vajada vahekaardi sulgemist.
:::

## Proovi ise: ostukorvi summa

Kopeeri kood brauseri DevTools Console'isse või Node.js faili:

```js
const prices = [12, 8, 25];
let total = 0;

for (const price of prices) {
  total = total + price;
  console.log(`Pärast ${price} € lisamist on summa ${total} €`);
}

console.log(`Ostukorv kokku: ${total} €`);
```

Enne käivitamist:

1. ennusta `total` väärtus pärast iga ringi;
2. ennusta lõplik väljund;
3. lisa massiivi väärtus `5` ja ennusta uus summa;
4. selgita, miks `total` peab olema loodud `let`-iga.

::: details Kontrolli vastust
Algse massiiviga muutub `total` järgmiselt:

```txt
12
20
45
```

Lõplik väljund on `Ostukorv kokku: 45 €`. Väärtuse `5` lisamisel on uus summa `50`.

`total` on loodud `let`-iga, sest sellele omistatakse tsükli igal ringil uus väärtus.
:::

## Praktiline ülesanne: õpilase hinnete aruanne

Koosta programm, mis töötleb ühe õpilase hindeid.

Lähteandmed:

```js
const studentName = "Mari";
const grades = [5, 2, 4, 3, 1, 5];
```

Programm peab ühe `for...of` tsükliga:

1. arvutama kõikide hinnete summa;
2. loendama positiivsed hinded ehk hinded alates `3`;
3. loendama mitterahuldavad hinded ehk hinded alla `3`;
4. arvutama pärast tsüklit keskmise hinde;
5. väljastama aruande.

Oodatav väljund:

```txt
Mari keskmine hinne on 3.33.
Positiivseid hindeid: 4.
Mitterahuldavaid hindeid: 2.
```

Valmis lahendus:

- kasutab kõigi tulemuste kogumiseks ühte `for...of` tsüklit;
- summa ja loendurid algavad sobivast algväärtusest;
- iga hinne suurendab täpselt ühte kahest loendurist;
- keskmine ümardatakse meetodiga `toFixed(2)`;
- tühja hinnete massiivi korral väljastatakse `"Hinded puuduvad"` ning keskmist ei arvutata.

Kontrolli programmi vähemalt järgmiste andmetega:

| Hinded | Oodatav tulemus |
|---|---|
| `[5, 2, 4, 3, 1, 5]` | keskmine `3.33`, positiivseid `4`, mitterahuldavaid `2` |
| `[3]` | keskmine `3.00`, positiivseid `1`, mitterahuldavaid `0` |
| `[2]` | keskmine `2.00`, positiivseid `0`, mitterahuldavaid `1` |
| `[]` | `Hinded puuduvad` |

::: details Vihje 1
Loo enne tsüklit kolm `let` muutujat: summa, positiivsete hinnete arv ja mitterahuldavate hinnete arv.
:::

::: details Vihje 2
Igal ringil lisa hinne summale. Seejärel kasuta `if` / `else` otsust, et suurendada ühte loendurit.
:::

::: details Vihje 3
Kontrolli enne keskmise arvutamist tingimust `grades.length > 0`.
:::

::: details Üks võimalik lahendus
```js
const studentName = "Mari";
const grades = [5, 2, 4, 3, 1, 5];

let total = 0;
let positiveGradeCount = 0;
let failingGradeCount = 0;

for (const grade of grades) {
  total = total + grade;

  if (grade >= 3) {
    positiveGradeCount = positiveGradeCount + 1;
  } else {
    failingGradeCount = failingGradeCount + 1;
  }
}

if (grades.length > 0) {
  const average = total / grades.length;

  console.log(`${studentName} keskmine hinne on ${average.toFixed(2)}.`);
  console.log(`Positiivseid hindeid: ${positiveGradeCount}.`);
  console.log(`Mitterahuldavaid hindeid: ${failingGradeCount}.`);
} else {
  console.log("Hinded puuduvad");
}
```
:::

## Mõtesta

- Miks luuakse kogumismuutujad enne tsüklit, mitte tsükli sees?
- Millal eelistad `for...of` tsüklit ja millal indeksiga `for`-tsüklit?
- Milline muutus peab `while`-tsükli sees toimuma, et tsükkel lõppeks?
- Miks tuleb tühja massiivi kontrollida enne keskmise arvutamist?

## Järgmine tase

Järgmised võtted on kasulikud, kuid praktilise ülesande lahendamiseks ei ole need kohustuslikud.

### `break` ja `continue`

`break` lõpetab tsükli täielikult:

```js
const names = ["Mari", "Joonas", "Kati"];

for (const name of names) {
  if (name === "Joonas") {
    break;
  }

  console.log(name);
}
```

`continue` jätab praeguse ringi ülejäänud osa vahele ja liigub järgmise ringi juurde:

```js
const grades = [5, 2, 4, 1, 3];

for (const grade of grades) {
  if (grade < 3) {
    continue;
  }

  console.log(`Positiivne hinne: ${grade}`);
}
```

### Massiivimeetodid: tsüklid kindla eesmärgiga

Massiivimeetodid nagu `map()`, `filter()`, `find()` ja `reduce()` läbivad samuti massiivi väärtuseid. Iga meetod kirjeldab kindlat eesmärki:

| Meetod | Eesmärk | Tulemus |
|---|---|---|
| `forEach()` | teha iga väärtusega tegevus | uut massiivi ei looda |
| `map()` | muuta iga väärtus uueks väärtuseks | uus sama pikkusega massiiv |
| `filter()` | jätta alles sobivad väärtused | uus massiiv |
| `find()` | leida esimene sobiv väärtus | üks väärtus või `undefined` |
| `some()` | kontrollida, kas vähemalt üks väärtus sobib | `boolean` |
| `every()` | kontrollida, kas kõik väärtused sobivad | `boolean` |
| `reduce()` | koguda väärtustest üks tulemus | üks lõpptulemus |

Näiteks positiivsete hinnete leidmine käsitsi:

```js
const grades = [5, 2, 4, 1, 3];
const positiveGrades = [];

for (const grade of grades) {
  if (grade >= 3) {
    positiveGrades.push(grade);
  }
}
```

Sama tulemus `filter()` meetodiga:

```js
const grades = [5, 2, 4, 1, 3];
const positiveGrades = grades.filter((grade) => grade >= 3);
```

`map()` loob iga algse väärtuse põhjal uue väärtuse:

```js
const grades = [5, 2, 4];
const gradeLabels = grades.map((grade) => `Hinne: ${grade}`);

console.log(gradeLabels); // ["Hinne: 5", "Hinne: 2", "Hinne: 4"]
```

`reduce()` kogub väärtustest ühe tulemuse. See teeb siin sama töö nagu summa kogumine `for...of` tsükliga:

```js
const grades = [5, 2, 4];
const total = grades.reduce((sum, grade) => sum + grade, 0);

console.log(total); // 11
```

::: info Tule pärast funktsioonide õppimist tagasi
Massiivimeetodile antakse kaasa funktsioon, mida kutsutakse iga elemendi jaoks. Seda nimetatakse **tagasikutsefunktsiooniks** (*callback function*).

Esmalt õpi kirjutama ja tagastama väärtuseid [funktsioonide peatükis](./funktsioonid.md). Seejärel on `map()`, `filter()` ja teised massiivimeetodid lihtsamini mõistetavad.
:::

## Levinud vead

### Indeks liigub ühe võrra liiga kaugele

```js
const names = ["Mari", "Joonas", "Kati"];

for (let index = 0; index <= names.length; index++) {
  console.log(names[index]); // viimane väärtus on undefined
}
```

Õige tingimus on `index < names.length`, sest viimane indeks on ühe võrra väiksem kui massiivi pikkus.

### Kogumismuutuja luuakse tsükli sees

```js
const grades = [4, 5, 3];

for (const grade of grades) {
  let total = 0;
  total = total + grade;
}
```

Igal ringil luuakse uus `total` väärtusega `0`. Loo kogumismuutuja enne tsüklit.

### `while`-tsükli tingimus ei muutu

```js
let count = 0;

while (count < 5) {
  console.log(count);
}
```

Lisa tsüklisse muutus, mis viib tingimuse lõpuks väärtuseni `false`.

## Kokkuvõte

- Tsükkel käivitab sama koodiploki mitu korda.
- `for...of` sobib massiivi väärtuste töötlemiseks.
- Indeksiga `for`-tsükkel sobib siis, kui vajad elemendi asukohta.
- `while` sobib siis, kui korduste arv sõltub muutuvast tingimusest.
- Summa või loenduri kogumiseks loo `let` muutuja enne tsüklit.
- Tingimuslause tsükli sees võimaldab töödelda ainult sobivaid väärtuseid.
- Massiivimeetodid on kindla eesmärgiga tsüklid, mida kasutame pärast funktsioonide õppimist.

## Allikad

- [MDN: Loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration) — JavaScripti tsüklite ülevaade.
- [MDN: `for...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) — massiivi väärtuste läbimine.
- [MDN: Array iterative methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#iterative_methods) — massiivimeetodid, mis kutsuvad iga elemendi jaoks funktsiooni.
