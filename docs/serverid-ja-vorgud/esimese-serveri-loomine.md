---
title: Esimese serveri loomine
description: Loome srv1 virtuaalmasina, paigaldame Ubuntu Serveri ja teeme esimesed käsud, mida iga server vajab.
outline: deep
---

# Esimese serveri loomine

::: info Õpiväljund
Pärast seda osa on sul olemas töötav Ubuntu Server virtuaalmasin `srv1`, mis on ajakohaste pakettidega ja millel töötab SSH teenus.
:::

## Meeskonna kolmas küsimus sinule

Võrk ja tööriist on valmis ([eelmine osa](./virtualboxi-ja-vorgu-ettevalmistus)). Nüüd on aeg ehitada esimene päris masin. Mõtle sellest nagu maja ehitamisest: kõigepealt ehitame tühja karbi (virtuaalmasina riistvara), alles siis paneme sinna sisustuse (operatsioonisüsteemi).

## Virtuaalse "karbi" loomine

VirtualBoxis vali **New** ja täida järgnevad valikud. Iga valiku juures on kirjas, *miks* täpselt see väärtus valitud on — need pole suvalised numbrid.

![VirtualBoxi uue virtuaalmasina nime ja operatsioonisüsteemi valimine](/serverid-ja-vorgud/vm-nimi-ja-os.png)

| Valik | Väärtus | Miks |
| --- | --- | --- |
| VM Name | `srv1` | Kasutame seda nime läbivalt kogu kursusel |
| OS | Linux | |
| OS Distribution | Ubuntu | |
| OS Version | `Ubuntu (64-bit)`, Apple Silicon hostil `Ubuntu (ARM 64-bit)` | Peab vastama sinu ISO arhitektuurile |
| RAM | 2048 MB | Piisav Ubuntu Serveri ja meie teenuste jaoks, jätab hostile varu |
| Protsessoreid | 2 | Kaks tuuma teeb paigalduse ja teenused piisavalt kiireks |
| Ketas | uus VDI, dünaamiliselt kasvav, 30 GB | Dünaamiline ketas ei võta kohe kogu 30 GB kettaruumi päriselt ära |

Selle akna allosas on märkeruut **Proceed with Unattended Installation** — jäta see **märkimata**. Meie eesmärk on paigaldus teadlikult käsitsi läbi teha, mitte lasta VirtualBoxil seda automaatselt ise ära teha, et näeksid ja mõistaksid iga sammu.

::: warning Ära vali olemasolevat ketast
Vali alati **uus** virtuaalketas, mitte mõni juba olemasolev fail. Olemasoleva ketta valimine kirjutaks üle mõne teise VM-i andmed.
:::

## Kaks võrgukaarti — nagu eelmises osas kokku leppisime

Enne VM-i käivitamist ava **Settings → Network** ja säti mõlemad adapterid täpselt nii, nagu [eelmises osas](./server-ja-oma-ip-aadress) rääkisime:

- **Adapter 1**: sees, `Attached to: NAT`
- **Adapter 2**: sees, `Attached to: Host-only Adapter`, vali eelmises osas loodud võrk (tavaliselt `vboxnet0`)

Ava **Storage** ja kontrolli, kas ISO on juba optilises seadmes olemas — see ei juhtu alati iseenesest. Kui **Devices** nimekirjas seisab kettafailide `srv1.vdi` all rida **"Empty"**, tuleb ISO käsitsi külge panna:

1. Vali nimekirjast **"Empty"**.
2. Paremal ilmub **Optical Drive** valik koos väikese kettaikooniga (rippmenüü nupp).
3. Vajuta seda ikooni ja vali **"Choose a disk file..."**.
4. Otsi üles ja vali oma allalaaditud ning räsi järgi kontrollitud `.iso` fail.

Nimekirjas peaks nüüd "Empty" asemel olema näha sinu ISO faili nimi, ja **Information** paneelil selle suurus ning täpne asukoht. Vajuta **OK**, seejärel **Start**.

## Ubuntu paigaldus

Paigaldaja küsib mitmeid küsimusi järjest. Enamik vastuseid on lihtsad, aga kaks väärivad eraldi tähelepanu:

**Võrguvaade** — esimene (NAT) adapter saab tõenäoliselt kohe aadressi, teine (host-only) jääb esialgu tühjaks. See on **oodatud**, mitte viga: staatilise aadressi paneme serverile paika alles järgmises teemas. Praegu vajutad lihtsalt **Done**.

**Storage** — vali **Use an entire disk** ja oma äsja loodud ketas. Kui nähtaval on valik **Set up this disk as an LVM group**, jäta see esialgu välja — see lihtsustab meie esimest paigaldust, LVM-ist räägime teoorias eraldi.

Profiili sammus:

- Server name: `srv1`
- Username: `oppur`
- Parool: mõtle tugev, unikaalne parool ja salvesta see paroolihaldurisse (mitte tööpäevikusse)

Viimastest valikutest märgi ära **Install OpenSSH server** — seda teenust vajame juba järgmises teemas, kaugühenduseks. Featured server snaps jäta valimata, need ei ole meile hetkel vajalikud.

Kui paigaldus on valmis, vali **Reboot Now** ja eemalda ISO ketas (**Devices → Optical Drives → Remove disk from virtual drive**), kui paigaldaja seda küsib.

## Esimesed käsud pärast sisselogimist

Logi sisse kasutajaga `oppur`. Siis jooksuta järgmised käsud **ükshaaval**, mitte kõiki korraga — nii näed iga sammu tulemust eraldi.

```bash
hostnamectl
```

Näitab masina nime ja Ubuntu versiooni — kontrollime, et oled tõesti `srv1` peal, mitte kogemata teises aknas.

```bash
whoami
```

Näitab, kes kasutaja sa oled. Peaks olema `oppur`, mitte `root` — serverit haldame tavakasutajana, mitte kõikvõimsa juurkasutajana, isegi kui vahel kasutame `sudo`.

```bash
sudo apt update
```

`apt` on Ubuntu paketihaldur. `update` ei paigalda midagi — see lihtsalt laeb alla **nimekirja** sellest, mis uuendusi on saadaval. `sudo` tähendab "käivita see käsk administraatoriõigustega" — pakettide nimekirjade uuendamine mõjutab kogu süsteemi, mitte ainult sinu kasutajat.

```bash
sudo apt upgrade
```

See paigaldab need uuendused, mille nimekirja eelmine käsk alla laadis. Käsk küsib enne kinnitust — vaata muudatuste loendit ja vajuta `Y`.

::: tip Miks uuendame kohe alguses, enne kui midagi muud teeme?
Kui paigaldaksime kõigepealt teenused ja alles hiljem uuendaksime süsteemi, ei teaks me, kas hilisem probleem tuleneb meie enda seadistusest või hoopis uuendusest, mis midagi muutis. Puhas, ajakohane algseis on aluspõhi, millele järgnevaid teemasid ehitada.
:::

```bash
sudo apt install curl nano openssh-server dnsutils tcpdump netcat-openbsd
```

Paigaldab mõned tööriistad, mida läheb vaja järgnevates teemades: `curl` (HTTP päringute tegemiseks), `nano` (lihtne tekstiredaktor), `openssh-server` (kaughaldus, kui see polnud paigaldusel juba valitud), `dnsutils` (DNS-i uurimise tööriistad) ja `tcpdump`/`netcat-openbsd` (võrguliikluse ja ühenduste testimiseks).

```bash
sudo systemctl enable --now ssh
```

`systemctl` haldab **teenuseid** (protsesse, mis töötavad taustal pidevalt). `enable` tähendab "käivita see teenus automaatselt ka pärast järgmist taaskäivitust". `--now` käivitab teenuse ka kohe, mitte alles järgmisel taaskäivitusel.

```bash
systemctl is-active ssh
```

Kontrollib, kas teenus on **praegu tegelikult käimas** — see on teine küsimus kui "kas teenus on paigaldatud". Vastuseks peaks tulema `active`.

```bash
sudo reboot
```

Taaskäivitab serveri. See on tähtis test: kontrollime, et kõik meie seadistatud asjad (sh SSH teenus) käivituvad ka **iseenesest**, mitte ainult siis, kui parasjagu käsitsi käsu jooksutasime.

::: warning Taaskäivitus võib jääda paariks minutiks "seisma" — see on oodatud
Ubuntu paigaldaja looned võrguseadistuse, mis proovib DHCP kaudu aadressi küsida **mõlemalt** võrgukaardilt, k.a host-only kaardilt. Meie oleme aga host-only võrgu DHCP teadlikult välja lülitanud — nii et see katse ei saagi kunagi vastust ja server jääb seda ootama, kuni lõpuks alla annab. See võib võtta kuni umbes **3 minutit**, ilma et ekraanile midagi uut ilmuks. Ära käivita masinat uuesti ega vajuta korduvalt Enter — lihtsalt oota ära. Sisselogimisviip ilmub lõpuks iseenesest. Mõnikord ei piisa ka ootamisest esimesel korral ja server tuleb taaskäivitada mitu korda järjest, enne kui sisselogimisviip lõpuks ilmub — see on tüütu, aga endiselt normaalne. Selle ebamugavuse kaotame päriselt alles järgmises teemas, kui paneme mõlemale serverile püsiva (staatilise) aadressi.
:::

## Kokkuvõte

| Käsk | Mida kontrollib |
| --- | --- |
| `hostnamectl` | oled õigel masinal, õige Ubuntu versioon |
| `whoami` | tegutsed tavakasutajana, mitte root'ina |
| `sudo apt update && sudo apt upgrade` | süsteem on ajakohane enne teenuste lisamist |
| `systemctl is-active ssh` | teenus mitte ainult paigaldatud, vaid ka päriselt töös |
| `sudo reboot` | seadistus püsib ka taaskäivituse üle |

## Allikad

- [Ubuntu Server Installation Guide](https://ubuntu.com/server/docs/install-ubuntu-server-with-the-live-server-installer)
- [systemd — systemctl manual](https://www.freedesktop.org/software/systemd/man/latest/systemctl.html)
