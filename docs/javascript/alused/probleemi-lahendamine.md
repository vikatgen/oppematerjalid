---
title: Probleemi lahenduse kavandamine
description: Õpi kirjeldama programmi sisendid, väljundid, sammud ja piirjuhud enne koodi kirjutamist.
outline: deep
---

# Probleemi lahenduse kavandamine

::: info Õpiväljund
Pärast peatüki läbimist oskad koostada väikese programmi lahendusplaani, milles on sisendid, oodatav väljund, sammud ja piirjuhud.
:::

## Eeldused ja töövahendid

- JavaScripti süntaksi tundmine ei ole vajalik.
- Vajad märkmete tegemiseks paberit või tekstifaili.
- Soovituslik kestus on 45–60 minutit.

## Miks kavandada enne koodi?

Programmeerimisel on koodi kirjutamine ainult osa tööst. Enne süntaksit tuleb mõista:

- mida programm teada saab;
- millise tulemuse programm peab andma;
- millised sammud viivad sisendist väljundini;
- millistes olukordades võib lahendus valesti töötada.

Näiteks ülesanne „arvuta ostukorvi summa” on liiga üldine. Hea lahendusplaan muudab selle kontrollitavaks.

## Sisend, tegevus ja väljund

Kirjelda programmi kolme küsimusega:

| Küsimus | Ostukorvi näide |
|---|---|
| Millised on sisendid? | toote hind ja kogus |
| Mida programm teeb? | korrutab hinna kogusega |
| Milline on väljund? | ostukorvi kogusumma |

Näidisandmed muudavad ootuse konkreetseks:

```txt
Sisend: hind 8, kogus 3
Oodatav väljund: 24
```

::: details Kontrolli arusaamist
Kirjelda sisend ja väljund ülesandele „kontrolli, kas hinne on positiivne”.
:::

::: details Üks võimalik vastus
```txt
Sisend: hinne, näiteks 4
Tegevus: võrdle hinnet piiriga 3
Väljund: true või false
```
:::

## Jaga probleem sammudeks

Ülesanne „koosta hinnete kokkuvõte” sisaldab mitut väiksemat tegevust:

1. võta ette hinnete nimekiri;
2. liida hinded kokku;
3. jaga summa hinnete arvuga;
4. võrdle keskmist piiriga `3`;
5. väljasta keskmine ja otsus.

Iga samm peaks olema piisavalt väike, et oskaksid selgitada, mida see teeb.

::: tip Üks samm, üks tegevus
Kui samm sisaldab mitu korda sõna „ja”, tasub see tõenäoliselt väiksemateks sammudeks jagada.
:::

## Pseudokood

**Pseudokood** kirjeldab lahendust inimesele loetavate sammudena. See ei pea järgima JavaScripti süntaksit.

```txt
VÕTA hinnete nimekiri
KUI nimekiri on tühi
  VÄLJASTA "Hinded puuduvad"
MUIDU
  LIIDA kõik hinded kokku
  ARVUTA keskmine
  KUI keskmine on vähemalt 3
    VÄLJASTA "Aine on positiivne"
  MUIDU
    VÄLJASTA "Tuleb veel harjutada"
```

Pseudokood aitab märgata, milliseid otsuseid ja korduseid lahendus vajab, enne kui pead mõtlema sulgudele või märksõnadele.

## Näidisandmed ja piirjuhud

Üks näide tõendab ainult ühe olukorra töötamist. Koosta enne koodi mitu kontrolljuhtu:

| Sisend | Miks kontrollida? | Oodatav tulemus |
|---|---|---|
| `[4, 5, 3]` | tavaline positiivne tulemus | keskmine `4`, positiivne |
| `[2, 2, 4]` | tavaline negatiivne tulemus | keskmine `2.67`, vajab harjutamist |
| `[3]` | täpne piirväärtus | positiivne |
| `[]` | andmed puuduvad | `Hinded puuduvad` |

**Piirjuht** (*edge case*) on harvem või äärmuslik olukord, kus tavaline lahendus võib ebaõnnestuda.

## Proovi ise: tasuta tarne kavand

Ülesanne: programm otsustab, kas ostukorv saab tasuta tarne. Tasuta tarne algab 50 eurost.

Kirjuta enne JavaScripti:

1. sisend;
2. väljund;
3. lahenduse sammud;
4. vähemalt kolm kontrolljuhtu.

::: details Kontrolli kavandit
```txt
Sisend: ostukorvi summa
Väljund: "Tasuta tarne" või "Tarne lisandub hinnale"

Sammud:
1. Võrdle summat piiriga 50.
2. Kui summa on vähemalt 50, väljasta "Tasuta tarne".
3. Muidu väljasta "Tarne lisandub hinnale".

Kontrolljuhud:
49 -> tarne lisandub hinnale
50 -> tasuta tarne
51 -> tasuta tarne
```
:::

## Praktiline ülesanne: hinnete kokkuvõtte kavand

Koosta lahendusplaan programmile, mis saab õpilase nime ja hinnete nimekirja ning väljastab keskmise hinde koos otsusega.

Kavand peab sisaldama:

1. programmi sisendeid ja väljundit;
2. vähemalt viit järjestatud sammu;
3. pseudokoodi;
4. vähemalt nelja kontrolljuhtu;
5. vähemalt ühte piirjuhtu;
6. selgitust, kuidas tead, et lahendus on valmis.

Valmis lahendus:

- sisendid ja väljund on üheselt mõistetavad;
- sammud viivad sisendist väljundini;
- pseudokood sisaldab tühja hinnete nimekirja kontrolli;
- kontrolljuhtudes on positiivne, negatiivne, piirväärtus ja tühi nimekiri;
- iga kontrolljuhu oodatav tulemus on kirjas.

::: details Vihje 1
Alusta küsimusest: milliseid andmeid programm peab teadma enne arvutamist?
:::

::: details Vihje 2
Keskmise arvutamiseks on vaja summat ja hinnete arvu.
:::

::: details Üks võimalik lahendus
```txt
Sisendid:
- õpilase nimi
- hinnete nimekiri

Väljund:
- õpilase nimi, keskmine hinne ja otsus

Sammud:
1. Kontrolli, kas hindeid on.
2. Kui hindeid pole, väljasta "Hinded puuduvad".
3. Liida kõik hinded kokku.
4. Jaga summa hinnete arvuga.
5. Võrdle keskmist piiriga 3.
6. Väljasta nimi, keskmine ja otsus.

Kontrolljuhud:
[4, 5, 3] -> keskmine 4, positiivne
[2, 2, 4] -> keskmine 2.67, vajab harjutamist
[3] -> keskmine 3, positiivne
[] -> hinded puuduvad
```
:::

## Mõtesta

- Miks on oodatav väljund kasulik enne koodi kirjutamist?
- Millise vea aitab tühi hinnete nimekiri enne koodi kirjutamist avastada?
- Millal on pseudokoodi samm liiga suur?

## Kokkuvõte

- Alusta probleemi sisendist ja oodatavast väljundist.
- Jaga lahendus väikesteks järjestatud sammudeks.
- Pseudokood kirjeldab loogikat ilma programmeerimiskeele süntaksita.
- Näidisandmed ja piirjuhud aitavad lahendust kontrollida.
- Hea kavand muudab koodi kirjutamise konkreetsemaks.

## Allikad

- [MDN: What is JavaScript?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_is_JavaScript) — JavaScripti rolli ja programmide töö üldine ülevaade.
