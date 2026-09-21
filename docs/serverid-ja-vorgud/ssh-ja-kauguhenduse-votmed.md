---
title: SSH ja kaugühenduse võtmed
description: Kaks erinevat võtit, mis SSH ühenduses osalevad, ja miks me täna alustame võtmetega, aga ei ühendu veel päriselt üle võrgu.
outline: deep
---

# SSH ja kaugühenduse võtmed

::: info Õpiväljund
Pärast seda osa oskad selgitada, mis vahe on hostivõtmel ja kasutajavõtmel, ning oled loonud oma SSH võtmepaari — valmis kasutamiseks niipea, kui serveril on püsiv aadress.
:::

## Meeskonna kuues küsimus sinule

"Kas sa pead iga kord VirtualBoxi akna avama, et serverit hooldada?" See ei mahu kokku sellega, kuidas päris meeskonnad servereid haldavad — kaugelt, terminalist, ilma et keegi peaks füüsiliselt (või virtuaalselt) masina ekraani nägema. Selle lahendus on **SSH** (*Secure Shell*): krüpteeritud kaugühendus, millega saad serveri terminali kasutada oma hosti terminalist.

## Kaks erinevat võtit — ära aja segi

SSH ühenduses osaleb tegelikult **kaks** erinevat identiteeti, ja need kipuvad segamini minema:

- **Hostivõti** — kuulub **serverile**. See tõendab sulle, et ühendud tõesti oma srv1-ga, mitte kellegi teise masinaga, kes end srv1-ks väidab.
- **Kasutajavõti** — kuulub **sinule**. See tõendab serverile, et sina oled tõesti see, kes tohib sisse logida.

::: tip Mälupilt
Kontrollid nii maja aadressi (hostivõti — kas see on tõesti õige maja?) kui ka ukse avajat (kasutajavõti — kas sul on õige võti seda ust avada?). Need on kaks täiesti erinevat kontrolli, mitte sama asi kahes kohas.
:::

Iga võtmepaar (nii hosti- kui kasutajavõti) koosneb kahest failist: **avalik võti** (mida võib vabalt jagada — see on nagu lukk, mille saab kellelegi teisele anda) ja **privaatvõti** (mis jääb ainult omanikule ega liigu kunagi serverisse ega kellegi teiseni). Pelgalt avaliku võtme omamine ei anna veel kellelegi ligipääsu — see peab olema ka serveri lubatud võtmete nimekirjas.

## Miks me ei ühendu veel päriselt

Siin osas teeme kaks asja ette valmis, aga **päris ühendust hosti terminalist serverini me veel ei tee**. Põhjus on lihtne: SSH vajab võrguteed hosti ja serveri vahel, aga serveri host-only aadress ei ole veel püsiv (määrame selle alles järgmises teemas). Kui prooviksid `ssh oppur@192.168.56.10` juba praegu, saaksid tõenäoliselt "no route to host" või ajalõpu vea — mitte sellepärast, et midagi valesti tegid, vaid sellepärast, et see osa süsteemist pole veel paigas.

::: tip Miks järjekord on tähtis
See on hea näide sellest, miks teemade järjekord kursusel on selline, nagu ta on: SSH võtmed ja identiteet on üks teema (praegu), püsiv aadress on teine teema (järgmisena) — ja alles mõlema koos olemasolu teeb päris ühenduse võimalikuks.
:::

## Käed külge: mida saab juba praegu teha

### Hostivõtme sõrmejälje kontroll

Käivita see **srv1 VirtualBoxi konsoolil** (mitte hosti terminalis):

```bash
sudo ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub
```

`-l` näitab võtme sõrmejälge, `-f` valib faili. See annab sulle SHA256 sõrmejälje, mille vastu saad hiljem võrrelda, kui hosti terminal esimest korda hoiatab tundmatust serverist — kui sõrmejäljed ühtivad, tead kindlalt, et ühendud õige masinaga, mitte pimesi kinnitad hoiatust.

### Oma kasutajavõtme loomine

Käivita see **hosti terminalis** (Maci Terminal või Windowsi PowerShell, mitte VM-i konsoolil):

```bash
ssh-keygen -t ed25519 -f ~/.ssh/koolilabor
```

`-t ed25519` valib tänapäevase, kompaktse võtmetüübi, `-f` määrab failinime. Sisesta tugev paroolifraas, kui küsitakse — see kaitseb sinu privaatvõtit, kui keegi peaks su arvutile ligi pääsema. Tekivad kaks faili: `koolilabor` (privaatvõti — ära seda kunagi kellelegi saada ega serverisse kopeeri) ja `koolilabor.pub` (avalik võti — seda me kopeerime järgmises teemas serverisse).

::: warning Kui fail on juba olemas
Ära kirjuta olemasolevat võtmefaili üle, kui see juba on. Kasuta vajadusel teist failinime.
:::

## Turvaline muudatus — põhimõte, mida hiljem vajad

Kui hakkad järgmises teemas võtmega ühendust tegelikult looma, pea meeles üks reegel: **ära sulge vana ühendusvõimalust enne, kui uus on kontrollitult töötav**. Konkreetselt: hoia olemasolev SSH-seanss (parooliga) lahti, testi uut ühendust (võtmega) **teises aknas**, ja alles siis, kui see töötab, kaalu vana meetodi (paroolisisenemise) piiramist.

::: tip Miks mitte kohe parooliga sisselogimist keelata?
Sest võtmega sisselogimine võib veel mitte töötada — vale failiõigus `.ssh` kaustal, vale võtmefail, unustatud samm. Kui keelad parooli enne kontrolli, võid enda serverist täielikult välja lukustada. Konfiguratsiooni süntaksi kontroll (kas fail on kirjutatud õigesti) ei tõenda veel, et sinu kasutaja päriselt uue meetodiga sisse pääseb.
:::

## Kui midagi ei tööta

Sama nelja küsimuse raamistik, mis eelmises osas, kehtib ka siin: millises masinas oled, mis muutus viimati, kas teenus (SSH) töötab, ja mida ütleb logi (`journalctl -u ssh`). SSH-spetsiifilised vead lahendame põhjalikumalt niipea, kui päris ühendus on olemas.

## Suur pilt: kus me praegu oleme

Teema 3 lõpuks oskad serveris turvaliselt liikuda ja faile muuta (õige koht, õiged õigused), tead, kuidas kontrollida ja diagnoosida teenuseid ning nende logisid, ja sul on olemas oma SSH võtmepaar, mis ootab kasutamist. See on täpselt see "elektri ja vee" tase, millest teema 2 lõpus rääkisime, ainult üks korrus kõrgemal: nüüd oskad majas ka turvaliselt liikuda, mitte ainult sisse pääseda.

Ainuke asi, mis veel puudub, on **stabiilne tee** hosti ja serveri vahel — praegu jagab VirtualBox serveritele aadressi automaatselt (ja isegi seda mitte alati usaldatavalt), mitte midagi, mille peale saaks pikaajaliselt ehitada. Järgmine teema annab mõlemale serverile **püsiva aadressi** ning oma **DNS-i ja DHCP** — alles siis saad oma äsja loodud võtit tegelikult kasutada ja hüvasti jätta VirtualBoxi konsooli pideva avamisega.

## Allikad

- [OpenSSH — Key Management](https://www.openssh.com/manual.html)
- [ssh-keygen manual](https://man.openbsd.org/ssh-keygen)
