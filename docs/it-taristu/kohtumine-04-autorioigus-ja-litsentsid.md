---
title: "Autoriõigus ja litsentsilepingud"
description: "Kohtumine 4: müügijuht tahab panna ühe tarkvara kõigile arvutitele. Autoriõigus tarkvaras, litsentsitüübid, avatud lähtekoodiga litsentsid ja litsentsi rikkumise tagajärjed."
outline: deep
---

# 4. Autoriõigus ja litsentsilepingud

::: info Õpiväljund
Pärast tundi oskad selgitada, miks tarkvara kasutamiseks on vaja litsentsi, eristada peamisi litsentsitüüpe ja pidada ettevõtte litsentsinimekirja (HK 1.2).
:::

Esmaspäeva hommikul tuleb Kadri Liisi juurde. "Ostsin selle pildiredaktori ühe litsentsi. Paneme selle kõigi viie müügitöötaja arvutisse, eks?" Liis ütleb: "Vaatame, mida litsents lubab."

Litsents lubab **ühte kasutajat**. Viie töötaja peale on vaja viit litsentsi. Kadri on üllatunud: "Aga me juba maksime selle eest!" Liis seletab: "Sa maksid selle eest, et **üks inimene** tohib seda kasutada, mitte selle eest, et sa tarkvara omaksid."

## Kellele tarkvara kuulub?

Tarkvara on **autoriõigusega kaitstud teos**. Autoriõiguse seadus käsitleb arvutiprogrammi kirjandusteosena. See tähendab:

- Tarkvara **autor** (või tööandja, kui kood on tööülesande käigus loodud) otsustab, kes seda kasutada tohib.
- Kui ostad tarkvara, **ei osta sa tarkvara ennast**. Ostad **õiguse seda teatud tingimustel kasutada**. Seda õigust nimetatakse **litsentsiks**.
- Kui kasutad tarkvara ilma litsentsita või litsentsi tingimusi rikkudes, rikud autoriõigust. See on ettevõttele õiguslik ja rahaline risk.

::: tip Analoogia: raamat ja laenutus
Raamatukogust raamatu laenates ei saa sa raamatu omanikuks. Sul on **luba** seda lugeda teatud ajaga, aga trükkida koopiat sa ei tohi. Tarkvara litsents on sarnane luba.
:::

## Litsentsilepingu põhiosad

| Osa | Küsimus | Näide |
| --- | --- | --- |
| Kasutaja | Kes tohib kasutada? | Üks inimene, üks organisatsioon |
| Seadmed | Kui paljudel seadmetel? | Kuni 2 seadmel |
| Aeg | Kui kauaks? | Igavesti või 12 kuud |
| Koht | Kus? | Ainult Eestis, ainult ettevõtte sees |
| Piirangud | Mida ei tohi? | Müüa edasi, muuta, tagasi tuletada |
| Hind | Kuidas arvestatakse? | Kasutaja kohta kuus |
| Rikkumine | Mis juhtub? | Litsents lõpetatakse, nõutakse hüvitist |

## Litsentsitüübid

Liis kirjutab ettevõtte tarkvara kõrvale, **kuidas see on litsentseeritud**:

| Tüüp | Kuidas töötab | Pihlaka näide |
| --- | --- | --- |
| **Kasutajapõhine** (*per user*) | Iga nimeline kasutaja vajab litsentsi | Kontoritarkvara, e-posti teenus |
| **Seadmepõhine** (*per device*) | Iga seade vajab litsentsi | Kassaprogramm igas kassas |
| **Üheaegne** (*concurrent*) | Litsentse on N, korraga kasutavad N inimest | Erikasutusega tarkvara |
| **Tellimus** (*subscription*) | Maksad perioodiliselt. Maksmise lõppedes kaob õigus | Pilve­teenused |
| **Püsilitsents** | Ühekordne tasu, õigus jääb | Vanemad programmid |
| **Mahtlitsents** | Üks leping paljudele seadmetele | Suurem ettevõte |
| **OEM** | Seotud konkreetse arvutiga, ei saa üle kanda | Windows uues arvutis |

## Avatud lähtekoodiga litsentsid

Tarkvaraarendajana puutud sa nendega kokku iga päev: iga `npm install` toob teeke, mille igaühel on litsents.

**"Avatud lähtekood" ei tähenda "tasuta ja vaba kõigeks".** Igal litsentsil on tingimused.

| Litsents | Mida lubab | Mida nõuab | Näide |
| --- | --- | --- | --- |
| **MIT** | Kasutada, muuta, müüa, sh suletud toodetes | Säilita autoriõiguse märge | Paljud JavaScripti teegid |
| **Apache 2.0** | Sama, lisaks patendiluba | Märge ja muudatuste kirjeldus | Paljud pilveprojektid |
| **GPL** | Kasutada ja muuta | **Kui levitad oma tööd, pead selle avaldama sama GPL-litsentsiga** (*copyleft*) | Linuxi tuum |
| **Ärilitsents** | Nagu lepingus kirjas | Maksa ja järgi tingimusi | Enamik tasulist tarkvara |

Peamine erinevus on **copyleft**. MIT-teegi saad lisada oma suletud tootesse. GPL-teegi lisamine võib sundida kogu toote lähtekoodi avaldama.

## Liisi töönäide: litsentsinimekiri

Liis loob tabeli kõigest, mida Pihlakas kasutab. Iga rea kohta kirjutab ta litsentsi liigi, mitu on ostetud, mitu kasutuses.

| Tarkvara | Litsentsi tüüp | Ostetud | Kasutuses | Tähtaeg | Olukord |
| --- | --- | --- | --- | --- | --- |
| Kontoritarkvara | Kasutajapõhine tellimus | 40 | 38 | Aastane, 1.03 | Korras |
| Pildiredaktor | Kasutajapõhine | 1 | 5 | Püsiv | **Puudu 4** |
| Laosüsteem | Seadmepõhine | 6 | 6 | Aastane, 1.09 | Korras |
| E-poe raamistik (MIT) | Avatud | n/a | 1 | n/a | Märge säilitatud |
| Raamatupidamisprogramm | Kasutajapõhine | 3 | 3 | Aastane, 1.01 | Korras |

Liis leiab kohe probleemi: pildiredaktor on viiel arvutil, aga litsents on ühele. Variandid:

1. Osta puuduvad 4 litsentsi (kulu teada).
2. Eemalda tarkvara neljalt arvutilt ja leia tasuta asendus.
3. Hinda, kas kõik viis ikka seda vajavad.

Selline nimekiri hoiab ära nii **liigse kulu** (litsents, mida keegi ei kasuta) kui ka **õigusliku riski** (kasutus ilma litsentsita).

## Mis juhtub, kui litsentsi rikutakse?

- **Auditeerimine.** Tarkvara tootja võib nõuda auditit ja tarkvara kasutuse tõendamist.
- **Hüvitise nõue.** Tavaliselt nõutakse puuduvate litsentside hind, tihti mitmekordselt, ning õigusabikulud.
- **Lepingu lõpetamine.** Tarkvara kasutamine keelatakse.
- **Maine.** Kui rikkumine saab avalikuks, kaotab organisatsioon usaldust.

### Päris juhtum: GPL kohtus

6. septembril 2006 otsustas Frankfurdi esimese astme kohus (Landgericht Frankfurt am Main, Saksamaa), et võrguseadmete tootja D-Link Germany rikkus GPL-i. D-Link müüs võrgukettaseadet (NAS), milles kasutati Linuxi tuuma ja muud GPL-/LGPL-tarkvara, aga ei lisanud litsentsi teksti, vastavat lähtekoodi ega kirjalikku pakkumist selle saamiseks. Kohtusse läks programmeerija Harald Welte (projekt gpl-violations.org), kes esindas kolme programmi autoriõiguse omajaid. Otsus on varaseim kindel kinnitus, et GPL on kohtus jõustatav leping, mitte pelgalt soovitus.


## Praktilised reeglid ettevõttes

1. **Pea nimekirja.** Tea, mis tarkvara on kus ja mitu litsentsi on olemas.
2. **Osta ametlikult.** Ära kasuta "krakitud" või jagatud litsentse.
3. **Kontrolli iga kord enne uue teegi lisamist.** Ava litsents, vaata, kas see sobib kommertstootega.
4. **Jälgi tähtaegu.** Tellimus, mis aegub vaikselt, peatab töö.
5. **Dokumenteeri.** Audit küsib tõendeid: arveid, lepinguid, nimekirju.

Seos varasema teemaga: litsents on **leping**, mille tingimusi tuleb täita, ja tööandja vastutab, et töötajad neid täidavad. Nii seotakse see sinu tegevusega: iga installimine on otsus, mis puudutab ettevõtte õiguslikku riski.

## Kokkuvõte

| Mõiste | Tähendus |
| --- | --- |
| Autoriõigus | Autori õigus otsustada, kes teost kasutab |
| Litsents | Luba tarkvara kasutada kindlatel tingimustel |
| Kasutajapõhine / seadmepõhine / üheaegne | Litsentsi arvestuse viis |
| Tellimus | Õigus kehtib ainult maksmise ajal |
| MIT / Apache / GPL | Peamised avatud lähtekoodi litsentsid |
| Copyleft | Reegel, et tuletatud töö tuleb avaldada sama litsentsiga |
| Litsentsinimekiri | Ülevaade, mis tarkvara on kus ja mille alusel |

Kolm mõtet:

- **Tarkvara ostmine on kasutusõiguse ostmine.** Loe tingimusi.
- **"Avatud" ei tähenda "ilma tingimusteta".** MIT ja GPL on väga erinevad.
- **Nimekiri hoiab ära kulu ja riski.** Pea seda värskena.

## Lisa oma IT-teenuse kaardile

Tee **litsentside nimekiri** oma teenuse jaoks (vähemalt 5 rida): tarkvara, litsentsi tüüp, hulk, tähtaeg, olukord. Märgi vähemalt üks avatud lähtekoodi teek ja põhjenda, kas selle litsents sobib kommertstootega.

## Allikad

- Autoriõiguse seadus ([Riigi Teataja](https://www.riigiteataja.ee/)): tarkvara kaitse. Otsi "Autoriõiguse seadus" ja loe arvutiprogrammide sätteid.
- [gpl-violations.org: kohtuotsus D-Linki vastu (22.09.2006 teade)](https://gpl-violations.org/news/20060922-dlink-judgement_frankfurt/)
- [MIT License (Open Source Initiative)](https://opensource.org/license/mit)
- [GNU General Public License v3](https://www.gnu.org/licenses/gpl-3.0.html)
- Pihlaka litsentsid ja arvud on väljamõeldud.
