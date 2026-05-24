# Korduslaused

## Õpieesmärgid

Selle peatüki lõpuks peaks õppija:

- mõistma, miks programmis kasutatakse korduseid
- oskama kirjutada `for` ja `while` tsükleid
- mõistma tsüklimuutuja, tingimuse ja sammu rolli
- oskama kasutada tsüklit massiivi väärtuste läbimiseks
- oskama märgata lõpmatu tsükli ja ühe võrra eksimise vigu

## Miks tsükleid vaja on?

Programmid töötavad tihti nimekirjadega. Näiteks klassi hinded, ostukorvi tooted, kasutajate nimekiri või sõnumid vestluses. Kui väärtuseid on palju, ei taha me sama koodi käsitsi mitu korda kirjutada.

Ilma tsüklita:

```js
console.log("Tere, Mari");
console.log("Tere, Joonas");
console.log("Tere, Kati");
```

Tsükliga:

```js
const names = ["Mari", "Joonas", "Kati"];

for (let i = 0; i < names.length; i++) {
  console.log(`Tere, ${names[i]}`);
}
```

Tsükkel lubab ühte tegevust korrata seni, kuni tingimus kehtib.

## `for` tsükkel

`for` tsükkel sobib siis, kui teame, mitu korda tahame midagi korrata või kui läbime massiivi indeksite abil.

```js
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

Selle tsükli kolm osa on:

- `let i = 0` loob tsüklimuutuja
- `i < 5` ütleb, millal tsükkel jätkub
- `i++` suurendab muutujat iga ringi lõpus

Massiivi läbimisel kasutatakse sageli `length` omadust:

```js
const grades = [5, 4, 3, 5];

for (let i = 0; i < grades.length; i++) {
  console.log(grades[i]);
}
```

## `for...of`

Kui indeksit pole vaja, on `for...of` algajale loetavam.

```js
const grades = [5, 4, 3, 5];

for (const grade of grades) {
  console.log(grade);
}
```

Seda kasutatakse siis, kui tahame iga massiivi elemendiga midagi teha.

## `while` tsükkel

`while` tsükkel töötab seni, kuni tingimus on tõene.

```js
let attempts = 0;

while (attempts < 3) {
  console.log("Proovi uuesti");
  attempts++;
}
```

`while` sobib olukordadesse, kus me ei tea täpselt, mitu korda tsükkel käivitub. Näiteks mängus võib kasutaja arvata numbrit seni, kuni vastus on õige.

## `break` ja `continue`

`break` lõpetab tsükli täielikult.

```js
const names = ["Mari", "Joonas", "Kati"];

for (const name of names) {
  if (name === "Joonas") {
    break;
  }

  console.log(name);
}
```

`continue` jätab ühe ringi vahele ja liigub järgmise juurde.

```js
const grades = [5, 2, 4, 1, 3];

for (const grade of grades) {
  if (grade < 3) {
    continue;
  }

  console.log(`Positiivne hinne: ${grade}`);
}
```

## Päris näide: keskmise hinde arvutamine

```js
const grades = [4, 5, 3, 5];
let total = 0;

for (const grade of grades) {
  total = total + grade;
}

const average = total / grades.length;

console.log(`Keskmine hinne on ${average}`);
```

Siin kasutatakse tsüklit, et kõik hinded kokku liita. Seejärel jagatakse summa hinnete arvuga.

## Levinud vead

Ühe võrra eksimine on väga tavaline viga:

```js
const names = ["Mari", "Joonas", "Kati"];

for (let i = 0; i <= names.length; i++) {
  console.log(names[i]); // viimane väärtus on undefined
}
```

Õige tingimus on `i < names.length`, sest indeksid algavad nullist.

```js
for (let i = 0; i < names.length; i++) {
  console.log(names[i]);
}
```

Teine viga on lõpmatu tsükkel:

```js
let count = 0;

while (count < 5) {
  console.log(count);
  // count ei muutu, seega tsükkel ei lõpe
}
```

## Harjutused

1. Väljasta tsükliga arvud 1 kuni 10.
2. Loo massiiv õpilaste nimedega ja tervita iga õpilast.
3. Arvuta massiivis olevate hindede summa.
4. Leia massiivist ainult positiivsed hinded ja väljasta need.
5. Kirjuta `while` tsükkel, mis loendab kolmest nullini.
