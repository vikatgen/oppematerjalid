---
title: 5.3 Praktikas — AI kasutamine keeruliste tehniliste mõistete õppimisel
description: Teaduslikult põhjendatud tehnikad AI kasutamiseks tarkvaraarenduse keeruliste mõistete õppimisel, koos täieliku näitega rekursiooni õppimisest.
---

# 5.3 Praktikas — AI kasutamine keeruliste tehniliste mõistete õppimisel

::: tip Selle tunni järel...
- tead teaduslikku uuringut, mis näitab, milline AI-kasutuse muster õppimist tegelikult toetab;
- oskad nimetada viit konkreetset tehnikat AI kasutamiseks keerulise mõiste õppimisel;
- näed täielikku näidet, kuidas neid tehnikaid rakendada rekursiooni õppimisel.
:::

## Mida uuring ütleb: hübriidlähenemine võidab

2023. aastal avaldati Association for Computing Machinery (ACM) CHI konverentsil kontrollitud uuring algajate programmeerijate kohta, kes kasutasid koodigeneraatorit (Codex, GitHub Copiloti eelkäija). Tulemused:

- AI-abiga programmeerijad said 1,15 korda kõrgema ülesannete lõpetamise määra ja 1,8 korda kõrgemad tulemused koodikirjutamise ülesannetes.
- **Kõige paremad tulemused sai grupp, kes kirjutas koodi ise ja kasutas AI-d kontrollimiseks/täiendamiseks** — mitte grupp, kes lasi AI-l kohe kõik kirjutada.
- Uuring dokumenteeris ka selge "liigse sõltuvuse mustri": osalejad, kes kopeerisid AI väljundi ilma seda lugemata või muutmata, näitasid üles kõige nõrgemaid enesekontrolli-oskusi.

Allikas: [ACM CHI 2023](https://dl.acm.org/doi/10.1145/3544548.3580919), eelprint [arXiv:2302.07427](https://arxiv.org/pdf/2302.07427) — retsenseeritud, esmane allikas.

::: info Liigse sõltuvuse märk, mida jälgida
Kui märkad, et kopeerid AI vastuse oma koodi ilma seda läbi lugemata või testimata — see on täpselt uuringus dokumenteeritud "liigse sõltuvuse" muster. See on hea enesekontrolli küsimus, mida endalt pidevalt küsida.
:::

## Viis tehnikat

**1. Küsi suunavaid küsimusi, mitte vastust.**
Sama põhimõte, mis [tunnis 5.2](./tund-02-ulikoolide-naited) nähtud CS50 Duck disainis. Näiteks selle asemel, et küsida "Kirjuta mulle funktsioon, mis arvutab Fibonacci jada", küsi "Ma üritan mõista, kuidas Fibonacci jada rekursiivselt arvutada — mis on esimene samm, mida ma peaksin ise proovima?".

**2. Anna AI-le konteksti — oma märkmed, oma kood, oma konspekt.**
Nagu [tunnis 5.2](./tund-02-ulikoolide-naited) nägime Jill Watsoni juures — AI on täpsem, kui see toetub kontrollitud materjalile, mitte üldteadmistele. Sama kehtib sinu õppimisel: kleebi AI-le oma loengukonspekt või juba kirjutatud kood ja palu sellest lähtuda, mitte üldist seletust. See on sama tehnika, mida [tund 3.6](/tehisintellekt/moodul-03-promptimine/tund-06-prd-naide) kirjeldas failipõhise promptimisena.

**3. Kirjuta esimene versioon ise, siis kasuta AI-d kontrollimiseks.**
See on otseselt CHI 2023 uuringu parima tulemuse muster. Isegi kui su esimene katse on vigane või poolik — proovi ise enne, kui küsid AI-lt.

**4. Palu AI-l seletada sinu enda sõnadega tagasi (Feynmani tehnika).**
Kirjuta oma arusaam mõistest lühidalt üles ja palu AI-l öelda, kas seletus on täpne ja mida jätsid välja. See sunnib sind mõistet ise sõnastama — täpselt see aktiivne, mitte passiivne kasutus, mis [tunnis 5.1](./tund-01-miks-ai-oppimises-toimib) nähtud Kosmyna uuringu järgi õppimist tegelikult toetab.

**5. Kasuta AI-d analoogiate ja harjutusülesannete genereerimiseks, mitte lõplike vastuste jaoks.**
Abstraktsed mõisted (rekursioon, viidad, asünkroonsus) jäävad paremini meelde, kui neile on olemas konkreetne analoogia. Palu AI-l pakkuda mitu erinevat analoogiat sinu enda tasemel, mitte üldist definitsiooni.

## Täielik näide: rekursiooni õppimine

**Halb muster (passiivne):**

> **Õpilane:** Kirjuta mulle Java funktsioon, mis arvutab faktoriaali rekursiivselt.
> **AI:** *(kirjutab kohe töötava koodi)*
> **Õpilane:** *(kopeerib koodi, esitab ülesande, ei mõista siiani, kuidas rekursioon töötab)*

See on täpselt Kosmyna ([tund 5.1](./tund-01-miks-ai-oppimises-toimib)) ja CHI 2023 uuringute kirjeldatud "liigse sõltuvuse" muster — ülesanne sai tehtud, aga midagi ei õpitud.

**Hea muster (aktiivne, tehnikad 1–4):**

> **Õpilane:** Ma üritan mõista rekursiooni. Ma tean, et funktsioon kutsub iseennast, aga ei mõista, kuidas see lõpetab. Kas saad esitada mulle küsimuse, mis aitaks mul ise selgusele jõuda, selle asemel, et kohe seletada?
>
> **AI:** Hea küsimus iseendale: kui funktsioon kutsub iseennast lõpmatult, mis juhtuks? Mõtle, mis peaks olema iga rekursiivse funktsiooni sees, et see kunagi *lõpetaks* iseenda kutsumise.
>
> **Õpilane:** Aa — peab olema mingi tingimus, kus ta enam ei kutsu iseennast, vaid tagastab lihtsalt väärtuse. Kas seda kutsutakse baasjuhuks?
>
> **AI:** Täpselt. Proovi nüüd ise kirjutada faktoriaali funktsioon, mille sees on selge baasjuht.
>
> **Õpilane:** *(kirjutab ise esimese versiooni, mis on veidi vigane)*
>
> **AI:** See on lähedal! Vaata rida, kus kutsud funktsiooni uuesti — kas argument, mille edastad, muutub iga kutsega väiksemaks?
>
> **Õpilane:** *(parandab ise, saab töötava koodi)* Kas saad nüüd öelda mu enda sõnadega tagasi, kas ma mõistan seda õigesti: rekursioon on nagu... [oma seletus] ...?
>
> **AI:** *(kinnitab või täpsustab õpilase enda seletust)*

Selles versioonis kirjutas õpilane koodi ise, sai AI-lt ainult suunavaid küsimusi, ja lõpetas oma arusaama enda sõnadega sõnastades — täpselt need kolm elementi, mida CHI 2023 ja Kosmyna uuringud õppimist toetavaina näitasid.

## Viited ja lisalugemine

- [ACM CHI 2023 — DOI 10.1145/3544548.3580919](https://dl.acm.org/doi/10.1145/3544548.3580919)
- [arXiv:2302.07427 — eelprint](https://arxiv.org/pdf/2302.07427)
- [Tund 3.6 — Praktikas: PRD kui kontekstifail](/tehisintellekt/moodul-03-promptimine/tund-06-prd-naide)
