---
title: Puuduvad ja tundmatud väärtused
description: Käsitle nulli, undefined väärtust ja tundmatut sisendit ilma tüübikontrolli välja lülitamata.
outline: deep
---

# Puuduvad ja tundmatud väärtused

::: info Õpiväljund
Pärast õppetundi oskad kontrollida puuduvat või tundmatut väärtust enne selle kasutamist.
:::

## Puuduv väärtus on osa tüübist

```ts
function findWorkshop(id: number): Workshop | undefined {
  return workshops.find((workshop) => workshop.id === id);
}

const workshop = findWorkshop(4);

if (workshop) {
  console.log(workshop.title);
}
```

`strictNullChecks` sunnib enne kasutamist arvestama, et otsing ei pruugi tulemust leida.

## Optional chaining ja vaikeväärtus

```ts
const roomLabel = workshop?.room ?? "Ruum määramata";
```

- `?.` peatab omaduse lugemise, kui eelnev väärtus puudub;
- `??` kasutab parempoolset väärtust ainult `null` või `undefined` korral.

## `unknown` ja `any`

```ts
function formatValue(value: unknown): string {
  if (typeof value === "string") {
    return value.trim();
  }

  if (typeof value === "number") {
    return value.toFixed(2);
  }

  return "Tundmatu väärtus";
}
```

`unknown` tähendab, et väärtuse tüüp ei ole teada ja seda tuleb enne kasutamist kontrollida. `any` lubaks teha väärtusega kõike ning peidaks võimalikud vead.

## Veateate turvaline lugemine

`catch` ploki viga võib olla tundmatu:

```ts
try {
  throw new Error("Päring ebaõnnestus");
} catch (error: unknown) {
  const message = error instanceof Error
    ? error.message
    : "Tundmatu viga";

  console.error(message);
}
```

## Praktiline ülesanne

Koosta funktsioon, mis:

1. otsib töötoa ID järgi;
2. tagastab leidmata töötoa korral arusaadava tulemuse;
3. kuvab puuduva ruumi korral `"Ruum määramata"`;
4. käsitleb `catch` plokis viga `unknown` väärtusena.

## Kontrolli tulemust

Kontrolli olemasolevat ja puuduvat ID-d. Lahenduses ei tohi olla `any` tüüpi ega põhjendamata `!` operaatorit.

## Mõtesta

- Miks on puuduv väärtus oluline modelleerida, mitte tüübiväitega peita?
- Mis kohustuse paneb `unknown` arendajale?

Järgmisena: [DOM ja sündmused](./dom-ja-sundmused.md).

