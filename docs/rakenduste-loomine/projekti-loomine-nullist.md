# Projekti loomine nullist

## Õpieesmärgid

Selle peatüki lõpuks peaks õppija:

- oskama luua npm projekti ja lisada Vite
- oskama seadistada `package.json` ja `.gitignore`
- oskama käivitada arendusserveri ja avada rakenduse brauseris
- mõistma, mida `"type": "module"` tähendab

---

## Eeldused

Projektikaust on loodud, Git on initsialiseeritud ja README on commit'itud. Kui mitte, vaata [Eelteadmiste kordamine](/rakenduste-loomine/eelteadmiste-kordamine).

HTML, CSS ja JavaScripti oskad juba — siin keskendume **Vite lisamisele**, mitte veebilehe ülesehitamisele.

---

# 1. Loo npm projekt

Projekti juurkaustas:

```bash
npm init -y
```

See loob `package.json` faili vaikimisi seadistustega.

---

# 2. Paigalda Vite

```bash
npm install -D vite
```

`-D` lipp lisab Vite **devDependencies** sektsiooni — see on arendustööriist, mitte lõppkasutaja sõltuvus.

---

# 3. Seadista package.json

Ava `package.json` ja lisa/muuda:

```json
{
  "name": "minu-veebi-template",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite"
  },
  "devDependencies": {
    "vite": "^6.0.0"
  }
}
```

| Väli | Tähendus |
|------|----------|
| `"type": "module"` | Projekt kasutab ES6 mooduleid (`import`/`export`) |
| `"scripts.dev"` | Käivitab Vite arendusserveri |
| `"devDependencies"` | Arendustööriistad |

---

# 4. Loo .gitignore

Enne järgmisi faile loo `.gitignore`:

```text
node_modules/
dist/
.env
```

::: tip .gitignore varakult
Lisa `.gitignore` kohe Vite paigaldamise järel, enne kui `.env` või suured kaustad tekivad.
:::

---

# 5. Lisa minimaalne index.html

Vite vajab juurkaustas faili `index.html`. Loo lihtne versioon:

```html
<!DOCTYPE html>
<html lang="et">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Minu veebi template</title>
  </head>
  <body>
    <h1>Tere, Vite!</h1>
  </body>
</html>
```

Oma HTML/CSS/JS faile saad projekti hiljem juurde lisada — järgmistes peatükkides kasutame neid vastavalt vajadusele.

---

# 6. Käivita arendusserver

```bash
npm run dev
```

Terminalis peaks ilmuma:

```text
  VITE v6.x.x  ready in 300 ms

  ➜  Local:   http://localhost:5173/
```

Ava brauseris `http://localhost:5173/`.

::: tip Serveri peatamine
Arendusserveri peatamiseks vajuta terminalis `Ctrl + C`.
:::

---

# 7. Kontrolli hot reload

1. Muuda `index.html` pealkirja või `<h1>` teksti.
2. Salvesta fail.
3. Vaata brauserit — muudatus ilmub **ilma lehte uuesti laadimata**.

---

# 8. Commit pärast Vite seadistust

```bash
git add .
git status
git commit -m "Lisa Vite ja minimaalne index.html"
```

Enne commit'i veendu, et `git status` **ei näita** `node_modules/` kausta.

---

## Projekti struktuur

```text
minu-veebi-template/
├── index.html
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
└── node_modules/       # gitignore'is
```

---

## Kontrollpunkt

Enne edasi liikumist veendu, et:

- [ ] `npm run dev` käivitab serveri
- [ ] brauseris avaneb sinu leht
- [ ] `index.html` muutmine uuendab brauserit automaatselt
- [ ] `.gitignore` ignoreerib `node_modules/`
- [ ] oskad serveri peatada (`Ctrl + C`)

Kui kõik töötab, liigu edasi: [Keskkonnamuutujad Vite'iga](/rakenduste-loomine/keskkonnamuutujad-vitega).
