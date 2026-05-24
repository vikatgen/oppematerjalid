# Terminal ja shell

## Õpieesmärgid

Selle peatüki lõpuks peaks õppija:

- mõistma terminali ja shelli erinevust
- mõistma, kuidas terminal ja shell on seotud operatsioonisüsteemi ning riistvaraga
- oskama kontrollida, millist shelli terminal kasutab
- mõistma `zsh` ja `bash` põhilist erinevust
- mõistma shelli seadistusfaili ja `PATH` muutuja rolli
- oskama liikuda kaustade vahel käsureal
- oskama vaadata, luua ja kustutada faile ning kaustu
- oskama kontrollida, millises kaustas käsk käivitatakse

---

# 1. Terminal vs shell

**Terminal** on programm, kuhu kirjutad käske ja kus näed käskude väljundit.

**Shell** on programm, mis käske tõlgendab ja käivitab. macOS-is on vaikimisi shell enamasti `zsh`, Linuxis tihti `bash`, Windowsis kasutatakse näiteks PowerShelli.

Terminal ja shell on omavahel seotud, kuid nad ei ole sama asi.

Terminal on nagu aken või kasutajaliides, mille kaudu inimene saab arvutiga tekstipõhiselt suhelda. Kui kirjutad terminali käsu, siis terminal edastab selle shellile. Terminal ise ei otsusta, mida käsk tähendab.

Shell on tõlkekiht inimese ja operatsioonisüsteemi vahel. Shell loeb käsureale kirjutatud teksti, saab aru, millist programmi või tegevust soovid käivitada, ning palub operatsioonisüsteemil see töö ära teha.

Operatsioonisüsteemi kõige alumist ja olulisemat osa nimetatakse **kerneliks** ehk operatsioonisüsteemi tuumaks. Kernel suhtleb otse riistvaraga: protsessori, mälu, kõvaketta, failisüsteemi ja teiste seadmetega. Tavakasutaja ei suhtle kerneliga otse. Selle asemel liigub käsk läbi terminali ja shelli operatsioonisüsteemini.

Lihtsustatud liikumine näeb välja nii:

```text
kasutaja -> terminal -> shell -> operatsioonisüsteemi kernel -> riistvara
```

Kui töö on tehtud, liigub tulemus tagasi:

```text
riistvara -> kernel -> shell -> terminal -> kasutaja
```

Näiteks kui kirjutad käsu `ls`, siis shell tõlgendab selle soovina näha kausta sisu. Operatsioonisüsteem küsib failisüsteemilt vajaliku info ning shell näitab tulemuse terminalis.

Näide:

```bash
pwd
```

Terminal näitab käsku ja tulemust. Shell saab käsust aru ning küsib operatsioonisüsteemilt praeguse kausta asukoha.

---

# 2. Kuidas kontrollida, millist shelli kasutan?

Terminalis saab kasutatavat shelli kontrollida mitmel viisil.

Kõige lihtsam kontroll:

```bash
echo $SHELL
```

Näide macOS-is:

```bash
/bin/zsh
```

See tähendab, et kasutaja vaikimisi shell on `zsh`.

Praegu töötava shelli nime saab kontrollida ka käsuga:

```bash
echo $0
```

Näiteks võib väljund olla:

```bash
zsh
```

või:

```bash
bash
```

::: tip Märkus
`echo $SHELL` näitab tavaliselt kasutaja vaikimisi shelli. `echo $0` näitab shelli, mis praeguses terminaliaknas tegelikult töötab.
:::

---

# 3. Mis vahe on zsh ja bashil?

`bash` ja `zsh` on mõlemad Unix-laadsed shellid. Mõlemaga saab liikuda kaustades, käivitada programme, kirjutada skripte ja kasutada keskkonnamuutujaid.

**bash** ehk Bourne Again Shell on väga levinud Linuxi maailmas. Paljud õpetused, serverid ja skriptid kasutavad bashile sobivat süntaksit.

**zsh** ehk Z Shell on macOS-i uuemates versioonides vaikimisi shell. See pakub mugavamaid võimalusi interaktiivseks kasutamiseks, näiteks paremat automaatset täiendamist, teemade ja plugin'ate tuge ning paindlikumat seadistamist.

Õppija jaoks on alguses kõige olulisem teada:

- tavalised käsud nagu `cd`, `ls`, `pwd`, `mkdir` ja `rm` töötavad mõlemas
- shelli seadistusfailid on erinevad
- `zsh` kasutab enamasti faili `~/.zshrc`
- `bash` kasutab tihti faili `~/.bashrc` või `~/.bash_profile`
- internetist leitud käsud võivad eeldada kindlat shelli

Kui õpid terminali aluseid, ei pea sa kohe kõiki erinevusi teadma. Oluline on osata kontrollida, millist shelli kasutad, ja teada, millist seadistusfaili muuta.

---

# 4. Shelli config ja PATH

Shelli käitumist saab seadistada config-failide kaudu. Need on tavalised tekstifailid, mida shell loeb käivitumisel.

Levinud seadistusfailid:

- `~/.zshrc` - zsh kasutajaseadistus
- `~/.bashrc` - bash kasutajaseadistus
- `~/.bash_profile` - bash sisselogimisshelli seadistus macOS-is

Config-faili kasutatakse näiteks selleks, et:

- lisada aliaseid ehk käskude lühendeid
- määrata keskkonnamuutujaid
- muuta terminali prompti välimust
- laadida tööriistu nagu `nvm`
- täiendada `PATH` muutujat

Näide aliasest:

```bash
alias ll="ls -la"
```

Kui see rida on lisatud `~/.zshrc` faili, saab terminalis kirjutada:

```bash
ll
```

ja shell käivitab tegelikult käsu:

```bash
ls -la
```

`PATH` on keskkonnamuutuja, mis ütleb shellile, millistest kaustadest programme otsida. Kui kirjutad terminali käsu:

```bash
node
```

siis shell ei otsi programmi kogu arvutist. Ta otsib ainult nendest kaustadest, mis on kirjas `PATH` muutujas.

`PATH` vaatamine:

```bash
echo $PATH
```

Käsu asukoha kontroll:

```bash
which node
which npm
```

Kui käsk annab tulemuseks faili asukoha, leidis shell programmi üles. Kui tulemust ei tule või kuvatakse viga, ei pruugi programm olla paigaldatud või selle asukoht puudub `PATH` muutujast.

Näide `PATH` täiendamisest:

```bash
export PATH="$HOME/bin:$PATH"
```

See lisab kasutaja kodukaustas oleva `bin` kausta olemasoleva `PATH` ette. Sellist võtet kasutatakse siis, kui soovid, et shell leiaks mõnes kindlas kaustas olevad käsud üles.

::: warning Oluline
`PATH` muutmisel ära kustuta vana väärtust. Kui kirjutad `PATH` valesti üle, võivad tavalised käsud ajutiselt katki minna. Seetõttu lisatakse lõppu tavaliselt `:$PATH`.
:::

Pärast config-faili muutmist tuleb see uuesti laadida.

zsh puhul:

```bash
source ~/.zshrc
```

bash puhul:

```bash
source ~/.bashrc
```

Teine võimalus on terminal sulgeda ja uuesti avada.

---

# 5. Kus ma praegu olen?

Terminalis on väga oluline teada, millises kaustas käsk käivitatakse. Selleks kasutatakse käsku:

```bash
pwd
```

`pwd` tähendab **print working directory** ehk "näita praegust töökausta".

Näide väljundist:

```bash
/Users/student/projects/my-app
```

See tähendab, et järgmised käsud käivitatakse kaustas `my-app`.

---

# 6. Kaustade sisu vaatamine

Kausta sisu näitamiseks kasutatakse käsku:

```bash
ls
```

Rohkemate detailidega vaade:

```bash
ls -la
```

Selles käsus:

- `-l` näitab detailset nimekirja
- `-a` näitab ka peidetud faile, näiteks `.gitignore` või `.zshrc`

::: tip Peidetud failid
Unix-laadsetes süsteemides on punktiga algavad failid peidetud. Näiteks `.zshrc`, `.env` ja `.gitignore`.
:::

---

# 7. Kaustade vahel liikumine

Kausta vahetamiseks kasutatakse käsku `cd`.

```bash
cd Documents
```

Üks kaust tagasi:

```bash
cd ..
```

Kodukausta:

```bash
cd ~
```

Projektikausta näide:

```bash
cd ~/projects/my-app
```

Kui kausta nimes on tühikud, pane tee jutumärkidesse:

```bash
cd "My Projects"
```

---

# 8. Failide ja kaustade loomine

Uue kausta loomine:

```bash
mkdir my-project
```

Uue tühja faili loomine:

```bash
touch README.md
```

Faili sisu vaatamine:

```bash
less README.md
```

`less` vaatest väljumiseks vajuta `q`.

---

# 9. Failide ja kaustade kustutamine

Faili kustutamine:

```bash
rm README.md
```

Tühja kausta kustutamine:

```bash
rmdir old-folder
```

Kausta koos sisuga kustutamine:

```bash
rm -r old-folder
```

::: warning Ettevaatust
`rm` kustutab faili ilma prügikasti liigutamata. Enne kustutamist kontrolli alati, millises kaustas oled ja mida kustutad.
:::

---

# 10. Käsu katkestamine

Kui terminalis töötab käsk, mis ei lõpe või mille soovid katkestada, kasuta:

```bash
Ctrl + C
```

Seda kasutatakse näiteks arendusserveri peatamiseks.

---

# 11. Lisaks lugemiseks

- [Käsuinterpretaator - Vikipeedia](https://et.wikipedia.org/wiki/K%C3%A4suinterpretaator)
