---
title: 1.4 Erinevad AI tüübid
description: AI liigitused võimekuse, meetodi, väljundi, mudelistruktuuri ja hübriidsüsteemide järgi.
---

# 1.4 Erinevad AI tüübid

## Miks AI-d liigitada?

Kui ütleme "AI", võib mõelda väga erinevaid asju: kalkulaatorist kuni ChatGPT-ni, spam-filtrist kuni isesõitva autoni. AI ei ole üks asi — see on nimetus terve tehnoloogiate perekonna kohta. Selleks, et neist targemini rääkida, on hea teada peamisi liigitusi.

## 1. Võimekuse järgi: ANI, AGI, ASI

See on kõige populaarsem viis AI-d jagada.

**ANI — kitsas tehisintellekt** (*Artificial Narrow Intelligence*)

Süsteem, mis on väga hea ühes kindlas ülesandes. Kõik AI, mida sa täna kasutad, kuulub siia kategooriasse.

Näited: ChatGPT (vestlus), Midjourney (pildid), AlphaGo (go), Google Translate (tõlkimine), Tesla FSD (sõitmine).

Isegi ChatGPT, mis tundub väga universaalne, on tegelikult "kitsas" — ta oskab tekstiga töötada, aga ei oska iseseisvalt sõita, opereerida, kanda vastutust.

**AGI — üldine tehisintellekt** (*Artificial General Intelligence*)

Süsteem, mis on igas intellektuaalses ülesandes vähemalt sama hea kui keskmine inimene — suudab õppida uut valdkonda, üldistada kogemusi, luua uusi eesmärke.

AGI-d täna ei eksisteeri. Ekspertide arvamused, millal see tuleb, lahknevad drastiliselt — mõned prognoosid räägivad mõnest aastast, teised sajandi lõpust või mitte kunagi ([Stanford HAI — AI Index](https://aiindex.stanford.edu/report/) koondab igal aastal eksperdiprognooside ülevaateid).

**ASI — üliintellekt** (*Artificial Superintelligence*)

Hüpoteetiline süsteem, mis on inimesest igas intellektuaalses ülesandes märgatavalt parem. See on põhjus, miks AI ohutuse teadlased tegelevad "joondamise" (*alignment*) probleemiga — kuidas kindlustada, et selline süsteem, kui see kunagi tekiks, järgiks inimese huvisid.

## 2. Meetodi järgi: sümbolne vs närvivõrgul põhinev

**Sümbolne AI** (*symbolic / GOFAI*)

Süsteem, mis kasutab käsitsi kirjutatud reegleid ja loogikat. Nagu ekspertsüsteemid 1980. aastatel. Head, kui reeglid on selged (nt maleprogramm), aga halvad, kui maailm on segane.

Näide: meditsiiniline diagnostikasüsteem, mis küsib "kas patsiendil on palavik? kas köha?" ja järgib otsustuspuud.

Teine tuttav näide on **otsingu- ja planeerimisalgoritmid** — süsteemid, mis otsivad süstemaatiliselt läbi võimalike käikude või teede "puu", kasutades selgeid reegleid, mitte õpitud mustreid. GPS-navigatsioon, mis leiab lühima marsruudi kahe punkti vahel, ja malemootorid, mis arvutavad ette võimalikke käiguid (nagu [tund 1.2](./tund-02-ai-ajalugu) mainitud IBM Deep Blue), kuuluvad samuti sümbolse AI perekonda.

**Statistiline / närvivõrgul põhinev AI**

Süsteem, mis õpib andmetest, mitte reeglitest. Peaaegu kogu tänane AI kuulub siia. Head müra ja mitmekesisusega hakkama saamises, aga raskesti seletatavad.

Näide: ChatGPT, mis ennustab järgmist sõna miljardite tekstinäidete põhjal.

## 3. Väljundi järgi: generatiivne vs diskriminatiivne

**Diskriminatiivne AI** — süsteem, mis klassifitseerib või ennustab — jaotab andmed kategooriatesse. See on olnud domineeriv AI vorm aastakümneid.

Näited: spam-filter (rämpspost või mitte), näotuvastus (kes sa oled), laenu-otsused (heakskiit või ei), meditsiinipiltide analüüs (kasvaja või ei).

**Generatiivne AI** — süsteem, mis loob uut sisu — teksti, pilte, videoid, koodi, heli. See on suur "buum" alates 2022. aastast.

Näited: ChatGPT, Claude, Midjourney, DALL-E, GitHub Copilot, Sora.

```mermaid
flowchart TD
    AI["Tehisintellekti väljund"] --> D["Diskriminatiivne<br/>klassifitseerib / ennustab"]
    AI --> G["Generatiivne<br/>loob uut sisu"]
    D --> D1["Spam-filter"]
    D --> D2["Näotuvastus"]
    D --> D3["Laenuotsused"]
    G --> G1["ChatGPT / Claude"]
    G --> G2["Midjourney / DALL-E"]
    G --> G3["GitHub Copilot"]
```

## 4. Multimodaalsus

Vanad süsteemid oskasid ühte asja — teksti või pilti. Uued süsteemid on multimodaalsed: nad võtavad sisendiks ja väljundiks mitut tüüpi andmeid korraga.

- GPT-4o, Claude, Gemini — mõistavad teksti + pilti + heli.
- Sora, Veo — teksti kirjeldusest video.
- NotebookLM — dokumendid + heli-podcast.

## 5. Reaktiivsed vs mäluga vs agentsed süsteemid

```mermaid
flowchart LR
    R["Reaktiivne<br/>ei mäleta midagi<br/>(nt maleprogramm)"] --> M["Piiratud mäluga<br/>mäletab vestlust<br/>(nt ChatGPT)"] --> A["Agent<br/>planeerib ja tegutseb<br/>iseseisvalt"]
```

- **Reaktiivsed** — vastavad ainult praegusele sisendile, ei mäleta midagi (nt maleprogrammid).
- **Piiratud mäluga** — mäletavad hiljutist konteksti (nt ChatGPT vestluses).
- **Agendid** — süsteemid, mis planeerivad tegevust, kasutavad tööriistu, otsustavad iseseisvalt (nt agent-tüüpi arendusabid, mis oskavad iseseisvalt koodi kirjutada ja käske käivitada).

## 6. Hübriid-AI süsteemid

Praktikas ei kasuta paljud päris süsteemid ainult üht meetodit — nad **ühendavad** suure keelemudeli keeleoskuse ja loovuse reeglipõhise süsteemi täpsuse ja kontrollitavusega. Põhjus on lihtne: puhtalt LLM-il põhinev süsteem võib hallutsineerida ([tund 2.5](/tehisintellekt/moodul-02-kuidas-ai-tootab/tund-05-miks-eksib)), aga reeglipõhine kiht saab seda piirata.

```mermaid
flowchart LR
    LLM["Suur keelemudel<br/>loov, paindlik keel"] --> H(("Hübriidsüsteem"))
    R["Reeglipõhine süsteem<br/>täpne, kontrollitav"] --> H
    H --> O["Turvalisem ja<br/>usaldusväärsem väljund"]
```

Mõned levinud näited:

- **Klienditeeninduse juturobotid** — keelemudel sõnastab sõbraliku vastuse, aga ärireeglid ja andmebaasipäringud kontrollivad, et robot ei lubaks kliendile olematuid allahindlusi ega väära tooteinfot.
- **RAG (Retrieval-Augmented Generation)** — täpselt see, mida [tund 4.2](/tehisintellekt/moodul-04-ai-tooriistad/tund-02-otsing-ja-uurimine) kirjeldatud AI-otsingutööriistad (nt Perplexity) tegelikult teevad: infootsing käib traditsioonilise, usaldusväärse andmebaasi või otsingumootori kaudu, ning keelemudeli ülesandeks jääb ainult leitud faktide põhjal loetava kokkuvõtte kirjutamine.
- **Pettuste tuvastamine finantssektoris** — masinõpe tuvastab kahtlikke mustreid suurtes tehingumahtudes, aga kindlad, seadusest tulenevad reeglid otsustavad, millised tehingud automaatselt blokeeritakse.
- **Autonoomsed sõidukid** — kaamerapilti analüüsitakse süvaõppe abil (objektide tuvastamine), aga auto juhtimine ja liiklusreeglite järgimine käib rangelt reeglipõhiste ohutusalgoritmide kontrolli all.

## Miks see kõik oluline on?

Kui keegi ütleb "AI teeb kohe kõik tööd ära", tasub küsida:

- Millisest AI-st ta räägib?
- Kas see on ANI või AGI?
- Kas see on generatiivne või diskriminatiivne?
- Kas see on agent või lihtsalt vastaja?

Nüansid on olulised. Sama sõna võib tähendada väga erinevaid asju.

## Viited ja lisalugemine

- [Wikipedia — Artificial general intelligence](https://en.wikipedia.org/wiki/Artificial_general_intelligence)
- [Wikipedia — Generative artificial intelligence](https://en.wikipedia.org/wiki/Generative_artificial_intelligence)
- [Stanford HAI — AI Index Report](https://aiindex.stanford.edu/report/)
- [Wikipedia — Retrieval-augmented generation](https://en.wikipedia.org/wiki/Retrieval-augmented_generation)
