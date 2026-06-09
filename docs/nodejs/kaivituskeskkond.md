---
title: Faili käivitamine ja keskkond
description: Käivita JavaScripti fail Node.js-is ning uuri protsessi ja käivituskeskkonda.
outline: deep
---

# Faili käivitamine ja keskkond

::: info Õpiväljund
Pärast õppetundi oskad käivitada JavaScripti faili Node.js-is ning leida käivitatud protsessi argumendid, töökataloogi ja keskkonnamuutuja.
:::

Node.js programm käivitatakse tavaliselt terminalist:

```bash
node app.js
```

Operatsioonisüsteem loob selle jaoks **protsessi**. Protsess on töötav programm, millel on oma argumendid, keskkonnamuutujad ja ligipääsuõigused.

Node.js annab protsessi kohta infot globaalse `process` objekti kaudu.

## Käivitamise asukoht loeb

Loo fail `app.js`:

```js
console.log("Fail:", import.meta.filename);
console.log("Töökataloog:", process.cwd());
console.log("Argumendid:", process.argv);
```

Käivita:

```bash
node app.js Tere 42
```

- `import.meta.filename` kirjeldab käivitatavat faili;
- `process.cwd()` näitab kataloogi, kust käsk käivitati;
- `process.argv` on massiiv käsurea argumentidega.

::: warning Faili asukoht ja töökataloog ei ole sama mõiste
Programmi võib käivitada teisest kataloogist. Suhtelised failiteed lähtuvad sageli töökataloogist, mistõttu võib valest kohast käivitamine anda ootamatu tulemuse.
:::

## Keskkonnamuutujad

Keskkonnamuutuja annab programmile seadistuse ilma seda lähtekoodi kirjutamata.

```js
const port = process.env.PORT ?? "3000";

console.log(`Server kasutaks porti ${port}`);
```

Käivita macOS-is või Linuxis:

```bash
PORT=8080 node app.js
```

Ära väljasta ega lisa Git repository'sse paroole, võtmeid või muid saladusi.

## Praktiline ülesanne: tervitusprogramm

Koosta `greet.js`, mis:

1. loeb õppija nime käsurea argumendist;
2. kasutab puuduva nime korral väärtust `"külaline"`;
3. loeb keele `process.env.LANG_CODE` muutujast;
4. kuvab tulemuse terminali.

Näidiskäivitused:

```bash
node greet.js Mari
LANG_CODE=en node greet.js Alex
```

Kontrollitav tulemus: programm töötab nii argumendiga kui ka ilma selleta.

::: details Üks võimalik lahendus
```js
const name = process.argv[2] ?? "külaline";
const language = process.env.LANG_CODE ?? "et";

if (language === "en") {
  console.log(`Hello, ${name}!`);
} else {
  console.log(`Tere, ${name}!`);
}
```
:::

## Kontrollpunkt

- Mis vahe on JavaScripti failil ja töötaval protsessil?
- Mida näitab `process.argv`?
- Millal on keskkonnamuutuja parem kui koodi sisse kirjutatud seadistus?

Järgmisena: [Moodulid ja `package.json`](/nodejs/moodulid).

## Allikad

- [Node.js: Process](https://nodejs.org/api/process.html)
- [Node.js: Command-line API](https://nodejs.org/api/cli.html)
