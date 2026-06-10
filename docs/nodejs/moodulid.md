---
title: Moodulid, npm ja package.json
description: Jaga Node.js programm mooduliteks ning halda npm-i abil projekti käske, pakette ja seadistust.
outline: deep
---

# Moodulid, npm ja `package.json`

::: info Õpiväljund
Pärast õppetundi oskad jagada Node.js programmi mooduliteks, selgitada npm-i ja `package.json` faili rolli ning lisada, käivitada ja eemaldada projekti sõltuvuse.
:::

Node.js projekt koosneb harva ainult ühest failist. Suuremas projektis tuleb:

- jagada enda kood arusaadavateks osadeks;
- kasutada teiste arendajate loodud pakette;
- kirjeldada projekti käivitamiseks vajalikud käsud;
- tagada, et teine arendaja saaks projekti enda arvutis tööle.

Neid ülesandeid aitavad lahendada **moodulid**, **npm** ja `package.json`.

## Kuidas osad omavahel seotud on?

```text
Node.js
├── käivitab JavaScripti
├── oskab laadida mooduleid
└── paigaldatakse tavaliselt koos npm-iga

npm
├── loob ja loeb package.json faili
├── paigaldab ning eemaldab pakette
└── käivitab package.json faili skripte

package.json
├── kirjeldab projekti
├── loetleb projekti sõltuvused
└── annab korduvatele käskudele nimed
```

**Node.js** on JavaScripti käivituskeskkond. **npm** on käsureatööriist ja paketihaldur, mis aitab Node.js projektiga töötada. Need ei ole sama asi, kuigi npm paigaldatakse tavaliselt koos Node.js-iga.

Kontrolli mõlema olemasolu:

```bash
node --version
npm --version
```

## Moodul jagab programmi osadeks

**Moodul** on fail või pakett, mille väärtusi saab teistes failides kasutada. Moodul aitab anda igale programmi osale selge vastutuse.

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

Node.js projektis kohtad kolme tüüpi importe:

```js
import { calculateTotal } from "./price.js";      // projekti enda fail
import { readFile } from "node:fs/promises";      // Node.js sisseehitatud moodul
import chalk from "chalk";                         // npm-ist paigaldatud pakett
```

- `./price.js` algab `./` märgiga, sest fail asub projektis;
- `node:fs/promises` tuleb Node.js-iga kaasa;
- `chalk` tuleb enne npm-i abil projekti paigaldada.

::: warning Kohaliku faili laiend on oluline
Node.js ES-moodulis kirjuta kohaliku faili importimisel ka `.js` laiend: `./price.js`.
:::

## Mida teeb `"type": "module"`?

Node.js peab teadma, millist moodulisüsteemi `.js` failides kasutatakse.

```json
{
  "type": "module"
}
```

`"type": "module"` ütleb Node.js-ile, et selle projekti `.js` failid kasutavad ES-mooduleid ehk `import` ja `export` süntaksit.

Ilma selle seadistuseta käsitleb Node.js `.js` faile vaikimisi vanema CommonJS-moodulisüsteemina, kus kasutatakse `require()` ja `module.exports` süntaksit.

| Fail või seadistus | Moodulisüsteem |
| --- | --- |
| `.js` ja `"type": "module"` | ES-moodul |
| `.mjs` | alati ES-moodul |
| `.cjs` | alati CommonJS |

Selles moodulis kasutame ES-mooduleid. Ära sega samas näites `import` ja `require()` süntaksit.

## Mis on npm?

**npm** aitab JavaScripti projekti pakette ja korduvaid käske hallata. npm-i kasutatakse nii Node.js rakenduste, brauseris töötavate projektide kui ka arendustööriistade haldamiseks.

**Pakett** on jagatav koodikogum, millel on oma `package.json`. Pakett võib olla näiteks:

- rakenduses kasutatav teek, nagu Express;
- arendustööriist, nagu ESLint;
- käsureaprogramm, nagu Vite;
- sinu enda projekt.

Kui käivitad `npm install chalk`, toimub lihtsustatult järgmine:

```text
npm install chalk
→ npm otsib paketi npm-i registrist
→ laadib paketi ja selle sõltuvused alla
→ salvestab failid node_modules kausta
→ lisab chalk kirje package.json faili
→ uuendab package-lock.json faili
```

**npm-i register** (*registry*) on veebipõhine pakettide kogu. Paketi paigaldamisel käivitad võõrast koodi oma arvutis, seega kontrolli enne paketi nime, dokumentatsiooni ja usaldusväärsust.

## Projekti loomine

Loo uus kaust ja algväärtusta npm-i projekt:

```bash
mkdir grade-summary
cd grade-summary
npm init -y
```

`npm init -y` loob vaikimisi väärtustega `package.json` faili. Ilma `-y` liputa küsib npm projekti kohta küsimusi.

Algset faili võib muuta:

```json
{
  "name": "grade-summary",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "node app.js"
  }
}
```

- `"name"` on projekti või avaldatava paketi nimi;
- `"version"` on projekti versioon;
- `"private": true` aitab vältida projekti kogemata npm-i registrisse avaldamist;
- `"type": "module"` lubab `.js` failides kasutada `import` ja `export` süntaksit;
- `"scripts"` kirjeldab projekti korduvaid käske.

## Kust tekib `npm run` käsk?

`npm run` ei mõtle käske ise välja. Käivitatavad käsud tulevad selle projekti `package.json` faili `"scripts"` osast.

```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "node --watch app.js",
    "check": "node --check app.js"
  }
}
```

Käivita skriptid:

```bash
npm run start
npm run dev
npm run check
```

Käsu `npm run dev` teekond on:

```text
npm run dev
→ npm leiab aktiivsest kaustast package.json faili
→ npm otsib scripts.dev väärtuse
→ npm käivitab käsu node --watch app.js
→ Node.js käivitab app.js faili ja jälgib muudatusi
```

Kõigi projektis kirjeldatud skriptide nägemiseks käivita:

```bash
npm run
```

::: tip `start` ja `test` on erandid
Skripte saab alati käivitada kujul `npm run nimi`. Levinud `start` ja `test` skriptidel on lisaks lühivormid `npm start` ja `npm test`.
:::

Skriptid annavad kõigile projektiga töötajatele samad käsud. Õpilane ei pea meelde jätma pikka käsku ning CI-server saab käivitada täpselt sama kontrolli.

## Miks skript leiab paigaldatud tööriista?

Kui paigaldad projekti käsureatööriista, lisab npm selle käivitatava faili `node_modules/.bin` kausta. `npm run` lisab skripti käivitamise ajaks selle kausta otsinguteele.

Näiteks pärast ESLinti paigaldamist võib skript olla:

```json
{
  "scripts": {
    "lint": "eslint ."
  }
}
```

Sa ei pea kirjutama pikka teed `node_modules/.bin/eslint`. npm leiab projektis paigaldatud ESLinti käsu ise.

## Pakettide paigaldamine

### Lisa rakenduse sõltuvus

```bash
npm install chalk
```

See lisab paketi `"dependencies"` ossa:

```json
{
  "dependencies": {
    "chalk": "^5.0.0"
  }
}
```

`dependencies` sisaldab pakette, mida rakendus töötamiseks vajab.

Pärast paigaldamist saad paketti importida:

```js
import chalk from "chalk";

console.log(chalk.green("Rakendus käivitus"));
```

### Mida tähendab versiooni ees `^`?

`package.json` failis võib sõltuvuse versioon olla näiteks:

```json
{
  "dependencies": {
    "chalk": "^5.0.0"
  }
}
```

Lihtsustatult lubab `^5.0.0` npm-il kasutada sama põhiversiooni uuemaid sobivaid versioone, kuid mitte automaatselt versiooni `6.0.0`. Põhiversiooni muutus võib sisaldada rakendust lõhkuvaid muudatusi.

`package.json` kirjeldab seega lubatud versioonivahemikku. `package-lock.json` salvestab, milline täpne versioon ja millised alamsõltuvused projektis paigaldati.

### Lisa arendussõltuvus

```bash
npm install --save-dev eslint
```

Sama käsu lühivorm on:

```bash
npm install -D eslint
```

See lisab paketi `"devDependencies"` ossa. Arendussõltuvusi kasutatakse näiteks koodi kontrollimiseks, testimiseks või ehitamiseks, kuid rakenduse enda kood ei vaja neid tavaliselt töötamiseks.

### Taasta kõik projekti sõltuvused

Kui kloonid olemasoleva projekti, ei pea iga paketti eraldi paigaldama:

```bash
npm install
```

Ilma paketi nimeta `npm install` loeb projekti `package.json` ja `package-lock.json` faile ning taastab vajaliku `node_modules` kausta.

## Pakettide eemaldamine

Eemalda pakett käsuga:

```bash
npm uninstall chalk
```

Käsk:

- eemaldab paketi `node_modules` kaustast;
- eemaldab selle kirje `package.json` failist;
- uuendab `package-lock.json` faili.

Ära kustuta ainult paketi kausta käsitsi. Sellisel juhul jääb `package.json` endiselt väitma, et projekt vajab seda paketti.

## Kolm olulist kohta

Pärast paketi paigaldamist näeb projekt välja näiteks nii:

```text
grade-summary/
├── node_modules/       # arvutisse paigaldatud pakettide failid
├── package-lock.json   # paigaldatavate versioonide täpne lukustus
├── package.json        # projekti kirjeldus ja otsesed sõltuvused
├── app.js
├── grades.js
└── summary.js
```

| Koht | Milleks seda kasutatakse? | Git repository'sse? |
| --- | --- | --- |
| `package.json` | Kirjeldab projekti, skripte ja otseseid sõltuvusi | jah |
| `package-lock.json` | Lukustab sõltuvuste täpsemad versioonid | jah |
| `node_modules/` | Sisaldab arvutisse paigaldatud pakettide faile | ei |

`node_modules` jäetakse Gitist välja, sest see võib olla väga suur ning npm saab selle lukufaili abil uuesti luua.

Automaatkeskkonnas kasutatakse sageli käsku `npm ci`, mis paigaldab sõltuvused rangelt olemasoleva `package-lock.json` faili järgi. Igapäevases arendustöös kasutatakse enamasti käsku `npm install`.

Lisa `.gitignore` faili:

```text
node_modules/
```

::: warning Ära muuda `package-lock.json` faili käsitsi
npm loob ja uuendab lukufaili. Tavaliselt tuleb see Git repository'sse lisada, et eri arvutites paigaldataks võimalikult ühesugused sõltuvused.
:::

## Mida saab `package.json` kaudu veel teha?

Lisaks moodulisüsteemile, skriptidele ja sõltuvustele saab `package.json` kirjeldada näiteks:

```json
{
  "name": "grade-summary",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "node app.js",
    "dev": "node --watch app.js",
    "check": "node --check app.js"
  },
  "engines": {
    "node": ">=20"
  },
  "dependencies": {
    "chalk": "^5.0.0"
  }
}
```

- `"engines"` kirjeldab, millise Node.js versiooniga projekt peaks töötama;
- `"dependencies"` loetleb rakenduse tööks vajalikud paketid;
- `"devDependencies"` loetleb arendamise ajal kasutatavad paketid;
- `"scripts"` loob projekti ühised töövood.

Erinevad tööriistad võivad `package.json` failist lugeda ka enda seadistusi. Suurema seadistuse jaoks kasutatakse sageli eraldi konfiguratsioonifaili.

## Vastutus määrab failide jaotuse

Hea jaotus ei tähenda võimalikult paljusid faile. Fail tasub eraldada siis, kui sellel on arusaadav vastutus.

```text
grade-summary/
├── package.json
├── app.js          # programmi käivitamine ja tulemuse kuvamine
├── grades.js       # hinnete andmed
└── summary.js      # hinnete arvutused
```

Arvutusfunktsioon ei peaks ise tulemust terminali kuvama. Nii saab sama funktsiooni kasutada hiljem serveris, testis või mõnes teises kasutajaliideses.

## Praktiline ülesanne: hinnete kokkuvõte

Loo npm-i projekt ja jaga programm kolmeks mooduliks:

- `grades.js` ekspordib hinnete massiivi;
- `summary.js` ekspordib keskmise arvutamise funktsiooni;
- `app.js` impordib mõlemad ja kuvab tulemuse.

Lisa projekti:

1. `"type": "module"`;
2. `start`, `dev` ja `check` skriptid;
3. pakett `chalk` käsuga `npm install chalk`;
4. värviline õnnestumisteade `chalk` abil;
5. `.gitignore`, mis välistab `node_modules/` kausta.

Kontrolli töövoogu:

```bash
npm run
npm run check
npm run start
npm uninstall chalk
npm install chalk
npm run start
```

Kontrollitav tulemus:

- `npm run start` kuvab hinnete keskmise;
- arvutusfunktsioon ei sõltu `console.log()`-ist;
- pärast `npm uninstall chalk` muutuvad nii `package.json` kui ka `package-lock.json`;
- pärast paketi uuesti paigaldamist töötab programm jälle.

Piirjuhud:

- hinnete massiiv on tühi;
- mooduli tee algusest puudub `./`;
- kohaliku faili impordist puudub `.js` laiend;
- eksporditud ja imporditud nimi ei ühti;
- pakett eemaldati, kuid selle `import` jäi koodi alles.

## Kontrollpunkt

- Mis vahe on Node.js-il ja npm-il?
- Millised kolm tüüpi mooduleid saab Node.js programmis importida?
- Mida muudab `"type": "module"`?
- Kust leiab npm käsu `npm run dev` tegeliku sisu?
- Mis vahe on käskudel `npm install`, `npm install chalk` ja `npm uninstall chalk`?
- Miks lisatakse `package-lock.json`, kuid mitte `node_modules`, Git repository'sse?
- Millal kuulub pakett `dependencies` ja millal `devDependencies` ossa?

Järgmisena: [Failisüsteem ja protsess](/nodejs/failisusteem-ja-protsess).

## Allikad

- [Node.js: ECMAScript modules](https://nodejs.org/api/esm.html)
- [npm Docs: About npm](https://docs.npmjs.com/about-npm)
- [npm Docs: package.json](https://docs.npmjs.com/cli/configuring-npm/package-json)
- [npm Docs: npm install](https://docs.npmjs.com/cli/commands/npm-install)
- [npm Docs: npm uninstall](https://docs.npmjs.com/cli/commands/npm-uninstall)
- [npm Docs: npm run-script](https://docs.npmjs.com/cli/commands/npm-run-script)
