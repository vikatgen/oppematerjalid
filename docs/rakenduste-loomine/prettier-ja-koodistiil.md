# Prettier ja koodistiil

## Õpieesmärgid

Selle peatüki lõpuks peaks õppija:

- oskama selgitada Prettieri rolli projektis
- oskama käivitada `npm run format` ja `npm run format:check`
- mõistma, kuidas `eslint-config-prettier` konflikte vältib
- oskama seadistada automaatse vormindamise VS Code'is

---

## Miks Prettier?

Kui kaks arendajat kirjutavad sama projekti, tekivad kiiresti erinevused:

- üks kasutab ühekordseid jutumärke, teine kahekordseid
- erinev taane (2 vs 4 tühikut)
- erinev rea pikkus

**Prettier** vormindab koodi automaatselt ühtse stiili järgi. Sa ei pea vaidlema stiili üle — Prettier otsustab.

::: tip Prettier ei asenda ESLinti
- ESLint kontrollib **kvaliteeti** (kas kood on õige?)
- Prettier kontrollib **väljanägemist** (kas kood on ühtlaselt vormindatud?)
:::

---

# 1. Paigalda Prettier

```bash
npm install -D prettier eslint-config-prettier
```

`eslint-config-prettier` lülitab ESLintis välja reeglid, mis Prettieriga kattuvad.

---

# 2. Loo .prettierrc

Projekti juurkaustas `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}
```

| Seade | Tähendus |
|-------|----------|
| `"semi": true` | Semikoolon iga lause lõpus |
| `"singleQuote": true` | Ühekordsed jutumärgid |
| `"tabWidth": 2` | 2 tühiku taane |
| `"trailingComma": "es5"` | Koma viimase elemendi järel |
| `"printWidth": 80` | Max 80 tähemärki real |

---

# 3. Loo .prettierignore

```text
node_modules
dist
*.min.js
```

Genereeritud kaustu (`node_modules`, `dist`) ei vormindata.

---

# 4. Lisa npm skriptid

`package.json` failis:

```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

| Käsk | Mida teeb |
|------|-----------|
| `npm run format` | Vormindab kõik failid |
| `npm run format:check` | Kontrollib vormindust, ei muuda faile |

Hea harjumus enne commit'i:

```bash
npm run format
git status
git add .
git commit -m "Vorminda kood Prettieriga"
```

---

# 5. ESLint + Prettier koos

`eslint.config.js` failis peab `eslint-config-prettier` olema **viimane** element:

```js
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    // ... ESLint reeglid
  },
  prettierConfig, // peab olema viimane!
];
```

Ilma selleta võivad ESLint ja Prettier samade reeglite üle vaidlesta.

---

# 6. VS Code seadistus

Uuenda `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": ["javascript"]
}
```

Paigalda extension **Prettier - Code Formatter**.

Salvestamisel:

1. Prettier vormindab koodi
2. ESLint parandab loogilised vead (kui võimalik)

Commit:

```bash
git add .
git commit -m "Lisa Prettier ja koodi vormindus"
```

---

## Täielik npm scripts näide

Kui kõik tööriistad on paigas, võib `package.json` `scripts` osa välja näha nii:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

---

## Kontrollpunkt

1. `npm run format` vormindab projekti failid
2. `npm run format:check` annab rohelise tulemuse pärast vormindamist
3. VS Code vormindab salvestamisel (kui extension on paigaldatud)
4. oskad selgitada erinevust ESLinti ja Prettieri vahel

Kui kõik töötab, liigu edasi: [Template repository GitHubis](/rakenduste-loomine/template-repository-githubis).
