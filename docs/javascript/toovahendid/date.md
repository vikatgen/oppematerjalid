---
title: Date ja ajahetked
description: Õpi looma, võrdlema ja muutma ajahetki ning vältima kuupäevade levinud väärarusaamu.
outline: deep
---

# `Date` ja ajahetked

::: info Õpiväljund
Pärast õppetundi oskad luua ning võrrelda ajahetki ja selgitada, miks kuupäeva kuvamine sõltub ajatsoonist.
:::

JavaScripti `Date` objekt esindab üht ajahetke. See ei ole ainult kalendripäev, vaid millisekundite arv kindlast algushetkest.

## Praegune ajahetk

```js
const now = new Date();

console.log(now);
console.log(now.getTime());
```

`getTime()` tagastab millisekundid alates 1. jaanuarist 1970 UTC järgi.

## Tekstist loodud kuupäev

Eelista üheselt mõistetavat ISO-vormingut:

```js
const createdAt = new Date("2026-06-09T10:30:00Z");
```

`Z` tähendab UTC aega. Brauser võib sama ajahetke kuvada kasutaja kohalikus ajatsoonis teise kellaajana.

```js
console.log(createdAt.toISOString());
console.log(createdAt.toString());
```

::: warning Väldi ebaselget kuupäevateksti
Tekst nagu `"06/09/2026"` võib eri keskkondades tähendada erinevat kuupäeva. Andmete vahetamisel kasuta ISO-vormingut.
:::

## Ajahetkede võrdlemine

```js
const first = new Date("2026-06-09T10:00:00Z");
const second = new Date("2026-06-09T11:00:00Z");

console.log(first.getTime() < second.getTime()); // true
```

Kahe ajahetke vahe:

```js
const differenceMs = second.getTime() - first.getTime();
const differenceMinutes = differenceMs / 1000 / 60;
```

## Date on muudetav objekt

```js
const deliveryDate = new Date();
deliveryDate.setDate(deliveryDate.getDate() + 7);
```

`setDate()` muudab olemasolevat objekti. Kui algset väärtust on veel vaja, loo koopia:

```js
const original = new Date();
const delivery = new Date(original);

delivery.setDate(delivery.getDate() + 7);
```

## Vigane kuupäev

```js
const date = new Date("vale väärtus");

console.log(Number.isNaN(date.getTime())); // true
```

Kontrolli välise sisendi põhjal loodud kuupäeva enne kasutamist.

## Kuupäeva hoidmine ja kuvamine

Serveri ning brauseri vahel hoitakse ajahetke sageli ISO-tekstina:

```js
const storedValue = new Date().toISOString();
```

Kasutajale kuvamiseks kasuta `Intl.DateTimeFormat` töövahendit, mida käsitleb järgmine tund.

## Praktiline ülesanne

Lisa tootekataloogi kohalikele toodetele `createdAt` ISO-väärtus.

Koosta funktsioon, mis:

1. kontrollib kuupäeva kehtivust;
2. võrdleb toote loomise aega praeguse ajaga;
3. tagastab, mitu täispäeva tagasi toode lisati.

Kontrolli tulemust tänase, eilse ja vigase kuupäevaga.

## Mõtesta

- Mis vahe on ajahetkel ja kasutajale kuvataval kuupäevatekstil?
- Miks võib sama `Date` kuvada eri ajatsoonides erinevat kellaaega?
- Miks tuleb `Date` objekti muutmisel arvestada objektiviitega?

## Kokkuvõte

- `Date` esindab ajahetke.
- ISO-vorming aitab ajahetki üheselt vahetada.
- Võrdlemiseks ja arvutamiseks kasutatakse millisekundeid.
- `Date` on muudetav objekt.
- Kuvamine ja salvestamine on erinevad ülesanded.

## Allikad

- [MDN: Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [MDN: Date time string format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format)
