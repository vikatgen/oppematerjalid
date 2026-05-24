# Git ja GitHub

## Õpieesmärgid

Selle peatüki lõpuks peaks õppija:

- mõistma, miks versioonihaldust kasutatakse
- oskama selgitada Giti ja GitHubi erinevust
- mõistma töökausta, staging area ja commit'i rolli
- oskama teha lihtsat commit'i
- mõistma, mida tähendab remote repository

---

# 1. Miks on versioonihaldust vaja?

Koodi kirjutamisel muutub projekt pidevalt. Lisad faili, parandad vea, kustutad midagi, proovid uut lahendust ja avastad, et vana variant oli parem.

Ilma versioonihalduseta tekivad kiiresti failid nagu:

```text
projekt-final.zip
projekt-final-uus.zip
projekt-final-parandatud.zip
projekt-tegelikult-final.zip
```

Git lahendab selle probleemi. Git salvestab projekti ajalugu commit'ide kaupa. Iga commit on nagu kontrollpunkt, kuhu saab hiljem tagasi vaadata.

Versioonihaldus aitab:

- jälgida, mis muutus
- aru saada, miks muutus tehti
- taastada vana versiooni
- teha koostööd teiste arendajatega
- jagada projekti GitHubis

---

# 2. Git ja GitHub ei ole sama asi

**Git** on tööriist, mis töötab sinu arvutis ja haldab projekti ajalugu.

**GitHub** on veebikeskkond, kuhu saab Git repository üles laadida ja teistega jagada.

Lihtne võrdlus:

```text
Git = versioonihaldus sinu arvutis
GitHub = koht internetis, kus Git projekt asub
```

Git töötab ka ilma GitHubita. GitHub ilma Gitita ei oleks aga eriti kasulik, sest GitHubi põhiidee on Git repository'de hoidmine ja jagamine.

---

# 3. Repository

Repository ehk repo on Gitiga jälgitav projekt.

Kui projektis on kaust `.git`, siis on tegemist Git repository'ga. `.git` kaustas hoiab Git projekti ajalugu ja sisemist infot.

Kontrollimiseks:

```bash
git status
```

Kui projekt on Git repository, näed infot muutuste kohta. Kui ei ole, võid näha veateadet, et tegemist ei ole Git repository'ga.

Uue Git repository loomine:

```bash
git init
```

::: warning Oluline
Ära käivita `git init` suvalises kaustas. Tee seda ainult projekti juurkaustas.
:::

---

# 4. Git töövoog

Giti algne töövoog koosneb kolmest sammust:

1. muudad faile
2. valid, millised muudatused lähevad järgmisesse commit'i
3. salvestad commit'i

Seda saab mõelda kolme kihina:

```text
töökaust -> staging area -> commit
```

**Töökaust** on koht, kus failid päriselt muutuvad.

**Staging area** on vaheala, kuhu valid järgmise commit'i sisu.

**Commit** on salvestatud kontrollpunkt koos sõnumiga.

---

# 5. Esimene commit

Muudatuste vaatamine:

```bash
git status
```

Faili lisamine staging area'sse:

```bash
git add README.md
```

Kõigi muudatuste lisamine:

```bash
git add .
```

Commit'i tegemine:

```bash
git commit -m "Lisa projekti kirjeldus"
```

Commit'i sõnum peaks lühidalt ütlema, mida ja miks muudeti.

Halb sõnum:

```text
muudatused
```

Parem sõnum:

```text
Lisa projekti käivitamise juhend
```

---

# 6. Ajaloo vaatamine

Commit'ide vaatamine:

```bash
git log
```

Lühem vaade:

```bash
git log --oneline
```

See aitab näha, millised kontrollpunktid projektis on tehtud.

---

# 7. GitHub, remote ja clone

Kui Git repository on ainult sinu arvutis, nimetatakse seda kohalikuks repository'ks.

Kui sama projekt on GitHubis, nimetatakse seda remote repository'ks.

Remote repository lisamine:

```bash
git remote add origin https://github.com/user/project.git
```

Muudatuste üles laadimine:

```bash
git push
```

Muudatuste alla tõmbamine:

```bash
git pull
```

Olemasoleva GitHubi projekti kopeerimine arvutisse:

```bash
git clone https://github.com/user/project.git
```

---

# 8. Mida Gitiga mitte jälgida?

Kõiki faile ei peaks Git jälgima. Näiteks `node_modules/` on suur kaust, mille saab alati uuesti luua käsuga `npm install`.

Selleks kasutatakse `.gitignore` faili.

Näide:

```text
node_modules/
dist/
.env
```

::: warning Saladused ei kuulu GitHubi
Ära lisa GitHubi paroole, API võtmeid ega `.env` faili. Kui saladus on juba GitHubi jõudnud, ei piisa ainult faili kustutamisest, sest see võib jääda ajalukku.
:::

---

# 9. Hea esimese aasta Git harjumus

Hea minimaalne töövoog:

```bash
git status
git add .
git commit -m "Kirjelda muudatust"
git status
```

Enne commit'i tee alati `git status`. See aitab vältida kogemata vale faili commit'imist.
