---
title: Praktiline töö ja hindamine
description: Artiklite kataloogi kohustuslikud nõuded, kontrollitavad tulemused ja hindamisrubriik.
outline: deep
---

# Praktiline töö: artiklikataloog

See töö valmib järk-järgult 2.–13. kohtumisel. 14. kohtumisel kontrollid ja esitled tulemust. Arendus toimub kontakttundides; laiendusülesanded on vabatahtlikud. Kui puudud, jätka oma viimase toimiva commit'i ja vastava kohtumise juhendi järgi.

## Ülesanne

Loo Reactiga artiklikataloog, milles kasutaja leiab artikli, märgib selle lemmikuks ning avab artikli ja autori andmed. Kasuta JSONPlaceholderi päris API-t. Kasutaja peab aru saama ka laadimisest, tühjast tulemusest ja ebaõnnestunud päringust.

## Kohustuslikud nõuded

| Osa | Valmisoleku tõend |
|---|---|
| Projekt | README käskudega käivitub arendusserver ja õnnestub build |
| Komponendid | Kaart ja loend on korduvkasutatavad, sisendid tulevad props'iga |
| Olek | Lemmikud säilivad vaadete vahel; arvu ja filtrit ei hoita dubleeritud state'is |
| Otsing | Pealkirjaotsing ja ainult lemmikute filter töötavad koos |
| Vorm | Väljadel on sildid; mustandivorm kontrollib pealkirja ja sisu ning annab tagasisidet |
| API | /posts, /posts/:id ja /users/:id andmed tulevad võrgupäringust |
| Päringu olekud | Laadimine, tühi tulemus, viga ja uuesti proovimine on eristatavad |
| Võistlevad päringud | Varasem vastus ei kirjuta uue URL-i andmeid üle |
| Router | Avaleht, artiklid, artikkel, autor, infoleht ja tundmatu aadress töötavad |
| Ligipääsetavus | Navigatsioon ja vormid töötavad klaviatuuriga, fookus on nähtav |
| Kontroll | Vähemalt üks enda lisatud automaattest ja täidetud käsitsi kontrolltabel |
| Selgitus | Õppija põhjendab state'i asukohta, päringu olekuid ja komponentide jaotust |

Artikli lisamise päring on laiendus. Mustandivormi kohustuslik osa on kohaliku sisendi valideerimine; see ei pea uut artiklit loendisse salvestama. Lemmikute püsimine lehe värskendamisel on samuti laiendus.

## Etappide kontrollpunktid

- 4. kohtumine: kolm erinevat kaarti ühe komponendiga.
- 8. kohtumine: otsing, ühised lemmikud ja nende loendur.
- 10. kohtumine: artiklid API-st koos olekutega.
- 12. kohtumine: URL-ist avanevad artikli- ja autorilehed.
- 13. kohtumine: korduv päringuloogika korrastatud, puuduvad funktsioonid lõpetatud.
- 14. kohtumine: kontrolltabel, build, test ja esitlus.

## Hindamisrubriik

| Kriteerium | Vajab täiendamist | Saavutatud | Tugev tase |
|---|---|---|---|
| Komponendid ja andmevoog | Loogika dubleerub või props'i muudetakse | Vastutused on eristatud, state'i asukoht on põhjendatud | Õppija võrdleb ka alternatiivset jaotust |
| API ja Router | Puudub põhivaade või olulise vea käsitlus | Kõik nõutud teekonnad ja olekud toimivad | Võistlevad päringud ja andmekuju vead on selgelt testitud |
| Kasutatavus | Kasutaja ei saa olekust aru või klaviatuuritee katkeb | Sildid, teated, fookus ja põhitegevused on kasutatavad | Õppija parandab paaristestimisel leitud kasutusprobleemi |
| Tööprotsess ja põhjendus | Rakendust ei saa korrata või õppija ei oska seda selgitada | README, sisulised commit'id, testid ja selgitus olemas | Väike uus nõue rakendub põhjendatult ja olemasolev käitumine säilib |

Töö on arvestatud, kui kohustuslikud nõuded on täidetud ja kõik neli kriteeriumi vähemalt „Saavutatud” tasemel. Puuduse korral esita parandatud lahendus ja sama kontrolli uus tulemus. Laiendused ei asenda puuduvaid põhinõudeid.

## Esitamine

Esita õpetajale repository aadress või kokkulepitud viisil projektifailid ilma `node_modules` kaustata. Lisa lockfile, README, testid ja kontrolltabel. README sisaldab:

1. projekti eesmärki ja nõutud Node'i versiooni;
2. paigaldus-, käivitus-, build- ja testikäske;
3. API aadressi ning testteenuse piiranguid;
4. vaadete loendit;
5. tehtud kontrollide tulemusi ja teadaolevaid puudusi.

## Abi ja laiendused

Küsi abi ühe konkreetse takistuse kohta: lisa tegevused, veateade ja enda proovitud lahendus. Kui kasutad AI abi, kontrolli kood ise ja oska muudatust selgitada. Õpetaja võib paluda olemasolevat lahendust kohapeal muuta.

Vabatahtlikud laiendused: localStorage, URL-i otsinguparameetrid, POST-päring koos saatmisolekuga, autori järgi filtreerimine, avaldamine. Vali üks, mis parandab rakenduse kasutamist.

