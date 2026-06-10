---
title: TypeScript Node.js-is ja pakettides
description: Kasuta TypeScripti Node.js projektis ning selgita, kust npm-pakettide tüübid pärinevad.
outline: deep
---

# TypeScript Node.js-is ja pakettides

::: info Õpiväljund
Pärast õppetundi oskad seadistada TypeScripti Node.js projektis ning tuvastada, kust imporditud paketi tüübid pärinevad.
:::

## Node.js projekti seadistus

```bash
npm init -y
npm install -D typescript @types/node
npx tsc --init
```

`typescript` annab `tsc` tööriista. `@types/node` kirjeldab TypeScriptile Node.js API-sid, näiteks `process` ja failisüsteemi mooduleid.

```json
{
  "type": "module",
  "scripts": {
    "check": "tsc --noEmit",
    "build": "tsc",
    "start": "node dist/app.js"
  }
}
```

Lihtsustatud `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true
  },
  "include": ["src"]
}
```

## Keskkonnamuutuja võib puududa

```ts
const port = Number(process.env.PORT ?? "3000");

if (!Number.isInteger(port) || port <= 0) {
  throw new Error("PORT peab olema positiivne täisarv.");
}
```

`process.env.PORT` tüüp sisaldab `undefined`, sest muutuja ei pruugi olla seadistatud.

## Kust paketi tüübid tulevad?

Paketil võib olla:

1. paketi enda TypeScripti tüübid;
2. eraldi `@types/paketi-nimi` pakett;
3. tüübid puudu.

Kontrolli paketi dokumentatsiooni ja `package.json` faili. Ära paigalda `@types` paketti automaatselt, kui paketil on tüübid juba kaasas.

## Praktiline ülesanne

Loo TypeScripti Node.js programm, mis:

- loeb `PORT` keskkonnamuutuja;
- loeb JSON-failist töötoad;
- kontrollib, et JSON on massiiv;
- kuvab töötubade arvu;
- build'ib lähtekoodi `dist` kausta.

## Kontrolli tulemust

```bash
npm run check
npm run build
npm start
```

Kontrolli ka puuduva faili, vigase JSON-i ja vigase `PORT` väärtusega.

## Mõtesta

- Miks vajab TypeScript `@types/node` paketti, kuigi Node.js ise juba töötab?
- Miks peab keskkonnamuutujat pärast tüübi kontrolli ikkagi sisuliselt valideerima?

Järgmisena: [Klassid ja liidesed](./klassid-ja-liidesed.md).

