---
title: Funktsioonide tüübid
description: Kirjelda funktsiooni sisend, väljund ja callback TypeScripti tüüpidega.
outline: deep
---

# Funktsioonide tüübid

::: info Õpiväljund
Pärast õppetundi oskad kirjeldada funktsiooni sisendi ja väljundi tüübid ning kasutada tüübikindlat callback-funktsiooni.
:::

Funktsioon on kokkulepe: millised väärtused ta vastu võtab ja mida tagastab.

```ts
function getRemainingPlaces(capacity: number, booked: number): number {
  return capacity - booked;
}
```

Parameetrite tüübid tuleb tavaliselt kirjutada. Tagastustüübi suudab TypeScript sageli tuletada, kuid avaliku funktsiooni juures võib selge tagastustüüp aidata kokkulepet nähtavaks teha.

## Valikulised parameetrid

```ts
function createLabel(title: string, room?: string): string {
  return room ? `${title} (${room})` : title;
}
```

`room?: string` tähendab, et väärtus võib olla `string` või `undefined`.

## `void`

```ts
function showMessage(message: string): void {
  console.log(message);
}
```

`void` kirjeldab funktsiooni, mille tulemust kutsuja ei kasuta.

## Callback'i tüüp

```ts
type WorkshopFilter = (capacity: number, booked: number) => boolean;

const hasPlaces: WorkshopFilter = (capacity, booked) => {
  return booked < capacity;
};
```

Callback'i tüüp kirjeldab funktsiooni kuju, mitte selle konkreetset lahendust.

## Praktiline ülesanne

Koosta:

1. `getRemainingPlaces()` funktsioon;
2. `canBook()` funktsioon;
3. `formatWorkshop()` funktsioon valikulise ruumi parameetriga;
4. vähemalt kaks sama `WorkshopFilter` tüüpi callback'i.

Funktsioonid peavad tagastama väärtuse ega tohi ise `console.log()` kasutada.

## Kontrolli tulemust

Proovi anda funktsioonidele vales järjekorras või vale tüüpi argumente. TypeScript peab vea enne käivitamist leidma.

## Mõtesta

- Miks on väärtust tagastavat funktsiooni lihtsam testida kui ainult terminali kirjutavat funktsiooni?
- Millal tasub tagastustüüp eraldi välja kirjutada?

Järgmisena: [Objektide tüübid](./objektide-tuubid.md).

