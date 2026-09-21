---
title: Perioodiline tervisekontroll
description: Kuidas panna systemd timer minutiseks intervalliks HTTP tervisekontrolli käivitama, ning miks aktiivne ajastus üksi ei tõenda, et viimane töö õnnestus.
outline: deep
---

# Perioodiline tervisekontroll

::: info Õpiväljund
Pärast seda osa oskad selgitada, miks aktiivne timer ei tõenda viimase töö õnnestumist, ning oled loonud systemd timeri, mis kontrollib `labapp` tervist iga minut ja jätab tulemuse logisse.
:::

## Meeskonna kahekümne kaheksas küsimus sinule

Cockpitis näed praegust seisu, aga meeskond küsib: "mis juhtub öösel, kui keegi ei vaata?" Vaja on **automaatset**, korduvat kontrolli — mitte midagi, mida käsitsi iga tund käsurealt käivitad.

## Ajastus — äratuskell ei tõenda tehtud tööd

**Timer** käivitab töö graafiku järgi, **teenusefail** määrab, mida täpselt tehakse. Äratuskell ei tõenda, et inimene **tegelikult** üles tõusis ja töö ära tegi — sama moodi ei tõenda aktiivne timer, et **viimane** käivitus õnnestus.

::: warning Aktiivne timer ≠ edukas viimane töö
See kehtib ka planeeritud varunduse puhul: kavandatud graafiku olemasolu ei tõenda, et varukoopia ise ja selle taastatavus on kontrollitud — nii nagu [Varunduse põhimõtted ja CLI dump](./varunduse-pohimotted-ja-cli-dump) osas juba nägime, ainuke usaldusväärne tõend on tulemuse **enda** kontroll, mitte ajastuse olemasolu.
:::

## Hoiatus — arusaadav ja tegevusele suunav

Hoiatus peab olema **arusaadav** ja **tegevusele suunav** — mitte ainult "midagi on valesti". Liiga palju valeteateid **vähendab tähelepanu**: kui alarm heliseb pidevalt põhjuseta, hakatakse seda eirama.

::: tip Mida hea hoiatus sisaldab
Teenust (mis?), aega (millal?), nähtud viga (mis täpselt?) ja järgmist kontrolli (millal jälle vaadatakse?). Meie labor kasutab teadlikult lihtsat, päevikusse kirjutatud OK/FAIL seisundit — väliseid SMS- või e-posti teavitusi ei ehita, see oleks omaette teema.
:::

## Käed külge: kontrolliskript

**Kõik käsud srv1 peal.**

```bash
sudo nano /usr/local/bin/check-lab
```

**Faili `/usr/local/bin/check-lab` sisu** (see on **skript**, mitte ükshaaval shelli kleebitavad read):

```sh
#!/bin/sh
if /usr/bin/curl --fail --silent --show-error --max-time 3 http://127.0.0.1:3000/health >/dev/null; then
    /usr/bin/logger -t lab-health 'OK: labapp HTTP vastab'
else
    /usr/bin/logger -t lab-health 'FAIL: labapp HTTP kontroll ebaonnestus'
    exit 1
fi
```

Esimene rida valib shelli. `if` kontrollib `curl`-i **väljumiskoodi** — sama muster, mis [Varunduse põhimõtted ja CLI dump](./varunduse-pohimotted-ja-cli-dump) osa `echo $?` kontrollis, ainult automatiseeritult. `--fail` loeb HTTP vea (nt 502) käsu enda ebaõnnestumiseks, `--silent` eemaldab edenemisriba, `--show-error` säilitab vea kirjelduse ka vaikimisi režiimis, ja `--max-time 3` piirab kogu katse kolme sekundiga — kontroll ei tohi ise igavesti kinni jääda. `>/dev/null` jätab vastuse **keha** kõrvale, meid huvitab ainult, kas päring õnnestus. `logger -t lab-health` kirjutab **märgendatud** sündmuse süsteemipäevikusse (`journalctl`-iga leitav), `else` haru väljub veakoodiga `1`.

::: tip See kontrollib HTTP-d, mitte JSON sisu ega DB-d
Skript kontrollib ainult, kas server HTTP tasandil **vastab** — mitte, kas JSON-i sisu on õige või kas andmebaas oleks jõudnud sinnamaani. Sama kitsas ulatus, mis [Cockpit ja teenuste inventar](./cockpit-ja-teenuste-inventar) osas juba selgitasime.
:::

Salvesta `Ctrl+O`, kinnita `Enter`, välju `Ctrl+X`.

```bash
sudo chmod 755 /usr/local/bin/check-lab
```

Annab omanikule loe-kirjuta-käivita õiguse, teistele loe-käivita — `systemd` peab saama skripti käivitada.

## Käed külge: teenus ja timer

```bash
sudo nano /etc/systemd/system/lab-health.service
```

**Faili `/etc/systemd/system/lab-health.service` sisu:**

```ini
[Unit]
Description=Labori HTTP kontroll
[Service]
Type=oneshot
ExecStart=/usr/local/bin/check-lab
```

::: tip `oneshot` erinevalt `labapp` teenusest
[Rakendus ja pöördproksi](./rakendus-ja-poordproksi) osas oli `labapp` **pidev** protsess, mis jääb kogu aeg tööle (`serve_forever()`). `Type=oneshot` on vastupidine: **üks lõpetav töö**, mis käivitub, teeb oma kontrolli ja lõpetab — mitte püsiv serveriprotsess. Timer (allpool) käivitab selle uuesti kindla graafiku järgi.
:::

```bash
sudo nano /etc/systemd/system/lab-health.timer
```

**Faili `/etc/systemd/system/lab-health.timer` sisu:**

```ini
[Unit]
Description=Labori HTTP kontroll iga minut
[Timer]
OnBootSec=1min
OnUnitActiveSec=1min
Unit=lab-health.service
[Install]
WantedBy=timers.target
```

`OnBootSec=1min` käivitab esimest korda minut pärast käivitumist, `OnUnitActiveSec=1min` iga järgmise korra minut pärast **eelmist aktiveerimist**. `Unit` määrab, millist teenusefaili käivitatakse. `WantedBy=timers.target` seob timeri süsteemi tavapärase timerite käivitumisega — sama muster, mis teiste teenuste `WantedBy=multi-user.target` juures, ainult timerite jaoks oma siht.

Salvesta `Ctrl+O`, kinnita `Enter`, välju `Ctrl+X`.

```bash
sudo systemctl daemon-reload
```

Laeb uued teenuse- ja timerifailid — sama tuttav samm, mis iga uue `.service` faili puhul.

```bash
sudo systemctl enable --now lab-health.timer
```

**Tähtis:** siin lubame ja käivitame **timeri**, mitte teenust otse — timer ise käivitab teenuse graafiku järgi.

```bash
systemctl list-timers lab-health.timer
```

Näitab järgmise (`NEXT`) ja eelmise (`LAST`) käivituse aega — kontrolli, et graafik vastab ootustele.

```bash
journalctl -t lab-health --no-pager
```

Loeb `lab-health` märgendiga kirjeid — sama `-t` päring, mis `-u` asemel, kuna otsime konkreetset **märgendit** (`logger -t`), mitte teenuse nime. Oodatav tulemus: algul `OK` sündmused iga minuti tagant.

## Käed külge: juhitud rike, uuesti

Peata `labapp` [Teenuse tervis ja veaotsing](./teenuse-tervis-ja-veaotsing) osa käsuga (`sudo systemctl stop labapp`), oota järgmist kontrolli (kuni minut), ja kontrolli uuesti `journalctl -t lab-health` — peaksid nägema `FAIL` kirjet. Taasta seejärel teenus (`sudo systemctl start labapp`) ja kontrolli, et järgmine tulemus on jälle `OK`.

::: tip Sama muster, uus tööriist
See on täpselt [Teenuse tervis ja veaotsing](./teenuse-tervis-ja-veaotsing) osa juhitud 502-rike, ainult et nüüd näed tulemust **automaatse**, korduva kontrolli logist, mitte käsitsi tehtud ühekordsest `curl`-ist.
:::

## Kokkuvõte

| Mõiste / käsk | Tähendus |
| --- | --- |
| Timer vs service | ajastus vs tehtav töö — kaks eraldi faili |
| Aktiivne timer ≠ edukas töö | ainult tulemuse enda kontroll (logi) tõendab õnnestumist |
| `curl --fail --max-time 3` | HTTP viga = käsu viga, kontroll ei jää lõputult ootama |
| `Type=oneshot` | üks lõpetav töö, mitte pidev protsess |
| `logger -t <märgend>` | märgendatud sündmus journalisse, otsitav `journalctl -t`-ga |
| `systemctl list-timers` | järgmise/eelmise käivituse aeg |

## Allikad

- [systemd.timer manual (Ubuntu 24.04)](https://manpages.ubuntu.com/manpages/noble/man5/systemd.timer.5.html)
- [logger(1) manual](https://man7.org/linux/man-pages/man1/logger.1.html)
