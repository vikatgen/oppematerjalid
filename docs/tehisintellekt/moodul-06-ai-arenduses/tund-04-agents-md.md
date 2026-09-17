---
title: 6.4 AGENTS.md — tööstuse standard kontekstifailidele
description: Kuidas tund 3.6 kontekstifaili idee on kasvanud kogu tööstuse ühiseks standardiks, ning kuidas Codex lahendab agendi iseseisva tegutsemise turvalisuse küsimuse.
---

# 6.4 AGENTS.md — tööstuse standard kontekstifailidele

::: tip Selle tunni järel...
- tead, mis on AGENTS.md ja kust see standard pärineb;
- mõistad, kuidas see laiendab tunnis 3.6 nähtud kontekstifaili ideed kogu tööstuse ulatuses;
- tead, kuidas Codex lahendab agendi iseseisva tegutsemise ja turvalisuse tasakaalu ("liivakast" ja kinnitusrežiimid).
:::

## AGENTS.md — "README agentidele"

[Tund 3.6](/tehisintellekt/moodul-03-promptimine/tund-06-prd-naide) näitas ideed: anna AI-agendile kontekst failina, mitte vestlusena. [Tund 2.4](/tehisintellekt/moodul-02-kuidas-ai-tootab/tund-04-tokenid) tutvustas `CLAUDE.md`/`NOTES.md`-tüüpi faile samal põhimõttel. **AGENTS.md** on selle idee tööstusülene standardiseerimine.

AGENTS.md on lihtne Markdown-fail projekti juurkataloogis — "README, aga agentidele, mitte inimestele": projekti käivitamise käsud, testimise käsud, koodistiili reeglid, mida agent peaks teadma enne tööle asumist. Standard ei nõua ühtegi kindlat välja — see on tahtlikult minimalistlik.

::: info Kust see pärineb
AGENTS.md loodi ühiselt OpenAI Codexi, Ampi, Google Jules'i, Cursori ja Factory poolt, ning seda haldab nüüd **Agentic AI Foundation** Linux Foundationi alluvuses — st see ei ole ühegi üksiku ettevõtte omand, vaid tootjaneutraalne avatud standard. Seda kasutab juba **60 000+** avatud lähtekoodiga projekti ja seda oskab lugeda **25–30+ tööriista**, sealhulgas Claude Code (importimise kaudu). Allikas: [agents.md](https://agents.md/) — ametlik standardi leht, esmane allikas.
:::

Kui projektis on juba nii `AGENTS.md` kui ka tööriistaspetsiifiline fail (nt `CLAUDE.md`), kehtib lihtne reegel: konfliktide korral võidab see fail, mida hiljem redigeeriti.

## Codex: liivakast ja kinnitusrežiimid

Kui agent tegutseb iseseisvalt (loeb/kirjutab faile, käivitab käske), tekib küsimus: kuidas vältida, et see teeks midagi ohtlikku? OpenAI Codexi ametlik dokumentatsioon eristab kahte mehhanismi:

- **Liivakast (sandbox)** — operatsioonisüsteemi tasandil jõustatud piirang failisüsteemile/võrgule. Kui käsk üritab väljuda lubatud piiridest, see lihtsalt ebaõnnestub, mitte ei küsi luba.
- **Kinnitusrežiimid (approval modes)** — poliitika selle kohta, millal agent peab peatuma ja inimeselt küsima. Nt "on-request" režiim lubab agendil liivakasti *sees* töötada täiesti iseseisvalt (faile muuta, teste käivitada, committida) ja katkestab ainult siis, kui miski üritab piirist väljuda.

::: info Miks see oluline on
Ametlik dokumentatsioon nimetab seda otsesõnu lahenduseks "kinnitusväsimusele" (*approval fatigue*) — kui agent peaks küsima luba iga üksiku sammu jaoks suure refaktoreerimise käigus, ei jõuaks kasutaja kunagi tähelepanelikult iga küsimust hinnata ja hakkaks lihtsalt kõike heaks kiitma. Targem piir (liivakast) + harvem, aga sisulisem küsimine (kinnitusrežiim) on usaldusväärsem kui pidev "kas tohin?". Allikas: [developers.openai.com/codex — Sandboxing](https://developers.openai.com/codex/concepts/sandboxing), [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security) — ametlik dokumentatsioon, esmane allikas.
:::

## Viited ja lisalugemine

- [agents.md — ametlik standard](https://agents.md/)
- [OpenAI Codex — Sandboxing](https://developers.openai.com/codex/concepts/sandboxing)
- [OpenAI Codex — Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security)
- [Tund 3.6 — Praktikas: PRD kui kontekstifail](/tehisintellekt/moodul-03-promptimine/tund-06-prd-naide)
- [Tund 2.4 — Tokenid ja LLM-id](/tehisintellekt/moodul-02-kuidas-ai-tootab/tund-04-tokenid)
