---
title: Riistvara turvaline seadistamine
description: "Peatükk 5: kontori ruuter, mis jäi Mari nädalal turvaauguks. Haldusparool, haldusligipääs, püsivara uuendused ja mittevajalikud funktsioonid; varasemate turvameetmete kinnistamine."
outline: deep
---

# Riistvara turvaline seadistamine

::: info Õpiväljund
Pärast peatüki lugemist oskad selgitada riistvara seadistusriski, teha ruuteril turvamuudatuse ja kontrollida tulemust (HK 4.1 ja HK 4.2).
:::

Tarkvarast on lihtne mõelda "uuendus ja viirusetõrje". Riistvara, nagu ruuter, kaamera ja printer, jääb sageli seadistamata, sest "see lihtsalt töötab". Aga [Mari halval nädalal](./ohud) algas reedene juhtum just kontori ruuterist.

## Mis juhtus Mari ruuteriga?

Kontori ruuter on kogu võrgu värav. Ta seisis nurgas, nähtamatu ja unustatud. Tema haldusparool oli `admin`, tehase oma. Ründaja leidis ruuteri internetist (otsib selliseid seadmeid automaatselt), proovis `admin`/`admin` ja pääses sisse.

Selle järel sai ta:

- muuta DNS-i seadistust ja suunata kõik töötajad võltslehtedele (Mari kirjutab `pank.ee` ja jõuab ründaja koopiasse);
- jälgida kogu kontori liiklust;
- pääseda sisevõrgu seadmetele ligi;
- kasutada ruuterit teiste rünnakute käivitamiseks. Täpselt nii tegi [Mirai](./ohud) tuhandete ruuterite ja kaameratega.

Ruuteri ebaturvaline seadistus on täpselt see **risk**, mille [põhimõistete peatükis](./pohimoisted) riskitabelisse kirjutasid: vara (ruuter), oht (loata ligipääs), nõrkus (tehaseparool), mõju (kogu võrk).

## Viis asja, mida ruuteril kontrollida

### 1. Haldusparool

**Probleem:** tehase vaikeparool (`admin`/`admin` jms) on avalikult teada. Nimekirju on interneti täis.

**Mida teha:** muuda haldusparool pikaks ja unikaalseks. Hoia seda paroolihalduris (vt [kontode peatükk](./kontod-ja-oigused)). Pärast parooli muutmist **kontrolli**, et uus parool töötab ja vana enam mitte.

### 2. Haldusligipääs

**Probleem:** ruuteri seadistusleht on kättesaadav internetist (kaughaldus) või kõigilt Wi-Fi kasutajatelt, sealhulgas külalistelt.

**Mida teha:** luba haldus ainult sisevõrgust (või kindlalt arvutilt). Keela kaughaldus, kui seda pole vaja. Kasuta HTTPS-i, mitte HTTP-d.

### 3. Püsivara

**Probleem:** **püsivara** (*firmware*) on ruuteri sees töötav tarkvara. Vanas püsivaras on teadaolevaid turvavigu, nagu vanas Windowsis.

**Mida teha:** kontrolli versioon, uuenda tootja ametlikust allikast. Jälgi, kas tootja seadet veel toetab. Kui toetus on lõppenud, tuleb seade välja vahetada.

### 4. Mittevajalikud funktsioonid

**Probleem:** iga lahtine funktsioon on potentsiaalne sissepääs. Ruuteritel on neid palju, ja sageli on need vaikimisi sisse lülitatud.

**Mida teha:** lülita välja, mida ei kasuta: Telnet, UPnP, WPS, ligipääs USB-ketastele jne.

### 5. Wi-Fi

**Probleem:** avatud võrk või vana krüpteering.

**Mida teha:** kasuta WPA2 või WPA3 ja tugevat Wi-Fi parooli. Külalistele tee eraldi **külalisvõrk**.

::: tip Külalisvõrk
Külalised ja töötajate seadmed ei pea olema samas võrgus. Külalisvõrk annab internetti, kuid ei lase ligi sisevõrgu seadmetele. Nii ei paljasta külalise nakatunud telefon firmaserverit. See lahendaks ka [tööarvuti peatüki](./tooarvuti-turvaseadistused) olukorra 3.
:::

| Riskipunkt | Turvaline seadistus |
| --- | --- |
| Haldusparool | Pikk, unikaalne, tehase oma vahetatud |
| Haldusligipääs | Ainult sisevõrgust, HTTPS, kaughaldus väljas |
| Püsivara | Ametlik, uuendatud, toetatud seade |
| Funktsioonid | Mittevajalikud välja |
| Wi-Fi | WPA2/WPA3, külalisvõrk eraldi |

## Kuidas seadistada nii, et midagi katki ei lähe

Ruuteri seadistamisel võib minna valesti: unustad uue parooli, blokeerid endale ligipääsu. Seepärast:

1. **Dokumenteeri** algseis enne muutmist (ekraanipilt, seadistuse eksport, kui on võimalik).
2. Tee **ühe muudatuse korraga** ja kontrolli tulemust. Kui teed viis muudatust ja miski lakkab töötamast, ei tea sa, milline neist oli.
3. Tea, kuidas ruuter **tehaseseadetele taastada** (tavaliselt resetinupp), kui juurdepääs kaob. Pärast taastamist on haldusparool jälle tehase oma, seega tuleb see uuesti muuta.

## Ülesanne: Mari kontori uus ruuter

Mari kontor on saanud uue ruuteri. Seadistus on selline:

| Seadistus | Väärtus |
| --- | --- |
| Haldusparool | `admin` (tehase vaikeparool) |
| Haldusligipääs | Kättesaadav ka internetist (kaughaldus sees), HTTP |
| Püsivara | Aastast 2019. Tootja toetus lõppes 2022 |
| Funktsioonid | Telnet, UPnP ja WPS on sees |
| Wi-Fi | Üks võrk töötajatele ja külalistele. WPA2, parool `kontor2020` |

Seadistus on väljamõeldud, kuid sarnaseid olukordi leidub päriselt.

Vasta:

1. Nimeta vähemalt **kolm** ebaturvalist seadistust. Kirjuta iga kohta **risk** ja **mõju** kontorile.
2. Milline seadistus on **kõige ohtlikum** ja miks? Mida parandad esimesena?
3. Kuidas veendud pärast iga muudatust, et see **tegelikult** mõjus?
4. Mis võib parandamisel **valesti minna** (nt blokeerid endale ligipääsu) ja kuidas selle vastu end kaitsed?
5. Kuidas aitaks **külalisvõrk** selle kontori puhul?

::: warning Ära katseta päris ruuteril
Ära muuda ühtegi töötavat ruuterit (kooli, töökoha ega kodu oma) selle ülesande jaoks. Ülesanne on analüüs.
:::

**Kaitsmiseks:** ole valmis suuliselt selgitama oma riske, järjestust ja kontrollimise viisi.

## Kokkuvõte

| Valdkond | Turvaline tava |
| --- | --- |
| Haldusparool | Pikk, unikaalne, tehase oma vahetatud |
| Haldusligipääs | Ainult sisevõrgust, HTTPS, kaughaldus väljas |
| Püsivara | Ametlik, uuendatud, toetatud seade |
| Funktsioonid | Mittevajalikud välja |
| Wi-Fi | WPA2/WPA3, külalisvõrk eraldi |
| Kontroll | Dokumenteeri algseis, muuda üks asi, kontrolli |

## Allikad

- [CISA: Securing Network Infrastructure Devices](https://www.cisa.gov/news-events/news/securing-network-infrastructure-devices)
- [CISA: Heightened DDoS Threat Posed by Mirai and Other Botnets](https://www.cisa.gov/news-events/alerts/2016/10/14/heightened-ddos-threat-posed-mirai-and-other-botnets)
- [Cloudflare Learning: What is a router?](https://www.cloudflare.com/learning/network-layer/what-is-a-router/)
