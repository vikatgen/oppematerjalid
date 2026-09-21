---
title: Kasutajad, õigused ja tehingud
description: Miks rakendus ei tohi kasutada root kontot, mis vahe on localhost- ja kaugkontol, ning kuidas transaktsioon ja ROLLBACK kaitsevad andmeid.
outline: deep
---

# Kasutajad, õigused ja tehingud

::: info Õpiväljund
Pärast seda osa oskad selgitada, miks rakendus vajab piiratud MySQL kontot mitte roote, mis vahe on `'kasutaja'@'localhost'` ja kaugühendusega kontol, ning oled ise katsetanud tehingu tagasivõtmist (`ROLLBACK`).
:::

## Meeskonna neliteistkümnes küsimus sinule

Meil on nüüd andmebaas ja tabel, aga kõike tegime seni administraatori (`sudo mysql`) õigustega. Meeskond küsib: "kas päris rakendus ka niimoodi andmebaasiga räägib?" Vastus on ei — ja selles osas näed, miks.

## Kasutajad ja õigused — kes tohib mida

**Administraator** hooldab struktuuri (loob tabeleid, kasutajaid). **Rakenduskonto** vajab ainult piiratud andmeõigusi — lugeda ja kirjutada andmeid, mitte muuta struktuuri ega hallata teisi kasutajaid. **Lugejakonto** ei pea saama üldse midagi muuta.

::: warning Miks mitte anda rakendusele `GRANT ALL ON *.*`
See annaks õigusi ka kõigile **teistele** andmebaasidele serveris ja kõigile haldustoimingutele — mitte ainult sellele ühele andmebaasile, mida rakendus tegelikult vajab. Kui rakenduskoodis on viga (nt SQL-injektsioon), piirab kitsas õiguste hulk kahju ulatust. Sama vähimate õiguste põhimõte, mida juba [Rakendus ja pöördproksi](./rakendus-ja-poordproksi) osas nägime `labapp` Linuxi süsteemikasutaja juures — ainult et seekord on tegu MySQL-i enda, mitte Linuxi kasutajaga. **Need kaks `labapp` kontot on täiesti eraldiseisvad** — sama nimi, aga üks on operatsioonisüsteemi kasutaja, teine MySQL-i konto.
:::

## Konto päritolu — nimi pole kogu identiteet

MySQL konto koosneb tegelikult **kahest** osast: kasutajanimest ja **hostist**, kust ühendus tuleb. `'labapp'@'localhost'` ja `'labapp'@'%'` (suvalisest hostist) on kaks **täiesti erinevat** kontot, isegi kui nimi tundub sama. Autentimine (kas parool on õige) toimub enne õiguste kontrolli (mida see konkreetne konto tohib teha) — õige parool üksi ei taga veel ühtegi SQL õigust.

## Käed külge: kaks kontot, kaks õiguste taset

Jätka samast SSH-seansist (`ssh -i ~/.ssh/koolilabor oppur@192.168.56.10`), mis [eelmises osas](./ssh-uhendus-ja-andmebaasi-pohitoed) avasid.

```bash
sudo mysql
```

```sql
CREATE USER 'labreader'@'localhost' IDENTIFIED BY 'ASENDA_UNIKAALSE_PAROOLIGA';
```

Loob kohaliku lugejakonto. **Asenda näidisparool** enne käivitamist paroolihalduris looduga — ära esita parooliga käsku kuskil tõendina (ekraanipildil, tööpäevikus).

```sql
GRANT SELECT ON koolilab.* TO 'labreader'@'localhost';
```

Annab ainult lugemisõiguse `koolilab` andmebaasi objektidele — rakendame vähimate õiguste põhimõtet.

```sql
CREATE USER 'labapp'@'localhost' IDENTIFIED BY 'ASENDA_TEISE_UNIKAALSE_PAROOLIGA';
```

Loob rakenduse andmekonto — teadlikult eraldi nii Linuxi samanimelisest kasutajast kui `labreader` kontost.

```sql
GRANT SELECT, INSERT, UPDATE, DELETE ON koolilab.* TO 'labapp'@'localhost';
```

Annab andmete kasutusõigused (lugemine, lisamine, muutmine, kustutamine), aga **mitte** tabelite loomist ega kasutajahaldust — rakenduse tavapärane töö ei pea saama muuta serveri struktuuri ega õigusi.

## Transaktsioon — kõik või mitte midagi

Mitu muudatust võivad kokku moodustada ühe tervikliku toimingu. Klassikaline näide: rahaülekanne vajab **mõlemat** poolt — ühelt kontolt maha, teisele juurde. Poolik toiming (ainult üks pool tehtud) rikub andmete tähenduse täielikult. `COMMIT` kinnitab kõik korraga, `ROLLBACK` tühistab kõik kinnitamata muudatused korraga.

::: tip Mälupilt
Jälle tehingu keskel, kui midagi läheb valesti, ei saa poolikult jätta — kas kogu tehing läheb läbi või mitte ühtegi rida sellest.
:::

::: warning ROLLBACK ei ole ajamasin
See taastab ainult **sama, käimasoleva** transaktsiooni kinnitamata muudatused — see ei taasta eile juba `COMMIT`-itud ega ammu kustutatud andmeid. Selleks on varundamine, mida käsitleme eraldi teemas.
:::

## Käed külge: rollbacki katsetus

Endiselt samas `mysql>` seansis (administraatorina):

```sql
START TRANSACTION;
```

Alustab transaktsiooni.

```sql
UPDATE notes SET body = 'Ajutine muudatus' WHERE id = 1;
```

Muudab **ainult** `id = 1` rida — praegu veel kinnitamata, ainult käimasoleva tehingu sees.

::: warning `WHERE` piirab ulatust — selle unustamine ei
`DELETE FROM notes;` ilma `WHERE`-ta kustutaks **kõik** tabeli read, mitte ühe konkreetse. Enne muutmispäringu käivitamist kontrolli alati `SELECT`-iga, millised read täpselt sihtmärgiks jäävad — loe sildid üle enne riiuli tühjendamist.
:::

```sql
ROLLBACK;
```

Tühistab selle transaktsiooni kinnitamata muudatuse — taastame algse andmeseisu ilma ühegi varukoopiata, sest muudatust polnudki veel päriselt kinnitatud.

```sql
SELECT * FROM notes ORDER BY id;
```

Kontroll: `id = 1` rea tekst peaks olema endiselt algne, mitte "Ajutine muudatus".

```sql
EXIT;
```

## Käed külge: kontrolli, et MySQL pole avalikult ligipääsetav

```bash
sudo ss -ltnp
```

`-l` kuulavad soklid, `-t` TCP, `-n` numbriliselt, `-p` protsess. Oodatav tulemus: port 3306 kuulab ainult `127.0.0.1` peal — sama loopback-põhimõte, mis [Rakendus ja pöördproksi](./rakendus-ja-poordproksi) osas juba tuttavaks sai. Kui näed selle asemel `0.0.0.0:3306`, ava `/etc/mysql/mysql.conf.d/mysqld.cnf`, muuda olemasolevat `bind-address` rida väärtuseks `127.0.0.1` (ära lisa vastuolulist teist rida) ja käivita `sudo systemctl restart mysql` — see katkestab hetkeks olemasolevad DB ühendused.

## Kokkuvõte

| Mõiste / käsk | Tähendus |
| --- | --- |
| `'kasutaja'@'localhost'` vs `'@'%'` | kaks eri kontot, isegi kui nimi sama |
| `GRANT SELECT` vs `GRANT ALL ON *.*` | ainult vajalik õigus, mitte kõik õigused kõikjal |
| MySQL `labapp` vs Linuxi `labapp` | kaks eraldiseisvat identiteeti, sama nimi on kokkulepe, mitte seos |
| `START TRANSACTION` → `ROLLBACK` | tühista kinnitamata muudatused tervikuna |
| `DELETE`/`UPDATE` ilma `WHERE`-ta | mõjutab tervet tabelit — kontrolli enne `SELECT`-iga |
| MySQL bind-address `127.0.0.1` | andmebaas pole otse võrgust ligipääsetav |

## Allikad

- [MySQL — GRANT Statement](https://dev.mysql.com/doc/refman/8.0/en/grant.html)
- [MySQL — Specifying Account Names (kasutaja@host)](https://dev.mysql.com/doc/refman/8.0/en/account-names.html)
- [MySQL — START TRANSACTION, COMMIT, ROLLBACK](https://dev.mysql.com/doc/refman/8.0/en/commit.html)
