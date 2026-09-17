---
title: 6.3 Dogfooding — kuidas Anthropic ise Claude Code'i kasutab
description: Anthropicu enda inseneeriaorganisatsioon kasutab Claude Code'i peaaegu iga commit'i juures — ja Claude Code'i enda funktsioonid (subagendid, plaanirežiim) toetavad täpselt sama distsipliini, mida tund 3.6 õpetas.
---

# 6.3 Dogfooding — kuidas Anthropic ise Claude Code'i kasutab

::: tip Selle tunni järel...
- tead, mida tähendab "dogfooding" ja miks see on usaldusväärsuse märk;
- tead konkreetseid, tsiteeritud näiteid, kuidas Claude Code'i tegijad seda ise oma töös kasutavad;
- tead kaht ametlikku Claude Code'i funktsiooni (subagendid, plaanirežiim), mis toetavad tunnis 3.6 nähtud "kõigepealt plaan, siis kood" distsipliini.
:::

## Mis on "dogfooding" ja miks see loeb

**Dogfooding** ("eating your own dog food") tähendab, et ettevõte kasutab ise oma toodet igapäevases töös. See on tugev usaldusväärsuse signaal — kui tootja ise ei usaldaks tööriista, ei kasutaks nad seda oma kriitilises töös.

::: info Anthropicu enda inseneeriaorganisatsioon
Anthropicu ametlikul inseneeria-blogil kirjeldab Director of Engineering Fiona Fung, et ta pole nelja kuu jooksul näinud ainsatki commit'i, mis poleks Claude-abiga tehtud: *"every commit is Claude-assisted."* Konkreetsed sisemised harjumused, mida postitus kirjeldab:
- **"Auto-accept" režiim** prototüüpimisel — nt Vim-režiimi funktsiooni build'imisel oli umbes 70% tööst AI iseseisvalt tehtud, inimesed vaatasid tulemuse hiljem üle.
- Liikumine 6-kuulistelt roadmap'idelt **"just-in-time" planeerimisele**, kuna AI muudab plaanide elluviimise kiiruse teistsuguseks.
- Uus norm: kui koodist tekib küsimus, **"küsi enne Claude'ilt"**, mitte koodi algselt autorilt — AI-l on tihti värskem ja laiem ülevaade kogu koodibaasist.

Allikas: [Claude — Running an AI-native engineering org](https://claude.com/blog/running-an-ai-native-engineering-org) — esmane allikas, Anthropicu enda ametlik blogi.
:::

## Ametlikud funktsioonid, mis toetavad seda distsipliini

[Tund 3.6](/tehisintellekt/moodul-03-promptimine/tund-06-prd-naide) näitas Anthropicu soovitust: kõigepealt lase Claude'il "intervjueerida" sind ja koostada spetsifikatsioon, alles siis kirjuta koodi. Kaks Claude Code'i dokumenteeritud funktsiooni operatsionaliseerivad täpselt seda:

**Subagendid** — Claude Code tuleb kolme sisseehitatud subagendiga (General, Explore, Plan). Igaüks töötab oma eraldi kontekstiaknas, oma piiratud tööriistade ja õigustega. See hoiab ülesande "mürase keskosa" (failide lugemine, testitulemused, otsingutulemused) põhivestlusest eemal — sama põhimõte, mida [tund 2.4](/tehisintellekt/moodul-02-kuidas-ai-tootab/tund-04-tokenid) kontekstiakna piirangute juures käsitles.

**Plaanirežiim** (*plan mode*) — näitab, mida Claude kavatseb teha, **enne** kui midagi faktiliselt muudetakse. Selle taga töötab tihti Explore-subagent, mis kaardistab projekti struktuuri, ilma põhivestlust koormamata.

::: info Seos tunniga 3.6
See on sama "kõigepealt uuri, siis planeeri, siis kirjuta koodi" põhimõte, mida [tund 3.6](/tehisintellekt/moodul-03-promptimine/tund-06-prd-naide) SPEC.md/PRD näite kaudu õpetas — ainult et siin näeme, kuidas tööriist ise on selle distsipliini enda funktsioonidesse sisse ehitanud, ja kuidas selle looja seda ise iga päev rakendab.
:::

## Viited ja lisalugemine

- [Claude — Running an AI-native engineering org](https://claude.com/blog/running-an-ai-native-engineering-org)
- [Tund 3.6 — Praktikas: PRD kui kontekstifail](/tehisintellekt/moodul-03-promptimine/tund-06-prd-naide)
- [Tund 2.4 — Tokenid ja LLM-id](/tehisintellekt/moodul-02-kuidas-ai-tootab/tund-04-tokenid)
