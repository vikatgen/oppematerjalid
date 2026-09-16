---
title: 7.1 Kallutatus ja õiglus
description: Miks AI-süsteemid võivad diskrimineerida, ja Hollandi lapsehoiutoetuste skandaali näide, kus algoritm langetas terve valitsuse.
---

# 7.1 Kallutatus ja õiglus

::: tip Selle tunni järel...
- tead, miks AI-süsteemid võivad diskrimineerida, isegi kui keegi seda ei kavatsenud;
- tead reaalset näidet sellest, milleni kallutatud algoritm avaliku sektori otsustes viia võib;
- oskad seletada, miks "AI otsustas nii" ei ole vastutuse vältimiseks piisav põhjendus.
:::

## Lühikordus varasemast

[Moodulis 1](/tehisintellekt/moodul-01-mis-on-ai/tund-05-muudid) ja [moodulis 2](/tehisintellekt/moodul-02-kuidas-ai-tootab/tund-03-treeningandmed) nägime juba mitut näidet: Amazoni CV-skriininguvahend, mis diskrimineeris naisi, Google Photose rassistlik siltimisviga, Gender Shades'i uuring näokäe tuvastuse ebavõrdse täpsuse kohta, ja COMPAS-i riskiskoori vaieldav juhtum. Ühine muster kõigil: **kallutatus ei ole tavaliselt tahtlik** — see peegeldab treeningandmetes peituvat ebavõrdsust, mida keegi ei märganud enne, kui süsteem juba reaalseid otsuseid tegema hakkas.

Selles tunnis vaatame ühte juhtumit, mis näitab, mis juhtub, kui selline süsteem jõuab **valitsuse tasandile** ja mõjutab sadu tuhandeid päris inimesi.

## Hollandi lapsehoiutoetuste skandaal (Toeslagenaffaire)

Aastatel 2005–2019 kasutas Hollandi maksuamet iseõppivat algoritmi, mis pidi tuvastama lapsehoiutoetuste pettuseid. Süsteem "õppis" kasutama riskimärgina **topeltkodakondsust ja madalat sissetulekut** — see tähendas, et mitte-Hollandi päritolu ja väiksema sissetulekuga pered said automaatselt kõrgema riskiskoori, rikkudes otseselt Hollandi ja EL-i mittediskrimineerimise seadust.

::: warning Tagajärjed
- Ligikaudu **26 000 vanemat** süüdistati alusetult pettuses ja neilt nõuti kogu toetuse tagasimaksmist korraga.
- Kuna otsused olid suures osas automaatsed, ei olnud protsessis piisavalt ruumi inimliku ülevaatuse ega apellatsiooni jaoks.
- Pered sattusid võlgadesse, kaotasid kodu ja töö; vähemalt **3532 last** võeti peredelt ära ja paigutati hooldusperre.
- 2021. aastal astus kogu Hollandi valitsus tagasi — peaminister Mark Rutte ütles, et kui süsteem tervikuna on läbi kukkunud, peab valitsus võtma kollektiivse vastutuse.
:::

See juhtum erineb varasematest näidetest (nt Amazoni CV-tööriist) kahel olulisel moel: (1) tegu oli **avaliku sektori otsusega**, mis mõjutas otse inimeste elatist, mitte ainult tööpakkumist, ja (2) süsteem tegi otsuseid **suures osas automaatselt**, ilma piisava inimliku ülevaatuseta enne karistuse rakendamist.

## Miks "AI otsustas nii" ei ole vastutuse vältimiseks piisav

Toeslagenaffaire keskne õppetund ärikontekstis: algoritm ei ole vastutuse "musta kasti", kuhu otsused kaovad. Organisatsioon, kes AI-süsteemi kasutusele võtab, jääb vastutavaks selle tulemuste eest — täpselt samamoodi nagu ta vastutaks, kui sama otsuse teeks inimtöötaja. [Tunnis 7.5](./tund-05-regulatsioon-ja-vastutus) vaatame, kuidas EL-i AI-määrus seda vastutust täpsemalt reguleerib.

## Kokkuvõte

Kallutatus ei ole harv erand, vaid struktuurne risk igas AI-süsteemis, mis õpib ajaloolistest andmetest — ja mida suurema mõjuga otsuse süsteem teeb (nt kes saab toetust, kes saab töökoha, kes saab laenu), seda suurem on kahju, kui kallutatust ei avastata enne kasutuselevõttu.

## Viited ja lisalugemine

- [Wikipedia — Dutch childcare benefits scandal](https://en.wikipedia.org/wiki/Dutch_childcare_benefits_scandal)
- [Yahoo News — Dutch government resigns over childcare scandal (2021)](https://news.yahoo.com/dutch-government-resigns-over-childcare-161953709.html)
