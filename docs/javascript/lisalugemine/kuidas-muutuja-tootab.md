---
title: Kuidas muutuja töötab?
description: Valikuline lisalugemine JavaScripti muutujate, skoobi, väärtuste, viidete ja mälu vaimsest mudelist.
outline: deep
---

# Kuidas muutuja töötab?

::: warning Valikuline lisalugemine
See leht aitab mõista, mis toimub JavaScripti koodi täitmise ajal. Materjal ei kuulu programmeerimise aluste nõutava taseme ega mooduli vahekaitsmise alla.
:::

Muutujate kasutamiseks pead oskama neid luua ning valida `const` ja `let` vahel. Siin läheme sammu sügavamale: uurime, kuidas JavaScript seob nimed väärtustega, otsib muutujaid skoopidest ja käsitleb objektiviiteid.

## Muutuja ei ole lihtsalt kast

Muutujat kujutatakse sageli sildistatud kastina:

```txt
score -> 10
```

See on kasulik esimene mudel. Muutujal on nimi ja selle nime kaudu saab väärtust kasutada.

JavaScripti täpsemas vaimses mudelis on muutuja nimi **sidumine** (*binding*) väärtusega:

```js
let score = 10;
```

```txt
nimi score seotakse väärtusega 10
```

Kui muutujale omistatakse uus väärtus, muudetakse sidumist:

```js
score = 11;
```

```txt
nimi score seotakse nüüd väärtusega 11
```

Kastimetafoor muutub piiravaks objektide puhul. Objekti hoidev muutuja ei ole kõige kasulikum kujutleda kastina, mille sees on kogu objekt. Parem on mõelda, et muutuja kaudu pääseb objektile ligi.

## Deklaratsioon, omistamine ja lugemine

Vaatame kahte koodirida:

```js
let score = 0;
score = score + 1;
```

Esimesel real toimub kaks tegevust:

1. **Deklaratsioon:** aktiivsesse skoopi luuakse nimi `score`.
2. **Omistamine:** nimi `score` seotakse väärtusega `0`.

Teisel real toimub rohkem samme:

1. JavaScript loeb paremat poolt `score + 1`.
2. Nime `score` kaudu leitakse väärtus `0`.
3. Arvutatakse uus väärtus `0 + 1`, mille tulemus on `1`.
4. Nimi `score` seotakse uue väärtusega `1`.

Vana väärtust `0` ei muudeta arvuks `1`. Arvud on primitiivsed väärtused ja neid ei muudeta. Muutujale omistatakse uus tulemus.

::: details Ennusta
Mis väljastatakse?

```js
let score = 3;
const oldScore = score;

score = score + 2;

console.log(score);
console.log(oldScore);
```
:::

::: details Kontrolli vastust
```txt
5
3
```

`oldScore` sai väärtuse `3` koopia. Muutuja `score` hilisem ümberomistamine ei muuda muutujat `oldScore`.
:::

## Skoop ja nime otsimine

**Skoop** määrab, millises koodiosas on muutuja nimi kasutatav.

`let` ja `const` järgivad plokiskoopi. Loogeliste sulgude sees loodud nimi on kasutatav selle ploki sees:

```js
const courseName = "JavaScript";

if (true) {
  const message = "Tere!";

  console.log(message);    // leitakse aktiivsest plokist
  console.log(courseName); // leitakse välisest skoobist
}

console.log(courseName); // töötab
// console.log(message); // ReferenceError
```

Nime lugemisel otsib JavaScript seda:

1. aktiivsest ehk kõige lähemast skoobist;
2. seejärel järjest välistest skoopidest;
3. kuni nimi leitakse või skoope rohkem pole.

Kui nime ei leita, tekib `ReferenceError`.

### Nime varjutamine

Sisemises skoobis võib olla välise muutujaga sama nimi. Sisemine nimi **varjutab** (*shadows*) selle ploki sees välimise nime.

```js
const status = "väline";

if (true) {
  const status = "sisemine";
  console.log(status); // "sisemine"
}

console.log(status); // "väline"
```

Need on kaks erinevat sidumist, kuigi nende nimed on samad.

::: details Ennusta
Mis väljastatakse ja miks?

```js
const color = "sinine";

if (true) {
  const color = "roheline";
  console.log(color);
}

console.log(color);
```
:::

::: details Kontrolli vastust
```txt
roheline
sinine
```

Ploki sees leitakse kõigepealt sisemine `color`. Pärast ploki lõppu on kasutatav välimine `color`.
:::

## Väärtused ja objektiviited

Muutujate kopeerimise tulemus sõltub sellest, kas väärtus on primitiiv või objekt.

### Primitiivi kopeerimine

Primitiivid on näiteks stringid, arvud ja tõeväärtused. Ühest muutujast teise omistamisel saab uus muutuja väärtuse koopia.

```js
let firstScore = 10;
let secondScore = firstScore;

firstScore = 20;

console.log(firstScore);  // 20
console.log(secondScore); // 10
```

Lihtsustatud mudel:

```txt
firstScore  -> 20
secondScore -> 10
```

Muutuja `firstScore` ümberomistamine ei mõjuta muutujat `secondScore`.

### Objekti kaudu jagatud väärtus

Objekti omistamisel teisele muutujale pääsevad mõlemad muutujad ligi samale objektile:

```js
const firstStudent = { name: "Mari", score: 10 };
const secondStudent = firstStudent;

secondStudent.score = 20;

console.log(firstStudent.score);  // 20
console.log(secondStudent.score); // 20
```

Lihtsustatud mudel:

```txt
firstStudent  ─┐
               ├─> { name: "Mari", score: 20 }
secondStudent ─┘
```

`secondStudent.score = 20` muudab jagatud objekti. See ei omista muutujale `secondStudent` uut objekti.

### Mida `const` lukustab?

`const` ei luba muutujale uut väärtust omistada. See ei muuda objekti automaatselt muutumatuks.

```js
const student = { name: "Mari", score: 10 };

student.score = 20; // töötab: objekti sisu muutub
// student = { name: "Jüri", score: 20 }; // TypeError
```

Esimesel juhul jääb sidumine samaks ja muutub objekt. Teisel juhul proovitakse nime `student` siduda uue objektiga, mida `const` ei luba.

::: details Ennusta
Mis väljastatakse?

```js
const firstCart = { total: 20 };
const secondCart = firstCart;

secondCart.total = 35;

console.log(firstCart.total);
```
:::

::: details Kontrolli vastust
```txt
35
```

Mõlemad muutujad annavad ligipääsu samale objektile.
:::

## Mälu lihtsustatud mudel

Programmi töötamise ajal hoiab JavaScripti mootor vajalikke andmeid arvuti töömälus ehk RAM-is. Mootor peab muu hulgas teadma:

- millised funktsioonid parasjagu töötavad;
- millised muutujate nimed on aktiivsetes skoopides olemas;
- milliste väärtuste ja objektidega programm töötab;
- milliseid objekte enam kasutada ei saa.

Arenduses räägitakse sageli **pinust** (*stack*) ja **hulgast** (*heap*):

- pinu aitab kirjeldada aktiivsete funktsioonikutsete ja nende täitmiskontekstide järjekorda;
- hulk aitab kirjeldada dünaamiliselt loodud objektide jaoks kasutatavat mäluala;
- objektidele pääsetakse programmis ligi viidete kaudu;
- kasutamata objektide mälu vabastab JavaScripti mootori prügikoristus (*garbage collection*).

::: warning Stack ja heap on lihtsustatud mootorimudel
JavaScripti keel ei nõua, et iga primitiiv oleks alati stack'is või iga objekt alati heap'is. Mootor võib väärtuseid töö käigus teisiti paigutada ja optimeerida.

Koodi käitumise ennustamiseks keskendu nimedele, skoopidele, väärtustele ja jagatud objektidele. Stack'i ning heap'i mudel aitab mõista mootori tööd, kuid ei ole JavaScripti programmi käitumise täielik kirjeldus.
:::

### Mida tähendab objektiviide?

Õppimisel võib objektiviidet kujutleda aadressina, mille kaudu mootor leiab objekti. JavaScript ei näita arendajale tegelikku mäluaadressi ja kood ei halda seda aadressi käsitsi.

```txt
muutuja nimi -> viide -> objekt
```

Oluline pole objekti täpne asukoht RAM-is. Oluline on teada, kas kaks muutujat annavad ligipääsu samale objektile või eri objektidele.

```js
const first = { value: 1 };
const second = { value: 1 };

console.log(first === second); // false
```

Objektide sisu näeb samasugune välja, kuid tegemist on kahe erineva objektiga.

## Ennusta ja joonista

Joonista iga ülesande puhul paberile või tahvlile:

- muutujate nimed;
- nimedega seotud primitiivsed väärtused;
- objektid;
- nooled muutujatest jagatud objektideni.

### Ülesanne 1: ümberomistamine

```js
let temperature = 18;
const morningTemperature = temperature;

temperature = 23;
```

Joonista muutujate seis pärast viimast rida ja ennusta mõlema muutuja väärtus.

::: details Kontrolli mudelit
```txt
temperature        -> 23
morningTemperature -> 18
```

Primitiivne väärtus kopeeriti. `temperature` ümberomistamine ei muuda muutujat `morningTemperature`.
:::

### Ülesanne 2: jagatud objekt

```js
const originalSettings = { theme: "light" };
const activeSettings = originalSettings;

activeSettings.theme = "dark";
```

Joonista muutujad ja objekt ning ennusta `originalSettings.theme` väärtus.

::: details Kontrolli mudelit
```txt
originalSettings ─┐
                  ├─> { theme: "dark" }
activeSettings   ─┘
```

`originalSettings.theme` väärtus on `"dark"`, sest mõlemad muutujad annavad ligipääsu samale objektile.
:::

### Ülesanne 3: skoop ja varjutamine

```js
const message = "väline";

if (true) {
  const message = "sisemine";
  console.log(message);
}

console.log(message);
```

Joonista välimine ja sisemine skoop. Paiguta kumbki `message` õigesse skoopi ning ennusta väljund.

::: details Kontrolli mudelit
```txt
välimine skoop:
message -> "väline"

sisemine plokkskoop:
message -> "sisemine"
```

Väljund:

```txt
sisemine
väline
```
:::

### Ülesanne 4: `const` ja objekt

```js
const profile = { name: "Mari" };

profile.name = "Kati";
// profile = { name: "Jüri" };
```

Selgita, miks esimene omistamine töötab ja kommentaaris olev teine omistamine annaks vea.

::: details Kontrolli vastust
`profile.name = "Kati"` muudab olemasoleva objekti omadust. Nime `profile` sidumine objektiga jääb samaks.

`profile = { name: "Jüri" }` prooviks siduda `const` muutuja uue objektiga ja annaks `TypeError` vea.
:::

## Kokkuvõte

- Muutuja nimi on sidumine väärtusega.
- Omistamisel arvutatakse esmalt parem pool ja seejärel muudetakse vasakul oleva nime sidumist.
- JavaScript otsib nime esmalt lähimast skoobist ja seejärel välistest skoopidest.
- Primitiivi kopeerimisel saavad muutujad eraldiseisvad väärtused.
- Objekti puhul võivad mitu muutujat anda ligipääsu samale objektile.
- `const` keelab ümberomistamise, kuid ei muuda objekti sisu muutumatuks.
- Stack ja heap on kasulik lihtsustatud mootorimudel, mitte JavaScripti väärtuste paigutuse absoluutne reegel.

## Allikad

- [MDN: Grammar and types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types) — muutujad, deklaratsioonid ja skoop.
- [MDN: Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures) — leksikaalse skoobi põhjalikum selgitus.
- [MDN: Memory management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Memory_management) — JavaScripti mälu ja prügikoristuse ülevaade.
- [ECMAScript Language Specification: Environment Records](https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-environment-records) — tehniline kirjeldus nimede ja sidumiste haldamisest.
