---
title: JavaScripti tingimuslaused
description: Õpi koostama andmete põhjal selget otsustusloogikat if-, else if- ja else-harudega.
outline: deep
---

# Tingimuslaused

::: info Õpiväljund
Pärast peatüki läbimist oskad koostada andmete põhjal mitme haruga otsustusloogika ning põhjendada tingimuste järjekorda.
:::

## Eeldused ja töövahendid

- Oskad luua `const` muutujaid ja kasutada `console.log()` käsku.
- Tunned tüüpe `string`, `number` ja `boolean`.
- Oskad teisendada sisendandmeid sobivaks tüübiks.
- Kasutad brauseri DevTools Console'it või Node.js-i.
- Soovituslik kestus on 60–75 minutit.

## Miks tingimuslauseid vaja on?

Päris rakendus peab valima tegevuse vastavalt andmetele. Näiteks võib veebirakendus otsustada, kas kasutaja pääseb lehele:

```js
const isLoggedIn = true;
const isBlocked = false;

if (isBlocked) {
  console.log("Ligipääs keelatud");
} else if (isLoggedIn) {
  console.log("Ligipääs lubatud");
} else {
  console.log("Palun logi sisse");
}
```

JavaScript kontrollib tingimusi ülevalt alla. Käivitatakse esimene haru, mille tingimus on `true`. Ülejäänud harusid enam ei kontrollita.

## Tingimus annab tulemuseks `boolean` väärtuse

Tingimus on avaldis, mille tulemus määrab, kas koodiplokk käivitatakse.

```js
const age = 17;
const isOldEnough = age >= 16;

console.log(isOldEnough); // true
```

Võrdluse `age >= 16` tulemus on `boolean` väärtus `true` või `false`. Sama võrdluse võib kirjutada otse `if`-lause sisse:

```js
if (age >= 16) {
  console.log("Saab osaleda");
}
```

::: tip Loetav tingimus
Kui tingimus muutub pikaks või seda kasutatakse mitu korda, salvesta tulemus tähendusliku nimega muutujasse.

```js
const age = 17;
const isLoggedIn = true;
const hasAccess = age >= 16 && isLoggedIn;
```
:::

## `if`, `else if` ja `else`

Kasuta `if`-haru, kui tegevus peab toimuma ainult kindlal juhul:

```js
const grade = 4;

if (grade >= 3) {
  console.log("Töö on arvestatud");
}
```

Lisa `else`, kui soovid tegevust ka juhul, kui tingimus on `false`:

```js
if (grade >= 3) {
  console.log("Töö on arvestatud");
} else {
  console.log("Töö tuleb uuesti teha");
}
```

Kasuta `else if` harusid, kui võimalikke tulemusi on rohkem kui kaks:

```js
const score = 72;

if (score >= 90) {
  console.log("Väga hea");
} else if (score >= 50) {
  console.log("Arvestatud");
} else {
  console.log("Tuleb harjutada");
}
```

::: details Ennusta
Mida väljastab programm, kui `score` väärtus on `95`? Kas teist tingimust `score >= 50` kontrollitakse?
:::

::: details Kontrolli vastust
Programm väljastab `"Väga hea"`. Esimene tingimus on `true`, seega teist tingimust enam ei kontrollita.
:::

## Tingimuste järjekord ja piirväärtused

Mitme haruga otsuses mõjutab tingimuste järjekord tulemust. Kontrolli täpsemat või rangemat tingimust enne üldisemat.

```js
const score = 95;

if (score >= 50) {
  console.log("Arvestatud");
} else if (score >= 90) {
  console.log("Väga hea");
}
```

See programm väljastab `"Arvestatud"`. Tingimus `score >= 50` sobib ka väärtusele `95`, mistõttu järgmise haruni ei jõuta.

Õigem järjekord:

```js
if (score >= 90) {
  console.log("Väga hea");
} else if (score >= 50) {
  console.log("Arvestatud");
} else {
  console.log("Tuleb harjutada");
}
```

### Kontrolli piirväärtuseid

Piirväärtus on koht, kus programmi otsus muutub. Kui tasuta tarne algab 50 eurost, kontrolli vähemalt väärtuseid `49`, `50` ja `51`.

```js
const cartTotal = 50;

console.log(cartTotal >= 50); // true
```

Operaator `>=` sisaldab ka väärtust `50`. Operaator `>` seda ei sisaldaks.

## Võrdlusoperaatorid

Võrdlusoperaatori tulemus on `true` või `false`.

| Operaator | Tähendus | Näide |
|---|---|---|
| `===` | väärtus ja tüüp on võrdsed | `role === "admin"` |
| `!==` | väärtus või tüüp erineb | `role !== "guest"` |
| `>` | suurem kui | `score > 50` |
| `<` | väiksem kui | `score < 50` |
| `>=` | suurem või võrdne | `age >= 18` |
| `<=` | väiksem või võrdne | `price <= 100` |

Kasuta üldjuhul ranget võrdlust `===`, sest see ei tee automaatset tüübiteisendust:

```js
console.log(5 === 5);   // true
console.log(5 === "5"); // false
```

::: warning `=` omistab, `===` võrdleb
```js
let age = 16;

age = 18;      // omistab muutujale uue väärtuse
age === 18;    // võrdleb ja annab tulemuseks true
```
:::

## Loogikaoperaatorid

Loogikaoperaatoritega saab tingimusi ühendada või vastupidiseks muuta.

| Operaator | Tähendus | Tulemus on `true`, kui... |
|---|---|---|
| `&&` | ja | mõlemad tingimused on tõesed |
| `||` | või | vähemalt üks tingimus on tõene |
| `!` | mitte | algne tingimus on väär |

### Mõlemad tingimused peavad sobima: `&&`

```js
const age = 17;
const hasPermission = true;

if (age >= 16 && hasPermission) {
  console.log("Saab osaleda");
}
```

### Vähemalt üks tingimus peab sobima: `||`

```js
const role = "teacher";

if (role === "admin" || role === "teacher") {
  console.log("Ligipääs lubatud");
}
```

### Tingimuse vastand: `!`

```js
const isLoggedIn = false;

if (!isLoggedIn) {
  console.log("Palun logi sisse");
}
```

::: details Ennusta
Kas sõnum väljastatakse?

```js
const isInStock = true;
const cartTotal = 45;

if (isInStock && cartTotal >= 50) {
  console.log("Tasuta tarne");
}
```
:::

::: details Kontrolli vastust
Sõnumit ei väljastata. `isInStock` on `true`, kuid `cartTotal >= 50` on `false`. Operaator `&&` vajab kahte tõest tingimust.
:::

## `truthy` ja `falsy` väärtused

`if` teisendab tingimuse vajadusel `boolean` väärtuseks. Väärtuseid, mis muutuvad väärtuseks `false`, nimetatakse **falsy** väärtusteks:

| Falsy väärtus | Levinud tähendus |
|---|---|
| `false` | tingimus ei kehti |
| `0`, `-0`, `0n` | arvuline väärtus on null |
| `""` | tekst on tühi |
| `null` | väärtus on teadlikult tühi |
| `undefined` | väärtust pole määratud |
| `NaN` | arvuteisendus või arvutus ebaõnnestus |

Kõik teised tavapärased väärtused on **truthy**.

```js
const userName = "";

if (!userName) {
  console.log("Nimi on puudu");
}
```

Tühi string on falsy. Operaator `!` muudab selle vastandiks `true`, mistõttu koodiplokk käivitatakse.

::: warning String `"false"` on truthy
```js
console.log(Boolean("false")); // true
console.log(Boolean("0"));     // true
console.log(Boolean(""));      // false
```

Mittetühi string on truthy sõltumata selle tekstist.
:::

## Proovi ise: ligipääsuotsus

Kopeeri kood brauseri DevTools Console'isse või Node.js faili:

```js
const isLoggedIn = true;
const role = "student";
const isBlocked = false;

if (isBlocked) {
  console.log("Konto on blokeeritud");
} else if (!isLoggedIn) {
  console.log("Palun logi sisse");
} else if (role === "admin" || role === "teacher") {
  console.log("Haldusvaade");
} else {
  console.log("Õppija vaade");
}
```

Enne käivitamist:

1. ennusta väljund;
2. muuda `isBlocked` väärtuseks `true` ja ennusta uus väljund;
3. muuda `role` väärtuseks `"teacher"` ning `isBlocked` tagasi väärtuseks `false`;
4. selgita, miks blokeeritud konto tingimus on esimene.

::: details Kontrolli vastuseid
- Alguses väljastatakse `"Õppija vaade"`.
- Kui `isBlocked` on `true`, väljastatakse `"Konto on blokeeritud"`.
- Õpetaja rolliga väljastatakse `"Haldusvaade"`.
- Blokeeringut kontrollitakse esimesena, sest see peab keelama ligipääsu sõltumata sisselogimisest või rollist.
:::

## Praktiline ülesanne: tellimuse tarneotsus

Koosta programm, mis otsustab, kas tellimust saab esitada ja milline tarne rakendub.

Lähteandmed:

```js
const isInStock = true;
const cartTotal = 45;
const isPremiumCustomer = false;
```

Otsustusreeglid:

1. Kui toodet ei ole laos, väljasta `"Toodet ei saa tellida"`.
2. Kui klient on premium-klient või ostukorvi summa on vähemalt 50 eurot, väljasta `"Tellimus sobib ja tasuta tarne rakendub"`.
3. Muul juhul väljasta `"Tellimus sobib, aga tasuta tarne ei rakendu"`.

Valmis lahendus:

- kasutab ühte `if` / `else if` / `else` otsust;
- kontrollib laoseisu enne tarneviisi;
- kasutab tasuta tarne tingimuses operaatorit `||`;
- annab piirväärtuse `50` korral tasuta tarne;
- annab kõigi kolme võimaliku väljundi jaoks õige tulemuse.

Kontrolli vähemalt järgmiste andmetega:

| `isInStock` | `cartTotal` | `isPremiumCustomer` | Oodatav tulemus |
|---|---:|---|---|
| `false` | `100` | `true` | Toodet ei saa tellida |
| `true` | `50` | `false` | Tasuta tarne rakendub |
| `true` | `20` | `true` | Tasuta tarne rakendub |
| `true` | `49` | `false` | Tasuta tarne ei rakendu |

::: details Vihje 1
Alusta olukorrast, mis peab kõik teised võimalused välistama: toodet ei ole laos.
:::

::: details Vihje 2
Tasuta tarne rakendub, kui vähemalt üks kahest tingimusest sobib. Kasuta operaatorit `||`.
:::

::: details Vihje 3
Piirväärtus `50` peab tasuta tarne sisse arvama. Kasuta võrdlust `cartTotal >= 50`.
:::

::: details Üks võimalik lahendus
```js
const isInStock = true;
const cartTotal = 45;
const isPremiumCustomer = false;

if (!isInStock) {
  console.log("Toodet ei saa tellida");
} else if (isPremiumCustomer || cartTotal >= 50) {
  console.log("Tellimus sobib ja tasuta tarne rakendub");
} else {
  console.log("Tellimus sobib, aga tasuta tarne ei rakendu");
}
```
:::

## Mõtesta

- Miks tuleb laoseisu kontrollida enne tasuta tarne tingimust?
- Mis muutuks, kui kirjutaksid `cartTotal > 50` asemel `cartTotal >= 50`?
- Millal muudab tähendusliku nimega `boolean` muutuja tingimuse paremini loetavaks?

## Järgmine tase

Järgmised võtted on kasulikud, kuid praktilise ülesande lahendamiseks ei ole need kohustuslikud.

### `switch`

`switch` sobib juhul, kui võrreldakse ühe avaldise väärtust mitme kindla väärtusega.

```js
const role = "teacher";

switch (role) {
  case "admin":
    console.log("Administraatori vaade");
    break;
  case "teacher":
    console.log("Õpetaja vaade");
    break;
  case "student":
    console.log("Õppija vaade");
    break;
  default:
    console.log("Tundmatu roll");
}
```

`break` lõpetab sobiva haru. Kui `break` puudub, jätkab programm järgmise haru käivitamist.

Kasuta `if`-lauset, kui otsus põhineb vahemikel või mitmel eri tingimusel. Kasuta `switch`-lauset, kui kontrollid ühe väärtuse mitut kindlat varianti.

### Lühendatud hindamine

Operaatorid `&&` ja `||` lõpetavad hindamise niipea, kui tulemus on teada:

```js
const isLoggedIn = false;
const hasAccess = isLoggedIn && role === "admin";
```

Kuna `isLoggedIn` on `false`, ei pea JavaScript teist tingimust tulemuse leidmiseks kontrollima. Seda nimetatakse lühendatud hindamiseks (*short-circuit evaluation*).

## Levinud vead

### Võrdlemise asemel kasutatakse omistamist

```js
let age = 16;

if (age = 18) {
  console.log("See tingimus töötab valesti");
}
```

Kasuta võrdlemiseks `===` operaatorit:

```js
if (age === 18) {
  console.log("Kasutaja on 18-aastane");
}
```

### Üldisem tingimus pannakse liiga vara

```js
if (score >= 50) {
  console.log("Arvestatud");
} else if (score >= 90) {
  console.log("Väga hea");
}
```

Väärtus `95` jääb esimesse harusse. Kontrolli rangemat tingimust enne üldisemat.

### `&&` ja `||` aetakse segamini

```js
const hasFreeShipping = isPremiumCustomer || cartTotal >= 50;
```

Kasuta `||`, kui piisab vähemalt ühest sobivast tingimusest. Kasuta `&&`, kui kõik tingimused peavad sobima.

## Kokkuvõte

- Tingimuslause valib andmete põhjal käivitatava koodiharu.
- `if` / `else if` / `else` harusid kontrollitakse ülevalt alla kuni esimese sobiva haruni.
- Võrdlusoperaatori tulemus on `true` või `false`.
- `&&` nõuab kõigi tingimuste sobimist, `||` vähemalt ühe sobimist ja `!` muudab tingimuse vastandiks.
- Tingimuste järjekord ja piirväärtused mõjutavad programmi tulemust.
- `truthy` ja `falsy` väärtused selgitavad, kuidas mitte-boolean väärtused tingimustes käituvad.

## Allikad

- [MDN: Making decisions in your code](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals) — tingimuslausete praktiline ülevaade.
- [MDN: Comparison operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#relational_operators) — võrdlusoperaatorite teatmematerjal.
- [MDN: Logical operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#binary_logical_operators) — loogikaoperaatorid ja lühendatud hindamine.
