---
title: Riistvara turvaline seadistamine
description: "Tund 10: kontori ruuter, mis jäi Mari nädalal turvaauguks. Haldusparool, haldusligipääs, püsivara uuendused ja mittevajalikud funktsioonid; varasemate turvameetmete kinnistamine."
outline: deep
---

# Riistvara turvaline seadistamine

::: info Õpiväljund
Pärast tundi oskad selgitada riistvara seadistusriski, teha ruuteril turvamuudatuse ja kontrollida tulemust (HK 4.1 ja HK 4.2).
:::

Tarkvarast on lihtne mõelda "uuendus ja viirusetõrje". Riistvara, nagu ruuter, kaamera ja printer, jääb sageli seadistamata, sest "see lihtsalt töötab". Aga [Mari halval nädalal](./ohud) algas reedene juhtum just kontori ruuterist.

## Mis juhtus Mari ruuteriga?

Kontori ruuter on kogu võrgu värav. Ta seisis nurgas, nähtamatu ja unustatud. Tema haldusparool oli `admin`, tehase oma. Ründaja leidis ruuteri internetist (otsib selliseid seadmeid automaatselt), proovis `admin`/`admin` ja pääses sisse.

Selle järel sai ta:

- muuta DNS-i seadistust ja suunata kõik töötajad võltslehtedele (Mari kirjutab `pank.ee` ja jõuab ründaja koopiasse);
- jälgida kogu kontori liiklust;
- pääseda sisevõrgu seadmetele ligi;
- kasutada ruuterit teiste rünnakute käivitamiseks. Täpselt nii tegi [Mirai](./ohud) tuhandete ruuterite ja kaameratega.

Ruuteri ebaturvaline seadistus on täpselt see **risk**, mille [tunnis 6](./pohimoisted) riskitabelisse kirjutasid: vara (ruuter), oht (loata ligipääs), nõrkus (tehaseparool), mõju (kogu võrk).

## Viis asja, mida ruuteril kontrollida

### 1. Haldusparool

**Probleem:** tehase vaikeparool (`admin`/`admin` jms) on avalikult teada. Nimekirju on interneti täis.

**Mida teha:** muuda haldusparool pikaks ja unikaalseks. Hoia seda paroolihalduris (vt [kontode tund](./kontod-ja-oigused)). Pärast parooli muutmist **kontrolli**, et uus parool töötab ja vana enam mitte.

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
Külalised ja töötajate seadmed ei pea olema samas võrgus. Külalisvõrk annab internetti, kuid ei lase ligi sisevõrgu seadmetele. Nii ei paljasta külalise nakatunud telefon firmaserverit. See lahendaks ka [tunni 9](./tooarvuti-turvaseadistused) olukorra 3.
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

## Praktiline töö: Mari kontori ruuteri parandamine

Töö tehakse **kooli tööst eraldatud laboriruuteriga**. Ära kunagi muuda kooli või kodu töötavat ruuterit.

Töötage 2–3 liikme rühmades. Õpetaja on seadistanud ruuteris tahtlikud vead, just sellised nagu Mari kontori ruuteril.

1. **Algseis.** Logi ruuterisse (õpetaja annab aadressi ja esialgse parooli). Pane kirja, millised on haldusparool, haldusligipääs, püsivara versioon, Wi-Fi turvalisus ja lahtised funktsioonid.
2. **Riskid.** Tuvasta vähemalt kolm ebaturvalist seadistust ja kirjuta iga kohta, milline on risk ja mõju (nagu Mari reede).
3. **Parandus.** Paranda vähemalt **kaks** seadistust (nt muuda haldusparool, keela kaughaldus, lülita välja Telnet).
4. **Kontroll.** Kontrolli, et muudatus mõjus: logi uue parooliga sisse, proovi vana parooli, proovi haldusliidesesse sisenemist keelatud kohast.
5. **Dokumentatsioon.** Täida [vorm](./dokumenteerimisvorm). Iga õpilane kirjutab oma protokolli ise ja märgib, mida just tema tegi.

Rühmad vahetavad tööpunkte, et igaüks saaks teha vähemalt ühe muudatuse ja ühe kontrolli. Ülejäänud aja saab lõpetada varasemaid arvutitöid või korrata.

::: warning Saladused
Haldusparooli, Wi-Fi parooli ega taastamiskoodi ei kirjutata protokolli. Kirjuta "parool muudetud, uus parool pikkusega 16 märki", mitte parool ise.
:::

**Esitatav töö:** ruuteri seadistusprotokoll ja vajaduse korral parandatud varasemad tööd. **Seos: HK 4.1 ja HK 4.2.**

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
