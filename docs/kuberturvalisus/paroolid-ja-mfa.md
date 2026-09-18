---
title: Paroolid, MFA ja identiteet
description: Õpi, mis teeb parooli tugevaks, mis on mitmeastmeline autentimine (MFA) ja miks parooli taaskasutus on ohtlik.
outline: deep
---

# Paroolid, MFA ja identiteet

::: info Õpiväljund
Pärast õppetundi oskad koostada turvalise parooli reeglistiku ja selgitada, mis on MFA.
:::

## Miks paroolid on olulised?

Verizoni 2025. aasta andmelekete uuringu ([DBIR](https://www.verizon.com/business/resources/reports/dbir/)) järgi olid varastatud või nõrgad paroolid **kõige levinum esimene sisenemistee** andmelekete puhul — üle veerandi kõigist lekketest algas just sealt. See pole abstraktne oht: nõrk või korduvkasutatud parool on üks levinumaid põhjuseid, miks kontosid üldse rünnatakse.

## Mis teeb parooli tugevaks?

| | Nõrk parool | Tugev parool |
| --- | --- | --- |
| Näide struktuurist | `parool123`, sünniaeg, lemmiklooma nimi | Pikk, juhuslik fraas või sümbolite/numbrite/tähtede segu |
| Isiklik info | Sisaldab nime, sünniaega, tuttavat sõna | Ei sisalda isiklikku infot, mida saab ära arvata |
| Taaskasutus | Sama parool mitmes kohas | **Iga konto jaoks oma, unikaalne parool** |

::: tip Parooliaste
Kõige turvalisem viis paljude unikaalsete paroolide haldamiseks on kasutada **parooliaste** (*password manager*) — programmi, mis genereerib ja mäletab tugevaid paroole sinu eest, nii et sina pead meeles pidama ainult ühte pearoli.
:::

## Mitmeastmeline autentimine (MFA)

**MFA** (*Multi-Factor Authentication*) tähendab, et sisselogimiseks ei piisa ainult paroolist — vaja on ka teist tõendit, näiteks:

- koodi, mis saadetakse telefoni rakendusse või SMS-iga;
- sõrmejälge või näotuvastust;
- turvavõtit.

Isegi kui keegi saab su parooli teada, ei pääse ta ilma selle teise teguriita kontole ligi. Seepärast on MFA sisselülitamine üks lihtsamaid ja tõhusamaid samme, mida saab oma kontode kaitseks teha.

## Kokkuvõte

| Mõiste | Tähendus |
| --- | --- |
| Tugev parool | Pikk, unikaalne, ilma isikliku infota |
| Parooliaste | Programm, mis genereerib/mäletab paroole sinu eest |
| MFA | Sisselogimine nõuab parooli **lisaks** veel ühte tõendit |

## Allikad

- [CISA — Secure Our World](https://www.cisa.gov/secure-our-world)
- [Google — Be Internet Awesome](https://beinternetawesome.withgoogle.com/)
- [Verizon 2025 Data Breach Investigations Report](https://www.verizon.com/business/resources/reports/dbir/)
