---
title: Põhitüübid ja tüübijäreldus
description: Kasuta põhitüüpe ning vali teadlikult tüübijärelduse ja annotatsiooni vahel.
outline: deep
---

# Põhitüübid ja tüübijäreldus

::: info Õpiväljund
Pärast õppetundi oskad kirjeldada muutujate ja massiivide tüüpe ilma üleliigseid annotatsioone lisamata.
:::

## TypeScript tuletab tüüpe

```ts
const title = "TypeScripti töötuba"; // string
const capacity = 20;                 // number
const isOpen = true;                 // boolean
```

TypeScript saab väärtuste põhjal tüübid ise tuletada. Sellises kohas ei anna `const title: string` tavaliselt lisainfot.

Annotatsioon on kasulik, kui algväärtusest ei piisa:

```ts
let selectedWorkshopId: number | null = null;
const participants: string[] = [];
```

Ilma `string[]` annotatsioonita ei tea tühi massiiv veel, milliseid väärtusi sinna lisatakse.

## Levinud tüübid

```ts
const title: string = "Veebiarendus";
const capacity: number = 20;
const published: boolean = true;
const tags: string[] = ["typescript", "vite"];
const coordinates: [number, number] = [58.25, 22.49];
```

Tuple ehk fikseeritud elementidega massiiv sobib siis, kui positsioonidel on kindel tähendus.

## Väldi `any` tüüpi

```ts
let workshop: any;

workshop.missing.deep.value(); // TypeScript ei kontrolli seda.
```

`any` lülitab kontrolli välja ja võib vea teistesse failidesse edasi kanda. Kui väärtuse tüüp ei ole teada, kasuta hiljem õpitavat `unknown` tüüpi.

## Praktiline ülesanne

Kirjelda töötoa andmed sobivate tüüpidega:

- pealkiri;
- maksimaalne kohtade arv;
- avaldamise olek;
- osalejate nimede massiiv;
- valitud töötoa ID, mis alguses puudub.

Seejärel proovi igale muutujale omistada vale tüüpi väärtus ja loe veateadet.

## Kontrolli tulemust

```bash
npm run check
```

Valmis lahenduses ei ole `any` tüüpi ega üleliigseid annotatsioone ilmselgete `const` väärtuste juures.

## Mõtesta

- Millal annab annotatsioon lugejale uut infot?
- Miks vajab tühi massiiv sageli tüüpi?

Järgmisena: [Funktsioonide tüübid](./funktsioonide-tuubid.md).

