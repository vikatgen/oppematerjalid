---
title: 3.2 Hea prompti anatoomia
description: Prompti neli ehituskivi, zero-shot vs. few-shot promptimine ning miks struktuur (nt eraldajad) vastust parandab.
---

# 3.2 Hea prompti anatoomia

::: tip Selle tunni järel...
- tead nelja elementi, millest koosneb hästi üles ehitatud prompt;
- oskad vahet teha zero-shot ja few-shot promptimisel;
- oskad kasutada eraldajaid (nt pealkirju, jutumärke), et prompti selgemaks muuta.
:::

## Neli ehituskivi

Nii OpenAI kui Anthropic soovitavad oma ametlikes juhendites sisuliselt sama asja: kirjuta selged, konkreetsed juhised ja lisa näiteid ([OpenAI Help Center](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api); [Anthropic — Prompt engineering overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview)). Seda saab jagada neljaks praktiliseks ehituskiviks:

| Element | Küsimus, millele see vastab | Näide |
|---|---|---|
| **Kontekst** | Kes/mis olukorras, milleks seda vaja on? | "Olen väikeettevõtte omanik, kes saadab kliendile vabandava kirja." |
| **Ülesanne** | Mida täpselt teha tuleb? | "Kirjuta lühike vabanduskiri hilinenud tarne kohta." |
| **Formaat/piirangud** | Kui pikk, mis stiilis, mis vormingus? | "Maksimaalselt 100 sõna, sõbralik, aga professionaalne toon, ilma emoji'deta." |
| **Näited** (valikuline) | Kuidas peaks tulemus umbkaudu välja nägema? | "Sarnaselt sellele näidiskirjale: ..." |

Kõik neli ei ole alati vajalikud — lihtsa küsimuse jaoks piisab ülesandest endast. Aga mida olulisem või korduvam ülesanne, seda rohkem tasub kontekstile ja formaadile aega kulutada.

## Zero-shot vs. few-shot promptimine

**Zero-shot** prompt annab mudelile ainult juhise, ilma näideteta: *"Klassifitseeri see arvustus positiivseks või negatiivseks."*

**Few-shot** prompt lisab juhisele mõned näited soovitud tulemusest, enne kui küsid tegelikku vastust:

```
Arvustus: "Toode jõudis kiiresti ja töötab hästi." → Positiivne
Arvustus: "Karp oli katki ja toode ei tööta." → Negatiivne
Arvustus: "Ootasin rohkemat, aga käib asja eest." → ???
```

GPT-3 teadusartiklis näitasid Brown jt (2020), et suured keelemudelid õpivad uue mustri ära otse mõne prompti sees oleva näite pealt — seda nimetatakse **in-context learning'uks** — ilma et mudelit ennast ümber treenitaks ([Brown jt, 2020](https://arxiv.org/abs/2005.14165)). Praktikas tähendab see: kui tahad, et vastus järgiks kindlat mustrit, stiili või vormingut, on 1–3 head näidet sageli tõhusam kui pikk sõnaline seletus sellest, mida sa tahad.

## Struktuur ja eraldajad

Kui prompt sisaldab mitut osa (nt tausttekst + juhis + formaat), aitab neid selgelt eristada:

```
### KONTEKST
Oled klienditoe töötaja e-poes, mis müüb kodutehnikat.

### ÜLESANNE
Vasta kliendi kirjale allpool. Selgita viivituse põhjust ja paku hüvitiseks 10% allahindlust järgmiselt ostult.

### FORMAAT
Maksimaalselt 120 sõna, sõbralik toon, lõpeta küsimusega, kas klient vajab veel abi.

### KLIENDI KIRI
"Tellisin nädal tagasi pesumasina, aga see pole ikka veel kohale jõudnud..."
```

Nii OpenAI kui Anthropic soovitavad just sellist lähenemist — kasutada pealkirju, jutumärke või XML-sarnaseid silte, et eraldada juhis, kontekst ja sisend üksteisest ([OpenAI Help Center](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api); [Anthropic — Prompt engineering overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview)). Ilma sellise eraldamiseta võib mudel segamini ajada, kus lõpeb sinu juhis ja kus algab tsiteeritav tekst — eriti pikemate promptide puhul.

## Viited ja lisalugemine

- Brown, T. jt (2020). ["Language Models are Few-Shot Learners"](https://arxiv.org/abs/2005.14165)
- [OpenAI Help Center — Best practices for prompt engineering with the OpenAI API](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api)
- [Anthropic — Prompt engineering overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview)
