---
title: Pordid, localhost ja oma DNS
description: Mis on port ja localhost, ning kuidas ehitada oma väike DNS-server, mis vastab meie labori enda nimedele.
outline: deep
---

# Pordid, localhost ja oma DNS

::: info Õpiväljund
Pärast seda osa oskad selgitada, mis vahe on IP-l ja pordil, miks VM-i localhost pole hosti localhost, ning oled ehitanud oma väikese DNS-serveri, mis vastab `lab.test` nimedele.
:::

## Meeskonna kaheksas küsimus sinule

Serveritel on nüüd püsivad aadressid, aga numbritest rääkimine (`192.168.56.10`) on ebamugav ja vigasid tekitav. Meeskond tahab kasutada nimesid: `app.lab.test`, mitte numbrijada. See osa annab sulle oma domeeni, mis töötab ainult meie enda laboris.

## Port — sama maja, eri uksed

**IP-aadress** viib majani. **Port** ütleb, millist ust selles majas kasutada. Mitu erinevat teenust võib töötada samal serveril samal ajal, kui igaüks kuulab oma porti:

| Port | Teenus |
| --- | --- |
| TCP 22 | SSH |
| TCP 80 / 443 | veeb (HTTP / HTTPS) |
| TCP 3306 | MySQL |
| UDP + TCP 53 | DNS |

::: tip Miks SSH võib töötada, kuigi veeb ei tööta
Sama server, aga erinevad teenused kuulavad erinevaid porte — kui veebiserver on maas või tulemüür blokeerib porti 80, ei mõjuta see kuidagi porti 22, kus SSH kuulab. "Server ei tööta" on liiga ebamäärane lause; "port 80 ei vasta" on juba kontrollitav väide.
:::

## localhost ei ole alati sama koht

`127.0.0.1` (localhost, ka **loopback**) tähendab "see sama masin, kus ma parasjagu töötan". See on kasulik teenuste piiramiseks nii, et need on ligipääsetavad ainult samalt masinalt.

::: warning VM-i localhost ≠ hosti localhost
Kui andmebaas töötab virtuaalmasinas srv1, ja avad hosti brauseris `localhost:3306`, ei jõua sa srv1 andmebaasini — hosti "mina" ja VM-i "mina" on kaks eri masinat. See on üks levinumaid arendajate ühendusvigu ja põhjustab palju segadust, kui ei mõisteta, et loopback on iga masina jaoks eraldi.
:::

## DHCP lühidalt (täispikk katse tuleb järgmises osas)

**DHCP** on vastuvõtulaud, mis annab võrku liituvale seadmele automaatselt ajutise aadressi — nii nagu me kunagi ise VirtualBoxi vaikimisi DHCP-d kasutasime, enne kui selle teadlikult välja lülitasime. DHCP võib anda rohkemat kui ainult IP-d: ka võrgumaski, DNS-serveri aadressi ja vaikelüüsi korraga.

## DNS — telefoniraamat, mitte üks kindel fail

**DNS** seob nimesid aadressidega. **A kirje** ütleb, milline IPv4 aadress vastab nimele. **MX kirje** ütleb, milline server võtab domeeni jaoks e-kirju vastu. Nimi ise ei sisalda kunagi porti — see on eraldi info.

::: tip Miks dig vastab õigesti, aga brauser ikka nime ei leia
`dig` küsib otse konkreetselt DNS-serverilt, mille sa talle ütled. Sinu brauser ja operatsioonisüsteem võivad kasutada hoopis teist rada (nt turvalist DNS-i, mis meie labori serverist üldse mööda läheb). "DNS vastab õigesti ühele tööriistale" ei tõenda, et **kõik** rakendused sama vastust kasutavad.
:::

## Käed külge: oma DNS-server srv1 peale

```bash
sudo apt install dnsmasq
```

`dnsmasq` on väike, kerge DNS (ja vajadusel DHCP) teenus — sobib täpselt meie väikese labori jaoks, mitte suure tootmiskeskkonna jaoks.

```bash
sudo nano /etc/dnsmasq.d/lab.conf
```

Faili sisu (asenda liidesenimi enda tegelikuga):

```ini
interface=enp0s8
listen-address=192.168.56.10
bind-interfaces
no-resolv
no-hosts
local=/lab.test/
host-record=srv1.lab.test,192.168.56.10
host-record=app.lab.test,192.168.56.10
host-record=mail.lab.test,192.168.56.20
mx-host=lab.test,mail.lab.test,10
```

`interface` ja `listen-address` piiravad teenuse ainult meie labori kaardile — see ei tohi hakata vastama kogu maailmale. `no-resolv` keelab tal internetiotsingute edastamise, `no-hosts` väldib nimede sattumist kogemata loopbackile. `host-record` read seovad nimed ja aadressid. `mx-host` ütleb, kuhu domeeni e-kirjad lähevad. See on **ainult meie labori** DNS, mitte internetile vastav rekursiivne resolver.

```bash
sudo dnsmasq --test
```

Kontrollib süntaksit, ilma teenust puudutamata — leia kirjavead enne, kui need reaalset teenust katkestavad.

```bash
sudo systemctl restart dnsmasq
```

Nüüd loeb teenus värsket seadistust.

Kontrolli tulemust **srv2 pealt**:

```bash
dig @192.168.56.10 app.lab.test A
```

`@192.168.56.10` ütleb `dig`-ile, keda otse küsida. ANSWER sektsioonis peaks olema `192.168.56.10`.

```bash
dig @192.168.56.10 lab.test MX
```

Peaks näitama prioriteeti 10 ja `mail.lab.test`.

## Käed külge: mõlema serveri enda resolveri seadistamine

Lisa mõlema serveri Netplani host-only osa alla (säilita olemasolev IP rida):

```yaml
      nameservers:
        addresses: [192.168.56.10]
        search: ["~lab.test"]
```

`~lab.test` on marsruutimisdomään — ainult `.lab.test` päringud saadetakse meie enda DNS-serverile, internetinimed jäävad NAT-i saadud DNS-i teenindada. Tee uuesti `sudo netplan generate` ja `sudo netplan try`.

```bash
resolvectl query app.lab.test
```

See küsib läbi Ubuntu **süsteemse** resolveri, mitte otse — see on lähemal sellele, mida päris rakendus kogeb, kui `dig @` otsepäring.

## Käed külge: nimed ka hosti jaoks (ajutine lihtsustus)

Windowsis ava Notepad **administraatorina** ja fail `C:\Windows\System32\drivers\etc\hosts` (vali "All files"). Macis:

```bash
sudo nano /etc/hosts
```

Lisa (ära kustuta olemasolevaid ridu):

```text
192.168.56.10 app.lab.test srv1.lab.test
192.168.56.20 mail.lab.test
```

::: warning See ei ole päris DNS
See fail seob nimesid IP-ga **ainult sinu enda hostis**. See on teadlik lihtsustus, mitte tõestus, et hosti DNS on seadistatud — see on ka põhjus, miks "minu masinas hosts-fail töötab" ei tõenda, et DNS ise töötab. Eemalda need read kursuse lõpus.
:::

## Kokkuvõte

| Mõiste / käsk | Tähendus |
| --- | --- |
| Port | ütleb, millist teenust samal serveril kasutada |
| `127.0.0.1` | "see sama masin" — iga masina jaoks eraldi |
| `dnsmasq` | meie kerge, laborile piiratud DNS-server |
| `dig @<server>` | otsepäring konkreetsele DNS-serverile |
| `resolvectl query` | päring läbi süsteemse resolveri (lähemal päris rakendusele) |
| `/etc/hosts` | ainult-hosti nimelahendus, mitte päris DNS |

## Allikad

- [dnsmasq manual](https://thekelleys.org.uk/dnsmasq/docs/dnsmasq-man.html)
- [systemd-resolved — resolvectl](https://www.freedesktop.org/software/systemd/man/latest/resolvectl.html)
