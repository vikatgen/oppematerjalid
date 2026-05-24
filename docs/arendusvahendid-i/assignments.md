# Arendusvahendid I ülesanded

## Ülesanne 1: Terminal ja failisüsteem

1. Ava terminal.
2. Kontrolli, millises kaustas oled.
3. Liigu kodukausta.
4. Loo kaust `arendusvahendid-harjutus`.
5. Liigu loodud kausta.
6. Loo kaustad `src` ja `docs`.
7. Loo failid `README.md` ja `src/index.js`.
8. Kontrolli kausta sisu käsuga `ls -la`.

Kirjuta üles käsud, mida kasutasid.

---

## Ülesanne 2: Shelli kontroll

Kontrolli oma arvutis:

- millist shelli kasutad
- kus asub shelli seadistusfail
- kas sul on olemas `.zshrc` või `.bashrc`
- kas oskad seadistusfaili tekstiredaktoris avada

Lisa seadistusfaili alias:

```bash
alias ll="ls -la"
```

Lae seadistus uuesti ja kontrolli, kas `ll` töötab.

---

## Ülesanne 3: Projekti struktuuri kirjeldamine

Loo või kasuta olemasolevat väikest projektikausta.

Kirjelda failis `README.md`:

- mis on projekti juurkaust
- millised failid ja kaustad projektis on
- millised failid on peidetud
- milliseid faile ei tohiks GitHubi lisada

Kontrolli peidetud faile käsuga:

```bash
ls -la
```

---

## Ülesanne 4: PATH uurimine

Kontrolli järgmiste käskude asukohta:

```bash
which node
which npm
```

Seejärel vaata `PATH` muutujat:

```bash
echo $PATH
```

Vasta lühidalt:

- millised käsud olid olemas?
- millised käsud puudusid?
- millistest kaustadest shell programme otsib?

---

## Ülesanne 5: Node.js ja nvm

Kontrolli:

```bash
node -v
npm -v
nvm --version
nvm ls
```

Kui `nvm` on olemas, paigalda või vali õpetaja määratud Node.js versioon.

Näide:

```bash
nvm install 20
nvm use 20
node -v
```

Kirjuta üles, millist Node.js versiooni kasutad.

---

## Ülesanne 6: npm ja package.json

Leia projektist `package.json` fail või loo õpetaja juhendamisel uus npm projekt.

Vasta:

- mis on projekti nimi?
- millised `scripts` käsud on olemas?
- millised sõltuvused on kirjas?
- kas projektis on `package-lock.json`?
- kas `node_modules/` on olemas?

Käivita:

```bash
npm install
npm run
```

---

## Ülesanne 7: Git töövoog

Loo väike Git repository või kasuta õpetaja antud harjutusprojekti.

Tee läbi töövoog:

```bash
git status
git add .
git commit -m "Lisa arendusvahendite harjutus"
git log --oneline
```

Vasta:

- mida näitas `git status` enne commit'i?
- mida näitas `git status` pärast commit'i?
- mis on sinu commit'i sõnum?

---

## Ülesanne 8: README Markdownis

Täienda oma `README.md` faili.

README peab sisaldama:

- projekti pealkirja
- lühikirjeldust
- vajalikke tööriistu
- paigaldamise käsku
- käivitamise käsku
- ühte koodiplokki
- ühte linki

---

## Ülesanne 9: Keskkonnamuutujad

Loo faili `.env.example` näidisväärtused:

```text
PORT=3000
API_URL=
```

Lisa `.gitignore` faili:

```text
.env
node_modules/
```

Vasta:

- miks `.env` ei peaks GitHubi minema?
- miks `.env.example` võib GitHubi minna?
- mis vahe on `.env` failil ja `PATH` muutujal?

---

## Ülesanne 10: Tõrkeotsingu raport

Koosta lühike raport failis `README.md`.

Raportis peab olema:

- operatsioonisüsteem
- kasutatav shell
- Node.js versioon
- npm versioon
- nvm versioon või märge, et seda pole
- projekti juurkaust
- olemasolevad npm skriptid
- üks probleem, mis tekkis, ja kuidas seda lahendasid
