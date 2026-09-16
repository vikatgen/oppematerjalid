---
title: 4.2 Otsingu- ja uurimistööriistad
description: Perplexity ja teised AI-otsingutööriistad — kuidas need erinevad tavapärasest otsingumootorist ja kuidas nende vastuseid usaldusväärselt kontrollida.
---

# 4.2 Otsingu- ja uurimistööriistad

::: tip Selle tunni järel...
- tead, kuidas AI-otsingutööriistad erinevad tavapärasest otsingumootorist;
- oskad tuua näite tööriistast, mis on spetsiaalselt uurimistöö jaoks ehitatud;
- oskad kontrollida AI-otsingu vastuste usaldusväärsust, mitte võtta neid pimesi;
- tead reaalset näidet ettevõttest, kes on sellise tööriista kogu meeskonna töövahendiks muutnud.
:::

## Mille poolest erineb AI-otsing tavalisest otsingust

Tavaline otsingumootor tagastab lingid, mida pead ise läbi lugema. **AI-otsingutööriist** teeb veel ühe sammu: otsib mitmest allikast, loeb need läbi ja **paneb kokku ühe koondatud vastuse koos viidetega allikatele**, mida saab ise kontrollida.

**Perplexity** on tuntuim spetsiaalselt selleks ehitatud tööriist — see läbi otsib korraga sadu allikaid, tuletab neist sünteesitud vastuse ja lisab iga väite juurde viite algallikale ([Perplexity — ametlik veebileht](https://www.perplexity.ai)). Ärikontekstis sobib see hästi näiteks:
- konkurentide tegevuse jälgimiseks (hinnamuutused, uued tooted);
- turu- ja tööstusuudiste koondamiseks;
- kiireks taustauuringuks enne kliendikohtumist.

Ka suured vestlusassistendid ([tund 4.1](./tund-01-vestlusassistendid)) — ChatGPT, Claude, Gemini — on lisanud sisseehitatud veebiotsingu funktsiooni, mis töötab sarnasel põhimõttel: otsib reaalajas, mitte ei tugine ainult treeningandmetele.

::: info Reaalne näide: Perplexity — Rho
Fintech-ettevõte Rho võttis Perplexity Enterprise Pro kasutusele kogu müügimeeskonnas — viie päevaga oli tööriistast saanud kogu meeskonna igapäevane töövahend. Pärast Crunchbase'i andmeintegratsiooni kasutuselevõttu kasvas väljuvate kontaktide arv 30% ning iganädalane potentsiaalsete klientide otsimisele kuluv aeg langes 16,7 tunnilt 4,2 tunnile ([Perplexity — Rho juhtumiuuring](https://www.perplexity.ai/enterprise/rho)).
:::

## Miks viited on olulised, aga mitte piisavad

[Moodulis 2.5](/tehisintellekt/moodul-02-kuidas-ai-tootab/tund-05-miks-eksib) nägime reaalseid näiteid sellest, kuidas AI võib enesekindlalt vale infot esitada (nn hallutsinatsioon). Viidete lisamine vähendab seda riski, aga ei kõrvalda seda täielikult: mudel võib siiski allikat valesti tõlgendada või selle sisu moonutada, isegi kui viide iseenesest on õige ja päris.

::: warning Praktikas kontrolli alati
1. **Ava vähemalt üks viidatud allikas ise**, eriti kui väidet kasutad olulise otsuse juures.
2. **Vaata viite kuupäeva** — AI-otsing võib tagastada vananenud allika, kui see on endiselt indekseeritud.
3. **Kahtluse korral küsi teistmoodi** — kui AI-otsing ja tavaline otsingumootor annavad erineva vastuse, uuri, kumb allikas on usaldusväärsem.
:::

## Kokkuvõte

AI-otsingutööriistad säästavad aega, koondades info mitmest allikast ühte kohta — aga nad ei asenda kriitilist mõtlemist. Kasuta neid esimese, kiire ülevaate saamiseks, ja kontrolli olulisi fakte päris allikast, täpselt samamoodi nagu see materjal ise iga faktiväite juures teeb.

## Viited ja lisalugemine

- [Perplexity — ametlik veebileht](https://www.perplexity.ai)
- [Perplexity — Rho juhtumiuuring](https://www.perplexity.ai/enterprise/rho)
