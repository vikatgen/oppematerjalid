# npm ja package.json

## Õpieesmärgid

Selle peatüki lõpuks peaks õppija:

- mõistma, mis roll on `npm` tööriistal
- oskama lugeda `package.json` faili põhilisi osi
- mõistma sõltuvuste ja arendussõltuvuste erinevust
- oskama käivitada projekti skripte
- mõistma, miks `node_modules/` ei lisata GitHubi

---

# 1. npm roll projektis

`npm` on Node.js paketihaldur. Selle abil paigaldatakse valmis teeke ja tööriistu, mida projekt vajab.

Näiteks võib projekt kasutada:

- Vite'i arendusserveri jaoks
- Jest'i testimiseks
- ESLint'i koodi kontrollimiseks
- mõnda UI või backend teeki

Kui iga arendaja peaks need käsitsi otsima ja alla laadima, oleks projektide jagamine väga keeruline. `npm` teeb selle protsessi korduvaks ja kontrollitavaks.

---

# 2. package.json

`package.json` on JavaScripti projekti keskne seadistusfail.

Seal on kirjas näiteks:

- projekti nimi
- projekti versioon
- käivitatavad skriptid
- sõltuvused
- arendussõltuvused

Lihtne näide:

```json
{
  "name": "my-app",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "vite": "^5.0.0"
  }
}
```

Kui projektis on `package.json`, saab `npm` aru, mida projekt vajab ja milliseid käske saab käivitada.

---

# 3. npm install

Sõltuvuste paigaldamiseks kasutatakse:

```bash
npm install
```

See käsk loeb `package.json` ja `package-lock.json` faile ning loob kausta `node_modules/`.

`node_modules/` sisaldab projekti sõltuvusi. See kaust võib olla väga suur ja seda ei lisata tavaliselt GitHubi.

Kui teine arendaja kloonib projekti, saab ta sama kausta uuesti luua:

```bash
npm install
```

---

# 4. dependencies ja devDependencies

`dependencies` on sõltuvused, mida rakendus vajab töötamiseks.

`devDependencies` on tööriistad, mida kasutatakse arenduse ajal.

Näide:

```json
{
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  }
}
```

Lihtsustatud mõte:

- `dependencies` - rakendus vajab neid töö ajal
- `devDependencies` - arendaja vajab neid ehitamiseks, testimiseks või kontrollimiseks

Esimesel aastal ei pea kõiki erandeid teadma. Oluline on aru saada, et sõltuvused kirjeldavad projekti vajadusi ning `npm install` taastab need vajadused arvutis.

---

# 5. npm scripts

`scripts` osa määrab käsud, mida saab käivitada `npm run` abil.

Näide:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Käivitamine:

```bash
npm run dev
npm run build
npm run preview
```

Kui käsk ei tööta, kontrolli `package.json` faili. Näiteks kui `scripts` osas pole `start` käsku, siis `npm run start` ei saa töötada.

Olemasolevate skriptide vaatamine:

```bash
npm run
```

---

# 6. package-lock.json

`package-lock.json` salvestab täpsemalt, millised sõltuvuste versioonid paigaldati.

Kui `package.json` ütleb üldisemalt, mida projekt vajab, siis `package-lock.json` ütleb täpsemalt, millised versioonid tegelikult kasutusele võeti.

See aitab tagada, et eri arvutites paigaldatakse võimalikult sama sõltuvuste komplekt.

::: tip Hea harjumus
Ära kustuta `package-lock.json` faili lihtsalt sellepärast, et see on automaatselt loodud. Tavaliselt kuulub see projekti juurde ja tuleks commit'ida.
:::

---

# 7. npm install vs npm ci

Alguses kasutad enamasti:

```bash
npm install
```

Automaatsetes keskkondades, näiteks CI-s, kasutatakse sageli:

```bash
npm ci
```

`npm ci` paigaldab sõltuvused täpselt `package-lock.json` järgi ja alustab puhtast seisust. Esimesel aastal piisab teadmisest, et `npm install` on tavaline arendaja käsk ning `npm ci` on rangem paigaldusviis automaatika jaoks.

---

# 8. Levinud probleemid

Kui projekt ei käivitu, kontrolli:

- kas oled projekti juurkaustas
- kas `package.json` on olemas
- kas `npm install` on tehtud
- kas käivitad õiget skripti
- kas Node.js versioon sobib projektiga

Näide:

```bash
pwd
ls
node -v
npm -v
npm run
```

Need käsud annavad kiiresti ülevaate, kas oled õiges kohas ja millised tööriistad on kasutusel.
