---
title: 7.5 Regulatsioon ja vastutus
description: EL-i AI-määruse (AI Act) riskitasemed ja ajakava ning küsimus, kes vastutab, kui AI eksib.
---

# 7.5 Regulatsioon ja vastutus

::: tip Selle tunni järel...
- tead EL-i AI-määruse (AI Act) nelja riskitaset ja üldist ajakava;
- oskad seletada, milline AI-kasutus on EL-is otseselt keelatud;
- mõistad, kes vastutab, kui ettevõtte kasutatav AI-süsteem teeb vea.
:::

## EL-i AI-määrus (AI Act)

Euroopa Liidu AI-määrus on maailma esimene laiaulatuslik AI-seadus, mis kehtib ka Eestis. See ei keela AI-d üldiselt, vaid jagab AI-süsteemid **nelja riskitasemesse** ning kohaldab iga taseme kohta erineva rangusega nõudeid:

| Riskitase | Näide | Nõue |
|---|---|---|
| **Vastuvõetamatu risk** | Sotsiaalne hindamissüsteem (*social scoring*), inimeste manipuleerimine alateadlikult, reaalajas biomeetriline tuvastus avalikus ruumis politsei poolt | **Täielikult keelatud** |
| **Kõrge risk** | Värbamistarkvara, krediidiskoorimine, kriitilise infrastruktuuri juhtimine | Range vastavushindamine, inimjärelevalve, dokumenteerimine enne turule toomist |
| **Piiratud risk** | Vestlusrobotid, deepfake-sisu | Läbipaistvuskohustus — kasutajale peab olema selge, et ta suhtleb AI-ga |
| **Minimaalne risk** | Enamik tavalisi AI-rakendusi (nt spämmifiltrid, mängude AI) | Erikohustused puuduvad |

::: warning Ajakava
- **2. veebruar 2025** — vastuvõetamatu riski keelud jõustusid.
- **2. august 2025** — üldotstarbeliste AI-mudelite (nt suured keelemudelid) pakkujate kohustused jõustusid.
- **2. august 2026** — jõustub enamik määruse reeglitest, sh kõrge riskiga süsteemide nõuded ja läbipaistvuskohustused.
- **2027–2028** — viimased, spetsiifilisemad nõuded (nt tootesse sisseehitatud AI-süsteemid) jõustuvad täielikult.

([EU AI Act — ametlik kokkuvõte](https://artificialintelligenceact.eu/high-level-summary/))
:::

Tähelepanuväärne seos [tunniga 7.1](./tund-01-kallutatus-ja-oiglus): kui Hollandi toetuste algoritm ehitataks täna, langeks see selgelt **kõrge riski** kategooriasse (avaliku sektori otsus inimeste õiguste kohta) ja nõuaks range vastavushindamise ja inimjärelevalve — täpselt neid elemente, mille puudumine 2021. aasta skandaali põhjustas.

## Kes vastutab, kui AI eksib?

[Moodulis 2.5](/tehisintellekt/moodul-02-kuidas-ai-tootab/tund-05-miks-eksib) nägime Air Canada juhtumit: lennufirma vestlurobot andis kliendile vale info leinatoetuse tagasimakse kohta ja kohus otsustas, et **ettevõte, mitte robot**, vastutab valeinfo eest — Air Canada ei saanud öelda "see oli chatbot, mitte meie".

See ei ole erand, vaid üldpõhimõte, mida ka EL-i AI-määrus kinnitab: **AI-süsteem ise ei kanna õiguslikku vastutust — vastutab organisatsioon, kes selle kasutusele võttis või selle otsuseid oma nime all rakendas.** See kehtib olenemata sellest, kas viga tuleneb kallutatud treeningandmetest ([tund 7.1](./tund-01-kallutatus-ja-oiglus)), hooletust andmekäsitlusest ([tund 7.2](./tund-02-privaatsus-ja-andmeturve)) või deepfake-pettusest, mille ohvriks langeti ([tund 7.3](./tund-03-deepfake-ja-autentsus)).

::: info Praktiline järeldus ettevõttele
"Inimene otsustuse ahelas" (*human-in-the-loop*) ei ole formaalsus — see on nii NIST AI RMF **Govern**-funktsiooni ([tund 7.4](./tund-04-riskijuhtimise-raamistikud)) kui ka EL-i AI-määruse kõrge riski nõuete keskne element just seetõttu, et vastutust ei saa üle anda süsteemile, mis ei saa seda kanda.
:::

## Kokkuvõte

See moodul liikus konkreetsetest juhtumitest (7.1–7.3) läbi struktureeritud raamistike (7.4) kuni seadusandluseni (7.5) — kõik need kirjeldavad sama tuuma: AI toob ettevõttele reaalset väärtust, aga ka reaalset riski, ning selle riski juhtimine ja sellele vastutuse võtmine on organisatsiooni, mitte tehnoloogia enda ülesanne.

## Viited ja lisalugemine

- [EU AI Act — ametlik kõrgetasemeline kokkuvõte](https://artificialintelligenceact.eu/high-level-summary/)
- [European Commission — AI Act (Shaping Europe's digital future)](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai)
