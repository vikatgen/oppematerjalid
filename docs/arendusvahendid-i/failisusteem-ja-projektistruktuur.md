# Failisüsteem ja projektistruktuur

## Õpieesmärgid

Selle peatüki lõpuks peaks õppija:

- mõistma, mis on failisüsteem ja projektikaust
- oskama eristada absoluutset ja suhtelist teed
- mõistma, miks käske peab käivitama õiges kaustas
- tundma ära levinud projektikaustu ja faile
- mõistma, miks osa faile on peidetud

---

# 1. Failisüsteem kui arvuti korrastus

Failisüsteem on viis, kuidas operatsioonisüsteem hoiab faile ja kaustu korras. Kui kirjutad koodi, ei tööta sa ainult ühe failiga. Tavaliselt töötad projektiga, kus on mitu faili, kausta, seadistusfaili ja sõltuvust.

Arendaja jaoks on oluline aru saada:

- kus projekt arvutis asub
- millises kaustas terminal praegu on
- millised failid kuuluvad projekti juurde
- milliseid faile ei tohiks käsitsi muuta või GitHubi lisada

Kui projektikaust on segamini, muutub ka arendamine segaseks. Failisüsteemi mõistmine aitab vältida olukordi, kus käsk käivitatakse vales kohas või muudetakse vale projekti faile.

---

# 2. Projektikaust ja projekti juur

**Projektikaust** on kaust, kus ühe rakenduse või harjutuse failid koos asuvad.

**Projekti juur** ehk project root on selle projekti kõige ülemine kaust. Seal asuvad tavaliselt projekti kõige tähtsamad failid, näiteks:

- `package.json`
- `README.md`
- `.gitignore`
- `.env`
- `src/`

Näide:

```text
my-app/
├── package.json
├── README.md
├── .gitignore
├── src/
│   └── main.js
└── node_modules/
```

Selles näites on projekti juur `my-app/`.

Terminalis saab kontrollida, kas oled õiges kohas:

```bash
pwd
ls
```

Kui näed `package.json` faili, oled tõenäoliselt JavaScripti projekti juures.

---

# 3. Absoluutne ja suhteline tee

Faili või kausta asukohta nimetatakse teeks.

**Absoluutne tee** algab failisüsteemi algusest või kasutaja kodukaustast ning kirjeldab kogu teekonda failini.

Näide macOS-is:

```text
/Users/student/projects/my-app/src/main.js
```

**Suhteline tee** algab sellest kaustast, kus sa parasjagu oled.

Kui oled kaustas:

```text
/Users/student/projects/my-app
```

siis faili `src/main.js` suhteline tee on:

```text
src/main.js
```

Suhtelisi teid kasutatakse projektides palju, sest projekt võib asuda eri arvutites eri kohas, aga projekti sisemine struktuur jääb samaks.

---

# 4. Miks käsu käivitamise kaust loeb?

Paljud käsud eeldavad, et oled projekti juurkaustas.

Näiteks:

```bash
npm install
```

See käsk otsib praegusest kaustast faili `package.json`. Kui käivitad käsu vales kaustas, ei leia `npm` projekti infot üles.

Sama kehtib paljude tööriistade kohta:

- `git status` näitab infot selle Git projekti kohta, mille kaustas oled
- `npm run dev` otsib käsku `package.json` failist
- `nvm use` võib otsida `.nvmrc` faili

::: tip Hea harjumus
Kui käsk ei tööta, kontrolli esimese asjana `pwd` ja `ls` abil, kas oled õiges projektikaustas.
:::

---

# 5. Levinud failid ja kaustad

JavaScripti projektides näeb tihti selliseid faile ja kaustu:

- `src/` - lähtekood ehk kood, mida arendaja kirjutab
- `public/` - avalikud failid, näiteks pildid või staatilised failid
- `node_modules/` - npm-i paigaldatud sõltuvused
- `dist/` või `build/` - valmis ehitatud rakendus
- `package.json` - projekti nimi, skriptid ja sõltuvused
- `package-lock.json` - täpsed sõltuvuste versioonid
- `README.md` - projekti kirjeldus ja käivitamise juhend
- `.gitignore` - failid ja kaustad, mida Git ei peaks jälgima
- `.env` - keskkonnamuutujad ja lokaalsed seadistused
- `.nvmrc` - projekti soovitatud Node.js versioon

Kõik failid ei ole võrdsed. Mõnda faili muudetakse iga päev, mõni on automaatselt genereeritud ja mõnda ei tohi turvalisuse tõttu jagada.

---

# 6. Mida ei tohiks tavaliselt GitHubi panna?

GitHubi ei tohiks lisada faile, mis on suured, automaatselt taastatavad või sisaldavad saladusi.

Tavaliselt ei lisata:

- `node_modules/`
- `dist/`
- `build/`
- `.env`
- paroolid ja API võtmed
- operatsioonisüsteemi ajutised failid

Selleks kasutatakse faili `.gitignore`.

Näide:

```text
node_modules/
dist/
.env
```

Kui keegi teine projekti alla laadib, saab ta sõltuvused uuesti paigaldada:

```bash
npm install
```

Seetõttu pole mõtet `node_modules/` kausta GitHubi lisada.

---

# 7. Peidetud failid

Unix-laadsetes süsteemides algavad peidetud failid punktiga.

Näited:

- `.gitignore`
- `.env`
- `.nvmrc`
- `.zshrc`

Peidetud failid ei ole maagilised. Need on tavalised failid, mida failihaldur või `ls` vaikimisi ei pruugi näidata.

Terminalis näed neid käsuga:

```bash
ls -la
```

Arenduses on peidetud failid olulised, sest neis hoitakse sageli projekti või tööriistade seadistust.
