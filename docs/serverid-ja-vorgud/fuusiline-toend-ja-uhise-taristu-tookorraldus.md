---
title: Füüsiline tõend ja ühise taristu töökorraldus
description: Miks kaks terminaliakent ei tõenda kahte füüsilist serverit, milliseid teenuseliike arendaja peaks ära tundma, ning kuidas käituda jagatud koolilaboris.
outline: deep
---

# Füüsiline tõend ja ühise taristu töökorraldus

::: warning Ka see osa on teooriapõhine
Sama piirang, mis [Lüliti, marsruuter ja võrguseadme tulemüür](./luliti-marsruuter-ja-vorguseadme-tulemuur) osas — päris füüsilise tõendamise harjutus vajab kooli ette valmistatud riistvara. Selle lehe lõpus on lühike, informatiivne ülevaade, milline see harjutus välja näeks, kui/kui riistvara tuleb — see **ei ole** praegu käskude jada, mida kodus läbi teha.
:::

## Meeskonna kolmekümne esimene küsimus sinule

Meeskonna auditeerija küsib midagi ebamugavat: "kust ma tean, et sinu 'kaks serverit' testi ei ole tegelikult üks masin kahe avatud terminaliaknaga?"

## Füüsiline tõend — sildid peavad vastama seadmetele

Kui hindaja (või auditeerija) peab kontrollima, et tegu on tõesti **kahe** eraldi füüsilise masinaga, ei piisa kahest terminaliaknast:

- **Salvesta seadme tähis ja roll** (mis füüsiline masin, mis nime ja rolliga).
- **Näita teenust kummastki serverist eraldi**, mitte ainult ühelt.
- **Seo võrguskeem kaablite ja portidega** — mitte ainult IP-aadressidega paberil.

::: warning Kaks terminaliakent ei tõenda kaht füüsilist serverit
Kaks SSH-seanssi (isegi kahe eri IP-ga) tõendavad kahte eri **loogilist** sihtmärki — see ei ole sama, mis tõendada kahte **füüsilist** masinat. Ekraanipilte tasub siduda kooli inventarinumbritega, kui hinnatakse just füüsilist eristust, mitte ainult loogilist teenuste eraldatust (mida meie VirtualBoxi labor juba tõendab — vt [Lüliti, marsruuter ja võrguseadme tulemüür](./luliti-marsruuter-ja-vorguseadme-tulemuur)).
:::

## Teenuseliikide valik — mida arendaja peaks ära tundma

Isegi kui õppekava jooksul kõiki neid ei paigalda, tasub arendajal osata neid nimetada ja teada nende **sõltuvusi**:

| Teenus | Ülesanne |
| --- | --- |
| Kataloogiteenus (nt LDAP) | haldab **identiteete** (kasutajad, grupid, õigused organisatsiooni tasandil) |
| Faili-/printserver | jagab ressursse (kettaruum, printerid) mitme kasutaja vahel |
| NTP | ühtlustab serverite **kella** üle võrgu |
| SNMP | toetab võrguseadmete **seiret** |

::: tip LDAP ja DNS lahendavad eri ülesandeid
LDAP käsitleb **kataloogiandmeid** (kes on kasutaja, millised on tema õigused) — DNS käsitleb **nimesid** (milline aadress vastab millisele nimele). Need kõlavad mõlemad "keskse teenusena", aga lahendavad täiesti erinevaid probleeme. Meie oma [Pordid, localhost ja oma DNS](./pordid-localhost-ja-oma-dns) osas ehitatud `dnsmasq` on DNS, mitte kataloogiteenus.
:::

::: tip NTP ja meie `timedatectl` kontroll
[Paketipüük ja rikkepäevik](./paketipuuk-ja-rikkepaevik) osas kontrollisime `timedatectl status`-iga, kas kell on sünkroniseeritud — NTP ongi see protokoll, mis seda sünkroniseerimist tegelikult teostab taustal.
:::

## Ühise taristu töökorraldus

Jagatud füüsilises laboris ei saa kõik rühmad korraga sama seadme peakraani keerata. Sellepärast:

- **Muudatus peab olema kooskõlastatud** enne, kui teed selle jagatud seadmele.
- **Iga rühm taastab algse oleku**, kui oma harjutuse osa lõpetab.
- **Kontrolltulemus kuulub õppijale** — jaamade vahetus ja individuaalne selgitus aitavad eristada, mis oli **rühma** tehtud töö ja mis on **sinu enda** oskus.

::: tip Miks lõpus taastamissamm on kohustuslik
Järgmine rühm vajab **teadaolevat algseisu** — täpselt sama distsipliin, mis [Veaotsingu järjekord ja oma DHCP katse](./veaotsing-ja-oma-dhcp-katse) osas oma ajutise DHCP katse tagasipööramisel juba nägime, ainult et jagatud füüsilises laboris on tagajärg palju laiem, kui keegi seda ei tee: kõik järgmised rühmad, mitte ainult sina ise.
:::

## Milline see harjutus välja näeks (informatiivne, mitte praegu tehtav)

Kui koolil peaks tekkima selleks eraldi füüsiline riistvara, sisaldaks harjutus kolme päris masinat:

| Seade | Roll |
| --- | --- |
| A | kaheliideseline Linuxi marsruuter **ja** Nginxi veebiserver |
| B | Apache veebiserver ja SSH testsiht (teine, sõltumatu veebitehnoloogia) |
| C | testklient |

A liigutaks pakette oma kahe füüsilise võrguliidese vahel (`sysctl net.ipv4.ip_forward=1`), ja piiraks seda läbivat liiklust `nftables` `forward` ahelaga — lubades kliendilt C ainult B veebiporti (80), aga mitte B SSH porti (22), samal ajal kui B SSH teenus ise jääb tõendatult töösse (`ss -ltnp`) — täpselt see erinevus, mida [Lüliti, marsruuter ja võrguseadme tulemüür](./luliti-marsruuter-ja-vorguseadme-tulemuur) osas INPUT vs FORWARD juures juba kontseptuaalselt käsitlesime. Harjutuse lõpus eemaldataks ainult see üks lisatud reeglistik ja jaam taaskäivitataks, et algseis taastuks järgmise rühma jaoks.

## Suur pilt: kus me praegu oleme

Meie moodul on nüüd katnud kõike, mida VirtualBoxi kodulabor ausalt katta suudab: server, virtuaalmasin, Linux, võrk, veebiteenus, andmebaas, meil, turvalisus, varundus ja seire — kõik tõendatud, mitte ainult paigaldatud. See teema tõi juurde ühe ausa piiri: **füüsilise** riistvara ja **päris võrguseadmete** tasand vajab päris füüsilist riistvara, ja meie labor ütleb seda otse, selle asemel et teeselda, nagu VM-id oleksid piisavad.

Viimane teema võtab kõik senise kokku — mitte uue tehnoloogiana, vaid **rikke ja üleandmisena**: kas suudad kõike, mida oled õppinud, rakendada olukorras, kus midagi on juba katki ja keegi teine ootab sinu selgitust.

## Kokkuvõte

| Mõiste | Tähendus |
| --- | --- |
| Füüsiline tõend | seadme tähis + roll + võrguskeem, mitte ainult IP-aadress |
| Kaks terminaliakent | tõendab loogilist eraldatust, mitte füüsilist |
| Kataloogiteenus vs DNS | identiteedid vs nimed — eri probleemid |
| Jagatud labori taastamissamm | järgmine rühm vajab teadaolevat algseisu |

## Allikad

- [nftables — ametlik käsiraamat](https://netfilter.org/projects/nftables/manpage.html)
