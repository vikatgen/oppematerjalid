---
title: Protsessid, teenused ja logid
description: Mis vahe on protsessil ja teenusel, kuidas systemd teenuseid haldab, ning kuidas journalctl abil leida, mis tegelikult juhtus.
outline: deep
---

# Protsessid, teenused ja logid

::: info Õpiväljund
Pärast seda osa oskad selgitada, mis vahe on protsessil ja teenusel, kasutada `systemctl` teenuse haldamiseks, ning leida `journalctl` abil, mis konkreetse teenusega hiljuti juhtus.
:::

## Meeskonna viies küsimus sinule

Teemas 2 juba käivitasime SSH teenuse ja kontrollisime, et see töötab pärast taaskäivitust. Aga meeskond küsib edasi: "kuidas sa **tead**, kas teenus töötab, kui midagi läheb valesti — ja kust näed, mis täpselt juhtus?" See osa annab sulle selle tööriistakasti.

::: tip Kui `ps`, `kill` ja `htop` on juba tuttavad
[Protsesside haldus](/linux/protsesside-haldus) moodul kattis üksikute protsesside vaatamist ja lõpetamist. Siin on fookus kitsam ja serveripõhisem: **teenused**, mida haldab `systemd`, ning nende **logid**.
:::

## Protsess vs teenus

**Protsess** on üks konkreetne töötav programmi eksemplar — tal on number (**PID**), mis identifitseerib teda ainult praeguse töötamise aja jooksul. **Teenus** on hallatav taustatöö, millel on **nimi**, mis jääb samaks ka siis, kui teenus taaskäivitatakse ja saab uue PID-i.

::: tip Mälupilt
Avatud restoranis töötab konkreetne vahetus (protsess), aga restoran ise (teenus) jääb avatuks ka siis, kui vahetus vahetub. Kunagi ei tohiks süsteemi seadistusse kõvasti kirjutada mõne konkreetse vahetuse (PID-i) numbrit — see number muutub iga taaskäivitusega.
:::

## systemd — teenuste haldur

Nelja käsku tasub kohe eristada, sest need teevad **erinevaid** asju:

| Käsk | Mida teeb |
| --- | --- |
| `systemctl start <teenus>` | käivitab teenuse **kohe**, praeguse korra jaoks |
| `systemctl enable <teenus>` | seadistab teenuse käivituma **järgmisest taaskäivitusest** — ei käivita kohe |
| `systemctl status <teenus>` | näitab teenuse hetkeseisu ja viimaseid logiridu |
| `systemctl reload <teenus>` | palub teenusel seadistus uuesti laadida, ilma teenust täielikult peatamata |

::: warning `enable` üksi ei käivita midagi kohe
See on levinud eksiarvamus. Kui tahad teenust seadistada **ja** kohe käivitada, kasuta `--now` võtit korraga: `systemctl enable --now ssh` — täpselt nii, nagu tegime eelmises teemas.
:::

`restart` peatab teenuse täielikult ja käivitab uuesti — see toob kaasa lühikese katkestuse. Kõik teenused ei toeta `reload`-i (mõni vajab ikka täielikku restarti, et uut seadistust rakendada) — seda vahet täpsustame iga teenuse enda peatükis.

## Käed külge: teenuse seis

```bash
systemctl status ssh
```

Detailsem versioon eelmise teema `systemctl is-active ssh` käsust — näitab lisaks olekule ka viimased mõned logiread otse siin, ilma et peaksid kohe `journalctl`-i poole pöörduma.

## Logid — teenuse tööpäevik

Logi seob kokku **millal** midagi juhtus ja **millise teenusega**. Väga levinud algaja viga on vaadata ainult viimast rida ja arvata, et see kirjeldab probleemi põhjust — tihti kirjeldab viimane rida hoopis **tagajärge**, ja tegelik põhjus on paar rida varem.

```bash
journalctl -u ssh -n 30 --no-pager
```

`-u ssh` valib ainult SSH teenuse kirjed, `-n 30` näitab viimased 30 rida, `--no-pager` väljastab need otse (ilma `less`-tüüpi vaateta, mida peaks eraldi sulgema). Kui väljund on tühi või annab õiguste vea, proovi `sudo` ees.

::: tip Miks serveri õige kellaaeg on oluline
Kui tahad hiljem siduda ühe teenuse logi teise teenuse sündmusega (nt "kas veebiserveri viga juhtus samal ajal kui andmebaasi taaskäivitus?"), on see mõistlik ainult siis, kui kellaajad on usaldusväärsed. Vale kellaaeg teeb mitme teenuse logide omavahelise võrdlemise praktiliselt võimatuks.
:::

## Kui midagi ei tööta: neli küsimust

Enne kui hakkad juhuslikke käske proovima, esita endale need neli küsimust järjekorras:

1. **Millises masinas ma olen?** (srv1, srv2 või host — kontrolli `hostnamectl`-iga)
2. **Mis muutus viimati?** (mida sa just enne probleemi tekkimist muutsid?)
3. **Kas teenus töötab?** (`systemctl status`)
4. **Mida ütleb logi?** (`journalctl -u <teenus>`)

::: warning Üks muudatus korraga
Kümne juhusliku käsu järjest proovimine tundub kiirem, aga tulemusena ei tea sa, milline neist probleemi tegelikult lahendas — või milline hoopis uue probleemi juurde tekitas. Veaotsing on hüpoteesi kontrollimine ühe muudatuse kaupa, mitte juhuslik katsetamine.
:::

## Kokkuvõte

| Mõiste / käsk | Tähendus |
| --- | --- |
| Protsess (PID) | üks töötav eksemplar, number muutub taaskäivitusel |
| Teenus | hallatav taustatöö, nimi püsib |
| `enable` vs `enable --now` | ainult tulevik vs tulevik + kohe |
| `systemctl status` | seis + viimased logiread korraga |
| `journalctl -u <teenus>` | teenuse enda ajalugu |
| Neli küsimust | masin → muudatus → teenus → logi |

## Allikad

- [systemd — systemctl manual](https://www.freedesktop.org/software/systemd/man/latest/systemctl.html)
- [systemd — journalctl manual](https://www.freedesktop.org/software/systemd/man/latest/journalctl.html)
