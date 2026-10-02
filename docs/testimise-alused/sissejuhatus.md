---
title: Testimise alused
description: "M7. Testimise alused. Terminoloogia, kvaliteet, vigade tekkimine, testimise põhimõtted, meetodid, testitüübid, jõudlus- ja turvatestimine ning testimisstandardid (10 kohtumist)."
outline: deep
---

# M7. Testimise alused

::: info Õpiväljund
**ÕV1.** Mõistab testimise põhimõtteid lähtudes testimise standarditest, näiteks ISO/IEC/IEEE 29119 sarjast.
:::

## Hindamiskriteeriumid

- **HK 1.1.** Kirjeldab testimise põhimõtteid ja erinevaid testitüüpe.
- **HK 1.2.** Nimetab testimisstandardeid ja nende kasutusvaldkondi lähtudes etteantud lähteülesandest.

## Mida see moodul õpetab

See moodul vastab küsimustele **mida, miks ja mis järjekorras** testitakse. Siin ei kirjuta sa veel automaattesti. Selleks on eraldi praktiline moodul [Testimine](/testing/sissejuhatus) (Vitest, mockid, Supertest). Seal õpid, *kuidas* testi kirjutada. Siin õpid, *mida* ja *miks* testida, et sul oleks kellegagi testidest rääkida ja testimist planeerida.

## Tegelane ja ettevõte

**Kaarel** alustab noore testijana ja arendaja abilisena ettevõttes **Tammelaan Tarkvara OÜ**. Ettevõte teeb väikeseid veebirakendusi. Praegune klient on **Rannamõisa Käsitöökeskus**, kes tahab veebirakendust töötubade broneerimiseks (keraamika, kudumine, puutöö). See on sama valdkond, mida kasutab praktiline [Testimise moodul](/testing/sissejuhatus).

| Nimi | Roll |
| --- | --- |
| Kaarel | Noor testija (õppija enda tegelane) |
| Reet | Arendaja, kirjutab broneerimise loogika |
| Tiit | Projektijuht |
| Anu | Käsitöökeskuse juhataja, kliendi esindaja |
| Mihkel | Süsteemiadministraator, hoolitseb serveri eest |

Iga kohtumine algab sündmusega Kaareli tööpäevast. Kõik nimed, ettevõtted, arvud ja rakendus on **väljamõeldud**. Standardid, juhtumid (Ariane 5, Knight Capital) ja nimetatud tööriistad on päris, allikad on kohtumise lõpus.

## Kohtumised

| # | Teema | Seos |
| --- | --- | --- |
| 1 | [Testimise terminoloogia](./kohtumine-01-terminoloogia) | HK 1.1 |
| 2 | [Testimine kvaliteedi kindlustamiseks](./kohtumine-02-kvaliteet) | HK 1.1 |
| 3 | [Vigade tekkimine ja veaaruanne](./kohtumine-03-vigade-tekkimine) | HK 1.1 |
| 4 | [Testimise seitse põhimõtet](./kohtumine-04-pohimotted) | HK 1.1 |
| 5 | [Testimise meetodid: valge, must ja hall kast](./kohtumine-05-meetodid) | HK 1.1 |
| 6 | [Staatiline ja dünaamiline testimine, testitasemed](./kohtumine-06-staatiline-ja-dunaamiline) | HK 1.1 |
| 7 | [Funktsionaalsed, mittefunktsionaalsed ja muutustega seotud testid](./kohtumine-07-testituubid) | HK 1.1 |
| 8 | [Jõudluse ja turvalisuse testimine](./kohtumine-08-joudlus-ja-turvalisus) | HK 1.1 |
| 9 | [Testimise standardid](./kohtumine-09-standardid) | HK 1.2 |
| 10 | [Kokkuvõte ja lähteülesanne](./kohtumine-10-kokkuvote-ja-lahteulesanne) | HK 1.1, 1.2 |

Lisaks: [ülesannete](./assignments) kokkuvõte.

## Läbiv töö: "Testiplaan"

Kogu mooduli vältel koostad **ühe testiplaani** Rannamõisa broneerimisrakenduse kohta. Iga kohtumine lisab sinna ühe osa:

| Kohtumine | Lisan testiplaanile |
| --- | --- |
| 1 | Sõnastik: rakenduse oma näited terminitest |
| 2 | Kvaliteediomadused, mis selle rakenduse jaoks kõige olulisemad |
| 3 | Vigade riskikaart ja kahe veaaruande mustand |
| 4 | Põhimõtete rakendus: mida me ei testi ja miks |
| 5 | Testijuhtumid piirväärtuste ja ekvivalentsiklasside järgi |
| 6 | Mida kontrollitakse enne koodi (staatiline) ja mida koodiga (dünaamiline), testitasemed |
| 7 | Testitüüpide valik ja regressioonikomplekt |
| 8 | Jõudluse ja turvalisuse testi kirjeldus |
| 9 | Standardite valik ja põhjendus |
| 10 | Valmis testiplaan ja vastus lähteülesandele |

## Hindamine

Moodul on **eristava hindamisega**. Hinnatud hindeliselt saad, kui testiplaan on valmis, iga osa vastab ülesannete kontrollloendile ja lähteülesande vastus on põhjendatud.

## Seos teiste teemadega

- [Testimine](/testing/sissejuhatus): praktiline jätk (ühiktestid, mockid, integratsioonitestid, API testid). Siin õpitud mõisted on seal kasutusel.
- [Küberturvalisus](/kuberturvalisus/sissejuhatus): CIA, ohud ja turvameetmed. Kohtumine 8 seob need turvatestimisega.
- [IT-taristu](/it-taristu/sissejuhatus): raamistikud ja standardid (ISO 27001, ITIL). Kohtumine 9 kasutab sama mõtteviisi.

## Lisamaterjalid ja nende seis

| Allikas | Seis | Kasutus |
| --- | --- | --- |
| [Vikipeedia: Tarkvara testimine](https://et.wikipedia.org/wiki/Tarkvara_testimine) | Toimib, katab meetodid ja tasemed. Sisaldab vana (2002) kuluhinnangut ja vähe DevOpsi/pideva testimise kohta | Soovitatav täiendav lugemine |
| [ISTQB Certified Tester Foundation Level](https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/) | Kehtiv õppekava v4.0.1, vabalt allalaetav | Põhiallikas põhimõtetele ja terminitele |
| [ISTQB sõnastik](https://glossary.istqb.org/) | Kehtiv | Terminite täpsustamiseks |
| it-ebooks.info | Suur hulk raamatuid erinevatel teemadel, kaasaarvatud testimine | - |
