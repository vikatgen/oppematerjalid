---
title: Võrgu koormuse mõõtmine
description: "Tund 4: Mari kaebab, et internet on aeglane. Kuidas teha kindlaks, mis täpselt aeglane on: edastuskiirus, viivitus või paketikaod, ning kuidas mõõta, kui palju erinevad tegevused võrku koormavad."
outline: deep
---

# Võrgu koormuse mõõtmine

::: info Õpiväljund
Pärast tundi oskad teisendada võrgu ühikuid (bitt, bait, Mbit/s, MB/s), mõõta operatsioonisüsteemi vahenditega erinevate tegevuste võrgukasutust ning selgitada, miks tulemused erinevad.
:::

## Mari kaebab: "Internet on aeglane"

Neljapäeval kell 14 tuleb Mari sinu juurde: "Internet on täna aeglane." Mida sa ütled? Kui vastad "tõesti?", siis ei lahendanud sa midagi. "Aeglane" võib tähendada kolme erinevat asja:

| Mari kirjeldus | Tegelik probleem | Mõõdik |
| --- | --- | --- |
| "Fail laeb aeglasemalt kui tigu jookseb" | Andmeid liigub vähe | **Edastuskiirus** |
| "Kui klõpsan, siis juhtub midagi alles pärast pikka pausi" | Iga pakett on teel kaua | **Viivitus** |
| "Zoomis hakkab pilt sagedasti kokku jooksma" | Paketid lähevad kaduma | **Paketikaod** |

Üks sõna "aeglane", kolm erinevat põhjust ja kolm erinevat lahendust. Enne kui midagi parandad, pead **mõõtma**, milline neist on.

## Bitid ja baidid: miks Mari 100 megat ei saa 100 sekundiga

Mari ühendus on lepingus kirjas **100 Mbit/s**. Ta laeb alla 500 MB faili ja arvutab: "100 megat sekundis, seega 5 sekundit." Tegelikult kulub ligi 40 sekundit. Miks?

Sest tähed `b` ja `B` ei tähenda sama asja:

- **Bitt** (*bit*, väike `b`) on väikseim andmeühik: 0 või 1.
- **Bait** (*byte*, suur `B`) on 8 bitti.

Võrgu kiirust antakse **bittides** sekundis (Mbit/s), failide suurust **baitides** (MB). Selleks, et neid võrrelda, tuleb ühik sama teha.

| Ühik | Tähendus |
| --- | --- |
| `kbit/s` (või `kbps`) | tuhat bitti sekundis |
| `Mbit/s` (või `Mbps`) | miljon bitti sekundis |
| `Gbit/s` | miljard bitti sekundis |
| `MB/s` | miljon **baiti** sekundis |

**Teisendus:** `1 MB/s = 8 Mbit/s`, ehk baitides on arv 8 korda väiksem.

Mari näide:

```text
100 Mbit/s ÷ 8 = 12,5 MB/s
500 MB ÷ 12,5 MB/s = 40 sekundit
```

See on veel teoreetiline kiirus allalaadimiseks. Päris elus kulub tavaliselt veidi kauem, sest osa kiirusest kulub päiste ja kontrolli peale ning teised seadmed kasutavad sama ühendust.

## Neli mõõdikut Mari näitel

| Mõõdik | Küsimus | Ühik | Mari näide |
| --- | --- | --- | --- |
| **Ribalaius** (*bandwidth*) | Kui palju oleks maksimaalselt võimalik? | Mbit/s | Mari leping lubab 100 Mbit/s |
| **Edastuskiirus** (*throughput*) | Kui palju tegelikult sekundis liigub? | Mbit/s | Faili allalaadimine näitab 60 Mbit/s |
| **Viivitus** (*latency*) | Kui kaua kulub pakettil teekonnale? | ms | `ping` näitab 25 ms |
| **Paketikadu** (*packet loss*) | Mitu protsenti pakette ei jõua kohale? | % | Zoomi ajal kadus 3% |

Ribalaius on toru jämedus, edastuskiirus on see, kui palju vett toru kaudu tegelikult voolab, ja viivitus on aeg, mis kulub vee jõudmiseks toru teise otsa.

Erinevad tegevused vajavad erinevat. Vaata Mari päeva:

| Mari tegevus | Mis on talle kõige olulisem | Miks |
| --- | --- | --- |
| Dokumendi kirjutamine pilves | Madal viivitus | Iga tähe salvestamine peab olema kiire, kuid andmeid on vähe |
| 2 GB faili allalaadimine | Kõrge edastuskiirus | Viivitus ei loe, loeb, kui kiiresti kogu fail kohale jõuab |
| Zoomi koosolek | Püsiv kiirus, väike viivitus, **peaaegu null** paketikadu | Hilinenud või puuduv heli ja pilt rikuvad kõne |

## Kust vaadata: mõõtmisvahendid

Mari arvutis näitab operatsioonisüsteem ise, kui palju võrku parasjagu kasutatakse.

| Süsteem | Vahend |
| --- | --- |
| Windows | **Task Manager** → *Performance* → *Ethernet* / *Wi-Fi* (kogu liiklus). **Resource Monitor** → *Network* (protsesside kaupa) |
| macOS | **Activity Monitor** → *Network* (protsesside kaupa, kogu liiklus allosas) |
| Linux | `ip -s link` (loendurid), graafilised monitorid või tööriistad nagu `nload` |

Lisaks saab mõõta ühenduse maksimumi **kiirustestiga** (nt `speedtest.net`, `fast.com`) ja viivitust käsuga `ping`.

## Mari katse: kolm olukorda, üks tabel

Et teada saada, mis Marile tegelikult mõjub, mõõdad tema arvutis kolm olukorda ükshaaval.

1. **Jõudeolek.** Brauser on avatud, aga midagi ei toimu. Siin näed **taustaliiklust**: uuendused, sünkroniseerimine, taustarakendused.
2. **Faili allalaadimine.** Siin näed, kui palju ühendus **maksimaalselt** annab.
3. **Video vaatamine.** Siin näed, kui palju **pidevat** liiklust üks tegevus vajab.

Tulemus võiks välja näha selline (näitenumbrid):

| Tegevus | Mõõtmise aeg | Alla (Mbit/s) | Üles (Mbit/s) | Märkused |
| --- | --- | --- | --- | --- |
| Jõudeolek | 14:02, 60 s | 0,3 | 0,1 | Windows uuendus taustal |
| Allalaadimine (500 MB) | 14:05, 40 s | 85 | 1 | Kaabel, kõik muud rakendused kinni |
| Video (1080p) | 14:10, 60 s | 6 | 0,1 | Wi-Fi, 5 m ruuterist |

Mida see näitab? Marile sobiv ühendus on olemas (allalaadimine andis 85 Mbit/s 100-st). Video vajab ainult 6 Mbit/s, seega videot vaadates ei pea olema muret. Aga kui Mari **ja** kümme kolleegi vaatavad sama aega videot, on neil kokku 66 Mbit/s vaja. Selleni jõuame [järgmises tunnis](./vorgunouete-arvutamine).

## Mõõtmisel tuleb olla ettevaatlik

Mari tulemus võib Jaani omast erineda, ka sama ühenduse peal. Seepärast pane iga mõõtmise juurde alati kirja tingimused. Mis võib tulemust moonutada?

- **Kogu seadme liiklus, mitte ühe rakenduse oma.** Monitor näitab kõike, mida arvuti teeb. Kui laed faili ja taustal uuendab Windows ennast, liituvad numbrid. Sulge enne muud programmid või vaata protsesside kaupa.
- **Keskmine, mitte tipp.** Monitor näitab keskmist lühikese aja jooksul. Lühike tipp võib märkamata jääda.
- **Wi-Fi.** Kiirus sõltub kaugusest, seintest ja teistest seadmetest. Sama mõõtmine kaks korda võib anda erineva tulemuse.
- **Kiirustest mõõdab ühte testserverit.** See ei kehti iga teenuse kohta.
- **Teised kasutajad.** Kui Jaan laeb samal ajal midagi alla, jääb Marile vähem.
- **Rakenduse enda näit.** Rakenduse näidatud arv ei pruugi klappida operatsioonisüsteemi omaga.

## Praktiline töö: Mari katse sinu arvutis

Mõõda oma arvutis samad kolm olukorda. Igaühe jaoks jälgi võrgumonitori vähemalt 60 sekundit.

1. **Jõudeolek:** kõik rakendused suletud, brauser avatud, kuid tegevust pole.
2. **Faili allalaadimine:** laadi alla õpetaja antud testfail.
3. **Video vaatamine:** ava õpetaja valitud video (nt 1080p).

Täida tabel (nagu Mari näites):

| Tegevus | Mõõtmise aeg | Alla (Mbit/s) | Üles (Mbit/s) | Märkused (tingimused) |
| --- | --- | --- | --- | --- |
| Jõudeolek | | | | |
| Allalaadimine | | | | |
| Video | | | | |

Seejärel:

1. Teisenda tulemused ühikutes `MB/s` ja `Mbit/s`, nii et mõlemad on tabelis.
2. Kirjuta üles ühikud, tingimused (Wi-Fi või kaabel, kellaaeg, taustaprogrammid) ja mõõtevahend.
3. Millist tegevust võrk kõige rohkem koormas? Kas see üllatas?
4. Nimeta vähemalt kaks mõõtmise piirangut, mis sinu tulemust mõjutasid.
5. Tee `ping` enne allalaadimist ja selle ajal. Kas viivitus muutus? Mida see tähendab Mari Zoomi koosoleku jaoks, kui keegi kolleegidest samal ajal suurt faili laeb?

**Esitatav töö:** mõõtmistabel koos ühikute, mõõtmisaja ja järeldustega.

## Kokkuvõte

| Mõiste | Tähendus |
| --- | --- |
| Bitt / bait | 1 bait = 8 bitti |
| Mbit/s ja MB/s | Mbit/s ÷ 8 = MB/s |
| Ribalaius | Maksimaalne võimalik kiirus |
| Edastuskiirus | Tegelikult liikuv andmemaht sekundis |
| Viivitus | Paketi teekonna aeg (ms) |
| Paketikadu | Kadunud pakettide osakaal (%) |

## Allikad

- [Cloudflare Learning: What is bandwidth?](https://www.cloudflare.com/learning/network-layer/what-is-bandwidth/)
- [Cloudflare Learning: What is latency?](https://www.cloudflare.com/learning/performance/glossary/what-is-latency/)
- [Cloudflare Learning: What is packet loss?](https://www.cloudflare.com/learning/network-layer/what-is-packet-loss/)
