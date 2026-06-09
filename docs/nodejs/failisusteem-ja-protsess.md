---
title: Failisüsteem ja protsess
description: Loe ja kirjuta Node.js programmiga faile ning käsitle ebaõnnestumist.
outline: deep
---

# Failisüsteem ja protsess

::: info Õpiväljund
Pärast õppetundi oskad Node.js programmiga tekstifaili lugeda ja kirjutada ning käsitleda puuduva või vigase faili viga.
:::

Brauser ei tohi veebilehel lubada suvaliselt kasutaja faile lugeda. Node.js programm saab failisüsteemi kasutada talle antud kasutajaõiguste piires.

Node.js sisseehitatud moodulid imporditakse `node:` prefiksiga:

```js
import { readFile } from "node:fs/promises";

const content = await readFile("message.txt", "utf8");

console.log(content);
```

`readFile()` on asünkroonne, sest faili lugemine võib võtta aega. `"utf8"` ütleb, et soovid tulemuseks teksti.

## Faili kirjutamine

```js
import { writeFile } from "node:fs/promises";

const report = "Tooteid kokku: 20\n";

await writeFile("report.txt", report, "utf8");
```

`writeFile()` asendab olemasoleva faili sisu. Kui soovid juurde kirjutada, kasuta `appendFile()` funktsiooni.

## Ebaõnnestumine kuulub programmi käitumisse

```js
import { readFile } from "node:fs/promises";

try {
  const content = await readFile("products.json", "utf8");
  const products = JSON.parse(content);

  console.log(products);
} catch (error) {
  console.error("Toodete lugemine ebaõnnestus:", error.message);
  process.exitCode = 1;
}
```

Viga võib tulla vähemalt kahest kohast:

- faili ei ole või puudub lugemisõigus;
- faili sisu ei ole korrektne JSON.

## Praktiline ülesanne: aruande loomine

Loo `products.json` toodete massiiviga. Koosta programm, mis:

1. loeb faili;
2. teisendab JSON-i JavaScripti väärtuseks;
3. kontrollib, et tulemus oleks massiiv;
4. kirjutab `report.txt` faili toodete arvu.

Kontrolli programmi vähemalt kolme juhtumiga:

- korrektne toodete massiiv;
- tühi massiiv;
- vigane JSON.

::: tip Paranda üks probleem korraga
Loe veateadet, tuvasta ebaõnnestunud toiming ja kontrolli pärast parandust sama sisendiga uuesti.
:::

## Kontrollpunkt

- Miks on faili lugemine asünkroonne?
- Mis vahe on faili lugemise ja JSON-i parsimise veal?
- Miks ei tohiks programm viga vaikides ignoreerida?

Järgmisena: [Esimene HTTP-server](/nodejs/http-server).

## Allikad

- [Node.js: File system](https://nodejs.org/api/fs.html)
- [Node.js: Path](https://nodejs.org/api/path.html)
