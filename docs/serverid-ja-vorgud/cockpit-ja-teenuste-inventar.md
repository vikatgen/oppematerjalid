---
title: Cockpit ja teenuste inventar
description: Miks tervisekontroll ja mõõdik ei asenda teineteist, ning kuidas Cockpiti graafilise haldusliidese ja Markdown-inventari abil saada terviklik ülevaade serverist.
outline: deep
---

# Cockpit ja teenuste inventar

::: info Õpiväljund
Pärast seda osa oskad selgitada, miks tervisekontroll ja mõõdik on kaks eri asja, mis kumbki ei asenda teist, ning oled paigaldanud Cockpiti graafilise haldusliidese ja alustanud struktureeritud teenuste inventari.
:::

## Meeskonna kahekümne seitsmes küsimus sinule

Kõik meie teenused töötavad ja on turvatud ning taastatavad. Aga meeskond küsib midagi, mida seni oleme teinud ainult käsurealt, käsitsi: "kuidas me **teada saame**, kui midagi on valesti, ilma et keegi peaks kaebama tulema?"

## Seire eesmärk — armatuurlaud ja tööpäevik koos

**Seire märkab kõrvalekallet**, **logi aitab sündmust selgitada**, **mõõdik näitab muutust ajas**. Armatuurlaual olev tuli hoiatab; remondipäevik aitab põhjust leida. Need on **erinevad** tööriistad — üks ei asenda teist.

## Tervisekontroll — kitsas, konkreetne tõend

Tervisekontroll võib küsida HTTP vastust — aga **protsessi olemasolu** on kitsam tõend kui "teenus töötab kasutaja jaoks". Kontroll peab vastama tegelikule kasutaja vajadusele, mitte ainult sellele, mida on lihtne mõõta.

::: warning Meie `/api/health` ei tõenda MySQL-i ega meili tervist
[Teenuse tervis ja veaotsing](./teenuse-tervis-ja-veaotsing) osas ehitatud `/api/health` tõendab **ainult** meie näidisrakenduse enda protsessi — meie õppemakk ei kasuta seda MySQL-ühenduse kontrolliks. Restorani tuli võib põleda ka siis, kui köök toitu ei väljasta: kontrolli **ulatus** peab olema selgelt teada, mitte oletatud.
:::

## Mõõdikud — pudelikael võib olla mujal

| Mõõdik | Näitab |
| --- | --- |
| CPU | arvutuskoormust |
| RAM available | mäluvaru |
| Ketta vaba ruum | mõjutab kirjutamist (nt uute kirjade salvestamist) |
| Latentsus | vastamise aega |

::: tip Madal CPU ei välista muud probleemi
Madal CPU-koormus ei tõenda, et kõik on korras — ketas võib olla täis (mis takistaks nt uute kirjade salvestamist [Meiliserveri põhitõed ja postkastid](./meiliserveri-pohitoed-ja-postkastid) osas ehitatud postkastides) või võrguühendus aeglane. Mõõdikute tõlgendamine vajab alati töökoormuse tausta, mitte ainult üht numbrit isoleeritult.
:::

## Sisemine ja väline kontroll — kaks eri vaadet

**Kohalik kontroll** (nt `curl 127.0.0.1:3000/health` otse serveris) näeb teenuse **sisemist** poolt. **Teise masina kontroll** (srv2-lt või hostist) hõlmab ka **võrku** — tulemüüri, DNS-i, marsruuti.

::: warning Kohalik curl ei kontrolli tulemüüri
Köögist saab toidu kätte, aga välisuks võib olla lukus. [Tulemüür ja UFW](./tulemuur-ja-ufw) osas seatud tulemüürireeglid ei mõjuta kohalikku `127.0.0.1` päringut üldse — testime kindlasti ka **teiselt masinalt** (hostist või srv2-st), et kaasata võrgu- ja ligipääsurada tervikuna, mitte ainult protsessi enda olemasolu.
:::

## Käed külge: Cockpit srv1 peal

**Kõik käsud srv1 peal.**

```bash
sudo apt install cockpit
```

Paigaldab brauseripõhise serverihalduse — üks vaade, mis seob CPU, mälu, teenused ja logid kokku, ilma et peaksid pidevalt käsurea vahel hüppama.

```bash
sudo systemctl enable --now cockpit.socket
```

Aktiveerib Cockpiti **soklipõhise** käivitumise — veebihaldus käivitub alles siis, kui ühendus tegelikult saabub, mitte ei jookse pidevalt tühikäigul.

```bash
sudo ufw allow from 192.168.56.1 to any port 9090 proto tcp
```

Lubab haldusliidese **ainult hostile** — sama kitsaim-võimalik-luba muster, mis [Tulemüür ja UFW](./tulemuur-ja-ufw) osas SSH pordi 22 juures. Haldusport ei pea olema tervele laborivõrgule avatud.

Ava hosti brauseris **`https://192.168.56.10:9090`**. Kontrolli, et avad tõesti oma laboriserverit.

::: tip Cockpiti sertifikaat pole Nginxi sertifikaat
Cockpiti enda sertifikaat võib olla iseallkirjastatud — see on **eraldi** sertifikaat, mitte sama, mis [HTTPS ja TLS](./https-ja-tls) osas Nginxile lõime. Kaks eri teenust, kaks eri identiteeti.
:::

Logi sisse `oppur` kasutajana ja ava **Overview**, **Storage**, **Networking**, **Services** ja **Logs** vaated. Vaata andmeid **ilma juhuslikke süsteemiseadeid muutmata**. Võrdle Cockpiti näidatud vaba ketast oma käsurea `df -h` tulemusega, ja leia **Services** vaates üles `labapp` teenus.

## Käed külge: Markdown-inventar

Täienda oma tööpäevikus struktureeritud Markdown-tabelit — **iga** paigaldatud teenuse kohta üks rida:

| Väli | Näide |
| --- | --- |
| Server | srv1 |
| Teenus | Nginx |
| Tarkvaraversioon | (Cockpiti Overview vaatest) |
| Port | 80, 443 |
| Lubatud lähtekohad | 192.168.56.0/24 |
| Vastutaja | (sina) |
| Sõltuvused | labapp (proksi tagateenus) |
| Varukoopia | (viide [Varunduse põhimõtted](./varunduse-pohimotted-ja-cli-dump) osale) |
| Viimane taastamiskatse | (kuupäev) |

::: tip Miks server + teenus + omanik koos, mitte ainult IP
Vara nimekiri peab aitama **hooldajal** aru saada, kelle poole pöörduda. Üks IP-aadress ilma teenuse ja omaniku märketa on puudulik kirje — ja sama server võib täiesti õigustatult sisaldada **mitut** eraldi kirjet (nt srv1: Nginx **ja** MySQL **ja** SSH).
:::

**Süsteemi- ja rakendustarkvara** on kaks eri tasandit: OS haldab ressursse, andmebaas ja veebiserver pakuvad platvormiteenuseid, rakendus täidab kasutaja konkreetset ülesannet — hoone tehnosüsteem ja seal tegutsev ettevõte pole sama asi. Tarkvara valikut ei tee kunagi ainult populaarsuse järgi — see ei tõenda sobivust **konkreetsele** nõudele (nt meie loopback+tulemüür+TLS lähenemine sobib laborile, mitte tingimata suurele tootmiskeskkonnale).

::: tip Väikeses laboris piisab struktureeritud tabelist
Suurema koolitaristu jaoks oleks mõistlik arutada eraldi varahalduse tarkvara (nt NetBox, GLPI) vajadust — meie labori mahus piisab teadlikult lihtsast Markdown-tabelist.
:::

## Kokkuvõte

| Mõiste / käsk | Tähendus |
| --- | --- |
| Seire vs logi | armatuurlaud (kohene märkamine) vs tööpäevik (põhjuse selgitus) |
| Tervisekontroll | kitsas, konkreetne tõend — meie oma katab ainult HTTP protsessi |
| Sisemine vs väline kontroll | kohalik curl ei kontrolli tulemüüri ega võrku |
| `cockpit.socket` | veebihaldus käivitub ühenduse saabumisel |
| Port 9090 ainult hostilt | haldusport pole tervele laborivõrgule vajalik |
| Inventari kirje | server + teenus + omanik + sõltuvused koos, mitte ainult IP |

## Allikad

- [Cockpit — Running Cockpit](https://cockpit-project.org/running.html)
