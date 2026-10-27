---
title: "Võrgu üleandmine ja individuaalne praktiline kontroll"
description: "Kohtumine 11: Karli mängukeskuse võrgu lõpetamine, individuaalne veaotsing, projekti üleandmise kontroll, riskitabel ja enesehindamine."
outline: deep
---

# 11. Võrgu üleandmine ja individuaalne praktiline kontroll

::: info Õpiväljund
Pärast kohtumist oskad tõendada võrgu toimimist, leida ja parandada ühe seadistusvea ning anda üle dokumenteeritud võrguprojekti.
:::

## Mis Karli keskuses nüüd juhtub?

Karli keskus avatakse nädala pärast. Karl ei hakka ise iga päev võrku haldama. Mirjam peab seda **dokumentatsiooni järgi** edasi arendama ja vea korral parandama. Täna kontrollime kahte asja:

1. kas **sinu võrk** töötab ja on dokumenteeritud nii, et keegi teine saab selle üle võtta;
2. kas **sina** oskad leida ja parandada vea, mida sa ise ei teinud.

## Kontrollplaan (90 minutit)

| Aeg | Tegevus |
| --- | --- |
| 20 min | Lõpeta pooleliolev võrgutöö ja korda toimivuse kontrolle |
| 30 min | Individuaalne veaotsing |
| 25 min | Võrgu üleandmise kontroll ja lühiselgitused |
| 15 min | Riskitabel ja enesehindamine |

## 1. Individuaalne veaotsing

Tee koos paarilisega toimivast **enda ehitatud võrgust koopia**. Õpetaja valib varem harjutatud vealiigi ning üks paariline muudab koopias ühte seadet, teine otsib ja parandab vea. Seejärel vahetage rolle. Toimiv algfail jääb alles; õpetajal pole vaja vigast võrgufaili ette valmistada. Viga võib olla:

- vale IP või mask;
- vale gateway;
- vale DHCP seadistus;
- vale DNS;
- vale ligipääsupiirang: leia õpetaja antud tavakeelse reeglitabeli ja näidise abil erinevus. Reeglite mälu järgi koostamist ei nõuta.

Kasuta kliendi **praegust** DHCP-aadressi, mitte varasemast tabelist meelde jäänud `.21` või `.22` väärtust. Enne kliendi parameetrite parandamist erista, kas viga on DHCP-poolis või ainult kliendis. Kui muudad pooli lüüsi või DNS-i, küsi kliendil pärast muudatust seadistus uuesti ja kontrolli saadud väärtust.

Sinu töö:

1. Kirjuta üles **sümptom**: mida kasutaja näeb ("leht ei avane", "ei saa aadressi").
2. Otsi viga **süsteemselt**. Kasuta kohtumisel 7 õpitud veaotsingu loogikat: IP-ühendus, siis HTTP, siis DNS. Siis vaata seadistusi.
3. **Nimeta põhjus.**
4. **Paranda.**
5. Tee **järelkontroll**: näita, et sümptom on kadunud, ja kontrolli, et midagi muud ei läinud katki.

| Veaprotokolli lahter | Mida kirjutad |
| --- | --- |
| Sümptom | Mida kasutaja nägi |
| Kontrollid | Mida proovisid ja mis tulemusega |
| Põhjus | Mis oli tegelikult valesti |
| Parandus | Mida muutsid |
| Järelkontroll | Kuidas tõestasid, et töötab |

## 2. Üleandmise kontroll

Keegi teine peab saama sinu võrgu üle võtta. Koormusarvutus on eraldi valikuline lisaharjutus, mitte selle kohtumise hindamisnõue. Kontrollime:

| Dokument | Kas on olemas? |
| --- | --- |
| Töötav `.pkt` fail | |
| Füüsiline skeem | |
| Loogiline skeem | |
| Aadressitabel: staatilised aadressid, DHCP-poolid, välistused, DNS-id ja viimati kontrollitud kliendiaadressid | |
| Ligipääsumaatriks | |
| Kontrolliprotokoll (lubatud ja keelatud testid) | |
| Riskianalüüs (vähemalt 3 riski) | |
| Seadmete loend | |
| Muudatuste päevik ja taastamise juhis | |

**Taastamise juhis** ütleb, kuidas toimiv seis tagasi saada. Märgi toimiva `.pkt` faili nimi, vajadusel kliendil DHCP-seadistuse uuesti küsimine ning järelkontrollid: renditabel, kliendi IP/mask/lüüs/DNS, sisemine HTTP Gamingust ja Staffist, välise lehe avanemine Guestist ning sisemise teenuse keeld Guestile.

DHCP-kliendi hetke-IP on **vaatluse tulemus**, mitte lubadus, et klient saab alati sama aadressi. Üleandmisel peavad plaanis eraldi nähtuma:

- Gaming ja Staff DHCP-vahemikud `.21–.200`, oma LAN-i lüüs ja sisemine DNS `192.168.20.10`;
- Guest DHCP-vahemik `.21–.200`, lüüs `192.168.30.1` ning välise DNS-serveri aadress;
- staatiline server `192.168.20.10`, ruuteri liidesed ja nende välistused;
- enda ehitatud väline server `203.0.113.10`, ruuterite ühendus ja edasi-/tagasiteed; selles suletud laboris NAT-i ei kasutata.

Viimase kontrolli ajal peab serveri aadress olema taastatud ning kõik veakatsete muudatused eemaldatud. Salvesta ruuteri seadistus ja lõplik fail.

Suure rühma korral selgitatakse paarides kontroll-lehe abil. Õpetaja vaatleb praktilist tööd ja kontrollib kirjalikke põhjendusi.

Juhendit järgides jätkad alati enda salvestatud failist. Märgi muudatuste päevikusse, mida igas etapis ise lisasid, ja säilita viimase toimiva etapi koopia.

## 3. Riskitabel

Koosta tabel **vähemalt kolme** riskiga mängukeskuse võrgule. Näited:

| Risk | Mõju mängukeskusele | Meede |
| --- | --- | --- |
| Külaline pääseb Staff serverisse | Andmed lekivad, server rikutakse | ACL Guest võrgul |
| Ruuteri haldus on avatud | Keegi muudab seadistust ja keskus seisab | Haldusparool, kaughalduse keelamine |
| Serveri aadress muutub (DHCP) | Leht ei avane | Staatiline aadress, välistus DHCP-s |

Lisa võimalusel ka **arvuti** ja **tarkvara** risk, mis ei seondu otseselt võrguga (nt uuendamata töötaja arvuti, liiga laiad failiõigused). Neid käsitleb [küberturvalisuse lugemismaterjal](/kuberturvalisus/sissejuhatus).

## 4. Enesehindamine

Vasta lühidalt:

1. Mida ma oskan nüüd teha, mida enne ei osanud?
2. Mis oli kõige raskem ja kuidas ma sellega hakkama sain?
3. Mida ma veel ei oska?

Paroolipoliitika, tarkvarauuenduste ja kasutaja- ning failiõiguste teemad on [küberturvalisuse lugemismaterjalis](/kuberturvalisus/sissejuhatus).

## Esitatav töö

- Lõplik projektikomplekt (tabel üleandmise kontrollist).
- Individuaalne veaprotokoll.
- Riskitabel ja enesehindamine.

**Kontroll:** nimeta põhjus, paranda see ja näita tegelikku järelkontrolli.

## Mis edasi?

Kui sinu võrk töötab ja on dokumenteeritud, on hea jätk:

- VLAN-id ühe kommutaatori eraldamiseks;
- päris seadmetel ehitamine.
