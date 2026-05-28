# Template repository GitHubis

## Õpieesmärgid

Selle peatüki lõpuks peaks õppija:

- oskama push'ida projekti GitHubi
- oskama kirjutada README, mis selgitab template'i kasutamist
- oskama märgistada repository template'iks GitHubis
- mõistma, kuidas uus projekt template'ist algab

---

## Miks template repository?

Selle mooduli jooksul ehitasid projekti samm-sammult: Vite, env, build, Tailwind, ESLint, Prettier.

Järgmine kord ei pea sa seda uuesti tegema. GitHubi **template repository** võimaldab:

- luua uue repo samast struktuurist
- alustada kohe `npm install` ja `npm run dev` käskudega
- jagada töövoogu teiste arendajatega

Template **ei ole fork** — see loob uue, iseseisva repository.

---

# 1. Viimane kontroll enne push'i

Projekti juurkaustas:

```bash
npm run lint
npm run format:check
npm run build
```

Kui kõik läbib, on projekt valmis avaldamiseks.

---

# 2. Loo GitHubi repository

1. Mine GitHubi → **New repository**
2. Anna nimeks nt `minu-veebi-template`
3. **Ära** lisa README, `.gitignore` ega litsentsi (need on juba lokaalselt)
4. Loo tühi repo

---

# 3. Ühenda remote ja push'i

GitHubi annab sulle URL-i. Projektikaustas:

```bash
git remote add origin https://github.com/SINU-KASUTAJA/minu-veebi-template.git
git branch -M main
git push -u origin main
```

Kui push õnnestub, on kood GitHubis.

---

# 4. Täienda README

Lisa README-sse näiteks:

**Paigaldamine**

```bash
npm install
cp .env.example .env
npm run dev
```

**Skriptid:** `dev`, `build`, `preview`, `lint`, `format`

**Tööriistad:** Vite, Tailwind CSS, ESLint, Prettier

Commit ja push:

```bash
git add README.md
git commit -m "Täienda README template kasutamise juhendiga"
git push
```

---

# 5. Määra template repository'ks

GitHubis:

1. Ava oma repo
2. Mine **Settings**
3. Leia sektsioon **Template repository**
4. Märgi linnuke **Template repository**

Nüüd on repo valmis uute projektide alustamiseks.

---

# 6. Uue projekti alustamine template'ist

Kui keegi (või sina ise) tahab uut projekti:

1. Ava template repo GitHubis
2. Vajuta **Use this template** → **Create a new repository**
3. Anna uuele projektile nimi
4. Klooni uus repo:

```bash
git clone https://github.com/SINU-KASUTAJA/uus-projekt.git
cd uus-projekt
npm install
cp .env.example .env
npm run dev
```

Uus projekt algab kohe professionaalse seadistusega.

---

## Kontrollpunkt

1. Projekt on GitHubis push'itud
2. README sisaldab paigaldus- ja skriptide juhendit
3. Repo on märgitud **Template repository**
4. oskad selgitada, mis vahe on template'il ja fork'il
5. oskad template'ist uue projekti alustada

Kui template on valmis, harjuta: [Ülesanded](/rakenduste-loomine/assignments).
