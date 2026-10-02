---
title: Praktilise töö dokumenteerimisvorm
description: "Vorm, mida kasutatakse iga turvamuudatuse dokumenteerimiseks kogu kursuse jooksul."
outline: deep
---

# Praktilise töö dokumenteerimisvorm

Iga turvamuudatuse juures vastad samadele kuuele küsimusele. Nii tekib sul tõend selle kohta, mida tegid ja kas see toimis.

## Vorm

**Töö:** *pealkiri*

- **Õpilane:** …
- **Kuupäev:** …
- **Keskkond ja versioon:** … (nt Windows 11, ruuteri mudel ja püsivara versioon)

| Küsimus | Sinu vastus |
| --- | --- |
| Mis oli algseis või ebaturvaline seadistus? | … |
| Milline oli risk ja mõju organisatsioonile? | … |
| Mida muutsid ja miks? | … |
| Kuidas kontrollisid tulemust? | … |
| Milline oli tegelik kontrolli tulemus? | … |
| Milline tõend näitab tulemust? | … |

## Näide

**Töö:** Testkausta õiguste piiramine

- **Keskkond:** õppe-virtuaalmasin (Windows 11)

| Küsimus | Vastus |
| --- | --- |
| Algseis | Testkasutajal oli kausta `Arved` täisõigus (lugemine, muutmine, kustutamine) |
| Risk ja mõju | Kui testkasutaja konto satuks ründaja kätte, saaks ta arveid kustutada. Mõju: andmete kadu, tööseisak |
| Muudatus ja põhjus | Jätsin testkasutajale ainult lugemisõiguse (vähimate õiguste põhimõte) |
| Kontroll | Logisin testkasutajana sisse. Proovisin faili avada ja seejärel kustutada |
| Tegelik tulemus | Faili sai avada. Kustutamine andis veateate "Access denied" |
| Tõend | Ekraanipilt veateatest ja kausta õiguste aknast |

## Reeglid

- **Tõend** võib olla ekraanipilt, käsu väljund või kirjeldatud kontroll.
- **Paroole, taastamiskoode ja muid saladusi tööle ei lisata.** Kata need ekraanipildil kinni või kirjelda üldiselt ("parool muudetud").
- **Õiguste piiramisel kontrolli mõlemat:** lubatud tegevus õnnestub **ja** keelatud tegevus ebaõnnestub.
- Kontrolli tulemus peab olema **tegelik**, mitte oodatav. Kui kontroll ebaõnnestus, kirjuta seegi üles ja paranda.
