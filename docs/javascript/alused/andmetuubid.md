---
title: JavaScripti andmetüübid
description: Õpi väärtuse tüüpi tuvastama ja sisendandmeid enne kasutamist sobivaks tüübiks teisendama.
outline: deep
---

# Andmetüübid

::: info Õpiväljund
Pärast peatüki läbimist oskad tuvastada JavaScripti väärtuse tüübi ning teisendada sisendandmed enne arvutamist sobivaks tüübiks.
:::

## Eeldused ja töövahendid

- Oskad luua `const` muutujat ja kasutada `console.log()` käsku.
- Kasutad brauseri DevTools Console'it või Node.js-i.
- Soovituslik kestus on 60–75 minutit.

## Miks andmetüübid on olulised?

Veebivormist saadud väärtus on tavaliselt tekst, isegi kui kasutaja sisestas numbri. Kui programm liidab teksti ja arvu, võib tulemus olla ootamatu:

```js
const ticketCount = "2";
const ticketPrice = 8;

console.log(ticketCount + ticketPrice); // "28"
```

JavaScript ei näe jutumärkides olevat `"2"` arvu, vaid teksti. Operaator `+` ühendab sellisel juhul väärtused üheks stringiks.

```js
const ticketCount = Number("2");
const ticketPrice = 8;

console.log(ticketCount + ticketPrice); // 10
```

Andmetüüp määrab, millist väärtust programm hoiab ja milliseid tegevusi selle väärtusega teha saab.

## JavaScripti põhilised andmetüübid

JavaScripti väärtused jagunevad **primitiivideks** ja **objektideks**.

Primitiiv hoiab ühte lihtsat väärtust:

| Tüüp | Näide | Milleks sobib? |
|---|---|---|
| `string` | `"Mari"` | tekst |
| `number` | `16`, `4.5`, `NaN` | arvutused |
| `boolean` | `true`, `false` | jah/ei otsused |
| `undefined` | `undefined` | väärtust pole veel määratud |
| `null` | `null` | väärtus on teadlikult tühi |
| `bigint` | `9007199254740993n` | väga suured täisarvud |
| `symbol` | `Symbol("id")` | unikaalsed identifikaatorid |

Objekt koondab mitu omavahel seotud väärtust. Ka massiiv on JavaScriptis objekt.

```js
const student = {
  name: "Mari",
  age: 16,
  isActive: true
};

const grades = [4, 5, 3];
```

::: tip Oluline
Selles peatükis kasutame kõige rohkem tüüpe `string`, `number`, `boolean`, `undefined`, `null` ja `object`. `bigint` ning `symbol` muutuvad vajalikuks erijuhtudel.
:::

## Tüübi kontrollimine operaatoriga `typeof`

Operaator `typeof` tagastab väärtuse tüübi nime stringina.

```js
console.log(typeof "2");       // "string"
console.log(typeof 2);         // "number"
console.log(typeof true);      // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof {});        // "object"
```

Ennusta enne järgmise näite käivitamist iga rea tulemus:

```js
const userInput = "15";
const age = 15;
const hasPermission = false;

console.log(typeof userInput);
console.log(typeof age);
console.log(typeof hasPermission);
```

::: details Kontrolli vastust
```txt
string
number
boolean
```

`userInput` väärtus on jutumärkides ja on seetõttu string. Muutuja nimi ei mõjuta väärtuse tüüpi.
:::

### Kaks olulist eripära

```js
console.log(typeof null);        // "object"
console.log(typeof function() {}); // "function"
```

- `typeof null` tagastab ajaloolise eripära tõttu `"object"`, kuigi `null` ei ole objekt.
- Funktsioonid on tehniliselt objektid, kuid `typeof` tagastab nende puhul `"function"`.

Massiivi eristamiseks tavalisest objektist kasuta `Array.isArray()`:

```js
const grades = [4, 5, 3];

console.log(typeof grades);         // "object"
console.log(Array.isArray(grades)); // true
```

## Tüübi teadlik teisendamine

Väärtuse ühest tüübist teise muutmist nimetatakse **tüübiteisenduseks** (*type conversion*).

Kasuta teisendamiseks funktsioone `Number()`, `String()` ja `Boolean()`:

```js
const count = Number("3");
const message = String(404);
const hasName = Boolean("Mari");

console.log(count);   // 3
console.log(message); // "404"
console.log(hasName); // true
```

### Teksti teisendamine arvuks

Kasutaja sisendit ei saa alati arvuks teisendada. Ebaõnnestunud arvuteisenduse tulemus on `NaN` (*Not a Number*).

```js
const validNumber = Number("12");
const invalidNumber = Number("kaksteist");

console.log(validNumber);                 // 12
console.log(invalidNumber);               // NaN
console.log(Number.isNaN(invalidNumber)); // true
```

::: warning `typeof NaN` ei näita teisenduse ebaõnnestumist
`typeof NaN` tagastab `"number"`. Kontrolli ebaõnnestunud arvuteisendust meetodiga `Number.isNaN()`.
:::

### Väärtuse teisendamine tõeväärtuseks

`Boolean()` teisendab väärtuse väärtuseks `true` või `false`.

```js
console.log(Boolean("Mari")); // true
console.log(Boolean(""));     // false
console.log(Boolean(1));      // true
console.log(Boolean(0));      // false
console.log(Boolean(null));   // false
```

Tühja stringi, arvu `0`, väärtuseid `null`, `undefined` ja `NaN` käsitletakse tõeväärtuseks teisendamisel kui `false`. Seda teadmist kasutame hiljem [tingimuslausete](./tingimuslaused.md) juures.

## Automaatne tüübiteisendus

JavaScript võib eri tüüpi väärtustega tehet tehes tüüpe automaatselt teisendada. Seda nimetatakse **tüübisunniks** (*type coercion*).

```js
console.log("5" + 1);   // "51"
console.log("5" - 1);   // 4
console.log("5" * "2"); // 10
```

Operaator `+` võib tähendada nii arvude liitmist kui ka stringide ühendamist. Operaatorid `-` ja `*` proovivad väärtused arvudeks teisendada.

::: tip Praktiline reegel
Teisenda väljastpoolt programmi saabunud andmed teadlikult enne arvutamist. Nii on koodi tulemus lihtsamini ennustatav.
:::

## Proovi ise: piletiarvutus

Kopeeri kood brauseri DevTools Console'isse või Node.js faili:

```js
const ticketPrice = 8;
const ticketCountInput = "3";

const ticketCount = Number(ticketCountInput);
const totalPrice = ticketPrice * ticketCount;

console.log(typeof ticketCountInput);
console.log(typeof ticketCount);
console.log(`Kokku: ${totalPrice} €`);
```

Enne käivitamist ennusta:

1. Millise tüübi väljastab esimene `typeof`?
2. Millise tüübi väljastab teine `typeof`?
3. Milline on piletiarvutuse tulemus?

::: details Kontrolli vastust
```txt
string
number
Kokku: 24 €
```

`Number(ticketCountInput)` loob sisendteksti põhjal arvu, millega saab teha arvutuse.
:::

## Praktiline ülesanne: tellimuse kokkuvõte

Veebipoest saabusid järgmised sisendandmed:

```js
const productNameInput = "Klaviatuur";
const unitPriceInput = "45";
const quantityInput = "2";
const discountInput = "5";
```

Koosta programm, mis:

1. kontrollib `typeof` abil kõigi sisendväärtuste tüüpe;
2. teisendab ühikuhinna, koguse ja allahindluse arvudeks;
3. arvutab lõpphinna valemiga `ühikuhind * kogus - allahindlus`;
4. kontrollib `Number.isNaN()` abil, kas arvutamine ebaõnnestus;
5. väljastab tellimuse kokkuvõtte.

Oodatav kokkuvõte:

```txt
Klaviatuur: 2 tk, kokku 85 €
```

Valmis lahendus:

- arvutuses kasutatud väärtuste tüüp on `number`;
- lõpphind on `85`, mitte string;
- programm kontrollib meetodiga `Number.isNaN()`, kas arvutamine ebaõnnestus;
- väljund sisaldab toote nime, kogust ja lõpphinda.

::: details Vihje 1
Kasuta iga arvulise sisendi puhul funktsiooni `Number()`.
:::

::: details Vihje 2
Loo teisendatud väärtuste jaoks uued selge nimega muutujad, näiteks `unitPrice`.
:::

::: details Vihje 3
Kontroll võib välja näha selline:

```js
console.log(Number.isNaN(totalPrice)); // korrektse arvutuse korral false
```
:::

::: details Üks võimalik lahendus
```js
const productNameInput = "Klaviatuur";
const unitPriceInput = "45";
const quantityInput = "2";
const discountInput = "5";

console.log(typeof productNameInput);
console.log(typeof unitPriceInput);
console.log(typeof quantityInput);
console.log(typeof discountInput);

const unitPrice = Number(unitPriceInput);
const quantity = Number(quantityInput);
const discount = Number(discountInput);
const totalPrice = unitPrice * quantity - discount;

console.log(Number.isNaN(totalPrice));
console.log(`${productNameInput}: ${quantity} tk, kokku ${totalPrice} €`);
```
:::

## Mõtesta

- Miks on parem teisendada sisendväärtus arvuks enne arvutamist, selle asemel et loota JavaScripti automaatsele tüübiteisendusele?
- Miks ei piisa ebaõnnestunud arvuteisenduse leidmiseks kontrollist `typeof value === "number"`?

## Järgmine tase

Järgmised teemad on kasulikud, kuid ei ole praktilise ülesande lahendamiseks kohustuslikud.

### Range võrdlus

Operaator `===` võrdleb nii väärtust kui ka tüüpi. Operaator `==` võib enne võrdlemist tüüpe automaatselt teisendada.

```js
console.log(5 == "5");  // true
console.log(5 === "5"); // false
```

Kasuta üldjuhul ranget võrdlust `===`, sest selle tulemus on lihtsamini ennustatav.

### `null` ja `undefined`

Mõlemad tähistavad väärtuse puudumist, kuid erineval põhjusel:

```js
let selectedProduct;
const loggedInUser = null;

console.log(selectedProduct); // undefined
console.log(loggedInUser);    // null
```

- `undefined` tähendab tavaliselt, et väärtust pole veel määratud.
- `null` tähendab tavaliselt, et arendaja määras väärtuse teadlikult tühjaks.

## Levinud vead

### Arvu asemel kasutatakse stringi

```js
const quantity = "2";

console.log(quantity + 1); // "21"
```

Teisenda väärtus enne arvutamist:

```js
const quantity = Number("2");

console.log(quantity + 1); // 3
```

### Eeldatakse, et muutuja nimi määrab tüübi

```js
const age = "16";

console.log(typeof age); // "string"
```

Tüübi määrab muutuja väärtus, mitte nimi.

### Massiivi kontrollitakse ainult `typeof` abil

```js
const grades = [4, 5, 3];

console.log(typeof grades);         // "object"
console.log(Array.isArray(grades)); // true
```

## Kokkuvõte

- Andmetüüp määrab, milliseid tegevusi väärtusega teha saab.
- `typeof` aitab väärtuse tüüpi kontrollida.
- Väljastpoolt programmi saabunud sisend on sageli string.
- `Number()`, `String()` ja `Boolean()` teisendavad väärtuse teadlikult teise tüüpi.
- Ebaõnnestunud arvuteisendust kontrollitakse meetodiga `Number.isNaN()`.

## Allikad

- [MDN: JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures) — andmetüüpide põhjalik teatmematerjal.
- [MDN: `typeof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) — operaatori käitumine ja erijuhud.
- [MDN: Type coercion](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion) — automaatse tüübiteisenduse selgitus.
