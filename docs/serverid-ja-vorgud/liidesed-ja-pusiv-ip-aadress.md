---
title: Liidesed ja püsiv IP-aadress
description: Tuvastame päris liidesenimed ja anname mõlemale serverile lõpuks püsiva aadressi — see osa lahendab jäädavalt eelmiste teemade DHCP-ootamise probleemi.
outline: deep
---

# Liidesed ja püsiv IP-aadress

::: info Õpiväljund
Pärast seda osa on mõlemal serveril püsiv (staatiline) host-only aadress, mis ei kao taaskäivitusel, ning oskad selgitada, miks vaikelüüsi host-only kaardile ei panda.
:::

## Meeskonna seitsmes küsimus sinule

Iga taaskäivitus on seni tähendanud mitmeminutilist ootamist, kuna server üritab tulutult host-only kaardilt DHCP-d saada — me lihtsalt lubasime seda seni, sest teadsime, et parandame selle "hiljem". See osa **on** see hiljem.

::: tip Kui sa juba kogesid seda ooteaega päriselt
Kui su server on kunagi jäänud taaskäivitusel pikaks ajaks "kinni" ilma nähtava põhjuseta, oled juba ise kogenud täpselt seda probleemi, mida see osa lahendab. See ei olnud sinu viga — see oli meie kursuse enda teadlik, ajutine kompromiss, mille me nüüd lõplikult parandame.
:::

## Miks host-only kaardile vaikelüüsi ei panda

Kohaliku sihini (nt teine server samas /24 võrgus) pääseb otse. Kaugemale sihile (nt internet) on vaja **vaikelüüsi** — varuteed, kuhu saata pakett, kui sa täpselt ei tea, kuidas sihini jõuda. Meie NAT-adapter saab oma vaikelüüsi automaatselt (tavaliselt `10.0.2.2`) ja seda kasutamegi interneti jaoks. Host-only kaardile me teist vaikelüüsi ei lisa — selle võrgu kaudu me tavaliselt internetti ei marsruudi, ja kahe vastuolulise vaikelüüsi olemasolu tekitaks segadust selle kohta, kumba kasutada.

## Kiire kordus: mask ja aadress

Meie võrk on `192.168.56.0/24` — `/24` tähendab, et esimesed 24 bitti (kolm esimest numbrit) on **võrguosa** ja viimane number on **majanumber** selle võrgu sees. `192.168.56.10` ja `192.168.57.10` on **erinevates** /24 võrkudes, isegi kui esimesed kaks numbrit ühtivad — see on levinud algajate segadus.

## Käed külge: liideste tuvastamine

Tee järgnevad sammud **srv1 VirtualBoxi konsoolil**, mitte SSH kaudu — SSH ei tööta veel host-only kaudu, ja seda ei tohi muuta samast ühendusest, mida parasjagu muudad.

```bash
ip -br address
```

`-br` teeb lühivaate. Näed kaht liidest: NAT-il on tavaliselt aadress `10.0.2.15`, host-only kaardil pole veel midagi. Kirjuta üles mõlema liidese **täpne nimi** (tavaliselt midagi sellist nagu `enp0s3` ja `enp0s8`, aga see erineb arhitektuuri ja paigalduse järgi — ära kunagi eelda nime pimesi).

```bash
ip route
```

Näitab marsruutimistabelit. `default via 10.0.2.2` (NAT liidese kaudu) on tavapärane — see on sinu praegune ainus tee internetti.

## Käed külge: olemasoleva seadistuse varundamine

```bash
ls -l /etc/netplan
```

Näita, mis Netplan-failid juba olemas on — Ubuntu paigaldaja lõi juba ühe automaatselt.

```bash
sudo cp -a /etc/netplan /root/netplan-before-lab
```

`-a` säilitab struktuuri ja õigused. See on taastatav koopia, kui midagi läheb valesti. Tee seda ainult **esimesel** korral.

## Käed külge: püsiva aadressi seadmine

Ava paigaldaja loodud fail (asenda failinimi enda tegelikuga):

```bash
sudo nano /etc/netplan/50-cloud-init.yaml
```

Kirjuta faili täpselt see sisu, asendades liidesenimed enda tegelikega:

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    enp0s3:
      dhcp4: true
    enp0s8:
      dhcp4: false
      addresses:
        - 192.168.56.10/24
```

NAT-liides (`enp0s3`) jääb DHCP peale — sealt tuleb internetiühendus. Host-only liides (`enp0s8`) saab meie enda valitud **püsiva** aadressi, `dhcp4: false` tähendab, et ta ei tohi enam DHCP-d oodata. srv2 jaoks on aadress `192.168.56.20/24`, kõik muu sama.

::: warning Taanded on tühikud, mitte tabulaatorid
YAML on väga range taannete suhtes. Kui Netplan hiljem kaebab sisu üle, on esimene kahtlusalune vale taane, mitte sisu ise.
:::

Salvesta `Ctrl+O`, `Enter`, välju `Ctrl+X`.

```bash
sudo chmod 600 /etc/netplan/50-cloud-init.yaml
```

Netplan võib hoiatada liiga laialt avatud seadistusfaili eest — see fail sisaldab võrgu ülesehitust, mida ei taha kõigile loetavaks jätta.

```bash
sudo netplan generate
```

Kontrollib ja tõlgib YAML-i, ilma midagi muutmata. Edu korral pole väljundit — vea korral parandab teade sulle täpse rea, kus viga on.

```bash
sudo netplan try
```

Rakendab muudatuse **ajutiselt**. Kontrolli teises konsooliaknas, et aadress on õige, ja kinnita alles siis Enter-iga. Kui midagi on valesti, ei kinnita sa midagi ja Netplan pöördub automaatselt tagasi vana seisu juurde — see on turvalisem kui otsene rakendamine, mis võib su võrgust välja lukustada.

## Käed külge: cloud-init'i takistamine sinu tööd üle kirjutamast

See on täpselt see samm, mis lahendab varasema ootamise probleemi jäädavalt: Ubuntu Server kasutab paigaldusel **cloud-init** nimelist tööriista, mis genereerib netplani faili automaatselt ja **määrab vaikimisi kõikidele leitud liidestele DHCP peale** — ka host-only kaardile, mille jaoks meil DHCP serverit polegi. Iga taaskäivitus varasemates teemades üritas seepärast lootusetult DHCP vastust saada, kuni lõpuks (aeganõudvalt) alla andis.

```bash
sudo nano /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg
```

Faili sisu:

```yaml
network: {config: disabled}
```

See keelab **ainult** cloud-initi võrguseadistuse loomise/ülekirjutamise, mitte kogu cloud-init teenust. Netplan jääb võrku haldama meie enda kirjutatud faili järgi.

Korda kõike ülevalolevat ka **srv2** peal, aadressiga `.20`. Taaskäivita mõlemad (`sudo reboot`, teemast 2) ja kontrolli `ip -br address`-iga, et aadress püsib — ja et taaskäivitus ei jää enam DHCP-d ootama.

```bash
ping -c 4 192.168.56.20
```

Käivita **srv1** pealt. `-c 4` piirab 4 päringuga. Kui neli vastust tulevad, on serveritevaheline IP-ühendus töökorras.

## Suur pilt: kust see teadlik ebamugavus tuli

Kogu varasem "iga taaskäivitus võtab kaua aega" ebamugavus ei olnud viga materjalis ega sinu töös — see oli teadlik õpetuslik järjekord: kõigepealt õpid, MIKS DHCP ja püsiaadress erinevad asjad on (see osa), alles siis kõrvaldad ise selle põhjuse. Kui oleksime static IP kohe algusest peale seadnud, poleks sul olnud põhjust küsida, miks see üldse vajalik on.

## Kokkuvõte

| Käsk / fail | Roll |
| --- | --- |
| `ip -br address` | näitab liideste tegelikud nimed ja aadressid |
| `/etc/netplan/50-cloud-init.yaml` | sinu püsiva IP-seadistuse fail |
| `netplan generate` / `netplan try` | süntaksikontroll / turvaline ajutine rakendamine |
| `/etc/cloud/cloud.cfg.d/99-disable-network-config.cfg` | takistab cloud-initil sinu tööd üle kirjutamast |

## Allikad

- [Netplan — Examples](https://netplan.readthedocs.io/en/stable/examples/)
- [Ubuntu — Cloud-init network configuration](https://cloudinit.readthedocs.io/en/latest/reference/network-config.html)
