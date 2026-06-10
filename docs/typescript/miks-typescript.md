---
title: Miks TypeScript?
description: Võrdle JavaScripti käitusaegseid vigu TypeScripti kompileerimisaegse kontrolliga.
outline: deep
---

# Miks TypeScript?

::: info Õpiväljund
Pärast õppetundi oskad selgitada, millise vea TypeScript enne programmi käivitamist leiab ja millist viga ta leida ei saa.
:::

## Probleem kasvavas JavaScripti rakenduses

```js
function getLabel(workshop) {
  return `${workshop.title}: ${workshop.capacity - workshop.booked} kohta`;
}

getLabel({ title: "TypeScript", capacity: 20, booked: "viis" });
```

JavaScript lubab programmi käivitada. Vale andmetüüp põhjustab alles kasutamisel vigase tulemuse.

TypeScriptis kirjeldame oodatava andmekuju:

```ts
interface Workshop {
  title: string;
  capacity: number;
  booked: number;
}

function getLabel(workshop: Workshop): string {
  return `${workshop.title}: ${workshop.capacity - workshop.booked} kohta`;
}
```

Editor ja TypeScripti kompilaator saavad nüüd vale objekti enne käivitamist tagasi lükata.

## TypeScripti töövoog

```text
TypeScripti lähtekood (.ts)
→ tüübikontroll
→ JavaScripti väljund
→ brauser või Node.js käitab JavaScripti
```

Tüübid eemaldatakse teisendamise käigus. Neid ei saa programmi käitamise ajal kasutada.

## Mida TypeScript kontrollib?

TypeScript aitab kontrollida näiteks:

- funktsiooni argumentide ja tagastusväärtuste tüüpe;
- objektide nõutavaid omadusi;
- võimalikke `null` ja `undefined` väärtusi;
- valesti kirjutatud omaduste nimesid;
- moodulite omavahelist kasutust.

TypeScript ei saa tõestada:

- et server tagastab päriselt lubatud andmed;
- et kasutaja sisestab sobiva väärtuse;
- et ärireegel on sisuliselt õige;
- et rakendus töötab kõigis olukordades.

Seetõttu vajame endiselt käitusaegset kontrolli ja teste.

## Praktiline ülesanne

Ava [TypeScript Playground](https://www.typescriptlang.org/play) ning teisenda järgmine funktsioon TypeScriptiks:

```js
function canBook(capacity, participants) {
  return participants.length < capacity;
}
```

Kontrolli vähemalt:

- korrektset arvu ja massiivi;
- arvu asemel teksti;
- massiivi asemel objekti.

## Kontrolli tulemust

Oskad iga vea puhul vastata:

1. kas vea leiab TypeScript või alles töötav programm;
2. milline väärtus ei vasta kokkuleppele;
3. kas probleemi lahendab tüüp, käitusaegne kontroll või test.

## Mõtesta

- Miks TypeScript ei saa kontrollida serverist tulevat JSON-i enne päringu tegemist?
- Miks ei tähenda vigadeta tüübikontroll automaatselt korrektset rakendust?

Järgmisena: [Projekt ja `tsconfig.json`](./projekt-ja-tsconfig.md).

