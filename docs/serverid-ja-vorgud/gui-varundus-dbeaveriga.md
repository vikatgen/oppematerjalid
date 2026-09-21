---
title: GUI varundus DBeaveriga
description: Kuidas kasutada DBeaveri graafilist varundus- ja taastamistoimingut, mis päriselt käivitab sama mysqldump tööriista, ning mida see üksi ei tõenda.
outline: deep
---

# GUI varundus DBeaveriga

::: info Õpiväljund
Pärast seda osa oskad selgitada, miks DBeaveri "Backup" nupp taga on ikkagi sama `mysqldump` mis käsurealgi, ning oled teinud graafilise varundus- ja taastamistsükli täieliku läbi, koos tulemuse kontrolliga.
:::

## Meeskonna kahekümne viies küsimus sinule

Käsurida on täpne, aga meeskonna andmeanalüütik (kes [SSH tunnel ja graafiline haldus](./ssh-tunnel-ja-graafiline-haldus) osast juba DBeaverit tunneb) küsib: "kas mina saan ka ise varukoopiat teha, ilma terminalita?"

## GUI varundus — nupp on ainult juhtpaneel

**Graafiline klient võib käivitada kohaliku native tööriista** — DBeaveri "Backup" toiming ei tee midagi maagilist, ta käivitab lihtsalt sinu **hosti masinas** installitud `mysqldump` sama moodi, nagu [Varunduse põhimõtted ja CLI dump](./varunduse-pohimotted-ja-cli-dump) osas käsurealt tegime.

::: warning Nupu taga peab tööriist tegelikult olemas olema
Selle taga töötav programm (`mysqldump`) peab hosti masinas paigaldatud olema, ja versioon-parameetrid peavad sobima. DBeaver küsib **Local Client / Client Home** asukohta just seetõttu — native backup kasutab kohalikku `mysqldump` programmi, mitte midagi serveris või DBeaveri enda sees töötavat.
:::

**Valikud määravad varukoopia ulatuse** — eksporditud **tabel** ei pruugi olla terve **andmebaasi** varukoopia. Kontrolli alati, mida täpselt valisid, samamoodi nagu [SSH tunnel ja graafiline haldus](./ssh-tunnel-ja-graafiline-haldus) osas GUI kustutusnupu eel soovitasime.

## Õigused ja krüpteerimine — dump on väärtuslikum kui üks leht

Dump võib sisaldada **isikuandmeid** — ja tervikuna on see sageli väärtuslikum sihtmärk kui üks nähtav veebileht, sest seal on **kõik** andmed korraga, mitte ainult see, mis parasjagu ekraanil on. Ligipääs varukoopiale peab olema piiratud, ja nii transport kui säilitamine vajavad kaitset.

::: warning `.sql` fail ei kuulu avalikku Gitisse
Üldiselt ei sobi dump avalikku hoidlasse, välja arvatud teadlikult avalikud näidisandmed (nagu meie labori omad, kui otsustate need ise avalikuks teha). Sama põhimõte, mis [SSH tunnel ja graafiline haldus](./ssh-tunnel-ja-graafiline-haldus) osas `.env` saladuste kohta.
:::

## Käed külge: hoolduskonto ettevalmistus

**Kus: srv1**, `sudo mysql` sees. Sama muster, mis [Kasutajad, õigused ja tehingud](./kasutajad-oigused-ja-tehingud) osast tuttav.

```sql
CREATE USER 'labmaint'@'localhost' IDENTIFIED BY 'ASENDA_UNIKAALSE_HOOLDUSPAROOLIGA';
```

Loob kohaliku hoolduskonto — asenda näidisparool unikaalse väärtusega, ära esita seda kuskil tõendina.

```sql
GRANT ALL PRIVILEGES ON koolilab.* TO 'labmaint'@'localhost';
```

Annab haldusõigused **ainult** `koolilab` skeemile, mitte kogu serverile — endiselt vähimate õiguste põhimõte, isegi hoolduskontol.

```sql
CREATE DATABASE koolilab_gui_restore CHARACTER SET utf8mb4;
GRANT ALL PRIVILEGES ON koolilab_gui_restore.* TO 'labmaint'@'localhost';
```

Loob eraldi GUI taastamise sihi (samal põhimõttel, mis [Taastamine teise serverisse](./taastamine-teise-serverisse) osas `koolilab_restore` — ei kirjuta originaali üle) ja annab samale kontole õigused ka sinna.

```sql
EXIT;
```

## Käed külge: DBeaveri native backup

**Enne algust:** õpetaja peab olema hosti ametlikust MySQL 8.0 distributsioonist eelpaigaldanud käsurea tööriistad `mysqldump` ja `mysql` (Windows: ametlik ZIP-i `bin` kaust; Mac: sama arhitektuuri ametliku paketi `bin`). **Ära paigalda selle sammu jaoks eraldi hosti andmebaasi serverit** — vaja on ainult kliendipoolseid tööriistu. GUI sildid võivad DBeaveri versiooniti erineda; alljärgnev on kontrollitav töövoog, mitte täpne menüütekst.

1. Ava sama SSH tunnel, mis [SSH tunnel ja graafiline haldus](./ssh-tunnel-ja-graafiline-haldus) osas (`ssh -N -L 13306:127.0.0.1:3306 -i ~/.ssh/koolilabor oppur@192.168.56.10`). Loo DBeaveris **uus** ühendus `labmaint` kasutajaga läbi `127.0.0.1:13306` — see konto on labori skeemihaldur, mitte rakenduse enda konto.
2. Määra DBeaveri seadetes **Local Client / Client Home** oma eelpaigaldatud kliendipaigalduse teele.
3. Paremklõps `koolilab` skeemil → **Tools → Backup** (või vastav native dump toiming). Vali kogu `koolilab` skeemi tabelid, struktuur ja andmed. Väljund: `koolilab-gui.sql` hosti backup kausta.
4. Kontrolli logist **tegelikku käsurida**, mille DBeaver käivitas — sealt näed, kas kasutati samu valikuid, mis meie käsurea dumpis (`--single-transaction`, `--no-tablespaces`, `--set-gtid-purged=OFF`). Meie väikeses skeemis pole rutiine ega sündmusi; kui neid hiljem lisatakse, vajavad need eraldi ekspordivalikuid ja õigusi.
5. **Ära kaasa** `CREATE DATABASE` või `USE koolilab` käske, kui kavatsed taastada **teise** nime alla. Ava genereeritud SQL tekstina ja kontrolli seda **enne** importi. Ära jaga SQL sisu avalikult.
6. Käivita varundus, kontrolli native tööriista edukat väljumist ja et fail pole tühi — sama distsipliin, mis käsurea `echo $?` ja `ls -lh` kontrollid.
7. Vali `koolilab_gui_restore` skeem → **Tools → Restore**, sisendiks äsja loodud SQL. Kontrolli sihtskeemi nime hoolikalt. Kui selles DBeaveri versioonis menüüs Restore puudub, kasuta sama skeemi peal **Execute SQL Script** native toimingut, mis kasutab sama `mysql` klienti — see on samuti GUI kaudu juhitud taastamine.
8. Ava taastatud `notes` tabeli **Data** vaade ja võrdle kõiki ridu, primaarvõtit ja märgistikku [Varunduse põhimõtted ja CLI dump](./varunduse-pohimotted-ja-cli-dump) osas tööpäevikusse kirjutatud algse seisuga. Esita **backup/restore protsessi edu ja taastatud sisu**, mitte ainult ekspordinupu klõpsu.

::: warning GUI native varundus pole teine sõltumatu tehnoloogia
DBeaveri native varundus kasutab **sama** `mysqldump`-i, mis käsurea variant [Varunduse põhimõtted ja CLI dump](./varunduse-pohimotted-ja-cli-dump) osas — see üksi ei tõenda kahte **sõltumatut** varundustehnoloogiat, ainult kahte eri **liidest** samale tehnoloogiale. Failiarhiiv (mida [järgmises osas](./teenuse-teisaldamine-ja-soltumatu-koopia) veebiteenuse jaoks kasutame) ja eraldi kooli varundussiht täiendavad tegelikku katvust.
:::

## Kokkuvõte

| Mõiste / käsk | Tähendus |
| --- | --- |
| DBeaveri native backup | käivitab kohaliku `mysqldump`, mitte oma eraldi mehhanismi |
| Local Client / Client Home | peab osutama päriselt paigaldatud kliendipoolsele tööriistale |
| `labmaint` konto | piiratud hoolduskonto, ainult `koolilab`+`koolilab_gui_restore` skeemidele |
| Taastamine eraldi skeemi | sama põhimõte GUI-s, mis CLI dumpi puhul |
| GUI + CLI dump | sama alustehnoloogia kahe liidesega, mitte kaks sõltumatut varundusviisi |

## Allikad

- [DBeaver — Backup and restore](https://dbeaver.com/docs/dbeaver/Backup-Restore/)
- [MySQL — mysqldump Reference](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html)
