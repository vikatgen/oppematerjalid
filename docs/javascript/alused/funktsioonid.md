---
title: JavaScripti funktsioonid
description: Õpi looma selgete sisendite ja tagastusväärtusega korduvkasutatavaid funktsioone.
outline: deep
---

# Funktsioonid

::: info Õpiväljund
Pärast peatüki läbimist oskad luua selgete sisendite ja tagastusväärtusega funktsiooni ning kontrollida selle käitumist erinevate argumentidega.
:::

## Eeldused ja töövahendid

- Oskad luua muutujaid ning kasutada tingimus- ja korduslauseid.
- Oskad töötada lihtsa massiiviga.
- Kasutad brauseri DevTools Console'it või Node.js-i.
- Soovituslik kestus on 60–75 minutit.

## Miks funktsioone vaja on?

Ilma funktsioonita tuleb sama arvutus iga uue väärtuse jaoks uuesti kirjutada:

```js
const firstPrice = 20;
const firstQuantity = 3;
const firstTotal = firstPrice * firstQuantity;

const secondPrice = 8;
const secondQuantity = 5;
const secondTotal = secondPrice * secondQuantity;
```

Funktsioon võimaldab anda arvutusele nime ning kasutada seda erinevate sisenditega:

```js
function calculateTotal(price, quantity) {
  return price * quantity;
}

const firstTotal = calculateTotal(20, 3);
const secondTotal = calculateTotal(8, 5);

console.log(firstTotal);  // 60
console.log(secondTotal); // 40
```

Hea funktsioon teeb ühe selge asja: saab sisendid, töötleb neid ja tagastab tulemuse.

## Funktsiooni loomine ja kutsumine

Funktsiooni deklaratsioon kirjeldab tegevust, kuid ei käivita seda:

```js
function calculateTotal(price, quantity) {
  return price * quantity;
}
```

Funktsioon käivitub alles kutsumisel:

```js
const total = calculateTotal(10, 3);

console.log(total); // 30
```

Funktsiooni nimi peaks kirjeldama tegevust. Hea nimi algab sageli tegusõnaga:

- `calculateTotal`
- `getAverageGrade`
- `isPositiveGrade`
- `formatUserName`

::: details Ennusta
Mitu korda käivitub funktsioon ja mida väljastatakse?

```js
function double(number) {
  return number * 2;
}

console.log(double(3));
console.log(double(5));
```
:::

::: details Kontrolli vastust
Funktsioon käivitub kaks korda:

```txt
6
10
```
:::

## Parameetrid ja argumendid

**Parameeter** on funktsiooni deklaratsioonis olev sisendi nimi:

```js
function calculateTotal(price, quantity) {
  return price * quantity;
}
```

`price` ja `quantity` on parameetrid. Neid saab kasutada ainult funktsiooni sees.

**Argument** on tegelik väärtus, mis funktsiooni kutsumisel kaasa antakse:

```js
calculateTotal(10, 3);
```

`10` ja `3` on argumendid. Kutsumise ajal seotakse need vastavate parameetritega:

```txt
price    -> 10
quantity -> 3
```

Järgmine funktsioonikutse loob parameetrite jaoks uued väärtused:

```js
calculateTotal(8, 5);
```

```txt
price    -> 8
quantity -> 5
```

## `return`: anna tulemus funktsioonist välja

`return` lõpetab funktsiooni töö ja annab väärtuse kutsujale tagasi.

```js
function isPositiveGrade(grade) {
  return grade >= 3;
}

const result = isPositiveGrade(4);

console.log(result); // true
```

Tagastatud väärtust saab:

- salvestada muutujasse;
- kasutada tingimuslauses;
- anda argumendina järgmisele funktsioonile;
- väljastada `console.log()` abil.

```js
if (isPositiveGrade(4)) {
  console.log("Töö on arvestatud");
}
```

### `return` ja `console.log()` ei tee sama asja

```js
function showTotal(price, quantity) {
  console.log(price * quantity);
}

function calculateTotal(price, quantity) {
  return price * quantity;
}
```

`showTotal()` näitab tulemust konsoolis, kuid ei anna seda ülejäänud programmile kasutamiseks:

```js
const shownResult = showTotal(10, 2);

console.log(shownResult); // undefined
```

`calculateTotal()` tagastab tulemuse:

```js
const calculatedResult = calculateTotal(10, 2);

console.log(calculatedResult); // 20
```

::: tip Praktiline reegel
Arvutav või otsustav funktsioon peaks üldjuhul tulemuse tagastama. Väljasta tulemus funktsioonist väljaspool, kui funktsiooni eesmärk ei ole just kasutajale midagi näidata.
:::

## Funktsiooni sees saab kasutada varasemaid oskusi

Funktsiooni sees saab kasutada muutujaid, tingimuslauseid ja tsükleid:

```js
function getAverageGrade(grades) {
  let total = 0;

  for (const grade of grades) {
    total = total + grade;
  }

  if (grades.length === 0) {
    return null;
  }

  return total / grades.length;
}
```

Funktsioon:

1. saab argumendina hinnete massiivi;
2. arvutab tsükliga summa;
3. tagastab tühja massiivi korral `null`;
4. tagastab muul juhul keskmise hinde.

::: warning Kontrolli enne tarbetut tööd
Eelmises näites võiks tühja massiivi kontrollida ka kohe funktsiooni alguses:

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
```

Varajane `return` lõpetab funktsiooni kohe, kui tulemust pole võimalik arvutada.
:::

## Funktsiooni skoop

Funktsiooni parameetrid ja funktsiooni sees loodud muutujad on kasutatavad ainult selle funktsiooni sees:

```js
function calculateTotal(price, quantity) {
  const total = price * quantity;
  return total;
}

console.log(calculateTotal(10, 3)); // 30
// console.log(price); // ReferenceError
// console.log(total); // ReferenceError
```

Iga funktsioonikutse saab oma parameetrite ja kohalike muutujate väärtused. See aitab vältida olukorda, kus üks arvutus muudab kogemata teise arvutuse andmeid.

## Proovi ise: tarneviisi otsustaja

Kopeeri kood brauseri DevTools Console'isse või Node.js faili:

```js
function getShippingMessage(isInStock, cartTotal) {
  if (!isInStock) {
    return "Toodet ei saa tellida";
  }

  if (cartTotal >= 50) {
    return "Tasuta tarne";
  }

  return "Tarne lisandub hinnale";
}

console.log(getShippingMessage(false, 100));
console.log(getShippingMessage(true, 50));
console.log(getShippingMessage(true, 20));
```

Enne käivitamist:

1. ennusta iga funktsioonikutse tagastusväärtus;
2. nimeta funktsiooni parameetrid;
3. nimeta esimese funktsioonikutse argumendid;
4. selgita, miks pärast `return` käsku järgmisi ridu enam ei käivitata.

::: details Kontrolli vastuseid
Väljund:

```txt
Toodet ei saa tellida
Tasuta tarne
Tarne lisandub hinnale
```

Parameetrid on `isInStock` ja `cartTotal`. Esimese kutse argumendid on `false` ja `100`.

`return` lõpetab aktiivse funktsioonikutse ja annab tulemuse kutsujale tagasi.
:::

## Praktiline ülesanne: hinnete kokkuvõtte funktsioonid

Koosta kaks funktsiooni:

```js
function getAverageGrade(grades) {
  // tagasta keskmine hinne või tühja massiivi korral null
}

function getGradeMessage(average) {
  // tagasta keskmise põhjal sobiv sõnum
}
```

Nõuded:

1. `getAverageGrade(grades)` arvutab tsükliga hinnete summa ja tagastab keskmise.
2. Tühja massiivi korral tagastab `getAverageGrade()` väärtuse `null`.
3. `getGradeMessage(average)` tagastab:
   - `null` korral `"Hinded puuduvad"`;
   - keskmise puhul alates `3` `"Aine on positiivne"`;
   - muul juhul `"Tuleb veel harjutada"`.
4. Funktsioonid ei väljasta ise midagi `console.log()` abil.
5. Kutsu funktsioone erinevate hinnete massiividega ja väljasta tulemused väljaspool funktsioone.

Valmis lahendus:

- mõlemal funktsioonil on üks selge vastutus;
- funktsioonide sisendid tulevad parameetrite kaudu;
- mõlemad funktsioonid tagastavad tulemuse;
- tühja massiivi korral ei teki `NaN` tulemust;
- kõik kontrollstsenaariumid annavad oodatud tulemuse.

Kontrolli vähemalt järgmiste sisenditega:

| Hinded | Kuvatav keskmine | Sõnum |
|---|---:|---|
| `[4, 5, 3]` | `4` | `Aine on positiivne` |
| `[2, 2, 4]` | `2.67` | `Tuleb veel harjutada` |
| `[]` | `null` | `Hinded puuduvad` |

::: details Vihje 1
Kontrolli funktsiooni `getAverageGrade()` alguses, kas `grades.length === 0`.
:::

::: details Vihje 2
Kasuta hinnete summa arvutamiseks `for...of` tsüklit ja enne tsüklit loodud `let total = 0` muutujat.
:::

::: details Vihje 3
Funktsioon `getGradeMessage()` saab argumendina esimese funktsiooni tagastatud väärtuse.
:::

::: details Üks võimalik lahendus
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

function getGradeMessage(average) {
  if (average === null) {
    return "Hinded puuduvad";
  }

  if (average >= 3) {
    return "Aine on positiivne";
  }

  return "Tuleb veel harjutada";
}

const firstAverage = getAverageGrade([4, 5, 3]);
const secondAverage = getAverageGrade([2, 2, 4]);
const emptyAverage = getAverageGrade([]);

console.log(firstAverage, getGradeMessage(firstAverage));
console.log(secondAverage.toFixed(2), getGradeMessage(secondAverage));
console.log(emptyAverage, getGradeMessage(emptyAverage));
```
:::

## Mõtesta

- Miks peaks arvutav funktsioon tulemuse tagastama, mitte ainult konsooli väljastama?
- Miks on `grades` parameeter parem kui funktsioonist väljaspool oleva kindla massiivi kasutamine?
- Miks on keskmise arvutamine ja sõnumi valimine jagatud kaheks funktsiooniks?
- Mida tõendavad erinevate argumentidega tehtud funktsioonikutsed?

## Järgmine tase

Järgmised võtted on kasulikud, kuid praktilise ülesande lahendamiseks ei ole need kohustuslikud.

### Noolfunktsioon

Noolfunktsioon (*arrow function*) on lühem viis funktsiooni kirjutamiseks:

```js
const multiply = (a, b) => {
  return a * b;
};
```

Kui funktsioon koosneb ainult ühest tagastatavast avaldisest, saab kasutada lühikest kuju:

```js
const multiply = (a, b) => a * b;
```

Funktsioonide põhialuste õppimisel eelista kuju, mille tööjärjekorda oskad selgelt selgitada.

### Funktsioon argumendina

JavaScriptis on funktsioon väärtus, mida saab anda teisele funktsioonile argumendina:

```js
function isPositiveGrade(grade) {
  return grade >= 3;
}

const grades = [5, 2, 4, 1, 3];
const positiveGrades = grades.filter(isPositiveGrade);

console.log(positiveGrades); // [5, 4, 3]
```

`filter()` kutsub funktsiooni `isPositiveGrade` iga hinde jaoks. Argumendina antud funktsiooni nimetatakse **tagasikutsefunktsiooniks** (*callback function*).

Sama saab kirjutada noolfunktsiooniga:

```js
const positiveGrades = grades.filter((grade) => grade >= 3);
```

See seob funktsioonid [korduslausete peatükis](./korduslaused.md) tutvustatud massiivimeetoditega.

## Levinud vead

### Funktsioon arvutab, kuid ei tagasta tulemust

```js
function calculateTotal(price, quantity) {
  const total = price * quantity;
}

const result = calculateTotal(10, 2);

console.log(result); // undefined
```

Lisa `return total`, et kutsuja saaks tulemust kasutada.

### Funktsioon sõltub varjatud välisest väärtusest

```js
const price = 10;

function calculateTotal(quantity) {
  return price * quantity;
}
```

Funktsiooni tulemus sõltub väärtusest, mida parameetrites näha pole. Selgem variant:

```js
function calculateTotal(price, quantity) {
  return price * quantity;
}
```

### `return` järel olevat koodi oodatakse käivituvat

```js
function getMessage() {
  return "Tere";
  console.log("Seda rida ei käivitata");
}
```

`return` lõpetab funktsiooni töö kohe.

## Kokkuvõte

- Funktsioon annab korduvkasutatavale tegevusele nime.
- Parameetrid kirjeldavad funktsiooni sisendeid ja argumendid annavad kutsumisel tegelikud väärtused.
- `return` annab tulemuse funktsioonist kutsujale tagasi.
- `console.log()` näitab väärtust, kuid ei asenda tagastusväärtust.
- Funktsiooni parameetrid ja kohalikud muutujad kuuluvad funktsiooni skoopi.
- Hea funktsioon teeb ühe selge asja ja selle käitumist kontrollitakse erinevate argumentidega.
- Funktsioone saab anda argumentidena massiivimeetoditele nagu `filter()` ja `map()`.

## Allikad

- [MDN: Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions) — funktsioonide, parameetrite ja tagastusväärtuste ülevaade.
- [MDN: `return`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return) — funktsiooni lõpetamine ja väärtuse tagastamine.
- [MDN: Arrow function expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) — noolfunktsioonide süntaks ja erinevused.
