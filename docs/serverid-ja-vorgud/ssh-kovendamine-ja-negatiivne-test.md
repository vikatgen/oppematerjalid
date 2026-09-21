---
title: SSH kõvendamine ja negatiivne test
description: Kuidas keelata root-otseühendus ja paroolipõhine SSH mõlemal serveril, kontrollida tegelikku seadistust sshd -T abil, ning tõendada nii lubatud kui keelatud ühendust.
outline: deep
---

# SSH kõvendamine ja negatiivne test

::: info Õpiväljund
Pärast seda osa oskad seadistada SSH nii, et root ei pääse otse sisse ja parool ei toimi, kontrollida seda `sshd -T` abil (mitte ainult failist lugedes), ning tõendada muudatust nii positiivse kui negatiivse testiga.
:::

## Meeskonna kaheksateistkümnes küsimus sinule

Tulemüür ja HTTPS on paigas. Viimane lahtine uks on SSH enda seadistus: praegu saaks **igaüks**, kes teab `oppur` parooli, ikkagi paroolipõhiselt sisse logida — ja kui keegi kunagi peaks proovima root-kontoga otse ühenduda, poleks selleks ka põhjust. Meeskond küsib: "kas SSH on ka päriselt nii tugev, kui me arvame?"

## Käed külge: SSH võtmega ligipääs ka srv2-le

Kogu see osa eeldab, et **mõlemasse** serverisse töötab juba SSH võtmega ühendus — meil on see seni ainult srv1 jaoks ([SSH-ühendus ja andmebaasi põhitõed](./ssh-uhendus-ja-andmebaasi-pohitoed) osast). Enne kõvendamist lisa sama avalik võti ka srv2-le, **hosti terminalist**:

```bash
ssh-copy-id -i ~/.ssh/koolilabor.pub oppur@192.168.56.20
```

Sama käsk, mis varem srv1 jaoks, ainult srv2 aadressiga. Kontrolli kohe:

```bash
ssh -i ~/.ssh/koolilabor oppur@192.168.56.20
```

Oodatav tulemus: `oppur@srv2` viip, ilma parooli küsimata (peale võimaliku võtme enda paroolifraasi).

## SSH tugevdamine — mitu faili, üks tegelik tulemus

Efektiivne SSH seadistus võib koosneda **mitmest** failist korraga (peafail + `sshd_config.d/` kaustas olevad lisafailid, mis loetakse kindlas järjekorras) — ühe faili lugemine ei pruugi näidata tegelikku, rakenduvat tulemust, eriti kui kusagil on ka `Match` plokk, mis muudab käitumist konkreetses kontekstis.

::: warning Failis olev rida üksi ei tõenda midagi
Kui `PasswordAuthentication no` on kirjas ühes failis, aga varasem fail (mis loetakse hiljem ja seega "võidab") määrab teisiti, ei kehti sinu kavatsetud seadistus. Ainus usaldusväärne kontroll on `sshd -T`, mis näitab **tegelikku, kokku arvutatud** tulemust — mitte ühegi üksiku faili sisu.
:::

## Käed külge: root ja parooli keelamine

**Käsud mõlemal serveril (srv1 ja srv2)** — kasuta oma äsja töötavat SSH-ühendust kummagi jaoks, mitte VirtualBoxi konsooli.

```bash
sudo nano /etc/ssh/sshd_config.d/00-lab.conf
```

**Faili `/etc/ssh/sshd_config.d/00-lab.conf` sisu (mõlemale serverile sama):**

```ini
PermitRootLogin no
PubkeyAuthentication yes
PasswordAuthentication no
KbdInteractiveAuthentication no
```

`PermitRootLogin no` keelab root-konto otseühenduse — haldus käib alati `oppur` kaudu, vajadusel `sudo`-ga. `PubkeyAuthentication yes` jätab võtmega sisselogimise lubatuks (see peabki jääma töötama). `PasswordAuthentication no` ja `KbdInteractiveAuthentication no` keelavad vastavalt parooli ja klaviatuuri-interaktiivse autentimise. Failinimi `00-lab.conf` loetakse varakult — aga tegelikku efektiivset tulemust kontrollime ikkagi eraldi, mitte usaldame failinime järjekorda pimesi.

Salvesta `Ctrl+O`, kinnita `Enter`, välju `Ctrl+X`.

```bash
sudo sshd -t
```

Kontrollib SSH konfiguratsiooni **süntaksit** enne rakendamist — sama "kontrolli enne" muster, mis `nginx -t` puhul juba tuttav. Eduka kontrolli korral väljundit ei tule.

```bash
sudo sshd -T
```

Näitab **efektiivset** (kokku arvutatud) konfiguratsiooni — kontrolli, et `permitrootlogin no`, `passwordauthentication no` ja `pubkeyauthentication yes` on kõik näidatud väärtustega. See on täpselt see samm, mis eristab "ma kirjutasin faili" ja "seadistus tegelikult kehtib".

```bash
sudo systemctl reload ssh
```

Laeb SSH seadistuse uuesti, **ilma** olemasolevat ühendust katkestamata (samamoodi nagu Nginxi `reload` varem) — sinu praegune SSH-seanss jääb tööle ka pärast seda käsku.

## Negatiivne test — mõlemat suunda peab tõendama

Lubatud ühendus peab töötama **ja** keelatud ühendus peab ebaõnnestuma — pooleldi tõendatud reegel pole tõendatud reegel. Sama loogika, mis turvaukse testimisel proovitakse nii õige kui vale võtmega.

::: warning Eristada tuleb tulemüüri ja lihtsalt peatatud teenust
Kui ühendus ebaõnnestub, kontrolli, kummast see tuleneb: kas teenus üldse kuulab (`ss -ltnp`, `systemctl status ssh`) või lükkab tulemüür/seadistus konkreetse katse tagasi. Kui midagi ei tööta **kummaski** suunas (ka õige võtmega mitte), pole sul tõendatud reeglit — sul on lihtsalt seisatud teenus.
:::

**Hosti uues terminaliaknas:**

```bash
ssh -o PubkeyAuthentication=no -o PreferredAuthentications=password oppur@192.168.56.10
```

Keelab kliendil endal võtme pakkumise ja sunnib proovima ainult paroolimeetodit. Oodatav tulemus: `Permission denied` — paroolipõhine SSH on nüüd päriselt keelatud, mitte ainult teoorias.

::: tip Testi kohe ka positiivset poolt
**Samal ajal** peab sinu tavaline võtmega ühendus (`ssh -i ~/.ssh/koolilabor oppur@192.168.56.10`) endiselt **paralleelselt** töötama, teises aknas. Kui mõlemad katsed ebaõnnestuvad, pole see tõend kõvendatud seadistusest — see on tõend, et midagi laiemalt on katki (nt teenus ise seisab).
:::

## Paikamine ja taastumine — turve on pidev töö

Turvalisus pole üks paigaldatud pakett, vaid pidev töökorraldus: uuendused vähendavad teadaolevaid nõrkusi, aga igale muudatusele peab järgnema teenuse kontroll — sama "hoolduse järel proovisõit" põhimõte, mis muu hoolduse puhulgi. Rollback ja varukoopiad (mida käsitleme eraldi hilisemas teemas) vähendavad ebaõnnestunud paikamise mõju.

## Esitatav tõend

Meeskonnale kinnituseks jäta alles:

- UFW reeglid koos põhjendusega ([eelmisest teemast](./tulemuur-ja-ufw)).
- TLS kontroll ilma `-k` erandita ([eelmisest teemast](./https-ja-tls)).
- Võtmega SSH õnnestumine ja paroolipõhise SSH keeld mõlemal serveril.
- Kinnitus, et srv2 ei pääse srv1 SSH-sse (host peab pääsema, srv2 mitte) — vajadusel kontrolli porti otse `nc -vz -w 3 192.168.56.10 22` abil (`nc` loob TCP ühenduse, `-z` ei saada rakendusandmeid, `-v` näitab tulemust, `-w 3` piirab ooteaja 3 sekundile). Kasuta seda ainult oma enda laborisihtide vastu.

## Suur pilt: kus me praegu oleme

Meeskonna küsimus selle teema alguses oli aus: "kas SSH on ka päriselt nii tugev, kui me arvame?" Nüüd tead vastust kindlalt, mitte oletuse põhjal — tulemüür lubab ainult põhjendatud ühendusi, veeb kasutab HTTPS-i nimelise sertifikaadiga, ja SSH aktsepteerib ainult võtit, mitte parooli, ning oled seda kõike **tõendanud**, mitte ainult seadistanud.

See on esimene teema, kus katsetasime asju, mis võivad kaugühenduse päriselt katki teha, kui midagi valesti läheb — ja jäime siiski terve ajaga varuteega (VirtualBoxi konsool). Järgmine teema küsib teistsugust küsimust: mis juhtub siis, kui midagi **päriselt** katki läheb ja varutee ongi ainult varukoopia?

## Kokkuvõte

| Mõiste / käsk | Tähendus |
| --- | --- |
| `sshd -T` | efektiivne, kokku arvutatud seadistus — mitte üksiku faili sisu |
| `PermitRootLogin no` | haldus käib alati tavakasutaja + `sudo` kaudu |
| `PasswordAuthentication no` | ainult võtmega sisselogimine lubatud |
| Negatiivne test | keelatud ühendus peab ebaõnnestuma, lubatud peab samal ajal töötama |
| `nc -vz -w 3 <IP> <port>` | kiire pordikontroll ainult oma enda labori sihtide vastu |

## Allikad

- [OpenSSH — sshd_config manual](https://man.openbsd.org/sshd_config)
- [OpenSSH — sshd -T (test mode)](https://man.openbsd.org/sshd)
