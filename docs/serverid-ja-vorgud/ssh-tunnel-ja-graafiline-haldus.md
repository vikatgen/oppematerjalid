---
title: SSH tunnel ja graafiline haldus
description: Kuidas kasutada graafilist andmebaasiklienti (DBeaver) turvaliselt SSH tunneli kaudu, ilma et andmebaas peaks kunagi otse võrgust ligipääsetav olema.
outline: deep
---

# SSH tunnel ja graafiline haldus

::: info Õpiväljund
Pärast seda osa oskad selgitada, mis vahe on Unix socketil ja TCP ühendusel, oled loonud SSH tunneli oma hostist srv1 MySQL-ini, ning kasutanud DBeaverit selle tunneli kaudu — nii lugeja kui rakenduskontoga.
:::

## Meeskonna viieteistkümnes küsimus sinule

Käsurida on täpne, aga tabeli sisu käsurealt lugeda on tüütu. Meeskonna andmeanalüütik tahab andmeid **näha**, mitte ainult `SELECT * FROM notes;` tulemust terminalis lugeda. Vaja on graafilist tööriista — aga turvaliselt, ilma et andmebaas peaks selleks otse internetile (ega isegi kogu koolivõrgule) avatud olema.

## Socket ja TCP — kaks eri ust

**Kohalik Unix socket** on ühendus, mis ei kasuta TCP porti üldse — see töötab ainult **samas masinas**, failisüsteemi kaudu (see ongi see, mida `sudo mysql` seni kasutas). **TCP ühendus** kasutab IP-d ja porti, ning saab liikuda üle võrgu.

::: tip Mälupilt
Samas majas saab kasutada sisemist teenindusluuki (socket) — väljastpoolt tulija peab aga kasutama välisust ja aadressi (TCP). Meie MySQL kuulab TCP-d ainult loopbackil (`127.0.0.1:3306`), nii nagu [eelmises osas](./kasutajad-oigused-ja-tehingud) `ss -ltnp`-ga kontrollisime — see ei ole väljastpoolt masinat ligipääsetav kummalgi moel, otse.
:::

**SSH tunnel** viib TCP ühenduse krüpteeritult serverisse: sinu hosti kohalik port "edastatakse" üle olemasoleva SSH ühenduse serveri loopbackile. Nii ei pea porti 3306 kunagi koolivõrku avama — kogu liiklus käib juba usaldatud SSH raja kaudu, mille [eelmises osas](./ssh-uhendus-ja-andmebaasi-pohitoed) üles seadsime.

## CLI ja GUI — sama sihtkoht, eri tööviis

Kaardi vaatamine ja aadressi kirja panemine viivad samasse kohta, aga eri viisil. **CLI** (`mysql` klient) sobib korratavaks, skriptitavaks halduseks. **GUI** (DBeaver) aitab andmeid ja struktuuri visuaalselt uurida. GUI **ei kõrvalda** vajadust mõista, millist SQL-i ja millises serveris/andmebaasis parasjagu käivitatakse.

::: warning Enne GUI kustutusnuppu
Kontrolli alati kolme asja: milline **server** ja **andmebaas** on parasjagu aktiivsed selles GUI aknas (mitu avatud ühendust võivad segamini minna), milline **objekt** (tabel/rida) on valitud, ja kui suur on kavandatava muudatuse **ulatus**. GUI-s on eksliku kliki hind sama, mis käsurealt `WHERE`-ta `DELETE` käivitamisel.
:::

## Kaks kiiret asja veel

**Indeks** kiirendab sobivaid otsinguid — nagu raamatu sisukord, mis aitab peatükki kiiresti leida. Aga indeks võtab ruumi ja iga kirjutamine peab ka indeksit uuendama — rohkem indekseid ei tee automaatselt kogu rakendust kiiremaks, sobiv indeks sõltub sellest, milliseid päringuid tegelikult tehakse.

**Haldusseisundi kontroll** vajab mitut tasandit korraga: teenuse olek (`systemctl status mysql`) näitab, et **protsess** töötab — mitte, et konkreetne tabel või rida on olemas. Täpselt sama õppetund, mis [Teenuse tervis ja veaotsing](./teenuse-tervis-ja-veaotsing) osas 502 vea juures: käimasolev teenus ei tõenda, et see sisuliselt õigesti vastab.

## Käed külge: SSH tunnel ja DBeaver

1. Paigalda hosti [DBeaver Community](https://dbeaver.io/download/). Esimesel käivitusel võib see küsida MySQL JDBC draiveri allalaadimist.
2. Ava hosti terminalis **uus, eraldi aken** ja käivita:

```bash
ssh -N -L 13306:127.0.0.1:3306 -i ~/.ssh/koolilabor oppur@192.168.56.10
```

`-N` ei ava kaugshelli (me ei taha siin terminali, ainult tunnelit). `-L` seob hosti kohaliku pordi `13306` serveri vaates oleva `127.0.0.1:3306` külge. `-i` valib võtme, mille [SSH-ühendus ja andmebaasi põhitõed](./ssh-uhendus-ja-andmebaasi-pohitoed) osas juba kasutasime.

::: tip Terminal näib "kinni jäänud" — see on oodatud
See aken ei näita enam viipa, sest see hoiab tunnelit lahti. **Jäta see aken avatuks** kogu DBeaveriga töötamise ajaks. Kui port 13306 on juba hõivatud, vali mõni muu vaba kohalik port ja kasuta sama numbrit ka DBeaveri seadetes.
:::

3. DBeaveris: **New Database Connection → MySQL**. Host `127.0.0.1`, port `13306`, database `koolilab`, kasutaja `labreader`, parool see, mille [eelmises osas](./kasutajad-oigused-ja-tehingud) määrasid.
4. **Test Connection**. Ära aktiveeri DBeaveri enda sisseehitatud SSH tunnelit — väline tunnel juba töötab, kaks tunnelit korraga segavad üksteist. Kui MySQL draiver keeldub RSA võtme hankimisest (*Public Key Retrieval is not allowed*), luba **ainult selles loopback+SSH-tunnel laboris** draiveri seadetes `allowPublicKeyRetrieval=true`. Väline transport on juba SSH-ga kaitstud — päris tootmiskeskkonnas valiksid selle asemel kontrollitud DB TLS/sertifikaadi seadistuse, mitte pime erandi kopeerimise.
5. Ava `koolilab` → `Tables` → `notes` → **View Data**. Võrdle ridu selle sisuga, mille varem käsurealt nägid.
6. Proovi SQL editoris muuta lugejakontoga (`labreader`) ühe rea `body` väärtust. Oodatav tulemus: õiguste puudumise viga — täpselt see, mille [eelmises osas](./kasutajad-oigused-ja-tehingud) `GRANT SELECT`-iga kavatsesimegi. Jäta andmed muutmata.
7. Tee **teine** DBeaveri ühendus samale aadressile ja pordile, kasutajaks `labapp`. Muuda GUI kaudu ühe rea teksti, kinnita muudatus kliendi Save/Commit toiminguga, ja kontrolli tulemust `mysql` käsurealt (SSH-seansis) `SELECT`-iga — see on sinu tõend, et graafiline haldus töötab tervelt läbi tunneli.
8. Sulge tunneli aken (`Ctrl+C`) ja näita, et uus DB-ühendus enam ei õnnestu. Ava tunnel uuesti, kui vajad edasist tööd.

## Rakenduse saladused

Kõik paroolid, mida selles teemas lõid (`labreader`, `labapp`), kuuluvad samasse kategooriasse, mida [Keskkonnamuutujad](/arendusvahendid-i/keskkonnamuutujad) osas juba käsitlesime: need ei kuulu Gitisse, ekraanipiltidele ega logidesse. Kui rakendus hiljem päriselt neid kontosid kasutama hakkab, loeb ta parooli keskkonnamuutujast või `.env` failist — mitte kõvasti koodi sisse kirjutatuna.

::: warning `.env` failinimi üksi ei taga turvalisust
Vaja on ka õigeid failiõigusi, õiget asukohta (väljaspool veebiserveri jagatavat kausta), ja veendumust, et fail kunagi hoidlasse ei satu. Sama loogika, mis [Nginx ja staatiline sait](./nginx-ja-staatiline-sait) osas — päris turvalisus koosneb mitmest kihist korraga, mitte ühest õigest failinimest.
:::

## Esitatav tõend

Meeskonnale kinnituseks jäta alles:

- Skeem ja `notes` tabeli struktuur.
- `SELECT` tulemus andmetega.
- Rollbacki tulemus (eelmisest osast).
- `labreader` õiguste keeld GUI-s.
- `labapp` GUI-muudatuse kinnitus käsurealt.
- Lühike selgitus socketi, TCP ja tunneli erinevuse kohta.

## Suur pilt: kus me praegu oleme

Meeskonnal on nüüd päris tööriistarida käes: veebiteenus, mis vastab brauserile, ja andmebaas, kuhu andmeid püsivalt salvestada — koos kontrollitud kasutajate ja õigustega mõlemal pool. Sa oskad ka juba ühenduda serveritega ilma VirtualBoxi akent avamata, ja tead, kuidas graafilist tööriista kasutada turvaliselt, ilma et miski peaks selleks otse internetile avatud olema.

Praegu on kõik siiani tehtu kaitstud ainult host-only võrgu piiratuse ja loopback-sidumiste najal — päris tulemüüri ega HTTPS-i pole veel kordagi vaja olnud. Järgmine teema toobki meeskonna järgmise, otsesema palve: "kuidas me teame, et keegi väljastpoolt ei pääse ligi asjadele, mida nad ei tohiks näha?"

## Kokkuvõte

| Mõiste / käsk | Tähendus |
| --- | --- |
| Unix socket | kohalik ühendus, ei kasuta TCP porti |
| SSH tunnel (`-L`) | krüpteeritud "toru" hosti kohaliku pordi ja serveri loopbacki vahel |
| CLI vs GUI | sama sihtkoht, eri tööviis — mõlemad vajavad kontrollitud õigusi |
| Indeks | kiirendab valitud päringuid, aga maksab kirjutamisel ja ruumis |
| Teenuse olek ≠ andmete sisu | `active` tõendab protsessi, mitte konkreetse tabeli olemasolu |
| MySQL paroolid | samad reeglid mis `.env` saladustel — mitte Gitisse, ekraanipilti ega logisse |

## Allikad

- [MySQL — Connecting to the Server Using URI-Like Strings or Key-Value Pairs](https://dev.mysql.com/doc/refman/8.0/en/connecting-using-uri-or-key-value-pairs.html)
- [OpenSSH — port forwarding (`-L`)](https://man.openbsd.org/ssh)
- [DBeaver — Database Connection Drivers](https://dbeaver.com/docs/dbeaver/Database-drivers/)
