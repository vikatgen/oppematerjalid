---
title: Objektide tüübid
description: Modelleeri rakenduse andmed type'i, interface'i, readonly ja valikuliste omadustega.
outline: deep
---

# Objektide tüübid

::: info Õpiväljund
Pärast õppetundi oskad koostada rakenduse andmemudeli ning põhjendada nõutavaid, valikulisi ja muutumatuid omadusi.
:::

## Nimeta andmekuju

```ts
interface Workshop {
  readonly id: number;
  title: string;
  capacity: number;
  room?: string;
  participants: string[];
}
```

- `id` on nõutav, kuid `readonly` takistab selle hilisemat muutmist;
- `room?` on valikuline;
- `participants` peab olema nimede massiiv.

```ts
const workshop: Workshop = {
  id: 1,
  title: "TypeScript",
  capacity: 20,
  participants: []
};
```

## `type` ja `interface`

Mõlemad saavad kirjeldada objekti:

```ts
type Participant = {
  id: number;
  name: string;
};

interface Workshop {
  id: number;
  title: string;
}
```

Selles moodulis kasutame objektide põhikujude jaoks sageli `interface` ning union'ite ja funktsioonitüüpide jaoks `type`. Tähtsam kui ühe eelistamine on projekti järjepidevus.

## Struktuurne tüüpimine

TypeScript kontrollib, kas väärtusel on vajalik kuju:

```ts
interface Named {
  name: string;
}

const student = { name: "Mari", course: "SWE" };

function greet(value: Named) {
  return `Tere, ${value.name}!`;
}

greet(student); // sobib, sest vajalik name on olemas
```

## Praktiline ülesanne

Koosta `Workshop`, `Participant` ja `Booking` andmemudelid. Märgi:

- identifikaatorid muutumatuks;
- päriselt puududa võivad väärtused valikuliseks;
- kuupäevad selles ülesandes ISO-kujulisteks `string` väärtusteks.

Loo iga tüübi kohta vähemalt üks korrektne näidisobjekt.

## Kontrolli tulemust

Proovi eemaldada nõutav omadus, muuta `readonly` ID-d ja anda massiivi asemel tekst. Loe iga veateate puhul, millist kokkulepet rikuti.

## Mõtesta

- Milline omadus tohib päriselt puududa ja milline peaks alati olemas olema?
- Miks ei muuda `readonly` objekti käitamise ajal muutumatuks?

Järgmisena: [Union-tüübid ja kitsendamine](./union-ja-kitsendamine.md).

