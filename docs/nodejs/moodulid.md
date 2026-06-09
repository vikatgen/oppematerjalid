---
title: Moodulid ja package.json
description: Jaga Node.js programm vastutuste järgi failideks ning ühenda need importide ja eksportidega.
outline: deep
---

# Moodulid ja `package.json`

::: info Õpiväljund
Pärast õppetundi oskad jagada Node.js programmi vastutuste järgi mooduliteks ning selgitada `import`, `export` ja `package.json` rolli.
:::

Kui kogu programm on ühes failis, muutub selle lugemine ja kontrollimine kiiresti raskeks. **Moodul** on fail, mis ekspordib teistele failidele kasutatavaid väärtusi.

## ES-moodulid

Fail `price.js`:

```js
export function calculateTotal(price, amount) {
  return price * amount;
}
```

Fail `app.js`:

```js
import { calculateTotal } from "./price.js";

console.log(calculateTotal(4.5, 3));
```

`export` teeb väärtuse moodulist kättesaadavaks. `import` seob selle teises moodulis nimega.

::: warning Kohaliku faili laiend on oluline
Node.js ES-moodulis kirjuta kohaliku faili importimisel ka `.js` laiend: `./price.js`.
:::

## `package.json` kirjeldab projekti

Loo projekt:

```bash
npm init -y
```

Lisa `package.json` faili:

```json
{
  "type": "module",
  "scripts": {
    "start": "node app.js"
  }
}
```

- `"type": "module"` ütleb, et `.js` failid kasutavad ES-mooduleid;
- `"scripts"` annab korduvatele käskudele nimed;
- `npm run start` käivitab määratud käsu.

## Vastutus määrab jaotuse

Hea jaotus ei tähenda võimalikult paljusid faile. Fail tasub eraldada siis, kui sellel on arusaadav vastutus.

```text
product-api/
├── package.json
├── app.js          # programmi käivitamine
├── products.js     # toodete andmed
└── price.js        # hinna arvutused
```

## Praktiline ülesanne: hinnete kokkuvõte

Jaga programm kolmeks failiks:

- `grades.js` ekspordib hinnete massiivi;
- `summary.js` ekspordib keskmise arvutamise funktsiooni;
- `app.js` impordib mõlemad ja kuvab tulemuse.

Kontrollitav tulemus: `npm run start` kuvab hinnete keskmise ning arvutusfunktsioon ei sõltu `console.log()`-ist.

Piirjuhud:

- hinnete massiiv on tühi;
- mooduli tee algab puuduva `./` märgiga;
- eksporditud ja imporditud nimi ei ühti.

## Kontrollpunkt

- Mida `export` ja `import` kumbki teevad?
- Miks ei peaks arvutusfunktsioon ise tulemust terminali kuvama?
- Mida kirjeldab `package.json`?

Järgmisena: [Failisüsteem ja protsess](/nodejs/failisusteem-ja-protsess).

## Allikad

- [Node.js: Modules](https://nodejs.org/api/esm.html)
- [npm Docs: package.json](https://docs.npmjs.com/cli/configuring-npm/package-json)
