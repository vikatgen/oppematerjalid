---
title: VirtualBoxi ja võrgu ettevalmistus
description: Paigaldame VirtualBoxi, loome eraldi harjutusvõrgu ja hangime Ubuntu Serveri paigaldusfaili, enne kui esimene virtuaalmasin üldse tekib.
outline: deep
---

# VirtualBoxi ja võrgu ettevalmistus

::: info Õpiväljund
Pärast seda osa on sul olemas töökorras VirtualBox, õigesti seadistatud harjutusvõrk (host-only, ilma VirtualBoxi enda DHCP-ta) ning kontrollitud Ubuntu Server paigaldusfail.
:::

## Meeskonna teine küsimus sinule

"Enne kui saame midagi käivitada, kus me seda üldse teeme?" Vastus ei ole päris server internetis — see oleks enne turvamist liiga riskantne. Vastus on **virtuaalmasin** (VM): tarkvaraline "arvuti" sinu enda arvuti sees, mida saad vabalt katki teha ja uuesti üles ehitada, ilma et miski päriselt katki läheks.

Enne kui saame esimese virtuaalmasina luua, tuleb valmis panna kolm asja: tööriist, mis virtuaalmasinaid haldab (VirtualBox), koht, kus virtuaalmasinad omavahel räägivad (meie harjutusvõrk), ja materjal, millest server ehitatakse (Ubuntu paigaldusfail).

## VirtualBoxi kontroll

VirtualBox on tasuta tööriist, mis loob ja käitab virtuaalmasinaid. Kontrolli, kas see on juba olemas:

```bash
VBoxManage --version
```

Kui käsku ei leita, laadi see alla [VirtualBoxi ametlikult lehelt](https://www.virtualbox.org/wiki/Downloads) — vali oma operatsioonisüsteemile sobiv paigaldaja.

::: warning Apple Silicon (M1/M2/M3/M4)
Kui su Mac kasutab Apple'i enda kiipi (mitte Intelit), pead valima eraldi **Apple Silicon** paigaldaja ja hiljem **arm64** Ubuntu ISO. Nende kahe segamine ei tööta: Apple Silicon VirtualBox käitab ainult ARM-arhitektuuriga külalisi, mitte tavalist Intel/AMD Ubuntut. Kontrolli oma kiibi tüüpi menüüst **" (Apple) → About This Mac"**.
:::

## Eraldi harjutusvõrk

Meie serverid ei tohi olla lihtsalt "kuskil sinu koduvõrgus" — nad peavad olema eraldatud võrgus, mida keegi teine ei näe ja mida sina täielikult kontrollid. VirtualBox loob selle jaoks **host-only võrgu**.

Enamikul juhtudel on selline võrk (tavaliselt nimega `vboxnet0`) juba automaatselt olemas, kui VirtualBox on paigaldatud. Kontrolli seda käsurealt:

```bash
VBoxManage list hostonlyifs
```

Väljundist otsi rida `IPAddress` — meie kursusel eeldame, et see on `192.168.56.1` (kui pole, vaata allolevat märkust).

::: warning Kui `list hostonlyifs` ei näita midagi
Tühi väljund ei tähenda, et võrku pole olemas — uuemad VirtualBoxi versioonid (nt 7.2 Apple Silicon peal) kasutavad host-only võrkude jaoks uuemat objektimudelit, mida see vana käsk enam ei näe. Proovi selle asemel:

```bash
VBoxManage list hostonlynets
```

Siin pole eraldi `IPAddress` rida, aga `LowerIP`/`UpperIP` peaks näitama vahemikku, mis meie kursusel algab `192.168.56.1`-st.
:::

### Miks tuleb VirtualBoxi enda DHCP välja lülitada

VirtualBox lisab uuele host-only võrgule vaikimisi ka oma **DHCP serveri** — teenuse, mis jagab ühendunud masinatele automaatselt aadresse. See tundub mugav, aga läheb meile hiljem risti: hilisemas teemas ehitame serverile *ise* DHCP serveri, ja kui VirtualBoxi enda DHCP jookseb samal ajal samas võrgus, hakkavad kaks DHCP serverit omavahel "vaidlema", kumb masinatele aadressi annab. Peale selle tahame, et meie serverite aadressid oleksid **püsivad** (staatilised), mitte iga taaskäivitusel juhuslikult renditud.

Kontrolli, kas DHCP server on sees:

```bash
VBoxManage list dhcpservers
```

Kui väljundis on rida `Enabled: Yes`, lülita see välja. Vaata täpselt, milline nimi seisab väljundis rea `NetworkName:` taga — kasuta **täpselt** seda nime, tavaliselt kujul `HostInterfaceNetworking-vboxnet0`:

```bash
VBoxManage dhcpserver modify --network=HostInterfaceNetworking-vboxnet0 --disable
```

::: warning Kui käsk annab vea "could not be found" või "DHCP server does not exist"
Sama põhjus, mis eelmises märkuses: `--interface=vboxnet0` eeldab VirtualBoxi **vana** host-only-liidese objekti, mida uuemad versioonid enam ei loo — sellepärast oli ka `list hostonlyifs` tühi. Õige võti on `--network=`, aga täpne nimi loeb: võrgu enda lühinimi (`hostonly-vboxnet0`) annab hoopis teise vea, "DHCP server does not exist" — töötab ainult DHCP serveri enda `NetworkName` väärtus, mille `list dhcpservers` sulle täpselt ette näitab.
:::

Kontrolli tulemust uuesti sama käsuga (`VBoxManage list dhcpservers`) — nüüd peaks seal olema `Enabled: No`.

::: tip Sama asi ka graafiliselt
VirtualBoxi menüüs **Tools → Network → Host-only Networks** vali oma võrk, ava selle **DHCP Server** vahekaart ja eemalda linnuke **Enable Server** juurest. Menüünimed võivad versiooniti pisut erineda — kui midagi ei leidu täpselt samast kohast, otsi sõna "DHCP" võrguhalduse akna vahekaartidelt.
:::

## Ubuntu Serveri paigaldusfaili hankimine

Meie serverite operatsioonisüsteemiks on **Ubuntu Server 24.04 LTS** — "LTS" (*Long Term Support*) tähendab pikaajalist tootja tuge, mis on hea valik millelegi, mida ei taha iga paari kuu tagant suurelt uuendada.

Lae alla [Ubuntu 24.04 väljalasete lehelt](https://releases.ubuntu.com/24.04/) **Server** paigaldusfail (mitte Desktop). Intel/AMD arvutile (amd64) sobib tavaline leht, Apple Silicon jaoks kasuta [Ubuntu cdimage arm64 väljalasked](https://cdimage.ubuntu.com/releases/24.04/release/).

### Miks kontrollime räsi

Kontrollsumma (räsi) on faili "sõrmejälg" — kui allalaadimine katkes poole peal või fail rikuti kuskil vahepeal, muutub räsi kohe teistsuguseks. Nii avastad probleemi enne, kui hakkad katkise failiga VM-i üles ehitama ja tunde kulutad arusaamatute vigade otsimisele.

```bash
shasum -a 256 ubuntu-server.iso
```

Võrdle tulemust Ubuntu lehel toodud ametliku `SHA256SUMS` reaga sama failinime kohta. Need peavad täpselt kattuma.

## Kokkuvõte

| Samm | Tulemus |
| --- | --- |
| VirtualBoxi kontroll | `VBoxManage --version` annab versiooninumbri |
| Host-only võrk olemas | `VBoxManage list hostonlyifs` näitab `192.168.56.1` |
| DHCP välja lülitatud | `VBoxManage list dhcpservers` näitab `Enabled: No` |
| ISO alla laaditud ja kontrollitud | räsi kattub ametliku `SHA256SUMS` kirjega |

## Allikad

- [Oracle VirtualBox User Manual — Installation](https://docs.oracle.com/en/virtualization/virtualbox/7.2/user/installation.html)
- [Ubuntu 24.04 LTS releases](https://releases.ubuntu.com/24.04/)
