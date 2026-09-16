---
title: 4.1 Vestlusassistendid
description: ChatGPT, Claude ja Gemini — kes need teevad, mille poolest nad erinevad ning miks see maastik nii kiiresti muutub.
---

# 4.1 Vestlusassistendid

::: tip Selle tunni järel...
- tead, millised ettevõtted seisavad kolme suurima vestlusassistendi taga;
- oskad nimetada iga assistendi üldise tugevuse ärikasutuse kontekstis;
- mõistad, miks konkreetsed versiooninumbrid ja võrdlused vananevad kiiresti — ja mida selle asemel jälgida;
- tead reaalseid näiteid suurettevõtetest, kes kõiki kolme assistenti juba suures mahus kasutavad.
:::

## Kolm suurt vestlusassistenti

[Moodulis 2](/tehisintellekt/moodul-02-kuidas-ai-tootab/) õppisime, kuidas suur keelemudel (LLM) töötab. **Vestlusassistent** on rakendus, mis pakendab sellise mudeli kasutajasõbralikuks vestlusliideseks. Kolm suuremat ja tuntumat on:

| Assistent | Ettevõte | Üldine tugevus ärikasutuses |
|---|---|---|
| **ChatGPT** | OpenAI | Kõige laiem kolmandate osapoolte lisandmoodulite ja integratsioonide ökosüsteem |
| **Claude** | Anthropic | Pikkade dokumentide analüüs, kirjutamiskvaliteet, koodiga seotud ülesanded |
| **Gemini** | Google | Sügav integratsioon Google Workspace'iga (Docs, Sheets, Gmail), pikk kontekstiaken |

See jaotus ei ole kivisse raiutud — kõik kolm ettevõtet arendavad oma tooteid pidevalt ja üksteise tugevused liiguvad üksteisele lähemale. Ametlikud tooteinfo lehed (õpetlik alustuskoht: [openai.com/chatgpt](https://openai.com/chatgpt), [claude.com](https://claude.com), [gemini.google.com](https://gemini.google.com)) annavad alati kõige värskema ülevaate konkreetsetest võimalustest.

## Miks konkreetsed versiooninumbrid siin puuduvad

Tahtlikult ei loetle me siin konkreetseid mudeliversioone ega täpseid võrdlusnumbreid (nt "mudel X sai Y% testis Z"). Põhjus: siin käsitletud maastik muutub kuudega, mitte aastatega — täpselt samamoodi nagu [tunnis 3.1](/tehisintellekt/moodul-03-promptimine/tund-01-mis-on-prompt) nägime "prompt engineer" ameti kiire tõusu ja languse näitel. Konkreetne versiooninumber, mis on täna õige, võib olla käesoleva materjali lugemise ajaks juba aegunud.

::: warning Praktiline nõuanne
Kui loed veebist AI-tööriistade võrdlust, kontrolli alati avaldamiskuupäeva. Paljud SEO-optimeeritud "võrdlusartiklid" sisaldavad kiiresti aeguvaid või kontrollimatuid arve (nt täpseid benchmark-protsente) — usalda pigem tootjate endi ametlikke tooteinfo lehti või reaalseid, dateeritud pressiteateid.
:::

## Kuidas valida praktikas

Selle asemel, et otsida "parimat" assistenti üldiselt, tasub lähtuda konkreetsest ülesandest:

- **Pikk dokument tuleb kokku võtta või analüüsida** → pikk kontekstiaken ja hoolikas lugemine on olulisem kui kiirus.
- **Vaja on tihedat koostööd Google Docs/Sheets/Gmailiga** → tööriist, mis on nende rakendustega otse integreeritud, säästab kopeerimist-kleepimist.
- **Vaja on ühendada AI kolmanda osapoole tarkvaraga** (CRM, projektihaldus) → tasub vaadata, millisel assistendil on selleks valmis lisandmoodul.

Sama põhimõte kehtib siin, mida nägime [tunnis 3.2](/tehisintellekt/moodul-03-promptimine/tund-02-prompti-anatoomia) prompti struktuuri juures: mida täpsemalt tead, milleks tööriista vajad, seda lihtsam on õiget valikut teha. [Tund 4.5](./tund-05-oige-tooriista-valik) annab selleks tervikliku raamistiku.

## Reaalsed näited suures mahus kasutusest

::: info ChatGPT (OpenAI) — Morgan Stanley
Morgan Stanley ehitas GPT-4 põhjal sisemise abilise "AI @ Morgan Stanley Assistant", mis annab finantsnõustajatele juurdepääsu ligi 100 000 sisemisele uuringudokumendile. Ettevõtte enda avaldatud andmetel kasutab abilist **üle 98% nõustajameeskondadest**, ja dokumentide leidmise tõhusus kasvas **20%-lt 80%-le** ([OpenAI — Morgan Stanley juhtumiuuring](https://openai.com/index/morgan-stanley/)).
:::

::: info Claude (Anthropic) — GitLab
GitLab kasutab Claude Enterprise'i müügi-, turundus-, tehnilise dokumentatsiooni ja arendustöö juures. Ettevõte teatab **98% rahulolumäärast** meeskondade seas ja **25–50% tootlikkuse kasvust**. GitLabi tehisintellekti tootejuht Taylor McCaslin: *"By using the same Claude models internally that we offer externally, we're better able to build AI solutions that we trust and use ourselves."* ([Claude — GitLab Enterprise juhtumiuuring](https://claude.com/customers/gitlab-enterprise))
:::

::: info Gemini (Google) — Deutsche Bank
Deutsche Bank on Google Cloudi finantsuuringute AI-agendi disainipartner, mida panga ettevõtluspanganduse divisjon kasutab uuringutöö kiirendamiseks ja tulemuste jälgitavuse parandamiseks. Panga tehnoloogia-, andme- ja innovatsioonijuht Marie-Jeanne Deverdun: *"This is an important step in applying AI where it can make a practical difference: safely, responsibly and at scale."* ([Google Cloud — Gemini Enterprise for Financial Services](https://cloud.google.com/blog/products/ai-machine-learning/introducing-gemini-enterprise-for-financial-services))
:::

## Viited ja lisalugemine

- [OpenAI — ChatGPT](https://openai.com/chatgpt)
- [Anthropic — Claude](https://claude.com)
- [Google — Gemini](https://gemini.google.com)
- [OpenAI — Morgan Stanley juhtumiuuring](https://openai.com/index/morgan-stanley/)
- [Claude — GitLab Enterprise juhtumiuuring](https://claude.com/customers/gitlab-enterprise)
- [Google Cloud — Gemini Enterprise for Financial Services](https://cloud.google.com/blog/products/ai-machine-learning/introducing-gemini-enterprise-for-financial-services)
