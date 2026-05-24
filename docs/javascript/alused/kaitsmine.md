# Mooduli vahekaitsmine

## Eesmärk

Vahekaitsmise eesmärk on kontrollida, kas programmeerimise alustõed on arusaadavad nii koodi lugemisel kui ka oma sõnadega selgitamisel.

See ei ole ainult süntaksi päheõppimine. Õppija peaks oskama selgitada, miks mingit lahendust kasutatakse ja mis juhtub programmi töö ajal.

## Mida peab oskama selgitada?

### Muutujad

Õppija peaks oskama selgitada:

- mis on muutuja
- mis vahe on deklaratsioonil ja omistamisel
- millal kasutada `let` ja millal `const`
- miks `var` kasutamist uues koodis välditakse
- mis on skoop
- mida tähendab hoisting

Näiteküsimus:

```js
let score = 0;
score = score + 1;
```

Selgita, mis juhtub mõlemal real.

### Andmetüübid

Õppija peaks oskama selgitada:

- mis vahe on primitiividel ja objektidel
- mis on `string`, `number`, `boolean`, `null` ja `undefined`
- miks `typeof null` annab tulemuseks `"object"`
- miks kasutatakse `===` operaatorit
- miks mõnel tüübil on meetodid, näiteks `toUpperCase()` või `filter()`

Näiteküsimus:

```js
console.log("5" + 2);
console.log(Number("5") + 2);
```

Selgita, miks tulemused erinevad.

### Tingimuslaused

Õppija peaks oskama:

- koostada lihtsat `if`/`else` tingimust
- kasutada võrdlusoperaatoreid
- ühendada tingimusi operaatoritega `&&`, `||` ja `!`
- selgitada, mis on `truthy` ja `falsy`

Näiteküsimus:

```js
const userName = "";

if (!userName) {
  console.log("Nimi on puudu");
}
```

Selgita, miks sõnum väljastatakse.

### Korduslaused

Õppija peaks oskama:

- kirjutada lihtsat `for` tsüklit
- läbida massiivi `for...of` tsükliga
- selgitada tsüklimuutuja ja tsüklitingimuse rolli
- märgata lõpmatu tsükli ohtu

Näiteküsimus:

```js
const grades = [4, 5, 3];

for (const grade of grades) {
  console.log(grade);
}
```

Selgita, mitu korda tsükkel käivitub ja mida iga kord väljastatakse.

### Funktsioonid

Õppija peaks oskama:

- kirjutada lihtsat funktsiooni
- kasutada parameetreid ja argumente
- kasutada `return` võtmesõna
- selgitada funktsiooni skoobi põhimõtet
- eristada `return` ja `console.log()` kasutamist

Näiteküsimus:

```js
function calculateTotal(price, quantity) {
  return price * quantity;
}

const total = calculateTotal(10, 3);
```

Selgita, mis on parameetrid, mis on argumendid ja mis väärtus salvestatakse muutujasse `total`.

## Kuidas valmistuda?

1. Käivita iga peatüki näited ise läbi.
2. Muuda näidetes väärtuseid ja jälgi, kuidas tulemus muutub.
3. Selgita iga näidet valjusti oma sõnadega.
4. Kirjuta iga teema kohta vähemalt üks enda näide.
5. Harjuta vigade lugemist: mis on `undefined`, `NaN` või `ReferenceError`?

## Miniülesanne harjutamiseks

Kirjuta väike programm, mis:

1. hoiab massiivis vähemalt viit hinnet
2. arvutab hinnete keskmise
3. kontrollib, kas keskmine hinne on vähemalt 3
4. väljastab sobiva sõnumi
5. kasutab vähemalt ühte funktsiooni

Näiteks:

```js
const grades = [4, 5, 3, 2, 5];

function getAverageGrade(values) {
  let total = 0;

  for (const value of values) {
    total = total + value;
  }

  return total / values.length;
}

const average = getAverageGrade(grades);

if (average >= 3) {
  console.log("Aine on positiivne");
} else {
  console.log("Tuleb veel harjutada");
}
```

## Hindamise mõte

Vahekaitsmisel on kõige olulisem arusaamine. Kui koodis tekib viga, ei ole see kohe probleem. Oluline on osata rahulikult selgitada, mida kood peaks tegema, kust viga võib tulla ja kuidas seda kontrollida.
