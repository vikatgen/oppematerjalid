---
title: 3.3 Rollid, näited ja mõtlemise suunamine
description: Rollprompt, näidete andmise sügavam kasutus ning "mõtle samm-sammult" tehnika ja selle piirid tänapäeva mudelitega.
---

# 3.3 Rollid, näited ja mõtlemise suunamine

::: tip Selle tunni järel...
- oskad kasutada rollprompti, et suunata vastuse tooni ja vaatenurka;
- oskad koostada näidetega prompti, mis suunab vastuse struktuuri täpsemalt;
- tead, mis on "mõtle samm-sammult" tehnika ja millal see tänapäeval veel kasu toob.
:::

## Rolli andmine mudelile

**Rollprompt** (*role prompting*) tähendab, et ütled mudelile, kelle vaatenurgast ta peaks vastama: *"Sa oled kogenud raamatupidaja, kes selgitab käibemaksu algajale ettevõtjale."*

Roll ei muuda seda, mida mudel "teab" — ta ei muutu tegelikult raamatupidajaks. Küll aga suunab roll, millist sõnavara, detailsuse taset ja tooni mudel tõenäolisemalt kasutab, sest ta jäljendab statistiliselt seda, kuidas selline ekspert treeningandmetes tavaliselt kirjutab. Anthropic toob oma ametlikus juhendis rollprompti eraldi tehnikana välja täpselt sel põhjusel — see aitab häälestada väljundi stiili ja fookust ([Anthropic — Prompt engineering overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview)).

**Näide:**

| Prompt | Tõenäolise vastuse iseloom |
|---|---|
| "Selgita, mis on liitintress." | Neutraalne, üldine selgitus |
| "Sa oled 5. klassi matemaatikaõpetaja. Selgita, mis on liitintress, kasutades taskuraha näidet." | Lihtsam sõnavara, konkreetne igapäevane näide, õpetajalik toon |

## Näidete jõud (few-shot süvitsi)

[Eelmises tunnis](./tund-02-prompti-anatoomia) nägime, et näited aitavad mudelil mustrit ära tunda. See on eriti kasulik, kui:

- soovid kindlat **vormingut** (nt alati "Pealkiri / Kokkuvõte / Järeldus" struktuur);
- soovid kindlat **tooni**, mida on sõnadega raske kirjeldada (nt "kirjuta nii nagu meie ettevõtte varasemad postitused");
- ülesanne on **ebatavaline** või spetsiifiline, mida mudel ei pruugi zero-shot puhul õigesti mõista.

Reegel: 1–3 head, mitmekesist näidet on tavaliselt tõhusam kui 10 sarnast näidet — mudel üldistab mustrit kiiresti ja liiga sarnased näited võivad hoopis piirata vastuse loomingulisust.

## "Mõtle samm-sammult" (chain-of-thought)

2022. aastal näitasid Google'i teadlased Wei jt uuringus, et kui paluda mudelil enne lõppvastust oma arutluskäik lahti kirjutada — kas näidete abil või lihtsalt lisades lausega **"Mõtle samm-sammult"** —, paraneb tulemus märgatavalt matemaatika-, loogika- ja mitmeastmeliste ülesannete puhul ([Wei jt, 2022](https://arxiv.org/abs/2201.11903)). Sama soovitab ka OpenAI oma juhendis keeruliste ülesannete jaoks ([OpenAI — Prompt engineering guide](https://developers.openai.com/api/docs/guides/prompt-engineering)).

**Näide:**

```
Halb: "Kui palju jääb üle, kui 3 sõpra jagavad 47 eurot võrdselt ja igaüks kulutab 5 eurot?"

Parem: "Lahenda see ülesanne samm-sammult, näidates iga vahetulemuse:
Kui palju jääb üle, kui 3 sõpra jagavad 47 eurot võrdselt ja igaüks kulutab 5 eurot?"
```

::: warning Faktikontroll: kas see tehnika töötab tänapäeva mudelitega sama hästi?
2022. aasta uuring tehti mudelitega, mis ei "arutlenud" vaikimisi. Tänaseks (2026) on olukord muutunud kahel viisil:
1. Osa tänapäeva mudeleid (nn "arutlusmudelid", nt OpenAI o-seeria, Claude "extended thinking") teevad sisemiselt juba pikka arutluskäiku, ilma et sa peaksid seda eraldi paluma — sõnaline "mõtle samm-sammult" lisamine annab neile vähe juurde.
2. 2025. aasta uuring "The Decreasing Value of Chain of Thought in Prompting" leidis, et tavaliste mudelite puhul annab see tehnika tänapäeval enamasti minimaalset kasu, samas kui arutlusmudelite puhul on lisakasu samuti väike — kuid mõlemal juhul kulub rohkem aega ja rohkem tokeneid ([arXiv 2506.07142](https://arxiv.org/abs/2506.07142)).

**Praktiline järeldus:** tehnika ei ole "vale", aga see pole enam imerohi. Kõige rohkem kasu annab see endiselt mitmeastmeliste loogika- või arvutusülesannete puhul lihtsamate/vanemate mudelitega — lihtsate faktiküsimuste juures pole sellest tavaliselt kasu.
:::

## Viited ja lisalugemine

- Wei, J. jt (2022). ["Chain-of-Thought Prompting Elicits Reasoning in Large Language Models"](https://arxiv.org/abs/2201.11903)
- [OpenAI — Prompt engineering guide](https://developers.openai.com/api/docs/guides/prompt-engineering)
- [Anthropic — Prompt engineering overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview)
- ["Prompting Science Report 2: The Decreasing Value of Chain of Thought in Prompting" (2025)](https://arxiv.org/abs/2506.07142)
