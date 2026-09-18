---
title: 9.1 Mis on keelemudel?
description: Keelemudel kui usutavuse hindaja — tõenäosuse mõiste ja rakendused masintõlkest kõnetuvastuseni.
---

# 9.1 Mis on keelemudel?

::: tip Selle tunni järel...
- oskad seletada, mida keelemudel tegelikult arvutab (mitte "mõtleb", vaid hindab usutavust);
- tunned P(S) tähistust ja oskad seda sõnadesse tõlkida;
- tead vähemalt viit reaalset rakendust, kus keelemudel töötab taustal, ilma et sa seda märkaksid.
:::

## Enne valemeid: "usutavuse skoor"

Kujuta ette, et igale lausele saaks panna numbri — kui loomulikult, kui "õigesti" see kõlab. Lause "Ta jõi klaasi vett" saaks kõrge numbri. Lause "Vett klaasi jõi ta" saaks madalama, aga siiski mõistliku numbri (grammatiliselt veidi kohmakas, aga arusaadav). Lause "Kala jalgratas taevas roheline" saaks numbri, mis on nulli lähedal — see pole lihtsalt loomulik lauseehitus.

**Keelemudel on täpselt see — süsteem, mis oskab igale lausele või sõnale panna sellise usutavuse numbri, tuginedes sellele, kui sageli ja millises kontekstis sõnad tavaliselt koos esinevad.**

Formaalsemalt: keelemudel hindab lause või teksti `S` **aprioorset tõenäosust** — tähistatakse `P(S)`. "Aprioorne" tähendab siin: tõenäosus enne, kui teame midagi konkreetset olukorrast — puhtalt selle põhjal, kui tüüpiline see sõnajada keeles on.

See ei ole tehisintellekti-spetsiifiline idee. Keelemudelid eksisteerisid ammu enne ChatGPT-d ja isegi enne närvivõrke — [tund 9.2](./tund-02-n-gramm-mudelid) näitab, kuidas need algselt puhtalt loenduse ja jagamise teel arvutati.

## Miks üldse tahame "tulevikku ennustada"?

Kui keelemudel oskab hinnata, kui usutav mingi lause või järgmine sõna on, saab sellega lahendada rea päris praktilisi probleeme:

| Rakendus | Kuidas keelemudel aitab |
|---|---|
| **Masintõlge** | Mitme võimaliku tõlkevariandi vahel valitakse see, mis kõlab sihtkeeles kõige loomulikumalt: näiteks P("high winds tonight") > P("large winds tonight") — mõlemad on grammatiliselt korrektsed, aga inglise keeles kõlab esimene loomulikumalt. |
| **Õigekirjakorrektor** | Tuvastab, et lauses "The study was conducted mainly **be** John Black" on "be" tõenäoliselt viga — asenduses "by" oleks lause palju usutavam. |
| **Kõnetuvastus** | Kui heli on ebaselge, valitakse mitme sarnase kõlaga sõnajada vahel see, mis on keeleliselt usutavam: "I saw a van" on inglise keeles palju tõenäolisem kui kõlaliselt sarnane, aga mõttetu "eyes awe of an". Eesti keeles kehtib sama loogika: "kas sa tuled täna" on tõenäolisem tõlgendus kui kõlaliselt sarnane "kassa tuled täna". |
| **OCR (optiline tekstituvastus)** | Kui skanneeritud märk on ebaselge ja võiks olla nii "0" kui "O", aitab kontekst (ülejäänud sõna usutavus) valida õige. |
| **Ennustav klaviatuur** | Nutiseadme klaviatuur, mis pakub järgmist sõna, on lihtne keelemudel — vt [tund 9.2](./tund-02-n-gramm-mudelid). |
| **Keele ja autorluse tuvastamine** | Millises keeles tekst on kirjutatud, või kumb kahest kirjanikust on tõenäolisemalt teksti autor — mõlemad küsimused taanduvad sellele, kumma "keelemudeli" (keele- või autoristiili-mudeli) all on tekst usutavam. |
| **Suured keelemudelid (LLM-id)** | ChatGPT, Claude ja Gemini on kõik oma tuumas keelemudelid — süsteemid, mis ennustavad, milline **[token](/tehisintellekt/moodul-02-kuidas-ai-tootab/tund-04-tokenid)** on antud konteksti järel kõige usutavam. Erinevus varasemast on mastaap: mitte enam üksikud sõnad-paarid, vaid kümned tuhanded konteksti-tokenid ja miljardid parameetrid — vt [tund 9.4](./tund-04-transformerid-ja-suured-mudelid). |

::: info Tähelepanek
Kõik ülal loetletud rakendused eksisteerisid **ammu enne ChatGPT-d**. Õigekirjakorrektorid, kõnetuvastus ja ennustav klaviatuur on kõik kasutanud keelemudeleid juba aastakümneid — LLM-id on selle sama põhiidee viimane, kõige suurema mastaabiga versioon.
:::

Järgmises tunnis vaatame, kuidas selline "usutavuse skoor" tegelikult **arvutatakse** — algselt kõige lihtsama meetodiga, mis on ka käsitsi loendatav.

## Viited ja lisalugemine

- Jurafsky, D. & Martin, J. H. — [Speech and Language Processing, ptk 3: N-gram Language Models](https://web.stanford.edu/~jurafsky/slp3/3.pdf)
- [Wikipedia — Language model](https://en.wikipedia.org/wiki/Language_model)
