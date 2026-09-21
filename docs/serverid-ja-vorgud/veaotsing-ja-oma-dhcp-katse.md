---
title: Veaotsingu järjekord ja oma DHCP katse
description: Süsteemne järjekord võrguprobleemide otsimiseks, ning lühike katse, kus näed DHCP-d päriselt tööl — enda enda serveris.
outline: deep
---

# Veaotsingu järjekord ja oma DHCP katse

::: info Õpiväljund
Pärast seda osa oskad võrguprobleemi lahendada kindlas järjekorras (mitte juhuslikult), ning oled näinud DHCP-d päriselt tööl, mitte ainult teoorias.
:::

## Meeskonna üheksas küsimus sinule

Varem oleme ainult **kannatanud** DHCP käes (ootasime, kuni see lõpuks alla andis). Enne kui liigume järgmisesse teemasse, tasub näha, kuidas DHCP välja näeb siis, kui see töötab **meile kasuks**, mitte vastu.

## Veaotsingu järjekord

Kui midagi võrgus ei tööta, kontrolli neid **täpselt selles järjekorras**:

1. **Liides ja IP** — kas kaardil on üldse õige aadress? (`ip -br address`)
2. **Marsruut** — kas tee sihile on olemas? (`ip route`)
3. **Sihtport** — kas midagi kuulab seal, kuhu püüad jõuda?
4. **Nimi ja rakenduse vastus** — kas DNS lahendab õigesti ja kas rakendus ise vastab mõistlikult?

::: tip Mälupilt
Me ei paranda telefoniraamatut (DNS), kui majal pole voolu (liides/IP). Üks kontroll korraga välistab ühe võimaliku vea ja tööpäevik säilitab, mida juba proovisid — see on sama põhimõte, mis eelmises teemas "neli küsimust", nüüd võrgu jaoks.
:::

**"Connection refused"** tähendab konkreetselt, et siht **vastas** (nii et liides/marsruut olid korras!), aga keeldumisega — tavaliselt tähendab see, et miski ei kuula seda porti, või tulemüürireegel lükkab ühenduse aktiivselt tagasi.

## Paketipüük — eelvaade

Hilisemas seire-teemas õpid **Wiresharki** abil vaatama tegelikku liiklust valitud liidesel — nagu koridori vaatlus, kus näed uste vahel liikumist, aga suletud (krüpteeritud) ümbriku sisu jääb nähtamatuks. Juba praegu tasub teada: host-only liidesel näed **ainult** oma enda labori liiklust, mitte kogu koolivõrku.

## Käed külge: DHCP päriselt tööl

Tee see osa **pärast** eelmise osa püsiaadressi snapshotti — kui midagi läheb valesti, taastad selle sammu tagasipööramiseks.

Veendu veel kord, et VirtualBoxi enda DHCP on väljas (varasema teema käsuga) ja mõlemad VM-id kasutavad host-only kaarti. Lisa **srv1** failile `/etc/dnsmasq.d/lab.conf` need read:

```ini
dhcp-range=192.168.56.100,192.168.56.120,255.255.255.0,1h
dhcp-option=3
dhcp-option=6,192.168.56.10
```

`dhcp-range` annab rendivahemiku `.100`-`.120` ja tunnise rendiaja. Tühi `dhcp-option=3` jätab vaikelüüsi saatmata (NAT jääb ikka internetiteeks, nagu varem otsustasime). `dhcp-option=6` saadab meie enda DNS-i aadressi rendi osana.

```bash
sudo dnsmasq --test
sudo systemctl restart dnsmasq
```

Nüüd muuda **ajutiselt srv2** Netplani host-only osa: eemalda staatiline `addresses` ja `nameservers`, pane selle asemele:

```yaml
      dhcp4: true
      dhcp4-overrides:
        use-routes: false
        use-dns: false
```

`use-routes: false` ja `use-dns: false` tähendavad: võta DHCP-lt aadress, aga ära lase tal muuta minu vaikelüüsi ega DNS-i seadistust — need parameetrid **tulevad** rendiga kaasa, aga me ei taha, et need internetile mõeldud seadistusi üle kirjutaksid. NAT-i osa jääb muutumatuks. Tee `sudo netplan generate` ja `sudo netplan try` konsoolilt.

```bash
ip -br address
```

Kontrolli srv2-l — aadress peaks nüüd olema vahemikus `.100`–`.120`, mitte enam `.20`.

```bash
cat /var/lib/misc/dnsmasq.leases
```

Käivita **srv1** peal. Näitab, milline MAC-aadress millise IP-ga hetkel renditud on — see seob konkreetse kliendi konkreetse rendiga, kasulik hilisemas turvateemas.

::: warning Taasta kohe pärast katset
Pärast katset **taasta srv2 püsiaadress `.20`** koos `lab.test` nameservers osaga (tagasi eelmise osa seadistusele), ja eemalda srv1 failist need kolm DHCP rida. Järgmised teemad eeldavad taas püsivaid `.10` ja `.20` aadresse — see katse oli tahtlikult ajutine kõrvalepõige, mitte uus püsiseis.
:::

## Suur pilt: kus me praegu oleme

Meeskonna algne palve ("koht, kus rakendus reaalselt töötaks") on nüüd suures osas füüsiliselt olemas: kaks serverit, mõlemal püsiv aadress, oma nimed ja oma DNS, ligipääs SSH võtmete kaudu ette valmistatud (ühendame need lõplikult päriselt kokku niipea, kui hakkame servereid regulaarselt kaugelt haldama, mitte enam VirtualBoxi konsoolilt). Sa oskad ka juba, kuidas võrguprobleemi süsteemselt otsida, mitte juhuslikult käske proovida.

Ainuke asi, mida serveritel siiani veel pole, on midagi **kasulikku**, mida keegi saaks päriselt kasutada. Järgmine teema annab `app.lab.test` taha esimese päris veebiteenuse — hetkest, mil see töötab, saad esimest korda öelda meeskonnale "jah, sa saad selle juba oma brauseris näha".

## Kokkuvõte

| Samm | Miks |
| --- | --- |
| Liides → marsruut → port → nimi/rakendus | järjekord, mis välistab vead ükshaaval |
| `connection refused` | siht vastas, aga keeldus — pole "pole midagi" viga |
| DHCP koos `use-routes/use-dns: false` | saad aadressi, aga ei kaota kontrolli teiste seadete üle |
| Rendi taastamine `.20`-ks pärast katset | järgmised teemad eeldavad püsivaid aadresse |

## Allikad

- [dnsmasq — DHCP options manual](https://thekelleys.org.uk/dnsmasq/docs/dnsmasq-man.html)
- [Netplan — DHCP overrides](https://netplan.readthedocs.io/en/stable/netplan-yaml/)
