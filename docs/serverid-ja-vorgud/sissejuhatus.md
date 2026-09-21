---
title: Serverid ja võrgud
description: Sissejuhatus serverite ja võrgutehnoloogiate valikainesse — lugu väikesest arendustiimist, kes vajab oma serverikeskkonda.
outline: deep
---

# Serverid ja võrgud

::: info Tulemus
Selle valikaine lõpuks oskad üles ehitada, turvata, jälgida ja taastada väikese arendustiimi serverikeskkonna — veebiteenuse, andmebaasi ja e-posti — ning suudad iga sammu juures selgitada, miks see just nii on tehtud.
:::

## Lugu, mis meid läbi kursuse saadab

Sa oled äsja liitunud väikese arendustiimiga nooremarendajana. Meeskonna rakendus on peaaegu valmis, aga seni on see töötanud ainult ühe arendaja enda sülearvutis. Nüüd on vaja päris keskkonda: kohta, kus rakendus reaalselt töötab, kust kolleegid ja testijad saavad selle kätte, kus on olemas andmebaas testandmete hoidmiseks, ja kus saab katsetada e-kirjade saatmist, ilma et keegi kogemata mõne päris kliendini kirja saadaks.

Sinu ülesandeks saab: **ehita, turva, jälgi ja anna üle** see keskkond. Sa ei tee seda päris ettevõtte serveris — kõik toimub sinu enda arvutis, virtuaalmasinates, sinu enda väikeses harjutusvõrgus. Aga iga otsus, mille seal teed, on täpselt sama otsus, mida peaksid tegema ka pärismaailmas.

Iga järgnev teema on üks samm sellel teekonnal: üks konkreetne asi, mida meeskond sinult ootab, ja üks konkreetne "miks" selle taga. Kui midagi jääb arusaamatuks, on see materjali viga, mitte sinu oma — ütle julgelt, mis kohast aru ei saanud, siis saame selle koha selgemaks kirjutada.

## Mida see valikaine katab

1. [Server ja tema oma aadress](./server-ja-oma-ip-aadress) — mis on server, ja kust tuleb aadress, millega teda üldse leida saab
2. Virtuaalmasina ehitamine nullist
   - [VirtualBoxi ja võrgu ettevalmistus](./virtualboxi-ja-vorgu-ettevalmistus)
   - [Esimese serveri loomine](./esimese-serveri-loomine)
   - [Teine server ja esimene snapshot](./teine-server-ja-snapshot)
3. Linux, failid, õigused ja kaughaldus
   - [Failisüsteem ja failiõigused serveris](./failisusteem-ja-oigused-serveris)
   - [Protsessid, teenused ja logid](./protsessid-teenused-ja-logid)
   - [SSH ja kaugühenduse võtmed](./ssh-ja-kauguhenduse-votmed)
4. Oma DNS ja DHCP
   - [Liidesed ja püsiv IP-aadress](./liidesed-ja-pusiv-ip-aadress)
   - [Pordid, localhost ja oma DNS](./pordid-localhost-ja-oma-dns)
   - [Veaotsingu järjekord ja oma DHCP katse](./veaotsing-ja-oma-dhcp-katse)
5. Veebiserver ja rakenduse käivitamine
   - [Nginx ja staatiline sait](./nginx-ja-staatiline-sait)
   - [Rakendus ja pöördproksi](./rakendus-ja-poordproksi)
   - [Teenuse tervis ja veaotsing](./teenuse-tervis-ja-veaotsing)
6. Andmebaasi haldus CLI ja GUI abil
   - [SSH-ühendus ja andmebaasi põhitõed](./ssh-uhendus-ja-andmebaasi-pohitoed)
   - [Kasutajad, õigused ja tehingud](./kasutajad-oigused-ja-tehingud)
   - [SSH tunnel ja graafiline haldus](./ssh-tunnel-ja-graafiline-haldus)
7. Tulemüür, HTTPS ja serveri turvalisus
   - [Tulemüür ja UFW](./tulemuur-ja-ufw)
   - [HTTPS ja TLS](./https-ja-tls)
   - [SSH kõvendamine ja negatiivne test](./ssh-kovendamine-ja-negatiivne-test)
8. Oma e-posti server
   - [Meiliserveri põhitõed ja postkastid](./meiliserveri-pohitoed-ja-postkastid)
   - [Postfix ja Dovecot seadistus](./postfix-ja-dovecot-seadistus)
   - [srv2 tulemüür ja avatud edastus](./srv2-tulemuur-ja-avatud-edastus)
   - [Thunderbird ja meili tõendamine](./thunderbird-ja-meili-toendamine)
9. Varundamine, taastamine ja migreerimine
   - [Varunduse põhimõtted ja CLI dump](./varunduse-pohimotted-ja-cli-dump)
   - [Taastamine teise serverisse](./taastamine-teise-serverisse)
   - [GUI varundus DBeaveriga](./gui-varundus-dbeaveriga)
   - [Teenuse teisaldamine ja sõltumatu koopia](./teenuse-teisaldamine-ja-soltumatu-koopia)
10. Seire ja võrguliikluse analüüs
    - [Cockpit ja teenuste inventar](./cockpit-ja-teenuste-inventar)
    - [Perioodiline tervisekontroll](./perioodiline-tervisekontroll)
    - [Paketipüük ja rikkepäevik](./paketipuuk-ja-rikkepaevik)
11. Füüsilised serverid ja võrguseadmed *(teooria olemas, käed-külge vajab kooli riistvara)*
    - [Lüliti, marsruuter ja võrguseadme tulemüür](./luliti-marsruuter-ja-vorguseadme-tulemuur)
    - [Füüsiline tõend ja ühise taristu töökorraldus](./fuusiline-toend-ja-uhise-taristu-tookorraldus)
12. Lõpuprojekt: keskkonna üleandmine
    - [Ülesanne ja vastuvõtukatsed](./loppprojekt-ulesanne-ja-vastuvotukatsed)
    - [Rikked, kaitsmine ja üleandmine](./rikked-kaitsmine-ja-uleandmine)

## Eeldatavad eelteadmised

See valikaine ei eelda varasemat serverihalduse kogemust, ainult tavapärast arvutikasutust. Kui mõisted nagu IP-aadress, pakett või ruuter on sulle täiesti võõrad, tasub enne pilku heita [Arvutivõrgud ja küberturvalisus](/arvutivorgud/sissejuhatus) moodulisse — meie esimene teema kordab need lühidalt üle, aga läheb kohe sammu võrra sügavamale.

## Seos teiste teemadega

[Linux](/linux/sissejuhatus) moodul kattis kasutajaid, gruppe ja õigusi sinu enda WSL-keskkonnas. Siin kohtame samu mõisteid uuesti, aga päris serveris, kuhu logid sisse üle võrgu, mitte oma sülearvutis. [Nginx](/nginx/basics) ja [Docker](/docker/basics) annavad teise vaatenurga osale samale taristule.
