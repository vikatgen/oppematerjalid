# Eelteadmiste kordamine

## Õpieesmärgid

Selle peatüki lõpuks peaks õppija:

- teadma, millised Arendusvahendid I teemad on vajalikud enne Vite projekti alustamist
- oskama kiiresti kontrollida terminali, Node.js-i ja Giti seadistust
- oskama luua uue projektikausta ja Git repository

---

## Miks kordame?

Selle mooduli töö toimub peamiselt **terminalis** ja **Git repository's**. Kui need alused on ebaselged, tekivad vead juba esimestes sammudes — vale kaust, puuduv Node.js, `.env` fail GitHubis.

Me ei korda siin kõike uuesti. Vaata vajadusel läbi allolevad lingid ja tee kontrollnimekirja harjutused.

---

# 1. Terminal ja shell

Peaksid oskama:

- kontrollida, millises kaustas oled (`pwd`)
- liikuda kaustade vahel (`cd`)
- vaadata kausta sisu (`ls -la`)
- katkestada käivituv protsess (`Ctrl + C`)

Täpsemalt: [Terminal ja shell](/arendusvahendid-i/terminal-ja-shell)

**Kiirkontroll:**

```bash
pwd
ls -la
echo $SHELL
```

---

# 2. Git ja GitHub

Peaksid oskama:

- kontrollida repository olekut (`git status`)
- teha commit'i (`git add`, `git commit`)
- teada, mida `.gitignore` fail teeb

Täpsemalt: [Git ja GitHub](/arendusvahendid-i/git-ja-github)

**Kiirkontroll:**

```bash
git status
git log --oneline
```

---

# 3. Node.js, npm ja package.json

Peaksid oskama:

- kontrollida Node.js versiooni (`node -v`)
- luua npm projekti (`npm init -y`)
- paigaldada pakette (`npm install`)
- käivitada npm skripte (`npm run dev`)

Täpsemalt:

- [Node.js, npm ja nvm](/arendusvahendid-i/nodejs-ja-nvm)
- [npm ja package.json](/arendusvahendid-i/npm-ja-package-json)

::: tip Node.js versioon
Kasuta õpetaja määratud **LTS** versiooni. Kui `nvm` on paigaldatud, saad versiooni valida käsuga `nvm use`.
:::

**Kiirkontroll:**

```bash
node -v
npm -v
which node
```

---

# 4. Keskkonnamuutujad ja .env

Peaksid teadma:

- `.env` fail sisaldab projekti saladusi (API võtmed, paroolid)
- `.env` faili **ei lisata** GitHubi
- `.env.example` näitab, millised muutujad on vajalikud

Täpsemalt: [Keskkonnamuutujad](/arendusvahendid-i/keskkonnamuutujad)

---

# 5. Projekti alustamine

Enne järgmise peatüki juurde liikumist loo **oma veebi template** projekt.

### 1. Loo kaust

```bash
mkdir minu-veebi-template
cd minu-veebi-template
```

Kausta nimi võib olla sinu valitud (nt `web-dev-template`, `vite-starter`). Oluline on, et see on **tühi projekt**, mida hakkad ise ehitama.

### 2. Initsialiseeri Git

```bash
git init
```

### 3. Loo esimene README

Loo fail `README.md`:

```markdown
# Minu veebi template

Professionaalne veebiarenduse starter-projekt.
```

### 4. Esimene commit

```bash
git add README.md
git commit -m "Lisa projekti README"
```

### 5. Kontrolli Node.js versiooni

```bash
node -v
```

Kui Node.js puudub, paigalda see õpetaja juhendamisel ([Node.js, npm ja nvm](/arendusvahendid-i/nodejs-ja-nvm)).

---

## Kontrollpunkt

Enne edasi liikumist peaks su terminal näitama midagi sellist:

```bash
pwd
# .../minu-veebi-template

git status
# On branch main, nothing to commit

node -v
# v20.x.x või v22.x.x (õpetaja LTS)

ls -la
# README.md  .git/
```

Kui kõik kontrollid läbisid, liigu edasi: [Bundler ja Vite](/rakenduste-loomine/bundler-ja-vite).
