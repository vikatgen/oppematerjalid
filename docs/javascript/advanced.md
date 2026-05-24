# JavaScripti edasijõudnud teemad

:::: info
See peatükk on mõeldud pärast programmeerimise aluste ja brauseri JavaScripti läbimist. Siin olevad teemad muutuvad oluliseks siis, kui rakendus suhtleb serveriga, kood jaguneb mitmeks failiks või andmeid töödeldakse suuremas mahus.
::::

## Miks neid teemasid vaja on?

Alguses kirjutame JavaScripti väikeste näidetena ühes failis. Päris rakenduses kasvab kood kiiresti:

- andmeid tuleb küsida serverist
- kasutaja tegevustele tuleb reageerida õigel ajal
- sama loogikat tuleb jagada mitme faili vahel
- vead tuleb kinni püüda ja kasutajale arusaadavalt näidata
- massiive ja objekte tuleb töödelda ilma koodi liiga keeruliseks muutmata

Edasijõudnud teemad aitavad kirjutada koodi, mis on paremini loetav, jagatav ja töökindlam.

## Teemad

### Asünkroonne programmeerimine

Brauseris ei saa programm lihtsalt seisma jääda ja oodata, kuni server vastab. Selleks kasutatakse lubadusi ehk `Promise` objekte ning hiljem `async`/`await` süntaksit.

Päris näide:

```js
async function loadUser() {
  const response = await fetch("/api/user");
  const user = await response.json();

  return user;
}
```

Seda kasutatakse näiteks kasutaja profiili, ilmateate, toodete või sõnumite laadimiseks.

### Destruktureerimine ja spread-operaator

Destruktureerimine aitab objektidest ja massiividest väärtuseid lühemalt välja võtta.

```js
const student = {
  name: "Marta",
  grade: 5
};

const { name, grade } = student;
```

Spread-operaator aitab kopeerida või ühendada andmeid.

```js
const firstGrades = [4, 5];
const secondGrades = [3, 5];

const allGrades = [...firstGrades, ...secondGrades];
```

### Moodulid

Kui kood kasvab suureks, jagatakse see mitmeks failiks. Moodulid lubavad funktsioone ja väärtuseid ühest failist teise importida.

```js
// math.js
export function add(a, b) {
  return a + b;
}
```

```js
// app.js
import { add } from "./math.js";

console.log(add(2, 3));
```

### Veakäsitlus

`try` ja `catch` aitavad olukordades, kus midagi võib ebaõnnestuda: server ei vasta, kasutaja sisestab vale väärtuse või fail puudub.

```js
try {
  const user = JSON.parse("{ vale json }");
  console.log(user);
} catch (error) {
  console.log("Andmete lugemine ebaõnnestus");
}
```

### Massiivimeetodid

Meetodid `map`, `filter`, `find` ja `reduce` aitavad massiive töödelda ilma käsitsi iga sammu välja kirjutamata.

```js
const grades = [5, 2, 4, 3];

const positiveGrades = grades.filter((grade) => grade >= 3);
const gradeLabels = grades.map((grade) => `Hinne: ${grade}`);
```

Neid meetodeid kasutatakse tihti siis, kui rakendus kuvab nimekirju: tooted, kasutajad, postitused, hinded või teavitused.

## Millal siia tagasi tulla?

Kui alused, DOM ja sündmused on selged, tasub nende teemade juurde tagasi tulla. Edasijõudnud JavaScript ei ole eraldi keel, vaid samade põhimõtete edasiarendus suuremate rakenduste jaoks.
