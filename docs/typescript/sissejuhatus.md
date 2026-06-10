---
title: TypeScript
description: Mooduli eesmärk, õpitee ja läbiv töötoa broneerimissüsteemi projekt.
outline: deep
---

# TypeScript

::: info Mooduli tulemus
Mooduli lõpuks oskad muuta olemasoleva JavaScripti rakenduse TypeScriptiks, modelleerida selle andmed ning kasutada tüübikontrolli vigade varajaseks avastamiseks.
:::

JavaScript kontrollib paljusid vigu alles programmi käivitamisel. TypeScript lisab JavaScriptile tüübikontrolli, mis aitab osa vigadest leida juba koodi kirjutamise ja build'i ajal.

```ts
function calculateRemaining(capacity: number, booked: number) {
  return capacity - booked;
}

calculateRemaining(20, "5");
// Viga: string ei sobi number parameetriks.
```

TypeScript ei asenda JavaScripti. TypeScripti kood teisendatakse JavaScriptiks, sest brauser ja Node.js käitavad lõpuks JavaScripti.

## Eeldused

Enne moodulit peaksid oskama:

- kasutada JavaScripti funktsioone, objekte, massiive ja mooduleid;
- käsitleda DOM-i sündmusi ja `fetch()` päringuid;
- kasutada Node.js-i, npm-i ja `package.json` skripte;
- luua ja build'ida Vite projekti.

## Läbiv projekt

Moodulis arendad töötoa broneerimissüsteemi:

```ts
interface Workshop {
  id: number;
  title: string;
  capacity: number;
  participants: string[];
  status: "open" | "full" | "cancelled";
}
```

Iga peatükk muudab ühe rakenduse osa tüübikindlamaks. Lõputöös teisendad olemasoleva JavaScripti rakenduse TypeScriptiks.

## Õppejärjekord

1. [Miks TypeScript?](./miks-typescript.md)
2. [Projekt ja `tsconfig.json`](./projekt-ja-tsconfig.md)
3. [Põhitüübid ja tüübijäreldus](./pohituubid-ja-tuubijareldus.md)
4. [Funktsioonide tüübid](./funktsioonide-tuubid.md)
5. [Objektide tüübid](./objektide-tuubid.md)
6. [Union-tüübid ja kitsendamine](./union-ja-kitsendamine.md)
7. [Puuduvad ja tundmatud väärtused](./null-ja-unknown.md)
8. [DOM ja sündmused](./dom-ja-sundmused.md)
9. [Asünkroonsus ja API-andmed](./api-andmed.md)
10. [TypeScript Node.js-is ja pakettides](./nodejs-ja-paketid.md)
11. [Klassid ja liidesed](./klassid-ja-liidesed.md)
12. [Geneerikud ja utility-tüübid](./geneerikud-ja-utility-tuubid.md)
13. [JavaScriptist TypeScriptiks](./migreerimine.md)
14. [Praktiline töö](./praktiline-too.md)

## Kokkulepped

- Kasutame algusest peale `"strict": true` seadistust.
- Eelistame tüübijäreldust, kui tüüp on koodist selge.
- Väldime `any` tüüpi, sest see lülitab kontrolli välja.
- Kontrollime väliseid andmeid käitusajal ka siis, kui neile on TypeScripti tüüp antud.
- Parandame vea põhjuse, mitte ei peida veateadet `as` tüübiväitega.

## Hindamine

Kujundav hindamine toimub peatükkide praktiliste ülesannete ja `npm run check` tulemuse põhjal. Kokkuvõttev hindamine toimub praktilise töö ning lahenduse suulise selgituse alusel.

## Allikad ja abimaterjalid

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) — keele põhiteemade ametlik käsiraamat.
- [TypeScript Playground](https://www.typescriptlang.org/play) — väikeste näidete kiireks kontrollimiseks.
- [TypeScript TSConfig Reference](https://www.typescriptlang.org/tsconfig/) — kompilaatori seadistuste tähendused.
