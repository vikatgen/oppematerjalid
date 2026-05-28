# Build ja preview

## Õpieesmärgid

Selle peatüki lõpuks peaks õppija:

- mõistma erinevust `npm run dev`, `npm run build` ja `npm run preview` vahel
- oskama luua produktsiooni build'i ja kontrollida `dist/` kausta
- teadma, miks `dist/` ja `node_modules/` ei kuulu GitHubi
- mõistma `package-lock.json` rolli

---

## Arendus vs avaldamine

Arenduse ajal kasutad `npm run dev` — Vite serveerib faile kiiresti ja toetab hot reload'i.

Kui soovid rakendust **internetis avaldada** (GitHub Pages, Netlify jne), pead ehitama **produktsiooni versiooni** — optimeeritud failid, mida kasutaja tegelikult laadib.

```text
npm run dev     → arendus (sinu arvutis)
npm run build   → produktsioon (avalik veebileht)
npm run preview → produktsiooni eelvaade (sinu arvutis)
```

---

# 1. Lisa build skriptid

Veendu, et `package.json` failis on:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Kui need puuduvad, lisa need.

---

# 2. Ehita produktsioon

```bash
npm run build
```

Vite loob kausta `dist/`:

```text
dist/
├── index.html
└── assets/
    ├── index-a1b2c3.js
    └── index-d4e5f6.css
```

Mida build teeb:

- ühendab JS ja CSS failid
- minifitseerib koodi (eemaldab tühikud, lühendab nimesid)
- optimeerib pildid ja fondid
- genereerib unikaalsed failinimed (cache busting)

---

# 3. Eelvaade produktsioonist

```bash
npm run preview
```

See käivitab lokaalse serveri, mis serveerib **`dist/`** kausta sisu — nii nagu kasutaja seda internetis näeks.

Ava brauseris terminalis näidatud aadress (tavaliselt `http://localhost:4173/`).

::: tip dev vs preview
- `npm run dev` — arendus, kiire tagasiside, mitte-optimeeritud
- `npm run preview` — produktsiooni koopia, optimeeritud failid
:::

---

# 4. Mida GitHubi ei lisa

`.gitignore` failis peaks olema:

```text
node_modules/
dist/
.env
```

| Kaust/fail | Miks mitte GitHubi? |
|------------|---------------------|
| `node_modules/` | Taastatakse `npm install` abil |
| `dist/` | Taastatakse `npm run build` abil |
| `.env` | Sisaldab saladusi |

Kui keegi kloonib sinu repo:

```bash
git clone ...
npm install
npm run build
```

Lisainfo: [Git ja GitHub — mida mitte jälgida](/arendusvahendid-i/git-ja-github)

---

# 5. package-lock.json

`package-lock.json` fikseerib **täpsed** sõltuvuste versioonid. See tagab, et kõik arendajad saavad sama `node_modules` sisu.

::: tip Hea harjumus
Commit'i alati koos `package.json` ja `package-lock.json` failiga. Ära kustuta `package-lock.json` lihtsalt sellepärast, et see on automaatselt loodud.
:::

Lisainfo: [npm ja package.json](/arendusvahendid-i/npm-ja-package-json)

---

## Kontrollpunkt

1. `npm run build` lõpetab ilma vigadeta
2. `dist/` kaust on loodud ja sisaldab `index.html` ja `assets/`
3. `npm run preview` näitab rakendust brauseris
4. `git status` ei näita `dist/` ega `node_modules/` kaustu

Commit pärast build skriptide lisamist:

```bash
git add package.json
git commit -m "Lisa build ja preview skriptid"
```

Kui build ja preview töötavad, liigu edasi: [Tailwind Vite'iga](/rakenduste-loomine/tailwind-vitega).
