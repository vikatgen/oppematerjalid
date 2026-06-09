---
title: Koodi jälgimine ja silumine
description: Õpi jälgima programmi täitmist, lugema veateateid ja parandama ühe vea korraga.
outline: deep
---

# Koodi jälgimine ja silumine

::: info Õpiväljund
Pärast peatüki läbimist oskad jälgida väikese programmi täitmist rida-realt, leida vea põhjuse ja kontrollida parandust näidisandmetega.
:::

## Eeldused ja töövahendid

- Oskad kasutada muutujaid, tingimusi, tsükleid ja funktsioone.
- Kasutad brauseri DevTools Console'it või Node.js-i.
- Soovituslik kestus on 60–75 minutit.

## Viga ei tähenda, et kõik on valesti

Silumine (*debugging*) on vea põhjuse leidmine ja paranduse kontrollimine. Hea siluja ei muuda korraga juhuslikult mitut rida. Ta:

1. kirjeldab oodatavat tulemust;
2. käivitab programmi ja vaatab tegelikku tulemust;
3. leiab esimese koha, kus väärtus muutub ootamatuks;
4. parandab ühe põhjuse;
5. kontrollib uuesti mitme sisendiga.

## Jälgi väärtuseid rida-realt

```js
const prices = [10, 5, 20];
let total = 0;

for (const price of prices) {
  total = total + price;
}

console.log(total);
```

Koosta jälgimistabel:

| Samm | `price` | `total` |
|---|---:|---:|
| enne tsüklit | – | `0` |
| ring 1 | `10` | `10` |
| ring 2 | `5` | `15` |
| ring 3 | `20` | `35` |

Tabel aitab leida, millisel sammul tulemus oodatust erineb.

## Kolm levinud vealiiki

### Süntaksiviga

Kood ei vasta JavaScripti kirjutusreeglitele:

```js
const userName = "Mari;
```

Programm annab `SyntaxError` vea ega saa seda koodi käivitada.

### Käitusviga

Kood käivitub, kuid töö ajal tehakse võimatu tegevus:

```js
console.log(userName); // ReferenceError
```

```js
const user = null;
console.log(user.name); // TypeError
```

### Loogikaviga

Programm töötab ilma veateateta, kuid tulemus on vale:

```js
const cartTotal = 50;

if (cartTotal > 50) {
  console.log("Tasuta tarne");
}
```

Kui tasuta tarne algab 50 eurost, peab võrdlus olema `>=`.

## Veateate lugemine

Veateatest otsi:

1. vea liik, näiteks `ReferenceError`;
2. lühike põhjuse kirjeldus;
3. fail ja rea number;
4. esimene sinu kirjutatud koodirida, millele veajälg viitab.

```txt
ReferenceError: userName is not defined
    at app.js:4:13
```

See ütleb, et real 4 kasutatakse nime `userName`, mida JavaScript ei leia.

## Sihitud `console.log()`

Ära väljasta ainult teksti `"siin"`. Väljasta kontrollitava väärtuse nimi ja väärtus:

```js
console.log("grade:", grade);
console.log("total pärast ringi:", total);
console.log("grades.length:", grades.length);
```

Kui oled vea leidnud, eemalda ajutised kontrollväljundid või jäta alles ainult õppijale kasulik tulemus.

## Proovi ise: leia esimene vale väärtus

```js
const grades = [4, 5, 3];
let total = 1;

for (const grade of grades) {
  total = total + grade;
}

const average = total / grades.length;

console.log(average);
```

Oodatav keskmine on `4`, kuid programm väljastab teise tulemuse.

::: details Kontrolli silumist
Esimene vale väärtus tekib enne tsüklit: summa algab väärtusest `1`, kuigi liitmise kogumismuutuja peab algama väärtusest `0`.

Parandus:

```js
let total = 0;
```
:::

## Praktiline ülesanne: paranda hinnete kokkuvõte

Järgmises programmis on käitus- ja loogikavigu:

```js
function getAverageGrade(grades) {
  let total = 0;

  for (const grade of grades) {
    total = total + grades;
  }

  return total / grades.length;
}

const student = {
  name: "Mari",
  grades: [4, 5, 3]
};

const average = getAverageGrade(student.grade);

if (average > 3) {
  console.log(`${student.name} aine on positiivne`);
} else {
  console.log(`${student.name} peab veel harjutama`);
}
```

Töövoog:

1. kirjuta oodatav väljund;
2. käivita programm;
3. loe esimene veateade;
4. paranda üks viga;
5. käivita programm uuesti;
6. lisa vajadusel sihitud `console.log()` kontroll;
7. kontrolli sisenditega `[4, 5, 3]`, `[3]` ja `[]`.

Valmis lahendus:

- funktsioon liidab üksikud hinded, mitte massiivi ennast;
- kasutatakse olemasolevat omadust `student.grades`;
- piirväärtus `3` loetakse positiivseks;
- tühi massiiv ei anna eksitavat positiivset ega negatiivset otsust;
- õppija oskab nimetada iga parandatud vea liigi.

::: details Vihje 1
Käivita programm enne parandamist. Esimene veateade näitab omadust, mille väärtus on `undefined`.
:::

::: details Vihje 2
Tsükli sees on üks hinne muutujas `grade`.
:::

::: details Üks võimalik parandatud lahendus
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

if (average === null) {
  console.log("Hinded puuduvad");
} else if (average >= 3) {
  console.log(`${student.name} aine on positiivne`);
} else {
  console.log(`${student.name} peab veel harjutama`);
}
```
:::

## Mõtesta

- Miks parandatakse üks viga korraga?
- Mis vahe on käitusveal ja loogikaveal?
- Millise sisendiga kontrollid tingimuse piirväärtust?
- Miks ei tõenda ühe näidisandmega töötamine kogu lahenduse õigsust?

## Kokkuvõte

- Silumine algab oodatava ja tegeliku tulemuse võrdlemisest.
- Jälgimistabel aitab leida esimese vale väärtuse.
- Süntaksiviga takistab koodi lugemist, käitusviga tekib töö ajal ja loogikaviga annab vale tulemuse.
- Veateates on oluline vea liik, kirjeldus ja sinu koodi rea number.
- Paranda üks põhjus korraga ja kontrolli tulemust mitme sisendiga.

## Allikad

- [MDN: What went wrong? Troubleshooting JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_went_wrong) — veateadete lugemise ja silumise põhitöövoog.
