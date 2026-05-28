# Rakenduste loomine — ülesanded

Harjuta mooduli töövoogu oma veebi template projektis. Iga ülesanne viitab konkreetsele peatükile.

---

## Ülesanne 1: Projekti alustamine

1. Loo kaust `minu-veebi-template` (või oma valitud nimi).
2. Käivita `git init`.
3. Loo `README.md` esimese commit'iga.
4. Kontrolli `node -v`, `npm -v`, `git status`.

Kirjuta README-sse:

- projekti eesmärk (veebiarenduse template)
- millist Node.js versiooni kasutad

Viide: [Eelteadmiste kordamine](/rakenduste-loomine/eelteadmiste-kordamine)

---

## Ülesanne 2: Vite projekt nullist

1. Käivita `npm init -y`.
2. Paigalda Vite: `npm install -D vite`.
3. Seadista `package.json`, loo `.gitignore` ja minimaalne `index.html`.
4. Käivita `npm run dev` ja ava brauser.
5. Muuda `index.html` teksti — veendu, et hot reload töötab.
6. Tee commit: `Lisa Vite ja minimaalne index.html`.

Kirjuta üles:

- mis URL-il rakendus jookseb
- mis faili muutsid ja mis juhtus brauseris

Viide: [Projekti loomine nullist](/rakenduste-loomine/projekti-loomine-nullist)

---

## Ülesanne 3: Keskkonnamuutujad

1. Loo `.env` fail `VITE_APP_NAME` ja `VITE_API_URL` väärtustega.
2. Loo `.env.example` ilma päris väärtusteta.
3. Veendu, et `.gitignore` ignoreerib `.env`.
4. Kasuta `app.js` failis `import.meta.env`.
5. Kontrolli `git status` — `.env` ei tohi olla commit'i ootel.

Vasta:

- miks Vite nõuab `VITE_` prefiksit?
- mis juhtub, kui `.env` satub GitHubi?

Viide: [Keskkonnamuutujad Vite'iga](/rakenduste-loomine/keskkonnamuutujad-vitega)

---

## Ülesanne 4: Build ja preview

1. Lisa `package.json` skriptid `build` ja `preview`.
2. Käivita `npm run build`.
3. Vaata `dist/` kausta sisu (`ls -la dist/`).
4. Käivita `npm run preview`.
5. Tee commit.

Vasta:

- mis failid `dist/` kaustas tekkisid?
- miks `dist/` ei kuulu GitHubi?
- mis vahe on `npm run dev` ja `npm run preview` vahel?

Viide: [Build ja preview](/rakenduste-loomine/build-ja-preview)

---

## Ülesanne 5: Tailwind

1. Paigalda Tailwind ja seadista `vite.config.js`, `style.css`.
2. Lisa HTML-i vähemalt 3 erinevat Tailwind utility-klassi.
3. Kontrolli stiile dev režiimis.
4. Ehita produktsioon ja kontrolli preview režiimis.
5. Tee commit.

Viide: [Tailwind Vite'iga](/rakenduste-loomine/tailwind-vitega)

---

## Ülesanne 6: ESLint

1. Paigalda ESLint ja loo `eslint.config.js`.
2. Lisa `lint` ja `lint:fix` skriptid.
3. Käivita `npm run lint` ja paranda vähemalt üks hoiatus.
4. Lisa `.vscode/settings.json` ESLint seadistus.
5. Tee commit.

Vasta:

- mis viga ESLint leidis?
- kuidas sa seda parandasid?

Viide: [ESLint](/rakenduste-loomine/eslint)

---

## Ülesanne 7: Prettier

1. Paigalda Prettier ja `eslint-config-prettier`.
2. Loo `.prettierrc` ja `.prettierignore`.
3. Uuenda `eslint.config.js` Prettieri konfliktide lahendamiseks.
4. Käivita `npm run format` ja `npm run format:check`.
5. Seadista VS Code format-on-save.
6. Tee commit.

Vasta:

- mis vahe on ESLintil ja Prettieril?
- miks kasutame `eslint-config-prettier`?

Viide: [Prettier ja koodistiil](/rakenduste-loomine/prettier-ja-koodistiil)

---

## Ülesanne 8: Template repository

1. Push'i projekt GitHubi.
2. Täienda README paigaldus- ja skriptide juhendiga.
3. Määra repo **Template repository'ks** GitHubi seadetes.
4. Testi: loo template'ist uus repo (või kirjelda sammud).

README peab sisaldama:

```bash
npm install
cp .env.example .env
npm run dev
```

Viide: [Template repository GitHubis](/rakenduste-loomine/template-repository-githubis)

---

## Ülesanne 9: Täielik töövoog

Enne lõplikku push'i:

```bash
npm run lint
npm run format:check
npm run build
git status
```

Veendu, et `git status` ei näita `node_modules/`, `dist/` ega `.env`.

---

## Boonus: Kontrollküsimused

Vasta oma sõnadega:

1. Mis on bundler ja miks seda vajame?
2. Mis vahe on `dependencies` ja `devDependencies` vahel?
3. Miks saladused lähevad `.env` faili, mitte `app.js` faili?
4. Mis juhtub käsuga `npm run build`?
5. Miks `package-lock.json` commit'itakse, aga `node_modules/` mitte?
6. Mis vahe on GitHub template repository'l ja fork'il?
