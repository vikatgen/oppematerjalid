# Keskkonnamuutujad

## Õpieesmärgid

Selle peatüki lõpuks peaks õppija:

- mõistma, mis on keskkonnamuutuja
- oskama lugeda keskkonnamuutujat terminalis
- mõistma `PATH` ja `.env` faili erinevust
- teadma, miks paroole ja võtmeid ei lisata GitHubi
- oskama kasutada `.env.example` faili mõtet

---

# 1. Mis on keskkonnamuutuja?

Keskkonnamuutuja on nime ja väärtuse paar, mida programm saab käivitumisel kasutada.

Näiteks:

```text
NODE_ENV=development
PORT=3000
API_URL=https://example.com
```

Keskkonnamuutujaid kasutatakse selleks, et kood ei peaks kõike enda sisse kirjutama. Sama kood võib töötada eri keskkondades erineva seadistusega.

Näiteks:

- arendaja arvutis kasutatakse testandmebaasi
- kooli serveris kasutatakse teist aadressi
- päris rakenduses kasutatakse päris API võtit

Kood jääb samaks, aga keskkond annab erinevad väärtused.

---

# 2. Shelli keskkonnamuutujad

Terminalis saab muutuja väärtust vaadata käsuga `echo`.

Näide:

```bash
echo $SHELL
echo $PATH
```

Ajutise keskkonnamuutuja saab määrata nii:

```bash
MY_NAME="Mari"
echo $MY_NAME
```

See kehtib ainult praeguses terminaliaknas. Kui terminal sulgeda, kaob see väärtus ära.

Kui tahad, et väärtus oleks olemas iga kord, lisatakse see shelli seadistusfaili, näiteks `~/.zshrc`.

---

# 3. PATH on eriline keskkonnamuutuja

`PATH` ütleb shellile, millistest kaustadest programme otsida.

Kui kirjutad:

```bash
node
```

siis shell kontrollib `PATH` muutujas olevaid kaustu ja otsib sealt programmi nimega `node`.

`PATH` vaatamine:

```bash
echo $PATH
```

Programmi asukoha kontroll:

```bash
which node
which npm
```

Kui shell programmi ei leia, ei tähenda see alati, et programmi pole arvutis olemas. Mõnikord tähendab see, et programmi asukoht ei ole `PATH` muutujas.

---

# 4. .env fail

Projektides kasutatakse sageli `.env` faili. See on fail, kuhu pannakse lokaalsed keskkonnamuutujad.

Näide:

```text
PORT=3000
API_URL=http://localhost:3000
```

`.env` fail ei ole sama asi nagu `~/.zshrc`.

- `~/.zshrc` seadistab sinu shelli
- `.env` seadistab konkreetset projekti

`.env` fail asub tavaliselt projekti juurkaustas.

---

# 5. Saladused ja turvalisus

`.env` failis võivad olla tundlikud väärtused:

- paroolid
- API võtmed
- andmebaasi aadressid
- ligipääsutokenid

Seetõttu ei tohiks `.env` faili GitHubi lisada.

`.gitignore` failis peaks olema:

```text
.env
```

::: warning Oluline
Kui parool või API võti jõuab GitHubi, tuleb seda käsitleda lekkinud saladusena. Faili hilisem kustutamine ei pruugi olla piisav, sest väärtus võib jääda Git ajalukku.
:::

---

# 6. .env.example

Kui `.env` faili ei lisata GitHubi, tekib küsimus: kuidas teine arendaja teab, milliseid muutujaid projekt vajab?

Selleks kasutatakse faili `.env.example`.

Näide:

```text
PORT=3000
API_URL=
```

`.env.example` näitab, millised muutujad peavad olemas olema, aga ei sisalda päris saladusi.

Töövoog:

1. klooni projekt
2. kopeeri `.env.example` fail nimega `.env`
3. täida vajalikud väärtused
4. käivita projekt

---

# 7. Keskkonnamuutujad JavaScriptis

Node.js projektis saab keskkonnamuutujaid lugeda `process.env` kaudu.

Näide:

```js
const port = process.env.PORT || 3000;
```

See tähendab: kasuta `PORT` väärtust, kui see on olemas. Kui seda pole, kasuta väärtust `3000`.

Esimesel aastal on oluline mõista põhimõtet: keskkonnamuutujad võimaldavad projekti seadistada ilma koodi muutmata.

---

# 8. Kontrollküsimused vea korral

Kui projekt ütleb, et keskkonnamuutuja puudub, kontrolli:

- kas `.env` fail on olemas
- kas oled projekti juurkaustas
- kas muutuja nimi on õigesti kirjutatud
- kas `.env.example` näitab vajalikke muutujaid
- kas projekt tuleb peale `.env` muutmist uuesti käivitada

Muutuja nimi peab olema täpne. `API_URL` ja `APIURL` ei ole sama asi.
