---
title: SSH-ühendus ja andmebaasi põhitõed
description: Lõpuks päris SSH-ühendus hostist serverisse ilma VirtualBoxi konsoolita, ning MySQL-i esimesed sammud — andmebaas, tabel ja esimesed read.
outline: deep
---

# SSH-ühendus ja andmebaasi põhitõed

::: info Õpiväljund
Pärast seda osa oskad ühenduda srv1-ga oma hosti terminalist SSH võtmega (mitte VirtualBoxi konsooliga), ning oled loonud MySQL-is oma esimese andmebaasi ja tabeli.
:::

## Meeskonna kolmeteistkümnes küsimus sinule

[SSH ja kaugühenduse võtmed](./ssh-ja-kauguhenduse-votmed) osas küsisime: "kas sa pead iga kord VirtualBoxi akna avama, et serverit hooldada?" Nüüd, kui mõlemal serveril on püsiv aadress ja SSH võtmepaar juba olemas, on aeg sellele lõplikult "ei" vastata.

## Käed külge: SSH lõpuks päriselt tööle

Vajad kahte akent korraga: **VirtualBoxi konsooli** (vana, töötav tee — ära sulge seda enne, kui uus on kontrollitult töökorras, täpselt nagu [SSH ja kaugühenduse võtmed](./ssh-ja-kauguhenduse-votmed) osas kokku leppisime) ja **hosti terminali** (uus tee, mida praegu testime).

**Hosti terminalis:**

```bash
ssh-copy-id -i ~/.ssh/koolilabor.pub oppur@192.168.56.10
```

`ssh-copy-id` ühendub kõigepealt **parooliga** (sama parool, mille panid paika [Ubuntu paigalduse](./esimese-serveri-loomine) ajal) ja lisab sinu avaliku võtme serveri `~/.ssh/authorized_keys` faili — see fail sisaldab nimekirja avalikest võtmetest, kellel on luba sisse logida. Esimesel korral küsitakse, kas usaldad serveri hostivõtit — kuvatav sõrmejälg peaks ühtima sellega, mille kontrollisid varem VirtualBoxi konsoolil (`ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub`).

```bash
ssh -i ~/.ssh/koolilabor oppur@192.168.56.10
```

Ühendub nüüd **võtmega**, mitte parooliga. Kui pärisid paroolifraasi võtme loomisel, küsitakse seda siin (see avab kohalikku privaatvõtit, mitte ei saada midagi serverisse). Oodatav tulemus: `oppur@srv1` viip — täpselt sama koht, kus varem VirtualBoxi konsoolil olid, aga nüüd oma hosti terminalist.

```bash
whoami && hostname
```

Kontroll, et oled tõesti õiges masinas õige kasutajana — sama harjumus, mis [Esimese serveri loomine](./esimese-serveri-loomine) osas juba tuttavaks sai.

::: tip Kõik selle teema ülejäänud "Kus: srv1" käsud
Jooksevad nüüd **selles SSH-seansis**, mitte enam VirtualBoxi konsoolil — nii nagu päris serverihaldus enamasti toimubki.
:::

::: warning Ära keela veel paroolisisenemist
Sama põhimõte, mis eelmises teemas: enne kui keelad SSH-l paroolisisenemise (`PasswordAuthentication no`), veendu **mitmel korral ja uues aknas**, et võtmega sisselogimine töötab usaldusväärselt. See samm ei kuulu veel praegusesse teemasse — jätame selle hilisemasse turvateemasse, kus vaatame kogu SSH kõvendamist korraga.
:::

## Andmebaasiserver — hallatud arhiiv

**Server** haldab andmeid ja samaaegset ligipääsu — nagu arhivaar, kes ei lase igal külastajal riiulilt endale meelepäraseid asju otsida, vaid kontrollib õigusi ja otsib soovitud kirjed ise. **Klient** (`mysql` käsurea tööriist, DBeaver) saadab päringuid serverile; klient ise andmeid ei salvesta.

::: tip Kes on server, kes klient
MySQL protsess srv1 peal on server. `mysql` käsurea tööriist ja DBeaver (mida kohtame hiljem selles teemas) on mõlemad **kliendid** — erinevad tööviisid sama serveriga rääkimiseks, mitte kaks eri serverit.
:::

## Tabel ja võti

**Tabel** koosneb ridadest ja veergudest. **Primaarvõti** identifitseerib rida üheselt — nagu raamatukogu registrinumber, mitte raamatu pealkiri (pealkirju võib korduda, registrinumbrit mitte). **Andmetüüp** piirab, milline väärtus veergu üldse mahub.

**Seosed** (võõrvõtmed) viitavad teise tabeli reale ja kaitsevad andmete terviklust — andmebaas ise takistab viidet olematule reale, isegi kui rakenduskoodis peaks olema viga. Selle mooduli väike `notes` tabel seoseid veel ei kasuta; need tulevad mängu suuremate skeemide juures.

## Käed külge: MySQL srv1 peal

```bash
sudo apt install mysql-server
```

Paigaldab Ubuntu hoidla MySQL serveri.

```bash
sudo systemctl enable --now mysql
```

Sama muster, mis [Rakendus ja pöördproksi](./rakendus-ja-poordproksi) osas: `enable` seadistab automaatse käivituse, `--now` käivitab kohe — andmebaas peab töötama sõltumatult sellest, kas keegi parasjagu sisse on loginud.

```bash
sudo mysql
```

Avab kohaliku administraatori SQL kliendi Ubuntu tavapärase socket-autentimise kaudu (rohkem socketi kohta järgmises osas). Oodatav tulemus: `mysql>` viip. Kõik järgmised plokid on **SQL**, mitte Bash — need lähevad selle viiba sisse.

```sql
CREATE DATABASE koolilab CHARACTER SET utf8mb4;
```

Loob `koolilab` andmebaasi UTF-8 märgistikuga (täpitähed jäävad õigesti kirja). Semikoolon lõpetab SQL käsu.

```sql
USE koolilab;
```

Valib aktiivse andmebaasi — järgmised tabelikäsud lähevad nüüd õigesse skeemi.

```sql
CREATE TABLE notes (id INT PRIMARY KEY AUTO_INCREMENT, body VARCHAR(200) NOT NULL) ENGINE=InnoDB;
```

`id` on kasvav primaarvõti, `body` on kuni 200 märgiga kohustuslik tekst. `InnoDB` on mootor, mis toetab transaktsioone — neid vajame juba järgmises osas.

```sql
INSERT INTO notes (body) VALUES ('Esimene laborikirje'), ('Taastamise kontrollkirje');
```

Lisab kaks näidisrida — hiljem võrdleme nende sisu taastatud andmetega.

```sql
SELECT * FROM notes ORDER BY id;
```

Loeb read `id` järgi kasvavas järjestuses. Oodatav tulemus: id 1 ja 2 koos oma tekstidega.

```sql
EXIT;
```

Sulgeb `mysql` kliendi, tagasi tavalise shelli viiba juurde.

## Kokkuvõte

| Mõiste / käsk | Tähendus |
| --- | --- |
| `ssh-copy-id` | lisab avaliku võtme serveri `authorized_keys` faili, parooli abil ühekordselt |
| `ssh -i <võti> oppur@...` | ühendus võtmega, ilma VirtualBoxi konsoolita |
| Server vs klient | MySQL protsess vs `mysql`/DBeaver, kes talle päringuid saadavad |
| Primaarvõti | identifitseerib rea üheselt, erinevalt nt nimest |
| `CREATE DATABASE` / `CREATE TABLE` | uus skeem, uus struktuur |

## Allikad

- [ssh-copy-id manual](https://man.openbsd.org/ssh-copy-id)
- [MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/)
