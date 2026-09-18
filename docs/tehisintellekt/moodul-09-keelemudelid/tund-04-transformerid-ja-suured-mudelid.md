---
title: 9.4 Transformerid ja suurte mudelite plahvatuslik areng
description: GPT-2-st GPT-3-ni — kontekst, mastaap, ja zero/few-shot õppimise "šokk", mis NLP-teadlasi 2020. aastal üllatas.
---

# 9.4 Transformerid ja suurte mudelite plahvatuslik areng

::: tip Selle tunni järel...
- tead, mille poolest Transformer-mudel erineb [tund 9.3](./tund-03-sonavektorid-ja-narvivorgud) närvivõrgupõhisest mudelist — sama ülesanne, palju suurem kontekst;
- tead GPT-2 ja GPT-3 konkreetseid arengunumbreid (andmemaht, parameetrid);
- oskad seletada, mida tähendab zero-shot/few-shot õppimine ja miks see NLP-teadlasi üllatas;
- tunned mõistet "emergentne oskus" (*emergent ability*).
:::

::: tip Seos varasemate tundidega
Transformer-arhitektuur ja tähelepanumehhanism (*attention*) on juba tutvustatud [tunnis 1.2](/tehisintellekt/moodul-01-mis-on-ai/tund-02-ai-ajalugu) ja [tunnis 2.4](/tehisintellekt/moodul-02-kuidas-ai-tootab/tund-04-tokenid) — seda siin ei kordata. Zero-shot/few-shot promptimine on põhjalikult kaetud [tunnis 3.2](/tehisintellekt/moodul-03-promptimine/tund-02-prompti-anatoomia). See tund vaatab, **miks** ja **kui suures mastaabis** see kõik toimib.
:::

## Sama ülesanne, palju suurem mastaap

Transformer-põhine keelemudel teeb täpselt sama, mida [tund 9.3](./tund-03-sonavektorid-ja-narvivorgud) närvivõrgupõhine mudel — arvutab tõenäosusjaotuse kõikide võimalike järgmiste tokenite üle, arvestades eelnevat konteksti. Erinevus on kahes asjas:

- **Palju suurem kontekst** — mitte mõni eelnev sõna, vaid tüüpiliselt 1024–4096 tokenit varasematel mudelitel, uuematel mudelitel juba sadu tuhandeid kuni miljon tokenit ([tund 2.4](/tehisintellekt/moodul-02-kuidas-ai-tootab/tund-04-tokenid)).
- **Keerulisem arhitektuur** — tähelepanumehhanism ja palju rohkem kihte, mis lubab mudelil arvestada seoseid ka teksti alguse ja lõpu vahel, mitte ainult vahetu läheduse vahel.

## GPT-2 → GPT-3: konkreetsed numbrid

Kõige selgemini näitab mastaabihüpet kahe järjestikuse OpenAI mudeli võrdlus.

**GPT-2 (veebruar 2019)** treenimisandmed olid nimega *WebText* — kõik lehed, millele viidati Redditi postitustest, mis olid saanud vähemalt 3 "karma" punkti (kvaliteedifilter: "inimesed pidasid seda huvitavaks või kasulikuks"). Kokku moodustas see üle 8 miljoni dokumendi ja 40 GB teksti — teadlikult **Vikipeediata**, sest Vikipeediat kasutatakse tihti hiljem mudeli testimiseks ja seganduks andmestikuga ([OpenAI — Language Models are Unsupervised Multitask Learners](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf)). Suurim versioon, GPT-2 XL, koosnes 48 kihist ja ~1,5 miljardist parameetrist.

**GPT-3 (2020)** oli ligikaudu 100 korda suurem: 175 miljardit parameetrit ja treenitud ligikaudu 300 miljardi tokeni peal — sisaldades filtreeritud veebiteksti (Common Crawl), raamatuid ja Vikipeediat, mitmes keeles ([Brown jt, 2020](https://arxiv.org/abs/2005.14165)).

| | GPT-2 (2019) | GPT-3 (2020) |
|---|---|---|
| Parameetrid | ~1,5 miljardit | 175 miljardit |
| Treeningandmed | ~40 GB (WebText, ilma Vikipeediata) | ~300 miljardit tokenit (Common Crawl, raamatud, Vikipeedia jm) |
| Kihte | 48 | 96 |

## Zero-shot/few-shot õppimise "šokk"

[Tund 3.2](/tehisintellekt/moodul-03-promptimine/tund-02-prompti-anatoomia) tutvustas zero-shot ja few-shot promptimist ning Brown jt (2020) in-context learning'u leidu. Selle avastuse taust on oluline: enne GPT-3-e pidi eeltreenitud keelemudelit **iga konkreetse ülesande jaoks eraldi peenhäälestama** — näiteks masintõlke või toksiliste kommentaaride tuvastamise jaoks oleks tulnud koguda tuhandeid annoteeritud näiteid ja treenida sellega uus mudel.

GPT-3 näitas, et piisavalt suurel mudelil piisab ülesande **lihtsalt loomuliku keelega kirjeldamisest** (ja mõnest näitest, kui neid lisada) — ilma eraldi peenhäälestamiseta. See oli suur, osade teadlaste sõnul isegi "šokeeriv" üllatus valdkonna sees, sest see muutis põhimõtteliselt viisi, kuidas keelemudeleid rakendustesse kasutati.

**Miks see üldse töötab?** Internet on täis kõikvõimalikke ülesandeid ja nende lahendusi — küsimusi ja vastuseid, tõlkeid, kokkuvõtteid. Piisavalt suur mudel, kes on õppinud internetti hästi jäljendama, on kaudselt näinud tuhandeid näiteid sellest, kuidas selliseid ülesandeid tavaliselt lahendatakse — ja oskab seda mustrit ka uue, esmakordselt nähtud ülesande peal rakendada.

## Skaala ja "platood ei ole näha"

OpenAI treenis GPT-3 uuringu jaoks mitu erineva suurusega mudelit, samadel andmetel, ja mõõtis, kuidas zero/few-shot oskus suurusega muutub. Tulemus: otsene, järjekindel seos suuruse ja oskuse vahel, ning **selget "platood" — punkti, kust edasi rohkem parameetreid ei aitaks — ei ole näha** ([Brown jt, 2020](https://arxiv.org/abs/2005.14165)). See on üks peamisi põhjuseid, miks tehnoloogiaettevõtted on sellest ajast peale üritanud treenida üha suuremaid mudeleid.

### Emergentsed oskused

Veel huvitavam nähtus: paljud keerulisemad oskused ei parane suurusega **sujuvalt**, vaid tekivad pigem "äkki" — väiksem mudel ei suuda ülesannet üldse lahendada (tulemus on peaaegu juhuslik), suurem mudel suudab seda äkki hästi. Sellist nähtust nimetatakse **emergentseks oskuseks** (*emergent ability*): oskus, mida ei saanud väiksemate mudelite tulemuste pealt ette näha, kuni mudel jõudis piisavalt suureks ([Wei jt, 2022 — "Emergent Abilities of Large Language Models"](https://arxiv.org/abs/2206.07682)).

::: info Praktiline tähendus
Kui mudel ei oska täna mingit ülesannet lahendada, ei tähenda see, et see on jäädavalt võimatu — mastaabi kasvades on korduvalt nähtud, et oskus "ilmub" ootamatult järgmise suurusklassi mudelis.
:::

## Viited ja lisalugemine

- [OpenAI — Language Models are Unsupervised Multitask Learners (GPT-2)](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf)
- Brown, T. jt (2020). ["Language Models are Few-Shot Learners"](https://arxiv.org/abs/2005.14165) (GPT-3)
- Wei, J. jt (2022). ["Emergent Abilities of Large Language Models"](https://arxiv.org/abs/2206.07682)
- [Wikipedia — GPT-2](https://en.wikipedia.org/wiki/GPT-2)
- [Wikipedia — GPT-3](https://en.wikipedia.org/wiki/GPT-3)
