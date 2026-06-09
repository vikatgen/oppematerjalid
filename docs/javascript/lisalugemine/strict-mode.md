---
title: Strict mode
description: Valikuline lisalugemine JavaScripti range režiimi eesmärgist ja käitumisest.
outline: deep
---

# Strict mode

::: warning Valikuline lisalugemine
See leht aitab mõista vanemate JavaScripti skriptide käitumist ja range režiimi eesmärki. Materjal ei kuulu programmeerimise aluste nõutava taseme ega mooduli vahekaitsmise alla.
:::

## Miks strict mode loodi?

JavaScript lubas ajalooliselt mõnel tõenäolisel programmeerimisveal vaikides jätkuda. **Range režiim** (*strict mode*) muudab osa selliseid olukordi nähtavateks vigadeks ja keelab mõne segadust tekitava süntaksi.

Klassikalises skriptis lülitatakse range režiim sisse direktiiviga:

```js
"use strict";
```

Direktiiv peab olema skripti või funktsiooni alguses, enne muid lauseid.

::: info Moodulid ja klassid
JavaScripti moodulite ning klasside kood töötab automaatselt ranges režiimis. Nendes ei ole `"use strict";` direktiivi eraldi vaja.
:::

## Deklareerimata muutujale omistamine

Range režiimi üks kasulikumaid kontrolle on deklareerimata muutujale omistamise keelamine.

```js
"use strict";

score = 10; // ReferenceError
```

Muutuja peab olema deklareeritud:

```js
"use strict";

const score = 10;
```

Ilma range režiimita võib klassikaline brauseriskript mõnes olukorras luua kogemata globaalse omaduse. See teeb kirjavead raskemini märgatavaks ja võimaldab ühel skriptil teise olekut kogemata muuta.

## Vaikiva vea muutmine nähtavaks

Range režiim muudab osa ebaõnnestunud omistamisi vigadeks. Näiteks kirjutuskaitstud omaduse muutmise katse:

```js
"use strict";

const settings = {};

Object.defineProperty(settings, "version", {
  value: 1,
  writable: false
});

settings.version = 2; // TypeError
```

Ilma range režiimita võib selline omistamine klassikalises skriptis vaikides ebaõnnestuda. Range režiimis saab arendaja kohe veateate.

## Funktsiooni `this` käitumine

Tavalise funktsioonikutse puhul on `this` väärtus ranges režiimis `undefined`:

```js
"use strict";

function showThis() {
  console.log(this);
}

showThis(); // undefined
```

Vanema mitterange skripti puhul võib `this` samas olukorras viidata globaalsele objektile. Range režiim aitab vältida globaalsete väärtuste juhuslikku muutmist.

::: tip Mida alguses meeles pidada?
Kirjuta muutujad alati `const` või `let` abil ning kasuta kaasaegset moodulisüsteemi. Nii järgid häid tavasid ka ilma strict mode'i üksikasju pähe õppimata.
:::

## Range režiim ühes funktsioonis

Direktiivi saab rakendada ainult ühe funktsiooni sees:

```js
function legacyCode() {
  // mitterange funktsioon
}

function checkedCode() {
  "use strict";

  // range funktsioon
}
```

Seda kasutati eriti vanemates koodibaasides, kus kogu skripti korraga rangeks muutmine võis olemasoleva koodi katki teha.

## Proovi ise

Käivita järgmised näited brauseris klassikalise skriptina. Ära kasuta moodulit, sest moodul töötab juba automaatselt ranges režiimis.

```html
<script>
  accidentalValue = 10;
  console.log(accidentalValue);
</script>
```

Seejärel lisa direktiiv:

```html
<script>
  "use strict";

  accidentalValue = 10;
  console.log(accidentalValue);
</script>
```

::: details Kontrolli tulemust
Esimene klassikaline skript võib luua globaalse omaduse ja väljastada `10`.

Teine skript annab `ReferenceError` vea, sest `accidentalValue` ei ole deklareeritud.
:::

## Levinud väärarusaamad

### Strict mode ei ole üldine jõudlusseadistus

Range režiimi peamine eesmärk on muuta koodi käitumine selgemaks ja osa vigu nähtavaks. Seda ei tasu käsitleda lülitina, mis muudab programmi automaatselt kiiremaks.

### Strict mode ei asenda häid tavasid

Range režiim ei vali sinu eest tähenduslikke muutujanimesid, ei jaga suuri funktsioone väiksemaks ega kontrolli rakenduse äriloogikat.

### `"use strict"` on direktiiv, mitte funktsioon

```js
"use strict";
```

See on erilise tähendusega stringilause skripti või funktsiooni alguses. Seda ei kutsuta sulgudega.

## Kokkuvõte

- Strict mode muudab osa ajalooliselt vaikivaid JavaScripti vigu nähtavaks.
- Klassikalises skriptis lülitatakse see sisse direktiiviga `"use strict";`.
- Moodulid ja klassid töötavad automaatselt ranges režiimis.
- Range režiim keelab deklareerimata muutujale omistamise.
- Strict mode ei ole üldine jõudlusseadistus ega asenda häid programmeerimistavasid.

## Allikad

- [MDN: Strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) — range režiimi eesmärk, käitumine ja piirangud.
- [ECMAScript specification: Strict Mode Code](https://tc39.es/ecma262/multipage/ecmascript-language-source-code.html#sec-strict-mode-code) — range režiimi tehniline definitsioon.
