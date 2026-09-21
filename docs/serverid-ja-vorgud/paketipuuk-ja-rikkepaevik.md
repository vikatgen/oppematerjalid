---
title: Paketipüük ja rikkepäevik
description: Wiresharkiga oma labori liikluse vaatamine, miks IP-aadress üksi ei tõenda kasutaja identiteeti, ning kuidas kirjutada rikkepäevikut ja üleandmisdokumentatsiooni.
outline: deep
---

# Paketipüük ja rikkepäevik

::: info Õpiväljund
Pärast seda osa oskad tabada ja Wiresharkis analüüsida oma labori HTTP liiklust, selgitada, miks IP-aadress üksi ei tõenda kasutaja identiteeti, ning kirjutada rikkepäevikut ja üleandmisdokumentatsiooni, mida keegi teine suudaks korrata.
:::

## Meeskonna kahekümne üheksas küsimus sinule

[Veaotsingu järjekord ja oma DHCP katse](./veaotsing-ja-oma-dhcp-katse) osas lubasime: "hilisemas seire-teemas õpid Wiresharki abil vaatama tegelikku liiklust valitud liidesel". See osa täidab selle lubaduse — ja lisab viimase, kõige inimlikuma oskuse: kuidas dokumenteerida nii, et keegi teine (või sina ise kuu aja pärast) saaks olukorra uuesti üles leida.

## Võrguliikluse vaade — auto numbrimärk pole roolis olija

Paketipüük näitab **valitud liidese** liiklust — ainult seda, mis sellest konkreetsest kohast läbi käib. **Saatja IP ei ole alati inimese identiteet** — auto numbrimärk ei ütle tingimata, kes parasjagu roolis on. Kasutaja **tuvastamiseks** tuleb siduda IP, DHCP rendid, autentimislogid ja ajad kokku — üks pcap **üksi** üldjuhul konkreetset kasutajat ei tõenda.

::: tip Krüpteering piirab nähtavust
[HTTPS ja TLS](./https-ja-tls) osas lisatud krüpteering tähendab, et paketipüük näitab endiselt **kellega** ja **millal** suheldi, aga mitte enam **sisu** — see on osa põhjusest, miks TLS lisasime.
:::

## Wiresharki filtrid — kaks eri asja

**Capture filter** piirab, mida üldse **salvestatakse** — väljajäetud pakette ei saa hiljem kuvafiltriga tagasi tuua. **Display filter** piirab, mida salvestatud andmetest **kuvatakse** — sa saad kuvafiltrit vabalt muuta ja tagasi vaadata, ilma uut püüki tegemata.

::: warning `tcp port 80` ja `tcp.port == 80` pole sama süntaks
Esimene (`tcp port 80`) on tüüpiline **capture** filtri süntaks (kasutatakse ka `tcpdump`-is). Teine (`tcp.port == 80`) on Wiresharki **display** filtri süntaks — nendel kahel on eri grammatika, mitte lihtsalt eri koht kasutamiseks.
:::

**PCAP võib sisaldada tundlikke andmeid** — päisi, aadresse, krüpteerimata liikluse puhul ka sisu. Ära salvesta ega jaga kunagi teiste kasutajate liiklust, ainult oma enda labori omi.

## Käed külge: paketipüük srv1 peal

```bash
sudo tcpdump -i enp0s8 -nn -c 12 -w /home/oppur/lab-http.pcap "tcp port 80"
```

`-i enp0s8` valib host-only liidese (asenda oma tegeliku liidesenimega, kui erineb — [Liidesed ja püsiv IP-aadress](./liidesed-ja-pusiv-ip-aadress) osast tuttav kontroll). `-nn` keelab nimede teisendamise (näeme numbreid, mitte hostinimesid — kiirem ja üheselt mõistetav). `-c 12` piirab püügi 12 paketiga. `-w` salvestab tulemuse PCAP failina. Jutumärkides osa (`"tcp port 80"`) on **capture** filter.

Kui käsk jääb ootele: tee hosti brauserist `http://app.lab.test` päring srv1 suunas, või kasuta `curl --resolve` (samamoodi nagu [HTTPS ja TLS](./https-ja-tls) osas). Kui 12 paketti ei täitu mõistliku aja jooksul, lõpeta `Ctrl+C`-ga.

::: warning Kontrolli, kumb server on hetkel aktiivne
Kui tegid [Teenuse teisaldamine ja sõltumatu koopia](./teenuse-teisaldamine-ja-soltumatu-koopia) osa migratsiooniharjutuse ja `app.lab.test` viitab hetkel srv2-le (mitte lõpuks tagasi keeratud .10-le), veendu enne püüki, kumb server tegelikult vastab — muidu jälgid liidest, kust HTTP liiklus üldse läbi ei käigi.
:::

```bash
sudo chown oppur:oppur /home/oppur/lab-http.pcap
```

Annab püügile `oppur` omandi — sama muster, mis [Teenuse teisaldamine ja sõltumatu koopia](./teenuse-teisaldamine-ja-soltumatu-koopia) osas arhiivi omandi puhul — hosti `scp` peab saama faili lugeda.

**Hosti terminalist:**

```bash
scp -i ~/.ssh/koolilabor oppur@192.168.56.10:lab-http.pcap ./lab-http.pcap
```

Sama tuttav `scp` muster.

## Käed külge: Wiresharkis analüüs

Paigalda hosti [Wireshark](https://www.wireshark.org/download.html) õpetaja kontrollitud allikast. Faili avamiseks **ei ole** vaja hostis elava liikluse püüki, ainult äsja toodud PCAP faili.

1. Ava PCAP ja rakenda kuvafilter `tcp.port == 80`.
2. Leia **SYN**, **SYN/ACK** ja **ACK** paketid (kolmepoolne käepigistus), kui kõik kolm jõudsid püüki, ning HTTP **päring** ja selle **301** vastus (mäletad — [HTTPS ja TLS](./https-ja-tls) osas suunab HTTP alati HTTPS-i).
3. Proovi filtrit `ip.addr == 192.168.56.1` — näitab kõiki selle (hosti) aadressiga pakette, mõlemas suunas.
4. Kirjuta tööpäevikusse lahti: mida saab IP-aadressi põhjal **järeldada** (nt milline masin liikluse algatas) ja mida **ei saa** (nt kes konkreetselt selle masina taga istus) — see on eelmises sektsioonis selgitatud "IP ei ole identiteet" põhimõtte praktiline harjutus.

## Käed külge: kasutaja ja seadme sidumine ajaga

Ava hostist **üks uus** SSH seanss srv1-sse. Leia serveri SSH logist (`journalctl -u ssh`, [Protsessid, teenused ja logid](./protsessid-teenused-ja-logid) osast tuttav) **sama aja** kasutajanimi ja lähte-IP. Seo see IP oma inventari (["Cockpit ja teenuste inventar"](./cockpit-ja-teenuste-inventar)) hostikirjega.

::: tip Kasutaja tuvastamine on mitme allika kokkupanek
See on täpselt see harjutus, mida üks paketipüük üksi **ei kata** — alles IP-aadress **ja** ajastatud logikirje **ja** teadaolev seadmete/kasutajate nimekiri koos annavad usaldusväärse tuvastuse.
:::

## Kella kontroll — logid vajavad usaldusväärset aega

**Kus: srv1 ja srv2**

```bash
timedatectl status
```

Näitab süsteemi aega, ajavööndit ja ajasünkroniseerimise seisundit. Oodatav tulemus: `System clock synchronized: yes`. Kui `no`, kontrolli NAT-ühendust ja kooli lubatud ajateenust.

::: warning Ajavöönd ei ole sama, mis vale UTC aeg
Ajavööndi **erinevus** kahe serveri kuval üksi ei tähenda, et üks neist on valel kellaajal — kontrolli sünkroniseerimise olekut, mitte ainult kuvatavat kellaaega. Logisid (nagu eelmises sektsioonis tehtud SSH+PCAP ajaline sidumine) saab usaldusväärselt võrrelda ainult siis, kui alusaeg on kõigil serveritel õige.
:::

## Rikkepäevik — sümptom pole diagnoos

1. **Kirjelda sümptomit** (mida täpselt nägid, mitte oletust põhjuse kohta).
2. **Salvesta hüpotees ja kontroll** (mida arvasid põhjuseks, ja kuidas seda kontrollisid).
3. **Tee üks muudatus** korraga.
4. **Korda kasutaja testi** — sama teekond, mis algselt ebaõnnestus.

::: warning "Panin restarti ja töötas" ei ole diagnoos
Arsti tööpäevik eristab sümptomit diagnoosist — "restart aitas" ei selgita **põhjust** ega takista **kordumist**. Hea paranduse lõputest on **sama kasutajateekond**, mis varem ebaõnnestus, mitte lihtsalt "teenus on nüüd `active`" (sama õppetund, mis [Teenuse tervis ja veaotsing](./teenuse-tervis-ja-veaotsing) osas juba "haldusseisundi kontroll" juures).
:::

## Üleandmine — kaaslane peab suutma korrata

Juhend peab sisaldama nii **käivitamist** kui **taastamist**, mitte ainult ühte neist. **Saladused antakse eraldi**, turvalisel kanalil, mitte dokumendi sisse kirjutatuna — sama põhimõte, mis läbi kogu selle mooduli ("ilma paroolideta tööpäevik").

::: tip Miks kaaslase kontroll on kasulik
Kursuse lõpus proovib kaaslane sinu dokumentatsiooni järgi olukorra taastada — ta leiab need eeldused ja sammud, mille **autor ise** on kogemata välja jätnud, sest autorile tundusid need "ilmselged". Hea maja kasutusjuhend näitab ka peakraani asukohta, mitte ainult uksekella nuppu.
:::

## Esitatav tõend

Meeskonnale kinnituseks jäta alles:

- Cockpiti vaade ja teenuste inventar.
- Timeri `OK`/`FAIL`/`OK` tõendid (juhitud rikke test).
- HTTP paketipüügi selgitus (mida nägid, mida IP-st saab ja ei saa järeldada).
- SSH kasutaja-IP seos ajaga.

::: warning Ära esita teiste kasutajate liiklust
Kogu selle osa harjutus käib **ainult** sinu enda labori liikluse kohta — kunagi ei jaga ega esita kellegi teise liiklust ega andmeid.
:::

## Suur pilt: kus me praegu oleme

Meeskonnal on nüüd täielik ülevaade: graafiline haldus, automaatne tervisekontroll, oskus vaadata võrguliiklust päriselt (mitte ainult uskuda, et see töötab), ja dokumentatsioon, mida keegi teine suudab järgida. Kogu see moodul on nüüd üks omavahel seotud tervik — igal teemal on olnud oma "miks", ja iga hilisem teema on tuginenud eelmistele.

Kõik, mida oleme siiani teinud, eeldas, et virtuaalmasinad ise on turvalises kohas ja võrguseadmed (ruuter, kommutaator), millest kõik see sõltub, on usaldusväärsed. Viimane teema enne lõppprojekti küsib täpselt selle eelduse kohta: mis juhtub, kui ähvardus ei tule mitte tarkvara, vaid **füüsilise** ligipääsu või võrguseadme enda kaudu?

## Kokkuvõte

| Mõiste / käsk | Tähendus |
| --- | --- |
| Capture vs display filter | mida salvestada vs mida salvestatust näidata |
| `tcp port 80` vs `tcp.port == 80` | erinev süntaks, tcpdump vs Wireshark |
| IP ≠ identiteet | vajab sidumist logide, aja ja teadaoleva nimekirjaga |
| `timedatectl status` | kella sünkroniseerimise kontroll, eeldus usaldusväärsetele logidele |
| Rikkepäevik | sümptom → hüpotees+kontroll → üks muudatus → sama kasutajatest |
| Üleandmine | käivitamine + taastamine + saladused eraldi + kaaslase kontroll |

## Allikad

- [Wireshark User's Guide](https://www.wireshark.org/docs/wsug_html_chunked/)
- [tcpdump(8) manual](https://www.tcpdump.org/manpages/tcpdump.1.html)
