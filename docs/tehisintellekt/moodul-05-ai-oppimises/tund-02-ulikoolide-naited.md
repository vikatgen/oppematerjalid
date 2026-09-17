---
title: 5.2 Kuidas ülikoolid AI-d õppetöösse integreerivad
description: Georgia Techi Jill Watson, Harvardi CS50 Duck, Khan Academy Khanmigo ja Stanfordi 2026. aasta katsetused — reaalsed juhtumid ülikoolide AI-integratsioonist.
---

# 5.2 Kuidas ülikoolid AI-d õppetöösse integreerivad

::: tip Selle tunni järel...
- tead nelja reaalset, nimega näidet sellest, kuidas suured ülikoolid AI-d õppetöösse integreerivad;
- oskad selgitada, miks piiratud ja põhjendatud AI-tööriist töötab paremini kui üldine vestlusassistent;
- tead ka ausat vastunäidet — mitte kõik AI-õppevahendid ei näita sõltumatult tõestatud kasu.
:::

## Georgia Tech — Jill Watson

2016. aastal ehitas Georgia Techi professor Ashok Goel oma tehisintellekti kursusele virtuaalse õppejõuassistendi **Jill Watson**. See treeniti umbes 40 000 varasema kursuse foorumipostituse peal ja vastas üliõpilaste küsimustele foorumis — nii hästi, et üliõpilased algul ei taibanudki, et tegu pole inimesega ([Georgia Tech Research](https://research.gatech.edu/jill-watson-ai-pioneer-education-turns-4); [Georgia Tech News](https://news.gatech.edu/news/2016/05/09/artificial-intelligence-course-creates-ai-teaching-assistant)).

2023. aastal, kui ChatGPT-laadsed vestlusassistendid olid juba levinud, viis Goeli meeskond läbi otsese võrdluse enam kui 600 üliõpilasega: Jill Watson (piiratud ehk **"groundatud"** kursuse enda materjalile, koos väidete kontrolliga) versus tavaline OpenAI Assistant.

| Näitaja | Jill Watson (groundatud) | Tavaline vestlusassistent |
|---|---|---|
| Vastuse täpsus | 75–97% | ~30% |
| Kahjuliku vastuse määr | 2,7% | 14,4% |
| Segadust tekitava vastuse määr | 54,0% | 69,2% |
| A-hinnete osakaal kursusel | 66% | 62% |

Allikas: [Georgia Tech College of Computing — "Jill Watson Outperforms ChatGPT in Real Classrooms"](https://www.cc.gatech.edu/news/georgia-techs-jill-watson-outperforms-chatgpt-real-classrooms) — esmane allikas.

::: info Miks see vahe nii suur on
Jill Watson ei "mõtle vabalt" — see on piiratud kursuse enda kontrollitud materjalile ja kontrollib oma vastuseid enne esitamist. Sama põhimõte kehtib [tunnis 3.6](/tehisintellekt/moodul-03-promptimine/tund-06-prd-naide) nähtud failipõhise promptimise juures: AI on palju usaldusväärsem, kui talle anda konkreetne, kontrollitud kontekst, mitte lasta tal vastata üldteadmiste põhjal.
:::

## Harvard CS50 — "Duck" (kummipardi koodisilumine)

Harvardi sissejuhatava informaatikakursuse CS50 enda AI-abiline kannab nime **Duck** — viide vanale programmeerijate tehnikale "kummipardi koodisilumine" (*rubber duck debugging*), kus vigade leidmiseks seletad koodi valjusti kummipardile. Duck on tahtlikult disainitud nii, et see **ei anna otseseid vastuseid**, vaid esitab suunavaid küsimusi ja selgitab veateateid, sundides õpilast ise probleemini jõudma ([cs50.harvard.edu/x/notes/ai](https://cs50.harvard.edu/x/notes/ai/); [Harvard Magazine, 2023](https://www.harvardmagazine.com/2023/08/ai-in-education)).

## Khan Academy — Khanmigo

Khanmigo on Khan Academy AI-õppeabiline, millel oli 2025. aasta märtsi seisuga üle 10 miljoni registreeritud õpilase. Khan Academy enda sisemine uuring (340 000 aktiivset kasutajat, ligi 6 kuud) näitas, et vähemalt 30 minutit nädalas Khanmigot kasutanud õpilaste matemaatikaoskus kasvas 22%, võrreldes 9%-ga ilma AI-ta.

::: warning Aus vastukaal
See on ettevõtte enda uuring oma toote kohta — mitte sõltumatult retsenseeritud teadustöö. Sõltumatu, retsenseeritud uuring (69 üliõpilast, füüsika, 2025) võrdles Khanmigot tavalise Google'i otsinguga ega leidnud statistiliselt olulist erinevust õpitulemustes — küll aga eelistasid õpilased subjektiivselt Khanmigo samm-sammulist juhendamist. Allikas: [Journal of Teaching and Learning](https://jtl.uwindsor.ca/index.php/jtl/article/view/10052) — sõltumatu, retsenseeritud.
:::

See ei tähenda, et Khanmigo ei tööta — see tähendab, et suuremahulised turundusnumbrid ja sõltumatult tõestatud õpitulemus on kaks erinevat asja, ja tasub mõlemat eristada.

## Stanford — 2026. aasta katsetused

Stanford alustab 2026. aasta augustis mitut AI-haridusgranti: informaatikakursusel CS107 kasutatakse AI-d suuliste eksamite läbiviimiseks (kontrollimaks, kas üliõpilane tegelikult mõistab oma koodi, mitte ei kopeerinud seda), ja ~200-üliõpilasega kursusel CS144 aitab AI koodistiili hindamisel, vabastades inimõppejõud väiksemate rühmade juhendamiseks. Allikas: [Stanford Center for Teaching and Learning](https://ctl.stanford.edu/news/ai-education-grants-2026) — esmane allikas; tulemusi veel pole, kuna programm algab alles 2026. aasta sügisel.

## Kokkuvõttev muster

Kõigis toimivates näidetes on ühine joon: AI ei anna lihtsalt vastuseid, vaid on kas **piiratud usaldusväärsele materjalile** (Jill Watson), **disainitud küsima, mitte vastama** (CS50 Duck), või kasutatakse **inimõppejõu aja vabastamiseks**, mitte asendamiseks (Stanford). Sama põhimõtet rakendame [tunnis 5.3](./tund-03-keeruliste-mistete-oppimine) sinu enda õppimises.

## Viited ja lisalugemine

- [Georgia Tech Research — Jill Watson turns 4](https://research.gatech.edu/jill-watson-ai-pioneer-education-turns-4)
- [Georgia Tech News — Jill Watson (2016)](https://news.gatech.edu/news/2016/05/09/artificial-intelligence-course-creates-ai-teaching-assistant)
- [Georgia Tech College of Computing — Jill Watson Outperforms ChatGPT](https://www.cc.gatech.edu/news/georgia-techs-jill-watson-outperforms-chatgpt-real-classrooms)
- [Harvard CS50 — AI Notes](https://cs50.harvard.edu/x/notes/ai/)
- [Harvard Magazine — Embracing AI (2023)](https://www.harvardmagazine.com/2023/08/ai-in-education)
- [Journal of Teaching and Learning — Khanmigo vs. Google Search (2025)](https://jtl.uwindsor.ca/index.php/jtl/article/view/10052)
- [Stanford CTL — AI Education Grants 2026](https://ctl.stanford.edu/news/ai-education-grants-2026)
