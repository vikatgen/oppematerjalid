---
title: Projekt ja tsconfig.json
description: Seadista TypeScripti projekt ning kasuta tsconfig.json faili tüübikontrolli juhtimiseks.
outline: deep
---

# Projekt ja `tsconfig.json`

::: info Õpiväljund
Pärast õppetundi oskad seadistada TypeScripti projekti ning käivitada eraldi tüübikontrolli ja build'i.
:::

## Kiire algus

Loo Vite'i TypeScripti projekt:

```bash
npm create vite@latest workshop-app -- --template vanilla-ts
cd workshop-app
npm install
npm run dev
```

Vite käitab arendusserverit ja teisendab TypeScripti brauserile sobivaks JavaScriptiks.

## TypeScripti kompilaator

TypeScripti pakett sisaldab `tsc` käsureatööriista. Lisa projektile eraldi kontrollkäsk:

```json
{
  "scripts": {
    "dev": "vite",
    "check": "tsc --noEmit",
    "build": "tsc && vite build"
  }
}
```

- `npm run check` kontrollib tüüpe väljundfaile loomata;
- `npm run build` kontrollib tüüpe ja loob produktsioonifailid;
- `npm run dev` annab kiire arenduskeskkonna.

## `tsconfig.json`

`tsconfig.json` kirjeldab, kuidas TypeScript projekti kontrollib.

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022", "DOM"],
    "strict": true,
    "noEmit": true
  },
  "include": ["src"]
}
```

| Seadistus | Roll |
| --- | --- |
| `target` | Millise JavaScripti võimalustega väljund peab sobima |
| `module` | Millist moodulivormingut tööriistad kasutavad |
| `lib` | Milliste keskkondade API-de tüübid on saadaval |
| `strict` | Lülitab sisse rangema tüübikontrolli |
| `noEmit` | Kas `tsc` loob JavaScripti failid |
| `include` | Milliseid faile projekt kontrollib |

::: warning Ära lahenda vigu `strict` väljalülitamisega
Range kontroll näitab kohti, kus rakendus teeb ohtliku eelduse. Paranda eeldus või käsitle puuduvat väärtust.
:::

## Praktiline ülesanne

1. Loo Vite'i `vanilla-ts` projekt.
2. Lisa `check` skript.
3. Tekita failis teadlik tüübi viga.
4. Võrdle `npm run dev`, `npm run check` ja `npm run build` tulemusi.
5. Paranda viga.

## Kontrolli tulemust

```bash
npm run check
npm run build
```

Mõlemad käsud peavad lõppema veata.

## Mõtesta

- Miks tasub CI-s käivitada `npm run check`, isegi kui arendusserver töötab?
- Miks vajab brauseriprojekt `DOM` teeki?

Järgmisena: [Põhitüübid ja tüübijäreldus](./pohituubid-ja-tuubijareldus.md).

