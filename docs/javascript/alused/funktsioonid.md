# Funktsioonid

## Õpieesmärgid

Selle peatüki lõpuks peaks õppija:

- mõistma, miks funktsioone kasutatakse
- oskama kirjutada funktsiooni deklaratsiooni ja noolfunktsiooni
- oskama kasutada parameetreid ja argumente
- mõistma `return` võtmesõna rolli
- oskama eristada väärtuse tagastamist ja konsooli väljastamist
- mõistma funktsiooni skoobi põhimõtet

## Miks funktsioone vaja on?

Funktsioon on korduvkasutatav koodiplokk. Kui programmis on tegevus, mida on vaja teha mitu korda, tasub see panna funktsiooni sisse.

Näiteks veebipoes võib olla vaja arvutada soodushinda mitmes kohas: toote kaardil, ostukorvis ja tellimuse kinnituses. Kui arvutus on funktsioonis, ei pea sama loogikat igale poole kopeerima.

```js
function calculateDiscountPrice(price, discountPercent) {
  return price - price * (discountPercent / 100);
}

const finalPrice = calculateDiscountPrice(100, 20);

console.log(finalPrice); // 80
```

## Funktsiooni deklaratsioon

Funktsiooni saab luua `function` märksõnaga.

```js
function greetUser(name) {
  return `Tere, ${name}!`;
}

console.log(greetUser("Mari")); // "Tere, Mari!"
```

Funktsiooni nimi peaks kirjeldama tegevust. Hea nimi algab tihti tegusõnaga: `calculateTotal`, `validateEmail`, `getAverageGrade`.

## Parameetrid ja argumendid

**Parameeter** on funktsiooni sisendis olev nimi. **Argument** on tegelik väärtus, mis funktsiooni kutsumisel kaasa antakse.

```js
function addNumbers(a, b) {
  return a + b;
}

addNumbers(2, 3);
```

Siin on `a` ja `b` parameetrid. Väärtused `2` ja `3` on argumendid.

## `return`

`return` tagastab funktsioonist väärtuse. Tagastatud väärtust saab salvestada muutujasse või kasutada teises arvutuses.

```js
function isPositiveGrade(grade) {
  return grade >= 3;
}

const result = isPositiveGrade(4);

console.log(result); // true
```

Oluline erinevus:

```js
function showGrade(grade) {
  console.log(grade);
}

function getGrade(grade) {
  return grade;
}
```

`console.log()` ainult näitab väärtust konsoolis. `return` annab väärtuse funktsioonist välja.

## Noolfunktsioon

Noolfunktsioon on lühem viis funktsiooni kirjutamiseks.

```js
const multiply = (a, b) => {
  return a * b;
};

console.log(multiply(4, 5)); // 20
```

Kui funktsioon koosneb ainult ühest avaldisest, saab `return` kirjutada lühemalt:

```js
const multiply = (a, b) => a * b;
```

Alguses on täiesti sobiv kasutada pikemat kuju, sest see on lihtsamalt loetav.

## Funktsiooni skoop

Funktsiooni sees loodud muutuja on nähtav ainult selle funktsiooni sees.

```js
function calculateTotal(price, quantity) {
  const total = price * quantity;
  return total;
}

console.log(calculateTotal(10, 3)); // 30
// console.log(total); // viga: total on nähtav ainult funktsiooni sees
```

See aitab vältida olukorda, kus üks programmi osa muudab kogemata teise osa muutujaid.

## Päris näide: vormi kontrollimine

```js
function isValidUserName(userName) {
  return userName.trim().length >= 2;
}

console.log(isValidUserName("Mari")); // true
console.log(isValidUserName(""));     // false
console.log(isValidUserName(" A "));  // false
```

Sellist funktsiooni saaks hiljem kasutada veebivormis enne andmete saatmist.

## Levinud vead

Funktsioon arvutab väärtuse, aga ei tagasta seda:

```js
function calculateTotal(price, quantity) {
  const total = price * quantity;
}

const result = calculateTotal(10, 2);
console.log(result); // undefined
```

Õige variant:

```js
function calculateTotal(price, quantity) {
  return price * quantity;
}
```

Teine levinud viga on liiga palju vastutust ühes funktsioonis. Hea funktsioon teeb ühe selge asja.

## Harjutused

1. Kirjuta funktsioon `greetUser`, mis võtab nime ja tagastab tervituse.
2. Kirjuta funktsioon `calculateCartTotal`, mis võtab hinna ja koguse ning tagastab kogusumma.
3. Kirjuta funktsioon `isAdult`, mis kontrollib, kas vanus on vähemalt 18.
4. Kirjuta funktsioon `getAverageGrade`, mis arvutab hinnete massiivi keskmise.
5. Selgita oma sõnadega, mis vahe on `console.log()` ja `return` kasutamisel.
