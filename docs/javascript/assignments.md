# JavaScripti ülesanded

:::: info
Need ülesanded on mõeldud programmeerimise alustõdede harjutamiseks. Lahenda ülesanded brauseri konsoolis või Node.js keskkonnas.
::::

## Enne alustamist

- Kasuta muutujate loomiseks `const` ja `let`.
- Proovi iga ülesannet väikeste sammudena.
- Kontrolli tulemust `console.log()` abil.
- Kui tekib viga, loe veateade läbi ja otsi, millisele reale see viitab.

## Ülesanne 1: Õpilase andmed

Loo muutujad ühe õpilase kohta:

- nimi
- vanus
- kursus
- kas õpilane on aktiivne
- keskmine hinne

Väljasta konsooli lause kujul:

```txt
Mari õpib kursusel JavaScript ja tema keskmine hinne on 4.5.
```

Lisa tingimus:

- kui keskmine hinne on vähemalt 3, väljasta `"Aine on positiivne"`
- muul juhul väljasta `"Tuleb veel harjutada"`

---

## Ülesanne 2: Ostukorvi arvutamine

Loo muutujad:

- toote nimi
- toote hind
- kogus
- kas toode on laos

Arvuta kogusumma.

Kui toode on laos ja kogusumma on väiksem kui 50, väljasta:

```txt
Tellimus sobib, aga tasuta tarne ei rakendu.
```

Kui kogusumma on vähemalt 50, väljasta:

```txt
Tellimus sobib ja tasuta tarne rakendub.
```

Kui toodet ei ole laos, väljasta:

```txt
Toodet ei saa tellida.
```

---

## Ülesanne 3: Vormisisendi puhastamine

Loo muutuja `email`, mille väärtuses on alguses ja lõpus tühikud:

```js
const email = "  mari@example.com  ";
```

Kasuta `trim()` meetodit, et tühikud eemaldada.

Kontrolli tingimuslausega:

- kui e-post sisaldab `@` märki, väljasta `"E-post sobib"`
- muul juhul väljasta `"E-post ei sobi"`

Vihje: stringil on olemas meetod `includes()`.

---

## Ülesanne 4: Hinnete filtreerimine

Loo massiiv vähemalt kuue hindega.

Kasuta:

- `filter()` meetodit, et leida ainult positiivsed hinded
- `map()` meetodit, et muuta hinded tekstiks kujul `"Hinne: 4"`
- tsüklit, et arvutada kõikide hinnete summa

Näide algandmetest:

```js
const grades = [5, 2, 4, 3, 1, 5];
```

Oodatav mõte:

- positiivsed hinded on `3`, `4` ja `5`
- negatiivsed hinded on alla `3`

---

## Ülesanne 5: Funktsioonid hinnete jaoks

Kirjuta funktsioonid:

```js
function isPositiveGrade(grade) {
  // tagasta true või false
}

function getAverageGrade(grades) {
  // tagasta hinnete keskmine
}
```

Kasuta neid funktsioone vähemalt kahe erineva hinnete massiiviga.

Näide:

```js
const firstStudentGrades = [4, 5, 3];
const secondStudentGrades = [2, 2, 4];
```

Väljasta mõlema õpilase keskmine hinne ja otsus, kas tulemus on positiivne.

---

## Ülesanne 6: Lihtne äraarvamismäng

Loo muutujad:

```js
const secretNumber = 7;
let guess = 5;
```

Kirjuta tingimuslause:

- kui pakkumine on väiksem kui salanumber, väljasta `"Paku suuremat arvu"`
- kui pakkumine on suurem kui salanumber, väljasta `"Paku väiksemat arvu"`
- kui pakkumine on õige, väljasta `"Õige vastus"`

Seejärel pane kontroll funktsiooni sisse:

```js
function checkGuess(secretNumber, guess) {
  // tagasta sobiv sõnum
}
```

---

## Lisaülesanne: väike kokkuvõtteprogramm

Kirjuta programm, mis ühendab kõik põhiteemad:

1. Loo objekt `student`, kus on õpilase nimi ja hinnete massiiv.
2. Kirjuta funktsioon, mis arvutab keskmise hinde.
3. Kirjuta funktsioon, mis otsustab, kas aine on positiivne.
4. Väljasta sõnum:

```txt
Mari keskmine hinne on 4.25. Aine on positiivne.
```

Kasuta lahenduses:

- muutujat
- objekti
- massiivi
- tsüklit või massiivimeetodit
- funktsiooni
- tingimuslauset
