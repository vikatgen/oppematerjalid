# Keskkonnamuutujad Vite'iga

## Õpieesmärgid

Selle peatüki lõpuks peaks õppija:

- oskama luua `.env` faili ja `.env.example` faili
- mõistma, miks konfiguratsioon ja saladused ei tohi koodi sisse jääda
- oskama kasutada `import.meta.env` muutujaid Vite projektis
- teadma, et ainult `VITE_` prefiksiga muutujad on brauseris nähtavad

---

## Miks .env fail?

Projektides on tihti väärtusi, mis erinevad keskkonna kaupa:

- API võtmed
- serveri aadressid
- rakenduse nimi

Neid **ei tohi** kirjutada otse `app.js` faili:

```js
// HALB — väärtus on koodis nähtav ja satub GitHubi
const apiUrl = 'https://api.example.com';
const apiKey = 'abc123secret';
```

Parem on hoida need `.env` failis, mis jääb ainult sinu arvutisse.

Lisainfo: [Keskkonnamuutujad](/arendusvahendid-i/keskkonnamuutujad)

---

# 1. Loo .env fail

Projekti juurkaustas loo fail `.env`:

```text
VITE_APP_NAME=Minu veebi template
VITE_API_URL=http://localhost:3000
```

Hiljem, kui projekt vajab API võtit:

```text
VITE_API_KEY=sinu_voti_siia
```

::: warning VITE_ prefiks on kohustuslik
Vite expose'ib brauserile **ainult** muutujad, mis algavad `VITE_` prefiksiga. Muutuja `API_KEY` (ilma prefiksita) ei ole JavaScriptis kättesaadav.
:::

---

# 2. Lisa .gitignore

Veendu, et `.gitignore` failis on:

```text
.env
node_modules/
dist/
```

Enne commit'i kontrolli alati:

```bash
git status
```

Kui `.env` on punases nimekirjas, ära commit'i.

---

# 3. Loo .env.example

Et teised arendajad (või sina tulevikus) teaksid, milliseid muutujaid vaja on, loo `.env.example`:

```text
VITE_APP_NAME=
VITE_API_URL=
VITE_API_KEY=
```

See fail **võib** minna GitHubi — seal pole päris väärtusi.

Uue projekti alustamisel template'ist:

```bash
cp .env.example .env
# täida vajalikud väärtused
```

---

# 4. Kasuta muutujaid koodis

Lisa projekti `app.js` (või muuda olemasolevat JS faili) ja loo `index.html`-is `<script type="module" src="/app.js"></script>`.

Vite projektis loed keskkonnamuutujaid nii:

```js
const appName = import.meta.env.VITE_APP_NAME;
const apiUrl = import.meta.env.VITE_API_URL;

document.querySelector('#title').textContent = appName;
console.log('API URL:', apiUrl);
```

`import.meta.env` on Vite spetsiifiline viis keskkonnamuutujate lugemiseks brauseri JavaScriptis.

::: tip Taaskäivita dev server
Kui muudad `.env` faili, pead arendusserveri uuesti käivitama:

```bash
# Ctrl + C, siis:
npm run dev
```
:::

---

# 5. import.meta.env vs process.env

| Keskkond | Kuidas lugeda |
|----------|---------------|
| Vite (brauser) | `import.meta.env.VITE_APP_NAME` |
| Node.js (server) | `process.env.APP_NAME` |

Meie projekt on frontend — kasutame `import.meta.env`.

---

# 6. Commit

```bash
git add .env.example app.js .gitignore
git status
git commit -m "Lisa keskkonnamuutujad ja .env.example"
```

Veendu, et `.env` **ei ole** commit'is.

---

## Kontrollpunkt

1. `.env` fail on olemas ja sisaldab `VITE_` muutujaid
2. `.env.example` on olemas ilma saladusteta
3. `git status` **ei näita** `.env` faili
4. `app.js` kasutab `import.meta.env` ja brauseris näed õiget väärtust

Kui env vars töötavad, liigu edasi: [Build ja preview](/rakenduste-loomine/build-ja-preview).
