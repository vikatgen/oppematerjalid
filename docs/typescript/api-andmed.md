---
title: Asünkroonsus ja API-andmed
description: Tüübi Promise'i tulemus ning kontrolli serverist saadud tundmatuid andmeid käitusajal.
outline: deep
---

# Asünkroonsus ja API-andmed

::: info Õpiväljund
Pärast õppetundi oskad käsitleda API vastust `unknown` väärtusena ning tagastada kontrollitud `Promise<Workshop[]>` tulemuse.
:::

## Promise'i tulemus

```ts
async function fetchWorkshops(): Promise<Workshop[]> {
  // ...
}
```

`Promise<Workshop[]>` kirjeldab, et funktsioon lõpetab tulevikus töötubade massiiviga või viskab vea.

## Tüübiväide ei valideeri JSON-i

```ts
const workshops = await response.json() as Workshop[];
```

See rida ei kontrolli serveri vastust. `as Workshop[]` käsib TypeScriptil arendajat uskuda.

Alusta tundmatust väärtusest:

```ts
const data: unknown = await response.json();
```

## Lihtne tüübikaitse

```ts
function isWorkshop(value: unknown): value is Workshop {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return (
    "id" in value &&
    typeof value.id === "number" &&
    "title" in value &&
    typeof value.title === "string" &&
    "capacity" in value &&
    typeof value.capacity === "number"
  );
}
```

Funktsiooni tagastustüüp `value is Workshop` ütleb TypeScriptile, et `true` tulemuse järel võib väärtust käsitleda `Workshop`-ina.

## Kontrollitud päring

```ts
async function fetchWorkshops(): Promise<Workshop[]> {
  const response = await fetch("/api/workshops");

  if (!response.ok) {
    throw new Error(`HTTP viga: ${response.status}`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data) || !data.every(isWorkshop)) {
    throw new Error("Serveri vastus ei ole töötubade massiiv.");
  }

  return data;
}
```

## Praktiline ülesanne

Koosta kontrollitud päring, mis:

- kontrollib `response.ok`;
- loeb JSON-i `unknown` väärtusena;
- kontrollib, et vastus on sobivate objektide massiiv;
- tagastab `Promise<Workshop[]>`;
- näitab vigase vastuse korral kasutajale veaolekut.

## Kontrolli tulemust

Kontrolli korrektset vastust, HTTP-viga ja vigase kujuga JSON-i. Kõik kolm peavad jõudma teadlikult modelleeritud tulemuseni.

## Mõtesta

- Miks ei saa TypeScript välise API lubadust automaatselt usaldada?
- Millal muutub väärtus `unknown` tüübist `Workshop` tüübiks?

Järgmisena: [TypeScript Node.js-is ja pakettides](./nodejs-ja-paketid.md).

