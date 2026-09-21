---
title: Varunduse põhimõtted ja CLI dump
description: RPO ja RTO mõisted, loogiline vs failipõhine varukoopia, ning kuidas teha MySQL-ist kooskõlaline käsurea varukoopia.
outline: deep
---

# Varunduse põhimõtted ja CLI dump

::: info Õpiväljund
Pärast seda osa oskad selgitada RPO ja RTO vahet, mis vahe on loogilisel ja failipõhisel varukoopial, ning oled teinud `koolilab` andmebaasist kooskõlalise, kontrollitud käsurea varukoopia.
:::

## Meeskonna kahekümne kolmas küsimus sinule

Kõik meie kolm teenust töötavad ja on turvatud — aga meeskonna vanemarendaja küsib midagi ebamugavat: "kui `koolilab` andmebaas täna hommikul kaoks, kui palju me kaotaksime, ja kui kaua läheks taastamiseks?" See on esimene teema, kus vastame sellele küsimusele **päriselt**, mitte oletusega.

## Varunduse eesmärk — päästepaat, mida keegi pole proovinud

Varukoopia kaitseb **muutuvat andmeseisu**, ja tal peab olema teadaolev **ulatus** (mida täpselt see katab, ja mida mitte). Kõige olulisem kontroll pole varukoopia **olemasolu** — see on **taastamiskatse koos andmete kontrolliga**.

::: warning Faili olemasolu ei tõenda taastatavust
Sama loogika, mis kogu selle mooduli vältel korduvalt ette on tulnud: paigaldatud pakett ei tõenda töötavat teenust, lubatud port ei tõenda vastavat teenust — ja siin, olemasolev `.sql` fail ei tõenda, et sealt saab teenuse tegelikult uuesti üles ehitada. Taastamine on **eraldi töö**, mida käsitleme [järgmises osas](./taastamine-teise-serverisse).
:::

## RPO ja RTO — kaks eraldi mõõdikut

**RPO** (*Recovery Point Objective*) kirjeldab **lubatud andmekadu ajas** — kui varukoopia tehakse kord ööpäevas, võib halvimal juhul kaduda kuni ligikaudu päeva jagu tööd. Varundamise **sagedus** peab RPO nõuet toetama: kord päevas varundamine ei sobi kokku 15-minutilise RPO nõudega.

**RTO** (*Recovery Time Objective*) kirjeldab **lubatud taastumisaega** — kui kaua tohib teenus olla maas, enne kui taastamine peab olema lõpetatud. RTO mõõtmine algab **rikke avastamisest**, mitte alles SQL-i impordi käivitamisest — taastamisjuhendi leidmine, ligipääsude hankimine ja tegelik protsess võtavad kõik oma aja, samamoodi nagu päästepaadi leidmine ja vettelaskmine, mitte ainult sõudmine ise.

## Loogiline vs failipõhine varukoopia

**Loogiline varukoopia** (nt SQL dump) kirjeldab struktuuri ja andmeid loetaval kujul — see on taastamiseks ümber kirjutatud arhiivi sisu, mitte failide otsene koopia. **Failipõhine varundus** kopeerib koodi, seadistuse ja üleslaadimised otse failidena.

::: warning MySQL-i andmefaile ei kopeerita pimesi töötava serveri ajal
`/var/lib/mysql` kopeerimine **töötava** MySQL-i ajal ei anna usaldusväärset koopiat — andmefailid võivad olla poolel kirjutamisel. Meie labori MySQL-i varundusmeetod on **loogiline dump** (`mysqldump`), mitte failide kopeerimine. Failipõhist varundust kasutame [hiljem selles teemas](./teenuse-teisaldamine-ja-soltumatu-koopia) veebiteenuse koodi ja seadistuse jaoks — nendel pole sama "elusa andmefaili" probleemi.
:::

Dump ei sisalda **automaatselt** kogu operatsioonisüsteemi ega kõiki serverikontosid — ühe andmebaasi dump ei taasta näiteks Nginxi konfiguratsiooni.

## Kooskõlaline koopia — foto ühest hetkest

Andmed võivad varundamise **ajal** muutuda — kooskõlaline koopia peab kujutama **ühte** hetke, mitte poolt pilti enne muudatust ja poolt pärast. `mysqldump`-i `--single-transaction` valik kasutab InnoDB transaktsiooni, et andmevaade ühtlustada.

::: warning `single-transaction` ei kaitse kõike
See ei luba piiranguteta paralleelset **DDL-i** (struktuurimuudatusi, nagu `ALTER TABLE`) varundamise ajal — kõik salvestusmootorid ega operatsioonid ei käitu selle valikuga samamoodi. Meie labori väikese, muutumatu skeemi puhul pole see praktiline probleem, aga põhjus, miks valik üldse olemas on, tasub teada.
:::

## Käed külge: CLI varukoopia srv1 peal

**Enne katset:** peata kõik rakenduse andmemuutmised. Meie näidis-API ise `koolilab` andmebaasi ei kirjuta, aga kui DBeaveris on lahti aktiivseid muutmistehinguid, sulge need. Kirjuta oma tööpäevikusse `notes` tabeli **praegune** sisu, ridade arv ja kellaaeg — see on sinu hilisem võrdlusalus.

```bash
mkdir -p ~/backup
chmod 700 ~/backup
```

Loob kasutaja kodukausta varunduskausta ja piirab selle ainult omanikule — dump pole mõeldud teistele kasutajatele loetavaks.

```bash
umask 077
```

Seab **selle shelli seansi** uute failide õiguste maski — kõik selles seansis loodud uued failid saavad vaikimisi ainult omaniku ligipääsu, ilma et peaksid iga faili puhul eraldi `chmod` tegema.

```bash
sudo mysqldump --single-transaction --routines --events --no-tablespaces --set-gtid-purged=OFF koolilab > ~/backup/koolilab.sql
```

`--single-transaction` loob eespool kirjeldatud kooskõlalise vaate. `--routines`/`--events` lisavad võimalikud salvestatud protseduurid ja sündmused (meie väikeses skeemis neid pole, aga harjumus tasub luua õigesti). `--no-tablespaces` jätab tablespace käsud välja (vajavad muidu laiemaid õigusi, mida meie `labmaint`-tüüpi kontodel pole). `--set-gtid-purged=OFF` jätab replikatsiooni GTID muutmise välja — meie üksikserveri laboris pole replikatsiooni. `>` suunab väljundi faili (ja kirjutaks olemasoleva samanimelise faili üle).

```bash
echo $?
```

Näitab **eelmise käsu väljumiskoodi**. Kontrolli seda **kohe**, enne mis tahes muud käsku (isegi enne `ls`-i) — vahepealne käsk muudaks `$?` väärtuse. `0` tähendab edu; mitte-nulliga väärtusega ära jätka taastamiseni, isegi kui fail juba tekkis.

::: warning Fail võib eksisteerida ka ebaõnnestunud dumpi korral
Nullibaidine (või poolik) dump-fail võib käsu järel täiesti olemas olla — sellepärast kontrollime väljumiskoodi **ja** faili sisu eraldi, mitte ainult faili olemasolu.
:::

```bash
ls -lh ~/backup/koolilab.sql
```

Näitab faili suurust ja õigusi. Oodatav tulemus: fail suurem kui 0 baiti, õigused piiratud (mitte kõigile loetavad).

```bash
sha256sum ~/backup/koolilab.sql
```

Arvutab varukoopia sõrmejälje — salvesta see väärtus tööpäevikusse. [Järgmises osas](./taastamine-teise-serverisse) võrdleme seda ülekantud faili räsiga, et tõendada, et transport ei muutnud faili sisu.

## Kokkuvõte

| Mõiste / käsk | Tähendus |
| --- | --- |
| RPO | lubatud andmekadu ajas — sõltub varundussagedusest |
| RTO | lubatud taastumisaeg — mõõdetakse rikke avastamisest, mitte impordi algusest |
| Loogiline vs failipõhine | dump (struktuur+andmed loetaval kujul) vs otsene failikoopia |
| `--single-transaction` | kooskõlaline vaade, aga mitte piiranguteta paralleelne DDL |
| `echo $?` kohe pärast dumpi | avastab ebaõnnestunud käsu ka siis, kui fail juba tekkis |
| `sha256sum` | sõrmejälg hilisemaks transpordi kontrolliks |

## Allikad

- [MySQL — mysqldump Reference](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html)
