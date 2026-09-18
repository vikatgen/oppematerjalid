---
title: 9.6 Kitsaskohad ja hind
description: Kallutatus, valeinfo valede eelduste korral, autoriõiguse küsimus ja keelemudelite treenimise reaalne hind — rahaline ja keskkondlik.
---

# 9.6 Kitsaskohad ja hind

::: tip Selle tunni järel...
- tunned ühte konkreetset, teadusliku uuringuga dokumenteeritud kallutatuse näidet keelemudelites;
- oskad seletada, miks keelemudel ei tunnista valedele eeldustele tuginevat küsimust;
- tead, mis on autoriõiguse küsmus keelemudeli genereeritud koodi puhul, ja et see on kohtus vaieldav, mitte lahendatud teema;
- tead suurusjärke, kui palju maksab (rahas ja CO2-s) suure keelemudeli treenimine.
:::

::: tip Seos varasemate tundidega
Kallutatuse ja hallutsinatsiooni **nähtusi** kirjeldasid juba [tund 2.3](/tehisintellekt/moodul-02-kuidas-ai-tootab/tund-03-treeningandmed), [tund 2.5](/tehisintellekt/moodul-02-kuidas-ai-tootab/tund-05-miks-eksib) ja [tund 7.1](/tehisintellekt/moodul-07-eetika-ja-riskid/tund-01-kallutatus-ja-oiglus). See tund ei korda neid juhtumeid — vaid lisab uue, spetsiifiliselt keelemudelitele suunatud uuringu ja kaks täiesti uut teemat: autoriõigus ja treenimise hind.
:::

## Kallutatus: dokumenteeritud näide keelemudelist

Suured keelemudelid on treenitud praktiliselt terve interneti peal — ja internet sisaldab palju toksilisi ja kallutatud tekste. 2021. aastal näitasid Stanfordi teadlased Abid, Farooqi ja Zou süstemaatilise uuringuga, et GPT-3 seostab moslemeid järjekindlalt vägivallaga: mudelilt küsitud analoogiaülesandes ("julge on julgusele nagu $usund on...") vastas mudel "moslem" puhul "terrorist" 23% juhtudest — palju sagedamini kui teiste usundite puhul (nt "juut" seostati kõige sagedamini rahaga, 5% juhtudest). Lause lõpetamise ülesannetes oli 66% GPT-3 genereeritud jätkudest moslemeid mainiva lause puhul seotud vägivallaga ([Abid, Farooqi & Zou, 2021](https://dx.doi.org/10.1145/3461702.3462624)).

Huvitav osa uuringust: kui prompti lisati mõni positiivne, moslemitega seostatud omadussõna, kukkus vägivaldsete jätkude osakaal 66%-lt 20%-le — endiselt kõrgem kui teiste usundite puhul, aga näitab, et kallutatus ei ole jäädav, vaid mõjutatav promptimise (vt [moodul 3](/tehisintellekt/moodul-03-promptimine/)) kaudu.

## Valeinfo valede eelduste korral

[Tund 2.5](/tehisintellekt/moodul-02-kuidas-ai-tootab/tund-05-miks-eksib) käsitles hallutsinatsiooni üldiselt. Üks eriline, keelemudelitele omane alamnähtus: mudel ei tunnista tihti, kui küsimus **tugineb valele eeldusele**. Kui küsida "Zamunda on riik Aafrikas — kes on Zamunda president?" (Zamunda on väljamõeldud riik 1988. aasta filmist "Coming to America"), ei ütle puhas, peenhäälestamata keelemudel "sellist riiki ei ole" — ta jätkab teksti, nagu oleks küsimus tavaline, ja "leiab" mudel usutava, aga täielikult väljamõeldud presidendi nime.

Põhjus on samasugune, mis [tunnis 2.5](/tehisintellekt/moodul-02-kuidas-ai-tootab/tund-05-miks-eksib) juba nähtud: lauseid tüüpi "see riik ei eksisteeri" on internetis palju harvem kui otseseid vastuseid küsimustele "kes on X president" — mudel jätkab kõige tõenäolisemat mustrit, mitte kõige ausamat. Instruktsioonidega peenhäälestamine ([tund 9.5](./tund-05-toorest-mudelist-abistajaks)) parandab seda oluliselt, kuid mitte täielikult — nagu üks levinud ütlus kokku võtab: *"mudel ei tea, et ta ei tea"*.

## Autoriõigus: kas genereeritud kood on "tuletatud teos"?

Keelemudelid, mis oskavad koodi kirjutada, on treenitud suurel hulgal avalikult kättesaadaval lähtekoodil — sealhulgas koodil, millel on avatud lähtekoodi litsentsid (nt GPL), mis nõuavad, et **tuletatud teosed** kannaksid sama litsentsi edasi. Küsimus, kas mudeli genereeritud kood, mis sarnaneb treeningandmetes olnud koodile, on "tuletatud teos" ja peaks kandma algset litsentsi, on **reaalne, vaieldud ja veel lahendamata** juriidiline küsimus.

Kõige tuntum konkreetne juhtum: 2022. aasta novembris esitasid anonüümsed arendajad GitHubi, Microsofti ja OpenAI vastu grupihagi, väites, et GitHub Copilot taasesitab autoriõigustega kaitstud avatud lähtekoodi ilma litsentsiteabe ja autoriviideteta. 2024. aastal jättis kohtunik enamiku nõudeid rahuldamata (hagejad ei suutnud tõendada, et konkreetne genereeritud kood oli piisavalt identne, et rikkumist tõendada), kuid autoriõiguse-teatiste eemaldamist käsitlev nõue (DMCA) on praeguseks (2026) apellatsioonis USA 9. ringkonnakohtus — asi ei ole lõplikult lahendatud ([BakerHostetler — The Copilot Litigation](https://www.bakerlaw.com/the-copilot-litigation/)).

::: warning Miks see ettevõttele loeb
Sama küsimus kehtib laiemalt: kas keelemudelite treenimine autoriõigustega kaitstud materjalil on *fair use* (õiglane kasutus) autoriõiguse mõttes? Vastust ei ole veel kohtupraktikas selgelt kinnistunud, mis tähendab reaalset õiguslikku ebamäärasust ettevõtetele, kes AI-genereeritud koodi või sisu ärilisel eesmärgil kasutavad.
:::

Sellised peenhäälestatud mudelid võivad jõuda kasutusse ka valdkondades, kus vigadel on suur mõju inimeste elule — näiteks laenutaotluste, riigieksamite või kohtuotsuste juures. Eestis on Riigikohtu esimees Villu Kõve avalikult maininud, et kohtute personalipuudust võiks osaliselt leevendada tehisintellekti kasutamine tehnilisemat laadi töölõikudes — sõnastades selle selgelt **abistava**, mitte kohtunikke asendava tööriistana ([Riigikohus — Villu Kõve](https://www.riigikohus.ee/et/uudiste-arhiiv/villu-kove-kohtute-toojoupuudust-aitaks-leevendada-tehisintellekt)).

## Treenimise hind: raha ja CO2

Suurte keelemudelite treenimine on üliressursimahukas — nii rahaliselt kui keskkondlikult.

| Mudel | Suurus | Treenimisressurss | Hinnang |
|---|---|---|---|
| GPT-3 (2020) | 175 miljardit parameetrit | ~355 GPU-aastat (V100-l) | ~4,6 miljonit USD ([Lambda Labs](https://lambda.ai/blog/demystifying-gpt-3)) — analüüsi autorite oma hoiatusega, et see on lihtsustatud alammäär, tegelik kulu suurema hajutatud klastriga oli tõenäoliselt kõrgem |
| Llama 3.1 405B (Meta, aprill 2024) | 405 miljardit parameetrit | 39,3 miljonit GPU-tundi (H100), 16 000+ GPU-d | Meta ametlik hinnang: **11 390 tonni CO2 ekvivalenti** kasvuhoonegaaside heidet treenimise jooksul ([Meta — Llama 3.1 mudelikaart](https://ai.meta.com/blog/meta-llama-3-1/)) |

Viimane number tuleb otse Meta oma ametlikust avaldusest, mitte hinnangust — see näitab, et suurte mudelite treenimise keskkonnamõju ei ole enam hüpoteetiline, vaid ettevõtted mõõdavad ja avaldavad seda juba ise.

::: info Suurusjärgu jaoks
Varasem, sageli viidatud akadeemiline uuring hindas, et GPT-3 suurusjärgus mudeli treenimine tekitab CO2 heidet, mis on võrreldav mitme keskmise sõiduki kogu elutsükli heitkogusega ([Strubell, Ganesh & McCallum, 2019 — "Energy and Policy Considerations for Deep Learning in NLP"](https://aclanthology.org/P19-1355/)). Meta enda 2024. aasta värskem number on nüüd otse ettevõtte oma avaldatud, mitte kolmanda osapoole hinnang.
:::

## Viited ja lisalugemine

- Abid, A., Farooqi, M., Zou, J. (2021). ["Persistent Anti-Muslim Bias in Large Language Models"](https://dx.doi.org/10.1145/3461702.3462624), AAAI/ACM Conference on AI, Ethics, and Society
- [BakerHostetler — The Copilot Litigation](https://www.bakerlaw.com/the-copilot-litigation/)
- [Riigikohus — Villu Kõve: kohtute tööjõupuudust aitaks leevendada tehisintellekt](https://www.riigikohus.ee/et/uudiste-arhiiv/villu-kove-kohtute-toojoupuudust-aitaks-leevendada-tehisintellekt)
- [Lambda Labs — Demystifying GPT-3](https://lambda.ai/blog/demystifying-gpt-3)
- [Meta AI — Introducing Llama 3.1](https://ai.meta.com/blog/meta-llama-3-1/)
- Strubell, E., Ganesh, A., McCallum, A. (2019). ["Energy and Policy Considerations for Deep Learning in NLP"](https://aclanthology.org/P19-1355/), ACL 2019
