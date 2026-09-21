---
title: Lüliti, marsruuter ja võrguseadme tulemüür
description: Mille poolest erineb füüsiline server virtuaalmasinast, mis vahe on lülitil ja marsruuteril, ning kuidas nftables piirab võrguseadme läbivat liiklust INPUT ja FORWARD ahelate abil.
outline: deep
---

# Lüliti, marsruuter ja võrguseadme tulemüür

::: warning See osa on teooriapõhine — käed-külge harjutus vajab kooli füüsilist riistvara
Allikmaterjal ütleb otse: *"Seda harjutust ei saa ausalt asendada kahe VM-iga samal hostil."* Päris harjutus vajab **kahte eraldi füüsilist serverit ja klienti**, eraldi kaablite või lülititega — midagi, mida meie VirtualBoxi-põhine kodulabor ei paku ega peagi teesklema pakkuvat. See leht katab mõisted, mida hindaja hiljem eeldab, aga ilma näpuga järgi tehtavate käskudeta. Kui koolil tekib selleks füüsiline riistvara, lisandub siia hiljem eraldi käed-külge osa.
:::

## Meeskonna kolmekümnes küsimus sinule

Meeskonna vanemarendaja küsib midagi, mida oleme siiani vaikimisi eeldanud: "kas kaks meie VirtualBoxi serverit on tegelikult **kaks** serverit, või ainult kaks nime samas masinas?"

## Füüsiline server — jagatud rikkepiir

**VM kasutab füüsilise hosti ressursse.** Meie `srv1` ja `srv2` on kaks **kaks korterit samas majas** — nad jagavad sama maja elektrikatkestust. Kui su enda arvuti (host) välja lülitub, lülituvad **mõlemad** VM-id korraga välja.

::: warning Kaks VM-i pole kaks füüsilist serverit
See tähendab: kõik, mida oleme selle mooduli jooksul ehitanud, kaitseb meid loogiliste vigade (vale seadistus, katkine teenus) eest, aga **mitte** füüsilise riistvara ühise rikke eest. [Teenuse teisaldamine ja sõltumatu koopia](./teenuse-teisaldamine-ja-soltumatu-koopia) osas juba nägime sama loogikat 3-2-1 põhimõtte juures — srv2 samal hostil pole päris sõltumatu varukoopia. Rikkepiiri hindamine (kas kaks "asja" jagavad ühte võimalikku rikkekohta) vajab alati konkreetset küsimust: **mis täpselt** on jagatud?
:::

## Alternatiivne tehnoloogia — sama ülesanne, erinev tööriist

Nginx ja Apache lahendavad **sarnast** veebiteenuse ülesannet — kaks eri tootja kohvimasinat valmistavad kohvi, aga eri juhtpaneeliga. Seadistuskeel ja haldusvõtted erinevad, aga **teenuse vajadus jääb samaks**.

::: tip Hostname muutmine ei loo uut tehnoloogiat
Kahe VM-i erinev **nimi** (`srv1`, `srv2`) ei tähenda kahte eri tehnoloogiat — mõlemad kasutavad meie kursusel sama Nginxit. Kahe **päriselt erineva** veebiserveri tehnoloogia (nt Nginx vs Apache) võrdlemine on eraldi, teadlik õpieesmärk, mida meie labor praegu ei kata.
:::

## Lüliti — kohalik koridor

**Lüliti** (L2) ühendab **sama kohaliku võrgu** seadmeid, kasutades kaadrite suunamiseks **MAC-aadresse**. Koridor ühendab sama korruse ruume — see on kiire ja lihtne, aga ainult **ühe** korruse piires.

::: warning Lüliti ei marsruudi alamvõrkude vahel automaatselt
Tavaline L2 lüliti **ei** tea eri IP-alamvõrkudest midagi — kui su kaks masinat on eri alamvõrkudes (nagu meie labori `192.168.56.0/24` vs mõne teise kooli võrgusegmendi), ei aita lüliti üksi neid ühendada. Eri IP võrkude vahel liikumine vajab **teistsugust** otsust kui kohaliku ukse leidmine.
:::

## Marsruuter — kahe linna vaheline buss

**Marsruuter** (L3) ühendab **eri IP võrke**. Edastamine peab olema **selgesõnaliselt lubatud**, ja **mõlemal** poolel peab olema **tagasitee** — kahe linna vaheline buss vajab teed mõlemas suunas, mitte ainult ühes.

::: tip Miks server näeb päringut, aga klient ei saa vastust
Kui üks suund töötab (server näeb sissetulevat päringut), aga vastus ei jõua kliendini tagasi, on põhjus tavaliselt **tagasimarsruudi puudumine** või mõni filter, mis blokeerib just vastuse — mitte tingimata midagi vales esimeses suunas.
:::

## Võrguseadme tulemüür — INPUT vs FORWARD

Võrguseadme (marsruuteri) tulemüüril on kaks eri ahelat kahe eri asja jaoks:

| Ahel | Puudutab |
| --- | --- |
| **INPUT** | liiklust, mis on suunatud **seadmele endale** |
| **FORWARD** | liiklust, mis lihtsalt **läbib** seda seadet, teel kuhugi mujale |

::: warning Serveri UFW ei tõenda võrguseadme FORWARD poliitikat
[Tulemüür ja UFW](./tulemuur-ja-ufw) osas seatud serveri UFW reeglid on **INPUT**-tüüpi (kaitsevad serverit ennast) — need ei ütle midagi selle kohta, kuidas eraldi **marsruuter** peaks piirama läbivat liiklust **teiste** klientide vahel. Jaamahoone ukselukk (INPUT) ja läbi jaama sõitva bussi kontroll (FORWARD) on kaks eri asja. Klientidevahelise läbiliikluse piiramine vajab **FORWARD** ahelat, mitte INPUT-i.
:::

## Segmenteerimine ja NAT — kaks eri otsust

**Eri alamvõrgud** eraldavad aadressiruumi, aga **kahe toa sildistamine ei ehita seina** — kui klient ja server suhtlevad **otse** (samas L2 võrgus), ei kontrolli kõrval seisev ruuter nende liiklust üldse, olenemata sellest, mitu alamvõrku on defineeritud.

**NAT** (aadressi ümberkirjutamine) ja **marsruutimine** (õige tee valimine) on **kaks eri toimingut**. Marsruutimine võib toimida täiesti ilma NAT-ita — meie enda labori privaatvõrgud (`192.168.56.0/24`) kasutavad juba otsemarsruute host-only kaardil, ilma NAT-ita; NAT-i näeme ainult NAT-liidesel, kui liigume laborist internetti.

## nftables — tabel, ahel, reegel

Kaasaegne Linuxi tulemüürisüsteem `nftables` ehitub kolme tasandi peale:

- **Tabel** sisaldab ahelaid.
- **Ahel** seostub kindla paketi töötlemise **etapiga** (nt `forward`).
- **Reeglid** rakenduvad **järjekorras** — varasem lubamine võib määrata tulemuse enne hilisemat keeldu.

::: warning Ära `flush ruleset` kooli olemasolevas ruuteris
Reeglistikku ei tohi suvaliselt segada teise haldusvahendi hallatud reeglitega, ja kooli olemasoleva, päris tootmisruuteri reeglite täielik tühjendamine (`flush ruleset`) eemaldaks ka kõik muud, juba vajalikud turvareeglid — mitte ainult harjutuse enda oma.
:::

**Olekuline lubamine** (`ct state established,related accept`) lubab juba tuvastatud ühenduse **vastused** läbi, ilma et peaksid looma identset lubareeglit vastassuunas — täpselt sama põhimõte, mis [Tulemüür ja UFW](./tulemuur-ja-ufw) osas serveri tulemüüri "suund ja olek" sektsioonis juba nägime, ainult nüüd eraldi võrguseadme, mitte serveri enda tasandil.

## Kokkuvõte

| Mõiste | Tähendus |
| --- | --- |
| VM vs füüsiline server | jagavad sama hosti rikkepiiri, isegi kui tunduvad eraldi |
| Lüliti (L2) vs marsruuter (L3) | kohalik võrk vs eri IP-võrkude vaheline liikumine |
| INPUT vs FORWARD | seadmele endale vs seadmest lihtsalt läbi minev liiklus |
| Segmenteerimine | alamvõrgud eraldavad aadressiruumi, aga ei ehita üksi seina |
| NAT vs marsruutimine | kaks eri toimingut, üks ei eelda teist |
| `nftables`: table → chain → rule | reeglid rakenduvad järjekorras, established/related lubab vastuseid |

## Allikad

- [nftables — ametlik käsiraamat](https://netfilter.org/projects/nftables/manpage.html)
