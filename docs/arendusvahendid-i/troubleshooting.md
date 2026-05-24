# Tõrkeotsingu töövoog

## Õpieesmärgid

Selle peatüki lõpuks peaks õppija:

- oskama vea korral rahulikult infot koguda
- oskama lugeda terminali veateadet
- oskama kontrollida töökausta, versioone ja projekti skripte
- oskama eristada sümptomeid ja põhjuseid
- oskama küsida abi nii, et teistel oleks piisavalt infot

---

# 1. Viga ei tähenda läbikukkumist

Tarkvaraarenduses on vead normaalne osa tööst. Professionaalne arendaja ei ole inimene, kellel kunagi vigu ei teki. Professionaalne arendaja oskab vigu süstemaatiliselt uurida.

Algaja esimene reaktsioon on tihti: "See ei tööta."

Arendaja järgmine samm peaks olema: "Mis täpselt ei tööta ja mida süsteem mulle ütleb?"

---

# 2. Sümptom ja põhjus

**Sümptom** on see, mida näed.

Näiteks:

- projekt ei käivitu
- terminal näitab punast teksti
- brauser näitab tühja lehte
- käsk ütleb `command not found`

**Põhjus** on see, miks probleem tekkis.

Näiteks:

- oled vales kaustas
- `npm install` on tegemata
- Node.js versioon on vale
- vajalik keskkonnamuutuja puudub
- käsu nimi on valesti kirjutatud

Tõrkeotsingu eesmärk on liikuda sümptomist põhjuseni.

---

# 3. Loe veateadet ülevalt alla

Veateade võib alguses tunduda pikk ja hirmutav. Seda ei pea tervikuna pähe õppima. Otsi sealt olulisi vihjeid.

Vaata:

- milline käsk käivitati
- milline fail või rida mainitakse
- kas öeldakse `command not found`
- kas öeldakse `permission denied`
- kas öeldakse `module not found`
- kas öeldakse, et port on juba kasutusel

Näide:

```text
npm ERR! Missing script: "dev"
```

See tähendab, et `package.json` failis pole `dev` skripti. Probleem ei ole npm-is üldiselt, vaid konkreetses käsus või projektis.

---

# 4. Esimene kontroll: kus ma olen?

Paljud probleemid tulevad sellest, et käsk käivitatakse vales kaustas.

Kontrolli:

```bash
pwd
ls
```

Kui tegemist on JavaScripti projektiga, peaksid projekti juures nägema faili:

```text
package.json
```

Kui seda pole, oled võib-olla vales kaustas.

---

# 5. Teine kontroll: kas tööriistad on olemas?

Kontrolli versioone:

```bash
node -v
npm -v
nvm --version
```

Kontrolli, kust käsud tulevad:

```bash
which node
which npm
```

Kui käsk annab `command not found`, siis shell ei leia seda programmi. Põhjus võib olla selles, et programm pole paigaldatud või `PATH` pole õigesti seadistatud.

---

# 6. Kolmas kontroll: kas sõltuvused on paigaldatud?

Kui projekt on värskelt kloonitud või alla laaditud, tuleb sõltuvused paigaldada.

```bash
npm install
```

Kui `node_modules/` puudub, ei pruugi projekt käivituda.

::: tip Hea harjumus
Kui võtad JavaScripti projekti esimest korda lahti, kontrolli `README.md` faili ja otsi käivitamise juhiseid.
:::

---

# 7. Neljas kontroll: millised skriptid on olemas?

Kui käsk `npm run dev` ei tööta, kontrolli `package.json` faili.

Skripte saab vaadata ka terminalis:

```bash
npm run
```

Kui väljundis pole `dev` skripti, ei saa seda käsku käivitada.

---

# 8. Levinud vead ja tähendused

`command not found`

: Shell ei leia käsku. Kontrolli paigaldust ja `PATH` muutujat.

`Missing script`

: `package.json` failis pole sellist npm skripti.

`Cannot find module`

: Mõni sõltuvus puudub või import viitab valele failile.

`EADDRINUSE`

: Port on juba kasutusel. Näiteks mõni arendusserver töötab juba samal pordil.

`Permission denied`

: Kasutajal pole õigust faili või käsku käivitada. Ära lahenda seda automaatselt `sudo` käsuga, vaid uuri enne põhjust.

---

# 9. Abi küsimine

Hea abipalve sisaldab infot, mis aitab teisel inimesel probleemi korrata või mõista.

Kirjuta:

- mida üritasid teha
- millise käsu käivitasid
- millises kaustas olid
- millise veateate said
- mida juba proovisid

Halb küsimus:

```text
Ei tööta, mis viga?
```

Parem küsimus:

```text
Käivitasin projekti juurkaustas käsu npm run dev.
Terminal näitab: npm ERR! Missing script: "dev".
Kontrollisin package.json faili ja seal on ainult build skript.
Kas peaksin kasutama teist käsku?
```

Sellise küsimuse põhjal saab õpetaja või kaasõpilane palju kiiremini aidata.

---

# 10. Lühike tõrkeotsingu kontrollnimekiri

Kui midagi ei tööta, tee järjest:

1. Loe veateadet.
2. Kontrolli `pwd`.
3. Kontrolli `ls`.
4. Kontrolli tööriistade versioone.
5. Kontrolli `package.json` skripte.
6. Käivita vajadusel `npm install`.
7. Mõtle, mis muutus enne vea tekkimist.
8. Küsi abi koos konkreetse veateatega.
