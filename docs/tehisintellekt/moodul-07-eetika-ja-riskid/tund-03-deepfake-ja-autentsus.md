---
title: 7.3 Deepfake'id ja sisu autentsus
description: 25 miljoni dollari suurune deepfake-pettus Hongkongis ja C2PA standard, mis aitab tõestada, mis on päris.
---

# 7.3 Deepfake'id ja sisu autentsus

::: tip Selle tunni järel...
- tead, mis on deepfake ja miks see on äriliselt reaalne oht, mitte vaid meelelahutuslik kurioosum;
- tead reaalset 25 miljoni dollari suurust pettusejuhtumit, mis kasutas deepfake-videokõnet;
- tead, milline tehniline standard on loodud sisu ehtsuse tõestamiseks.
:::

## Mis on deepfake ja miks see nüüd ohtlik on

**Deepfake** on tehisintellekti abil loodud võltsitud pilt, video või heli, mis jäljendab reaalset inimest — tema nägu, häält või mõlemat. Varasemad deepfake'id olid tehniliselt lihtsalt äratuntavad, aga tänased tööriistad ([moodulis 4.3](/tehisintellekt/moodul-04-ai-tooriistad/tund-03-loovsisu-tooriistad) käsitletud videogeneratsiooni ja häältehnoloogia edusammude tõttu) toodavad reaalajas videokõnesid ja hääli, mida on paljal silmal-kõrval peaaegu võimatu eristada päris inimesest.

## 25 miljoni dollari suurune pettus Hongkongis (2024)

Rahvusvahelise inseneriettevõtte Arupi Hongkongi kontori finantstöötaja sai teate, mis paistis tulevat ettevõtte Suurbritannias asuvalt finantsjuhilt (CFO) — teade rääkis salajase tehingu vajadusest. Töötaja kahtlustas algul andmepüügikatset, kuid nõustus seejärel osalema **videokõnes**, kus "kohal" olid ka mitmed teised justkui tuttavad kolleegid.

Kõik videokõnes osalejad, kaasa arvatud "finantsjuht" ise, olid tegelikult **deepfake'iga loodud rekonstruktsioonid** päris kolleegidest — nad nägid välja ja kõlasid täpselt nagu inimesed, keda töötaja tundis. Videokõne käigus andis "finantsjuht" korralduse kanda üle raha mitmele pangakontole. Töötaja kandis kokku üle **200 miljonit Hongkongi dollarit (u 25,6 miljonit USA dollarit)** ning sai pettusest teada alles hiljem, kui ta asja peakontoriga üle kontrollis ([CNN, 2024](https://www.cnn.com/2024/02/04/asia/deepfake-cfo-scam-hong-kong-intl-hnk); [CNN, 2024 — ettevõte tuvastatud kui Arup](https://www.cnn.com/2024/05/16/tech/arup-deepfake-scam-loss-hong-kong-intl-hnk)).

::: warning Miks see juhtum on eriti murettekitav
Erinevalt tavapärasest andmepüügist ei piisanud siin ühest kirjast — pettus õnnestus, sest **mitu** "usaldusväärset" videopilti ja häält kinnitasid üksteist samal kõnel. See näitab, et vana turvareegel "kontrolli teise kanali kaudu" (nt helista tagasi) ei toimi enam sama kindlalt, kui ka see teine kanal võib olla võltsitud.
:::

## Kuidas sellele vastu seista: sisu autentsuse tõestamine

Kuna deepfake'i on üha raskem paljast silma järgi ära tunda, on tehnoloogiaettevõtted keskendunud teisele lahendusele: **tõestada, mis on tõesti ehtne**, selle asemel et proovida tuvastada, mis on võlts. Selleks loodi 2021. aastal koalitsioon **C2PA** (Coalition for Content Provenance and Authenticity), mille asutasid Adobe, BBC, Microsoft, Intel, Arm ja Truepic — täna kuulub koalitsiooni üle 120 ettevõtte, sh Google, OpenAI ja Sony.

C2PA standard ("Content Credentials") lisab meediafailile (pildile, videole, helile) krüptograafiliselt allkirjastatud metaandmed, mis näitavad: **kes** faili lõi, **mis tööriistaga**, ja **milliseid muudatusi** tehti. Oluline nüanss: C2PA ei tuvasta deepfake'e automaatselt — see ei ütle "see on võlts". Selle asemel loob see **ehtsuse tõendi loomise hetkel**, mille puudumine hilisemas failis on iseenesest kahtlust äratav signaal ([C2PA — Content Credentials](https://contentcredentials.org/)).

## Kokkuvõte

Deepfake ei ole enam ainult meelelahutuslik või poliitiline nähtus (nt võltsitud kuulsuste pildid) — Arupi juhtum näitab, et see on juba täna reaalne finantsrisk, mis nõuab uusi turvaprotseduure (nt mitmeastmeline kinnitus suuremate tehingute puhul, mis ei sõltu ainult video- või häälkõnest). Samal ajal areneb ka vastupool: standardid nagu C2PA aitavad tulevikus tõestada, mis on kindlalt ehtne.

## Viited ja lisalugemine

- [CNN — Finance worker pays out $25 million after deepfake CFO video call (2024)](https://www.cnn.com/2024/02/04/asia/deepfake-cfo-scam-hong-kong-intl-hnk)
- [CNN — Arup revealed as victim of $25 million deepfake scam (2024)](https://www.cnn.com/2024/05/16/tech/arup-deepfake-scam-loss-hong-kong-intl-hnk)
- [C2PA — Content Credentials](https://contentcredentials.org/)
