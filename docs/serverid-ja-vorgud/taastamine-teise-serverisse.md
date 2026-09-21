---
title: Taastamine teise serverisse
description: Miks taastame alati eraldi sihtskeemi, ning kuidas tuua varukoopia hosti kaudu srv2-le ja seal taastada ning sisu tõendada.
outline: deep
---

# Taastamine teise serverisse

::: info Õpiväljund
Pärast seda osa oskad selgitada, miks taastamine käib alati eraldi sihtmärki, ning oled toonud varukoopia hosti kaudu srv2-le, taastanud selle uude skeemi ja tõendanud sisu vastavust algsele.
:::

## Meeskonna kahekümne neljas küsimus sinule

Varukoopia on olemas ja kontrollitud (`echo $?`, faili suurus, sõrmejälg) — aga meeskond küsib täpsustavalt: "kas sa oled proovinud sealt midagi **tegelikult taastada**?" Selles osas teeme just seda, ja teadlikult **mitte** originaali peal.

## Taastamine eraldi sihti — ära kirjuta originaali üle

Algset andmebaasi **ei kirjutata testi käigus üle**. Taastatud skeemile tehakse päringud ja **võrreldakse sisu**, mitte ainult failisuurust. Päästepaati katsetame enne päris uppumist, mitte selle ajal — eraldi siht vähendab riski, et varunduse **kontroll ise** hävitab algse töö.

::: tip Miks taastame just srv2-le, mitte samasse serverisse
Taastamine täiesti eraldi **serverisse** (mitte ainult eraldi skeemi samas serveris) on realistlikum test — see tõendab, et varukoopia ei sõltu millestki, mis on ainult srv1-l olemas (nt konkreetne MySQL-i seadistuse detail). See on ka esimene samm [hilisema veebiteenuse teisaldamise](./teenuse-teisaldamine-ja-soltumatu-koopia) harjutuse jaoks.
:::

## Käed külge: koopia hosti kaudu srv2-le

srv1 tulemüür lubab SSH-d [Tulemüür ja UFW](./tulemuur-ja-ufw) osast alates **ainult hostilt** — seega ei saa dumpi otse srv1-lt srv2-le kopeerida, vaid ülekanne käib **hosti kaudu**, kahes etapis.

Loo hostis (Finder/File Explorer) kaust `backup` ja mine terminalis sinna:

```bash
cd <sinu backup kausta täielik tee>
```

**Hosti terminalist:**

```bash
scp -i ~/.ssh/koolilabor oppur@192.168.56.10:backup/koolilab.sql ./koolilab.sql
```

`scp` kopeerib faili üle SSH-ühenduse, `-i` valib sama võtme, mida juba [SSH-ühendus ja andmebaasi põhitõed](./ssh-uhendus-ja-andmebaasi-pohitoed) osast tunned. Koolonieelne osa (`oppur@192.168.56.10:backup/koolilab.sql`) on **kaugfail**, `./koolilab.sql` on kohalik siht.

```bash
scp -i ~/.ssh/koolilabor ./koolilab.sql oppur@192.168.56.20:koolilab.sql
```

Kopeerib äsja saadud faili edasi srv2 `oppur` kodukausta — sama muster, ainult vastupidises suunas.

**Kus: srv2**

```bash
sudo apt install mysql-server
```

Paigaldab taastamise sihtserveri MySQL-i. Kontrolli pärast paigaldust, et see kuulab ainult loopbackil — [Kasutajad, õigused ja tehingud](./kasutajad-oigused-ja-tehingud) osas juba tuttav `ss -ltnp` kontroll kehtib siingi.

```bash
sha256sum ~/koolilab.sql
```

Arvutab saabunud faili sõrmejälje. **Võrdle** seda [eelmises osas](./varunduse-pohimotted-ja-cli-dump) tööpäevikusse salvestatud algse räsiga — need peavad olema **täpselt** samad. Kui erinevad, ei tohi taastamist jätkata: fail rikuti ülekande käigus.

```bash
sudo mysql -e "CREATE DATABASE koolilab_restore CHARACTER SET utf8mb4;"
```

`mysql -e` täidab jutumärkides oleva **ühe** SQL käsu ilma interaktiivset klienti avamata — loob eraldi, tühja taastamissihi. Kui `koolilab_restore` on juba mingil põhjusel olemas, vali uus nimi ja kohanda järgmist käsku — ära kustuta olemasolevat andmebaasi pimesi.

```bash
sudo mysql koolilab_restore < ~/koolilab.sql
```

Valib sihtskeemi ja suunab `<` abil SQL-faili sisu kliendi sisendisse. Dump ei kasutanud `--databases` valikut ([eelmises osas](./varunduse-pohimotted-ja-cli-dump) vaata `mysqldump` käsku uuesti), seetõttu **sobib** taastamiseks vabalt valitud skeeminimi — dumpi sisus pole kõvasti kirjutatud algset andmebaasi nime.

```bash
sudo mysql -e "SELECT * FROM koolilab_restore.notes ORDER BY id;"
```

Loeb taastatud andmed kindlas järjekorras. **Oodatav tulemus:** read kattuvad täpselt sellega, mille [eelmises osas](./varunduse-pohimotted-ja-cli-dump) varundamise ajal tööpäevikusse kirjutasid — sama ridade arv, sama sisu.

## Kokkuvõte

| Mõiste / käsk | Tähendus |
| --- | --- |
| Taastamine eraldi sihti | algset andmebaasi ei kirjutata testi käigus üle |
| SCP hosti kaudu | srv1 → host → srv2, kuna srv1 SSH lubab ainult hostilt |
| `sha256sum` võrdlus enne taastamist | tõendab, et transport ei muutnud faili |
| `mysql <skeem> < fail.sql` | dump ilma `--databases`-ta sobib vabalt valitud skeeminimega |
| Taastatud `SELECT` vs tööpäevikukirje | ainus tegelik tõend, et taastamine õnnestus sisuliselt |

## Allikad

- [MySQL — mysqldump Reference](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html)
- [OpenSSH — scp manual](https://man.openbsd.org/scp)
