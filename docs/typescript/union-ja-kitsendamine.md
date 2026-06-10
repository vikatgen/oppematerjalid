---
title: Union-tüübid ja kitsendamine
description: Piira lubatud olekud ning kitsenda union-tüüpi enne väärtuse kasutamist.
outline: deep
---

# Union-tüübid ja kitsendamine

::: info Õpiväljund
Pärast õppetundi oskad kirjeldada piiratud olekud union-tüübiga ja käsitleda iga olekut turvaliselt.
:::

## Piira lubatud väärtused

```ts
type WorkshopStatus = "open" | "full" | "cancelled";

let status: WorkshopStatus = "open";
status = "finished"; // viga
```

Literal-union kirjeldab täpselt, millised väärtused on lubatud. Tavaline `string` lubaks ka kirjavigu ja tundmatuid olekuid.

## Kitsendamine

```ts
function formatId(id: number | string): string {
  if (typeof id === "number") {
    return `#${id.toFixed(0)}`;
  }

  return id.toUpperCase();
}
```

`typeof` kontroll kitsendab harus `number | string` tüübi üheks võimaluseks.

## Eristatud union

```ts
type LoadState =
  | { status: "loading" }
  | { status: "success"; workshops: Workshop[] }
  | { status: "error"; message: string };
```

Iga olekuga on kaasas ainult sellele olekule vajalikud andmed:

```ts
function getMessage(state: LoadState): string {
  switch (state.status) {
    case "loading":
      return "Laadin...";
    case "success":
      return `Leiti ${state.workshops.length} töötuba`;
    case "error":
      return state.message;
  }
}
```

Nii ei saa rakendus olla korraga vigases olekus, näiteks `loading: true` ja samal ajal juhusliku veateatega.

## Praktiline ülesanne

1. Lisa töötoale olek `"open" | "full" | "cancelled"`.
2. Koosta `getStatusMessage()` iga oleku jaoks.
3. Modelleeri broneerimise tulemus eristatud union'ina:
   - õnnestumine koos broneeringuga;
   - ebaõnnestumine koos põhjusega.

## Kontrolli tulemust

Vale oleku lisamine peab andma tüübi vea. Iga lubatud olek peab tagastama kasutajale sobiva sõnumi.

## Mõtesta

- Miks on literal-union turvalisem kui vaba `string`?
- Millise vigase olekukombinatsiooni eristatud union välistab?

Järgmisena: [Puuduvad ja tundmatud väärtused](./null-ja-unknown.md).

