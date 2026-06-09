---
title: Intl ja väärtuste vormindamine
description: Õpi kuvama arve, valuutat ja kuupäevi kasutaja keelele sobivas vormingus.
outline: deep
---

# `Intl` ja väärtuste vormindamine

::: info Õpiväljund
Pärast õppetundi oskad vormindada arve, valuutat ja kuupäevi kasutaja lokaadi järgi ilma käsitsi tekstireegleid koostamata.
:::

Rakendus hoiab arvutamiseks väärtust arvuna, kuid kasutajale kuvatav tekst sõltub keelest ja piirkonnast.

```text
1234.5
1 234,50 €
€1,234.50
```

## Mis on lokaat?

Lokaat (*locale*) kirjeldab keele ja piirkonna vormindusreegleid:

```text
et-EE
en-US
fi-FI
```

`Intl` kasutab brauserisse või Node.js-i lisatud rahvusvahelistamise andmeid.

## Arvu vormindamine

```js
const numberFormatter = new Intl.NumberFormat("et-EE");

console.log(numberFormatter.format(1234567.89));
```

Hoia formatter korduvaks kasutamiseks muutujas, mitte ära loo seda iga tootekaardi jaoks uuesti.

## Valuuta vormindamine

```js
const priceFormatter = new Intl.NumberFormat("et-EE", {
  style: "currency",
  currency: "EUR"
});

console.log(priceFormatter.format(39.99));
```

Tootekataloogis:

```js
priceElement.textContent = priceFormatter.format(product.price);
```

Arv jääb andmetes arvuks. Vormindatud tekst luuakse alles kuvamisel.

## Kuupäeva vormindamine

```js
const dateFormatter = new Intl.DateTimeFormat("et-EE", {
  dateStyle: "long",
  timeStyle: "short"
});

console.log(dateFormatter.format(new Date()));
```

Ajatsooni saab määrata:

```js
const utcFormatter = new Intl.DateTimeFormat("et-EE", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "UTC"
});
```

## Suhteline aeg

```js
const relativeFormatter = new Intl.RelativeTimeFormat("et-EE", {
  numeric: "auto"
});

console.log(relativeFormatter.format(-1, "day"));
console.log(relativeFormatter.format(2, "day"));
```

See sobib tekstideks nagu „eile” või „2 päeva pärast”.

## Ära arvuta vormindatud tekstiga

Vale:

```js
const formattedPrice = priceFormatter.format(39.99);
const total = formattedPrice * 2;
```

Õige:

```js
const total = 39.99 * 2;
const formattedTotal = priceFormatter.format(total);
```

Andmed ja kasutajale kuvatav tekst täidavad eri eesmärke.

## Praktiline ülesanne

Täienda tootekataloogi:

1. vorminda toote hind eurodes `et-EE` lokaadi järgi;
2. kuva toote lisamise kuupäev pika kuupäevana;
3. kuva eraldi, mitu päeva tagasi toode lisati;
4. kontrolli sama väärtuse kuvamist lokaadiga `en-US`.

## Mõtesta

- Miks ei tohiks valuutasümbolit andmeväärtuse sisse salvestada?
- Millal peaks lokaat tulema kasutaja seadest, mitte olema koodis fikseeritud?
- Mis vahe on ajahetkel ja vormindatud kuupäevatekstil?

## Kokkuvõte

- `Intl` vormindab väärtuseid lokaadi järgi.
- Arvud ja kuupäevad hoitakse andmetes arvutataval kujul.
- Vormindatud tekst luuakse kasutajale kuvamisel.
- Formatterit saab korduvaks kasutamiseks taaskasutada.

## Allikad

- [MDN: Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
- [MDN: Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
- [MDN: Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
