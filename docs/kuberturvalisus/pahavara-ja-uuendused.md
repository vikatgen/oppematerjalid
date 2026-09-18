---
title: Pahavara, uuendused, varukoopiad ja Wi-Fi turvalisus
description: Õpi, mis on pahavara, miks tarkvarauuendused ja varukoopiad on olulised ning millised on ebaturvalise Wi-Fi riskid.
outline: deep
---

# Pahavara, uuendused, varukoopiad ja Wi-Fi turvalisus

::: info Õpiväljund
Pärast õppetundi tunned ära peamised küberturvalisuse riskid ja oskad koostada lihtsat turvaplaani.
:::

## Pahavara

**Pahavara** (*malware*) on tarkvara, mis on loodud seadet kahjustama, andmeid varastama või seadme üle kontrolli võtma sinu teadmata. Levinud tegevused: andmete varastamine, failide lukustamine (lunavara ehk *ransomware*), seadme kasutamine ilma sinu teadmata muudeks rünnakuteks.

## Miks tarkvarauuendused on olulised?

Tarkvaravigu, mida keegi ei ole veel parandanud, saavad ründajad ära kasutada seadmele ligipääsuks. Uuendused parandavad täpselt selliseid auke — kui uuendust ei paigalda, jääb auk lahti.

::: details Reaalne juhtum: WannaCry (2017)
12. mail 2017 levis lunavara **WannaCry** üle 200 000 arvutisse rohkem kui 100 riigis ühe nädalavahetusega. Ühendkuningriigi riiklik tervishoiuteenistus (NHS) oli üks kõvasti kannatanuid: mõjutatud oli 81 NHS-i asutust 236-st, pluss 603 muud NHS-organisatsiooni (sh 595 perearstikeskust), mille tõttu tühistati hinnanguliselt ~20 000 vastuvõttu ja operatsiooni.

Ühendkuningriigi riigikontrolli (National Audit Office) analüüs tõi peapõhjusena esile, et mõjutatud organisatsioonid kasutasid **uuendamata või toetuseta jäänud Windowsi versioone** — sama pahavara ei saanud kahjustada süsteeme, mille turvauuendus oli juba paigaldatud.

*Allikas: [UK National Audit Office — Investigation: WannaCry cyber attack and the NHS](https://www.nao.org.uk/reports/investigation-wannacry-cyber-attack-and-the-nhs/)*
:::

See on kõige selgem näide, miks "tüütu uuenduse teade" on tegelikult turvameede, mitte lihtsalt ebamugavus.

## Varukoopiad

Kui pahavara (nt lunavara) juba failid lukustas või kustutas, on **varukoopia** (*backup*) sageli ainus viis andmed tagasi saada ilma lunaraha maksmata. Reegel: hoia varukoopiat kohas, mis ei ole otse ühendatud seadmega, mida kaitsed (nt eraldi kõvaketas või pilveteenus).

## Wi-Fi turvalisus

Avalikud, kaitsmata Wi-Fi võrgud (nt kohvikus, lennujaamas) võimaldavad teistel samas võrgus põhimõtteliselt su liiklust pealt kuulata. Praktilised reeglid:

- väldi paroolide või pangaandmete sisestamist avalikus, kaitsmata Wi-Fis;
- eelista mobiilset andmesidet või usaldusväärset võrku tundliku tegevuse jaoks;
- kodus kasuta Wi-Fi võrgul alati parooli (mitte "avatud" võrku).

## Kokkuvõte

| Risk | Kaitsemeede |
| --- | --- |
| Pahavara | Ettevaatlik allalaadimine, viirusetõrje |
| Uuendamata tarkvara | Paigalda uuendused kohe, kui need saadaval |
| Andmete kaotus (lunavara) | Regulaarsed varukoopiad eraldi asukohas |
| Ebaturvaline Wi-Fi | Väldi tundlikke tegevusi avalikus võrgus |

## Allikad

- [CISA — Secure Our World](https://www.cisa.gov/secure-our-world)
- [UK National Audit Office — Investigation: WannaCry cyber attack and the NHS](https://www.nao.org.uk/reports/investigation-wannacry-cyber-attack-and-the-nhs/)
