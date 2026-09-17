---
title: 6.2 Reaalsed näited — kuidas suured tarkvaraettevõtted AI-d kasutavad
description: Stripe, Ramp, Rakuten, Classmethod, CircleCI ja GitHubi enda uuring — kontrollitud, nimega näited AI-koodiagentide kasutusest suures mahus.
---

# 6.2 Reaalsed näited — kuidas suured tarkvaraettevõtted AI-d kasutavad

::: tip Selle tunni järel...
- tead viit nimega, kontrollitud näidet suurtest tarkvaraettevõtetest, kes kasutavad AI-koodiagente igapäevaselt suures mahus;
- tead konkreetseid, allikale viidatud arve (mitte üldiseid lubadusi) selle kasutuse mõju kohta;
- oskad tuua näite ka teaduslikult kontrollitud (RCT) uuringust, mis kinnitab sarnast mõju laiemalt.
:::

::: info Stripe
Makseplatvorm Stripe'il on 1370 insenerist koosnev arendustiim ning Claude Code on vaikimisi paigaldatud igale töölaptopile. Üks meeskond migreeris **10 000 rida Scala koodi Java'sse 4 päevaga** — hinnanguline käsitsitöö maht oleks olnud umbes 10 inseneri-nädalat. Arendusinfrastruktuuri meeskonnajuht Scott MacVicar: *"Claude Code is pre-installed on everyone's laptop. It just works out of the box."* ([Claude — Stripe juhtumiuuring](https://claude.com/customers/stripe))
:::

::: info Ramp
Fintech-ettevõte Ramp'is genereeritakse üle 1 miljoni rea AI-soovitatud koodi kuus ja 50% inseneridest kasutab Claude Code'i iganädalaselt. Intsidentide uurimisele kuluv aeg on vähenenud kuni **80%**. ([Claude — Ramp juhtumiuuring](https://claude.com/customers/ramp))
:::

::: info Rakuten
Jaapani e-kaubanduse hiid Rakuten kasutab Claude Code'i läbi kogu arendustsükli — ühiktestide kirjutamine, API-de mock'imine, vigade parandamine, dokumentatsiooni koostamine. Uued töötajad kasutavad seda tundmatu koodibaasi kiiremaks mõistmiseks. ([Claude — Rakuten juhtumiuuring](https://claude.com/customers/rakuten))
:::

::: info Classmethod
Jaapani IT-konsultatsiooniettevõtte Classmethod avatud lähtekoodiga projekt "rulesync" on **99% ehitatud Claude Code'iga**. Ülesanded, mis varem võtsid 24 tundi, võtavad nüüd umbes 1 tunni. ([Claude — Classmethod juhtumiuuring](https://claude.com/customers/classmethod))
:::

::: info CircleCI
CI/CD-platvormi CircleCI arendusmeeskonnast kasutab Claude Code'i **90%**, ja igapäevane kasutus on struktureeritud juurutuse järel kasvanud **9 korda**. ([Claude — CircleCI juhtumiuuring](https://claude.com/customers/circleci))
:::

## Teaduslikult kontrollitud kinnitus laiemalt

Üksikud juhtumiuuringud näitavad, mis on *võimalik* — aga kas mõju on laiem? GitHub ja Accenture viisid läbi randomiseeritud kontrollitud uuringu (RCT — kõige usaldusväärsem uuringudisain) GitHub Copiloti mõju kohta:

| Näitaja | Mõju |
|---|---|
| Loodud pull request'ide arv | +8,69% |
| PR-ide mestimise (merge) määr | +15% |
| Edukate build'ide osakaal | +84% |

Lisaks näitas eraldi kontrollitud katse, et Copilot-grupp lõpetas ülesanded **55% kiiremini** kui grupp ilma Copilotita (78% vs 70% lõpetamismäär). Allikas: [GitHub Blog — Quantifying GitHub Copilot's impact in the enterprise, with Accenture](https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-in-the-enterprise-with-accenture/) — esmane allikas, RCT-disain.

::: warning Aga...
[Tund 6.5](./tund-05-teaduslik-pilt) näitab ka vastupidist, teaduslikult sama rangelt kontrollitud tulemust — mõju ei ole alati ega automaatselt positiivne. Enne järelduste tegemist tasub näha tervikpilti.
:::

## Viited ja lisalugemine

- [Claude — Stripe](https://claude.com/customers/stripe)
- [Claude — Ramp](https://claude.com/customers/ramp)
- [Claude — Rakuten](https://claude.com/customers/rakuten)
- [Claude — Classmethod](https://claude.com/customers/classmethod)
- [Claude — CircleCI](https://claude.com/customers/circleci)
- [GitHub Blog — Accenture study](https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-in-the-enterprise-with-accenture/)
