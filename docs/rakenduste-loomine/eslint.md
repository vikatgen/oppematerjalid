# ESLint

## Õpieesmärgid

Selle peatüki lõpuks peaks õppija:

- oskama selgitada, mida linter teeb
- oskama luua `eslint.config.js` faili
- oskama käivitada `npm run lint` ja lugeda hoiatusi
- mõistma erinevust ESLinti ja Prettieri vahel
- oskama parandada levinud ESLint hoiatusi

---

## Mis on linter?

**Linter** (nt ESLint) analüüsib koodi **ilma seda käivitamata** ja otsib:

- süntaksivigu
- defineerimata muutujaid
- kasutamata muutujaid
- ohtlikke mustreid

```js
// ESLint hoiatab: 'result' is assigned but never used
const result = fetchData();
console.log('done');
```

Linter aitab vigu leida **enne** brauseri testimist.

Dokumentatsioon: [ESLint](https://eslint.org/docs/latest/)

---

# 1. Paigalda ESLint

```bash
npm install -D eslint @eslint/js globals
```

Me **ei kasuta** interaktiivset `npx eslint --init`, sest see küsib erinevaid küsimusi eri arvutites. Loome seadistuse ise.

---

# 2. Loo eslint.config.js

Projekti juurkaustas loo fail `eslint.config.js`:

```js
import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.browser,
    },
    ...js.configs.recommended,
  },
];
```

See on **flat config** formaat (ESLint 9+). Konfiguratsioon ütleb:

- millised failid kontrollitakse
- et kood jookseb brauseris (`globals.browser`)
- kasutatakse soovitatud reegleid (`js.configs.recommended`)

Prettieriga seotud konfliktide lahendamise lisame järgmises peatükis.

---

# 3. Lisa npm skriptid

Lisa `package.json` faili:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

---

# 4. Käivita lint

```bash
npm run lint
```

Kui on probleeme, näed väljundit:

```text
app.js
  12:7  error  'unusedVar' is assigned a value but never used  no-unused-vars
```

Automaatne parandamine (kui võimalik):

```bash
npm run lint:fix
```

---

# 5. VS Code integratsioon (soovitatav)

Loo projekti kaust `.vscode/settings.json`:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": ["javascript"]
}
```

Paigalda VS Code extension **ESLint**. Siis parandab linter osa vigu automaatselt salvestamisel.

::: tip ESLint vs Prettier
- **ESLint** — leiab loogilisi vigu (defineerimata muutuja, ohtlik muster)
- **Prettier** — vormindab koodi (taanded, jutumärgid)

Need täiendavad teineteist. Prettier seadistame järgmises peatükis.
:::

---

# 6. Commit

```bash
git add eslint.config.js package.json package-lock.json .vscode/
git commit -m "Lisa ESLint"
```

---

## Kontrollpunkt

1. `eslint.config.js` on loodud
2. `npm run lint` töötab ilma seadistusveata
3. oskad lugeda ESLint väljundit (fail, rida, viga)
4. `npm run lint:fix` parandab vähemalt osa hoiatusi
5. oskad selgitada, miks linterit kasutatakse

Kui lint töötab, liigu edasi: [Prettier ja koodistiil](/rakenduste-loomine/prettier-ja-koodistiil).
